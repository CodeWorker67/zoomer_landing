import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Zap } from 'lucide-react';
import {
  PAYMENT_METHODS,
  ROUTES,
  TRAFFIC_PACKAGES,
  TRAFFIC_REQUIRES_ACTIVE_SUBSCRIPTION,
} from '@utils/constants';
import { configApi, paymentApi, userApi } from '@services/api';
import useAuthStore from '@stores/authStore';
import Button from '@components/ui/Button';
import { RouteMeta } from '@components/seo/PageMeta';
import toast from 'react-hot-toast';

const METHOD_ICONS = { sbp: Zap, card: CreditCard };

function paymentErrorMessage(err) {
  const data = err.response?.data;
  if (!data) return 'Ошибка при создании платежа';
  if (typeof data.detail === 'string') return data.detail;
  if (typeof data.error === 'string') return data.error;
  return 'Ошибка при создании платежа';
}

function subscriptionIsActive(sub) {
  return Boolean(sub?.active || sub?.pro?.active);
}

export default function TrafficBuyPage() {
  const [packages, setPackages] = useState(TRAFFIC_PACKAGES);
  const [selectedGb, setSelectedGb] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    configApi
      .trafficPackages()
      .then(({ data }) => {
        if (Array.isArray(data) && data.length > 0) {
          setPackages(data.map((p) => ({ gb: p.gb, price: p.price })));
        }
      })
      .catch(() => {});
  }, []);

  const selectedPackage = packages.find((p) => p.gb === selectedGb);

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      toast('Войдите, чтобы оплатить', { icon: '🔑' });
      navigate(`${ROUTES.LOGIN}?redirect=${encodeURIComponent(ROUTES.TRAFFIC_BUY)}`);
      return;
    }
    if (!selectedGb || !selectedMethod) return;
    setIsProcessing(true);
    try {
      const { data: sub } = await userApi.subscription();
      if (!subscriptionIsActive(sub)) {
        toast.error(TRAFFIC_REQUIRES_ACTIVE_SUBSCRIPTION);
        return;
      }
      const { data } = await paymentApi.createTrafficPayment({
        gb: selectedGb,
        method: selectedMethod,
      });
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        toast.error('Не удалось создать платёж');
      }
    } catch (err) {
      toast.error(paymentErrorMessage(err));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <RouteMeta path={ROUTES.TRAFFIC_BUY} />
      <section className="py-16 sm:py-20 min-h-[70vh]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-happ-ink mb-3">
              Докупка <span className="text-gradient">трафика</span>
            </h1>
            <p className="text-happ-muted text-base max-w-2xl mx-auto">
              Пакеты для сервера с надёжным доступом на мобильном интернете. Нужна активная подписка VPN PRO.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {packages.map((pkg) => (
              <button
                key={pkg.gb}
                type="button"
                onClick={() => setSelectedGb(pkg.gb)}
                className={`card-dark text-left w-full transition-colors ${
                  selectedGb === pkg.gb
                    ? 'border-happ-blue ring-2 ring-happ-blue/40'
                    : 'hover:border-happ-blue/30'
                }`}
              >
                <div className="text-happ-faint text-sm mb-2">Пакет</div>
                <div className="text-3xl font-bold text-happ-ink mb-1">
                  {pkg.gb}
                  <span className="text-base text-happ-muted ml-1">GB</span>
                </div>
                <div className="text-2xl font-semibold text-gradient mb-3">
                  {pkg.price}
                  <span className="text-sm text-happ-muted ml-1">руб</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-happ-muted">
                  <Check className="w-3.5 h-3.5 text-happ-blue shrink-0" />
                  Добавляется к лимиту сервера
                </div>
              </button>
            ))}
          </div>

          {selectedGb && (
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-happ-ink text-center mb-4">Способ оплаты</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = METHOD_ICONS[method.id] || Zap;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        selectedMethod === method.id
                          ? 'border-happ-blue bg-happ-blue/10 text-happ-ink'
                          : 'border-zoomer-border bg-zoomer-card text-happ-muted hover:border-happ-blue/30'
                      }`}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-2 text-happ-blue" />
                      <div className="text-xs font-medium">{method.label}</div>
                    </button>
                  );
                })}
              </div>

              <Button
                onClick={handlePurchase}
                disabled={!selectedMethod || isProcessing}
                className={`w-full text-base py-3 ${
                  !selectedMethod || isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing
                  ? 'Создаём платёж...'
                  : `Оплатить ${selectedPackage?.price ?? ''} руб`}
              </Button>

              <p className="mt-4 text-center text-sm text-happ-faint leading-relaxed">
                После успешной оплаты обновите список серверов в приложении через 1 минуту — новый сервер
                появится.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
