import { AUTH_URL } from '@utils/constants';

function Rub({ children, color = '#5A5A6A' }) {
  return (
    <span style={{ fontSize: 16, fontWeight: 500, color }}>{children}</span>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="section" style={{ background: '#F4F5F9' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <p className="kicker">Тарифы</p>
          <h2 className="h2">Начните бесплатно</h2>
          <p style={{ fontSize: 16, color: '#5A5A6A', marginTop: 10 }}>1 день бесплатно</p>
        </div>
        <div style={{ border: '1.5px solid rgba(0,0,0,.07)', borderRadius: 22, overflow: 'hidden', background: '#fff' }}>
          <div className="price-row">
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 17, fontWeight: 800 }}>1 день</span>
                <span
                  style={{
                    background: '#EDF9F1',
                    color: '#1a7c3c',
                    border: '1px solid rgba(52,199,89,.25)',
                    fontSize: 11,
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: 980,
                  }}
                >
                  Пробный
                </span>
              </div>
              <div style={{ fontSize: 13, color: '#5A5A6A', marginTop: 2 }}>Полный доступ, все локации</div>
            </div>
            <div className="price-col">
              <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1 }}>бесплатно</div>
              <div style={{ fontSize: 12, color: '#9A9AAA', marginTop: 3 }}>за 1 день</div>
            </div>
            <a className="price-btn" href={AUTH_URL}>
              Попробовать
            </a>
          </div>

          <div className="price-row">
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 800 }}>1 месяц</div>
              <div style={{ fontSize: 13, color: '#5A5A6A', marginTop: 2 }}>299 ₽ итого</div>
            </div>
            <div className="price-col">
              <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1 }}>
                299 <Rub>₽</Rub>
              </div>
              <div style={{ fontSize: 12, color: '#9A9AAA', marginTop: 3 }}>в месяц</div>
            </div>
            <a className="price-btn" href={AUTH_URL}>
              Выбрать
            </a>
          </div>

          <div className="price-row price-row--hot">
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 17, fontWeight: 800 }}>3 месяца</span>
                <span
                  style={{
                    background: '#0A6CFF',
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    borderRadius: 980,
                  }}
                >
                  Популярный
                </span>
              </div>
              <div style={{ fontSize: 13, color: '#5A5A6A', marginTop: 2 }}>749 ₽ итого</div>
            </div>
            <div className="price-col">
              <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1, color: '#0A6CFF' }}>
                249 <Rub color="rgba(10,108,255,.6)">₽</Rub>
              </div>
              <div style={{ fontSize: 12, color: '#9A9AAA', marginTop: 3 }}>в месяц</div>
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(52,199,89,.14)',
                  color: '#1a8c38',
                  fontSize: 11,
                  fontWeight: 800,
                  padding: '3px 9px',
                  borderRadius: 980,
                  marginTop: 6,
                }}
              >
                −17%
              </span>
            </div>
            <a className="price-btn price-btn--hot" href={AUTH_URL}>
              Выбрать
            </a>
          </div>

          <div className="price-row">
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 800 }}>1 год</div>
              <div style={{ fontSize: 13, color: '#5A5A6A', marginTop: 2 }}>2 399 ₽ итого</div>
            </div>
            <div className="price-col">
              <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1 }}>
                199 <Rub>₽</Rub>
              </div>
              <div style={{ fontSize: 12, color: '#9A9AAA', marginTop: 3 }}>в месяц</div>
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(52,199,89,.14)',
                  color: '#1a8c38',
                  fontSize: 11,
                  fontWeight: 800,
                  padding: '3px 9px',
                  borderRadius: 980,
                  marginTop: 6,
                }}
              >
                −33%
              </span>
            </div>
            <a className="price-btn" href={AUTH_URL}>
              Выбрать
            </a>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
          <span style={{ fontSize: 13, color: '#5A5A6A' }}>✓ 5 устройств</span>
          <span style={{ fontSize: 13, color: '#5A5A6A' }}>✓ 10 локаций</span>
          <span style={{ fontSize: 13, color: '#5A5A6A' }}>✓ Безлимитный трафик</span>
          <span style={{ fontSize: 13, color: '#5A5A6A' }}>✓ Поддержка 24/7</span>
        </div>
      </div>
    </section>
  );
}
