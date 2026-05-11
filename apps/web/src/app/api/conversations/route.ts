import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const sessionId = req.cookies.get('cl_session')?.value;
  if (!sessionId) {
    return NextResponse.json({ conversations: [] });
  }

  try {
    const conversations = await prisma.conversation.findMany({
      where: { sessionId },
      orderBy: { updatedAt: 'desc' },
      take: 50,
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        messages: {
          orderBy: { createdAt: 'asc' },
          select: { id: true, role: true, content: true, model: true, createdAt: true },
        },
      },
    });

    return NextResponse.json({ conversations });
  } catch {
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get('cl_session')?.value;
  if (!sessionId) {
    return NextResponse.json({ error: 'no session' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title } = body;

    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'title is required' }, { status: 400 });
    }

    const conversation = await prisma.conversation.create({
      data: { title: title.slice(0, 200), sessionId },
    });

    return NextResponse.json({ conversation });
  } catch {
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
