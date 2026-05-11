import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: { id: string };
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  const sessionId = req.cookies.get('cl_session')?.value;
  if (!sessionId) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    // Verify ownership
    const conv = await prisma.conversation.findUnique({
      where: { id: params.id },
      select: { sessionId: true },
    });

    if (!conv || conv.sessionId !== sessionId) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 });
    }

    await prisma.conversation.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
