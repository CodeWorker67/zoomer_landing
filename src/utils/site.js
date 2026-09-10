export function getSiteOrigin() {
  if (typeof window === 'undefined') return '';
  return window.location.origin;
}

export function getSiteHost() {
  if (typeof window === 'undefined') return '';
  return window.location.host;
}

/** Подставляет домен, с которого открыт сайт (для мультидоменного деплоя). */
export function localizeSiteLink(url) {
  if (!url || typeof window === 'undefined') return url || '';
  try {
    const parsed = new URL(url);
    parsed.protocol = window.location.protocol;
    parsed.host = window.location.host;
    return parsed.toString();
  } catch {
    return url;
  }
}

export function buildPartnerSiteLink(partnerCode) {
  if (!partnerCode || typeof window === 'undefined') return '';
  const code = String(partnerCode).startsWith('partner_')
    ? String(partnerCode)
    : `partner_${partnerCode}`;
  return `${getSiteOrigin()}/?start=${code}`;
}

export function resolvePartnerSiteLink(apiLink, partnerCode) {
  if (apiLink) return localizeSiteLink(apiLink);
  return buildPartnerSiteLink(partnerCode);
}
