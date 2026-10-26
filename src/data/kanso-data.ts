import type { ScoreRange, SensoryProfile } from '@/types/coffee';

export type KansoProfile = 'floral-washed' | 'stone-fruit' | 'anaerobic-natural' | 'botanical-matcha';

export type KansoFilter = 'all' | KansoProfile;

export type KansoPourOver = {
  readonly id: string;
  readonly index: string;
  readonly cultivar: string;
  readonly origin: string;
  readonly process: string;
  readonly profile: KansoProfile;
  readonly priceEur: number;
  readonly sensory: SensoryProfile;
  readonly vessel: string;
  readonly brewTempC: number;
  readonly notes: string;
};

type KansoFilterOption = {
  readonly id: KansoFilter;
  readonly label: string;
};

export type KansoLot = {
  readonly id: string;
  readonly origin: string;
  readonly producer: string;
  readonly variety: string;
  readonly process: string;
  readonly masl: string;
  readonly soil: string;
  readonly fermentationHours: number;
  readonly harvest: string;
  readonly cupping: string;
  readonly story: string;
  readonly elevationSamplesM: readonly number[];
  readonly radar: readonly [ScoreRange, ScoreRange, ScoreRange, ScoreRange, ScoreRange];
  readonly radarLabels: readonly [string, string, string, string, string];
  readonly timeline: readonly { readonly stage: string; readonly detail: string }[];
};

export const KANSO_FILTERS: readonly KansoFilterOption[] = [
  { id: 'all', label: 'All' },
  { id: 'floral-washed', label: 'Floral & Tea-like' },
  { id: 'stone-fruit', label: 'Stone Fruit & Washed' },
  { id: 'anaerobic-natural', label: 'Anaerobic & Experimental' },
  { id: 'botanical-matcha', label: 'Signature Matcha & Botanicals' },
];

export const KANSO_POUR_OVERS: readonly KansoPourOver[] = [
  {
    id: 'gesha-washed',
    index: '01',
    cultivar: 'Gesha, Washed',
    origin: 'Yirgacheffe, Ethiopia',
    process: 'Washed',
    profile: 'floral-washed',
    priceEur: 9,
    sensory: { acidity: 4, sweetness: 3, body: 2 },
    vessel: 'Origami Dripper',
    brewTempC: 92,
    notes: 'Jasmine, Bergamot, White Peach',
  },
  {
    id: 'sidra-washed',
    index: '02',
    cultivar: 'Bourbon Sidra, Washed',
    origin: 'Huila, Colombia',
    process: 'Washed',
    profile: 'floral-washed',
    priceEur: 8,
    sensory: { acidity: 3, sweetness: 3, body: 3 },
    vessel: 'Origami Dripper',
    brewTempC: 93,
    notes: 'Rose Petal, Lychee, Honey',
  },
  {
    id: 'pacamara-washed',
    index: '03',
    cultivar: 'Pacamara, Washed',
    origin: 'Santa Ana, El Salvador',
    process: 'Washed',
    profile: 'stone-fruit',
    priceEur: 8,
    sensory: { acidity: 3, sweetness: 4, body: 3 },
    vessel: 'Kalita Wave',
    brewTempC: 94,
    notes: 'Apricot, Cane Sugar, Almond',
  },
  {
    id: 'sl28-washed',
    index: '04',
    cultivar: 'SL28, Washed',
    origin: 'Nyeri, Kenya',
    process: 'Washed',
    profile: 'stone-fruit',
    priceEur: 9,
    sensory: { acidity: 5, sweetness: 3, body: 3 },
    vessel: 'Origami Dripper',
    brewTempC: 93,
    notes: 'Blackcurrant, Grapefruit, Tomato Leaf',
  },
  {
    id: 'caturra-anaerobic',
    index: '05',
    cultivar: 'Caturra, Anaerobic Natural',
    origin: 'Huila, Colombia',
    process: 'Anaerobic Natural',
    profile: 'anaerobic-natural',
    priceEur: 10,
    sensory: { acidity: 3, sweetness: 5, body: 4 },
    vessel: 'Kalita Wave',
    brewTempC: 90,
    notes: 'Cacao Nib, Cherry Liqueur, Tamarind',
  },
  {
    id: 'bourbon-black-honey',
    index: '06',
    cultivar: 'Bourbon, Black Honey',
    origin: 'Cerrado Mineiro, Brazil',
    process: 'Black Honey',
    profile: 'anaerobic-natural',
    priceEur: 11,
    sensory: { acidity: 2, sweetness: 4, body: 5 },
    vessel: 'Kalita Wave',
    brewTempC: 91,
    notes: 'Cola, Dried Fig, Cacao Nib',
  },
  {
    id: 'uji-matcha-sencha',
    index: '07',
    cultivar: 'Uji Matcha & Sencha Blend',
    origin: 'Uji, Kyoto Prefecture',
    process: 'Tea Infusion',
    profile: 'botanical-matcha',
    priceEur: 7,
    sensory: { acidity: 2, sweetness: 3, body: 2 },
    vessel: 'Chawan Bowl',
    brewTempC: 80,
    notes: 'Fresh Grass, Toasted Sesame, Brown Rice',
  },
  {
    id: 'yuzu-hojicha',
    index: '08',
    cultivar: 'Hojicha & Yuzu Peel',
    origin: 'Kagoshima, Japan',
    process: 'Cold Infusion',
    profile: 'botanical-matcha',
    priceEur: 6,
    sensory: { acidity: 4, sweetness: 2, body: 1 },
    vessel: 'Glass Carafe',
    brewTempC: 70,
    notes: 'Yuzu Peel, Roasted Barley, Sencha',
  },
];

export const KANSO_LOTS: readonly KansoLot[] = [
  {
    id: 'finca-takesi',
    origin: 'Bolivia — Yungas',
    producer: 'Takesi Family Cooperative',
    variety: 'Bourbon Sidra',
    process: 'Washed',
    masl: '1,950–2,100 MASL',
    soil: 'Volcanic Loam',
    fermentationHours: 36,
    harvest: 'May 2026',
    cupping: '89.50',
    story:
      'Terraced plots above the river valley, picked in three passes. Cherries are floated, pulped the same day and fermented dry in cement tanks.',
    elevationSamplesM: [1950, 2010, 2040, 2100, 2060],
    radar: [4, 3, 4, 2, 3],
    radarLabels: ['Floral', 'Sweetness', 'Acidity', 'Body', 'Finish'],
    timeline: [
      { stage: 'Harvest', detail: 'Selective picking, ripe cherry only' },
      { stage: 'Fermentation', detail: '36 h dry tank, pH monitored hourly' },
      { stage: 'Drying', detail: 'Raised beds, 14 days to 11% moisture' },
    ],
  },
  {
    id: 'kieni-aa',
    origin: 'Kenya — Nyeri',
    producer: 'Kieni Smallholder Washing Station',
    variety: 'SL28',
    process: 'Double Fermentation Washed',
    masl: '1,800–1,900 MASL',
    soil: 'Volcanic Loam',
    fermentationHours: 48,
    harvest: 'November 2025',
    cupping: '88.75',
    story:
      'Lots from 600 smallholders are delivered within six hours and sorted by density. Two fermentation stages separate mucilage cleanly before soaking.',
    elevationSamplesM: [1800, 1830, 1880, 1900, 1860],
    radar: [3, 3, 5, 3, 4],
    radarLabels: ['Floral', 'Sweetness', 'Acidity', 'Body', 'Finish'],
    timeline: [
      { stage: 'Delivery', detail: 'Cherry received within six hours' },
      { stage: 'Fermentation', detail: 'Two stages, 48 h total' },
      { stage: 'Drying', detail: 'Parabolic dryers, slow ramp' },
    ],
  },
  {
    id: 'hacienda-esmeralda',
    origin: 'Panama — Boquete',
    producer: 'Hacienda La Esmeralda',
    variety: 'Geisha',
    process: 'Washed',
    masl: '1,950 MASL',
    soil: 'Volcanic Loam',
    fermentationHours: 72,
    harvest: 'March 2026',
    cupping: '90.25',
    story:
      'Shade-grown Geisha on the Jaramillo slopes. Longer dry fermentation and a slow raised-bed dry hold the florals intact.',
    elevationSamplesM: [1900, 1930, 1950, 1980, 1960],
    radar: [5, 3, 4, 2, 4],
    radarLabels: ['Floral', 'Sweetness', 'Acidity', 'Body', 'Finish'],
    timeline: [
      { stage: 'Harvest', detail: 'Hand-picked, four passes across the season' },
      { stage: 'Fermentation', detail: '72 h dry fermentation at 18 °C' },
      { stage: 'Drying', detail: 'Shaded raised beds, 21 days' },
    ],
  },
  {
    id: 'wush-wush',
    origin: 'Ethiopia — Sidama',
    producer: 'Wush Wush Cooperative Union',
    variety: 'Heirloom',
    process: 'Natural',
    masl: '2,000–2,200 MASL',
    soil: 'Red Clay',
    fermentationHours: 0,
    harvest: 'January 2026',
    cupping: '89.00',
    story:
      'Heirloom varietals from forest gardens. Whole cherries dry on raised beds for three weeks, turned by hand every two hours.',
    elevationSamplesM: [2000, 2060, 2120, 2200, 2150],
    radar: [4, 4, 3, 3, 3],
    radarLabels: ['Floral', 'Sweetness', 'Acidity', 'Body', 'Finish'],
    timeline: [
      { stage: 'Harvest', detail: 'Whole cherry, sorted on the bed' },
      { stage: 'Drying', detail: 'Raised beds, turned every two hours' },
      { stage: 'Resting', detail: 'Six weeks rest in grainpro before export' },
    ],
  },
];
