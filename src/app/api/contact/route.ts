import { NextResponse } from 'next/server';
import { saveContactMessage, getContactMessages, markMessageRead } from '@/lib/db';
import { checkAdminSession } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'Please complete all required fields.' }, { status: 400 });
    }

    const saved = saveContactMessage({
      name,
      email,
      subject: subject || 'General Inquiry from Portfolio',
      message
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      id: saved.id
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to send message.' }, { status: 500 });
  }
}

export async function GET() {
  const isAuth = await checkAdminSession();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const messages = getContactMessages();
  return NextResponse.json({ success: true, messages });
}

export async function PUT(req: Request) {
  const isAuth = await checkAdminSession();
  if (!isAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });

    const updated = markMessageRead(id);
    return NextResponse.json({ success: updated });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
