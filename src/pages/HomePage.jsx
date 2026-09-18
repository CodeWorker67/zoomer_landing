import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '@components/ui/Button';
import PricingCards from '@components/sections/PricingCards';
import FaqSection from '@components/sections/FaqSection';
import CtaBlock from '@components/sections/CtaBlock';
import HomeRaffleSection from '@components/sections/HomeRaffleSection';
import { BRAND, BRAND_META, HOME_FAQ, HOME_TARIFFS, ROUTES } from '@utils/constants';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>{BRAND_META} — VPN ключ VLESS</title>
        <meta name="description" content={`Готовый VLESS ключ после регистрации. Подключение за 1 минуту. Тарифы ${BRAND_META}.`} />
      </Helmet>

      <HomeRaffleSection />

      <section className="py-16 md:py-24 relative border-t border-zoomer-border">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            VPN ключ для <span className="text-gradient">Happ</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Готовый VLESS ключ сразу после регистрации. Подключение за 1 минуту. Пробный доступ без карты.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link to={ROUTES.LOGIN}><Button>Получить ключ</Button></Link>
            <a href="#pricing"><Button variant="secondary">Тарифы</Button></a>
          </div>
          <p className="text-gray-500 text-sm">Пробный доступ — без привязки карты</p>
        </div>
      </section>

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">VLESS ключ для Happ</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            После регистрации вы получаете готовый ключ и подключаетесь в Happ через QR-код или ссылку.
            Если вы ищете хапп ключ или хапп впн ключ, он уже доступен в личном кабинете.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to={ROUTES.HAPP} className="text-zoomer-neon hover:underline">Подписка Happ — подробнее</Link>
            <Link to={ROUTES.HAPP_VPN} className="text-zoomer-neon hover:underline">VPN для Happ</Link>
            <Link to={ROUTES.HAPP_DOWNLOAD} className="text-zoomer-neon hover:underline">Скачать Happ VPN</Link>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 bg-zoomer-card/20 border-t border-zoomer-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">Цены на VPN ключ</h2>
          <p className="text-gray-400 text-center mb-10">Оплата через СБП. Без автосписания.</p>
          <PricingCards tariffs={HOME_TARIFFS} />
        </div>
      </section>

      <FaqSection items={HOME_FAQ} />

      <CtaBlock
        title="Получите ключ за 1 минуту"
        subtitle="Пробный доступ без карты. Подключение через Happ по QR-коду или ссылке."
        buttonLabel="Получить ключ"
      />
    </>
  );
}
