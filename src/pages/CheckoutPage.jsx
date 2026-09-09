import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { paymentApi } from '@services/api';
import useAuthStore from '@stores/authStore';
import { ROUTES, TARIFFS, BRAND_META } from '@utils/constants';
import Button from '@components/ui/Button';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [status, setStatus] = useState('creating');
  const [errorMsg, setErrorMsg] = useState('');

  const tariffId = searchParams.get('tariff');
  const method = searchParams.get('method');

  useEffect(() => {
    if (!isAuthenticated) {
      toast('Войдите, чтобы оплатить', { icon: '🔑' });
      navigate(`${ROUTES.LOGIN}?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
      return;
    }

    if (!tariffId || !method || !TARIFFS.find((t) => t.id === tariffId) || !['sbp', 'card'].includes(method)) {
      navigate(ROUTES.HOME);
      return;
    }

    let cancelled = false;
    paymentApi.createPayment({ tariff_id: tariffId, method })
      .then(({ data }) => {
        if (cancelled) return;
        if (data.payment_url) {
          window.location.href = data.payment_url;
        } else {
          setStatus('error');
          setErrorMsg('Не удалось получить ссылку на оплату');
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setStatus('error');
        setErrorMsg(err.response?.data?.detail || 'Ошибка при создании платежа');
      });

    return () => { cancelled = true; };
  }, [tariffId, method, isAuthenticated, navigate]);

  const tariff = TARIFFS.find((t) => t.id === tariffId);

  return (
    <>
      <Helmet><title>Оплата — {BRAND_META}</title></Helmet>
      <section className="py-20 min-h-screen flex items-center justify-center">
        <div className="card-dark max-w-md mx-4 text-center">
          {status === 'creating' && (
            <>
              <Loader2 className="w-12 h-12 text-zoomer-neon mx-auto mb-4 animate-spin" />
              <h1 className="text-xl font-bold text-white mb-2">Создаём платёж</h1>
              <p className="text-gray-400 text-sm">
                {tariff ? `${tariff.label} — ${tariff.price} ₽` : 'Загрузка...'}
              </p>
              <p className="text-gray-500 text-xs mt-4">Перенаправляем на страницу оплаты...</p>
            </>
          )}
          {status === 'error' && (
            <>
              <h1 className="text-xl font-bold text-white mb-2">Ошибка</h1>
              <p className="text-red-400 text-sm mb-6">{errorMsg}</p>
              <Button onClick={() => navigate(ROUTES.HOME)} className="w-full">На главную</Button>
            </>
          )}
        </div>
      </section>
    </>
  );
}
