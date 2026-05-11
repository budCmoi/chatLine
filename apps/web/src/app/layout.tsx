import type { Metadata } from 'next';
import { Inter, Syne, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import LenisProvider from '@/lib/lenis-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'ChatLine — Intelligence artificielle premium',
  description:
    "L'assistant IA le plus élégant. Conversez, créez et explorez avec une intelligence artificielle conçue dans les moindres détails.",
  manifest: '/manifest.json',
  themeColor: '#050505',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icons/icon-192.png',
  },
  openGraph: {
    title: 'ChatLine — Intelligence artificielle premium',
    description: "L'assistant IA le plus élégant.",
    type: 'website',
    siteName: 'ChatLine',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChatLine — Intelligence artificielle premium',
    description: "L'assistant IA le plus élégant.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Google Tag Manager — offloaded to web worker via Partytown */}
        {GTM_ID && (
          <Script
            id="gtm-script"
            strategy="worker"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){
                  w[l]=w[l]||[];
                  w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
                  var f=d.getElementsByTagName(s)[0],
                      j=d.createElement(s),
                      dl=l!='dataLayer'?'&l='+l:'';
                  j.async=true;
                  j.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}'+dl;
                  f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}

        {/* GA4 — offloaded to web worker via Partytown */}
        {GA4_ID && (
          <>
            <Script
              strategy="worker"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
            />
            <Script
              id="ga4-init"
              strategy="worker"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer=window.dataLayer||[];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js',new Date());
                  gtag('config','${GA4_ID}');
                `,
              }}
            />
          </>
        )}
      </head>

      <body className="font-sans bg-ink text-snow antialiased">
        {/* GTM noscript fallback */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
