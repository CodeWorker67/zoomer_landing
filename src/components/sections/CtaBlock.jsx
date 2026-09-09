import { Link } from 'react-router-dom';
import Button from '@components/ui/Button';
import { ROUTES } from '@utils/constants';

export default function CtaBlock({ title, subtitle, buttonLabel = 'Получить ключ', buttonTo = ROUTES.LOGIN }) {
  return (
    <section className="py-16">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{title}</h2>
        {subtitle && <p className="text-gray-400 mb-8">{subtitle}</p>}
        <Link to={buttonTo}><Button className="px-10">{buttonLabel}</Button></Link>
      </div>
    </section>
  );
}
