'use client';

import type * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { KansoLot } from '@/data/kanso-data';
import type { ScoreRange } from '@/types/coffee';

type DrawerState = { readonly state: 'closed' } | { readonly state: 'open'; readonly lotId: string };

type OriginDrawerClientProps = {
  readonly lots: readonly KansoLot[];
};

const RADAR_CENTER = 100;
const RADAR_RADIUS = 80;

/* SVG presentation attributes cannot read CSS variables, so the KANSO hexes are repeated here. */
const INK = '#181615';
const MOSS = '#3E4A3D';
const MUTED = '#5C564F';

function radarPoints(values: readonly ScoreRange[]): string {
  return values
    .map((value, axis) => {
      const angle = -Math.PI / 2 + (axis * 2 * Math.PI) / values.length;
      const radius = (RADAR_RADIUS * value) / 5;
      const x = RADAR_CENTER + radius * Math.cos(angle);
      const y = RADAR_CENTER + radius * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

function elevationPoints(samples: readonly number[]): string {
  const min = Math.min(...samples);
  const max = Math.max(...samples);
  const range = max - min || 1;
  const step = 300 / Math.max(samples.length - 1, 1);

  return samples
    .map((sample, index) => {
      const x = index * step;
      const y = 120 - ((sample - min) / range) * 100;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

export function OriginDrawerClient({ lots }: OriginDrawerClientProps): React.JSX.Element {
  const [drawer, setDrawer] = useState<DrawerState>({ state: 'closed' });
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const returnFocusId = useRef<string | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const activeLot = drawer.state === 'open' ? lots.find((lot) => lot.id === drawer.lotId) : undefined;

  const openDrawer = (lotId: string): void => {
    returnFocusId.current = lotId;
    setDrawer({ state: 'open', lotId });
  };

  const closeDrawer = useCallback((): void => {
    if (returnFocusId.current !== null) {
      triggerRefs.current.get(returnFocusId.current)?.focus();
    }
    setDrawer({ state: 'closed' });
  }, []);

  useEffect(() => {
    if (drawer.state !== 'open') {
      return;
    }

    const controller = new AbortController();

    window.addEventListener(
      'keydown',
      (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
          closeDrawer();
          return;
        }

        if (event.key !== 'Tab' || dialogRef.current === null) {
          return;
        }

        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, a[href]'));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (first === undefined || last === undefined) {
          return;
        }

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      },
      { signal: controller.signal },
    );

    window.addEventListener(
      'focusin',
      (event: FocusEvent): void => {
        const target = event.target;
        if (target instanceof Node && [...triggerRefs.current.values()].some((node) => node.contains(target))) {
          return;
        }
        if (dialogRef.current !== null && target instanceof Node && !dialogRef.current.contains(target)) {
          closeButtonRef.current?.focus();
        }
      },
      { signal: controller.signal },
    );

    closeButtonRef.current?.focus();

    return () => controller.abort();
  }, [drawer.state, closeDrawer]);

  return (
    <div>
      <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
        {lots.map((lot, position) => (
          <li key={lot.id} className={position % 2 === 1 ? 'md:mt-16' : undefined}>
            <article className="border-t kanso-rule pt-6">
              <p className="kanso-mono kanso-muted">Lot {String(position + 1).padStart(2, '0')}</p>
              <h3 className="kanso-serif mt-3 text-3xl sm:text-4xl">{lot.origin}</h3>
              <p className="mt-3 text-sm kanso-muted">
                {lot.producer} · {lot.variety} · {lot.process}
              </p>

              <dl className="mt-6 grid grid-cols-3 gap-4 border-y kanso-rule py-4 text-sm">
                <div>
                  <dt className="kanso-mono kanso-muted">Elevation</dt>
                  <dd className="mt-1">{lot.masl}</dd>
                </div>
                <div>
                  <dt className="kanso-mono kanso-muted">Harvest</dt>
                  <dd className="mt-1">{lot.harvest}</dd>
                </div>
                <div>
                  <dt className="kanso-mono kanso-muted">Cupping</dt>
                  <dd className="mt-1">{lot.cupping}</dd>
                </div>
              </dl>

              <button
                ref={(node: HTMLButtonElement | null): void => {
                  if (node) {
                    triggerRefs.current.set(lot.id, node);
                  } else {
                    triggerRefs.current.delete(lot.id);
                  }
                }}
                type="button"
                aria-haspopup="dialog"
                aria-controls={drawer.state === 'open' && drawer.lotId === lot.id ? 'lot-dossier' : undefined}
                aria-expanded={drawer.state === 'open' && drawer.lotId === lot.id}
                onClick={() => openDrawer(lot.id)}
                className="kanso-mono mt-6 border-b border-[var(--ink)] pb-1 cursor-pointer hover:text-[var(--moss)] hover:border-[var(--moss)] transition-colors duration-300"
              >
                Inspect Lot Dossier
              </button>
            </article>
          </li>
        ))}
      </ul>

      {activeLot ? (
        <>
          <div
            aria-hidden="true"
            onClick={closeDrawer}
            className="fixed inset-0 z-40 cursor-default bg-[rgb(24_22_21/0.35)]"
          />
          <aside
            id="lot-dossier"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lot-dossier-title"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xl overflow-y-auto bg-[var(--paper)] p-6 shadow-[0_0_48px_rgb(24_22_21/0.18)] sm:p-10"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="kanso-mono kanso-muted">Harvest traceability</p>
                <h2 id="lot-dossier-title" className="kanso-serif mt-3 text-3xl">
                  {activeLot.origin}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeDrawer}
                className="kanso-mono shrink-0 border-b border-[var(--ink)] pb-1 cursor-pointer"
              >
                Close
              </button>
            </div>

            <p className="mt-6 text-sm kanso-muted">{activeLot.story}</p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t kanso-rule pt-6 text-sm">
              <div>
                <dt className="kanso-mono kanso-muted">Producer</dt>
                <dd className="mt-1">{activeLot.producer}</dd>
              </div>
              <div>
                <dt className="kanso-mono kanso-muted">Soil</dt>
                <dd className="mt-1">{activeLot.soil}</dd>
              </div>
              <div>
                <dt className="kanso-mono kanso-muted">Elevation</dt>
                <dd className="mt-1">{activeLot.masl}</dd>
              </div>
              <div>
                <dt className="kanso-mono kanso-muted">Fermentation</dt>
                <dd className="mt-1">
                  {activeLot.fermentationHours > 0 ? `${activeLot.fermentationHours} h` : 'None, natural'}
                </dd>
              </div>
            </dl>

            <figure className="mt-8">
              <svg
                viewBox="0 0 300 130"
                width={300}
                height={130}
                role="img"
                aria-label={`Elevation profile, ${activeLot.masl}`}
                className="h-auto w-full"
              >
                <polyline
                  points={elevationPoints(activeLot.elevationSamplesM)}
                  fill="none"
                  stroke={MOSS}
                  strokeWidth="1.5"
                />
                <line x1="0" y1="124" x2="300" y2="124" stroke={INK} strokeOpacity="0.16" strokeWidth="1" />
              </svg>
              <figcaption className="kanso-mono kanso-muted mt-2">Elevation profile across plots</figcaption>
            </figure>

            <figure className="mt-8">
              <svg
                viewBox="0 0 200 200"
                width={200}
                height={200}
                role="img"
                aria-label="Flavour radar"
                className="mx-auto h-auto w-full max-w-[220px]"
              >
                <polygon
                  points={radarPoints([5, 5, 5, 5, 5])}
                  fill="none"
                  stroke={INK}
                  strokeOpacity="0.16"
                  strokeWidth="1"
                />
                <polygon
                  points={radarPoints(activeLot.radar)}
                  fill={MOSS}
                  fillOpacity="0.18"
                  stroke={MOSS}
                  strokeWidth="1.5"
                />
                {activeLot.radarLabels.map((label, axis) => {
                  const angle = -Math.PI / 2 + (axis * 2 * Math.PI) / activeLot.radarLabels.length;
                  const x = RADAR_CENTER + (RADAR_RADIUS + 14) * Math.cos(angle);
                  const y = RADAR_CENTER + (RADAR_RADIUS + 14) * Math.sin(angle);
                  return (
                    <text
                      key={label}
                      x={x.toFixed(1)}
                      y={y.toFixed(1)}
                      textAnchor="middle"
                      fontSize="9"
                      fill={MUTED}
                    >
                      {label}
                    </text>
                  );
                })}
              </svg>
              <figcaption className="kanso-mono kanso-muted mt-2">Flavour radar, 1–5</figcaption>
            </figure>

            <ol className="mt-8 grid gap-4 border-t kanso-rule pt-6 text-sm">
              {activeLot.timeline.map((step, position) => (
                <li key={step.stage} className="grid grid-cols-[2.5rem_1fr] gap-3">
                  <span className="kanso-mono kanso-muted pt-0.5">{String(position + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="kanso-mono block">{step.stage}</span>
                    {step.detail}
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </>
      ) : null}
    </div>
  );
}
