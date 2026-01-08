import { Layout } from '@/components/layout/Layout';
import { motion } from "motion/react";
import { Section } from '@/components/layouts/Section';
import { PageHeader } from '@/components/layouts/PageHeader';
import { CTA } from '@/components/layouts/CTA';
import { FluidExpandingGrid } from '@/components/uselayouts/FluidExpandingGrid';
import { PricingCard } from '@/components/uselayouts/PricingCard';
import { DiscoverButton } from '@/components/uselayouts/DiscoverButton';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Heart, Users, User, Building2 } from 'lucide-react';

import weddingImage from '@/assets/hero-wedding.jpg';
import preweddingImage from '@/assets/prewedding-sample.jpg';
import eventImage from '@/assets/event-sample.jpg';
import portraitImage from '@/assets/portrait-sample.jpg';
import commercialImage from '@/assets/commercial-sample.jpg';

const services = [
  {
    id: 'weddings',
    title: 'Wedding Photography',
    subtitle: 'Your Day, Beautifully Documented',
    description: 'We approach every wedding with the understanding that this is one of the most important days of your life. Our team works discreetly yet comprehensively, ensuring no moment goes uncaptured—from the quiet preparations to the joyful celebrations.',
    features: [
      'Full-day coverage with multiple photographers',
      'Pre-ceremony and preparation documentation',
      'Ceremony and reception coverage',
      'Candid moments and formal portraits',
      'High-resolution edited images',
      'Online gallery for sharing',
    ],
    image: weddingImage,
    icon: Heart,
    color: '#F472B6',
  },
  {
    id: 'pre-weddings',
    title: 'Pre-Wedding Sessions',
    subtitle: 'Celebrate Your Journey Together',
    description: 'Before the big day, take time to create beautiful images that tell the story of your relationship. We work with you to find the perfect locations and capture the natural connection between you and your partner.',
    features: [
      'Location scouting and planning',
      '2-3 hour session duration',
      'Multiple outfit changes',
      'Styled or natural settings',
      'Edited high-resolution images',
      'Print-ready files',
    ],
    image: preweddingImage,
    icon: Camera,
    color: '#A78BFA',
  },
  {
    id: 'events',
    title: 'Event Photography',
    subtitle: 'Professional Coverage for Every Occasion',
    description: 'From corporate conferences to gala dinners, private parties to product launches, we provide reliable, professional coverage that captures the atmosphere and key moments of your event.',
    features: [
      'Corporate events and conferences',
      'Gala dinners and award ceremonies',
      'Private celebrations',
      'Product launches',
      'Fast turnaround available',
      'On-site printing options',
    ],
    image: eventImage,
    icon: Users,
    color: '#60A5FA',
  },
  {
    id: 'portraits',
    title: 'Portrait Photography',
    subtitle: 'Professional Images That Make an Impression',
    description: 'Whether you need corporate headshots, personal branding images, or family portraits, our studio and on-location sessions deliver polished, professional results that represent you at your best.',
    features: [
      'Corporate and executive headshots',
      'Personal branding sessions',
      'Family and group portraits',
      'Studio or on-location options',
      'Professional retouching',
      'Multiple format delivery',
    ],
    image: portraitImage,
    icon: User,
    color: '#34D399',
  },
  {
    id: 'commercial',
    title: 'Commercial Photography',
    subtitle: 'Elevate Your Brand Image',
    description: 'High-quality product photography and brand shoots that help your business stand out. We work closely with brands to understand their visual identity and deliver images that align with their marketing goals.',
    features: [
      'Product photography',
      'Brand lifestyle shoots',
      'Catalog and e-commerce images',
      'Food and beverage photography',
      'Architectural and interior',
      'Social media content',
    ],
    image: commercialImage,
    icon: Building2,
    color: '#FBBF24',
  },
];

const Services = () => {
  return (
    <Layout>
      <Section tone="muted" size="sm">
        <PageHeader
          eyebrow="Our Services"
          title={
            <>
              Photography<br />
              <span className="italic">Services</span>
            </>
          }
          description={
            <>
              From weddings to commercial projects, our studio offers comprehensive
              photography services tailored to your needs. Each service is delivered
              with the same commitment to quality and professionalism.
            </>
          }
        />
      </Section>

      {/* Fluid Expanding Grid - Modern Service Showcase */}
      <FluidExpandingGrid />

      {/* Detailed Services List */}
      <section className="bg-background">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Section
              key={service.id}
              tone={index % 2 === 1 ? "muted" : "default"}
              className="border-t border-border"
              containerClassName=""
            >
              <motion.div
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="image-hover aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {/* Icon Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-6"
                    style={{
                      borderColor: `${service.color}40`,
                      backgroundColor: `${service.color}10`,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: service.color }}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: service.color }}
                    >
                      {service.subtitle}
                    </span>
                  </motion.div>

                  <h2 className="heading-section text-foreground mb-6">
                    {service.title}
                  </h2>
                  <p className="text-body mb-8">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: service.color }}
                        />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <DiscoverButton
                    href="/contact"
                    variant="primary"
                    size="md"
                  >
                    Enquire About {service.title.split(' ')[0]}
                  </DiscoverButton>
                </div>
              </motion.div>
            </Section>
          );
        })}
      </section>

      {/* Pricing Section */}
      <PricingCard />

      {/* CTA */}
      <Section tone="inverse">
        <div className="container-narrow">
          <CTA
            title="Not Sure What You Need?"
            description={
              <>
                Get in touch and we'll help you determine the best approach for your
                project. We're happy to discuss your requirements without obligation.
              </>
            }
            primaryHref="/contact"
            primaryLabel="Get in Touch"
            secondaryHref="/portfolio"
            secondaryLabel="See Recent Work"
          />
        </div>
      </Section>
    </Layout>
  );
};

export default Services;
