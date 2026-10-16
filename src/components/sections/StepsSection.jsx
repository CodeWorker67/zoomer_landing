const STEPS = [
  {
    n: '01',
    title: 'Скачайте INCY',
    text: 'Установите приложение под свою платформу — из App Store, Google Play или с GitHub. Бесплатно.',
  },
  {
    n: '02',
    title: 'Добавьте ключ',
    text: 'Откройте «Провайдер», вставьте ссылку-подписку или отсканируйте QR — «Добавить провайдера». Рабочий ключ — 1 день бесплатно.',
  },
  {
    n: '03',
    title: 'Подключитесь',
    text: 'Выберите сервер из списка и нажмите подключение. Дальше INCY работает в фоне.',
  },
];

export default function StepsSection() {
  return (
    <section id="steps" className="mt-24">
      <h2 style={{ fontSize: 'clamp(1.45rem, 3vw, 1.85rem)' }}>Как подключиться за 3 шага</h2>
      <div className="mt-6 grid-steps">
        {STEPS.map((step) => (
          <div key={step.n} className="card step-card">
            <span className="step-n mono">{step.n}</span>
            <h3 className="mt-3" style={{ fontSize: '1.12rem' }}>
              {step.title}
            </h3>
            <p className="mt-2" style={{ fontSize: '0.93rem', color: 'var(--color-ink-soft)' }}>
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
