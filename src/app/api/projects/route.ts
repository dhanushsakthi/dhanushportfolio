import { NextResponse } from 'next/server';
import { getPortfolioData, savePortfolioData } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';
import { Project } from '@/lib/types';

export async function POST(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const projData: Omit<Project, 'id'> = await req.json();
    const data = getPortfolioData();
    const newProject: Project = {
      ...projData,
      id: 'proj-' + Date.now(),
      order: data.projects.length + 1
    };
    data.projects.unshift(newProject);
    savePortfolioData(data);
    return NextResponse.json({ success: true, project: newProject });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to add project' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const updatedProject: Project = await req.json();
    const data = getPortfolioData();
    const index = data.projects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      data.projects[index] = updatedProject;
      savePortfolioData(data);
      return NextResponse.json({ success: true, project: updatedProject });
    }
    return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to update project' }, { status: 500 });
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
    data.projects = data.projects.filter(p => p.id !== id);
    savePortfolioData(data);
    return NextResponse.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to delete project' }, { status: 500 });
  }
}
