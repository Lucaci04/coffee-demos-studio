import type { FictionalBusiness } from '@/types/business';

/* Fully fictional businesses. Legal identifiers are placeholders and are not valid registrations. */
export const KANSO_BUSINESS: FictionalBusiness = {
  brand: 'KANSO',
  legalName: 'KANSO Demo S.R.L. (fictional)',
  registration: 'Reg. 00/000000 (placeholder)',
  vat: 'PT000000000 (placeholder)',
  address: 'Rua Exemplo 14',
  city: '4000-000 Porto, Portugal',
  email: 'hello@example.com',
  dpoEmail: 'privacy@example.com',
  phone: '+00 000 000 000 (placeholder)',
  hours: ['Tue–Sun 08:00–17:00', 'Closed Mondays'],
  shipping: [
    'Orders ship within 2 working days.',
    'Standard delivery: 3–5 working days, free over €50.',
    'Collection in store is free.',
  ],
  returns: 'Unopened products can be returned within 14 days. Opened coffee cannot be returned for hygiene reasons.',
  products: [
    { id: 'kanso-geisha-250', name: 'Geisha, Washed', detail: 'Yirgacheffe · jasmine, bergamot', size: '250 g', category: 'Beans', priceEur: 24, packshot: { bg: '#3E4A3D', fg: '#F6F4F0' } },
    { id: 'kanso-sidra-250', name: 'Bourbon Sidra', detail: 'Huila · rose, lychee', size: '250 g', category: 'Beans', priceEur: 19, packshot: { bg: '#E6E1DA', fg: '#181615' } },
    { id: 'kanso-matcha-30', name: 'Ceremonial Matcha', detail: 'Uji · grass, sesame', size: '30 g tin', category: 'Tea', priceEur: 18, packshot: { bg: '#181615', fg: '#F6F4F0' } },
    { id: 'kanso-dripper', name: 'Ceramic Dripper', detail: 'Stoneware, matte ash glaze', size: '1 piece', category: 'Brewing', priceEur: 38, packshot: { bg: '#EAE5DC', fg: '#181615' } },
    { id: 'kanso-carafe', name: 'Glass Carafe', detail: 'Borosilicate, hand-blown', size: '500 ml', category: 'Brewing', priceEur: 26, packshot: { bg: '#F6F4F0', fg: '#5C564F' } },
    { id: 'kanso-card', name: 'Gift Card', detail: 'Digital, no expiry date', size: '€50', category: 'Gifts', priceEur: 50, packshot: { bg: '#9E5336', fg: '#F6F4F0' } },
  ],
};

export const SUNDAY_ROAST_BUSINESS: FictionalBusiness = {
  brand: "SUNDAY ROAST '74",
  legalName: "Sunday Roast '74 Demo Ltda. (fictional)",
  registration: 'Reg. 00000000 (placeholder)',
  vat: 'CL00000000-0 (placeholder)',
  address: 'Avenida Nula 33',
  city: '2360000 Valparaíso, Chile',
  email: 'hola@example.com',
  dpoEmail: 'privacidad@example.com',
  phone: '+00 0 0000 0000 (placeholder)',
  hours: ['Sundays 08:00–14:00', 'Weekdays by appointment'],
  shipping: [
    'Dispatch within 1 working day.',
    'Standard delivery: 2–4 working days, free over €40.',
    'Pick up at the counter on Sundays.',
  ],
  returns: 'Unopened products: 30 days. Damaged merchandise is replaced free of charge.',
  products: [
    { id: 'sr-house-250', name: 'House Blend No. 7', detail: 'Chocolate, toffee, orange peel', size: '250 g', category: 'Beans', priceEur: 12, packshot: { bg: '#C8542B', fg: '#F5E9D3' } },
    { id: 'sr-sunday-1kg', name: 'Sunday Blend', detail: 'Dark chocolate, walnut', size: '1 kg', category: 'Beans', priceEur: 42, packshot: { bg: '#E3A62F', fg: '#3D2A1F' } },
    { id: 'sr-espresso-500', name: 'Espresso Tin', detail: 'Caramel, cocoa, low acidity', size: '500 g', category: 'Beans', priceEur: 22, packshot: { bg: '#3D2A1F', fg: '#F5E9D3' } },
    { id: 'sr-enamel-mug', name: 'Enamel Mug', detail: 'Enamel steel, orange rim', size: '350 ml', category: 'Merch', priceEur: 14, packshot: { bg: '#F5E9D3', fg: '#C8542B' } },
    { id: 'sr-apron', name: 'Diner Apron', detail: 'Canvas, cream, two pockets', size: 'One size', category: 'Merch', priceEur: 28, packshot: { bg: '#6B7A2A', fg: '#F5E9D3' } },
    { id: 'sr-tote', name: 'Sunday Tote', detail: 'Organic cotton, screen print', size: 'One size', category: 'Merch', priceEur: 12, packshot: { bg: '#2E7D74', fg: '#F5E9D3' } },
  ],
};

export const VESPERA_BUSINESS: FictionalBusiness = {
  brand: 'VESPERA',
  legalName: 'VESPERA Demo S.r.l. (fictional)',
  registration: 'BO-000000 (placeholder)',
  vat: 'IT00000000000 (placeholder)',
  address: 'Via Ipotetica 9',
  city: '40100 Bologna, Italy',
  email: 'ciao@example.com',
  dpoEmail: 'privacy@example.com',
  phone: '+00 000 000 0000 (placeholder)',
  hours: ['Diurno 07:00–16:00', 'Notturno 17:00–01:00'],
  shipping: [
    'Dispatch within 3 working days.',
    'Standard delivery: 3–6 working days, free over €60.',
    'Non-alcoholic products only are shipped.',
  ],
  returns: 'Records and merchandise: 14 days if unused and unplayed. Gift cards are non-refundable.',
  products: [
    { id: 'vs-cold-brew', name: 'Bergamot Cold Brew', detail: 'Concentrate, non-alcoholic', size: '500 ml', category: 'Bar', priceEur: 16, packshot: { bg: '#0E1F1A', fg: '#FF7A1A' } },
    { id: 'vs-cascara', name: 'Cascara Syrup', detail: 'Dried cherry skin, cane sugar', size: '300 ml', category: 'Bar', priceEur: 12, packshot: { bg: '#FF7A1A', fg: '#0E1F1A' } },
    { id: 'vs-vinyl', name: 'Side A: Night Sessions', detail: 'Fictional LP, 12 inch, 33 rpm', size: 'LP', category: 'Records', priceEur: 24, packshot: { bg: '#1B1B1B', fg: '#FFC530' } },
    { id: 'vs-cups', name: 'Tazzina Set', detail: 'Four porcelain cups, hand-painted', size: 'Set of 4', category: 'Tableware', priceEur: 36, packshot: { bg: '#FFF8EA', fg: '#E8412C' } },
    { id: 'vs-tote', name: 'Vespera Tote', detail: 'Canvas, screen-printed', size: 'One size', category: 'Merch', priceEur: 18, packshot: { bg: '#FF8FB1', fg: '#1B1B1B' } },
    { id: 'vs-card', name: 'Gift Card', detail: 'Digital, no expiry date', size: '€50', category: 'Gifts', priceEur: 50, packshot: { bg: '#7FD1AE', fg: '#1B1B1B' } },
  ],
};
