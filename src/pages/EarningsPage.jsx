import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users,
  TrendingUp,
  Wallet,
  Link2,
  Copy,
  Check,
  Share2,
  Loader2,
  AlertTriangle,
  UserPlus,
  LogOut,
  Settings,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { partnerApi } from '@services/api';
import useAuthStore from '@stores/authStore';
import DashboardLayout from '@components/dashboard/DashboardLayout';
import { BRAND, BRAND_META, ROUTES, TELEGRAM } from '@utils/constants';
import { resolvePartnerSiteLink } from '@utils/site';

function maskEmail(email) {
  if (!email || !email.includes('@')) return 'Пользователь';
  const [local, domain] = email.split('@');
  const masked = local.length <= 2 ? `${local[0]}*` : `${local.slice(0, 2)}***`;
  return `${masked}@${domain}`;
}

function formatDate(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
}

function defaultShareMessage(siteLink, telegramLink) {
  return (
    `Рекомендую ${BRAND} — быстрый VPN для Happ.\n\n`
    + `🌐 Сайт: ${siteLink}\n`
    + `📱 Telegram: ${telegramLink}\n\n`
    + '1 день бесплатно после регистрации!'
  );
}

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success('Скопировано');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1.5">{label}</label>
      <div className="flex gap-2">
        <input
          readOnly
          value={value || ''}
          className="flex-1 min-w-0 bg-zoomer-dark border border-zoomer-border rounded-lg px-3 py-2.5 text-sm text-zoomer-neon font-mono truncate"
        />
        <button
          type="button"
          onClick={copy}
          className="shrink-0 w-11 h-11 flex items-center justify-center rounded-lg border border-zoomer-border text-gray-400 hover:text-white hover:border-zoomer-neon/40 transition-colors"
          aria-label={`Скопировать ${label}`}
        >
          {copied ? <Check className="w-4 h-4 text-zoomer-neon" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="card-dark flex flex-col gap-2">
      <div className="w-9 h-9 rounded-lg bg-zoomer-neon/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-zoomer-neon" />
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

export default function EarningsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const handleNav = (id) => {
    if (id === 'earnings') return;
    navigate(ROUTES.DASHBOARD, { state: { tab: id } });
  };

  useEffect(() => {
    partnerApi.stats()
      .then(({ data: stats }) => {
        const siteLink = resolvePartnerSiteLink(stats.site_link, stats.partner_code);
        setData({ ...stats, site_link: siteLink });
        setMessage(defaultShareMessage(siteLink, stats.telegram_link));
      })
      .catch(() => toast.error('Не удалось загрузить данные'))
      .finally(() => setLoading(false));
  }, []);

  const copyMessage = async () => {
    await navigator.clipboard.writeText(message);
    toast.success('Сообщение скопировано');
  };

  const shareMessage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: message });
        return;
      } catch {
        /* fallback to copy */
      }
    }
    await copyMessage();
  };

  if (loading) {
    return (
      <DashboardLayout activeId="earnings" onTabChange={handleNav}>
        <div className="flex justify-center py-24">
          <Loader2 className="w-8 h-8 text-zoomer-neon animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (!data) {
    return (
      <DashboardLayout activeId="earnings" onTabChange={handleNav}>
        <div className="card-dark text-center py-16">
          <p className="text-gray-400">Не удалось загрузить партнёрскую программу</p>
          <Link to={ROUTES.DASHBOARD} className="inline-block mt-4 text-zoomer-neon hover:underline text-sm">
            Вернуться в кабинет
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <Helmet><title>Заработок — {BRAND_META}</title></Helmet>
      <DashboardLayout activeId="earnings" onTabChange={handleNav}>
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Заработок</h1>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to={ROUTES.SETTINGS}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Настройки"
              aria-label="Настройки"
            >
              <Settings className="w-5 h-5" />
            </Link>
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

        <div className="space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatCard icon={Users} value={data.referrals} label="Приглашённых" />
            <StatCard icon={TrendingUp} value={`${data.total_earned} ₽`} label="Заработано" />
            <StatCard icon={Wallet} value={`${data.balance} ₽`} label="Баланс" />
          </div>

          {data.can_withdraw && (
            <a
              href={data.support_url || TELEGRAM.SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center btn-primary py-3 rounded-xl text-sm font-semibold"
            >
              Вывести {data.balance} ₽
            </a>
          )}

          <div className="card-dark space-y-4">
            <h2 className="text-lg font-bold text-white">Как это работает</h2>
            <ol className="space-y-3 text-sm text-gray-400 list-decimal list-inside">
              <li>Отправьте ссылку друзьям.</li>
              <li>Те, кто перейдёт по вашей ссылке, будут закреплены за вами.</li>
              <li>
                Вы получаете <span className="text-zoomer-neon font-semibold">{data.percent}%</span> с каждой оплаты приглашённого.
              </li>
              <li>
                Накопленный баланс можно{' '}
                <a
                  href={data.support_url || TELEGRAM.SUPPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zoomer-neon hover:underline"
                >
                  вывести
                </a>
                {' '}(от 2000 руб).
              </li>
            </ol>
            <div className="flex gap-2 items-start p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Приглашать самого себя нельзя — если у приглашённого те же устройства, бонус не засчитается.
              </span>
            </div>
          </div>

          <div className="card-dark space-y-5">
            <div className="flex items-center gap-2">
              <Link2 className="w-5 h-5 text-zoomer-neon" />
              <h2 className="text-lg font-bold text-white">Ваши ссылки</h2>
            </div>

            <CopyField label="Ссылка на сайт" value={data.site_link} />
            <CopyField label="Ссылка в Telegram" value={data.telegram_link} />

            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                Сообщение для отправки (можно редактировать)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full bg-zoomer-dark border border-zoomer-border rounded-lg px-3 py-2.5 text-sm text-gray-300 resize-y min-h-[140px] focus:outline-none focus:border-zoomer-neon/40"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyMessage}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-zoomer-border text-gray-300 hover:text-white hover:border-gray-500 transition-colors text-sm font-medium"
              >
                <Copy className="w-4 h-4" />
                Копировать
              </button>
              <button
                type="button"
                onClick={shareMessage}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl btn-primary text-sm font-semibold"
              >
                <Share2 className="w-4 h-4" />
                Поделиться
              </button>
            </div>

            <p className="text-center text-xs text-gray-500">
              Код: <span className="text-white font-mono">{data.partner_code}</span>
            </p>
          </div>

          <div className="card-dark">
            <h2 className="text-lg font-bold text-white mb-4">Приглашённые</h2>
            {data.referrals_list?.length > 0 ? (
              <div className="space-y-2">
                {data.referrals_list.map((ref) => (
                  <div
                    key={ref.user_id}
                    className="flex items-center justify-between gap-3 py-3 border-b border-zoomer-border last:border-0"
                  >
                    <div className="min-w-0">
                      <div className="text-sm text-white truncate">{maskEmail(ref.email)}</div>
                      <div className="text-xs text-gray-500">{formatDate(ref.registered_at)}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm text-white">{ref.payments_sum} ₽</div>
                      <div className={`text-xs ${ref.has_subscription ? 'text-zoomer-neon' : 'text-gray-500'}`}>
                        {ref.has_subscription ? 'Подписка' : 'Без подписки'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <UserPlus className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm mb-1">Пока никого не пригласили</p>
                <p className="text-gray-500 text-xs">Поделитесь ссылкой и начните зарабатывать</p>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
