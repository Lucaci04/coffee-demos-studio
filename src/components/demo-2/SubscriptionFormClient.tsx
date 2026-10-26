'use client';

import type * as React from 'react';
import { useState } from 'react';

type TinSize = '250g' | '1kg' | '5kg';
type Cadence = 'once' | 'every-2-weeks' | 'every-4-weeks' | 'every-6-weeks';
type GrindType = 'whole-bean' | 'espresso' | 'v60' | 'aeropress';

type DispatchOrder = {
  readonly name: string;
  readonly email: string;
  readonly size: TinSize;
  readonly cadence: Cadence;
  readonly grind: GrindType;
  readonly quantity: number;
};

type DispatchField = 'name' | 'email' | 'quantity';

type DispatchErrors = Partial<Record<DispatchField, string>>;

type ValidationResult =
  | { readonly ok: true; readonly order: DispatchOrder }
  | { readonly ok: false; readonly errors: DispatchErrors };

type FormStatus =
  | { readonly state: 'editing' }
  | { readonly state: 'invalid'; readonly errors: DispatchErrors }
  | { readonly state: 'confirmed'; readonly manifest: string; readonly order: DispatchOrder };

type DispatchDraft = {
  readonly name: string;
  readonly email: string;
  readonly size: TinSize;
  readonly cadence: Cadence;
  readonly grind: GrindType;
  readonly quantity: string;
};

const NAME_MAX = 80;
const EMAIL_MAX = 120;
const QUANTITY_MIN = 1;
const QUANTITY_MAX = 12;
const QUANTITY_PATTERN = /^[1-9]\d?$/;
const EMAIL_PATTERN = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;

const SIZE_OPTIONS: readonly { readonly id: TinSize; readonly label: string }[] = [
  { id: '250g', label: '250 g Lab Tin' },
  { id: '1kg', label: '1 kg Lab Tin' },
  { id: '5kg', label: '5 kg Roastery Tin' },
];

const CADENCE_OPTIONS: readonly { readonly id: Cadence; readonly label: string }[] = [
  { id: 'once', label: 'One-off dispatch' },
  { id: 'every-2-weeks', label: 'Every 2 weeks' },
  { id: 'every-4-weeks', label: 'Every 4 weeks' },
  { id: 'every-6-weeks', label: 'Every 6 weeks' },
];

const GRIND_OPTIONS: readonly { readonly id: GrindType; readonly label: string }[] = [
  { id: 'whole-bean', label: 'Whole bean' },
  { id: 'espresso', label: 'Espresso' },
  { id: 'v60', label: 'V60 / Kalita' },
  { id: 'aeropress', label: 'AeroPress' },
];

const isCadence = (value: string): value is Cadence => CADENCE_OPTIONS.some((option) => option.id === value);
const isGrind = (value: string): value is GrindType => GRIND_OPTIONS.some((option) => option.id === value);

const labelFor = <T extends string>(
  options: readonly { readonly id: T; readonly label: string }[],
  id: T,
): string => options.find((option) => option.id === id)?.label ?? id;

/* Strict schema: every field is trimmed, length-bounded, enum-checked or range-checked before it becomes an order. */
function validateDispatch(draft: DispatchDraft): ValidationResult {
  const errors: DispatchErrors = {};

  const name = draft.name.trim();
  if (name.length === 0 || name.length > NAME_MAX) {
    errors.name = `Enter a name, up to ${NAME_MAX} characters.`;
  }

  const email = draft.email.trim();
  if (email.length > EMAIL_MAX || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  const quantity = Number(draft.quantity);
  if (!QUANTITY_PATTERN.test(draft.quantity) || quantity < QUANTITY_MIN || quantity > QUANTITY_MAX) {
    errors.quantity = `Enter a whole number from ${QUANTITY_MIN} to ${QUANTITY_MAX}.`;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    order: { name, email, size: draft.size, cadence: draft.cadence, grind: draft.grind, quantity },
  };
}

const INITIAL_DRAFT: DispatchDraft = {
  name: '',
  email: '',
  size: '250g',
  cadence: 'every-4-weeks',
  grind: 'whole-bean',
  quantity: '1',
};

const FIELD_CLASS =
  'retro-mono w-full border border-[var(--brown)] bg-[var(--paper)] px-3 py-3 text-sm focus-visible:outline-2 focus-visible:outline-[var(--signal)] aria-[invalid=true]:border-[var(--signal)] aria-[invalid=true]:border-2';
const LABEL_CLASS = 'retro-mono mb-2 block text-[11px]';
const ERROR_CLASS = 'retro-mono mt-2 text-[11px] text-[var(--signal)]';

export function SubscriptionFormClient(): React.JSX.Element {
  const [draft, setDraft] = useState<DispatchDraft>(INITIAL_DRAFT);
  const [status, setStatus] = useState<FormStatus>({ state: 'editing' });

  const updateDraft = <K extends keyof DispatchDraft>(key: K, value: DispatchDraft[K]): void => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();

    /* Honeypot: real users never see or fill website_url. A filled value is dropped silently. */
    const honeypot = new FormData(event.currentTarget).get('website_url');
    if (typeof honeypot === 'string' && honeypot.trim() !== '') {
      return;
    }

    const result = validateDispatch(draft);
    if (!result.ok) {
      setStatus({ state: 'invalid', errors: result.errors });
      return;
    }

    setStatus({
      state: 'confirmed',
      manifest: `MNL-${String(Date.now()).slice(-6)}`,
      order: result.order,
    });
  };

  const errors = status.state === 'invalid' ? status.errors : {};
  const quantityNumber = Number(draft.quantity);

  return (
    <div className="grid grid-cols-12 border-l border-t border-[var(--brown)]">
      <form
        noValidate
        onSubmit={handleSubmit}
        aria-describedby="dispatch-status"
        className="col-span-12 grid gap-px border-b border-r border-[var(--brown)] bg-[var(--brown)] md:col-span-7"
      >
        <fieldset className="grid gap-5 bg-[var(--paper)] p-5">
          <legend className="retro-mono mb-2">05 · Dispatch details</legend>

          <div>
            <label htmlFor="dispatch-name" className={LABEL_CLASS}>
              Name or company
            </label>
            <input
              id="dispatch-name"
              name="name"
              autoComplete="name"
              maxLength={NAME_MAX}
              value={draft.name}
              onChange={(event) => updateDraft('name', event.currentTarget.value)}
              aria-invalid={errors.name !== undefined}
              aria-describedby={errors.name !== undefined ? 'dispatch-name-error' : undefined}
              className={FIELD_CLASS}
            />
            {errors.name !== undefined ? (
              <p id="dispatch-name-error" className={ERROR_CLASS}>
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="dispatch-email" className={LABEL_CLASS}>
              Email
            </label>
            <input
              id="dispatch-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={EMAIL_MAX}
              value={draft.email}
              onChange={(event) => updateDraft('email', event.currentTarget.value)}
              aria-invalid={errors.email !== undefined}
              aria-describedby={errors.email !== undefined ? 'dispatch-email-error' : undefined}
              className={FIELD_CLASS}
            />
            {errors.email !== undefined ? (
              <p id="dispatch-email-error" className={ERROR_CLASS}>
                {errors.email}
              </p>
            ) : null}
          </div>

          <fieldset>
            <legend className={LABEL_CLASS}>Tin size</legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {SIZE_OPTIONS.map((option) => (
                <label
                  key={option.id}
                  className="retro-mono flex cursor-pointer items-center justify-between border border-[var(--brown)] px-3 py-3 has-[:checked]:bg-[var(--brown)] has-[:checked]:text-[var(--paper)] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[var(--signal)]"
                >
                  <span>{option.label}</span>
                  <input
                    type="radio"
                    name="size"
                    value={option.id}
                    checked={draft.size === option.id}
                    onChange={() => updateDraft('size', option.id)}
                    className="sr-only"
                  />
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label htmlFor="dispatch-cadence" className={LABEL_CLASS}>
                Cadence
              </label>
              <select
                id="dispatch-cadence"
                name="cadence"
                value={draft.cadence}
                onChange={(event) => {
                  if (isCadence(event.currentTarget.value)) {
                    updateDraft('cadence', event.currentTarget.value);
                  }
                }}
                className={FIELD_CLASS}
              >
                {CADENCE_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="dispatch-grind" className={LABEL_CLASS}>
                Grind
              </label>
              <select
                id="dispatch-grind"
                name="grind"
                value={draft.grind}
                onChange={(event) => {
                  if (isGrind(event.currentTarget.value)) {
                    updateDraft('grind', event.currentTarget.value);
                  }
                }}
                className={FIELD_CLASS}
              >
                {GRIND_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="dispatch-quantity" className={LABEL_CLASS}>
                Tins per cycle
              </label>
              <input
                id="dispatch-quantity"
                name="quantity"
                type="number"
                inputMode="numeric"
                min={QUANTITY_MIN}
                max={QUANTITY_MAX}
                step={1}
                value={draft.quantity}
                onChange={(event) => updateDraft('quantity', event.currentTarget.value)}
                aria-invalid={errors.quantity !== undefined}
                aria-describedby={errors.quantity !== undefined ? 'dispatch-quantity-error' : undefined}
                className={FIELD_CLASS}
              />
              {errors.quantity !== undefined ? (
                <p id="dispatch-quantity-error" className={ERROR_CLASS}>
                  {errors.quantity}
                </p>
              ) : null}
            </div>
          </div>

          <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
            <label>
              Website
              <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <button
            type="submit"
            className="retro-ink retro-mono mt-2 cursor-pointer px-5 py-4 text-left hover:bg-[var(--signal)]"
          >
            Submit dispatch request
          </button>
        </fieldset>
      </form>

      <aside
        aria-label="Order manifest preview"
        className="col-span-12 border-b border-r border-[var(--brown)] p-5 md:col-span-5"
      >
        <p className="retro-mono">06 · Manifest preview</p>
        <dl className="mt-5 grid gap-4 text-sm">
          <ManifestRow label="Tin size" value={labelFor(SIZE_OPTIONS, draft.size)} />
          <ManifestRow label="Cadence" value={labelFor(CADENCE_OPTIONS, draft.cadence)} />
          <ManifestRow label="Grind" value={labelFor(GRIND_OPTIONS, draft.grind)} />
          <ManifestRow
            label="Per cycle"
            value={Number.isInteger(quantityNumber) && quantityNumber >= QUANTITY_MIN ? `${quantityNumber} × ${draft.size}` : '—'}
          />
        </dl>

        <div id="dispatch-status" role="status" aria-live="polite" className="mt-8 border-t border-[var(--brown)] pt-5">
          {status.state === 'confirmed' ? (
            <div>
              <p className="retro-mono">Request logged — {status.manifest}</p>
              <p className="mt-3 text-sm">
                {status.order.quantity} × {status.order.size} · {labelFor(CADENCE_OPTIONS, status.order.cadence)} ·{' '}
                {labelFor(GRIND_OPTIONS, status.order.grind)}. Demo only: nothing is sent to {status.order.email}.
              </p>
            </div>
          ) : status.state === 'invalid' ? (
            <p className="retro-mono text-[var(--signal)]">Check the highlighted fields and resubmit.</p>
          ) : (
            <p className="retro-mono">Awaiting submission.</p>
          )}
        </div>
      </aside>
    </div>
  );
}

type ManifestRowProps = {
  readonly label: string;
  readonly value: string;
};

function ManifestRow({ label, value }: ManifestRowProps): React.JSX.Element {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-3 border-b border-[var(--brown)] pb-3">
      <dt className="retro-mono text-[11px]">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
