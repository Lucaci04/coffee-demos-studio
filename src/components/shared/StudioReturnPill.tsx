import Link from 'next/link';
import type * as React from 'react';

/* Floating return link. Server component: no client JS needed. */
export function StudioReturnPill(): React.JSX.Element {
  return (
    <Link
      href="/"
      className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full border border-current/20 bg-[color:var(--pill-bg,#111110)] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--pill-fg,#F4F1EA)] no-underline shadow-sm"
    >
      <span aria-hidden="true">←</span>
      Studio Index
    </Link>
  );
}
