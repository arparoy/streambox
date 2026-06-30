import type {Metadata} from 'next';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import BackToTop from '@/components/back-to-top';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StreamBox - Free Movie Downloads',
  description: 'Download the latest movies in high quality.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning className={`${inter.className} min-h-screen flex flex-col selection:bg-primary/30 selection:text-white`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
