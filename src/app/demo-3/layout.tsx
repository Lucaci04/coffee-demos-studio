import { Abril_Fatface, Anton, Caveat, Inter } from 'next/font/google';
import type * as React from 'react';
import './vespera.css';

const display = Abril_Fatface({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-vespera-display',
});

const condensed = Anton({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-vespera-condensed',
});

const script = Caveat({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-vespera-script',
});

const body = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-vespera-body',
});

export default function VesperaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return (
    <div className={`vespera ${display.variable} ${condensed.variable} ${script.variable} ${body.variable}`}>
      {children}
    </div>
  );
}
