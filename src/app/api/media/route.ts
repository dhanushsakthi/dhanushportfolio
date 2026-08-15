import { NextResponse } from 'next/server';
import { checkAdminSession } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';
import { getPortfolioDataAsync, savePortfolioDataAsync } from '@/lib/db';
import { MediaItem } from '@/lib/types';

export async function GET() {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const data = await getPortfolioDataAsync();
    const mediaList = data.media || [];

    // Optionally search Cloudinary resources if needed
    try {
      const cloudinaryResult = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'portfolio',
        max_results: 100
      });

      if (cloudinaryResult && cloudinaryResult.resources) {
        const fetchedMedia: MediaItem[] = cloudinaryResult.resources.map((res: any) => ({
          id: res.public_id,
          publicId: res.public_id,
          url: res.secure_url,
          resourceType: res.resource_type,
          fileName: res.public_id.split('/').pop() || res.public_id,
          size: res.bytes,
          folder: res.folder || 'portfolio',
          createdAt: res.created_at
        }));

        // Merge with stored media
        const combinedMap = new Map<string, MediaItem>();
        mediaList.forEach(m => combinedMap.set(m.publicId, m));
        fetchedMedia.forEach(m => combinedMap.set(m.publicId, m));

        return NextResponse.json({ success: true, media: Array.from(combinedMap.values()) });
      }
    } catch (cErr) {
      console.warn('Cloudinary API search warning:', cErr);
    }

    return NextResponse.json({ success: true, media: mediaList });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Failed to fetch media' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const publicId = searchParams.get('publicId');
    const resourceType = searchParams.get('resourceType') || 'image';

    if (!publicId) {
      return NextResponse.json({ success: false, message: 'publicId is required' }, { status: 400 });
    }

    // Delete asset from Cloudinary
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });

    // Update Firestore media list
    const data = await getPortfolioDataAsync();
    if (data.media) {
      data.media = data.media.filter(m => m.publicId !== publicId);
      await savePortfolioDataAsync(data);
    }

    return NextResponse.json({ success: true, message: 'Media asset deleted successfully' });
  } catch (err: any) {
    console.error('Cloudinary delete error:', err);
    return NextResponse.json({ success: false, message: err?.message || 'Failed to delete media asset' }, { status: 500 });
  }
}
