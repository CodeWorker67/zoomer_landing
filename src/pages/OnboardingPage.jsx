import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Shield,
  Monitor,
  Download,
  Check,
  ArrowRight,
  Smartphone,
  Copy,
  Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import useAuthStore from '@stores/authStore';
import { userApi, trialApi } from '@services/api';
import { BRAND_META, ROUTES, APP_DOWNLOAD, happImportUrl, incyImportUrl } from '@utils/constants';
import { detectPlatform } from '@utils/platform';
import { markOnboardingComplete } from '@utils/onboarding';

const secondaryBtnClass =
  'w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-white/5 border border-zoomer-border text-gray-300 font-medium hover:bg-white/10 hover:text-white transition-colors';

const primaryBtnClass =
  'w-full flex items-center justify-center gap-2.5 py-4 px-5 rounded-xl font-semibold bg-gradient-to-r from-zoomer-neon-dim to-zoomer-neon text-zoomer-dark hover:opacity-90 transition-opacity';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSetupFlow = searchParams.get('setup') === '1';
  const { user } = useAuthStore();
  const [step, setStep] = useState(isSetupFlow ? 'install' : 'loading');
  const [sub, setSub] = useState(null);
  const [keys, setKeys] = useState(null);
  const [copied, setCopied] = useState(false);

  const platform = detectPlatform();
  const downloads = APP_DOWNLOAD[platform] || APP_DOWNLOAD.windows;
  const isActive = sub?.active || sub?.pro?.active;
  const subUrl = keys?.subscription_url || keys?.pro_url;
  const expires = sub?.expires || sub?.pro?.expires;

  useEffect(() => {
    let cancelled = false;

    const fetchSubscriptionData = async () => {
      try {
        const [subRes, keysRes] = await Promise.all([
          userApi.subscription(),
          userApi.keys(),
        ]);
        if (!cancelled) {
          setSub(subRes.data);
          setKeys(keysRes.data);
        }
      } catch {
        if (!cancelled) {
          setSub(null);
          setKeys(null);
        }
      }
    };

    const init = async () => {
      if (isSetupFlow) {
        await fetchSubscriptionData();
        return;
      }

      try {
        const trialRes = await trialApi.activate();
        if (!cancelled && trialRes.data?.success) {
          toast.success('Пробный доступ активирован!');
        }
      } catch (err) {
        const msg = err.response?.data?.error || err.response?.data?.detail || '';
        if (!msg.toLowerCase().includes('триал')) {
          console.warn('Trial activation:', msg);
        }
      }

      await fetchSubscriptionData();
      if (!cancelled) setStep('install');
    };

    init();
    return () => { cancelled = true; };
  }, [isSetupFlow]);

  const finishOnboarding = () => {
    if (user?.id) markOnboardingComplete(user.id);
    navigate(ROUTES.DASHBOARD);
  };

  const copyUrl = () => {
    if (!subUrl) return;
    navigator.clipboard.writeText(subUrl);
    setCopied(true);
    toast.success('Ссылка скопирована');
    setTimeout(() => setCopied(false), 2000);
  };

  if (step === 'loading') {
    return (
      <>
        <Helmet><title>Загрузка — {BRAND_META}</title></Helmet>
        <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
          <div className="card-dark text-center py-16 px-8 max-w-md w-full">
            <Loader2 className="w-10 h-10 text-zoomer-neon animate-spin mx-auto mb-4" />
            <p className="text-white font-semibold mb-1">Подготовка личного кабинета</p>
            <p className="text-gray-500 text-sm">Активируем пробный доступ...</p>
          </div>
        </section>
      </>
    );
  }

  if (step === 'install') {
    return (
      <>
        <Helmet><title>Установка приложения — {BRAND_META}</title></Helmet>
        <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
          <div className="card-dark max-w-md w-full text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-zoomer-dark border border-zoomer-border flex items-center justify-center">
              <span className="text-2xl font-black text-white">H</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Установите приложение
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Ваш VPN работает в двух приложениях —{' '}
              <span className="text-zoomer-neon font-medium">Happ</span> (рекомендуем) или{' '}
              <span className="text-white font-medium">INCY</span>.
              Установите любое на это устройство и вернитесь сюда.
            </p>

            <div className="space-y-3">
              <a
                href={downloads.happ}
                target="_blank"
                rel="noopener noreferrer"
                className={primaryBtnClass}
              >
                <Monitor className="w-5 h-5 shrink-0" />
                Happ — Скачать для {downloads.label}
              </a>

              <a
                href={downloads.incy}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryBtnClass}
              >
                <Download className="w-5 h-5 shrink-0" />
                Скачать INCY (альтернатива)
              </a>

              <button
                type="button"
                onClick={() => setStep('vpn')}
                className={secondaryBtnClass}
              >
                <Check className="w-5 h-5 text-zoomer-neon shrink-0" />
                Установил. Продолжить.
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet><title>{isActive ? 'VPN активен' : 'VPN неактивен'} — {BRAND_META}</title></Helmet>
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="card-dark text-center">
            <div className={`w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center border ${
              isActive
                ? 'border-zoomer-neon/40 bg-zoomer-neon/10'
                : 'border-red-500/30 bg-red-500/10'
            }`}>
              <Shield className={`w-7 h-7 ${isActive ? 'text-zoomer-neon' : 'text-red-400'}`} />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Основной VPN
            </h1>

            {isActive ? (
              <p className="text-gray-400 text-sm mb-8">
                Действует до <span className="text-white font-medium">{expires}</span>
              </p>
            ) : (
              <p className="text-red-400 text-sm font-medium mb-8">
                Подписка неактивна
              </p>
            )}

            {isActive && subUrl ? (
              <div className="space-y-3 mb-6">
                <a href={happImportUrl(subUrl)} className={primaryBtnClass}>
                  <Smartphone className="w-5 h-5 shrink-0" />
                  Добавить VPN в Happ
                </a>

                <a href={incyImportUrl(subUrl)} className={secondaryBtnClass}>
                  <Smartphone className="w-5 h-5 shrink-0" />
                  Добавить VPN в INCY
                </a>

                <div className="text-left pt-2">
                  <p className="text-gray-500 text-xs mb-2">
                    Или скопируйте ссылку-ключ и добавьте вручную в Happ или INCY:
                  </p>
                  <div className="flex items-center gap-2 p-3 bg-zoomer-dark rounded-lg border border-zoomer-border">
                    <code className="text-xs text-gray-400 break-all flex-1 text-left">{subUrl}</code>
                    <button
                      type="button"
                      onClick={copyUrl}
                      className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-zoomer-neon hover:bg-white/5 transition-colors"
                      aria-label="Копировать"
                    >
                      {copied ? <Check className="w-4 h-4 text-zoomer-neon" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 mb-6">
                <Link to={`${ROUTES.CHECKOUT}?tariff=30&method=sbp`} className={primaryBtnClass}>
                  Продлить подписку
                </Link>
              </div>
            )}

            <button type="button" onClick={finishOnboarding} className={secondaryBtnClass}>
              Перейти в кабинет
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setStep('install')}
            className="block w-full text-center text-xs text-gray-500 hover:text-gray-400 transition-colors mt-6"
          >
            Ещё не установил приложение? Вернуться к установке
          </button>
        </div>
      </section>
    </>
  );
}
