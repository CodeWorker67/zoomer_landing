import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import Button from '@components/ui/Button';
import { ROUTES, TARIFFS, PAYMENT_METHODS } from '@utils/constants';
import { tariffLabelWithTickets } from '@utils/raffle';

export default function TariffRenewalSection({ showHeader = true, showPaymentMethod = true }) {
  const navigate = useNavigate();
  const [method, setMethod] = useState('sbp');

  const handleRenew = (tariffId) => {
    navigate(`${ROUTES.CHECKOUT}?tariff=${tariffId}&method=${method}`);
  };

  return (
    <div className="space-y-4">
      {showHeader && (
        <div className="card-dark">
          <h2 className="text-lg font-bold text-happ-ink mb-2">Тарифы</h2>
          <p className="text-happ-muted text-sm">
            Выберите срок подписки. VLESS-ключ и ссылка в Happ останутся прежними —
            меняется только оплаченный период доступа.
          </p>
        </div>
      )}

      {showPaymentMethod && (
        <div className="card-dark">
          <p className="text-happ-muted text-sm mb-3">Способ оплаты</p>
          <div className="flex gap-2.5">
            {PAYMENT_METHODS.map((pm) => {
              const selected = method === pm.id;
              return (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setMethod(pm.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                    selected
                      ? 'border-happ-blue bg-happ-blue text-white shadow-[0_4px_14px_rgba(10,108,255,0.35)]'
                      : 'border-happ-blue/30 bg-happ-gray text-happ-ink hover:border-happ-blue/55 hover:bg-happ-gray/80'
                  }`}
                >
                  {pm.id === 'card' && (
                    <CreditCard className={`w-4 h-4 shrink-0 ${selected ? 'text-white' : 'text-happ-blue'}`} />
                  )}
                  {pm.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {TARIFFS.map((tariff) => (
          <div
            key={tariff.id}
            className={`card-dark flex items-center justify-between gap-4 ${tariff.popular ? 'border-zoomer-neon/40' : ''}`}
          >
            <div>
              {tariff.popular && (
                <span className="text-xs font-semibold text-zoomer-neon mb-1 block">Популярный</span>
              )}
              <div className="text-happ-ink font-semibold">
                {tariffLabelWithTickets(tariff.label, tariff.days)}
              </div>
              <div className="text-happ-faint text-xs mt-0.5">
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

      <p className="text-center text-xs text-happ-faint">
        Оплата через СБП или карту РФ. Без автосписаний.
      </p>
    </div>
  );
}
