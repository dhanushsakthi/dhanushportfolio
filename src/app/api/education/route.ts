import { NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';
import { Education } from '@/lib/types';

export async function POST(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const eduData: Omit<Education, 'id'> = await req.json();
    const data = getPortfolioData();
    const newEdu: Education = {
      ...eduData,
      id: 'edu-' + Date.now()
    };
    data.education.unshift(newEdu);
    savePortfolioData(data);
    return NextResponse.json({ success: true, education: newEdu });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to add education' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const updatedEdu: Education = await req.json();
    const data = getPortfolioData();
    const index = data.education.findIndex(e => e.id === updatedEdu.id);
    if (index !== -1) {
      data.education[index] = updatedEdu;
      savePortfolioData(data);
      return NextResponse.json({ success: true, education: updatedEdu });
    }
    return NextResponse.json({ success: false, message: 'Education entry not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to update education' }, { status: 500 });
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
    data.education = data.education.filter(e => e.id !== id);
    savePortfolioData(data);
    return NextResponse.json({ success: true, message: 'Education deleted' });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to delete education' }, { status: 500 });
  }
}
