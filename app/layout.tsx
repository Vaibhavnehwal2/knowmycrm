import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KnowMyCRM - Find the right CRM & ERP fit',
  description: 'Get expert help choosing the right CRM and ERP, with shortlists, demo scripts, and partner introductions.',
  icons: {
    icon: '/brand/knowmycrm-logo.png',
    shortcut: '/brand/knowmycrm-logo.png',
    apple: '/brand/knowmycrm-logo.png',
  },
  openGraph: {
    title: 'KnowMyCRM - Find the right CRM & ERP fit',
    description: 'Get expert help choosing the right CRM and ERP, with shortlists, demo scripts, and partner introductions.',
    images: ['/brand/knowmycrm-logo.png'],
    type: 'website',
    siteName: 'KnowMyCRM',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KnowMyCRM - Find the right CRM & ERP fit',
    description: 'Get expert help choosing the right CRM and ERP, with shortlists, demo scripts, and partner introductions.',
    images: ['/brand/knowmycrm-logo.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
