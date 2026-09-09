import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ROUTES, BRAND, BRAND_META } from '@utils/constants';

export default function PrivacyPage() {
  return (
    <>
      <Helmet><title>Политика конфиденциальности — {BRAND_META}</title></Helmet>
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-invert">
          <h1 className="text-3xl font-bold text-white mb-6">Политика конфиденциальности</h1>
          <p className="text-gray-400 mb-6">Дата вступления в силу: 01.01.2025</p>
          <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
            <p>
              Настоящая Политика описывает, какие данные обрабатывает сервис {BRAND}
              (Telegram-бот @zoomerskyvpn_bot, далее — «Сервис») при предоставлении услуг VPN.
            </p>
            <h2 className="text-white font-semibold text-lg">1. Какие данные мы обрабатываем</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Email или Google ID — для идентификации учётной записи на сайте</li>
              <li>Идентификатор Telegram — при использовании бота</li>
              <li>Данные о подписке — тариф, срок, статус оплаты</li>
              <li>Платёжные сведения обрабатываются платёжными провайдерами</li>
            </ul>
            <h2 className="text-white font-semibold text-lg">2. Что мы НЕ собираем</h2>
            <p>
              Сервис не ведёт журналов посещаемых сайтов, истории просмотров, содержимого трафика
              и DNS-запросов внутри VPN-соединения.
            </p>
            <h2 className="text-white font-semibold text-lg">3. Контакты</h2>
            <p>По вопросам обработки данных — через Telegram-бот @zoomerskyvpn_bot</p>
          </div>
          <div className="mt-8 flex gap-4 text-sm">
            <Link to={ROUTES.TERMS} className="text-zoomer-neon hover:underline">Пользовательское соглашение</Link>
            <Link to={ROUTES.REFUND} className="text-zoomer-neon hover:underline">Политика возврата</Link>
          </div>
        </div>
      </section>
    </>
  );
}
