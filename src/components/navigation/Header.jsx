import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BRAND, NAV_LINKS, ROUTES, TRIAL_OFFER_LABEL, TRIAL_OFFER_SHORT, isHappTimeStamp } from '@utils/constants';
import useAuthStore from '@stores/authStore';
import { userApi } from '@services/api';

const HOME_ANCHORS = [
  { href: '/#features', label: 'Возможности' },
  { href: '/#steps', label: 'Подключение' },
  { href: '/#pricing', label: 'Тарифы' },
  { href: '/#faq', label: 'FAQ' },
];

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
  const brandTitle = onLogin || onOnboarding || inCabinet ? 'Happ' : BRAND;
  const hideGuestHeaderActions = onLogin && !isAuthenticated;
  const hideTrialCta = hideGuestHeaderActions || onOnboarding || isAuthenticated;
  const hideCabinetLink = isAuthenticated && inCabinet;

  const [profileStamp, setProfileStamp] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !inCabinet) {
      setProfileStamp(null);
      return;
    }
    let cancelled = false;
    userApi.subscription()
      .then(({ data }) => {
        if (!cancelled) setProfileStamp(data?.stamp || null);
      })
      .catch(() => {
        if (!cancelled) setProfileStamp(null);
      });
    return () => { cancelled = true; };
  }, [isAuthenticated, inCabinet]);

  const navLinks = useMemo(() => {
    if (!inCabinet || !isHappTimeStamp(profileStamp)) return NAV_LINKS;
    return NAV_LINKS.filter((item) => item.path !== ROUTES.HAPP_FREE);
  }, [inCabinet, profileStamp]);

  const hideHappTimeTrialNav = inCabinet && isAuthenticated && isHappTimeStamp(profileStamp);

  return (
    <header className="site-header">
      <Link to={ROUTES.HOME} className="brand">
        <span className="brand-mark">H</span>
        <span className="brand-text">
          <span className="brand-name">{brandTitle}</span>
          <span className="brand-sub">Быстрый &amp; безопасный</span>
        </span>
      </Link>

      <nav className="nav-links">
        {onHome
          ? HOME_ANCHORS.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))
          : navLinks.map((item) => (
              <Link key={item.path} to={item.path}>
                {item.label}
              </Link>
            ))}
      </nav>

      <div className="header-actions">
        {!hideGuestHeaderActions && !hideCabinetLink && (
          <Link className="nav-login" to={authTo}>
            {isAuthenticated ? 'Личный кабинет' : 'Войти'}
          </Link>
        )}
        {!hideTrialCta && !hideHappTimeTrialNav && (
          <Link className="nav-cta" to={authTo}>
            <span className="nav-cta__full">{TRIAL_OFFER_LABEL}</span>
            <span className="nav-cta__short">{TRIAL_OFFER_SHORT}</span>
          </Link>
        )}
      </div>
    </header>
  );
}
