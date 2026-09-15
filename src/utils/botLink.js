import { TELEGRAM } from '@utils/constants';
import { getBotStartParam } from '@utils/partner';

/** Ссылка на Telegram-бота с ?start= (метка, partner_* или домен). */
export function buildTelegramBotUrl(baseUrl = TELEGRAM.BOT_URL) {
  const start = getBotStartParam();
  if (!start || !baseUrl) return baseUrl || TELEGRAM.BOT_URL;
  try {
    const url = new URL(baseUrl);
    url.searchParams.set('start', start);
    return url.toString();
  } catch {
    const sep = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${sep}start=${encodeURIComponent(start)}`;
  }
}
