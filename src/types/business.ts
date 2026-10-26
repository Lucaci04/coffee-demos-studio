export type Packshot = {
  readonly bg: string;
  readonly fg: string;
};

export type Product = {
  readonly id: string;
  readonly name: string;
  readonly detail: string;
  readonly size: string;
  readonly category: string;
  readonly priceEur: number;
  readonly packshot: Packshot;
};

export type FictionalBusiness = {
  readonly brand: string;
  readonly legalName: string;
  readonly registration: string;
  readonly vat: string;
  readonly address: string;
  readonly city: string;
  readonly email: string;
  readonly dpoEmail: string;
  readonly phone: string;
  readonly hours: readonly string[];
  readonly shipping: readonly string[];
  readonly returns: string;
  readonly products: readonly Product[];
};
