import { Link } from 'react-router-dom';
import { ROUTES } from '@utils/constants';

export default function HappSection() {
  return (
    <section id="happ" className="mt-24">
      <Link to={ROUTES.INCY_VPN} className="card wedge-card">
        <div>
          <span className="chip" style={{ textTransform: 'none', color: 'var(--color-lime)' }}>
            Пользуетесь Happ?
          </span>
          <h3 className="mt-3" style={{ fontSize: '1.22rem' }}>
            INCY — близкий аналог Happ
          </h3>
          <p className="mt-2" style={{ fontSize: '0.95rem', color: 'var(--color-ink-soft)', maxWidth: '54ch' }}>
            Тот же движок Xray-core, те же ключи-подписки. Чем отличается и когда выбрать INCY — разбираем подробно.
          </p>
        </div>
        <span className="plat-arrow" style={{ fontSize: '1.5rem' }}>
          →
        </span>
      </Link>
    </section>
  );
}
