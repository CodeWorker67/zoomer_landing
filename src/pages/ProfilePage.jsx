import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Shield,
  LogOut,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  Send,
  Loader2,
  CreditCard,
  Settings,
  Key,
  Download,
  TrendingUp,
  HelpCircle,
} from 'lucide-react';
import useAuthStore from '@stores/authStore';
import { userApi } from '@services/api';
import Button from '@components/ui/Button';
import toast from 'react-hot-toast';
import DashboardLayout from '@components/dashboard/DashboardLayout';
import ReferralCard from '@components/dashboard/ReferralCard';
import {
  BRAND_META,
  ROUTES,
  TELEGRAM,
  TARIFFS,
  PAYMENT_METHODS,
  DOWNLOAD_LINKS,
} from '@utils/constants';

const RENEWAL_TARIFFS = TARIFFS;

const VALID_TABS = new Set(['overview', 'subscription', 'buy', 'support']);

export default function ProfilePage() {
  const location = useLocation();
  const initialTab = VALID_TABS.has(location.state?.tab) ? location.state.tab : 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (VALID_TABS.has(location.state?.tab)) {
      setActiveTab(location.state.tab);
    }
  }, [location.state?.tab]);

  return (
    <>
      <Helmet><title>Личный кабинет — {BRAND_META}</title></Helmet>
      <DashboardLayout activeId={activeTab} onTabChange={setActiveTab}>
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Личный кабинет</h1>
          <div className="flex items-center gap-2 shrink-0">
            {activeTab === 'overview' && (
              <Link
                to={ROUTES.SETTINGS}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Настройки"
                aria-label="Настройки"
              >
                <Settings className="w-5 h-5" />
              </Link>
            )}
            <button
              type="button"
              onClick={logout}
              className="p-2 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
              title="Выйти"
              aria-label="Выйти"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {user?.email && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-zoomer-card border border-zoomer-border text-sm text-gray-300">
            {user.email}
          </div>
        )}

        {activeTab === 'overview' && (
          <OverviewTab
            onGoTab={setActiveTab}
          />
        )}
        {activeTab === 'subscription' && <SubscriptionTab />}
        {activeTab === 'buy' && <BuyTab />}
        {activeTab === 'support' && <SupportTab />}
      </DashboardLayout>
    </>
  );
}

function OverviewTab({ onGoTab }) {
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userApi.subscription()
      .then(({ data }) => setSub(data))
      .catch(() => setSub(null))
      .finally(() => setLoading(false));
  }, []);

  const isActive = sub?.active || sub?.pro?.active;
  const expires = sub?.expires || sub?.pro?.expires;
  const planName = sub?.plan_name || sub?.pro?.plan_name || (isActive ? 'Пробный' : 'Подписка');

  if (loading) return <LoadingBlock />;

  const quickActions = [
    { label: 'Подписки', icon: Key, action: () => onGoTab('subscription') },
    { label: 'Купить', icon: CreditCard, action: () => onGoTab('buy') },
    { label: 'Приложения', icon: Download, to: `${ROUTES.ONBOARDING}?setup=1` },
    { label: 'Рефералы', icon: TrendingUp, to: ROUTES.EARNINGS },
  ];

  return (
    <div className="space-y-5">
      <Link
        to={`${ROUTES.ONBOARDING}?setup=1`}
        className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-zoomer-neon-dim to-zoomer-neon hover:opacity-95 transition-opacity group"
      >
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5 text-zoomer-dark" />
        </div>
        <div className="flex-1 min-w-0 text-left">
          <div className="text-zoomer-dark font-bold text-base">Подключить VPN</div>
          <div className="text-zoomer-dark/80 text-xs sm:text-sm">
            Пошаговая инструкция — установка и подключение
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-zoomer-dark shrink-0 group-hover:translate-x-0.5 transition-transform" />
      </Link>

      <div className="card-dark">
        <div className="flex items-center gap-2 mb-3">
          <Shield className={`w-5 h-5 ${isActive ? 'text-zoomer-neon' : 'text-gray-500'}`} />
          <span className="text-white font-semibold">{planName}</span>
        </div>
        {isActive && expires ? (
          <p className="text-sm text-zoomer-neon/90 mb-4">Активна до {expires}</p>
        ) : (
          <p className="text-sm text-red-400 mb-4">Подписка не активна</p>
        )}
        {isActive && (
          <div className="mb-5">
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>Трафик</span>
              <span>Безлимит</span>
            </div>
            <div className="h-1.5 rounded-full bg-zoomer-dark overflow-hidden">
              <div className="h-full w-0 rounded-full bg-gradient-to-r from-zoomer-neon-dim to-zoomer-neon" />
            </div>
          </div>
        )}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onGoTab('subscription')}
            className="flex-1 py-2.5 px-4 rounded-xl border border-zoomer-border text-gray-300 text-sm font-medium hover:bg-white/5 hover:text-white transition-colors"
          >
            Управлять
          </button>
          <button
            type="button"
            onClick={() => onGoTab('buy')}
            className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold bg-gradient-to-r from-zoomer-neon-dim to-zoomer-neon text-zoomer-dark hover:opacity-90 transition-opacity"
          >
            Продлить
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-white mb-3">Быстрые действия</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((item) => {
            const content = (
              <>
                <item.icon className="w-6 h-6 text-zoomer-neon mb-2" />
                <span className="text-white text-sm font-medium">{item.label}</span>
              </>
            );
            const className = 'card-dark flex flex-col items-center justify-center text-center py-5 hover:border-zoomer-neon/30 transition-colors min-h-[100px]';

            if (item.to) {
              return (
                <Link key={item.label} to={item.to} className={className}>
                  {content}
                </Link>
              );
            }
            return (
              <button key={item.label} type="button" onClick={item.action} className={className}>
                {content}
              </button>
            );
          })}
        </div>
      </div>

      <ReferralCard />
    </div>
  );
}

function SubscriptionTab() {
  const [sub, setSub] = useState(null);
  const [keys, setKeys] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Promise.all([
      userApi.subscription().then(({ data }) => setSub(data)).catch(() => setSub(null)),
      userApi.keys().then(({ data }) => setKeys(data)).catch(() => setKeys(null)),
    ]).finally(() => setLoading(false));
  }, []);

  const isActive = sub?.active || sub?.pro?.active;
  const subUrl = keys?.subscription_url || keys?.pro_url;
  const expires = sub?.expires || sub?.pro?.expires;

  const copyUrl = () => {
    if (!subUrl) return;
    navigator.clipboard.writeText(subUrl);
    setCopied(true);
    toast.success('Ссылка скопирована');
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <LoadingBlock />;

  return (
    <div className="space-y-4">
      <div className="card-dark">
        <h2 className="text-lg font-bold text-white mb-4">Ваша подписка</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between gap-4 py-2 border-b border-zoomer-border">
            <span className="text-gray-400">Статус</span>
            <span className={isActive ? 'text-zoomer-neon font-medium' : 'text-red-400 font-medium'}>
              {isActive ? 'Активна' : 'Не активна'}
            </span>
          </div>
          <div className="flex justify-between gap-4 py-2 border-b border-zoomer-border">
            <span className="text-gray-400">Срок действия</span>
            <span className="text-white text-right">{expires || '—'}</span>
          </div>
          <div className="flex justify-between gap-4 py-2">
            <span className="text-gray-400">Устройств</span>
            <span className="text-white">до 5</span>
          </div>
        </div>
      </div>

      {subUrl ? (
        <div className="card-dark">
          <h3 className="text-white font-semibold mb-3">Ссылка-подписка</h3>
          <p className="text-gray-500 text-sm mb-4">
            Скопируйте ссылку или откройте её в Happ. При продлении подписки ключ не меняется.
          </p>
          <div className="p-3 bg-zoomer-dark rounded-lg mb-4">
            <code className="text-xs text-gray-400 break-all">{subUrl}</code>
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" className="flex-1 text-sm" onClick={copyUrl}>
              {copied ? <Check className="w-4 h-4 inline mr-1" /> : <Copy className="w-4 h-4 inline mr-1" />}
              {copied ? 'Скопировано' : 'Копировать'}
            </Button>
            <a
              href={subUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-secondary text-sm flex items-center justify-center gap-1"
            >
              <ExternalLink className="w-4 h-4" />
              Открыть
            </a>
          </div>
        </div>
      ) : (
        <div className="card-dark text-center py-10">
          <Shield className="w-10 h-10 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm mb-1">Подписка ещё не активирована</p>
          <p className="text-gray-500 text-xs">Продлите подписку в разделе «Купить»</p>
        </div>
      )}

      <div className="card-dark">
        <h3 className="text-white font-semibold mb-3">Как добавить в Happ</h3>
        <ol className="space-y-2 text-sm text-gray-400 list-decimal list-inside">
          <li>Скачайте Happ на своё устройство</li>
          <li>Нажмите «Открыть» или вставьте ссылку-подписку</li>
          <li>Выберите сервер и подключитесь</li>
        </ol>
        <div className="mt-4 flex flex-wrap gap-2">
          {DOWNLOAD_LINKS.slice(0, 3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zoomer-neon hover:underline"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>

      <TariffRenewalSection />
    </div>
  );
}

function TariffRenewalSection({ showHeader = true, showPaymentMethod = true }) {
  const navigate = useNavigate();
  const [method, setMethod] = useState('sbp');

  const handleRenew = (tariffId) => {
    navigate(`${ROUTES.CHECKOUT}?tariff=${tariffId}&method=${method}`);
  };

  return (
    <div className="space-y-4">
      {showHeader && (
        <div className="card-dark">
          <h2 className="text-lg font-bold text-white mb-2">Тарифы</h2>
          <p className="text-gray-400 text-sm">
            Выберите срок подписки. VLESS-ключ и ссылка в Happ останутся прежними —
            меняется только оплаченный период доступа.
          </p>
        </div>
      )}

      {showPaymentMethod && (
        <div className="card-dark">
          <p className="text-gray-400 text-sm mb-3">Способ оплаты</p>
          <div className="flex gap-2">
            {PAYMENT_METHODS.map((pm) => (
              <button
                key={pm.id}
                type="button"
                onClick={() => setMethod(pm.id)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium border transition-all ${
                  method === pm.id
                    ? 'border-zoomer-neon bg-zoomer-neon/10 text-white'
                    : 'border-zoomer-border text-gray-400 hover:border-gray-500'
                }`}
              >
                {pm.id === 'card' && <CreditCard className="w-4 h-4 inline mr-1 -mt-0.5" />}
                {pm.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {RENEWAL_TARIFFS.map((tariff) => (
          <div
            key={tariff.id}
            className={`card-dark flex items-center justify-between gap-4 ${tariff.popular ? 'border-zoomer-neon/40' : ''}`}
          >
            <div>
              {tariff.popular && (
                <span className="text-xs font-semibold text-zoomer-neon mb-1 block">Популярный</span>
              )}
              <div className="text-white font-semibold">{tariff.label}</div>
              <div className="text-gray-500 text-xs mt-0.5">
                {`Продление на ${tariff.label.toLowerCase()}`}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xl font-bold text-gradient mb-2">{tariff.price} ₽</div>
              <Button type="button" className="text-sm px-4 py-2" onClick={() => handleRenew(tariff.id)}>
                Продлить
              </Button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-gray-500">
        Оплата через СБП или карту РФ. Без автосписаний.
      </p>
    </div>
  );
}

function BuyTab() {
  return (
    <div className="space-y-4">
      <div className="card-dark">
        <h2 className="text-lg font-bold text-white mb-2">Продление подписки</h2>
        <p className="text-gray-400 text-sm">
          Выберите срок продления текущей подписки. VLESS-ключ и ссылка в Happ останутся прежними —
          меняется только оплаченный период доступа.
        </p>
      </div>
      <TariffRenewalSection showHeader={false} />
    </div>
  );
}

function SupportTab() {
  return (
    <div className="space-y-4">
      <div className="card-dark">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-zoomer-neon/10 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-zoomer-neon" />
          </div>
          <h2 className="text-lg font-bold text-white">Поддержка</h2>
        </div>
        <p className="text-gray-400 text-sm mb-6">
          Если возникли вопросы по подключению, оплате или работе VPN — напишите нам в Telegram.
          Среднее время ответа — несколько минут.
        </p>
        <a
          href={TELEGRAM.SUPPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-zoomer-neon-dim to-zoomer-neon text-zoomer-dark font-semibold hover:opacity-90 transition-opacity"
        >
          <Send className="w-5 h-5" />
          Написать в поддержку
        </a>
      </div>

      <div className="card-dark">
        <h3 className="text-white font-semibold mb-2">Telegram-бот</h3>
        <p className="text-gray-500 text-sm mb-4">
          Управляйте подпиской и получайте ключи прямо в боте.
        </p>
        <a
          href={TELEGRAM.BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zoomer-neon text-sm hover:underline"
        >
          Открыть бота →
        </a>
      </div>
    </div>
  );
}

function LoadingBlock() {
  return (
    <div className="card-dark flex items-center justify-center py-16">
      <Loader2 className="w-8 h-8 text-zoomer-neon animate-spin" />
    </div>
  );
}
