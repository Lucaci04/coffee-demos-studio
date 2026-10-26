import { useMemo, useState } from 'react';
import type { Product } from '@/types/business';

export type CartLineView = {
  readonly product: Product;
  readonly qty: number;
};

export type CartApi = {
  readonly lines: readonly CartLineView[];
  readonly count: number;
  readonly subtotal: number;
  readonly add: (productId: string) => void;
  readonly change: (productId: string, delta: number) => void;
  readonly clear: () => void;
};

const QTY_MAX = 10;

/* Client-only cart for the demo. Nothing is persisted or sent anywhere. */
export function useCart(products: readonly Product[]): CartApi {
  const [raw, setRaw] = useState<readonly { readonly productId: string; readonly qty: number }[]>([]);

  const lines = useMemo<readonly CartLineView[]>(
    () =>
      raw.flatMap((line) => {
        const product = products.find((candidate) => candidate.id === line.productId);
        return product === undefined ? [] : [{ product, qty: line.qty }];
      }),
    [raw, products],
  );

  const add = (productId: string): void => {
    setRaw((current) => {
      if (!current.some((line) => line.productId === productId)) {
        return [...current, { productId, qty: 1 }];
      }
      return current.map((line) =>
        line.productId === productId ? { ...line, qty: Math.min(QTY_MAX, line.qty + 1) } : line,
      );
    });
  };

  const change = (productId: string, delta: number): void => {
    setRaw((current) =>
      current.flatMap((line) => {
        if (line.productId !== productId) {
          return [line];
        }
        const qty = line.qty + delta;
        return qty <= 0 ? [] : [{ ...line, qty: Math.min(QTY_MAX, qty) }];
      }),
    );
  };

  const clear = (): void => setRaw([]);

  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = lines.reduce((sum, line) => sum + line.product.priceEur * line.qty, 0);

  return { lines, count, subtotal, add, change, clear };
}
