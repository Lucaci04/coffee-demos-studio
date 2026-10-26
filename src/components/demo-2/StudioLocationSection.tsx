import type * as React from 'react';
import { RETRO_LOCATION, RETRO_TEAM } from '@/data/retro-studio-data';

/* Fictional team with monogram avatars, not photographs of real people. */
export function StudioLocationSection(): React.JSX.Element {
  return (
    <div className="grid grid-cols-12 gap-x-8 gap-y-10">
      <ul className="col-span-12 grid gap-6 md:col-span-7 md:grid-cols-3">
        {RETRO_TEAM.map((member) => (
          <li key={member.name} className="retro-cell p-5">
            <span
              aria-hidden="true"
              className="retro-display flex h-16 w-16 items-center justify-center rounded-full bg-[var(--orange)] text-2xl text-[var(--cream)]"
            >
              {member.initials}
            </span>
            <h3 className="retro-display mt-4 text-2xl">{member.name}</h3>
            <p className="retro-mono mt-1 text-[11px]">{member.role}</p>
            <p className="mt-3 text-sm">{member.bio}</p>
          </li>
        ))}
      </ul>

      <div className="retro-cell col-span-12 p-6 md:col-span-5">
        <p className="retro-mono">Location · fictional</p>
        <address className="retro-display mt-3 text-3xl not-italic">
          {RETRO_LOCATION.address}
          <span className="block text-xl">{RETRO_LOCATION.city}</span>
        </address>
        <ul className="retro-mono mt-5 grid gap-1 text-[12px]">
          {RETRO_LOCATION.hours.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="retro-mono mt-4 text-[11px]">{RETRO_LOCATION.transit}</p>

        <svg viewBox="0 0 320 200" width={320} height={200} role="img" aria-label="Stylised street map, not to scale" className="mt-6 h-auto w-full border-2 border-[var(--brown)] rounded-[10px]">
          <rect width="320" height="200" fill="#F5E9D3" />
          <g stroke="#3D2A1F" strokeOpacity="0.3" strokeWidth="8" fill="none">
            <path d="M0 50 H320" />
            <path d="M0 150 H320" />
            <path d="M80 0 V200" />
            <path d="M240 0 V200" />
          </g>
          <path d="M0 110 C70 90 150 130 320 80" stroke="#E3A62F" strokeWidth="6" fill="none" />
          <circle cx="160" cy="100" r="14" fill="#C8542B" fillOpacity="0.25" />
          <circle cx="160" cy="100" r="6" fill="#C8542B" />
        </svg>
      </div>
    </div>
  );
}
