import type { Metadata } from 'next';
import type * as React from 'react';
import { BotanicalSvgArt } from '@/components/demo-1/BotanicalSvgArt';
import { FlavorFilterClient } from '@/components/demo-1/FlavorFilterClient';
import { OriginDrawerClient } from '@/components/demo-1/OriginDrawerClient';
import { StudioReturnPill } from '@/components/shared/StudioReturnPill';
import { CookieConsentClient } from '@/components/shared/CookieConsentClient';
import { LegalDetails } from '@/components/shared/LegalDetails';
import { CatalogClient } from '@/components/demo-1/CatalogClient';
import { KANSO_BUSINESS } from '@/data/fictional-businesses';
import { KANSO_LOTS, KANSO_POUR_OVERS } from '@/data/kanso-data';
import { KANSO_DISHES } from '@/data/kanso-studio-data';
import { MenuGrid } from '@/components/demo-1/MenuGrid';
import { StudioLocationSection } from '@/components/demo-1/StudioLocationSection';

export const metadata: Metadata = {
  title: 'KANSO — Nordic Minimalist & Kinfolk Editorial',
  description: 'KANSO: Kyoto–Copenhagen sensory minimalism. Seasonal pour-overs and single-origin lot dossiers.',
};

const NAV_LINKS = [
  { href: '#menu', label: 'Menu' },
  { href: '#lots', label: 'Lots' },
  { href: '#space', label: 'Space' },
  { href: '#visit', label: 'Visit' },
] as const;

export default function KansoPage(): React.JSX.Element {
  return (
    <>
      <header className="border-b kanso-rule">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-4 py-5 sm:px-6">
          <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1"><span className="kanso-serif text-2xl font-medium">KANSO</span><span className="kanso-mono kanso-muted">Demo 1 · Minimalist · Fictional business</span></p>
          <nav aria-label="KANSO sections">
            <ul className="flex gap-5 sm:gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="kanso-mono hover:text-[var(--moss)]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section id="top" aria-labelledby="hero-title" className="mx-auto max-w-[1200px] px-4 pb-20 pt-12 sm:px-6 sm:pt-20">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 flex items-start gap-4 md:col-span-2 md:block">
              <p className="kanso-mono kanso-muted kanso-vertical md:mx-auto md:h-64">
                35.0116° N, 135.7681° E — Seasonal Archive N° 04
              </p>
            </div>

            <div className="col-span-12 md:col-span-5 md:pt-10">
              <h1 id="hero-title" className="kanso-serif text-[clamp(2.75rem,7vw,5.25rem)] font-medium">
                Less, brewed <em className="font-normal italic">slowly.</em>
              </h1>
              <p className="mt-8 max-w-[44ch] text-base kanso-muted">
                A seasonal room for single-origin coffee and botanical infusions. Every lot is chosen for clarity
                rather than weight, brewed at the temperature that lets it speak.
              </p>
              <p className="kanso-mono mt-10">Kyoto · Copenhagen · Est. 2019</p>
            </div>

            <figure className="col-span-12 md:col-span-5">
              {/* LCP visual: explicit size, eager load, high priority, sync decode. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/minimal-flat-red.jpg"
                alt="Flat white in a plain ceramic cup, seen from above"
                width={800}
                height={1000}
                fetchPriority="high"
                loading="eager"
                decoding="sync"
                className="aspect-[4/5] w-full object-cover border kanso-rule"
              />
              <figcaption className="kanso-mono kanso-muted mt-3">Plate N° 04 — Flat white, 65 °C · Photo CC0</figcaption>
            </figure>
          </div>
        </section>

        <section id="menu" aria-labelledby="menu-title" className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
            <div className="col-span-12 md:col-span-4">
              <p className="kanso-mono kanso-muted">01 — Seasonal menu</p>
              <h2 id="menu-title" className="kanso-serif mt-3 text-4xl sm:text-5xl">
                Pour-over &amp; espresso index
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <FlavorFilterClient items={KANSO_POUR_OVERS} />
            </div>
          </div>
        </section>

        <section id="lots" aria-labelledby="lots-title" className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
            <div className="col-span-12 md:col-span-4">
              <p className="kanso-mono kanso-muted">02 — Harvest traceability</p>
              <h2 id="lots-title" className="kanso-serif mt-3 text-4xl sm:text-5xl">
                Lot dossiers
              </h2>
              <p className="mt-6 text-sm kanso-muted">
                Four micro-lots, each traced from cherry to crop. Figures are illustrative demonstration data.
              </p>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <OriginDrawerClient lots={KANSO_LOTS} />
            </div>
          </div>
        </section>

        <section id="space" aria-labelledby="space-title" className="border-y kanso-rule">
          <div className="mx-auto grid max-w-[1200px] grid-cols-12 gap-x-6 gap-y-12 px-4 py-24 sm:px-6">
            <div className="col-span-12 md:col-span-6">
              <p className="kanso-mono kanso-muted">03 — Architectural space &amp; slow rituals</p>
              <h2 id="space-title" className="kanso-serif mt-3 text-4xl sm:text-5xl">
                A room tuned to the cup.
              </h2>
              <div className="mt-8 grid gap-6 text-base kanso-muted">
                <p>
                  Acoustics are kept low and warm: linen panels, a single long table and no music before noon.
                  Conversation stays at the level of the grinder.
                </p>
                <p>
                  Vessels are handmade stoneware, glazed in matte ash. Water is mineralised to{' '}
                  <span className="kanso-mono text-[var(--ink)]">45 ppm GH / 20 ppm KH</span>, so extraction reads
                  the same from one day to the next.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <BotanicalSvgArt />
            </div>
          </div>
        </section>

        <section id="shop" aria-labelledby="shop-title" className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
          <p className="kanso-mono kanso-muted">07 — Shop</p>
          <h2 id="shop-title" className="kanso-serif mt-3 text-4xl sm:text-5xl">The shelf</h2>
          <p className="mt-6 max-w-[52ch] text-sm kanso-muted">Beans, brewing and gifts. Prices include VAT. Demonstration catalog, no order is placed.</p>
          <div className="mt-12"><CatalogClient products={KANSO_BUSINESS.products} /></div>
        </section>

        <section id="kitchen" aria-labelledby="kitchen-title" className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
            <div className="col-span-12 md:col-span-4">
              <p className="kanso-mono kanso-muted">05 — Kitchen, with numbers</p>
              <h2 id="kitchen-title" className="kanso-serif mt-3 text-4xl sm:text-5xl">
                Plates &amp; nutrition
              </h2>
              <p className="mt-6 text-sm kanso-muted">
                Open a plate for its energy and macros. Values are illustrative demonstration data.
              </p>
            </div>
            <div className="col-span-12 md:col-span-8">
              <MenuGrid dishes={KANSO_DISHES} />
            </div>
          </div>
        </section>

        <section id="people" aria-labelledby="people-title" className="border-t kanso-rule py-20">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <p className="kanso-mono kanso-muted">06 — People &amp; place</p>
            <h2 id="people-title" className="kanso-serif mt-3 mb-12 text-4xl sm:text-5xl">
              The team, and where to find us
            </h2>
            <StudioLocationSection />
            <p className="kanso-mono kanso-muted mt-12">Fictional team and address. Demonstration only.</p>
          </div>
        </section>

        <section id="visit" aria-labelledby="visit-title" className="mx-auto max-w-[1200px] px-4 py-20 sm:px-6">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-4">
              <p className="kanso-mono kanso-muted">04 — Flagships</p>
              <h2 id="visit-title" className="kanso-serif mt-3 text-4xl sm:text-5xl">
                Visit
              </h2>
            </div>
            <dl className="col-span-12 grid gap-10 md:col-span-7 md:col-start-6 sm:grid-cols-2">
              <div className="border-t kanso-rule pt-5">
                <dt className="kanso-serif text-2xl">Kyoto</dt>
                <dd className="mt-3 text-sm kanso-muted">
                  <span className="block">Tuesday–Sunday, 08:00–17:00</span>
                  <span className="block">Closed Mondays</span>
                </dd>
              </div>
              <div className="border-t kanso-rule pt-5">
                <dt className="kanso-serif text-2xl">Copenhagen</dt>
                <dd className="mt-3 text-sm kanso-muted">
                  <span className="block">Monday–Sunday, 08:30–16:30</span>
                  <span className="block">Brunch service until 13:00</span>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <footer className="border-t kanso-rule">
        <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6">
          <LegalDetails business={KANSO_BUSINESS} />
          <p className="kanso-mono kanso-muted mt-12">© 2026 KANSO Demo S.R.L. (fictional) · Demonstration site · Photos CC0</p>
        </div>
      </footer>

      <StudioReturnPill />
      <CookieConsentClient />
    </>
  );
}
