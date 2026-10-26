import type { Metadata } from 'next';
import type * as React from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Coffee Demos Studio — Index',
    template: '%s — Coffee Demos Studio',
  },
  description: 'Three independent specialty coffee concepts, presented as an editorial studio index.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
