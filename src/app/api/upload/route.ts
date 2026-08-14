import { NextResponse } from 'next/server';
import { checkAdminSession } from '@/lib/auth';

const getFs = () => (typeof window === 'undefined' ? require('fs') : null);
const getPath = () => (typeof window === 'undefined' ? require('path') : null);

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

    // Validate size (max 15MB)
    if (buffer.length > 15 * 1024 * 1024) {
      return NextResponse.json({ success: false, message: 'File size exceeds 15MB limit' }, { status: 400 });
    }

    const fs = getFs();
    const path = getPath();
    if (!fs || !path) {
      return NextResponse.json({ success: false, message: 'Server environment error' }, { status: 500 });
    }

    const uploadDir = path.join(process.cwd(), 'public', folderType);
    if (!fs.existsSync(uploadDir)) {
      try {
        fs.mkdirSync(uploadDir, { recursive: true });
      } catch {
        // Ignored on read-only FS
      }
    }

    // Clean file extension and name
    const originalName = file.name || 'upload';
    const ext = path.extname(originalName) || '.png';
    const safeName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${safeName}_${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, fileName);

    try {
      fs.writeFileSync(filePath, buffer);
    } catch (err) {
      console.warn('Could not write to public folder on serverless environment:', err);
    }

    const publicUrl = `/${folderType}/${fileName}`;
    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
      size: buffer.length
    });
  } catch (err) {
    console.error('File upload error:', err);
    return NextResponse.json({ success: false, message: 'Upload failed' }, { status: 500 });
  }
}
