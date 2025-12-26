import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import weddingImage from '@/assets/hero-wedding.jpg';
import weddingDetail from '@/assets/wedding-detail.jpg';
import weddingCeremony from '@/assets/wedding-ceremony.jpg';
import eventImage from '@/assets/event-sample.jpg';
import portraitImage from '@/assets/portrait-sample.jpg';
import portraitCorporate from '@/assets/portrait-corporate.jpg';

const portfolioImages = [
  { src: weddingImage, alt: 'Bride in garden setting', category: 'Weddings' },
  { src: weddingCeremony, alt: 'Wedding ceremony moment', category: 'Weddings' },
  { src: eventImage, alt: 'Corporate gala dinner', category: 'Events' },
  { src: portraitImage, alt: 'Professional portrait', category: 'Portraits' },
  { src: weddingDetail, alt: 'Bridal bouquet details', category: 'Weddings' },
  { src: portraitCorporate, alt: 'Corporate headshot', category: 'Portraits' },
];

export function PortfolioHighlights() {
  return (
    <section className="section-padding bg-card">
      <div className="container-studio">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="text-label mb-4">Our Work</p>
            <h2 className="heading-section text-foreground">
              Selected Portfolio
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-primary hover:text-foreground transition-colors font-medium"
          >
            View Full Portfolio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {portfolioImages.map((image, index) => (
            <Link
              key={index}
              to="/portfolio"
              className={`group image-hover relative ${
                index === 0 ? 'col-span-2 row-span-2 aspect-square md:aspect-auto' : 'aspect-square'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-end p-4 md:p-6">
                <span className="text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                  {image.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
