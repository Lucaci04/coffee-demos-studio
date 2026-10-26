'use client';

import type * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  EMAIL_MAX,
  EXPERIENCES,
  GUEST_NAME_MAX,
  NOTES_MAX,
  PARTY_MAX,
  PARTY_MIN,
  SEATING_ZONES,
  SLOTS_BY_MODE,
  type ExperienceId,
  type SeatingZoneId,
} from '@/data/vespera-data';

type ReservationRequest = {
  readonly experience: ExperienceId;
  readonly date: string;
  readonly time: string;
  readonly party: number;
  readonly zone: SeatingZoneId;
  readonly guestName: string;
  readonly email: string;
  readonly phone: string;
  readonly notes: string;
};

type ReservationErrors = Partial<Record<'date' | 'time' | 'party' | 'guestName' | 'email' | 'phone' | 'notes', string>>;

type ValidationResult =
  | { readonly ok: true; readonly request: ReservationRequest }
  | { readonly ok: false; readonly errors: ReservationErrors };

type DrawerState = { readonly state: 'closed' } | { readonly state: 'open' };

type BookingStatus =
  | { readonly state: 'idle' }
  | { readonly state: 'invalid'; readonly errors: ReservationErrors }
  | { readonly state: 'confirmed'; readonly reference: string; readonly request: ReservationRequest };

type ReservationDraft = {
  readonly experience: ExperienceId;
  readonly date: string;
  readonly time: string;
  readonly party: string;
  readonly zone: SeatingZoneId;
  readonly guestName: string;
  readonly email: string;
  readonly phone: string;
  readonly notes: string;
};

const PARTY_OPTIONS: readonly string[] = Array.from({ length: PARTY_MAX - PARTY_MIN + 1 }, (_, index) =>
  String(PARTY_MIN + index),
);

const EMAIL_PATTERN = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;
const PHONE_PATTERN = /^\+?[0-9 ()-]{6,20}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const toIsoDate = (value: Date): string => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const slotsFor = (experience: ExperienceId): readonly string[] => {
  const option = EXPERIENCES.find((candidate) => candidate.id === experience);
  return option === undefined ? [] : SLOTS_BY_MODE[option.mode];
};

/* Strict schema: enum membership, bounded integers, format regexes, and no past dates. */
function validateReservation(draft: ReservationDraft, todayIso: string): ValidationResult {
  const errors: ReservationErrors = {};

  if (!EXPERIENCES.some((option) => option.id === draft.experience)) {
    errors.time = 'Choose an experience from the list.';
  }

  if (!SEATING_ZONES.some((option) => option.id === draft.zone)) {
    errors.time = 'Choose a seating zone from the list.';
  }

  if (!DATE_PATTERN.test(draft.date) || draft.date < todayIso) {
    errors.date = 'Choose a date from today onward.';
  }

  if (!slotsFor(draft.experience).includes(draft.time)) {
    errors.time = 'Choose a time slot for this experience.';
  }

  const party = Number(draft.party);
  if (!Number.isInteger(party) || party < PARTY_MIN || party > PARTY_MAX) {
    errors.party = `Party size is ${PARTY_MIN} to ${PARTY_MAX} guests.`;
  }

  const guestName = draft.guestName.trim();
  if (guestName.length === 0 || guestName.length > GUEST_NAME_MAX) {
    errors.guestName = `Enter a guest name, up to ${GUEST_NAME_MAX} characters.`;
  }

  const email = draft.email.trim();
  if (email.length > EMAIL_MAX || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  const phone = draft.phone.trim();
  if (!PHONE_PATTERN.test(phone)) {
    errors.phone = 'Enter a phone number, 6 to 20 characters.';
  }

  const notes = draft.notes.trim();
  if (notes.length > NOTES_MAX) {
    errors.notes = `Notes are limited to ${NOTES_MAX} characters.`;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    request: {
      experience: draft.experience,
      date: draft.date,
      time: draft.time,
      party,
      zone: draft.zone,
      guestName,
      email,
      phone,
      notes,
    },
  };
}

const INITIAL_DRAFT: ReservationDraft = {
  experience: 'diurno-table',
  date: '',
  time: SLOTS_BY_MODE.diurno[0] ?? '07:30',
  party: '2',
  zone: 'main-espresso-bar',
  guestName: '',
  email: '',
  phone: '',
  notes: '',
};

const FIELD_CLASS =
  'w-full border border-[var(--rule)] bg-transparent px-3 py-3 text-sm text-[var(--ink)] aria-[invalid=true]:border-[var(--accent)] aria-[invalid=true]:border-2';
const LABEL_CLASS = 'vespera-ticket-label mb-2 block text-[11px]';
const ERROR_CLASS = 'mt-2 text-xs text-[var(--accent)]';

export function ReservationDrawerClient(): React.JSX.Element {
  const [drawer, setDrawer] = useState<DrawerState>({ state: 'closed' });
  const [draft, setDraft] = useState<ReservationDraft>(INITIAL_DRAFT);
  const [status, setStatus] = useState<BookingStatus>({ state: 'idle' });

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);
  const firstFieldRef = useRef<HTMLSelectElement | null>(null);

  const closeDrawer = useCallback((): void => {
    setDrawer({ state: 'closed' });
    triggerRef.current?.focus();
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

        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, a[href], input:not([tabindex="-1"]), select, textarea'));
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
        if (target instanceof Node && triggerRef.current?.contains(target)) {
          return;
        }
        if (dialogRef.current !== null && target instanceof Node && !dialogRef.current.contains(target)) {
          firstFieldRef.current?.focus();
        }
      },
      { signal: controller.signal },
    );

    firstFieldRef.current?.focus();

    return () => controller.abort();
  }, [drawer.state, closeDrawer]);

  const updateDraft = <K extends keyof ReservationDraft>(key: K, value: ReservationDraft[K]): void => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();

    /* Honeypot: real guests never see or fill website_url. A filled value is dropped silently. */
    const honeypot = new FormData(event.currentTarget).get('website_url');
    if (typeof honeypot === 'string' && honeypot.trim() !== '') {
      return;
    }

    const result = validateReservation(draft, toIsoDate(new Date()));
    if (!result.ok) {
      setStatus({ state: 'invalid', errors: result.errors });
      return;
    }

    setStatus({
      state: 'confirmed',
      reference: `VSP-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
      request: result.request,
    });
  };

  const errors = status.state === 'invalid' ? status.errors : {};
  const slots = slotsFor(draft.experience);
  const experienceLabel = EXPERIENCES.find((option) => option.id === draft.experience)?.label ?? '';
  const zoneLabel = SEATING_ZONES.find((option) => option.id === draft.zone)?.label ?? '';

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-controls={drawer.state === 'open' ? 'reservation-drawer' : undefined}
        aria-expanded={drawer.state === 'open'}
        onClick={() => {
          setStatus({ state: 'idle' });
          setDrawer({ state: 'open' });
        }}
        className="vespera-ticket-label cursor-pointer border border-[var(--accent)] bg-[var(--accent)] px-6 py-4 text-[12px] text-[var(--bg)] transition-opacity duration-300 hover:opacity-90"
      >
        Reserve a table
      </button>

      {drawer.state === 'open' ? (
        <>
          <div
            aria-hidden="true"
            onClick={closeDrawer}
            className="fixed inset-0 z-40 cursor-default bg-black/50"
          />
          <aside
            id="reservation-drawer"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reservation-title"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-lg overflow-y-auto bg-[var(--bg)] text-[var(--ink)] shadow-[0_0_48px_rgb(0_0_0/0.35)]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[var(--rule)] px-6 py-5">
              <h2 id="reservation-title" className="vespera-display text-2xl">
                Table &amp; booth reservation
              </h2>
              <button
                type="button"
                onClick={closeDrawer}
                className="vespera-ticket-label cursor-pointer border-b border-[var(--accent)] pb-1 text-[11px]"
              >
                Close
              </button>
            </div>

            {status.state === 'confirmed' ? (
              <div className="p-6">
                <div className="vespera-perforation relative border border-[var(--accent)] p-6">
                  <p className="vespera-ticket-label text-[11px] text-[var(--accent)]">Reservation pass</p>
                  <p className="vespera-display mt-3 text-3xl">{status.request.guestName}</p>
                  <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="vespera-ticket-label text-[10px] opacity-70">Date</dt>
                      <dd>{status.request.date}</dd>
                    </div>
                    <div>
                      <dt className="vespera-ticket-label text-[10px] opacity-70">Time</dt>
                      <dd>{status.request.time}</dd>
                    </div>
                    <div>
                      <dt className="vespera-ticket-label text-[10px] opacity-70">Guests</dt>
                      <dd>{status.request.party}</dd>
                    </div>
                    <div>
                      <dt className="vespera-ticket-label text-[10px] opacity-70">Zone</dt>
                      <dd>{zoneLabel}</dd>
                    </div>
                  </dl>
                  <p className="vespera-ticket-label mt-8 text-[18px] text-[var(--accent)]">{status.reference}</p>
                </div>
                <p className="mt-6 text-sm opacity-80">
                  Demo only: this pass is not sent anywhere. Keep the reference for the front desk.
                </p>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} className="grid gap-5 p-6">
                <div>
                  <label htmlFor="res-experience" className={LABEL_CLASS}>
                    Experience
                  </label>
                  <select
                    id="res-experience"
                    ref={firstFieldRef}
                    name="experience"
                    value={draft.experience}
                    onChange={(event) => {
                      const next = EXPERIENCES.find((option) => option.id === event.currentTarget.value);
                      if (next !== undefined) {
                        const firstSlot = SLOTS_BY_MODE[next.mode][0] ?? '';
                        setDraft((current) => ({ ...current, experience: next.id, time: firstSlot }));
                      }
                    }}
                    className={FIELD_CLASS}
                  >
                    {EXPERIENCES.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="res-date" className={LABEL_CLASS}>
                      Date
                    </label>
                    <input
                      id="res-date"
                      name="date"
                      type="date"
                      value={draft.date}
                      onChange={(event) => updateDraft('date', event.currentTarget.value)}
                      aria-invalid={errors.date !== undefined}
                      aria-describedby={errors.date !== undefined ? 'res-date-error' : undefined}
                      className={FIELD_CLASS}
                    />
                    {errors.date !== undefined ? (
                      <p id="res-date-error" className={ERROR_CLASS}>
                        {errors.date}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="res-time" className={LABEL_CLASS}>
                      Time slot
                    </label>
                    <select
                      id="res-time"
                      name="time"
                      value={draft.time}
                      onChange={(event) => updateDraft('time', event.currentTarget.value)}
                      aria-invalid={errors.time !== undefined}
                      aria-describedby={errors.time !== undefined ? 'res-time-error' : undefined}
                      className={FIELD_CLASS}
                    >
                      {slots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    {errors.time !== undefined ? (
                      <p id="res-time-error" className={ERROR_CLASS}>
                        {errors.time}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="res-party" className={LABEL_CLASS}>
                      Guests
                    </label>
                    <select
                      id="res-party"
                      name="party"
                      value={draft.party}
                      onChange={(event) => updateDraft('party', event.currentTarget.value)}
                      className={FIELD_CLASS}
                    >
                      {PARTY_OPTIONS.map((count) => (
                        <option key={count} value={count}>
                          {count}
                        </option>
                      ))}
                    </select>
                    {errors.party !== undefined ? <p className={ERROR_CLASS}>{errors.party}</p> : null}
                  </div>

                  <div>
                    <label htmlFor="res-zone" className={LABEL_CLASS}>
                      Seating zone
                    </label>
                    <select
                      id="res-zone"
                      name="zone"
                      value={draft.zone}
                      onChange={(event) => {
                        const next = SEATING_ZONES.find((option) => option.id === event.currentTarget.value);
                        if (next !== undefined) {
                          updateDraft('zone', next.id);
                        }
                      }}
                      className={FIELD_CLASS}
                    >
                      {SEATING_ZONES.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="res-name" className={LABEL_CLASS}>
                    Guest name
                  </label>
                  <input
                    id="res-name"
                    name="guestName"
                    autoComplete="name"
                    maxLength={GUEST_NAME_MAX}
                    value={draft.guestName}
                    onChange={(event) => updateDraft('guestName', event.currentTarget.value)}
                    aria-invalid={errors.guestName !== undefined}
                    aria-describedby={errors.guestName !== undefined ? 'res-name-error' : undefined}
                    className={FIELD_CLASS}
                  />
                  {errors.guestName !== undefined ? (
                    <p id="res-name-error" className={ERROR_CLASS}>
                      {errors.guestName}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="res-email" className={LABEL_CLASS}>
                      Email
                    </label>
                    <input
                      id="res-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      maxLength={EMAIL_MAX}
                      value={draft.email}
                      onChange={(event) => updateDraft('email', event.currentTarget.value)}
                      aria-invalid={errors.email !== undefined}
                      aria-describedby={errors.email !== undefined ? 'res-email-error' : undefined}
                      className={FIELD_CLASS}
                    />
                    {errors.email !== undefined ? (
                      <p id="res-email-error" className={ERROR_CLASS}>
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="res-phone" className={LABEL_CLASS}>
                      Phone
                    </label>
                    <input
                      id="res-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      maxLength={20}
                      value={draft.phone}
                      onChange={(event) => updateDraft('phone', event.currentTarget.value)}
                      aria-invalid={errors.phone !== undefined}
                      aria-describedby={errors.phone !== undefined ? 'res-phone-error' : undefined}
                      className={FIELD_CLASS}
                    />
                    {errors.phone !== undefined ? (
                      <p id="res-phone-error" className={ERROR_CLASS}>
                        {errors.phone}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label htmlFor="res-notes" className={LABEL_CLASS}>
                    Dietary &amp; acoustic notes
                  </label>
                  <textarea
                    id="res-notes"
                    name="notes"
                    rows={3}
                    maxLength={NOTES_MAX}
                    value={draft.notes}
                    onChange={(event) => updateDraft('notes', event.currentTarget.value)}
                    aria-invalid={errors.notes !== undefined}
                    aria-describedby={errors.notes !== undefined ? 'res-notes-error' : undefined}
                    className={FIELD_CLASS}
                  />
                  {errors.notes !== undefined ? (
                    <p id="res-notes-error" className={ERROR_CLASS}>
                      {errors.notes}
                    </p>
                  ) : null}
                </div>

                <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                  <label>
                    Website
                    <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div role="status" aria-live="polite" className="text-sm">
                  {status.state === 'invalid' ? (
                    <p className="text-[var(--accent)]">Check the highlighted fields and resubmit.</p>
                  ) : (
                    <p className="opacity-70">
                      {experienceLabel} · {draft.party} guests · {zoneLabel}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="vespera-ticket-label cursor-pointer border border-[var(--accent)] bg-[var(--accent)] px-6 py-4 text-[12px] text-[var(--bg)]"
                >
                  Request booking
                </button>
              </form>
            )}
          </aside>
        </>
      ) : null}
    </>
  );
}
