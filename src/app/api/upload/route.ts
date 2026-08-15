import { NextResponse } from 'next/server';
import { checkAdminSession } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';
import { UploadApiResponse } from 'cloudinary';

export async function POST(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const folderType = (formData.get('folderType') as string) || 'uploads';

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate size (max 50MB for video/image uploads)
    if (buffer.length > 50 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: 'File size exceeds 50MB limit' }, { status: 400 });
    }

    // Upload to Cloudinary using buffer stream with resource_type: auto (handles images & videos)
    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `portfolio/${folderType}`,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error('Cloudinary upload failed'));
          }
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      fileName: uploadResult.original_filename || file.name,
      size: uploadResult.bytes || buffer.length,
      publicId: uploadResult.public_id,
      resourceType: uploadResult.resource_type,
    });
  } catch (err: any) {
    console.error('Cloudinary upload error:', err);
    return NextResponse.json(
      { success: false, message: err?.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
