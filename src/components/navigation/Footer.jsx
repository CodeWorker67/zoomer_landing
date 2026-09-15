import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { BRAND, ROUTES } from '@utils/constants';
import { buildTelegramBotUrl } from '@utils/botLink';

const footerLinks = [
  { path: ROUTES.HAPP, label: 'Подписка' },
  { path: ROUTES.HAPP_FREE, label: 'Бесплатно' },
  { path: ROUTES.HAPP_VPN, label: 'VPN' },
  { path: ROUTES.HAPP_DOWNLOAD, label: 'Скачать' },
  { path: ROUTES.HAPP_TELEGRAM, label: 'Telegram' },
  { path: ROUTES.INCY_VPN, label: 'INCY' },
];

export default function Footer() {
  return (
    <footer className="bg-zoomer-card border-t border-zoomer-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-zoomer-neon-dim to-zoomer-neon flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white">{BRAND}</span>
            </div>
            <p className="text-gray-500 text-sm">VLESS VPN. Без логов. Оплата через СБП.</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Страницы</h3>
            <ul className="space-y-2">
              {footerLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-gray-400 hover:text-white text-sm">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Документы</h3>
            <ul className="space-y-2">
              <li><Link to={ROUTES.PRIVACY} className="text-gray-400 hover:text-white text-sm">Политика конфиденциальности</Link></li>
              <li><Link to={ROUTES.TERMS} className="text-gray-400 hover:text-white text-sm">Условия использования</Link></li>
            </ul>
            <a href={buildTelegramBotUrl()} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-zoomer-neon text-sm hover:underline">
              Telegram бот
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zoomer-border text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} {BRAND}
        </div>
      </div>
    </footer>
  );
}
