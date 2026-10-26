export type DemoSlug = 'demo-1' | 'demo-2' | 'demo-3';

export type SwatchEntry = {
  readonly hex: string;
  readonly label: string;
};

export type DemoEntry = {
  readonly slug: DemoSlug;
  readonly index: string;
  readonly name: string;
  readonly archetype: string;
  readonly typography: readonly string[];
  readonly swatches: readonly SwatchEntry[];
  readonly engine: readonly string[];
};

export type ScoreRange = 1 | 2 | 3 | 4 | 5;

export type SensoryProfile = {
  readonly acidity: ScoreRange;
  readonly sweetness: ScoreRange;
  readonly body: ScoreRange;
};

export type NutritionFacts = {
  readonly kcal: number;
  readonly proteinG: number;
  readonly carbsG: number;
  readonly fatG: number;
  readonly sugarG: number;
  readonly allergens: readonly string[];
};

export type MenuPhoto = {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
};

export type MenuDish = {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly priceEur: number;
  readonly photo: MenuPhoto;
  readonly nutrition: NutritionFacts;
};

export type TeamMember = {
  readonly name: string;
  readonly role: string;
  readonly initials: string;
  readonly bio: string;
};

export type StudioLocation = {
  readonly address: string;
  readonly city: string;
  readonly hours: readonly string[];
  readonly transit: string;
};
