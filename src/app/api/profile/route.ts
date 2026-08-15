import { NextResponse } from 'next/server';
import { getPortfolioDataAsync, savePortfolioDataAsync } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';

export async function GET() {
  const data = await getPortfolioDataAsync();
  return NextResponse.json({ success: true, profile: data.profile, siteSettings: data.siteSettings });
}

export async function PUT(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { profile, siteSettings } = await req.json();
    const data = await getPortfolioDataAsync();

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

    const saved = await savePortfolioDataAsync(data);
    if (saved) {
      return NextResponse.json({ success: true, message: 'Profile updated successfully', profile: data.profile, siteSettings: data.siteSettings });
    }
    return NextResponse.json({ success: false, message: 'Failed to save profile' }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Server error' }, { status: 500 });
  }
}
