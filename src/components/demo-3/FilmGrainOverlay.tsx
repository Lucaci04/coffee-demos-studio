import type * as React from 'react';

/* Fixed fractal-noise grain. Pure SVG filter: no raster, no layout, pointer-events disabled in CSS. */
export function FilmGrainOverlay(): React.JSX.Element {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="vespera-grain"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <filter id="vespera-grain-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#vespera-grain-noise)" />
    </svg>
  );
}
