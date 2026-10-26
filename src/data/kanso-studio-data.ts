import type { MenuDish, StudioLocation, TeamMember } from '@/types/coffee';

/* Demonstration content. Dishes, nutrition and team are fictional. Photos are CC0. */
export const KANSO_DISHES: readonly MenuDish[] = [
  {
    id: 'avocado-toast',
    name: 'Avocado, Pickled Onion',
    description: 'Sourdough, smashed avocado, pickled red onion, dill, lemon oil.',
    priceEur: 9.5,
    photo: { src: '/photos/kanso-avocado-toast.jpg', alt: 'Avocado toast with pickled onion and green herbs', width: 1003, height: 1024 },
    nutrition: { kcal: 420, proteinG: 12, carbsG: 38, fatG: 26, sugarG: 4, allergens: ['gluten'] },
  },
  {
    id: 'shaved-salad',
    name: 'Shaved Greens',
    description: 'Seasonal leaves, fennel, radish, toasted seeds, mustard vinaigrette.',
    priceEur: 8,
    photo: { src: '/photos/kanso-salad-bowl.jpg', alt: 'Green salad bowl with leaves and herbs', width: 1024, height: 762 },
    nutrition: { kcal: 260, proteinG: 8, carbsG: 22, fatG: 15, sugarG: 6, allergens: ['mustard', 'sesame'] },
  },
  {
    id: 'hojicha-cheesecake',
    name: 'Hojicha Basque',
    description: 'Burnt cheesecake, roasted hojicha, cream from the Tuesday churn.',
    priceEur: 6.5,
    photo: { src: '/photos/kanso-hojicha-cheesecake.jpg', alt: 'Slice of hojicha Basque cheesecake', width: 771, height: 1024 },
    nutrition: { kcal: 380, proteinG: 7, carbsG: 34, fatG: 24, sugarG: 26, allergens: ['milk', 'egg', 'gluten'] },
  },
];

export const KANSO_TEAM: readonly TeamMember[] = [
  { name: 'Sera Holm', role: 'Head of Roast', initials: 'SH', bio: 'Cups every lot before it leaves the drum.' },
  { name: 'Tomas Ario', role: 'Bar Lead', initials: 'TA', bio: 'Runs the lever bar and the morning rhythm.' },
  { name: 'Yui Maren', role: 'Kitchen', initials: 'YM', bio: 'Pickles, bakes and keeps the menu short.' },
];

export const KANSO_LOCATION: StudioLocation = {
  address: 'Rua Exemplo 14',
  city: 'Porto, Portugal (demo address)',
  hours: ['Tue–Sun 08:00–17:00', 'Closed Mondays'],
  transit: 'Nearest stop: Praça Fictícia, tram 1',
};
