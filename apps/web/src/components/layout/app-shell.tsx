'use client';

import Navbar from './navbar';
import Sidebar from './sidebar';
import SidebarRight from './sidebar-right';
import PremiumOverlay from '@/components/premium/premium-overlay';
import VoiceMode from '@/components/voice/voice-mode';
import { useChatStore } from '@/store/chat-store';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const showPremiumOverlay = useChatStore((s) => s.showPremiumOverlay);

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <Sidebar />
      <SidebarRight />
      <main className="relative">{children}</main>
      {showPremiumOverlay && <PremiumOverlay />}
      <VoiceMode />
    </div>
  );
}
