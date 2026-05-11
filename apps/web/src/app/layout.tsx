import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/lib/lenis-provider';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
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
    <html lang="fr" className={jetbrainsMono.variable}>
      <body className="font-sans bg-ink text-snow antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
