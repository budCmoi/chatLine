import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
const FREE_REQUEST_LIMIT = 20;

// Get or create a usage tracker tied to a session cookie
async function getUsageTracker(sessionId: string) {
  return prisma.usageTracker.upsert({
    where: { sessionId },
    update: {},
    create: { sessionId },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, provider = 'gpt-5', mode = 'fast', conversationId } = body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json({ error: 'prompt is required' }, { status: 400 });
    }
    if (prompt.length > 8000) {
      return NextResponse.json({ error: 'prompt too long' }, { status: 400 });
    }

    // Session management
    const cookieStore = cookies();
    let sessionId = cookieStore.get('cl_session')?.value;
    if (!sessionId) {
      sessionId = crypto.randomUUID();
    }

    // Check usage limit
    const tracker = await getUsageTracker(sessionId);

    if (!tracker.isPremium && tracker.requestCount >= FREE_REQUEST_LIMIT) {
      const res = NextResponse.json(
        { error: 'limit_exceeded', message: 'Free limit reached' },
        { status: 402 },
      );
      res.cookies.set('cl_session', sessionId, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });
      return res;
    }

    // Increment counter
    await prisma.usageTracker.update({
      where: { sessionId },
      data: { requestCount: { increment: 1 } },
    });

    // Forward to NestJS backend
    const backendRes = await fetch(`${API_URL}/api/v1/chat/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt.trim(), provider, mode }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!backendRes.ok) {
      throw new Error(`Backend returned ${backendRes.status}`);
    }

    const data = await backendRes.json();
    const content: string =
      data.content ?? data.text ?? data.reply ?? 'Désolé, je n\'ai pas pu générer de réponse.';

    // Optionally persist to DB if conversationId is provided
    if (conversationId && typeof conversationId === 'string') {
      try {
        await prisma.message.createMany({
          data: [
            {
              conversationId,
              role: 'user',
              content: prompt.trim(),
            },
            {
              conversationId,
              role: 'assistant',
              content,
              model: provider,
            },
          ],
        });
      } catch {
        // Non-critical — continue even if DB write fails
      }
    }

    const res = NextResponse.json({ content });
    res.cookies.set('cl_session', sessionId, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
    return res;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[chat/route] error:', message);
    return NextResponse.json(
      { error: 'internal_error', message: 'Une erreur est survenue' },
      { status: 500 },
    );
  }
}
