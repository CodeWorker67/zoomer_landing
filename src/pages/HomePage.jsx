import { RouteMeta } from '@components/seo/PageMeta';
import HomeRaffleSection from '@components/sections/HomeRaffleSection';
import HeroSection from '@components/sections/HeroSection';
import CapsuleSection from '@components/sections/CapsuleSection';
import DownloadSection from '@components/sections/DownloadSection';
import StepsSection from '@components/sections/StepsSection';
import KeySection from '@components/sections/KeySection';
import FeaturesSection from '@components/sections/FeaturesSection';
import HappSection from '@components/sections/HappSection';
import PricingSection from '@components/sections/PricingSection';
import FaqSection from '@components/sections/FaqSection';
import CtaSection from '@components/sections/CtaSection';
import { HOME_FAQ, ROUTES } from '@utils/constants';

export default function HomePage() {
  return (
    <div className="shell" style={{ paddingTop: '1.4rem', paddingBottom: '3.5rem' }}>
      <RouteMeta path={ROUTES.HOME} />
      <HomeRaffleSection />
      <HeroSection />
      <CapsuleSection />
      <div id="connection" className="scroll-mt-24">
        <DownloadSection />
        <StepsSection />
      </div>
      <KeySection />
      <FeaturesSection />
      <HappSection />
      <PricingSection />
      <FaqSection items={HOME_FAQ} />
      <CtaSection />
    </div>
  );
}
