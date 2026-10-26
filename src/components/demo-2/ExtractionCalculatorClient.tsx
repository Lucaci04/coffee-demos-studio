'use client';

import type * as React from 'react';
import { useState } from 'react';
import {
  BREW_METHODS,
  calculateExtraction,
  DOSE_MAX_G,
  DOSE_MIN_G,
  DOSE_STEP_G,
  ROAST_PROFILES,
  type BrewMethod,
  type RoastProfile,
} from '@/data/monolith-data';

const clampDose = (value: number): number => {
  const stepped = Math.round(value / DOSE_STEP_G) * DOSE_STEP_G;
  return Math.min(DOSE_MAX_G, Math.max(DOSE_MIN_G, stepped));
};

const DEFAULT_DOSE_G = 15;

const FIELD_LABEL = 'retro-mono block';
const OPTION_BASE =
  'retro-mono flex cursor-pointer items-center justify-between border border-[var(--brown)] px-3 py-3 has-[:checked]:bg-[var(--brown)] has-[:checked]:text-[var(--paper)] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[var(--signal)]';

export function ExtractionCalculatorClient(): React.JSX.Element {
  const [method, setMethod] = useState<BrewMethod>('v60');
  const [roast, setRoast] = useState<RoastProfile>('nordic-light');
  /* Text is kept raw while typing so intermediate values are not clamped mid-entry; clamp on blur. */
  const [doseText, setDoseText] = useState<string>(String(DEFAULT_DOSE_G));
  const parsedDose = Number(doseText);
  const dose = doseText.trim() !== '' && Number.isFinite(parsedDose) ? clampDose(parsedDose) : DEFAULT_DOSE_G;
  const setDose = (value: number): void => setDoseText(String(clampDose(value)));

  const result = calculateExtraction(method, dose, roast);

  return (
    <div className="grid grid-cols-12 border-l border-t border-[var(--brown)]">
      <fieldset className="col-span-12 border-b border-r border-[var(--brown)] p-5 md:col-span-4">
        <legend className={`${FIELD_LABEL} mb-3`}>01 · Brew method</legend>
        <div className="grid gap-2">
          {BREW_METHODS.map((option) => (
            <label key={option.id} className={OPTION_BASE}>
              <span>{option.label}</span>
              <input
                type="radio"
                name="brew-method"
                value={option.id}
                checked={method === option.id}
                onChange={() => setMethod(option.id)}
                className="sr-only"
              />
              <span aria-hidden="true">{method === option.id ? '■' : '□'}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="col-span-12 border-b border-r border-[var(--brown)] p-5 md:col-span-4">
        <legend className={`${FIELD_LABEL} mb-3`}>02 · Roast density</legend>
        <div className="grid gap-2">
          {ROAST_PROFILES.map((option) => (
            <label key={option.id} className={OPTION_BASE}>
              <span>{option.label}</span>
              <input
                type="radio"
                name="roast-profile"
                value={option.id}
                checked={roast === option.id}
                onChange={() => setRoast(option.id)}
                className="sr-only"
              />
              <span aria-hidden="true">{roast === option.id ? '■' : '□'}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="col-span-12 border-b border-r border-[var(--brown)] p-5 md:col-span-4">
        <label htmlFor="dose-range" className={`${FIELD_LABEL} mb-3`}>
          03 · Dose (g)
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Decrease dose by 0.5 g"
            onClick={() => setDose(dose - DOSE_STEP_G)}
            disabled={dose <= DOSE_MIN_G}
            className="retro-cell h-10 w-10 retro-mono cursor-pointer disabled:opacity-40"
          >
            −
          </button>
          <input
            id="dose-number"
            type="number"
            inputMode="decimal"
            min={DOSE_MIN_G}
            max={DOSE_MAX_G}
            step={DOSE_STEP_G}
            value={dose}
            onChange={(event) => setDoseText(event.currentTarget.value)}
            onBlur={() => setDoseText(String(dose))}
            aria-label="Dose in grams"
            className="retro-cell h-10 w-full min-w-0 px-2 text-center retro-mono"
          />
          <button
            type="button"
            aria-label="Increase dose by 0.5 g"
            onClick={() => setDose(dose + DOSE_STEP_G)}
            disabled={dose >= DOSE_MAX_G}
            className="retro-cell h-10 w-10 retro-mono cursor-pointer disabled:opacity-40"
          >
            +
          </button>
        </div>
        <input
          id="dose-range"
          type="range"
          min={DOSE_MIN_G}
          max={DOSE_MAX_G}
          step={DOSE_STEP_G}
          value={dose}
          onChange={(event) => setDose(Number(event.currentTarget.value))}
          className="retro-range mt-5"
        />
        <p className="retro-mono mt-2 flex justify-between text-[10px]">
          <span>{DOSE_MIN_G} g</span>
          <span>{DOSE_MAX_G} g</span>
        </p>
      </div>

      <section
        aria-label="Calculated brew parameters"
        aria-live="polite"
        className="col-span-12 grid grid-cols-2 border-b border-r border-[var(--brown)] md:grid-cols-4"
      >
        <Metric label="Target water" value={`${result.waterG.toFixed(1)} g`} />
        <Metric label="Brew ratio" value={result.ratioLabel} />
        <Metric label="Water temp" value={`${result.waterTempC} °C`} />
        <Metric label="Drawdown" value={result.drawdown} />
        <Metric label="Grind µm" value={`${result.grindMinUm}–${result.grindMaxUm} µm`} />
        <Metric label="Comandante C40" value={`≈ ${result.c40Clicks} clicks`} />
      </section>

      <div className="col-span-12 border-b border-r border-[var(--brown)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <caption className="retro-mono px-5 py-3 text-left">04 · Pour protocol</caption>
            <thead>
              <tr className="retro-ink">
                <th scope="col" className="retro-mono px-5 py-3 font-medium">Phase</th>
                <th scope="col" className="retro-mono px-5 py-3 font-medium">Timestamp</th>
                <th scope="col" className="retro-mono px-5 py-3 font-medium">Cumulative (g)</th>
                <th scope="col" className="retro-mono px-5 py-3 font-medium">Agitation</th>
              </tr>
            </thead>
            <tbody>
              {result.schedule.map((phase) => (
                <tr key={phase.label} className="border-t border-[var(--brown)]">
                  <th scope="row" className="px-5 py-3 font-medium">{phase.label}</th>
                  <td className="retro-mono px-5 py-3">{phase.timestamp}</td>
                  <td className="retro-mono px-5 py-3">{phase.cumulativeG.toFixed(1)}</td>
                  <td className="px-5 py-3">{phase.agitation}</td>
                </tr>
              ))}
              <tr className="border-t border-[var(--brown)]">
                <th scope="row" className="px-5 py-3 font-medium">Total Drawdown Time</th>
                <td className="retro-mono px-5 py-3">{result.drawdown}</td>
                <td className="retro-mono px-5 py-3">{result.waterG.toFixed(1)}</td>
                <td className="px-5 py-3">Brew complete at this weight</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

type MetricProps = {
  readonly label: string;
  readonly value: string;
};

function Metric({ label, value }: MetricProps): React.JSX.Element {
  return (
    <div className="border-b border-r border-[var(--brown)] p-4">
      <p className="retro-mono text-[10px]">{label}</p>
      <p className="retro-grotesk mt-2 text-2xl">{value}</p>
    </div>
  );
}
