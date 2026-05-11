/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B0B0B',
          deep: '#080808',
          card: '#111111',
          surface: '#161616',
        },
        gold: {
          DEFAULT: '#F6D365',
          hover: '#F8DA78',
          dim: '#C9A427',
          glow: 'rgba(246,211,101,0.15)',
          subtle: 'rgba(246,211,101,0.08)',
        },
        snow: {
          DEFAULT: '#F5F5F5',
          muted: 'rgba(245,245,245,0.55)',
          subtle: 'rgba(245,245,245,0.25)',
          dim: 'rgba(245,245,245,0.06)',
        },
        gray: {
          DEFAULT: '#A1A1A1',
          dark: '#666666',
          dim: 'rgba(161,161,161,0.12)',
          subtle: 'rgba(161,161,161,0.06)',
        },
        glass: 'rgba(255,255,255,0.03)',
        rim: 'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        sans: ['var(--font-mier)', 'DM Sans', 'system-ui', 'sans-serif'],
        display: ['var(--font-canela)', 'Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        app: '1100px',
      },
      borderRadius: {
        DEFAULT: '8px',
        sm: '4px',
        md: '8px',
        lg: '10px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '22px',
        '4xl': '30px',
        full: '9999px',
      },
      boxShadow: {
        gold: '0 0 30px rgba(246,211,101,0.10), 0 0 60px rgba(246,211,101,0.04)',
        'gold-sm': '0 0 15px rgba(246,211,101,0.07)',
        card: '0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.04) inset',
        input: '0 0 0 1px rgba(255,255,255,0.06), 0 2px 16px rgba(0,0,0,0.4)',
        'input-focus': '0 0 0 1px rgba(246,211,101,0.35), 0 0 20px rgba(246,211,101,0.06)',
      },
      keyframes: {
        'glow-breathe': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(246,211,101,0.05)' },
          '50%': { boxShadow: '0 0 45px rgba(246,211,101,0.16)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'line-draw': {
          '0%': { strokeDashoffset: '2000' },
          '100%': { strokeDashoffset: '0' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.3)' },
        },
        'wave': {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1.6)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'glow-breathe': 'glow-breathe 4s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'cursor-blink': 'cursor-blink 1.1s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'line-draw': 'line-draw 2.5s ease-out forwards',
        'pulse-dot': 'pulse-dot 2.5s ease-in-out infinite',
        'wave': 'wave 1.2s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'scroll-x': 'scroll-x 22s linear infinite',
      },
      backdropBlur: {
        xs: '4px',
      },
    },
  },
  plugins: [],
};
