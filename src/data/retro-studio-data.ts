import type { MenuDish, StudioLocation, TeamMember } from '@/types/coffee';

/* Demonstration content. Dishes, nutrition and team are fictional. Photos are CC0. */
export const RETRO_DISHES: readonly MenuDish[] = [
  {
    id: 'ham-croissant',
    name: 'Ham & Cheese Croissant',
    description: 'Laminated butter croissant, smoked ham, melted gruyère, warmed through.',
    priceEur: 7.5,
    photo: { src: '/photos/retro-ham-croissant.jpg', alt: 'Ham and cheese croissant on a plate', width: 1024, height: 771 },
    nutrition: { kcal: 510, proteinG: 18, carbsG: 36, fatG: 33, sugarG: 6, allergens: ['gluten', 'milk', 'egg'] },
  },
  {
    id: 'breakfast-sandwich',
    name: 'Sunday Breakfast Sandwich',
    description: 'Fried egg, cheddar, crispy bacon, tomato relish on a toasted roll.',
    priceEur: 9,
    photo: { src: '/photos/retro-breakfast-sandwich.jpg', alt: 'Breakfast sandwich with egg and bacon', width: 1024, height: 771 },
    nutrition: { kcal: 620, proteinG: 26, carbsG: 44, fatG: 36, sugarG: 7, allergens: ['gluten', 'egg', 'milk'] },
  },
  {
    id: 'chilli-eggs',
    name: 'Chilli Eggs on Toast',
    description: 'Soft-scrambled eggs, smoky chilli beans, coriander, thick toast.',
    priceEur: 10,
    photo: { src: '/photos/retro-chilli-eggs.jpg', alt: 'Chilli eggs served on toast', width: 1024, height: 768 },
    nutrition: { kcal: 480, proteinG: 24, carbsG: 30, fatG: 28, sugarG: 5, allergens: ['egg', 'gluten'] },
  },
];

export const RETRO_TEAM: readonly TeamMember[] = [
  { name: 'Dolores Pham', role: 'Owner & Roaster', initials: 'DP', bio: 'Has been roasting on Sundays since the drum was secondhand.' },
  { name: 'Gus Ferrante', role: 'Morning Cook', initials: 'GF', bio: 'Keeps the griddle hot and the jokes flowing.' },
  { name: 'Pip Abernathy', role: 'Counter', initials: 'PA', bio: 'Knows every regular by their order, and their dog.' },
];

export const RETRO_LOCATION: StudioLocation = {
  address: 'Avenida Nula 33',
  city: 'Valparaíso, Chile (demo address)',
  hours: ['Sundays 08:00–14:00', 'Weekdays by appointment'],
  transit: 'Nearest stop: Plaza Ficticia, line 2',
};
