import { Layout } from '@/components/layout/Layout';
import { Section } from '@/components/layouts/Section';
import { PageHeader } from '@/components/layouts/PageHeader';
import { FeatureGrid } from '@/components/layouts/FeatureGrid';
import { CTA } from '@/components/layouts/CTA';
import { VerticalTabs } from '@/components/uselayouts/VerticalTabs';
import { EmptyTestimonial } from '@/components/uselayouts/EmptyTestimonial';
import { DiscoverButton } from '@/components/uselayouts/DiscoverButton';
import { motion } from 'motion/react';
import studioTeam from '@/assets/studio-team.jpg';
import weddingCeremony from '@/assets/wedding-ceremony.jpg';

const values = [
  {
    title: 'Consistency',
    description: 'Every project receives the same level of care and attention. Our established workflows ensure reliable, high-quality results across all shoots.',
  },
  {
    title: 'Professionalism',
    description: 'We operate with integrity, clear communication, and respect for your time. Deadlines are met, and expectations are managed transparently.',
  },
  {
    title: 'Collaboration',
    description: 'We work closely with clients to understand their vision. The best results come from true partnership between photographer and subject.',
  },
  {
    title: 'Discretion',
    description: 'Whether at weddings or corporate events, we blend into the background while capturing every important moment unobtrusively.',
  },
];

const milestones = [
  { year: '2012', title: 'Founded', description: 'Started as a small team with a big vision for professional photography.' },
  { year: '2015', title: 'Expansion', description: 'Grew to a team of 5 photographers, covering weddings across South India.' },
  { year: '2018', title: 'Studio Space', description: 'Opened our dedicated studio in Chennai for portrait and commercial work.' },
  { year: '2021', title: 'Full Service', description: 'Expanded to offer comprehensive video production alongside photography.' },
  { year: '2024', title: 'Today', description: 'A team of 8+ professionals serving 200+ clients annually.' },
];

const About = () => {
  return (
    <Layout>
      <Section tone="muted">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <PageHeader
            eyebrow="About Us"
            title={
              <>
                JD<br />
                <span className="italic">Photomoments</span>
              </>
            }
            description={
              <>
                We are a professional photography studio with over a decade of
                experience capturing life's most important moments. Our team approach
                ensures consistent quality and comprehensive coverage for every project.
              </>
            }
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="image-hover aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src={studioTeam}
              alt="JD Photomoments team at work"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </Section>

      {/* Vertical Tabs - Interactive About Section */}
      <VerticalTabs />

      {/* Timeline Section */}
      <Section tone="muted">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-label text-primary mb-4">Our Journey</p>
            <h2 className="heading-section text-foreground">Milestones</h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Year Badge */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-bold text-sm z-10 shadow-lg">
                  {milestone.year}
                </div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`ml-24 md:ml-0 md:w-[calc(50%-4rem)] p-6 rounded-2xl bg-background border border-border shadow-lg ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
                    }`}
                >
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {milestone.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Our Story Section */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="heading-section text-foreground mb-8 text-center">Our Story</h2>
          <div className="space-y-6 text-body">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Founded in 2012, JD Photomoments began with a simple belief: that
              professional photography should be accessible, reliable, and beautiful.
              What started as a small team has grown into a full-service studio
              capable of handling projects of any scale.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Over the years, we've had the privilege of documenting hundreds of
              weddings, countless corporate events, and numerous commercial projects.
              Each experience has refined our approach and deepened our commitment
              to excellence.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Today, our team of eight experienced photographers and support staff
              work together to deliver images that exceed expectations. We've invested
              in the best equipment, developed efficient workflows, and built
              relationships with clients who return to us year after year.
            </motion.p>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section tone="muted">
        <FeatureGrid
          eyebrow="What Guides Us"
          title="Our Values"
          items={values.map((value) => ({
            title: value.title,
            description: value.description,
          }))}
          columns={2}
        />
      </Section>

      {/* Team Approach Section */}
      <Section tone="inverse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="image-hover aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src={weddingCeremony}
              alt="Wedding ceremony captured by our team"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-label text-white/60 mb-4">The Team Approach</p>
            <h2 className="heading-section text-white mb-6">Why a Studio, Not a Solo Photographer</h2>
            <div className="space-y-4 text-white/70">
              <p>
                When you work with JD Photomoments, you benefit from the combined
                expertise of our entire team. For larger events, multiple photographers
                ensure complete coverage. For every project, our post-production team
                applies consistent editing standards.
              </p>
              <p>
                This team approach means you're never dependent on a single individual's
                availability or style. It means backup plans are always in place. It
                means your images receive the attention of specialists at every stage.
              </p>
              <p>The result? Reliable quality you can count on, project after project.</p>
            </div>
            <div className="mt-8">
              <DiscoverButton href="/contact" variant="secondary" size="md">
                Work With Us
              </DiscoverButton>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Testimonials */}
      <EmptyTestimonial />

      {/* CTA */}
      <Section>
        <div className="container-narrow">
          <CTA
            title="Ready to Work Together?"
            description={
              <>
                We'd love to hear about your project and discuss how we can help
                bring your vision to life.
              </>
            }
            primaryHref="/contact"
            primaryLabel="Get in Touch"
            secondaryHref="/portfolio"
            secondaryLabel="Browse Portfolio"
          />
        </div>
      </Section>
    </Layout>
  );
};

export default About;
