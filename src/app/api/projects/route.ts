import { NextResponse } from 'next/server';
import { getPortfolioDataAsync, savePortfolioDataAsync } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';
import { Project } from '@/lib/types';

function extractYoutubeId(url?: string): string {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : '';
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

export async function GET() {
  const data = await getPortfolioDataAsync();
  return NextResponse.json({ success: true, projects: data.projects || [] });
}

export async function POST(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const projData: Omit<Project, 'id'> = await req.json();
    const data = await getPortfolioDataAsync();
    
    let youtubeVideoId = projData.youtubeVideoId;
    if (projData.videoSourceType === 'youtube' && projData.youtubeUrl) {
      youtubeVideoId = extractYoutubeId(projData.youtubeUrl);
    }

    const newProject: Project = {
      ...projData,
      id: 'proj-' + Date.now(),
      slug: projData.slug || generateSlug(projData.title),
      youtubeVideoId,
      imageUrl: projData.poster || projData.imageUrl || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
      screenshots: projData.screenshots || [],
      isFeatured: projData.isFeatured ?? true,
      published: projData.published ?? true,
      order: projData.order || ((data.projects?.length || 0) + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (!data.projects) data.projects = [];
    data.projects.unshift(newProject);
    await savePortfolioDataAsync(data);
    return NextResponse.json({ success: true, project: newProject });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Failed to add project' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

  try {
    const updatedProject: Project = await req.json();
    const data = await getPortfolioDataAsync();
    
    if (updatedProject.videoSourceType === 'youtube' && updatedProject.youtubeUrl) {
      updatedProject.youtubeVideoId = extractYoutubeId(updatedProject.youtubeUrl);
    }

    if (!updatedProject.slug && updatedProject.title) {
      updatedProject.slug = generateSlug(updatedProject.title);
    }

    updatedProject.updatedAt = new Date().toISOString();

    const index = data.projects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      data.projects[index] = { ...data.projects[index], ...updatedProject };
      await savePortfolioDataAsync(data);
      return NextResponse.json({ success: true, project: data.projects[index] });
    }
    return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Failed to update project' }, { status: 500 });
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
    data.projects = data.projects.filter(p => p.id !== id);
    await savePortfolioDataAsync(data);
    return NextResponse.json({ success: true, message: 'Project deleted' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Failed to delete project' }, { status: 500 });
  }
}
