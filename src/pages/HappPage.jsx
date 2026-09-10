import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import PageHero from '@components/sections/PageHero';
import PricingCards from '@components/sections/PricingCards';
import FaqSection from '@components/sections/FaqSection';
import CtaBlock from '@components/sections/CtaBlock';
import Button from '@components/ui/Button';
import { BRAND, BRAND_META, HOME_TARIFFS, ROUTES } from '@utils/constants';

const FAQ = [
  { q: 'Что такое подписка Happ?', a: 'Подписка Happ — оплаченный период доступа к VPN с готовым VLESS-ключом для импорта в Happ по QR-коду или ссылке.' },
  { q: 'Как купить подписку Happ?', a: 'Зарегистрируйтесь на Зумерский VPN по email или Google, выберите тариф и оплатите через СБП — ключ появится в личном кабинете сразу.' },
  { q: 'Сколько стоит подписка Happ?', a: 'От 99 ₽ за 7 дней. На 30 дней — 299 ₽, на 90 — 749 ₽, на 180 — 1349 ₽. Пробный доступ — без карты.' },
  { q: 'Чем подписка отличается от разового ключа?', a: 'Ключ — формат подключения (vless://), подписка — оплаченный период. Продление возвращает доступ без замены ключа.' },
  { q: 'Как продлить подписку Happ?', a: 'В личном кабинете выберите тариф и оплатите новый период. Ключ остаётся прежним.' },
  { q: 'Где купить хапп ключ?', a: 'На Зумерский VPN — зарегистрируйтесь и оформите подписку, либо перейдите в Telegram-бот.' },
  { q: 'Как получить бесплатный ключ для хапп?', a: 'Активируйте пробный доступ — карта не нужна. Подробнее на странице бесплатной подписки.' },
  { q: 'Нужно что-то настраивать в Happ вручную?', a: 'Нет. Сканируете QR-код или вставляете ссылку — подключение готово.' },
];

export default function HappPage() {
  return (
    <>
      <Helmet><title>Подписка Happ — {BRAND_META}</title></Helmet>
      <PageHero
        title="Подписка Happ — ключи для Happ VPN"
        subtitle="Оформите подписку Happ с моментальной активацией. Готовый ключ для приложения Happ по QR-коду или ссылке — настройка меньше минуты. От 99 ₽, пробный доступ без карты."
        primaryLabel="Получить подписку"
        secondaryLabel="Попробовать бесплатно"
        secondaryTo={ROUTES.HAPP_FREE}
      />

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Купить подписку Happ за 1 минуту</h2>
          <ol className="space-y-4">
            {['Регистрация на Зумерский VPN', 'Выбор тарифа подписки или активация пробного периода', 'Открыть Happ', 'Импортировать QR-код или ссылку', 'Подключение'].map((s, i) => (
              <li key={s} className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-zoomer-neon/20 text-zoomer-neon flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                <span className="text-gray-300 pt-1">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">Что входит в подписку Happ</h2>
          <ul className="space-y-3 text-gray-400">
            {['Готовая подписка Happ с первой минуты', 'QR-код и ссылка для импорта', 'Серверы в Европе и США', 'Доступ сразу после регистрации'].map((x) => (
              <li key={x}>• {x}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Пробная подписка Happ бесплатно</h2>
          <p className="text-gray-400 mb-6">Хотите попробовать перед оплатой? Активируйте пробную подписку — карта не нужна.</p>
          <Link to={ROUTES.HAPP_FREE}><Button variant="secondary">Получить бесплатно →</Button></Link>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-4">Подписка vs разовый ключ</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Ключ — технический формат подключения (строка <code className="text-zoomer-neon">vless://...</code> или QR-код),
            который добавляется в Happ. Подписка — оплаченный период доступа к серверам.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Когда подписка Happ заканчивается, ключ остаётся в приложении, но соединение перестаёт работать.
            Продлите подписку — и тот же ключ снова откроет интернет. В Зумерский VPN вы покупаете подписку Happ,
            а ключ выдаётся в личном кабинете один раз.
          </p>
        </div>
      </section>

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">Тарифы подписки Happ</h2>
          <div className="space-y-4 text-gray-400">
            <p><strong className="text-white">7 дней</strong> — 99 ₽. Краткий период для знакомства с сервисом.</p>
            <p><strong className="text-white">30 / 90 / 180 дней</strong> — основные тарифы для одного и нескольких устройств. Дешевле при длинных сроках.</p>
            <p><strong className="text-white">365 дней и 2 года</strong> — максимальный срок для активного использования.</p>
            <p className="text-gray-500 text-sm">Все тарифы — без автосписаний. Продление только вручную.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-4">Чем хапп ключ отличается от обычного VPN</h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Happ работает по протоколу VLESS с Reality — высокая скорость и хорошая совместимость с мобильными сетями
            и публичным Wi-Fi.
          </p>
          <p className="text-gray-400 leading-relaxed">
            Для пользователя Happ выглядит как обычный VPN-клиент: кнопка включения, список профилей, выбор страны.
          </p>
        </div>
      </section>

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-6">Когда подходит Happ VPN</h2>
          <ul className="space-y-4 text-gray-400">
            <li><strong className="text-white">Стабильное соединение</strong> — соцсети, мессенджеры, стриминг без обрывов.</li>
            <li><strong className="text-white">Несколько устройств</strong> — до 5 устройств на одной подписке.</li>
            <li><strong className="text-white">Простая настройка</strong> — импорт по QR-коду или ссылке за минуту.</li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Тарифы</h2>
          <PricingCards tariffs={HOME_TARIFFS} />
        </div>
      </section>

      <FaqSection items={FAQ} />
      <CtaBlock title="Купить подписку Happ за 1 минуту" subtitle="От 99 ₽, пробный доступ без карты." buttonLabel="Получить подписку" />

      <div className="pb-12 text-center text-sm text-gray-500 flex flex-wrap justify-center gap-4">
        <Link to={ROUTES.HAPP_FREE} className="hover:text-zoomer-neon">Пробная подписка Happ</Link>
        <Link to={ROUTES.HAPP_TELEGRAM} className="hover:text-zoomer-neon">Подписка через Telegram</Link>
        <Link to={ROUTES.HAPP_VPN} className="hover:text-zoomer-neon">VPN для Happ</Link>
        <Link to={ROUTES.HAPP_DOWNLOAD} className="hover:text-zoomer-neon">Скачать Happ</Link>
      </div>
    </>
  );
}
