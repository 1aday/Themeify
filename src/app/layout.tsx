import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'shadcn/ui Theme Generator',
  description: 'AI-powered theme generator for shadcn/ui components',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@400;500;600;700&family=Fira+Code:wght@400;500&family=Roboto:wght@400;500;700&family=Open+Sans:wght@400;600;700&family=Poppins:wght@400;500;600;700&family=Merriweather:wght@400;700&family=Source+Code+Pro:wght@400;500;600&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&family=Raleway:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&family=Ubuntu:wght@400;500;700&family=PT+Sans:wght@400;700&family=PT+Serif:wght@400;700&family=Crimson+Text:wght@400;600;700&family=Libre+Baskerville:wght@400;700&family=Source+Sans+Pro:wght@400;600;700&family=Work+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
