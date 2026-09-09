import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ROUTES, BRAND, BRAND_META } from '@utils/constants';

export default function TermsPage() {
  return (
    <>
      <Helmet><title>Пользовательское соглашение — {BRAND_META}</title></Helmet>
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-6">Пользовательское соглашение</h1>
          <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
            <p>
              Настоящее Соглашение определяет условия использования сервиса {BRAND}
              (Telegram-бот @zoomerskyvpn_bot и сайт landing) между Администрацией и Пользователем.
            </p>
            <h2 className="text-white font-semibold text-lg">1. Предмет соглашения</h2>
            <p>
              Администрация предоставляет доступ к VPN-сервису на условиях, изложенных в настоящем Соглашении.
              Используя Сервис, вы подтверждаете согласие с его условиями.
            </p>
            <h2 className="text-white font-semibold text-lg">2. Правила использования</h2>
            <p>
              Пользователь обязуется использовать Сервис в соответствии с законодательством и не использовать
              его для распространения вредоносного ПО, спама или иной незаконной деятельности.
            </p>
            <h2 className="text-white font-semibold text-lg">3. Ответственность</h2>
            <p>
              Администрация не несёт ответственности за убытки, вызванные использованием Сервиса,
              за исключением случаев, предусмотренных законом.
            </p>
          </div>
          <div className="mt-8 flex gap-4 text-sm">
            <Link to={ROUTES.PRIVACY} className="text-zoomer-neon hover:underline">Политика конфиденциальности</Link>
            <Link to={ROUTES.REFUND} className="text-zoomer-neon hover:underline">Политика возврата</Link>
          </div>
        </div>
      </section>
    </>
  );
}
