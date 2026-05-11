'use client';

import Navbar from './navbar';
import Sidebar from './sidebar';
import PremiumOverlay from '@/components/premium/premium-overlay';
import { useChatStore } from '@/store/chat-store';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const showPremiumOverlay = useChatStore((s) => s.showPremiumOverlay);

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <Sidebar />
      <main className="relative">{children}</main>
      {showPremiumOverlay && <PremiumOverlay />}
    </div>
  );
}
