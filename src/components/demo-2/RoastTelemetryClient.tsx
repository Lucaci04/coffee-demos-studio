'use client';

import type * as React from 'react';
import { useMemo, useState } from 'react';
import {
  buildTelemetrySeries,
  developmentTimeRatio,
  ROAST_LOTS,
  type RoastLot,
  type TelemetryPoint,
} from '@/data/monolith-data';

const CHART_W = 640;
const CHART_H = 320;
const PLOT_LEFT = 56;
const PLOT_RIGHT = 616;
const PLOT_TOP = 16;
const PLOT_BOTTOM = 280;
const TIME_MAX_MIN = 10;
const BT_MIN_C = 100;
const BT_MAX_C = 220;
const ROR_MAX = 30;
const TIME_TICKS = [0, 2, 4, 6, 8, 10] as const;
const BT_TICKS = [100, 140, 180, 220] as const;

/* SVG attributes cannot read CSS variables, so the RETRO hexes are repeated here. */
const CARBON = '#3D2A1F';
const SIGNAL = '#C8542B';
const STEEL = '#E9D8B4';

const xFor = (minutes: number): number => PLOT_LEFT + (minutes / TIME_MAX_MIN) * (PLOT_RIGHT - PLOT_LEFT);

const yForBt = (celsius: number): number =>
  PLOT_BOTTOM - ((celsius - BT_MIN_C) / (BT_MAX_C - BT_MIN_C)) * (PLOT_BOTTOM - PLOT_TOP);

const yForRor = (ror: number): number => {
  const clamped = Math.min(ROR_MAX, Math.max(0, ror));
  return PLOT_BOTTOM - (clamped / ROR_MAX) * (PLOT_BOTTOM - PLOT_TOP);
};

function polyline(points: readonly TelemetryPoint[], project: (point: TelemetryPoint) => number): string {
  return points.map((point) => `${xFor(point.t).toFixed(1)},${project(point).toFixed(1)}`).join(' ');
}

function formatMinutes(minutes: number): string {
  const whole = Math.floor(minutes);
  const seconds = Math.round((minutes - whole) * 60);
  return `${whole}:${String(seconds).padStart(2, '0')}`;
}

export function RoastTelemetryClient(): React.JSX.Element | null {
  const [selectedId, setSelectedId] = useState<string>(ROAST_LOTS[0]?.id ?? '');
  const lot: RoastLot | undefined = ROAST_LOTS.find((candidate) => candidate.id === selectedId);
  const series = useMemo(() => (lot === undefined ? [] : buildTelemetrySeries(lot)), [lot]);

  if (lot === undefined) {
    return null;
  }

  const dropKey = lot.keyframes[lot.keyframes.length - 1];
  const dropMin = dropKey?.t ?? 0;
  const dropC = dropKey?.bt ?? 0;
  const dtr = developmentTimeRatio(lot);

  return (
    <div>
      <div role="group" aria-label="Select roast batch" className="grid grid-cols-1 border-l border-t border-[var(--brown)] md:grid-cols-3">
        {ROAST_LOTS.map((candidate) => (
          <button
            key={candidate.id}
            type="button"
            aria-pressed={candidate.id === lot.id}
            onClick={() => setSelectedId(candidate.id)}
            className="retro-mono cursor-pointer border-b border-r border-[var(--brown)] p-4 text-left aria-pressed:bg-[var(--brown)] aria-pressed:text-[var(--paper)]"
          >
            {candidate.label}
          </button>
        ))}
      </div>

      <div className="border-b border-l border-r border-[var(--brown)] bg-[var(--paper)] p-3 sm:p-6">
        <figure>
          <svg
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            width={CHART_W}
            height={CHART_H}
            role="img"
            aria-label={`Roast curve for ${lot.label}: bean temperature and rate of rise over ${dropMin} minutes`}
            className="h-auto w-full"
          >
            <rect
              x={xFor(lot.turningPointMin)}
              y={PLOT_TOP}
              width={xFor(lot.firstCrackMin) - xFor(lot.turningPointMin)}
              height={PLOT_BOTTOM - PLOT_TOP}
              fill={STEEL}
              fillOpacity="0.45"
            />
            <text
              x={(xFor(lot.turningPointMin) + xFor(lot.firstCrackMin)) / 2}
              y={PLOT_BOTTOM - 10}
              textAnchor="middle"
              fontSize="11"
              fontFamily="ui-monospace, monospace"
              fill={CARBON}
            >
              Maillard phase
            </text>

            {TIME_TICKS.map((minute) => (
              <g key={minute}>
                <line x1={xFor(minute)} x2={xFor(minute)} y1={PLOT_TOP} y2={PLOT_BOTTOM} stroke={CARBON} strokeOpacity="0.12" />
                <text x={xFor(minute)} y={PLOT_BOTTOM + 18} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill={CARBON}>
                  {minute}:00
                </text>
              </g>
            ))}

            {BT_TICKS.map((celsius) => (
              <g key={celsius}>
                <line x1={PLOT_LEFT} x2={PLOT_RIGHT} y1={yForBt(celsius)} y2={yForBt(celsius)} stroke={CARBON} strokeOpacity="0.12" />
                <text x={PLOT_LEFT - 8} y={yForBt(celsius) + 4} textAnchor="end" fontSize="11" fontFamily="ui-monospace, monospace" fill={CARBON}>
                  {celsius}°
                </text>
              </g>
            ))}

            <line x1={PLOT_LEFT} x2={PLOT_LEFT} y1={PLOT_TOP} y2={PLOT_BOTTOM} stroke={CARBON} strokeWidth="1" />
            <line x1={PLOT_LEFT} x2={PLOT_RIGHT} y1={PLOT_BOTTOM} y2={PLOT_BOTTOM} stroke={CARBON} strokeWidth="1" />

            <polyline points={polyline(series, (point) => yForBt(point.bt))} fill="none" stroke={CARBON} strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <polyline points={polyline(series, (point) => yForRor(point.ror))} fill="none" stroke={SIGNAL} strokeWidth="2" strokeDasharray="6 4" vectorEffect="non-scaling-stroke" />

            <line x1={xFor(lot.turningPointMin)} x2={xFor(lot.turningPointMin)} y1={PLOT_TOP} y2={PLOT_BOTTOM} stroke={CARBON} strokeWidth="1" />
            <text x={xFor(lot.turningPointMin) + 6} y={PLOT_TOP + 14} fontSize="11" fontFamily="ui-monospace, monospace" fill={CARBON}>
              Turning point {lot.turningPointC}°
            </text>

            <line x1={xFor(lot.firstCrackMin)} x2={xFor(lot.firstCrackMin)} y1={PLOT_TOP} y2={PLOT_BOTTOM} stroke={SIGNAL} strokeWidth="1.5" strokeDasharray="2 3" />
            <text x={xFor(lot.firstCrackMin) - 6} y={PLOT_TOP + 30} textAnchor="end" fontSize="11" fontFamily="ui-monospace, monospace" fill={SIGNAL}>
              First crack {lot.firstCrackC.toFixed(1)}°
            </text>

            <line x1={xFor(dropMin)} x2={xFor(dropMin)} y1={PLOT_TOP} y2={PLOT_BOTTOM} stroke={CARBON} strokeWidth="1" />
            <text x={xFor(dropMin) - 6} y={yForBt(dropC) - 8} textAnchor="end" fontSize="11" fontFamily="ui-monospace, monospace" fill={CARBON}>
              Drop {dropC.toFixed(1)}°
            </text>
          </svg>
          <figcaption className="retro-mono mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[11px]">
            <span className="flex items-center gap-2"><span aria-hidden="true" className="inline-block h-[2px] w-6 bg-[var(--brown)]" />Bean temp (BT)</span>
            <span className="flex items-center gap-2"><span aria-hidden="true" className="inline-block h-[2px] w-6 bg-[var(--signal)]" />Rate of rise (RoR, °C/min)</span>
          </figcaption>
        </figure>
      </div>

      <dl className="grid grid-cols-2 border-l border-r border-b border-[var(--brown)] md:grid-cols-4">
        <Stat label="First crack" value={`${lot.firstCrackC.toFixed(1)} °C`} />
        <Stat label="Drop temp" value={`${dropC.toFixed(1)} °C`} />
        <Stat label="Development time ratio" value={`${dtr.toFixed(1)} %`} />
        <Stat label="Total time" value={formatMinutes(dropMin)} />
      </dl>
    </div>
  );
}

type StatProps = {
  readonly label: string;
  readonly value: string;
};

function Stat({ label, value }: StatProps): React.JSX.Element {
  return (
    <div className="border-r border-t border-[var(--brown)] p-4 md:border-t-0">
      <dt className="retro-mono text-[10px]">{label}</dt>
      <dd className="retro-grotesk mt-2 text-2xl">{value}</dd>
    </div>
  );
}
