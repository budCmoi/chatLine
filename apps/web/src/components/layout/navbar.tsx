'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { useChatStore } from '@/store/chat-store';
import { cn } from '@/lib/cn';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const toggleSidebar = useChatStore((s) => s.toggleSidebar);
  const toggleRightSidebar = useChatStore((s) => s.toggleRightSidebar);
  const setVoiceModeOpen = useChatStore((s) => s.setVoiceModeOpen);
  const toggleVoice = () => setVoiceModeOpen(true);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.1 },
    );
  }, []);

  return (
    <>
      {/* floating navbar */}
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 sm:px-5"
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between gap-3 px-3 py-2 sm:px-5 sm:py-2.5 rounded-2xl border border-rim backdrop-blur-xl bg-ink/85">
          <div className="flex items-center gap-2.5">
            <button onClick={toggleSidebar} className="w-8 h-8 flex items-center justify-center rounded-xl text-snow/40 hover:text-snow hover:bg-snow-dim transition-all duration-200 active:scale-95" aria-label="Menu">
              <MenuIcon />
            </button>
            <Link href="/" className="font-display font-bold text-base sm:text-lg tracking-tight text-snow select-none">
              Chat<span className="text-gold">Line</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/" active={pathname === '/'}>Accueil</NavLink>
            <NavLink href="/premium" active={pathname === '/premium'}>Premium</NavLink>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => router.push('/')} className="hidden sm:flex items-center gap-1.5 text-xs text-snow/50 hover:text-snow/80 transition-colors px-3 py-1.5 rounded-xl border border-rim hover:border-rim/80 active:scale-95">
              <PlusIcon />
              <span className="hidden lg:inline">Nouveau chat</span>
            </button>
            {/* Voice button */}
            <button
              onClick={() => toggleVoice()}
              className="w-7 h-7 flex items-center justify-center rounded-xl text-snow/30 hover:text-snow/70 hover:bg-snow/[0.06] border border-transparent hover:border-rim transition-all duration-200 active:scale-95"
              aria-label="Mode voix"
            >
              <MicIcon />
            </button>
            {/* Profile avatar → opens right sidebar */}
            <button
              onClick={toggleRightSidebar}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center cursor-pointer hover:bg-gold/15 transition-colors active:scale-95"
              aria-label="Mon compte"
            >
              <span className="text-gold text-xs font-bold">A</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="mx-3 mb-2 flex items-center justify-around px-2 py-2 rounded-2xl border border-rim backdrop-blur-xl bg-ink/92 shadow-card">
          <BottomTab href="/" label="Accueil" active={pathname === '/'} icon={<HomeIcon />} />
          <button onClick={toggleSidebar} className="flex flex-col items-center gap-1 px-5 py-1.5 rounded-xl text-snow/35 hover:text-snow/70 transition-all active:scale-95">
            <HistoryIcon />
            <span className="text-[9px] font-medium tracking-wide">Chats</span>
          </button>
          <BottomTab href="/premium" label="Premium" active={pathname === '/premium'} icon={<StarTabIcon />} />
        </div>
      </nav>
    </>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className={cn('text-sm px-3 py-1.5 rounded-xl transition-all duration-200', active ? 'text-snow bg-snow-dim' : 'text-snow/50 hover:text-snow hover:bg-snow-dim')}>
      {children}
    </Link>
  );
}

function BottomTab({ href, label, active, icon }: { href: string; label: string; active: boolean; icon: React.ReactNode }) {
  return (
    <Link href={href} className={cn('flex flex-col items-center gap-1 px-5 py-1.5 rounded-xl transition-all duration-200 active:scale-95', active ? 'text-gold' : 'text-snow/35 hover:text-snow/70')}>
      {icon}
      <span className="text-[9px] font-medium tracking-wide">{label}</span>
    </Link>
  );
}

function MenuIcon() {
  return <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M1.5 3.5h12M1.5 7.5h12M1.5 11.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function PlusIcon() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function HomeIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 8.5L9 2l7 6.5V16a1 1 0 01-1 1H11v-4H7v4H3a1 1 0 01-1-1V8.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>;
}
function HistoryIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.4"/><path d="M9 5.5V9l2.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function StarTabIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l1.8 4.2L15 7.5l-3 3 .7 4.3L9 12.6 5.3 14.8l.7-4.3-3-3 4.2-1.3L9 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>;
}
function MicIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="4.5" y="1" width="5" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M2.5 7a4.5 4.5 0 009 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M7 11.5V13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
}
