import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/lib/lenis-provider';

// Canela substitute — editorial serif for display headings
const canela = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-canela',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

// Mier substitute — humanist sans for all UI text
const mier = DM_Sans({
  subsets: ['latin'],
  variable: '--font-mier',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'ChatLine � Intelligence artificielle premium',
  description: "L'assistant IA le plus elegant. Conversez, creez et explorez.",
  themeColor: '#0B0B0B',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  openGraph: {
    title: 'ChatLine',
    description: "L'assistant IA le plus elegant.",
    type: 'website',
    siteName: 'ChatLine',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${canela.variable} ${mier.variable}`}>
      <body className="font-sans bg-ink text-snow antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
