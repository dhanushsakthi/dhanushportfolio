import { NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';
import { Experience } from '@/lib/types';

export async function POST(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const expData: Omit<Experience, 'id'> = await req.json();
    const data = getPortfolioData();
    const newExp: Experience = {
      ...expData,
      id: 'exp-' + Date.now()
    };
    data.experience.unshift(newExp);
    savePortfolioData(data);
    return NextResponse.json({ success: true, experience: newExp });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to add experience' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const updatedExp: Experience = await req.json();
    const data = getPortfolioData();
    const index = data.experience.findIndex(e => e.id === updatedExp.id);
    if (index !== -1) {
      data.experience[index] = updatedExp;
      savePortfolioData(data);
      return NextResponse.json({ success: true, experience: updatedExp });
    }
    return NextResponse.json({ success: false, message: 'Experience entry not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to update experience' }, { status: 500 });
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
    data.experience = data.experience.filter(e => e.id !== id);
    savePortfolioData(data);
    return NextResponse.json({ success: true, message: 'Experience deleted' });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to delete experience' }, { status: 500 });
  }
}
