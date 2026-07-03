import type {Metadata} from 'next';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import BackToTop from '@/components/back-to-top';
import WelcomePopup from '@/components/welcome-popup';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'StreamBox - Free Movie Downloads',
    template: '%s | StreamBox'
  },
  description: 'Download the latest movies in high quality, including trending web series, exclusive collections, and more.',
  openGraph: {
    title: 'StreamBox - Free Movie Downloads',
    description: 'Download the latest movies in high quality, including trending web series, exclusive collections, and more.',
    siteName: 'StreamBox',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StreamBox - Free Movie Downloads',
    description: 'Download the latest movies in high quality, including trending web series, exclusive collections, and more.',
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.className} min-h-screen flex flex-col selection:bg-primary/30 selection:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <BackToTop />
          <WelcomePopup />
        </ThemeProvider>
      </body>
    </html>
  );
}
