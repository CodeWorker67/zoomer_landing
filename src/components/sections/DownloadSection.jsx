import { INCY_DOWNLOADS } from '@utils/constants';

const PLATFORMS = [
  {
    name: 'Windows',
    sub: 'ПК и ноутбук',
    href: INCY_DOWNLOADS.desktop,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    name: 'Android',
    sub: 'Google Play / APK',
    href: INCY_DOWNLOADS.android,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    name: 'iPhone',
    sub: 'App Store России',
    href: INCY_DOWNLOADS.ios,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.36 12.78c.02 2.5 2.2 3.34 2.22 3.35-.02.06-.35 1.2-1.15 2.38-.69 1.02-1.41 2.03-2.55 2.05-1.11.02-1.47-.66-2.74-.66s-1.67.64-2.72.68c-1.09.04-1.93-1.1-2.63-2.12-1.42-2.06-2.51-5.82-1.05-8.36.72-1.26 2.02-2.06 3.42-2.08 1.08-.02 2.1.73 2.76.73.66 0 1.9-.9 3.2-.77.54.02 2.07.22 3.05 1.66-.08.05-1.82 1.07-1.8 3.18M14.3 5.39c.58-.71.98-1.69.87-2.67-.84.03-1.86.56-2.47 1.27-.54.62-1.02 1.62-.89 2.58.94.07 1.9-.48 2.49-1.18" />
      </svg>
    ),
  },
  {
    name: 'macOS',
    sub: 'Apple Silicon и Intel',
    href: INCY_DOWNLOADS.desktop,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.36 12.78c.02 2.5 2.2 3.34 2.22 3.35-.02.06-.35 1.2-1.15 2.38-.69 1.02-1.41 2.03-2.55 2.05-1.11.02-1.47-.66-2.74-.66s-1.67.64-2.72.68c-1.09.04-1.93-1.1-2.63-2.12-1.42-2.06-2.51-5.82-1.05-8.36.72-1.26 2.02-2.06 3.42-2.08 1.08-.02 2.1.73 2.76.73.66 0 1.9-.9 3.2-.77.54.02 2.07.22 3.05 1.66-.08.05-1.82 1.07-1.8 3.18M14.3 5.39c.58-.71.98-1.69.87-2.67-.84.03-1.86.56-2.47 1.27-.54.62-1.02 1.62-.89 2.58.94.07 1.9-.48 2.49-1.18" />
      </svg>
    ),
  },
  {
    name: 'Linux',
    sub: '.deb, .rpm, Arch',
    href: INCY_DOWNLOADS.desktop,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
  {
    name: 'Телевизор',
    sub: 'Android TV, Apple TV',
    href: INCY_DOWNLOADS.ios,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="13" rx="2" />
        <polyline points="17 2 12 7 7 2" />
      </svg>
    ),
  },
];

export default function DownloadSection() {
  return (
    <section id="download" className="mt-24">
      <h2 style={{ fontSize: 'clamp(1.45rem, 3vw, 1.85rem)' }}>Скачать INCY под своё устройство</h2>
      <p className="mt-2" style={{ color: 'var(--color-ink-soft)' }}>
        Официальные сборки: App Store, Google Play и GitHub. Один ключ — на все платформы.
      </p>
      <div className="mt-6 grid-download">
        {PLATFORMS.map((p) => (
          <a
            key={p.name}
            href={p.href}
            className="card plat-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="plat-ico">{p.icon}</span>
            <span>
              <span className="plat-name">{p.name}</span>
              <span className="plat-sub">{p.sub}</span>
            </span>
            <span className="plat-arrow">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}
