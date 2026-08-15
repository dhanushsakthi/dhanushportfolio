import { NextResponse } from 'next/server';
import { getPortfolioDataAsync, savePortfolioDataAsync } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';
import { Skill } from '@/lib/types';

export async function GET() {
  const data = await getPortfolioDataAsync();
  return NextResponse.json({ success: true, skills: data.skills || [] });
}

export async function POST(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const skillData: Omit<Skill, 'id'> = await req.json();
    const data = await getPortfolioDataAsync();
    const newSkill: Skill = {
      ...skillData,
      id: 'sk-' + Date.now(),
      published: skillData.published ?? true,
      order: skillData.order || ((data.skills?.length || 0) + 1)
    };
    if (!data.skills) data.skills = [];
    data.skills.push(newSkill);
    await savePortfolioDataAsync(data);
    return NextResponse.json({ success: true, skill: newSkill });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Failed to add skill' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const updatedSkill: Skill = await req.json();
    const data = await getPortfolioDataAsync();
    if (!data.skills) data.skills = [];
    const index = data.skills.findIndex(s => s.id === updatedSkill.id);
    if (index !== -1) {
      data.skills[index] = updatedSkill;
      await savePortfolioDataAsync(data);
      return NextResponse.json({ success: true, skill: updatedSkill });
    }
    return NextResponse.json({ success: false, message: 'Skill not found' }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Failed to update skill' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'Skill ID required' }, { status: 400 });

    const data = await getPortfolioDataAsync();
    if (data.skills) {
      data.skills = data.skills.filter(s => s.id !== id);
      await savePortfolioDataAsync(data);
    }
    return NextResponse.json({ success: true, message: 'Skill deleted' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Failed to delete skill' }, { status: 500 });
  }
}
