import { NextResponse } from 'next/server';
import { getPortfolioDataAsync, savePortfolioDataAsync } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';

export async function GET() {
  const data = await getPortfolioDataAsync();
  // Strip out sensitive password hash from public payload
  const publicData = {
    ...data,
    siteSettings: {
      ...data.siteSettings,
      adminPasswordHash: undefined
    }
  };
  return NextResponse.json(publicData);
}

export async function PUT(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const updatedData = await req.json();
    if (!updatedData || !updatedData.profile) {
      return NextResponse.json({ success: false, message: 'Invalid payload structure' }, { status: 400 });
    }

    const currentData = await getPortfolioDataAsync();
    const merged = {
      ...currentData,
      ...updatedData,
      profile: { ...currentData.profile, ...(updatedData.profile || {}) },
      siteSettings: { ...currentData.siteSettings, ...(updatedData.siteSettings || {}) }
    };

    const saved = await savePortfolioDataAsync(merged);
    if (!saved) {
      return NextResponse.json({ success: false, message: 'Failed to persist portfolio data' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Portfolio updated successfully', data: merged });
  } catch (err: any) {
    console.error('Content update error:', err);
    return NextResponse.json({ success: false, message: err?.message || 'Server error' }, { status: 500 });
  }
}
