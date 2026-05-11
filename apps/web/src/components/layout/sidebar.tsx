'use client';

import { useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { useChatStore } from '@/store/chat-store';
import { cn } from '@/lib/cn';
import type { Conversation } from '@/store/chat-store';

export default function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const sidebarOpen = useChatStore((s) => s.sidebarOpen);
  const setSidebarOpen = useChatStore((s) => s.setSidebarOpen);
  const conversations = useChatStore((s) => s.conversations);
  const currentConversationId = useChatStore((s) => s.currentConversationId);
  const deleteConversation = useChatStore((s) => s.deleteConversation);
  const archiveConversation = useChatStore((s) => s.archiveConversation);
  const setCurrentConversation = useChatStore((s) => s.setCurrentConversation);
  const searchQuery = useChatStore((s) => s.searchQuery);
  const setSearchQuery = useChatStore((s) => s.setSearchQuery);

  // Filter conversations by search
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return conversations.filter((c) => !c.archived);
    const q = searchQuery.toLowerCase();
    return conversations.filter(
      (c) => !c.archived && c.title.toLowerCase().includes(q),
    );
  }, [conversations, searchQuery]);

  // Animation
  useEffect(() => {
    if (!sidebarRef.current || !overlayRef.current) return;

    if (sidebarOpen) {
      gsap.to(overlayRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(
        sidebarRef.current,
        { x: -16, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.32, ease: 'power3.out' },
      );
    } else {
      gsap.to(overlayRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.22, ease: 'power2.in' });
      gsap.to(sidebarRef.current, { x: -10, opacity: 0, duration: 0.22, ease: 'power2.in' });
    }
  }, [sidebarOpen]);

  const handleSelect = (conv: Conversation) => {
    setCurrentConversation(conv.id);
    router.push(`/c/${conv.id}`);
    setSidebarOpen(false);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    deleteConversation(id);
    if (currentConversationId === id) router.push('/');
  };

  const handleArchive = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    archiveConversation(id);
  };

  // Group by date
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  const grouped = filtered.reduce<Record<string, Conversation[]>>((acc, conv) => {
    const d = new Date(conv.updatedAt).toDateString();
    const key = d === today ? "Aujourd'hui" : d === yesterday ? 'Hier' : 'Plus ancien';
    if (!acc[key]) acc[key] = [];
    acc[key].push(conv);
    return acc;
  }, {});

  const groupOrder = ["Aujourd'hui", 'Hier', 'Plus ancien'];

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={() => setSidebarOpen(false)}
        className="fixed inset-0 z-40 opacity-0 pointer-events-none"
        style={{ background: 'rgba(11,11,11,0.65)', backdropFilter: 'blur(4px)' }}
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className="fixed top-0 left-0 z-50 h-full w-72 flex flex-col opacity-0"
        style={{
          background: 'rgba(11,11,11,0.96)',
          backdropFilter: 'blur(24px)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-rim">
          <span className="font-display font-bold text-base text-snow tracking-tight">
            Chat<span className="text-gold">Line</span>
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-snow/30 hover:text-snow/70 hover:bg-snow/[0.06] transition-all"
          >
            <CloseIcon />
          </button>
        </div>

        {/* New chat */}
        <div className="px-4 pt-3 pb-2">
          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl border border-dashed border-rim hover:border-gold/25 text-snow/40 hover:text-snow/70 transition-all duration-200 text-sm group"
          >
            <span className="w-5 h-5 rounded-md bg-snow/[0.06] flex items-center justify-center group-hover:bg-gold/[0.08] transition-colors">
              <PlusIcon />
            </span>
            Nouveau chat
          </Link>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-rim bg-snow/[0.03] focus-within:border-gold/20 transition-colors">
            <SearchIcon />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher…"
              className="flex-1 bg-transparent text-snow/75 placeholder-snow/25 text-xs outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-snow/25 hover:text-snow/60 transition-colors"
              >
                <CloseIcon size={10} />
              </button>
            )}
          </div>
        </div>

        {/* Conversations list */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-4 scrollbar-thin">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-snow/20 text-xs">
                {searchQuery ? 'Aucun résultat' : 'Aucune conversation'}
              </p>
            </div>
          ) : (
            groupOrder.map((group) => {
              const convs = grouped[group];
              if (!convs || convs.length === 0) return null;
              return (
                <div key={group}>
                  <p className="text-[10px] text-snow/20 font-medium px-2 mb-1.5 uppercase tracking-widest">
                    {group}
                  </p>
                  <div className="space-y-0.5">
                    {convs.map((conv) => (
                      <ConversationItem
                        key={conv.id}
                        conv={conv}
                        active={conv.id === currentConversationId}
                        onSelect={() => handleSelect(conv)}
                        onDelete={(e) => handleDelete(e, conv.id)}
                        onArchive={(e) => handleArchive(e, conv.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-rim px-4 py-4 space-y-1">
          <Link
            href="/premium"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gold/[0.06] transition-colors group"
          >
            <span className="w-7 h-7 rounded-lg bg-gold/[0.08] border border-gold/15 flex items-center justify-center group-hover:bg-gold/12 transition-colors">
              <StarIcon />
            </span>
            <div>
              <p className="text-sm font-medium text-snow/80">ChatLine Plus</p>
              <p className="text-[11px] text-snow/30">8,99€/mois · Accès illimité</p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}

function ConversationItem({
  conv,
  active,
  onSelect,
  onDelete,
  onArchive,
}: {
  conv: Conversation;
  active: boolean;
  onSelect: () => void;
  onDelete: (e: React.MouseEvent) => void;
  onArchive: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'group w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all duration-150',
        active
          ? 'bg-gold/[0.07] border border-gold/12 text-snow'
          : 'hover:bg-snow/[0.04] text-snow/50 hover:text-snow/80 border border-transparent',
      )}
    >
      <span className="flex-1 text-xs truncate">{conv.title}</span>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
        <button
          onClick={onArchive}
          title="Archiver"
          className="w-5 h-5 flex items-center justify-center rounded text-snow/25 hover:text-snow/60 hover:bg-snow/[0.06]"
        >
          <ArchiveIcon />
        </button>
        <button
          onClick={onDelete}
          title="Supprimer"
          className="w-5 h-5 flex items-center justify-center rounded text-snow/25 hover:text-red-400/70 hover:bg-snow/[0.06]"
        >
          <TrashIcon />
        </button>
      </div>
    </button>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function CloseIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 11 11" fill="none">
      <path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-snow/30">
      <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8.5 8.5L11 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M6.5 1l1.4 3.1L11.5 4.6l-2.5 2.4.6 3.4L6.5 8.8l-3.1 1.6.6-3.4L1.5 4.6l3.6-.5L6.5 1z" stroke="#F6D365" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1 2.5h8M3.5 2.5V1.5h3v1M2 2.5l.5 6.5h5L8 2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArchiveIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <rect x="0.8" y="1" width="8.4" height="2.2" rx="0.8" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1.5 3.2V8.5a.8.8 0 00.8.8h5.4a.8.8 0 00.8-.8V3.2M3.5 5.5h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}


