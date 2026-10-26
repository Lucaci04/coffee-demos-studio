import type * as React from 'react';
import { KANSO_LOCATION, KANSO_TEAM } from '@/data/kanso-studio-data';

/* Fictional team with monogram avatars, not photographs of real people. */
export function StudioLocationSection(): React.JSX.Element {
  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-12">
      <ul className="col-span-12 grid gap-10 md:col-span-7 md:grid-cols-3">
        {KANSO_TEAM.map((member) => (
          <li key={member.name} className="border-t kanso-rule pt-6">
            <span
              aria-hidden="true"
              className="kanso-serif flex h-16 w-16 items-center justify-center rounded-full border kanso-rule text-xl"
            >
              {member.initials}
            </span>
            <h3 className="kanso-serif mt-5 text-2xl">{member.name}</h3>
            <p className="kanso-mono kanso-muted mt-1">{member.role}</p>
            <p className="mt-3 text-sm">{member.bio}</p>
          </li>
        ))}
      </ul>

      <div className="col-span-12 md:col-span-5">
        <p className="kanso-mono kanso-muted">Location · fictional</p>
        <address className="kanso-serif mt-3 text-3xl not-italic">
          {KANSO_LOCATION.address}
          <span className="block text-xl kanso-muted">{KANSO_LOCATION.city}</span>
        </address>
        <ul className="mt-6 grid gap-1 text-sm">
          {KANSO_LOCATION.hours.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="kanso-mono kanso-muted mt-4">{KANSO_LOCATION.transit}</p>

        <svg viewBox="0 0 320 200" width={320} height={200} role="img" aria-label="Stylised street map, not to scale" className="mt-6 h-auto w-full border kanso-rule">
          <rect width="320" height="200" fill="#EAE5DC" />
          <g stroke="#181615" strokeOpacity="0.25" strokeWidth="6" fill="none">
            <path d="M0 60 H320" />
            <path d="M0 150 H320" />
            <path d="M90 0 V200" />
            <path d="M230 0 V200" />
          </g>
          <g stroke="#3E4A3D" strokeWidth="2" fill="none" strokeOpacity="0.6">
            <path d="M0 110 C60 100 120 130 320 90" />
          </g>
          <circle cx="160" cy="105" r="14" fill="#3E4A3D" fillOpacity="0.18" />
          <circle cx="160" cy="105" r="5" fill="#3E4A3D" />
        </svg>
      </div>
    </div>
  );
}
