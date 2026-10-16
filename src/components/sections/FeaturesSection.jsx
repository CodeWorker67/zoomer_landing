const FEATURES = [
  {
    title: 'Открытое ядро Xray-core',
    text: 'Проверенный движок, открытый код.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7l8.7 5l8.7-5M12 22V12" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Все протоколы',
    text: 'VLESS Reality, VMess, Trojan, Hysteria2.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="m10.586 5.414l-5.172 5.172m13.172 2.828l-5.172 5.172M6 12h12" />
          <circle cx="12" cy="20" r="2" />
          <circle cx="12" cy="4" r="2" />
          <circle cx="20" cy="12" r="2" />
          <circle cx="4" cy="12" r="2" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Не логирует трафик',
    text: 'Клиент бесплатный, без сбора данных.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          <path d="m9 12l2 2l4-4" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Один ключ — все устройства',
    text: 'Телефон, ПК и телевизор — до 5 устройств на одной подписке.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8m-2 4v-3.96v3.15M7 19h5" />
          <rect width="6" height="10" x="16" y="12" rx="2" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Есть в App Store России',
    text: 'INCY напрямую, без смены региона Apple ID.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77a4 4 0 0 1 6.74 0a4 4 0 0 1 4.78 4.78a4 4 0 0 1 0 6.74a4 4 0 0 1-4.77 4.78a4 4 0 0 1-6.75 0a4 4 0 0 1-4.78-4.77a4 4 0 0 1 0-6.76" />
          <path d="m9 12l2 2l4-4" />
        </g>
      </svg>
    ),
  },
  {
    title: 'Подключение за пару секунд',
    text: 'Вставил ключ — и в сети.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
        />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="mt-24">
      <h2 style={{ fontSize: 'clamp(1.45rem, 3vw, 1.85rem)' }}>Почему INCY</h2>
      <div className="mt-6 grid-feats">
        {FEATURES.map((item) => (
          <div key={item.title} className="card feat-card">
            <span className="feat-ico">{item.icon}</span>
            <h3 className="mt-4" style={{ fontSize: '1.02rem' }}>
              {item.title}
            </h3>
            <p className="mt-1" style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)' }}>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
