import { Cormorant_Garamond, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import type * as React from 'react';
import './kanso.css';

const serif = Cormorant_Garamond({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kanso-serif',
});

const sans = Plus_Jakarta_Sans({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kanso-sans',
});

const mono = JetBrains_Mono({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kanso-mono',
});

export default function KansoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return (
    <div className={`kanso ${serif.variable} ${sans.variable} ${mono.variable}`}>{children}</div>
  );
}
