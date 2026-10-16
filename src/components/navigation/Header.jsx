import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, ROUTES } from '@utils/constants';
import useAuthStore from '@stores/authStore';

const HOME_ANCHORS = [
  { id: 'top', label: 'Возможности' },
  { id: 'connection', label: 'Подключение' },
  { id: 'pricing', label: 'Тарифы' },
  { id: 'faq', label: 'FAQ' },
];

/** Якоря главной — в шапке на странице входа (как на главной, без лишних пунктов) */
const LOGIN_HOME_ANCHORS = [
  { id: 'top', label: 'Возможности' },
  { id: 'connection', label: 'Подключение' },
  { id: 'pricing', label: 'Тарифы' },
  { id: 'faq', label: 'FAQ' },
];

function HomeSectionLink({ id, label, className, onHome }) {
  if (onHome) {
    return (
      <a href={`#${id}`} className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link to={{ pathname: ROUTES.HOME, hash: `#${id}` }} className={className}>
      {label}
    </Link>
  );
}

export default function Header() {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const onHome = location.pathname === ROUTES.HOME;
  const onLogin = location.pathname === ROUTES.LOGIN;
  const onOnboarding = location.pathname === ROUTES.ONBOARDING;
  const authTo = isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN;
  const inCabinet =
    location.pathname === ROUTES.DASHBOARD
    || location.pathname === ROUTES.PROFILE
    || location.pathname.startsWith('/dashboard');
  const hideGuestHeaderActions = onLogin && !isAuthenticated;
  const hideTrialCta = hideGuestHeaderActions || onOnboarding || isAuthenticated;
  const hideCabinetLink = isAuthenticated && inCabinet;

  const anchorNav =
    onHome ? HOME_ANCHORS : (onLogin || inCabinet) ? LOGIN_HOME_ANCHORS : null;

  return (
    <>
      <div style={{ height: 3, background: 'var(--gradient-accent)' }} />
      <header className="site-head">
        <div className="shell head-row">
          <Link to={ROUTES.HOME} className="brand" aria-label="INCY — на главную">
            <img className="brand-logo" src="/favicon.svg" alt="INCY" width={36} height={36} />
            <span className="brand-wm">INCY</span>
          </Link>

          <nav className="nav-desktop" aria-label="Главное меню">
            {anchorNav
              ? anchorNav.map((item) => (
                  <HomeSectionLink
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    className="nav-top"
                    onHome={onHome}
                  />
                ))
              : NAV_LINKS.map((item) => (
                  <Link key={item.path} to={item.path} className="nav-top">
                    {item.label}
                  </Link>
                ))}
            {!onHome && !onLogin && !inCabinet && (
              <Link to={ROUTES.INCY_VPN} className="nav-top">
                Аналог Happ
              </Link>
            )}
          </nav>

          <div className="head-right">
            {!hideGuestHeaderActions && !hideCabinetLink && (
              <Link className="nav-top" to={authTo}>
                {isAuthenticated ? 'Личный кабинет' : 'Войти'}
              </Link>
            )}
            {!hideTrialCta && (
              <Link className="btn btn-win btn-sm" to={authTo}>
                1 день бесплатно
              </Link>
            )}
            <details className="mobile-nav">
              <summary aria-label="Меню">
                <span />
                <span />
                <span />
              </summary>
              <div className="mobile-panel">
                {anchorNav
                  ? anchorNav.map((item) => (
                      <HomeSectionLink
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        className="m-head"
                        onHome={onHome}
                      />
                    ))
                  : NAV_LINKS.map((item) => (
                      <Link key={item.path} to={item.path} className="m-head">
                        {item.label}
                      </Link>
                    ))}
                {!onHome && !onLogin && !inCabinet && (
                  <Link to={ROUTES.INCY_VPN} className="m-head">
                    Аналог Happ
                  </Link>
                )}
                {!hideGuestHeaderActions && !hideCabinetLink && (
                  <Link to={authTo} className="m-head">
                    {isAuthenticated ? 'Личный кабинет' : 'Войти'}
                  </Link>
                )}
              </div>
            </details>
          </div>
        </div>
      </header>
    </>
  );
}
