import { NextResponse } from 'next/server';
import { getPortfolioDataAsync, savePortfolioDataAsync } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';
import { Certification } from '@/lib/types';

export async function GET() {
  const data = await getPortfolioDataAsync();
  return NextResponse.json({ success: true, certifications: data.certifications || [] });
}

export async function POST(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const certData: Omit<Certification, 'id'> = await req.json();
    const data = await getPortfolioDataAsync();
    const newCert: Certification = {
      ...certData,
      id: 'cert-' + Date.now(),
      published: certData.published ?? true,
      order: certData.order || ((data.certifications?.length || 0) + 1)
    };
    if (!data.certifications) data.certifications = [];
    data.certifications.unshift(newCert);
    await savePortfolioDataAsync(data);
    return NextResponse.json({ success: true, certification: newCert });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Failed to add certification' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const updatedCert: Certification = await req.json();
    const data = await getPortfolioDataAsync();
    if (!data.certifications) data.certifications = [];
    const index = data.certifications.findIndex(c => c.id === updatedCert.id);
    if (index !== -1) {
      data.certifications[index] = updatedCert;
      await savePortfolioDataAsync(data);
      return NextResponse.json({ success: true, certification: updatedCert });
    }
    return NextResponse.json({ success: false, message: 'Certification not found' }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Failed to update certification' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });

    const data = await getPortfolioDataAsync();
    if (data.certifications) {
      data.certifications = data.certifications.filter(c => c.id !== id);
      await savePortfolioDataAsync(data);
    }
    return NextResponse.json({ success: true, message: 'Certification deleted' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Failed to delete certification' }, { status: 500 });
  }
}
