'use client';

import type * as React from 'react';
import { useState } from 'react';
import { useCart } from '@/components/shared/useCart';
import type { Product } from '@/types/business';

type CatalogClientProps = {
  readonly products: readonly Product[];
};

const PRICE_FORMAT = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });

const TILTS = ['rotate-[-1.5deg]', 'rotate-[1deg]', 'rotate-[-0.5deg]'] as const;

export function CatalogClient({ products }: CatalogClientProps): React.JSX.Element {
  const cart = useCart(products);
  const [notice, setNotice] = useState('');

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <ul className="grid gap-10 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
        {products.map((product, position) => (
          <li key={product.id} className={`vespera-hard flex flex-col bg-[var(--surface)] text-[var(--ink)] ${TILTS[position % TILTS.length] ?? ''}`}>
            <div
              aria-hidden="true"
              className="vespera-display flex aspect-square flex-col justify-between border-b-[3px] border-[var(--ink)] p-6"
              style={{ backgroundColor: product.packshot.bg, color: product.packshot.fg }}
            >
              <span className="vespera-ticket-label text-[14px]">{product.category}</span>
              <span className="text-4xl leading-none">{product.name}</span>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="vespera-display text-2xl">{product.name}</h3>
                <span className="vespera-sticker vespera-ticket-label shrink-0 px-3 py-1 text-[13px]">
                  {PRICE_FORMAT.format(product.priceEur)}
                </span>
              </div>
              <p className="text-sm">
                {product.detail} · {product.size}
              </p>
              <button
                type="button"
                onClick={() => {
                  cart.add(product.id);
                  setNotice(`${product.name} aggiunto al carrello.`);
                }}
                aria-label={`Add ${product.name} to cart`}
                className="vespera-ticket-label mt-auto cursor-pointer border-[3px] border-[var(--ink)] bg-[var(--accent)] px-4 py-3 text-[15px] text-[#fff8ea]"
              >
                Add to cart
              </button>
            </div>
          </li>
        ))}
      </ul>

      <aside aria-labelledby="cart-title" className="vespera-hard bg-[var(--surface)] p-6 text-[var(--ink)] lg:col-span-4">
        <h3 id="cart-title" className="vespera-display text-4xl">
          Cart
        </h3>
        <p aria-live="polite" className="vespera-ticket-label mt-2 text-[15px] text-[var(--accent)]">
          {cart.count} {cart.count === 1 ? 'item' : 'items'}
        </p>

        {cart.lines.length === 0 ? (
          <p className="mt-6 text-sm">Empty. Go on, make a mess of it.</p>
        ) : (
          <ul className="mt-6 grid gap-4">
            {cart.lines.map((line) => (
              <li key={line.product.id} className="flex items-center justify-between gap-4 border-t-2 border-[var(--ink)] pt-4 text-sm">
                <div>
                  <p className="font-semibold">{line.product.name}</p>
                  <p>{PRICE_FORMAT.format(line.product.priceEur * line.qty)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Remove one ${line.product.name}`}
                    onClick={() => cart.change(line.product.id, -1)}
                    className="vespera-hard h-9 w-9 cursor-pointer bg-[var(--bg)]"
                  >
                    −
                  </button>
                  <span className="vespera-ticket-label w-6 text-center text-[15px]">{line.qty}</span>
                  <button
                    type="button"
                    aria-label={`Add one more ${line.product.name}`}
                    onClick={() => cart.change(line.product.id, 1)}
                    className="vespera-hard h-9 w-9 cursor-pointer bg-[var(--bg)]"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex items-baseline justify-between border-t-[3px] border-[var(--ink)] pt-5">
          <p className="vespera-ticket-label text-[15px]">Subtotal</p>
          <p className="vespera-display text-3xl">{PRICE_FORMAT.format(cart.subtotal)}</p>
        </div>
        <button
          type="button"
          disabled={cart.count === 0}
          onClick={() => setNotice('Demo only: nothing is ordered and no payment is taken.')}
          className="vespera-ticket-label vespera-hard mt-6 w-full cursor-pointer bg-[var(--accent-2)] px-4 py-4 text-[16px] text-[var(--ink)] disabled:opacity-40"
        >
          Checkout (demo)
        </button>
        <p role="status" className="mt-4 text-sm">
          {notice}
        </p>
      </aside>
    </div>
  );
}
