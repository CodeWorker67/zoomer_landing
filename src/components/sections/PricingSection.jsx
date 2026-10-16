import { Link } from 'react-router-dom';
import { ROUTES } from '@utils/constants';

function Rub({ children, color = 'var(--color-ink-soft)' }) {
  return (
    <span style={{ fontSize: 16, fontWeight: 500, color }}>{children}</span>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="mt-24">
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="chip" style={{ textTransform: 'none' }}>Тарифы</span>
          <h2 className="mt-3" style={{ fontSize: 'clamp(1.45rem, 3vw, 1.85rem)' }}>Ключ для INCY — начните бесплатно</h2>
          <p style={{ fontSize: 16, color: 'var(--color-ink-soft)', marginTop: 10 }}>1 день бесплатно · подходит для INCY и Happ</p>
        </div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="price-row">
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--color-ink)' }}>1 день</span>
                <span className="chip" style={{ textTransform: 'none', fontSize: '0.65rem' }}>
                  Пробный
                </span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-ink-soft)', marginTop: 2 }}>Полный доступ, все локации</div>
            </div>
            <div className="price-col">
              <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1, color: 'var(--color-ink)' }}>бесплатно</div>
              <div style={{ fontSize: 12, color: 'var(--color-ink-faint)', marginTop: 3 }}>за 1 день</div>
            </div>
            <Link className="price-btn" to={ROUTES.LOGIN}>
              Попробовать
            </Link>
          </div>

          <div className="price-row">
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--color-ink)' }}>1 месяц</div>
              <div style={{ fontSize: 13, color: 'var(--color-ink-soft)', marginTop: 2 }}>299 ₽ итого</div>
            </div>
            <div className="price-col">
              <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1, color: 'var(--color-ink)' }}>
                299 <Rub>₽</Rub>
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-ink-faint)', marginTop: 3 }}>в месяц</div>
            </div>
            <Link className="price-btn" to={ROUTES.LOGIN}>
              Выбрать
            </Link>
          </div>

          <div className="price-row price-row--hot">
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--color-ink)' }}>3 месяца</span>
                <span className="chip" style={{ textTransform: 'uppercase', fontSize: '0.62rem', color: '#04140a', background: 'var(--gradient-accent)', border: 'none' }}>
                  Популярный
                </span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--color-ink-soft)', marginTop: 2 }}>749 ₽ итого</div>
            </div>
            <div className="price-col">
              <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1, color: 'var(--color-brand)' }}>
                249 <Rub color="var(--color-ink-soft)">₽</Rub>
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-ink-faint)', marginTop: 3 }}>в месяц</div>
            </div>
            <Link className="price-btn price-btn--hot" to={ROUTES.LOGIN}>
              Выбрать
            </Link>
          </div>

          <div className="price-row">
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--color-ink)' }}>1 год</div>
              <div style={{ fontSize: 13, color: 'var(--color-ink-soft)', marginTop: 2 }}>2 399 ₽ итого</div>
            </div>
            <div className="price-col">
              <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1, color: 'var(--color-ink)' }}>
                199 <Rub>₽</Rub>
              </div>
              <div style={{ fontSize: 12, color: 'var(--color-ink-faint)', marginTop: 3 }}>в месяц</div>
            </div>
            <Link className="price-btn" to={ROUTES.LOGIN}>
              Выбрать
            </Link>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
          <span style={{ fontSize: 13, color: 'var(--color-ink-soft)' }}>✓ 5 устройств</span>
          <span style={{ fontSize: 13, color: 'var(--color-ink-soft)' }}>✓ 10 локаций</span>
          <span style={{ fontSize: 13, color: 'var(--color-ink-soft)' }}>✓ Безлимитный трафик</span>
          <span style={{ fontSize: 13, color: 'var(--color-ink-soft)' }}>✓ Поддержка 24/7</span>
        </div>
      </div>
    </section>
  );
}
