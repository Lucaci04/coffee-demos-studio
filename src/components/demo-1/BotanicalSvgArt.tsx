import type * as React from 'react';

/* Fine-line botanical study: pure SVG, explicit viewBox, no raster payload. */
export function BotanicalSvgArt(): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 320 400"
      width={320}
      height={400}
      role="img"
      aria-label="Fine-line sketch of a tea branch with a matcha bowl"
      className="h-auto w-full max-w-[320px]"
    >
      <g fill="none" stroke="#181615" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M160 380 C160 260 150 160 176 40" />
        <path d="M158 270 C120 250 96 220 90 180" />
        <path d="M160 220 C200 200 230 170 236 130" />
        <path d="M160 140 C136 130 124 104 128 74" />
        <path d="M160 340 Q220 330 250 360" strokeOpacity="0.5" />
        <path d="M164 340 Q106 330 74 352" strokeOpacity="0.5" />
      </g>
      <g fill="none" stroke="#3E4A3D" strokeWidth="1">
        <path d="M90 180 Q76 150 96 128 Q110 150 90 180 Z" />
        <path d="M236 130 Q252 102 230 80 Q216 106 236 130 Z" />
        <path d="M128 74 Q112 46 134 30 Q146 54 128 74 Z" />
      </g>
      <g fill="#9E5336" fillOpacity="0.85">
        <circle cx="176" cy="40" r="3" />
      </g>
      <path d="M96 380 L224 380" stroke="#181615" strokeWidth="1" />
    </svg>
  );
}
