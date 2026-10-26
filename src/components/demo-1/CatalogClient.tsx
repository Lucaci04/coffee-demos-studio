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
    <div className="grid gap-14 lg:grid-cols-12">
      <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
        {products.map((product) => (
          <li key={product.id}>
            <article>
              <div
                aria-hidden="true"
                className="flex aspect-[4/5] flex-col justify-between p-6"
                style={{ backgroundColor: product.packshot.bg, color: product.packshot.fg }}
              >
                <span className="kanso-mono">{product.category}</span>
                <span className="kanso-serif text-3xl leading-tight">{product.name}</span>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="kanso-serif text-xl">{product.name}</h3>
                <p className="kanso-serif text-lg">{PRICE_FORMAT.format(product.priceEur)}</p>
              </div>
              <p className="mt-1 text-sm kanso-muted">
                {product.detail} · {product.size}
              </p>
              <button
                type="button"
                onClick={() => {
                  cart.add(product.id);
                  setNotice(`${product.name} added to bag.`);
                }}
                aria-label={`Add ${product.name} to bag`}
                className="kanso-mono mt-4 border-b border-[var(--ink)] pb-1 hover:border-[var(--moss)] hover:text-[var(--moss)] cursor-pointer"
              >
                Add to bag
              </button>
            </article>
          </li>
        ))}
      </ul>

      <aside aria-labelledby="bag-title" className="border-t kanso-rule pt-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
        <h3 id="bag-title" className="kanso-serif text-3xl">
          Bag
        </h3>
        <p aria-live="polite" className="kanso-mono kanso-muted mt-2">
          {cart.count} {cart.count === 1 ? 'item' : 'items'}
        </p>

        {cart.lines.length === 0 ? (
          <p className="mt-8 text-sm kanso-muted">Your bag is empty.</p>
        ) : (
          <ul className="mt-6 grid gap-5 border-t kanso-rule pt-6">
            {cart.lines.map((line) => (
              <li key={line.product.id} className="flex items-center justify-between gap-4 text-sm">
                <div>
                  <p>{line.product.name}</p>
                  <p className="kanso-muted">{PRICE_FORMAT.format(line.product.priceEur * line.qty)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Remove one ${line.product.name}`}
                    onClick={() => cart.change(line.product.id, -1)}
                    className="h-8 w-8 border kanso-rule cursor-pointer"
                  >
                    −
                  </button>
                  <span className="kanso-mono w-6 text-center">{line.qty}</span>
                  <button
                    type="button"
                    aria-label={`Add one more ${line.product.name}`}
                    onClick={() => cart.change(line.product.id, 1)}
                    className="h-8 w-8 border kanso-rule cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex items-baseline justify-between border-t kanso-rule pt-6">
          <p className="kanso-mono">Subtotal</p>
          <p className="kanso-serif text-2xl">{PRICE_FORMAT.format(cart.subtotal)}</p>
        </div>
        <button
          type="button"
          disabled={cart.count === 0}
          onClick={() => setNotice('Demo only: no order is placed and no payment is taken.')}
          className="kanso-mono mt-6 w-full border border-[var(--ink)] px-4 py-4 hover:bg-[var(--ink)] hover:text-[var(--paper)] disabled:opacity-40 cursor-pointer"
        >
          Checkout (demo)
        </button>
        <p role="status" className="kanso-muted mt-4 text-sm">
          {notice}
        </p>
      </aside>
    </div>
  );
}
