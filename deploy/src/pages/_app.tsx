import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import AppShell from '@/components/layouts/AppShell';
import { SessionProvider } from "next-auth/react";
import { Roboto } from 'next/font/google'; // 1. Import next/font
import Script from 'next/script';

// Konfigurasi Font Roboto (Self-hosted otomatis oleh Next.js)
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps) {
  return (
    // 2. Terapkan font secara global melalui wrapper utama
    <main className={roboto.className}>
      {/* 3. Next/Script dengan strategi afterInteractive (tidak memblokir render utama) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>

      <SessionProvider session={session}>
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </SessionProvider>
    </main>
  );
}