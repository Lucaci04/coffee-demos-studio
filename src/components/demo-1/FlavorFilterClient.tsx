'use client';

import type * as React from 'react';
import { useState } from 'react';
import { KANSO_FILTERS, type KansoFilter, type KansoPourOver } from '@/data/kanso-data';

type FlavorFilterClientProps = {
  readonly items: readonly KansoPourOver[];
};

const SENSORY_AXES = [
  { key: 'acidity', label: 'Acidity' },
  { key: 'sweetness', label: 'Sweetness' },
  { key: 'body', label: 'Tactile Body' },
] as const;

const SCALE_STEPS = [1, 2, 3, 4, 5] as const;

const PRICE_FORMAT = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });

function filterPourOvers(items: readonly KansoPourOver[], filter: KansoFilter): readonly KansoPourOver[] {
  if (filter === 'all') {
    return items;
  }
  return items.filter((item) => item.profile === filter);
}

export function FlavorFilterClient({ items }: FlavorFilterClientProps): React.JSX.Element {
  const [filter, setFilter] = useState<KansoFilter>('all');
  const visible = filterPourOvers(items, filter);

  return (
    <div>
      <div role="group" aria-label="Filter by sensory profile" className="flex flex-wrap gap-x-6 gap-y-3">
        {KANSO_FILTERS.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={filter === option.id}
            onClick={() => setFilter(option.id)}
            className="kanso-mono border-b pb-1 transition-colors duration-300 aria-pressed:border-[var(--moss)] aria-pressed:text-[var(--moss)] border-[var(--rule)] cursor-pointer"
          >
            {option.label}
          </button>
        ))}
      </div>

      <p aria-live="polite" className="kanso-mono kanso-muted mt-6">
        Showing {visible.length} of {items.length} pours
      </p>

      <ol className="mt-6 border-t kanso-rule">
        {visible.map((item) => (
          <li key={item.id} className="grid grid-cols-12 gap-x-6 gap-y-4 border-b kanso-rule py-8">
            <p className="kanso-mono col-span-2 sm:col-span-1 pt-1">{item.index}</p>

            <div className="col-span-10 sm:col-span-5">
              <h3 className="kanso-serif text-2xl sm:text-3xl">{item.cultivar}</h3>
              <p className="kanso-muted mt-2 text-sm">
                {item.origin} — {item.notes}
              </p>
              <p className="kanso-mono mt-3">{item.process}</p>
            </div>

            <dl className="col-span-12 sm:col-span-4 grid gap-2 text-sm">
              {SENSORY_AXES.map((axis) => {
                const value = item.sensory[axis.key];
                return (
                  <div key={axis.key} className="flex items-center justify-between gap-4">
                    <dt className="kanso-mono kanso-muted">{axis.label}</dt>
                    <dd className="flex items-center gap-1">
                      {SCALE_STEPS.map((step) => (
                        <span key={step} aria-hidden="true" className="kanso-bar" data-on={step <= value} />
                      ))}
                      <span className="sr-only">{value} of 5</span>
                    </dd>
                  </div>
                );
              })}
            </dl>

            <div className="col-span-12 flex flex-wrap items-baseline justify-between gap-3 border-t kanso-rule pt-4">
              <p className="kanso-mono kanso-muted">
                {item.vessel} — {item.brewTempC} °C
              </p>
              <p className="kanso-serif text-xl">{PRICE_FORMAT.format(item.priceEur)}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
