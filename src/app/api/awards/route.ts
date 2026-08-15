import { NextResponse } from 'next/server';
import { getPortfolioDataAsync, savePortfolioDataAsync } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';
import { Award } from '@/lib/types';

export async function GET() {
  const data = await getPortfolioDataAsync();
  return NextResponse.json({ success: true, awards: data.awards || [] });
}

export async function POST(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const awardData: Omit<Award, 'id'> = await req.json();
    const data = await getPortfolioDataAsync();
    
    const newAward: Award = {
      ...awardData,
      id: 'award-' + Date.now(),
      featured: awardData.featured ?? true,
      published: awardData.published ?? true,
      order: awardData.order || ((data.awards?.length || 0) + 1)
    };

    if (!data.awards) data.awards = [];
    data.awards.unshift(newAward);
    await savePortfolioDataAsync(data);

    return NextResponse.json({ success: true, award: newAward });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Failed to add award' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const updatedAward: Award = await req.json();
    const data = await getPortfolioDataAsync();
    if (!data.awards) data.awards = [];

    const index = data.awards.findIndex(a => a.id === updatedAward.id);
    if (index !== -1) {
      data.awards[index] = updatedAward;
      await savePortfolioDataAsync(data);
      return NextResponse.json({ success: true, award: updatedAward });
    }
    return NextResponse.json({ success: false, message: 'Award not found' }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Failed to update award' }, { status: 500 });
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
    if (data.awards) {
      data.awards = data.awards.filter(a => a.id !== id);
      await savePortfolioDataAsync(data);
    }
    return NextResponse.json({ success: true, message: 'Award deleted' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Failed to delete award' }, { status: 500 });
  }
}
