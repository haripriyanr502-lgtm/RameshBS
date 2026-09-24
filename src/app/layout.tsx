import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ramesh B.S | Executive Portfolio & LCB Brigade',
  description:
    'Official Executive Portfolio of Bangalore Siddegowda Ramesh (Ramesh B.S) - Entrepreneur, CEO BSR IT Solutions, Charter Secretary Lions Club of Bangalore Brigade, Region Chairperson District 317F, Melvin Jones Fellow (MJF).',
  keywords: [
    'Ramesh B.S',
    'Bangalore Siddegowda Ramesh',
    'Lions Club of Bangalore Brigade',
    'LCB Brigade',
    'BSR IT Solutions',
    'Region Chairperson',
    'Melvin Jones Fellow',
    'Corporate Governance',
    'Philanthropy',
    'CSR Clean Water',
  ],
  authors: [{ name: 'Ramesh B.S' }],
  openGraph: {
    title: 'Ramesh B.S | Executive Portfolio & LCB Brigade',
    description: 'Corporate Leadership, IT Solutions, and Dual Affiliated Service Leadership.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-amber-400 selection:text-slate-950 font-sans">
        {children}
      </body>
    </html>
  );
}
