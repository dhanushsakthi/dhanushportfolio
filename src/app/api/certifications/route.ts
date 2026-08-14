import { NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';
import { Certification } from '@/lib/types';

export async function POST(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const certData: Omit<Certification, 'id'> = await req.json();
    const data = getPortfolioData();
    const newCert: Certification = {
      ...certData,
      id: 'cert-' + Date.now(),
      order: data.certifications.length + 1
    };
    data.certifications.unshift(newCert);
    savePortfolioData(data);
    return NextResponse.json({ success: true, certification: newCert });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to add certification' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const updatedCert: Certification = await req.json();
    const data = getPortfolioData();
    const index = data.certifications.findIndex(c => c.id === updatedCert.id);
    if (index !== -1) {
      data.certifications[index] = updatedCert;
      savePortfolioData(data);
      return NextResponse.json({ success: true, certification: updatedCert });
    }
    return NextResponse.json({ success: false, message: 'Certification not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to update certification' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });

    const data = getPortfolioData();
    data.certifications = data.certifications.filter(c => c.id !== id);
    savePortfolioData(data);
    return NextResponse.json({ success: true, message: 'Certification deleted' });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to delete certification' }, { status: 500 });
  }
}
