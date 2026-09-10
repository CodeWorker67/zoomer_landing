import { useEffect, useState } from 'react';
import { Copy, Check, TrendingUp, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { partnerApi } from '@services/api';
import { resolvePartnerSiteLink } from '@utils/site';

export default function ReferralCard() {
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    partnerApi.stats()
      .then(({ data }) => {
        setLink(resolvePartnerSiteLink(data.site_link, data.partner_code));
      })
      .catch(() => setLink(''))
      .finally(() => setLoading(false));
  }, []);

  const copy = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
    toast.success('Ссылка скопирована');
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="card-dark flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 text-zoomer-neon animate-spin" />
      </div>
    );
  }

  if (!link) return null;

  return (
    <div className="card-dark">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-zoomer-neon/10 flex items-center justify-center shrink-0">
          <TrendingUp className="w-5 h-5 text-zoomer-neon" />
        </div>
        <div>
          <h3 className="text-white font-semibold">Приглашайте друзей</h3>
          <p className="text-gray-500 text-sm mt-0.5">Получайте 50% с каждой оплаты</p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-3 bg-zoomer-dark rounded-xl border border-zoomer-border">
        <span className="text-sm text-zoomer-neon font-mono break-all flex-1 min-w-0">{link}</span>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zoomer-neon/40 text-zoomer-neon text-xs font-medium hover:bg-zoomer-neon/10 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Скопировано' : 'Копировать'}
        </button>
      </div>
    </div>
  );
}
