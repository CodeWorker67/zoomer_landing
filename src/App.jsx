import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import useAuthStore from '@stores/authStore';
import Header from '@components/navigation/Header';
import Footer from '@components/navigation/Footer';
import Button from '@components/ui/Button';
import { ROUTES } from '@utils/constants';
import { isOnboardingComplete } from '@utils/onboarding';
import { capturePartnerFromUrl } from '@utils/partner';

import HomePage from '@pages/HomePage';

const HappPage = lazy(() => import('@pages/HappPage'));
const HappFreePage = lazy(() => import('@pages/HappFreePage'));
const HappTelegramPage = lazy(() => import('@pages/HappTelegramPage'));
const HappVpnPage = lazy(() => import('@pages/HappVpnPage'));
const HappDownloadPage = lazy(() => import('@pages/HappDownloadPage'));
const IncyVpnPage = lazy(() => import('@pages/IncyVpnPage'));
const LoginPage = lazy(() => import('@pages/LoginPage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage'));
const SettingsPage = lazy(() => import('@pages/SettingsPage'));
const EarningsPage = lazy(() => import('@pages/EarningsPage'));
const OnboardingPage = lazy(() => import('@pages/OnboardingPage'));
const CheckoutPage = lazy(() => import('@pages/CheckoutPage'));
const SuccessPage = lazy(() => import('@pages/SuccessPage'));
const PrivacyPage = lazy(() => import('@pages/PrivacyPage'));
const TermsPage = lazy(() => import('@pages/TermsPage'));

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;
  return children;
};

const OnboardingGate = ({ children }) => {
  const { user } = useAuthStore();
  if (user?.id && !isOnboardingComplete(user.id)) {
    return <Navigate to={ROUTES.ONBOARDING} replace />;
  }
  return children;
};

function AppShell() {
  const location = useLocation();
  const hideFooter = location.pathname === ROUTES.LOGIN
    || location.pathname.startsWith('/dashboard')
    || location.pathname === ROUTES.PROFILE;

  return (
    <div className="min-h-screen bg-zoomer-dark bg-grid flex flex-col">
      <Header />
      <main className={`flex-1 pt-16`}>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.HAPP} element={<HappPage />} />
            <Route path={ROUTES.HAPP_FREE} element={<HappFreePage />} />
            <Route path={ROUTES.HAPP_TELEGRAM} element={<HappTelegramPage />} />
            <Route path={ROUTES.HAPP_VPN} element={<HappVpnPage />} />
            <Route path={ROUTES.HAPP_DOWNLOAD} element={<HappDownloadPage />} />
            <Route path={ROUTES.INCY_VPN} element={<IncyVpnPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.ONBOARDING} element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
            <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
            <Route path={ROUTES.TERMS} element={<TermsPage />} />
            <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
            <Route path={ROUTES.SUCCESS} element={<SuccessPage />} />
            <Route path={ROUTES.PROFILE} element={<ProtectedRoute><OnboardingGate><ProfilePage /></OnboardingGate></ProtectedRoute>} />
            <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><OnboardingGate><ProfilePage /></OnboardingGate></ProtectedRoute>} />
            <Route path={ROUTES.SETTINGS} element={<ProtectedRoute><OnboardingGate><SettingsPage /></OnboardingGate></ProtectedRoute>} />
            <Route path={ROUTES.EARNINGS} element={<ProtectedRoute><OnboardingGate><EarningsPage /></OnboardingGate></ProtectedRoute>} />
            {/* Редиректы со старых маршрутов */}
            <Route path="/pricing" element={<Navigate to={ROUTES.HOME} replace />} />
            <Route path="/about" element={<Navigate to={ROUTES.HAPP} replace />} />
            <Route path="/apps" element={<Navigate to={ROUTES.HAPP_DOWNLOAD} replace />} />
            <Route path="/help" element={<Navigate to={ROUTES.HAPP_VPN} replace />} />
            <Route path="/refund" element={<Navigate to={ROUTES.TERMS} replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  const { loadFromStorage } = useAuthStore();
  useEffect(() => {
    capturePartnerFromUrl();
    loadFromStorage();
  }, [loadFromStorage]);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AppShell />
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-bold text-gradient mb-4">404</div>
        <p className="text-gray-400 mb-8">Страница не найдена</p>
        <Link to={ROUTES.HOME}><Button>На главную</Button></Link>
      </div>
    </div>
  );
}

export default App;
