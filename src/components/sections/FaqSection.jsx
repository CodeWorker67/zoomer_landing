import { useState } from 'react';
import clsx from 'clsx';

export default function FaqSection({ items, title = 'Частые вопросы' }) {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="mt-24">
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <span className="chip" style={{ textTransform: 'none' }}>
          FAQ
        </span>
        <h2 className="mt-3" style={{ fontSize: 'clamp(1.45rem, 3vw, 1.85rem)', marginBottom: 36 }}>
          {title}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={clsx('faq-item', isOpen && 'is-open')} key={item.q}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-sign">{isOpen ? '−' : '+'}</span>
                </button>
                <p className="faq-a">{item.a}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
