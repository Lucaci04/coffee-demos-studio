'use client';

import type * as React from 'react';
import { useEffect, useState } from 'react';
import { type AmbianceMode, modeForHour } from '@/data/vespera-data';

type AmbianceSwitcherClientProps = {
  readonly children: React.ReactNode;
};

const TOGGLE_OPTIONS: readonly { readonly id: AmbianceMode; readonly label: string; readonly hours: string }[] = [
  { id: 'diurno', label: '☀ DIURNO', hours: '07:00–16:00' },
  { id: 'notturno', label: '☾ NOTTURNO', hours: '17:00–01:00' },
];

/* Server renders DIURNO. The clock is read after mount so server HTML never depends on the visitor's time. */
export function AmbianceSwitcherClient({ children }: AmbianceSwitcherClientProps): React.JSX.Element {
  const [mode, setMode] = useState<AmbianceMode>('diurno');

  useEffect(() => {
    setMode(modeForHour(new Date().getHours()));
  }, []);

  return (
    <div id="vespera-stage" data-mode={mode} className="vespera-stage">
      <header className="sticky top-0 z-30 border-b border-[var(--rule)] bg-[var(--bg)]/95 backdrop-blur-[2px]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <p className="vespera-ticket-label text-sm">Vespera</p>
          <nav aria-label="VESPERA sections">
            <ul className="vespera-ticket-label flex gap-4 text-[11px]">
              <li>
                <a href="#menu" className="hover:text-[var(--accent)]">Menu</a>
              </li>
              <li>
                <a href="#listening" className="hover:text-[var(--accent)]">Listening</a>
              </li>
              <li>
                <a href="#visit" className="hover:text-[var(--accent)]">Hours</a>
              </li>
            </ul>
          </nav>
          <div role="group" aria-label="Ambiance" className="flex gap-2">
            {TOGGLE_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={mode === option.id}
                aria-controls="vespera-stage"
                onClick={() => setMode(option.id)}
                className="vespera-ticket-label cursor-pointer border border-[var(--accent)] px-3 py-2 text-[11px] transition-colors duration-[450ms] aria-pressed:bg-[var(--accent)] aria-pressed:text-[var(--bg)]"
              >
                {option.label} <span className="opacity-70">({option.hours})</span>
              </button>
            ))}
          </div>
          <p aria-live="polite" className="sr-only">
            {mode === 'diurno' ? 'Diurno ambiance active' : 'Notturno ambiance active'}
          </p>
        </div>
      </header>
      {children}
    </div>
  );
}
