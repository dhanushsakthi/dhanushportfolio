import { NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';
import { Skill } from '@/lib/types';

export async function POST(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const skillData: Omit<Skill, 'id'> = await req.json();
    const data = getPortfolioData();
    const newSkill: Skill = {
      ...skillData,
      id: 'sk-' + Date.now(),
      order: data.skills.length + 1
    };
    data.skills.push(newSkill);
    savePortfolioData(data);
    return NextResponse.json({ success: true, skill: newSkill });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to add skill' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const updatedSkill: Skill = await req.json();
    const data = getPortfolioData();
    const index = data.skills.findIndex(s => s.id === updatedSkill.id);
    if (index !== -1) {
      data.skills[index] = updatedSkill;
      savePortfolioData(data);
      return NextResponse.json({ success: true, skill: updatedSkill });
    }
    return NextResponse.json({ success: false, message: 'Skill not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to update skill' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'Skill ID required' }, { status: 400 });

    const data = getPortfolioData();
    data.skills = data.skills.filter(s => s.id !== id);
    savePortfolioData(data);
    return NextResponse.json({ success: true, message: 'Skill deleted' });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to delete skill' }, { status: 500 });
  }
}
