import type * as React from 'react';
import type { DemoSlug } from '@/types/coffee';

type PreviewArtProps = {
  readonly slug: DemoSlug;
  readonly name: string;
};

const PREVIEW_PHOTOS: Readonly<Record<DemoSlug, { readonly src: string; readonly alt: string; readonly width: number; readonly height: number }>> = {
  'demo-1': { src: '/photos/minimal-flat-red.jpg', alt: 'Flat white in a plain cup, seen from above', width: 1024, height: 1024 },
  'demo-2': { src: '/photos/retro-rome-bar.jpg', alt: 'Espresso machine and counter in a bar', width: 1024, height: 682 },
  'demo-3': { src: '/photos/loaded-whipped-espresso.jpg', alt: 'Espresso topped with whipped cream', width: 1024, height: 682 },
};

/* Hub previews: self-hosted CC0 photos. Below the fold, so lazy and async. */
export function PreviewArt({ slug, name }: PreviewArtProps): React.JSX.Element {
  const photo = PREVIEW_PHOTOS[slug];

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={photo.src}
      alt={`${name} preview: ${photo.alt}`}
      width={photo.width}
      height={photo.height}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover"
    />
  );
}
