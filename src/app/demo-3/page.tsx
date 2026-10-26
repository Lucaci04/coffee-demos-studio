import type { Metadata } from 'next';
import type * as React from 'react';
import { AmbianceSwitcherClient } from '@/components/demo-3/AmbianceSwitcherClient';
import { FilmGrainOverlay } from '@/components/demo-3/FilmGrainOverlay';
import { ReservationDrawerClient } from '@/components/demo-3/ReservationDrawerClient';
import { StudioReturnPill } from '@/components/shared/StudioReturnPill';
import { CookieConsentClient } from '@/components/shared/CookieConsentClient';
import { LegalDetails } from '@/components/shared/LegalDetails';
import { CatalogClient } from '@/components/demo-3/CatalogClient';
import { VESPERA_BUSINESS } from '@/data/fictional-businesses';
import { MenuGrid } from '@/components/demo-3/MenuGrid';
import { StudioLocationSection } from '@/components/demo-3/StudioLocationSection';
import { VESPERA_DISHES } from '@/data/vespera-studio-data';
import {
  DIURNO_CHAPTERS,
  DIURNO_SCHEDULE,
  type AmbianceMode,
  type ListeningSlot,
  type MenuChapter,
  NOTTURNO_CHAPTERS,
  NOTTURNO_SCHEDULE,
} from '@/data/vespera-data';

export const metadata: Metadata = {
  title: 'VESPERA — Loud Milan–Paris Espresso Bar',
  description: 'VESPERA: a loud Milan–Paris bar with polaroid walls, a marquee menu and a day-to-night switch.',
};

const PRICE_FORMAT = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });

/* Chapter cards each take a different accent and tilt, so no two read as a template row. */
const CHAPTER_STYLES = [
  'bg-[var(--accent-2)] rotate-[-1.2deg]',
  'bg-[var(--accent-3)] rotate-[0.9deg]',
  'bg-[var(--surface)] rotate-[-0.6deg]',
] as const;

const MARQUEE_DIURNO = 'CAFFÈ ★ CORNETTI ★ NEWSPAPERS ★ LEVER ESPRESSO ★ CAPPUCCINO ALL MORNING ★ ';
const MARQUEE_NOTTURNO = 'NEGRONI ★ NATURAL WINE ★ CICCHETTI ★ VINYL ON THE HORNS ★ LAST ROUND 01:00 ★ ';

/* Both ambiance states are rendered; the switcher's data-mode decides which one is visible (CSS only). */
function ChapterGrid({
  chapters,
  mode,
}: Readonly<{ chapters: readonly MenuChapter[]; mode: AmbianceMode }>): React.JSX.Element {
  return (
    <div className={`vespera-only-${mode} grid gap-8 md:grid-cols-3`}>
      {chapters.map((chapter, position) => (
        <section
          key={chapter.id}
          aria-labelledby={`chapter-${chapter.id}`}
          className={`vespera-hard p-6 text-[var(--ink)] ${CHAPTER_STYLES[position % CHAPTER_STYLES.length] ?? ''}`}
        >
          <h3 id={`chapter-${chapter.id}`} className="vespera-display text-3xl">
            {chapter.title}
          </h3>
          <ul className="mt-6 grid gap-4">
            {chapter.items.map((item) => (
              <li key={item.name} className="flex items-start justify-between gap-4 border-t-2 border-[var(--ink)] pt-3">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="mt-1 text-sm">{item.note}</p>
                </div>
                <span className="vespera-sticker vespera-ticket-label shrink-0 px-3 py-1 text-[13px]">
                  {PRICE_FORMAT.format(item.priceEur)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function ScheduleList({
  slots,
  mode,
}: Readonly<{ slots: readonly ListeningSlot[]; mode: AmbianceMode }>): React.JSX.Element {
  return (
    <ol className={`vespera-only-${mode} mt-8 grid gap-5`}>
      {slots.map((slot) => (
        <li key={slot.time} className="vespera-hard grid grid-cols-[6rem_1fr] items-center gap-4 bg-[var(--surface)] p-4">
          <p className="vespera-ticket-label text-3xl text-[var(--accent)]">{slot.time}</p>
          <p>
            <span className="vespera-display block text-2xl">{slot.title}</span>
            <span className="text-sm">{slot.detail}</span>
          </p>
        </li>
      ))}
    </ol>
  );
}

export default function VesperaPage(): React.JSX.Element {
  return (
    <>
      <FilmGrainOverlay />

      <AmbianceSwitcherClient>
        <div className="vespera-marquee" role="note" aria-label="Today on the menu">
          <div className="vespera-marquee__track vespera-ticket-label text-2xl" aria-hidden="true">
            <span className="vespera-only-diurno">{MARQUEE_DIURNO.repeat(2)}</span>
            <span className="vespera-only-notturno">{MARQUEE_NOTTURNO.repeat(2)}</span>
          </div>
        </div>

        <p className="vespera-ticket-label border-b-[3px] border-[var(--ink)] bg-[var(--surface)] px-4 py-2 text-center text-[14px]">
          Demo 3 · Loud · Fictional business
        </p>

        <main>
          <section aria-labelledby="hero-title" className="mx-auto grid max-w-[1200px] grid-cols-12 gap-x-8 gap-y-14 px-4 pb-20 pt-14 sm:px-6 md:pt-20">
            <div className="relative col-span-12 md:col-span-7">
              <p className="vespera-script text-3xl text-[var(--accent)]">
                <span className="vespera-only-diurno">good morning, espresso first</span>
                <span className="vespera-only-notturno">good evening, the records are on</span>
              </p>
              <h1 id="hero-title" className="vespera-display mt-2 text-[clamp(3.5rem,13vw,9rem)]">
                <span className="vespera-only-diurno">Espresso</span>
                <span className="vespera-only-notturno">Vespera</span>
                <span className="block text-[var(--accent)] italic">
                  <span className="vespera-only-diurno">at first light.</span>
                  <span className="vespera-only-notturno">after dark.</span>
                </span>
              </h1>
              <p className="vespera-only-diurno mt-8 max-w-[44ch] text-lg">
                Lever machine warm from seven. Cornetti out at eight, newspapers pressed flat on the bar, and a
                cappuccino that arrives before you finish the sentence.
              </p>
              <p className="vespera-only-notturno mt-8 max-w-[44ch] text-lg">
                Cold brew Negronis, natural wine poured unfiltered, small plates, and the turntables taking the room
                after seven. Bring a record, or just bring the evening.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <ReservationDrawerClient />
                <span className="vespera-sticker vespera-ticket-label vespera-only-diurno h-28 w-28 rotate-[-10deg] text-sm">
                  Open<br />07 — 16
                </span>
                <span className="vespera-sticker vespera-ticket-label vespera-only-notturno h-28 w-28 rotate-[8deg] bg-[var(--accent-3)] text-sm">
                  Open<br />17 — 01
                </span>
              </div>
            </div>

            <div className="relative col-span-12 min-h-[30rem] md:col-span-5">
              <figure className="vespera-polaroid absolute left-0 top-0 w-[72%] rotate-[-4deg]">
                {/* LCP visual: explicit size, eager load, high priority, sync decode. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/photos/loaded-whipped-espresso.jpg"
                  alt="Espresso topped with whipped cream in a white cup"
                  width={1024}
                  height={682}
                  fetchPriority="high"
                  loading="eager"
                  decoding="sync"
                  className="aspect-[3/2] w-full object-cover"
                />
                <figcaption className="vespera-script mt-2 text-xl">Booth 04, the usual</figcaption>
              </figure>

              <figure className="vespera-polaroid absolute right-0 top-[38%] w-[58%] rotate-[6deg]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/photos/loaded-cheesecake.jpg"
                  alt="Slice of Basque cheesecake on a plate"
                  width={1024}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="vespera-script mt-2 text-xl">Sunday cake, no apologies</figcaption>
              </figure>

              <figure className="vespera-polaroid absolute bottom-0 left-[12%] w-[50%] rotate-[-2deg]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/photos/loaded-beans-mug.jpg"
                  alt="Roasted coffee beans beside a white mug"
                  width={1024}
                  height={682}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/2] w-full object-cover"
                />
                <figcaption className="vespera-script mt-2 text-xl">house beans, roasted Tuesday</figcaption>
              </figure>
            </div>
          </section>

          <section id="menu" aria-labelledby="menu-title" className="border-y-[3px] border-[var(--ink)] bg-[var(--surface)]">
            <div className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
              <p className="vespera-script text-3xl text-[var(--accent)]">the menu, loudly</p>
              <h2 id="menu-title" className="vespera-display mt-2 text-5xl sm:text-7xl">
                <span className="vespera-only-diurno">Morning chapters</span>
                <span className="vespera-only-notturno">Evening chapters</span>
              </h2>
              <div className="mt-14">
                <ChapterGrid chapters={DIURNO_CHAPTERS} mode="diurno" />
                <ChapterGrid chapters={NOTTURNO_CHAPTERS} mode="notturno" />
              </div>
            </div>
          </section>

          <section id="listening" aria-labelledby="listening-title" className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
            <div className="grid gap-12 md:grid-cols-12">
              <div className="md:col-span-5">
                <p className="vespera-script text-3xl text-[var(--accent)]">the room has a soundtrack</p>
                <h2 id="listening-title" className="vespera-display mt-2 text-5xl">
                  <span className="vespera-only-diurno">Newspapers &amp; sides</span>
                  <span className="vespera-only-notturno">Tonight on the horns</span>
                </h2>
                <p className="vespera-only-notturno mt-6 max-w-[40ch] text-base">
                  Klipschorn horns, a rotary mixer, and requests taken by note at the bar. Nothing is sent by message.
                </p>
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <ScheduleList slots={DIURNO_SCHEDULE} mode="diurno" />
                <ScheduleList slots={NOTTURNO_SCHEDULE} mode="notturno" />
              </div>
            </div>
          </section>

          <section id="visit" aria-labelledby="visit-title" className="border-t-[3px] border-[var(--ink)] bg-[var(--accent)] text-[#fff8ea]">
            <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-16 sm:px-6 md:grid-cols-3">
              <h2 id="visit-title" className="vespera-display text-5xl">
                Open<br />daily
              </h2>
              <dl className="grid gap-6 md:col-span-2 md:grid-cols-2">
                <div className="vespera-sticker bg-[var(--surface)] px-6 py-4 text-[var(--ink)]">
                  <dt className="vespera-ticket-label text-sm">Diurno</dt>
                  <dd className="vespera-display text-3xl">07:00 – 16:00</dd>
                </div>
                <div className="vespera-sticker bg-[var(--accent-3)] px-6 py-4 text-[var(--ink)]">
                  <dt className="vespera-ticket-label text-sm">Notturno</dt>
                  <dd className="vespera-display text-3xl">17:00 – 01:00</dd>
                </div>
              </dl>
            </div>
          </section>

          <section id="shop" aria-labelledby="shop-title" className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
            <p className="vespera-script text-3xl text-[var(--accent)]">take a little home</p>
            <h2 id="shop-title" className="vespera-display mt-2 mb-14 text-5xl sm:text-7xl">The shop, loudly</h2>
            <CatalogClient products={VESPERA_BUSINESS.products} />
            <p className="mt-10 text-sm">Prices include VAT. Demonstration catalog, nothing is ordered.</p>
          </section>

          <section id="kitchen" aria-labelledby="kitchen-title" className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
            <p className="vespera-script text-3xl text-[var(--accent)]">eat, then tap your feet</p>
            <h2 id="kitchen-title" className="vespera-display mt-2 mb-14 text-5xl sm:text-7xl">
              The kitchen, loudly
            </h2>
            <MenuGrid dishes={VESPERA_DISHES} />
            <p className="mt-14 text-sm">Open a plate for its numbers. Values are illustrative, not medical advice.</p>
          </section>

          <section id="people" aria-labelledby="people-title" className="border-y-[3px] border-[var(--ink)] bg-[var(--surface)]">
            <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
              <p className="vespera-script text-3xl text-[var(--accent)]">the crew, the corner</p>
              <h2 id="people-title" className="vespera-display mt-2 mb-14 text-5xl sm:text-7xl">
                Who&apos;s behind the bar
              </h2>
              <StudioLocationSection />
              <p className="mt-14 text-sm">Fictional team and address. Demonstration only.</p>
            </div>
          </section>
        </main>

        <footer className="border-t-[3px] border-[var(--ink)]">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
            <LegalDetails business={VESPERA_BUSINESS} />
            <p className="mt-12 text-sm opacity-70">© 2026 VESPERA Demo S.r.l. (fictional) · Demonstration site · Photos CC0 · Bookings are demo-only and are not stored.</p>
          </div>
        </footer>

        <StudioReturnPill />
        <CookieConsentClient />
      </AmbianceSwitcherClient>
    </>
  );
}
