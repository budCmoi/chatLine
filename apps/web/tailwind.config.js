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
          DEFAULT: '#050505',
          deep: '#080808',
          card: '#0D0D0D',
          surface: '#111111',
        },
        gold: {
          DEFAULT: '#F5D042',
          hover: '#F7D960',
          dim: '#C9A820',
          glow: 'rgba(245,208,66,0.15)',
        },
        snow: {
          DEFAULT: '#F2F2F2',
          muted: 'rgba(242,242,242,0.55)',
          subtle: 'rgba(242,242,242,0.25)',
          dim: 'rgba(242,242,242,0.08)',
        },
        glass: 'rgba(255,255,255,0.04)',
        rim: 'rgba(255,255,255,0.07)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '10px',
        xl: '14px',
        '2xl': '20px',
        '3xl': '28px',
        '4xl': '36px',
      },
      boxShadow: {
        gold: '0 0 30px rgba(245,208,66,0.12), 0 0 60px rgba(245,208,66,0.04)',
        'gold-sm': '0 0 15px rgba(245,208,66,0.08)',
        card: '0 8px 40px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.04) inset',
        input: '0 0 0 1px rgba(255,255,255,0.07), 0 4px 24px rgba(0,0,0,0.5)',
      },
      keyframes: {
        'glow-breathe': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(245,208,66,0.06)' },
          '50%': { boxShadow: '0 0 50px rgba(245,208,66,0.18)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        'glow-breathe': 'glow-breathe 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'cursor-blink': 'cursor-blink 1.1s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      backdropBlur: {
        xs: '4px',
      },
    },
  },
  plugins: [],
};
