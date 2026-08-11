import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ramesh B.S | Executive Portfolio & Service Leader',
  description: 'Official Executive Portfolio of Bangalore Siddegowda Ramesh (Ramesh B.S) - Entrepreneur, CEO, and Dual Affiliated Service Leader.',
  keywords: [
    'Ramesh B.S',
    'Bangalore Siddegowda Ramesh',
    'BSR IT Solutions',
    'Executive Leader',
    'Lions Clubs International',
    'Rotary Social Leader',
    'Dual Affiliated Service Leader',
    'Corporate Governance',
    'Philanthropy'
  ],
  authors: [{ name: 'Ramesh B.S' }],
  openGraph: {
    title: 'Ramesh B.S | Executive Portfolio',
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
    <html lang="en" className={`scroll-smooth ${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <body className="bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-amber-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
