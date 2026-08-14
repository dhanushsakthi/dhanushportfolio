import { NextResponse } from 'next/server';
import { getPortfolioData } from '@/lib/db';

export async function GET() {
  const data = getPortfolioData();
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
