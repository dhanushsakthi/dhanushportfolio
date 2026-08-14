import { NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';

export async function PUT(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { profile, siteSettings } = await req.json();
    const data = getPortfolioData();

    if (profile) {
      data.profile = { ...data.profile, ...profile };
    }

    if (siteSettings) {
      data.siteSettings = {
        ...data.siteSettings,
        ...siteSettings,
        adminPasswordHash: data.siteSettings.adminPasswordHash // preserve password hash
      };
    }

    const saved = savePortfolioData(data);
    if (saved) {
      return NextResponse.json({ success: true, message: 'Profile updated successfully', data: data.profile });
    }
    return NextResponse.json({ success: false, message: 'Failed to save profile' }, { status: 500 });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
