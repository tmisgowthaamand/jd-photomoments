import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import weddingImage from '@/assets/hero-wedding.jpg';
import eventImage from '@/assets/event-sample.jpg';
import portraitImage from '@/assets/portrait-sample.jpg';
import commercialImage from '@/assets/commercial-sample.jpg';
import preweddingImage from '@/assets/prewedding-sample.jpg';

const services = [
  {
    title: 'Weddings',
    description: 'Complete wedding day coverage with a team approach for consistent, beautiful documentation.',
    image: weddingImage,
    href: '/services#weddings',
  },
  {
    title: 'Pre-Weddings',
    description: 'Romantic couple sessions in stunning locations before your big day.',
    image: preweddingImage,
    href: '/services#pre-weddings',
  },
  {
    title: 'Events',
    description: 'Corporate gatherings, galas, and celebrations captured with professionalism.',
    image: eventImage,
    href: '/services#events',
  },
  {
    title: 'Portraits',
    description: 'Professional headshots and personal portraits for individuals and teams.',
    image: portraitImage,
    href: '/services#portraits',
  },
  {
    title: 'Commercial',
    description: 'Product photography and brand shoots that elevate your business image.',
    image: commercialImage,
    href: '/services#commercial',
  },
];

export function ServicesPreview() {
  return (
    <section className="section-padding bg-background">
      <div className="container-studio">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="text-label mb-4">What We Do</p>
          <h2 className="heading-section text-foreground mb-6">
            Photography Services
          </h2>
          <p className="text-body">
            From intimate portraits to grand celebrations, our studio delivers 
            consistent quality across every type of shoot. Each project receives 
            our full attention and expertise.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 3).map((service, index) => (
            <Link
              key={service.title}
              to={service.href}
              className="group block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="image-hover aspect-[4/5] mb-5 bg-muted">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-heading text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-body-sm mb-3">{service.description}</p>
              <span className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                Learn more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        {/* Secondary Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {services.slice(3).map((service, index) => (
            <Link
              key={service.title}
              to={service.href}
              className="group flex gap-6 p-6 bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="image-hover w-32 h-32 flex-shrink-0 bg-muted">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-body-sm mb-3">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                  Learn more <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors font-medium"
          >
            <span className="text-label">View All Services</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
