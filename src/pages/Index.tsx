import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { PortfolioHighlights } from '@/components/home/PortfolioHighlights';
import { ProcessSection } from '@/components/home/ProcessSection';
import { TrustSection } from '@/components/home/TrustSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesPreview />
      <PortfolioHighlights />
      <ProcessSection />
      <TrustSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
