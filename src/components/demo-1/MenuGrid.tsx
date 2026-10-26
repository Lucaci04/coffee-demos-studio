import type * as React from 'react';
import type { MenuDish } from '@/types/coffee';

type MenuGridProps = {
  readonly dishes: readonly MenuDish[];
};

const PRICE_FORMAT = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });

/* Nutrition uses native details/summary: works without JavaScript and is keyboard accessible. */
export function MenuGrid({ dishes }: MenuGridProps): React.JSX.Element {
  return (
    <ol className="grid gap-12 md:grid-cols-3">
      {dishes.map((dish, position) => (
        <li key={dish.id} className={position === 1 ? 'md:mt-16' : undefined}>
          <article>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dish.photo.src}
              alt={dish.photo.alt}
              width={dish.photo.width}
              height={dish.photo.height}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover border kanso-rule"
            />

            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h3 className="kanso-serif text-2xl">{dish.name}</h3>
              <p className="kanso-serif text-lg">{PRICE_FORMAT.format(dish.priceEur)}</p>
            </div>
            <p className="mt-2 text-sm kanso-muted">{dish.description}</p>

            <details className="mt-5 border-t kanso-rule pt-4">
              <summary className="kanso-mono cursor-pointer">Nutrition · {dish.nutrition.kcal} kcal</summary>
              <table className="mt-4 w-full border-collapse text-sm">
                <caption className="kanso-mono kanso-muted pb-3 text-left">Per serving, illustrative</caption>
                <tbody>
                  <tr className="border-t kanso-rule">
                    <th scope="row" className="py-2 text-left font-normal">Energy</th>
                    <td className="py-2 text-right">{dish.nutrition.kcal} kcal</td>
                  </tr>
                  <tr className="border-t kanso-rule">
                    <th scope="row" className="py-2 text-left font-normal">Protein</th>
                    <td className="py-2 text-right">{dish.nutrition.proteinG} g</td>
                  </tr>
                  <tr className="border-t kanso-rule">
                    <th scope="row" className="py-2 text-left font-normal">Carbohydrate</th>
                    <td className="py-2 text-right">{dish.nutrition.carbsG} g</td>
                  </tr>
                  <tr className="border-t kanso-rule">
                    <th scope="row" className="py-2 pl-4 text-left font-normal kanso-muted">of which sugars</th>
                    <td className="py-2 text-right">{dish.nutrition.sugarG} g</td>
                  </tr>
                  <tr className="border-t kanso-rule">
                    <th scope="row" className="py-2 text-left font-normal">Fat</th>
                    <td className="py-2 text-right">{dish.nutrition.fatG} g</td>
                  </tr>
                </tbody>
              </table>
              <p className="kanso-mono kanso-muted mt-3">Contains: {dish.nutrition.allergens.join(', ')}</p>
            </details>
          </article>
        </li>
      ))}
    </ol>
  );
}
