import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/uselayouts/Hero';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { Section } from '@/components/layouts/Section';
import { CTA } from '@/components/layouts/CTA';
import { ProcessSection } from '@/components/home/ProcessSection';
import { TrustSection } from '@/components/home/TrustSection';
import { ExpandableGallery } from '@/components/uselayouts/ExpandableGallery';
import { FeatureCarousel } from '@/components/uselayouts/FeatureCarousel';
import { PricingCard } from '@/components/uselayouts/PricingCard';
import { EmptyTestimonial } from '@/components/uselayouts/EmptyTestimonial';
import { MagnifiedBento } from '@/components/uselayouts/MagnifiedBento';

const Index = () => {
  return (
    <Layout>
      <Hero />

      {/* Feature Carousel - Services Showcase */}
      <FeatureCarousel />

      {/* Expandable Gallery - Interactive Portfolio Preview */}
      <Section tone="muted">
        <ExpandableGallery />
      </Section>

      {/* Magnified Bento Grid - Visual Portfolio */}
      <Section>
        <div className="container-studio">
          <div className="text-center mb-12">
            <p className="text-label text-primary mb-4">Our Work</p>
            <h2 className="heading-section">Featured Portfolio</h2>
          </div>
          <MagnifiedBento />
        </div>
      </Section>

      {/* Process Section */}
      <ProcessSection />

      {/* Pricing Cards */}
      <PricingCard />

      {/* Testimonials */}
      <EmptyTestimonial />

      {/* Trust Section */}
      <TrustSection />

      {/* Final CTA */}
      <Section tone="inverse">
        <div className="container-narrow">
          <CTA
            eyebrow="Ready to Begin?"
            title="Let's Capture Your Story"
            description={
              <>
                Whether it's your wedding day, a corporate event, or a personal portrait
                session, we're here to create images that you'll treasure for years to come.
              </>
            }
            primaryHref="/contact"
            primaryLabel="Enquire About Your Shoot"
            secondaryHref="/portfolio"
            secondaryLabel="Explore Our Portfolio"
          />
        </div>
      </Section>
    </Layout>
  );
};

export default Index;
