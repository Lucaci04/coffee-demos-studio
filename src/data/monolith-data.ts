export type BrewMethod = 'v60' | 'kalita' | 'espresso' | 'aeropress';

export type RoastProfile = 'nordic-light' | 'omni-medium' | 'espresso-dev';

export type BrewMethodOption = {
  readonly id: BrewMethod;
  readonly label: string;
};

export type RoastProfileOption = {
  readonly id: RoastProfile;
  readonly label: string;
};

export const BREW_METHODS: readonly BrewMethodOption[] = [
  { id: 'v60', label: 'V60 02' },
  { id: 'kalita', label: 'Kalita Wave' },
  { id: 'espresso', label: 'Espresso 18g' },
  { id: 'aeropress', label: 'AeroPress Inverted' },
];

export const ROAST_PROFILES: readonly RoastProfileOption[] = [
  { id: 'nordic-light', label: 'Light Nordic' },
  { id: 'omni-medium', label: 'Omni-Roast' },
  { id: 'espresso-dev', label: 'Espresso Medium' },
];

export const DOSE_MIN_G = 12;
export const DOSE_MAX_G = 30;
export const DOSE_STEP_G = 0.5;

/* Ratio is water grams per coffee gram (espresso: 1:x as written on the label). */
const RATIO_TABLE: Readonly<Record<BrewMethod, Readonly<Record<RoastProfile, number>>>> = {
  v60: { 'nordic-light': 16.5, 'omni-medium': 16, 'espresso-dev': 15 },
  kalita: { 'nordic-light': 16, 'omni-medium': 15.5, 'espresso-dev': 15 },
  aeropress: { 'nordic-light': 14, 'omni-medium': 13, 'espresso-dev': 12 },
  espresso: { 'nordic-light': 2.4, 'omni-medium': 2.2, 'espresso-dev': 2 },
};

const TEMP_TABLE: Readonly<Record<RoastProfile, number>> = {
  'nordic-light': 96,
  'omni-medium': 92,
  'espresso-dev': 90,
};

/* Grind centre in µm per method, shifted by roast: lighter roasts take a coarser grind. */
const GRIND_BASE_UM: Readonly<Record<BrewMethod, number>> = {
  v60: 700,
  kalita: 800,
  aeropress: 500,
  espresso: 220,
};

const GRIND_ROAST_OFFSET_UM: Readonly<Record<RoastProfile, number>> = {
  'nordic-light': 40,
  'omni-medium': 0,
  'espresso-dev': -20,
};

export type PourPhase = {
  readonly label: string;
  readonly timestamp: string;
  readonly cumulativeG: number;
  readonly agitation: string;
};

export type ExtractionResult = {
  readonly waterG: number;
  readonly ratioLabel: string;
  readonly waterTempC: number;
  readonly grindMinUm: number;
  readonly grindMaxUm: number;
  readonly c40Clicks: number;
  readonly drawdown: string;
  readonly schedule: readonly PourPhase[];
};

function roundToHalf(value: number): number {
  return Math.round(value * 2) / 2;
}

function formatRatio(method: BrewMethod, ratio: number): string {
  return method === 'espresso' ? `1:${ratio.toFixed(1)}` : `1:${ratio}`;
}

function scheduleFor(method: BrewMethod, waterG: number, doseG: number): readonly PourPhase[] {
  if (method === 'espresso') {
    return [
      { label: 'Bloom', timestamp: '0:00', cumulativeG: roundToHalf(doseG * 0.5), agitation: 'Pre-infusion at low pressure' },
      { label: 'First Pulse', timestamp: '0:05', cumulativeG: roundToHalf(waterG * 0.55), agitation: 'Ramp to nine bar' },
      { label: 'Second Pulse', timestamp: '0:15', cumulativeG: roundToHalf(waterG * 0.85), agitation: 'Hold, watch the blonde' },
      { label: 'Final Pulse', timestamp: '0:22', cumulativeG: waterG, agitation: 'Stop at target weight' },
    ];
  }

  return [
    { label: 'Bloom', timestamp: '0:00', cumulativeG: roundToHalf(doseG * 2), agitation: 'Saturate evenly, gentle swirl' },
    { label: 'First Pulse', timestamp: '0:45', cumulativeG: roundToHalf(waterG * 0.55), agitation: 'Spiral from centre outward' },
    { label: 'Second Pulse', timestamp: '1:15', cumulativeG: roundToHalf(waterG * 0.8), agitation: 'Pour to rim, no agitation' },
    { label: 'Final Pulse', timestamp: '1:45', cumulativeG: waterG, agitation: 'Let the bed drain flat' },
  ];
}

const DRAWDOWN_BY_METHOD: Readonly<Record<BrewMethod, string>> = {
  v60: '2:30',
  kalita: '3:00',
  aeropress: '1:30',
  espresso: '0:28',
};

export function calculateExtraction(
  method: BrewMethod,
  doseG: number,
  roast: RoastProfile,
): ExtractionResult {
  const ratio = RATIO_TABLE[method][roast];
  const waterG = roundToHalf(doseG * ratio);
  const grindCentre = GRIND_BASE_UM[method] + GRIND_ROAST_OFFSET_UM[roast];

  return {
    waterG,
    ratioLabel: formatRatio(method, ratio),
    waterTempC: TEMP_TABLE[roast],
    grindMinUm: grindCentre - 25,
    grindMaxUm: grindCentre + 25,
    c40Clicks: Math.round((grindCentre - 100) / 20),
    drawdown: DRAWDOWN_BY_METHOD[method],
    schedule: scheduleFor(method, waterG, doseG),
  };
}

/* Roast telemetry: keyframes are interpolated into a 0.25 min series, then rate of rise is derived. */
export type RoastKeyframe = {
  readonly t: number;
  readonly bt: number;
};

export type RoastLot = {
  readonly id: string;
  readonly label: string;
  readonly keyframes: readonly RoastKeyframe[];
  readonly firstCrackMin: number;
  readonly firstCrackC: number;
  readonly turningPointMin: number;
  readonly turningPointC: number;
};

export const ROAST_LOTS: readonly RoastLot[] = [
  {
    id: 'lot-401',
    label: 'LOT #401 ETHIOPIA WORKA',
    keyframes: [
      { t: 0, bt: 200 },
      { t: 1.2, bt: 142 },
      { t: 4, bt: 158 },
      { t: 6, bt: 176 },
      { t: 8.1, bt: 196.4 },
      { t: 9.4, bt: 206.8 },
    ],
    firstCrackMin: 8.1,
    firstCrackC: 196.4,
    turningPointMin: 1.2,
    turningPointC: 142,
  },
  {
    id: 'lot-402',
    label: 'LOT #402 COLOMBIA HUILA PINK BOURBON',
    keyframes: [
      { t: 0, bt: 200 },
      { t: 1.4, bt: 146 },
      { t: 4.2, bt: 160 },
      { t: 6.4, bt: 180 },
      { t: 8.5, bt: 196.1 },
      { t: 10.2, bt: 205.9 },
    ],
    firstCrackMin: 8.5,
    firstCrackC: 196.1,
    turningPointMin: 1.4,
    turningPointC: 146,
  },
  {
    id: 'lot-403',
    label: 'LOT #403 KENYA KIRINYAGA',
    keyframes: [
      { t: 0, bt: 200 },
      { t: 1, bt: 138 },
      { t: 3.6, bt: 152 },
      { t: 6.8, bt: 170 },
      { t: 8.8, bt: 195.2 },
      { t: 10, bt: 204.1 },
    ],
    firstCrackMin: 8.8,
    firstCrackC: 195.2,
    turningPointMin: 1,
    turningPointC: 138,
  },
];

export type TelemetryPoint = {
  readonly t: number;
  readonly bt: number;
  readonly ror: number;
};

const SERIES_STEP_MIN = 0.25;

function interpolateBt(keyframes: readonly RoastKeyframe[], t: number): number {
  for (let index = 1; index < keyframes.length; index += 1) {
    const previous = keyframes[index - 1];
    const next = keyframes[index];
    if (previous === undefined || next === undefined) {
      break;
    }
    if (t <= next.t) {
      const span = next.t - previous.t;
      const progress = span === 0 ? 0 : (t - previous.t) / span;
      return previous.bt + (next.bt - previous.bt) * progress;
    }
  }
  return keyframes[keyframes.length - 1]?.bt ?? 0;
}

export function buildTelemetrySeries(lot: RoastLot): readonly TelemetryPoint[] {
  const lastKey = lot.keyframes[lot.keyframes.length - 1];
  const endMin = lastKey?.t ?? 0;
  const points: TelemetryPoint[] = [];

  let previousBt = interpolateBt(lot.keyframes, 0);
  for (let t = 0; t <= endMin + 1e-9; t += SERIES_STEP_MIN) {
    const bt = interpolateBt(lot.keyframes, t);
    const ror = (bt - previousBt) / SERIES_STEP_MIN;
    points.push({ t: Number(t.toFixed(2)), bt: Number(bt.toFixed(1)), ror: Number(ror.toFixed(1)) });
    previousBt = bt;
  }

  return points;
}

export function developmentTimeRatio(lot: RoastLot): number {
  const dropMin = lot.keyframes[lot.keyframes.length - 1]?.t ?? 0;
  if (dropMin === 0) {
    return 0;
  }
  return ((dropMin - lot.firstCrackMin) / dropMin) * 100;
}
