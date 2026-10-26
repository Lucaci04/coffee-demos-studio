import { Shrikhand, Space_Mono } from 'next/font/google';
import type * as React from 'react';
import './retro.css';

const display = Shrikhand({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-retro-display',
});

const body = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-retro-body',
});

export default function RetroLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return <div className={`retro ${display.variable} ${body.variable}`}>{children}</div>;
}
