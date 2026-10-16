import { Link } from 'react-router-dom';
import { ROUTES, SUPPORT_URL } from '@utils/constants';

export default function CtaSection() {
  return (
    <section
      className="mt-24"
      style={{
        background: 'var(--gradient-accent)',
        borderRadius: 26,
        padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1.25rem, 4vw, 2rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--color-line-strong)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,.2), transparent 70%)',
        }}
      />
      <div style={{ position: 'relative' }}>
        <h2
          style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#04140a',
            marginBottom: 14,
          }}
        >
          Ключ для INCY — один день бесплатно
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(4,20,10,.75)', marginBottom: 32 }}>
          Регистрация за минуту. Вставьте ключ в INCY и подключайтесь.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="btn btn-ghost" to={ROUTES.LOGIN} style={{ background: '#04140a', color: '#eefcf2', borderColor: '#04140a' }}>
            Получить ключ бесплатно
          </Link>
          <a
            className="btn btn-ghost cta-support-outline"
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Написать в поддержку
          </a>
        </div>
      </div>
    </section>
  );
}
