export const ROUTES = {
  HOME: '/',
  HAPP: '/happ',
  HAPP_FREE: '/happ/free',
  HAPP_TELEGRAM: '/happ/telegram',
  HAPP_VPN: '/happ/vpn',
  HAPP_DOWNLOAD: '/happ/download',
  INCY_VPN: '/incy-vpn',
  LOGIN: '/auth/login',
  ONBOARDING: '/onboarding',
  PROFILE: '/profile',
  DASHBOARD: '/dashboard',
  SETTINGS: '/dashboard/settings',
  EARNINGS: '/dashboard/earnings',
  CHECKOUT: '/checkout',
  SUCCESS: '/success',
  PRIVACY: '/privacy',
  TERMS: '/terms',
};

export const TELEGRAM = {
  BOT_URL: import.meta.env.VITE_TELEGRAM_BOT_URL || 'https://t.me/zoomerskyvpn_bot',
  SUPPORT_URL: 'https://t.me/suppzoomvpn',
};

export const SUPPORT_URL = import.meta.env.VITE_SUPPORT_URL || TELEGRAM.SUPPORT_URL;

export const INCY_DOWNLOADS = {
  ios: 'https://apps.apple.com/us/app/incy/id6756943388',
  android: 'https://play.google.com/store/apps/details?id=llc.itdev.incy&hl=ru',
  desktop: 'https://github.com/INCY-DEV/incy-platforms',
};

/** @deprecated используйте INCY_DOWNLOADS или APP_DOWNLOAD */
export const DOWNLOADS = {
  ios: 'https://apps.apple.com/app/happ-proxy-utility/id6504287215',
  android: 'https://play.google.com/store/apps/details?id=com.happproxy',
  desktop: 'https://www.happ.su/main',
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/landing';
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export const BRAND = 'Зумерский VPN';
export const BRAND_META = 'Зумерский ВПН';

/** Тарифы Zoomer (из dct_price бота), от большего срока к меньшему */
export const TARIFFS = [
  { id: '730', label: '2 года', price: 3699, days: 730, devices: 5, traffic: 'Безлимит' },
  { id: '365', label: '365 дней', price: 2399, days: 365, devices: 5, traffic: 'Безлимит' },
  { id: '180', label: '180 дней', price: 1349, days: 180, devices: 5, traffic: 'Безлимит' },
  { id: '90', label: '90 дней', price: 749, days: 90, devices: 5, traffic: 'Безлимит', popular: true },
  { id: '30', label: '30 дней', price: 299, days: 30, devices: 5, traffic: 'Безлимит' },
  { id: '7', label: '7 дней', price: 99, days: 7, devices: 5, traffic: 'Безлимит' },
];

/** Все тарифы для страниц «Подписка» и главной */
export const HOME_TARIFFS = TARIFFS;

export const PAYMENT_METHODS = [
  { id: 'sbp', label: 'СБП' },
  { id: 'card', label: 'Карта РФ' },
];

/** Пункты меню как на kavkazvpn.ru (без переключателя языка) */
export const NAV_LINKS = [
  { path: ROUTES.HAPP, label: 'Подписка' },
  { path: ROUTES.HAPP_FREE, label: 'Бесплатно' },
  { path: ROUTES.HAPP_DOWNLOAD, label: 'Скачать Happ' },
  { path: ROUTES.INCY_VPN, label: 'INCY' },
];

export const DOWNLOAD_LINKS = [
  { platform: 'iPhone (iOS)', label: 'App Store', href: 'https://apps.apple.com/app/happ-proxy-utility/id6504287215' },
  { platform: 'Android', label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.happproxy' },
  { platform: 'Android (APK)', label: 'GitHub', href: 'https://github.com/Happ-proxy/happ-android/releases' },
  { platform: 'macOS', label: 'App Store', href: 'https://apps.apple.com/app/happ-proxy-utility/id6504287215' },
  { platform: 'Windows', label: 'GitHub', href: 'https://github.com/Happ-proxy/happ-desktop/releases' },
];

/** Ссылки на приложения по платформе (из бота) */
export const APP_DOWNLOAD = {
  ios: {
    happ: 'https://apps.apple.com/ru/app/happ-proxy-utility-plus/id6746188973',
    incy: 'https://apps.apple.com/ru/app/incy/id6756943388',
    label: 'iPhone',
  },
  android: {
    happ: 'https://play.google.com/store/apps/details?id=com.happproxy',
    incy: 'https://play.google.com/store/apps/details?id=llc.itdev.incy',
    label: 'Android',
  },
  windows: {
    happ: 'https://github.com/Happ-proxy/happ-desktop/releases/latest/download/setup-Happ.x64.exe',
    incy: 'https://github.com/INCY-DEV/incy-platforms/releases/latest/download/incy-windows-setup.exe',
    label: 'Windows',
  },
  macos: {
    happ: 'https://apps.apple.com/ru/app/happ-proxy-utility-plus/id6746188973',
    incy: 'https://github.com/INCY-DEV/incy-platforms/releases/latest/download/incy-macos-arm64.dmg',
    label: 'macOS',
  },
};

export function happImportUrl(subUrl) {
  if (!subUrl) return null;
  return `happ://add/${subUrl}`;
}

export function incyImportUrl(subUrl) {
  if (!subUrl) return null;
  return `incy://import/${subUrl}`;
}

export const SERVERS = [
  'Германия', 'Нидерланды', 'Польша', 'США',
];

export const HOME_FAQ = [
  {
    q: 'Что такое INCY?',
    a: 'INCY — бесплатное приложение-клиент на движке Xray-core. Само по себе оно не даёт доступ к серверам: вы добавляете ключ-подписку от поставщика, и INCY подключается через него. Один ключ работает сразу на нескольких устройствах.',
  },
  {
    q: 'Нужен ли для INCY ключ?',
    a: 'Да. INCY — это клиент: чтобы подключиться, нужен ключ-подписка (ссылка вида sub.…/…), QR-код или файл конфигурации. Рабочий ключ можно получить бесплатно на 1 день — по кнопке на странице или в личном кабинете.',
  },
  {
    q: 'Чем INCY отличается от Happ?',
    a: 'Это похожие клиенты на одном движке Xray-core, работают с одними и теми же ключами-подписками. Различия — в интерфейсе и отдельных функциях; INCY есть в российском App Store, а Happ для iPhone и iPad в нём сейчас нет.',
  },
  {
    q: 'Как получить ключ для INCY?',
    a: 'Зарегистрируйтесь на Зумерский VPN по email или Google, либо перейдите в Telegram-бот. Ключ появится в личном кабинете сразу после регистрации — его можно добавить в INCY или Happ.',
  },
  {
    q: 'Чем подписка отличается от разового ключа?',
    a: 'Ключ — способ подключения (ссылка или QR-код), подписка — оплаченный период доступа. Когда подписка заканчивается, ключ в приложении остаётся, но соединение перестаёт работать — продлите подписку, и тот же ключ снова откроет интернет.',
  },
  {
    q: 'Подойдёт ли ключ от Happ для INCY?',
    a: 'Да. Happ и INCY работают с одними и теми же ключами-подписками (VLESS, Reality и др.). Тот же ключ можно добавить в INCY ссылкой или по QR-коду.',
  },
];
