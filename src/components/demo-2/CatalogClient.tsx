'use client';

import type * as React from 'react';
import { useState } from 'react';
import { useCart } from '@/components/shared/useCart';
import type { Product } from '@/types/business';

type CatalogClientProps = {
  readonly products: readonly Product[];
};

const PRICE_FORMAT = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });

export function CatalogClient({ products }: CatalogClientProps): React.JSX.Element {
  const cart = useCart(products);
  const [notice, setNotice] = useState('');

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <ul className="grid gap-8 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
        {products.map((product) => (
          <li key={product.id} className="retro-cell flex flex-col overflow-hidden">
            <div
              aria-hidden="true"
              className="retro-display flex aspect-[4/3] flex-col justify-between p-5"
              style={{ backgroundColor: product.packshot.bg, color: product.packshot.fg }}
            >
              <span className="retro-mono text-[11px]">{product.category}</span>
              <span className="retro-display text-3xl leading-none">{product.name}</span>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="retro-display text-xl">{product.name}</h3>
                <p className="retro-mono shrink-0 bg-[var(--mustard)] px-2 py-1">{PRICE_FORMAT.format(product.priceEur)}</p>
              </div>
              <p className="text-sm">
                {product.detail} · {product.size}
              </p>
              <button
                type="button"
                onClick={() => {
                  cart.add(product.id);
                  setNotice(`${product.name} added to the basket.`);
                }}
                aria-label={`Add ${product.name} to basket`}
                className="retro-cell retro-mono mt-auto px-4 py-3 hover:bg-[var(--mustard)] cursor-pointer"
              >
                Add to basket
              </button>
            </div>
          </li>
        ))}
      </ul>

      <aside aria-labelledby="basket-title" className="retro-cell p-6 lg:col-span-4">
        <h3 id="basket-title" className="retro-display text-3xl">
          Basket
        </h3>
        <p aria-live="polite" className="retro-mono mt-2">
          {cart.count} {cart.count === 1 ? 'item' : 'items'}
        </p>

        {cart.lines.length === 0 ? (
          <p className="mt-6 text-sm">Nothing here yet. Pick something from the shelf.</p>
        ) : (
          <ul className="mt-6 grid gap-4 border-t-2 border-[var(--brown)] pt-5">
            {cart.lines.map((line) => (
              <li key={line.product.id} className="flex items-center justify-between gap-4 text-sm">
                <div>
                  <p className="font-bold">{line.product.name}</p>
                  <p>{PRICE_FORMAT.format(line.product.priceEur * line.qty)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Remove one ${line.product.name}`}
                    onClick={() => cart.change(line.product.id, -1)}
                    className="retro-cell h-9 w-9 cursor-pointer"
                  >
                    −
                  </button>
                  <span className="retro-mono w-6 text-center">{line.qty}</span>
                  <button
                    type="button"
                    aria-label={`Add one more ${line.product.name}`}
                    onClick={() => cart.change(line.product.id, 1)}
                    className="retro-cell h-9 w-9 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex items-baseline justify-between border-t-2 border-[var(--brown)] pt-5">
          <p className="retro-mono">Subtotal</p>
          <p className="retro-display text-3xl">{PRICE_FORMAT.format(cart.subtotal)}</p>
        </div>
        <button
          type="button"
          disabled={cart.count === 0}
          onClick={() => setNotice('Demo only: no order is placed and no payment is taken.')}
          className="retro-cell retro-mono mt-6 w-full bg-[var(--orange)] px-4 py-4 text-[var(--cream)] disabled:opacity-40 cursor-pointer"
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
