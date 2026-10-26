'use client';

import type * as React from 'react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'demo-cookie-consent';

type Decision = 'accepted' | 'rejected';

function readDecision(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeDecision(decision: Decision): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, decision);
  } catch {
    /* Storage blocked: the banner closes for this view only. */
  }
}

/* Banner is hidden on the server and shown after mount, so the first HTML never depends on stored state. */
export function CookieConsentClient(): React.JSX.Element | null {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(readDecision() === null);
  }, []);

  if (!visible) {
    return null;
  }

  const decide = (decision: Decision): void => {
    writeDecision(decision);
    setVisible(false);
  };

  return (
    <section
      aria-labelledby="cookie-title"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-[680px] border border-[var(--pill-fg)] bg-[var(--pill-bg)] p-5 text-[var(--pill-fg)] shadow-lg sm:bottom-6"
    >
      <h2 id="cookie-title" className="text-base font-semibold">
        Cookies on this demo
      </h2>
      <p className="mt-2 text-sm leading-relaxed">
        This is a fictional business. Your choice is stored only in this browser (local storage). No analytics or
        advertising cookies are loaded. Company details are in the footer.
      </p>
      <div className="mt-4 flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={() => decide('rejected')}
          className="cursor-pointer border border-[var(--pill-fg)] px-4 py-2 text-sm"
        >
          Reject optional
        </button>
        <button
          type="button"
          onClick={() => decide('accepted')}
          className="cursor-pointer border border-[var(--pill-fg)] bg-[var(--pill-fg)] px-4 py-2 text-sm text-[var(--pill-bg)]"
        >
          Accept all
        </button>
      </div>
    </section>
  );
}
