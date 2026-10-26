import type * as React from 'react';
import type { MenuDish } from '@/types/coffee';

type MenuGridProps = {
  readonly dishes: readonly MenuDish[];
};

const PRICE_FORMAT = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });

/* Nutrition uses native details/summary: works without JavaScript and is keyboard accessible. */
export function MenuGrid({ dishes }: MenuGridProps): React.JSX.Element {
  return (
    <ol className="grid gap-8 md:grid-cols-3">
      {dishes.map((dish) => (
        <li key={dish.id} className="retro-cell flex flex-col overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dish.photo.src}
            alt={dish.photo.alt}
            width={dish.photo.width}
            height={dish.photo.height}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover border-b-2 border-[var(--brown)]"
          />

          <div className="flex flex-1 flex-col gap-3 p-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="retro-display text-2xl">{dish.name}</h3>
              <p className="retro-mono shrink-0 bg-[var(--mustard)] px-2 py-1">{PRICE_FORMAT.format(dish.priceEur)}</p>
            </div>
            <p className="text-sm">{dish.description}</p>

            <details className="mt-auto border-t-2 border-[var(--brown)] pt-3">
              <summary className="retro-mono cursor-pointer">Nutrition · {dish.nutrition.kcal} kcal</summary>
              <table className="mt-3 w-full border-collapse text-sm">
                <caption className="retro-mono pb-2 text-left">Per serving, illustrative</caption>
                <tbody>
                  <tr className="border-t border-[var(--brown)]">
                    <th scope="row" className="py-1 text-left font-normal">Energy</th>
                    <td className="py-1 text-right">{dish.nutrition.kcal} kcal</td>
                  </tr>
                  <tr className="border-t border-[var(--brown)]">
                    <th scope="row" className="py-1 text-left font-normal">Protein</th>
                    <td className="py-1 text-right">{dish.nutrition.proteinG} g</td>
                  </tr>
                  <tr className="border-t border-[var(--brown)]">
                    <th scope="row" className="py-1 text-left font-normal">Carbohydrate</th>
                    <td className="py-1 text-right">{dish.nutrition.carbsG} g</td>
                  </tr>
                  <tr className="border-t border-[var(--brown)]">
                    <th scope="row" className="py-1 pl-4 text-left font-normal">of which sugars</th>
                    <td className="py-1 text-right">{dish.nutrition.sugarG} g</td>
                  </tr>
                  <tr className="border-t border-[var(--brown)]">
                    <th scope="row" className="py-1 text-left font-normal">Fat</th>
                    <td className="py-1 text-right">{dish.nutrition.fatG} g</td>
                  </tr>
                </tbody>
              </table>
              <p className="retro-mono mt-2 text-[11px]">Contains: {dish.nutrition.allergens.join(', ')}</p>
            </details>
          </div>
        </li>
      ))}
    </ol>
  );
}
