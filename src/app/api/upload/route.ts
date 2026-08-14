import { NextResponse } from 'next/server';
import { checkAdminSession } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

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

    const uploadDir = path.join(process.cwd(), 'public', folderType);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Clean file extension and name
    const originalName = file.name || 'upload';
    const ext = path.extname(originalName) || '.png';
    const safeName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const fileName = `${safeName}_${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

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
