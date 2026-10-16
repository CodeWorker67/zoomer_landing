import { Link } from 'react-router-dom';
import { INCY_DOWNLOADS, ROUTES, SUPPORT_URL, TELEGRAM } from '@utils/constants';

const footerLinks = [
  { path: ROUTES.HAPP, label: 'Подписка' },
  { path: ROUTES.HAPP_FREE, label: 'Бесплатно' },
  { path: ROUTES.INCY_VPN, label: 'INCY vs Happ' },
  { path: ROUTES.LOGIN, label: 'Личный кабинет' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#050805', borderTop: '1px solid var(--color-line)' }}>
      <div className="shell" style={{ paddingTop: '2.75rem', paddingBottom: '2.75rem', fontSize: '0.9rem' }}>
        <div className="grid-footer">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <img className="brand-logo" src="/favicon.svg" alt="INCY" width={36} height={36} />
              <span className="brand-wm">INCY</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-ink-faint)', maxWidth: '28ch' }}>
              Клиент для VPN по ключу-подписке. Ключи и подписка — в сервисе Зумерский VPN.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-ink)' }}>Скачать INCY</p>
            <ul className="mt-2" style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <li>
                <a href={INCY_DOWNLOADS.ios} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-ink-soft)' }}>
                  App Store (iOS)
                </a>
              </li>
              <li>
                <a href={INCY_DOWNLOADS.android} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-ink-soft)' }}>
                  Google Play (Android)
                </a>
              </li>
              <li>
                <a href={INCY_DOWNLOADS.desktop} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-ink-soft)' }}>
                  GitHub (ПК)
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-ink)' }}>Сервис</p>
            <ul className="mt-2" style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              {footerLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} style={{ color: 'var(--color-ink-soft)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-ink-soft)' }}>
                  Поддержка
                </a>
              </li>
              <li>
                <a href={TELEGRAM.BOT_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-ink-soft)' }}>
                  Telegram-бот
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-ink)' }}>На главной</p>
            <ul className="mt-2" style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <li>
                <a href="/#download" style={{ color: 'var(--color-ink-soft)' }}>
                  Скачать
                </a>
              </li>
              <li>
                <a href="/#key" style={{ color: 'var(--color-ink-soft)' }}>
                  Ключи
                </a>
              </li>
              <li>
                <a href="/#pricing" style={{ color: 'var(--color-ink-soft)' }}>
                  Тарифы
                </a>
              </li>
              <li>
                <Link to={ROUTES.PRIVACY} style={{ color: 'var(--color-ink-soft)' }}>
                  Конфиденциальность
                </Link>
              </li>
              <li>
                <Link to={ROUTES.TERMS} style={{ color: 'var(--color-ink-soft)' }}>
                  Соглашение
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p
          className="mt-6"
          style={{
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--color-line)',
            fontSize: '0.78rem',
            color: 'var(--color-ink-faint)',
          }}
        >
          © {new Date().getFullYear()} Zoomersky FZE · INCY — клиент на Xray-core
        </p>
      </div>
    </footer>
  );
}
