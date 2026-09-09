const PARTNER_STORAGE_KEY = 'landing_partner_ref';

export function parsePartnerFromStart(value) {
  if (!value) return null;
  const raw = String(value).trim();
  const id = raw.startsWith('partner_') ? raw.slice('partner_'.length) : raw;
  if (!/^-?\d+$/.test(id)) return null;
  const num = Number(id);
  if (!Number.isFinite(num) || num === 0) return null;
  return String(num);
}

export function capturePartnerFromUrl() {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const fromStart = parsePartnerFromStart(params.get('start'));
  const fromPartner = parsePartnerFromStart(params.get('partner'));
  const partner = fromStart || fromPartner;
  if (partner) {
    localStorage.setItem(PARTNER_STORAGE_KEY, partner);
  }
  return partner;
}

export function getStoredPartnerRef() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(PARTNER_STORAGE_KEY);
}

export function clearStoredPartnerRef() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PARTNER_STORAGE_KEY);
}

export function partnerPayload() {
  const partner = getStoredPartnerRef();
  return partner ? { partner: `partner_${partner}` } : {};
}
