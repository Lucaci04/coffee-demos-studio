import { Cormorant_Garamond, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import type * as React from 'react';
import { PreviewArt } from '@/components/hub/PreviewArt';
import { STUDIO_INDEX } from '@/data/studio-index';

/* Hub-only fonts: loaded by this route, so demo routes do not preload them. */
const hubSerif = Cormorant_Garamond({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hub-serif-face',
});

const hubMono = JetBrains_Mono({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hub-mono-face',
});

/* Moderate eagerness: hovering or approaching a demo card prerenders the destination. */
const SPECULATION_RULES = {
  prerender: [{ where: { href_matches: '/demo-*' }, eagerness: 'moderate' }],
};

const PERFORMANCE_TARGETS = ['LCP < 1.8s', 'CLS 0.00', 'Strict TS'] as const;

export default function StudioHubPage(): React.JSX.Element {
  return (
    <div className={`min-h-dvh ${hubSerif.variable} ${hubMono.variable}`}>
      <script type="speculationrules">{JSON.stringify(SPECULATION_RULES)}</script>

      <header className="border-b border-hub-line">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <p className="font-hub-mono text-[11px] uppercase tracking-[0.14em] text-hub-muted">
            Coffee Demos Studio
          </p>
          <nav aria-label="Demo routes">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 font-hub-mono text-[11px] uppercase tracking-[0.14em]">
              {STUDIO_INDEX.map((demo) => (
                <li key={demo.slug}>
                  <Link href={`/${demo.slug}`} className="text-hub-ivory hover:text-hub-brass">
                    {demo.index} / {demo.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section aria-labelledby="hub-title" className="mx-auto max-w-[1200px] px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <p className="font-hub-mono text-[11px] uppercase tracking-[0.14em] text-hub-brass">
            Studio presentation — Index N° 00
          </p>
          <h1
            id="hub-title"
            className="mt-6 max-w-[16ch] font-hub-serif text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.02em]"
          >
            Three specialty rooms, three grammars.
          </h1>
          <p className="mt-8 max-w-[52ch] text-base leading-[1.65] text-hub-muted">
            Each concept is an independent site with its own type, palette, grid and interactive engine. Nothing is
            shared between them except the studio that built them.
          </p>
        </section>

        <section aria-labelledby="index-title" className="mx-auto max-w-[1200px] px-4 pb-24 sm:px-6">
          <h2 id="index-title" className="font-hub-mono text-[11px] uppercase tracking-[0.14em] text-hub-muted">
            Concept index
          </h2>

          <ol className="mt-6 border-t border-hub-line">
            {STUDIO_INDEX.map((demo) => (
              <li key={demo.slug} className="border-b border-hub-line">
                <article className="grid grid-cols-12 gap-x-6 gap-y-8 py-10 sm:py-14">
                  <div className="col-span-12 sm:col-span-2">
                    <p className="font-hub-mono text-[11px] tracking-[0.14em] text-hub-muted">{demo.index}</p>
                  </div>

                  <div className="col-span-12 sm:col-span-5">
                    <h3 className="font-hub-serif text-4xl font-medium leading-[1.05] tracking-[-0.02em] sm:text-5xl">
                      {demo.name}
                    </h3>
                    <p className="mt-4 max-w-[44ch] text-sm leading-[1.65] text-hub-muted">{demo.archetype}</p>

                    <dl className="mt-8 grid gap-6 text-sm">
                      <div>
                        <dt className="font-hub-mono text-[11px] uppercase tracking-[0.14em] text-hub-muted">
                          Typography
                        </dt>
                        <dd className="mt-2">{demo.typography.join(' / ')}</dd>
                      </div>
                      <div>
                        <dt className="font-hub-mono text-[11px] uppercase tracking-[0.14em] text-hub-muted">
                          Interactive engine
                        </dt>
                        <dd className="mt-2">
                          <ul className="grid gap-1">
                            {demo.engine.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-hub-mono text-[11px] uppercase tracking-[0.14em] text-hub-muted">
                          Colour swatches
                        </dt>
                        <dd className="mt-3">
                          <ul className="flex flex-wrap gap-3">
                            {demo.swatches.map((swatch) => (
                              <li key={swatch.hex} className="flex items-center gap-2 font-hub-mono text-[11px]">
                                <span
                                  aria-hidden="true"
                                  className="inline-block h-4 w-4 border border-hub-line"
                                  style={{ backgroundColor: swatch.hex }}
                                />
                                <span>
                                  {swatch.label} <span className="text-hub-muted">{swatch.hex}</span>
                                </span>
                              </li>
                            ))}
                          </ul>
                        </dd>
                      </div>
                    </dl>

                    <ul aria-label="Performance targets" className="mt-8 flex flex-wrap gap-2">
                      {PERFORMANCE_TARGETS.map((target) => (
                        <li
                          key={target}
                          className="border border-hub-line px-2.5 py-1 font-hub-mono text-[11px] tracking-[0.08em]"
                        >
                          {target}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/${demo.slug}`}
                      className="group mt-10 inline-flex items-center gap-3 font-hub-mono text-[11px] uppercase tracking-[0.14em] text-hub-ivory"
                    >
                      <span className="border-b border-hub-ivory pb-1 group-hover:border-hub-brass group-hover:text-hub-brass">
                        Enter {demo.name}
                      </span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  <figure className="col-span-12 sm:col-span-5 sm:col-start-8">
                    <div className="relative aspect-[4/5] w-full overflow-hidden border border-hub-line">
                      <PreviewArt slug={demo.slug} name={demo.name} />
                    </div>
                    <figcaption className="mt-3 font-hub-mono text-[11px] tracking-[0.08em] text-hub-muted">
                      Preview — {demo.name}
                    </figcaption>
                  </figure>
                </article>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="border-t border-hub-line">
        <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-4 px-4 py-8 font-hub-mono text-[11px] uppercase tracking-[0.14em] text-hub-muted sm:px-6">
          <p>Studio index</p>
          <p>Next.js 15 · React 19 · Tailwind v4</p>
        </div>
      </footer>
    </div>
  );
}
