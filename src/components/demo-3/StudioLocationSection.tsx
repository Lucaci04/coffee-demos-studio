import type * as React from 'react';
import { VESPERA_LOCATION, VESPERA_TEAM } from '@/data/vespera-studio-data';

/* Fictional team with monogram avatars, not photographs of real people. */
export function StudioLocationSection(): React.JSX.Element {
  return (
    <div className="grid grid-cols-12 gap-x-8 gap-y-10">
      <figure className="vespera-polaroid col-span-12 rotate-[-1deg] md:col-span-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photos/team-hands-milk.jpg"
          alt="Hands pouring steamed milk into a cup of espresso, no faces shown"
          width={1024}
          height={682}
          loading="lazy"
          decoding="async"
          className="aspect-[3/2] w-full object-cover"
        />
        <figcaption className="vespera-script mt-2 text-xl text-[var(--ink)]">The team, at the milk jug</figcaption>
      </figure>

      <ul className="col-span-12 grid gap-8 md:col-span-7 md:grid-cols-3">
        {VESPERA_TEAM.map((member, position) => (
          <li key={member.name} className={`vespera-hard bg-[var(--surface)] p-5 text-[var(--ink)] ${position === 1 ? 'rotate-[1.5deg]' : 'rotate-[-1deg]'}`}>
            <span aria-hidden="true" className="vespera-sticker vespera-display h-16 w-16 text-2xl">
              {member.initials}
            </span>
            <h3 className="vespera-display mt-4 text-2xl">{member.name}</h3>
            <p className="vespera-ticket-label mt-1 text-[13px] text-[var(--accent)]">{member.role}</p>
            <p className="mt-3 text-sm">{member.bio}</p>
          </li>
        ))}
      </ul>

      <div className="vespera-hard col-span-12 bg-[var(--surface)] p-6 text-[var(--ink)] md:col-span-5">
        <p className="vespera-ticket-label text-[13px] text-[var(--accent)]">Location · fictional</p>
        <address className="vespera-display mt-3 text-4xl not-italic">
          {VESPERA_LOCATION.address}
          <span className="block text-2xl text-[var(--accent)]">{VESPERA_LOCATION.city}</span>
        </address>
        <ul className="vespera-ticket-label mt-5 grid gap-1 text-[14px]">
          {VESPERA_LOCATION.hours.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm">{VESPERA_LOCATION.transit}</p>

        <svg viewBox="0 0 320 200" width={320} height={200} role="img" aria-label="Stylised street map, not to scale" className="mt-6 h-auto w-full border-[3px] border-[var(--ink)]">
          <rect width="320" height="200" fill="#FFF1D6" />
          <g stroke="#1B1B1B" strokeOpacity="0.35" strokeWidth="10" fill="none">
            <path d="M0 40 H320" />
            <path d="M0 160 H320" />
            <path d="M70 0 V200" />
            <path d="M250 0 V200" />
          </g>
          <path d="M0 120 L320 70" stroke="#FFC530" strokeWidth="8" fill="none" />
          <circle cx="160" cy="100" r="16" fill="#E8412C" />
          <circle cx="160" cy="100" r="5" fill="#FFF8EA" />
        </svg>
      </div>
    </div>
  );
}
