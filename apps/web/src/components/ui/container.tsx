import { cn } from '@/lib/cn';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Use 'wide' for full-bleed sections (chat messages, page wrappers) */
  size?: 'default' | 'wide' | 'narrow';
}

/**
 * Central max-width container.
 * default: max-w-5xl  (chat, cards, forms)
 * wide:    max-w-7xl  (premium, feature grids)
 * narrow:  max-w-2xl  (pricing, overlays)
 */
export default function Container({ children, className, size = 'default' }: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8',
        size === 'default' && 'max-w-5xl',
        size === 'wide' && 'max-w-7xl',
        size === 'narrow' && 'max-w-2xl',
        className,
      )}
    >
      {children}
    </div>
  );
}
