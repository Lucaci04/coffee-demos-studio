import type { DemoEntry } from '@/types/coffee';

export const STUDIO_INDEX: readonly DemoEntry[] = [
  {
    slug: 'demo-1',
    index: '01',
    name: 'KANSO',
    archetype: 'Kyoto–Copenhagen sensory minimalism. Kinfolk-grade editorial restraint.',
    typography: ['Cormorant Garamond', 'Plus Jakarta Sans', 'JetBrains Mono'],
    swatches: [
      { hex: '#F6F4F0', label: 'Raw Alabaster' },
      { hex: '#181615', label: 'Sumi Espresso Ink' },
      { hex: '#3E4A3D', label: 'Uji Matcha Moss' },
      { hex: '#9E5336', label: 'Bizen Terracotta' },
    ],
    engine: ['Seasonal filter menu', 'Origin lot dossier drawer'],
  },
  {
    slug: 'demo-2',
    index: '02',
    name: "SUNDAY ROAST '74",
    archetype: 'Seventies diner-roastery. Sunburst stripes, soft serif, cream and burnt orange.',
    typography: ['Shrikhand', 'Space Mono'],
    swatches: [
      { hex: '#F5E9D3', label: 'Cream Stock' },
      { hex: '#3D2A1F', label: 'Espresso Brown' },
      { hex: '#C8542B', label: 'Burnt Orange' },
      { hex: '#E3A62F', label: 'Mustard Sun' },
    ],
    engine: ['Brew ratio calculator', 'Roast curve telemetry', 'Dispatch configurator'],
  },
  {
    slug: 'demo-3',
    index: '03',
    name: 'VESPERA',
    archetype: 'Loud Milan–Paris bar. Stacked polaroids, stickers, marquee type, day and night palettes.',
    typography: ['Abril Fatface', 'Anton', 'Caveat', 'Inter'],
    swatches: [
      { hex: '#FFF1D6', label: 'Butter Diurno' },
      { hex: '#E8412C', label: 'Tomato Red' },
      { hex: '#FFC530', label: 'Sunflower' },
      { hex: '#0E1F1A', label: 'Notturno Green' },
      { hex: '#FF7A1A', label: 'Tangerine' },
    ],
    engine: ['Diurno / Notturno switcher', 'Table & booth reservation drawer'],
  },
];
