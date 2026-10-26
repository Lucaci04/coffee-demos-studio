import type * as React from 'react';
import type { FictionalBusiness } from '@/types/business';

type LegalDetailsProps = {
  readonly business: FictionalBusiness;
};

/* Company, shipping and returns block. Every value is fictional or a placeholder. */
export function LegalDetails({ business }: LegalDetailsProps): React.JSX.Element {
  return (
    <div className="grid gap-10 text-sm md:grid-cols-3">
      <section aria-labelledby="legal-company">
        <h3 id="legal-company" className="font-semibold">
          Company details (fictional)
        </h3>
        <dl className="mt-3 grid gap-2">
          <div>
            <dt className="opacity-70">Legal name</dt>
            <dd>{business.legalName}</dd>
          </div>
          <div>
            <dt className="opacity-70">Registration</dt>
            <dd>{business.registration}</dd>
          </div>
          <div>
            <dt className="opacity-70">VAT number</dt>
            <dd>{business.vat}</dd>
          </div>
          <div>
            <dt className="opacity-70">Registered address</dt>
            <dd>
              {business.address}, {business.city}
            </dd>
          </div>
          <div>
            <dt className="opacity-70">Contact</dt>
            <dd>
              {business.email} · {business.phone}
            </dd>
          </div>
          <div>
            <dt className="opacity-70">Data protection</dt>
            <dd>{business.dpoEmail}</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="legal-shipping">
        <h3 id="legal-shipping" className="font-semibold">
          Shipping
        </h3>
        <ul className="mt-3 grid gap-2">
          {business.shipping.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="legal-returns">
        <h3 id="legal-returns" className="font-semibold">
          Returns &amp; hours
        </h3>
        <p className="mt-3">{business.returns}</p>
        <ul className="mt-3 grid gap-1">
          {business.hours.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
