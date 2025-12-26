import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import weddingImage from '@/assets/hero-wedding.jpg';
import weddingDetail from '@/assets/wedding-detail.jpg';
import weddingCeremony from '@/assets/wedding-ceremony.jpg';
import eventImage from '@/assets/event-sample.jpg';
import portraitImage from '@/assets/portrait-sample.jpg';
import portraitCorporate from '@/assets/portrait-corporate.jpg';
import commercialImage from '@/assets/commercial-sample.jpg';
import preweddingImage from '@/assets/prewedding-sample.jpg';

const categories = ['All', 'Weddings', 'Pre-Weddings', 'Events', 'Portraits', 'Commercial'];

const portfolioItems = [
  { src: weddingImage, category: 'Weddings', title: 'Garden Wedding', location: 'Botanical Gardens' },
  { src: weddingCeremony, category: 'Weddings', title: 'Ceremony Moment', location: 'Outdoor Venue' },
  { src: weddingDetail, category: 'Weddings', title: 'Bridal Details', location: 'Studio' },
  { src: preweddingImage, category: 'Pre-Weddings', title: 'Sunset Romance', location: 'Coastal Cliffs' },
  { src: eventImage, category: 'Events', title: 'Corporate Gala', location: 'Grand Ballroom' },
  { src: portraitImage, category: 'Portraits', title: 'Executive Portrait', location: 'Corporate Office' },
  { src: portraitCorporate, category: 'Portraits', title: 'Business Headshot', location: 'Studio' },
  { src: commercialImage, category: 'Commercial', title: 'Product Showcase', location: 'Studio' },
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <Layout>
      {/* Page Header */}
      <section className="section-padding-sm bg-card">
        <div className="container-studio">
          <div className="max-w-3xl">
            <p className="text-label mb-4">Our Work</p>
            <h1 className="heading-display text-foreground mb-6">
              Portfolio
            </h1>
            <p className="text-body text-lg">
              A curated selection of our work across weddings, events, portraits, 
              and commercial projects. Each image represents our commitment to 
              quality and consistency.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-background border-y border-border">
        <div className="container-studio">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 text-sm transition-colors duration-300",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-background">
        <div className="container-studio">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className="image-hover aspect-[4/5] mb-4 relative overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-500 flex items-end">
                    <div className="p-6 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-background/70 text-sm mb-1">{item.category}</p>
                      <h3 className="text-background font-heading text-xl">{item.title}</h3>
                      <p className="text-background/70 text-sm">{item.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card">
        <div className="container-narrow text-center">
          <h2 className="heading-section text-foreground mb-6">
            Like What You See?
          </h2>
          <p className="text-body max-w-xl mx-auto mb-10">
            Let's discuss your project and create something beautiful together.
          </p>
          <Button variant="studio" size="xl" asChild>
            <Link to="/contact">Start Your Enquiry</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
