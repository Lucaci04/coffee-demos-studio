import type { MenuDish, StudioLocation, TeamMember } from '@/types/coffee';

/* Demonstration content. Dishes, nutrition and team are fictional. Photos are CC0. */
export const VESPERA_DISHES: readonly MenuDish[] = [
  {
    id: 'pistachio-croissant',
    name: 'Pistachio & Chocolate Croissant',
    description: 'Twice-baked, pistachio cream, dark chocolate batons, sea salt.',
    priceEur: 4.8,
    photo: { src: '/photos/loaded-pistachio-croissant.jpg', alt: 'Pistachio and chocolate croissant', width: 1024, height: 771 },
    nutrition: { kcal: 540, proteinG: 10, carbsG: 48, fatG: 33, sugarG: 22, allergens: ['gluten', 'milk', 'egg', 'tree nuts'] },
  },
  {
    id: 'mediterranean-sandwich',
    name: 'Mediterranean Sandwich',
    description: 'Grilled aubergine, feta, roasted pepper, herbs on a crusty baguette.',
    priceEur: 9.5,
    photo: { src: '/photos/loaded-med-sandwich.jpg', alt: 'Mediterranean sandwich with grilled vegetables', width: 771, height: 1024 },
    nutrition: { kcal: 590, proteinG: 22, carbsG: 52, fatG: 30, sugarG: 6, allergens: ['gluten', 'milk', 'sesame'] },
  },
  {
    id: 'salmon-toast',
    name: 'Smashed Avocado & Smoked Salmon',
    description: 'Sourdough, smoked salmon, smashed avocado, capers, poached egg.',
    priceEur: 12,
    photo: { src: '/photos/loaded-salmon-toast.jpg', alt: 'Avocado and smoked salmon on sourdough toast', width: 1024, height: 771 },
    nutrition: { kcal: 470, proteinG: 21, carbsG: 34, fatG: 28, sugarG: 3, allergens: ['fish', 'gluten', 'egg'] },
  },
];

export const VESPERA_TEAM: readonly TeamMember[] = [
  { name: 'Lorenzo Vale', role: 'Maestro di Macchina', initials: 'LV', bio: 'Tunes the lever every morning, and sometimes at midnight.' },
  { name: 'Solène Marec', role: 'Turntables', initials: 'SM', bio: 'Curates the evening sets and takes requests by note only.' },
  { name: 'Ettore Lanza', role: 'Cicchetti & Bar', initials: 'EL', bio: 'Small plates, big opinions about natural wine.' },
];

export const VESPERA_LOCATION: StudioLocation = {
  address: 'Via Ipotetica 9',
  city: 'Bologna, Italy (demo address)',
  hours: ['Diurno 07:00–16:00', 'Notturno 17:00–01:00'],
  transit: 'Nearest stop: Piazza Fittizia, bus 27',
};
