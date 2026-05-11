'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-[160ms] ease-out select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 disabled:pointer-events-none disabled:opacity-40';

    const variants = {
      primary:
        'bg-gold text-ink hover:brightness-110 active:scale-[0.97] hover:scale-[1.03] rounded-xl shadow-gold-sm',
      ghost:
        'text-snow/70 hover:text-snow hover:bg-snow-dim active:scale-[0.97] rounded-xl',
      outline:
        'border border-rim text-snow/70 hover:border-gold/40 hover:text-gold active:scale-[0.97] hover:scale-[1.02] rounded-xl',
    };

    const sizes = {
      sm: 'text-sm px-4 py-2',
      md: 'text-sm px-5 py-2.5',
      lg: 'text-base px-7 py-3.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <>
            <Spinner />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export { Button };
