import { Link } from 'react-router-dom';
import { ROUTES } from '@utils/constants';

function HeroVisual() {
  const chips = [
    { style: { top: '8%', left: '-4%' }, label: 'VLESS' },
    { style: { bottom: '14%', right: '-6%' }, label: 'REALITY' },
    { style: { bottom: '-2%', left: '14%' }, label: 'Hysteria2' },
  ];

  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="orbit">
        {['0deg', '90deg', '180deg', '270deg'].map((a) => (
          <span key={a} className="orbit-node" style={{ '--a': a }} />
        ))}
      </div>
      <span className="ring ring-1" />
      <span className="ring ring-2" />
      <div className="power power-ring">
        <span className="power-pulse" />
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          style={{ color: 'var(--color-brand)', filter: 'drop-shadow(0 0 10px var(--color-glow))' }}
        >
          <path d="M12 3v9" />
          <path d="M6.6 6.6a8 8 0 1 0 10.8 0" />
        </svg>
      </div>
      {chips.map((c) => (
        <span key={c.label} className="hero-chip chip" style={{ ...c.style, textTransform: 'none' }}>
          {c.label}
        </span>
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="top" className="hero hero-grid">
      <div className="hero-copy">
        <span className="chip" style={{ textTransform: 'none' }}>
          Ключи для INCY · клиент на Xray-core
        </span>
        <h1 className="mt-4" style={{ fontSize: 'clamp(1.75rem, 4.6vw, 2.6rem)' }}>
          <span className="grad-text">INCY</span> — один ключ
          <br />
          на все устройства
        </h1>
        <p className="mt-3" style={{ fontSize: '1.02rem', lineHeight: 1.55, color: 'var(--color-ink-soft)', maxWidth: '36ch' }}>
          Скачайте INCY, получите ключ в личном кабинете и подключайтесь к VPN за пару секунд.
        </p>
        <div className="mt-6 flex-wrap-gap">
          <a href="#connection" className="btn btn-win">
            Скачать INCY
          </a>
          <Link to={ROUTES.LOGIN} className="btn btn-ghost">
            Ключ на 1 день бесплатно →
          </Link>
        </div>
      </div>
      <HeroVisual />
    </section>
  );
}
