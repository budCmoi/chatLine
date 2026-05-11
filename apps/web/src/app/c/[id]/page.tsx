import AppShell from '@/components/layout/app-shell';
import ChatUI from '@/components/chat/chat-ui';

interface PageProps {
  params: { id: string };
}

export default function ChatPage({ params }: PageProps) {
  return (
    <AppShell>
      <ChatUI conversationId={params.id} />
    </AppShell>
  );
}

export function generateStaticParams() {
  return [];
}

export const dynamic = 'force-dynamic';
