import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Section } from '@/components/layouts/Section';
import { PageHeader } from '@/components/layouts/PageHeader';
import { CTA } from '@/components/layouts/CTA';
import { DynamicToolbar, FilterPills } from '@/components/uselayouts/DynamicToolbar';
import { AnimatedCollection } from '@/components/uselayouts/AnimatedCollection';
import { MagnifiedBento } from '@/components/uselayouts/MagnifiedBento';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

import weddingImage from '@/assets/hero-wedding.jpg';
import weddingDetail from '@/assets/wedding-detail.jpg';
import weddingCeremony from '@/assets/wedding-ceremony.jpg';
import eventImage from '@/assets/event-sample.jpg';
import portraitImage from '@/assets/portrait-sample.jpg';
import portraitCorporate from '@/assets/portrait-corporate.jpg';
import commercialImage from '@/assets/commercial-sample.jpg';
import preweddingImage from '@/assets/prewedding-sample.jpg';

const categories = ['All', 'Weddings', 'Pre-Weddings', 'Events', 'Portraits', 'Commercial'] as const;

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

type ViewMode = 'grid' | 'masonry' | 'list';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filteredItems = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <Layout>
      <Section tone="muted" size="sm">
        <PageHeader
          eyebrow="Our Work"
          title="Portfolio"
          description={
            <>
              A curated selection of our work across weddings, events, portraits,
              and commercial projects. Each image represents our commitment to
              quality and consistency.
            </>
          }
        />
      </Section>

      {/* Dynamic Toolbar - Floating Filter */}
      <section className="sticky top-20 z-40 py-4 bg-gradient-to-b from-background via-background to-transparent">
        <div className="container-studio">
          <DynamicToolbar
            categories={categories as unknown as ("All" | "Weddings" | "Pre-Weddings" | "Events" | "Portraits" | "Commercial")[]}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            showViewToggle={true}
          />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-background">
        <div className="container-studio">
          <AnimatePresence mode="wait">
            {viewMode === 'grid' && (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={`${item.title}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="group cursor-pointer"
                  >
                    <div className="image-hover aspect-[4/5] mb-4 relative overflow-hidden rounded-2xl">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-500 flex items-end">
                        <div className="p-6 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <p className="text-background/70 text-sm mb-1">{item.category}</p>
                          <h3 className="text-background font-heading text-xl">{item.title}</h3>
                          <p className="text-background/70 text-sm">{item.location}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {viewMode === 'masonry' && (
              <motion.div
                key="masonry"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <MagnifiedBento
                  items={filteredItems.slice(0, 6).map((item, index) => ({
                    id: `${item.title}-${index}`,
                    title: item.title,
                    subtitle: item.category,
                    image: item.src,
                    span: index === 0 ? 'large' : index === 3 ? 'wide' : index === 2 ? 'tall' : 'normal',
                  }))}
                />
              </motion.div>
            )}

            {viewMode === 'list' && (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={`${item.title}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-6 p-4 rounded-2xl border border-border hover:border-primary/50 hover:bg-muted/30 transition-all cursor-pointer group"
                  >
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-primary mb-1">{item.category}</p>
                      <h3 className="font-heading text-xl text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.location}</p>
                    </div>
                    <div className="hidden md:block text-muted-foreground group-hover:text-primary transition-colors">
                      View →
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground">No items found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Animated Collection - Alternative Gallery View */}
      <Section tone="muted">
        <div className="container-studio">
          <div className="text-center mb-12">
            <p className="text-label text-primary mb-4">Collection View</p>
            <h2 className="heading-section">Interactive Gallery</h2>
          </div>
          <AnimatedCollection />
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="container-narrow">
          <CTA
            title="Like What You See?"
            description="Let's discuss your project and create something beautiful together."
            primaryHref="/contact"
            primaryLabel="Start Your Enquiry"
            secondaryHref="/services"
            secondaryLabel="Explore Services"
          />
        </div>
      </Section>
    </Layout>
  );
};

export default Portfolio;
