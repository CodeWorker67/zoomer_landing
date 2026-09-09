import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqSection({ items, title = 'Частые вопросы' }) {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">{title}</h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={item.q} className="card-dark">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-start gap-4 text-left"
              >
                <span className="text-white font-medium">{item.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && <p className="text-gray-400 text-sm mt-4 leading-relaxed">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
