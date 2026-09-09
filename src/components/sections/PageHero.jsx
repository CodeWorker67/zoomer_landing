import { Link } from 'react-router-dom';
import Button from '@components/ui/Button';
import { ROUTES } from '@utils/constants';

export default function PageHero({ title, subtitle, primaryLabel = 'Получить ключ', primaryTo = ROUTES.LOGIN, secondaryLabel, secondaryTo }) {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{title}</h1>
        {subtitle && <p className="text-gray-400 text-lg mb-8 leading-relaxed">{subtitle}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={primaryTo}><Button>{primaryLabel}</Button></Link>
          {secondaryLabel && secondaryTo && (
            <Link to={secondaryTo}><Button variant="secondary">{secondaryLabel}</Button></Link>
          )}
        </div>
      </div>
    </section>
  );
}
