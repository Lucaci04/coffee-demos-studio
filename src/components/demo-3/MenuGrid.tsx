import type * as React from 'react';
import type { MenuDish } from '@/types/coffee';

type MenuGridProps = {
  readonly dishes: readonly MenuDish[];
};

const PRICE_FORMAT = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });

/* Nutrition uses native details/summary: works without JavaScript and is keyboard accessible. */
export function MenuGrid({ dishes }: MenuGridProps): React.JSX.Element {
  return (
    <ol className="grid gap-12 md:grid-cols-3">
      {dishes.map((dish, position) => (
        <li key={dish.id} className={position === 1 ? 'md:translate-y-10' : undefined}>
          <figure className="vespera-polaroid" style={{ transform: `rotate(${position % 2 === 0 ? -2 : 2.5}deg)` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dish.photo.src}
              alt={dish.photo.alt}
              width={dish.photo.width}
              height={dish.photo.height}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="mt-3 flex items-start justify-between gap-3 text-[var(--ink)]">
              <span className="vespera-display text-2xl">{dish.name}</span>
              <span className="vespera-sticker vespera-ticket-label shrink-0 px-3 py-1 text-[13px]">
                {PRICE_FORMAT.format(dish.priceEur)}
              </span>
            </figcaption>
          </figure>

          <div className="mt-6 px-1">
            <p className="text-sm">{dish.description}</p>
            <details className="vespera-hard mt-5 bg-[var(--surface)] p-4 text-[var(--ink)]">
              <summary className="vespera-ticket-label cursor-pointer text-[15px]">
                Nutrition · {dish.nutrition.kcal} kcal
              </summary>
              <table className="mt-4 w-full border-collapse text-sm">
                <caption className="vespera-ticket-label pb-3 text-left text-[12px]">Per serving, illustrative</caption>
                <tbody>
                  <tr className="border-t-2 border-[var(--ink)]">
                    <th scope="row" className="py-1 text-left font-medium">Energy</th>
                    <td className="py-1 text-right">{dish.nutrition.kcal} kcal</td>
                  </tr>
                  <tr className="border-t-2 border-[var(--ink)]">
                    <th scope="row" className="py-1 text-left font-medium">Protein</th>
                    <td className="py-1 text-right">{dish.nutrition.proteinG} g</td>
                  </tr>
                  <tr className="border-t-2 border-[var(--ink)]">
                    <th scope="row" className="py-1 text-left font-medium">Carbohydrate</th>
                    <td className="py-1 text-right">{dish.nutrition.carbsG} g</td>
                  </tr>
                  <tr className="border-t-2 border-[var(--ink)]">
                    <th scope="row" className="py-1 pl-4 text-left font-normal">of which sugars</th>
                    <td className="py-1 text-right">{dish.nutrition.sugarG} g</td>
                  </tr>
                  <tr className="border-t-2 border-[var(--ink)]">
                    <th scope="row" className="py-1 text-left font-medium">Fat</th>
                    <td className="py-1 text-right">{dish.nutrition.fatG} g</td>
                  </tr>
                </tbody>
              </table>
              <p className="vespera-ticket-label mt-3 text-[12px]">Contains: {dish.nutrition.allergens.join(', ')}</p>
            </details>
          </div>
        </li>
      ))}
    </ol>
  );
}
