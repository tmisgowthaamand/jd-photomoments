import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="section-padding-sm bg-card">
        <div className="container-studio">
          <div className="max-w-3xl">
            <p className="text-label mb-4">Our Services</p>
            <h1 className="heading-display text-foreground mb-6">
              Photography<br />
              <span className="italic">Services</span>
            </h1>
            <p className="text-body text-lg">
              From weddings to commercial projects, our studio offers comprehensive 
              photography services tailored to your needs. Each service is delivered 
              with the same commitment to quality and professionalism.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-background">
        {services.map((service, index) => (
          <div
            key={service.id}
            id={service.id}
            className={`section-padding border-t border-border ${
              index % 2 === 1 ? 'bg-card' : 'bg-background'
            }`}
          >
            <div className="container-studio">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="image-hover aspect-[4/3]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="text-label mb-4">{service.subtitle}</p>
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
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors font-medium"
                  >
                    Enquire About {service.title.split(' ')[0]} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-narrow text-center">
          <h2 className="heading-section text-background mb-6">
            Not Sure What You Need?
          </h2>
          <p className="text-lg text-background/70 max-w-xl mx-auto mb-10">
            Get in touch and we'll help you determine the best approach for your 
            project. We're happy to discuss your requirements without obligation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 text-background hover:text-background/80 transition-colors"
          >
            <span className="text-label text-background/80">Get in Touch</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
