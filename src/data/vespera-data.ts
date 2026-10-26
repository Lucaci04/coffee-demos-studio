export type AmbianceMode = 'diurno' | 'notturno';

type MenuItem = {
  readonly name: string;
  readonly note: string;
  readonly priceEur: number;
};

export type MenuChapter = {
  readonly id: string;
  readonly title: string;
  readonly items: readonly MenuItem[];
};

export type ListeningSlot = {
  readonly time: string;
  readonly title: string;
  readonly detail: string;
};

export type ExperienceId = 'diurno-table' | 'notturno-booth' | 'al-banco';

export type ExperienceOption = {
  readonly id: ExperienceId;
  readonly label: string;
  readonly mode: AmbianceMode;
};

export type SeatingZoneId = 'main-espresso-bar' | 'velvet-vinyl-booth' | 'courtyard-terrace';

export type SeatingZoneOption = {
  readonly id: SeatingZoneId;
  readonly label: string;
};

export const PARTY_MIN = 1;
export const PARTY_MAX = 8;
export const NOTES_MAX = 240;
export const GUEST_NAME_MAX = 80;
export const EMAIL_MAX = 120;

/* Diurno 07:00–16:59 is daylight service. Everything else falls to the evening state. */
export function modeForHour(hour: number): AmbianceMode {
  return hour >= 7 && hour < 17 ? 'diurno' : 'notturno';
}

export const DIURNO_CHAPTERS: readonly MenuChapter[] = [
  {
    id: 'al-banco',
    title: 'Al Banco Lever Espresso',
    items: [
      { name: 'Ristretto', note: 'Brass lever, 18 g in, 22 g out', priceEur: 2.2 },
      { name: 'Marocchino', note: 'Espresso, cocoa, foamed milk', priceEur: 2.8 },
      { name: 'Caffè Shakerato', note: 'Shaken over ice, sugar-free', priceEur: 4.0 },
    ],
  },
  {
    id: 'viennoiserie',
    title: 'Laminated Viennoiserie',
    items: [
      { name: 'Pistachio Cornetto', note: 'Sicilian pistachio, 27 layers', priceEur: 3.6 },
      { name: 'Cardamom Kouign-Amann', note: 'Butter caramel, sea salt', priceEur: 4.2 },
      { name: 'Pain au Chocolat', note: 'Single-origin dark couverture', priceEur: 3.4 },
    ],
  },
  {
    id: 'morning-press',
    title: 'Morning Press & Rituals',
    items: [
      { name: 'Morning Newspaper Ritual', note: 'Three dailies on the bar, one espresso', priceEur: 6.0 },
      { name: 'Tazzina & Glass of Water', note: 'Served before the first sip', priceEur: 1.5 },
    ],
  },
];

export const NOTTURNO_CHAPTERS: readonly MenuChapter[] = [
  {
    id: 'cocktails',
    title: 'Signature Coffee Cocktails',
    items: [
      { name: 'Bergamot Cold Brew Negroni', note: 'Cold brew, bergamot, sweet vermouth', priceEur: 13 },
      { name: 'Espresso Amaro Highball', note: 'Amaro, tonic, a double shot', priceEur: 11 },
      { name: 'Cascara Manhattan', note: 'Rye, cascara syrup, orange bitters', priceEur: 14 },
    ],
  },
  {
    id: 'natural-wine',
    title: 'Low-Intervention Natural Wines',
    items: [
      { name: 'Pét-Nat, Loire', note: 'Unfiltered, 2024, pours cloudy', priceEur: 9 },
      { name: 'Ribolla Gialla, Friuli', note: 'Skin contact, six days, 2022', priceEur: 10 },
    ],
  },
  {
    id: 'cicchetti',
    title: 'Small Plates (Cicchetti)',
    items: [
      { name: 'Baccalà Mantecato', note: 'Polenta crostino, lemon zest', priceEur: 5 },
      { name: 'Marinated Anchovy', note: 'Sourdough, Sicilian olive oil', priceEur: 4.5 },
    ],
  },
];

export const DIURNO_SCHEDULE: readonly ListeningSlot[] = [
  { time: '07:00', title: 'Lever opens', detail: 'Bar on, brass warmed for the first pull' },
  { time: '09:30', title: 'Newspaper hour', detail: 'Radio low, no playlists before 11:00' },
  { time: '12:00', title: 'Ambient sides', detail: 'Chamber music, vinyl kept to the booth' },
];

export const NOTTURNO_SCHEDULE: readonly ListeningSlot[] = [
  { time: '19:00', title: 'Vinyl session I', detail: 'Klipschorn horns, side A of the evening pick' },
  { time: '21:30', title: 'Vinyl session II', detail: 'Rotary mixer curation, requests by note only' },
  { time: '23:30', title: 'Last pour', detail: 'Lights down, cocktails until the final round' },
];

export const EXPERIENCES: readonly ExperienceOption[] = [
  { id: 'diurno-table', label: 'Diurno Morning Table', mode: 'diurno' },
  { id: 'al-banco', label: 'Al Banco Standing Tasting', mode: 'diurno' },
  { id: 'notturno-booth', label: 'Notturno Vinyl Booth', mode: 'notturno' },
];

export const SEATING_ZONES: readonly SeatingZoneOption[] = [
  { id: 'main-espresso-bar', label: 'Main Espresso Bar' },
  { id: 'velvet-vinyl-booth', label: 'Velvet Vinyl Booth' },
  { id: 'courtyard-terrace', label: 'Courtyard Terrace' },
];

export const SLOTS_BY_MODE: Readonly<Record<AmbianceMode, readonly string[]>> = {
  diurno: ['07:30', '08:30', '09:30', '10:30', '12:00', '13:30', '15:00'],
  notturno: ['17:30', '18:30', '19:30', '20:30', '21:30', '22:30', '23:30'],
};
