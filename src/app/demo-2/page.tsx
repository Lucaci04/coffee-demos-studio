import type { Metadata } from 'next';
import type * as React from 'react';
import { ExtractionCalculatorClient } from '@/components/demo-2/ExtractionCalculatorClient';
import { RoastTelemetryClient } from '@/components/demo-2/RoastTelemetryClient';
import { SubscriptionFormClient } from '@/components/demo-2/SubscriptionFormClient';
import { StudioReturnPill } from '@/components/shared/StudioReturnPill';
import { CookieConsentClient } from '@/components/shared/CookieConsentClient';
import { LegalDetails } from '@/components/shared/LegalDetails';
import { CatalogClient } from '@/components/demo-2/CatalogClient';
import { SUNDAY_ROAST_BUSINESS } from '@/data/fictional-businesses';
import { MenuGrid } from '@/components/demo-2/MenuGrid';
import { StudioLocationSection } from '@/components/demo-2/StudioLocationSection';
import { RETRO_DISHES } from '@/data/retro-studio-data';

export const metadata: Metadata = {
  title: "SUNDAY ROAST '74 — Seventies Diner Roastery",
  description: "SUNDAY ROAST '74: a seventies roastery with a brew calculator, roast telemetry and a dispatch order form.",
};

const TICKER_LINE =
  "SUNDAY ROAST '74 // OPEN SUNDAYS 08:00–14:00 // ESPRESSO MACHINE: CHROME LEVER 1974 // HOUSE BLEND: NO. 7 // ";

const NAV_LINKS = [
  { href: '#calculator', label: 'Brew' },
  { href: '#telemetry', label: 'Roast' },
  { href: '#dispatch', label: 'Order' },
] as const;

export default function RetroPage(): React.JSX.Element {
  return (
    <>
      <div className="retro-ticker" role="note" aria-label="Shop news">
        <div className="retro-ticker__track retro-mono" aria-hidden="true">
          <span>{TICKER_LINE}</span>
          <span>{TICKER_LINE}</span>
        </div>
      </div>

      <header className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1"><span className="retro-display retro-title-shadow text-3xl sm:text-4xl">Sunday Roast</span><span className="retro-mono">Demo 2 · Retro · Fictional business</span></p>
        <nav aria-label="Sections">
          <ul className="retro-mono flex gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="retro-cell inline-block px-4 py-2 hover:bg-[var(--mustard)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="retro-stripes" aria-hidden="true" />

      <main>
        <section aria-labelledby="hero-title" className="mx-auto grid max-w-[1200px] grid-cols-12 gap-x-8 gap-y-12 px-4 py-14 sm:px-6 sm:py-20">
          <div className="col-span-12 md:col-span-6">
            <p className="retro-mono">Est. 1974 · Slow coffee for Sunday mornings</p>
            <h1 id="hero-title" className="retro-display retro-title-shadow mt-6 text-[clamp(3rem,9vw,6.5rem)]">
              Coffee, <span className="text-[var(--orange)]">slow</span> on Sundays.
            </h1>
            <p className="mt-8 max-w-[44ch] text-base leading-relaxed">
              Hand-roasted in small batches, brewed the way the old diner did it: patient, warm, a little bit loud.
              Work out your ratio below, or order a tin to take home.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#calculator" className="retro-cell retro-mono inline-block px-5 py-3 hover:bg-[var(--mustard)]">
                Open the brew calculator
              </a>
            </div>
          </div>

          <figure className="col-span-12 md:col-span-6">
            <div className="retro-cell p-3">
              {/* LCP visual: explicit size, eager load, high priority, sync decode. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/retro-rome-bar.jpg"
                alt="Chrome espresso machine and a bar counter in a café"
                width={1024}
                height={682}
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                className="aspect-[3/2] w-full rounded-[10px] object-cover"
              />
            </div>
            <figcaption className="retro-mono mt-3 text-[11px]">Plate 02 — Espresso bar, photo CC0</figcaption>
          </figure>
        </section>

        <section id="calculator" aria-labelledby="calculator-title" className="border-t-2 border-[var(--brown)] bg-[#fbf3e2]">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
            <p className="retro-mono">01 — Brew calculator</p>
            <h2 id="calculator-title" className="retro-display mt-4 text-4xl sm:text-6xl">
              Dial in your cup
            </h2>
            <p className="mt-6 max-w-[52ch] text-sm">
              Dose, ratio, water temperature, grind and pour timing, recalculated on every change.
            </p>
            <div className="retro-cell mt-10 overflow-hidden">
              <ExtractionCalculatorClient />
            </div>
          </div>
        </section>

        <section id="telemetry" aria-labelledby="telemetry-title" className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
          <p className="retro-mono">02 — Roast telemetry</p>
          <h2 id="telemetry-title" className="retro-display mt-4 text-4xl sm:text-6xl">
            Watch the roast
          </h2>
          <p className="mt-6 max-w-[52ch] text-sm">
            Bean temperature and rate of rise from charge to drop, for each batch on the roaster this week.
          </p>
          <div className="retro-cell mt-10 overflow-hidden">
            <RoastTelemetryClient />
          </div>
        </section>

        <section id="dispatch" aria-labelledby="dispatch-title" className="border-t-2 border-[var(--brown)] bg-[var(--mustard)]">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
            <p className="retro-mono">03 — Order by post</p>
            <h2 id="dispatch-title" className="retro-display mt-4 text-4xl sm:text-6xl">
              Tins for the kitchen shelf
            </h2>
            <p className="mt-6 max-w-[52ch] text-sm">
              Pick a size and a cadence. We check the details before the order is logged.
            </p>
            <div className="retro-cell mt-10 overflow-hidden bg-[var(--cream)]">
              <SubscriptionFormClient />
            </div>
          </div>
        </section>

        <section id="shop" aria-labelledby="shop-title" className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
          <p className="retro-mono">05 — The shop</p>
          <h2 id="shop-title" className="retro-display mt-4 text-4xl sm:text-6xl">Take it home</h2>
          <p className="mt-6 max-w-[52ch] text-sm">Beans, merch and the mug you wanted. Prices include VAT. Demonstration catalog, no order is placed.</p>
          <div className="mt-10"><CatalogClient products={SUNDAY_ROAST_BUSINESS.products} /></div>
        </section>

        <section id="kitchen" aria-labelledby="kitchen-title" className="border-t-2 border-[var(--brown)] bg-[var(--cream)]">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
            <p className="retro-mono">04 — The kitchen</p>
            <h2 id="kitchen-title" className="retro-display mt-4 text-4xl sm:text-6xl">
              Eat something, then roast
            </h2>
            <p className="mt-6 max-w-[52ch] text-sm">
              Every plate lists its energy and macros. Open a card to see the numbers. Values are illustrative.
            </p>
            <div className="mt-10">
              <MenuGrid dishes={RETRO_DISHES} />
            </div>
          </div>
        </section>

        <section id="people" aria-labelledby="people-title" className="border-t-2 border-[var(--brown)] bg-[var(--mustard)]">
          <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6">
            <p className="retro-mono">05 — The crew &amp; the corner</p>
            <h2 id="people-title" className="retro-display mt-4 mb-10 text-4xl sm:text-6xl">
              Who makes the coffee
            </h2>
            <StudioLocationSection />
            <p className="retro-mono mt-10 text-[11px]">Fictional team and address. Demonstration only.</p>
          </div>
        </section>
      </main>

      <footer className="mt-10">
        <div className="retro-stripes" aria-hidden="true" />
        <div className="retro-ink px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-[1200px]">
            <LegalDetails business={SUNDAY_ROAST_BUSINESS} />
            <p className="retro-mono mt-12 text-[11px]">© 2026 Sunday Roast &apos;74 Demo Ltda. (fictional) · Demonstration site · Photos CC0</p>
          </div>
        </div>
      </footer>

      <StudioReturnPill />
      <CookieConsentClient />
    </>
  );
}
