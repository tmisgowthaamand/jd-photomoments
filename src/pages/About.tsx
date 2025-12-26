import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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

const About = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="section-padding bg-card">
        <div className="container-studio">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-label mb-4">About Us</p>
              <h1 className="heading-display text-foreground mb-6">
                JD<br />
                <span className="italic">Photomoments</span>
              </h1>
              <p className="text-body text-lg">
                We are a professional photography studio with over a decade of 
                experience capturing life's most important moments. Our team approach 
                ensures consistent quality and comprehensive coverage for every project.
              </p>
            </div>
            <div className="image-hover aspect-[4/3]">
              <img
                src={studioTeam}
                alt="JD Photomoments team at work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background">
        <div className="container-studio">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-section text-foreground mb-8 text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-body">
              <p>
                Founded in 2012, JD Photomoments began with a simple belief: that 
                professional photography should be accessible, reliable, and beautiful. 
                What started as a small team has grown into a full-service studio 
                capable of handling projects of any scale.
              </p>
              <p>
                Over the years, we've had the privilege of documenting hundreds of 
                weddings, countless corporate events, and numerous commercial projects. 
                Each experience has refined our approach and deepened our commitment 
                to excellence.
              </p>
              <p>
                Today, our team of eight experienced photographers and support staff 
                work together to deliver images that exceed expectations. We've invested 
                in the best equipment, developed efficient workflows, and built 
                relationships with clients who return to us year after year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-card">
        <div className="container-studio">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-label mb-4">What Guides Us</p>
            <h2 className="heading-section text-foreground">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {values.map((value) => (
              <div key={value.title} className="p-8 bg-background">
                <h3 className="font-heading text-2xl text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Approach */}
      <section className="section-padding bg-foreground text-background">
        <div className="container-studio">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="image-hover aspect-[4/3]">
              <img
                src={weddingCeremony}
                alt="Wedding ceremony captured by our team"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-label text-background/60 mb-4">The Team Approach</p>
              <h2 className="heading-section text-background mb-6">
                Why a Studio, Not a Solo Photographer
              </h2>
              <div className="space-y-4 text-background/70">
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
                <p>
                  The result? Reliable quality you can count on, project after project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-narrow text-center">
          <h2 className="heading-section text-foreground mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-body max-w-xl mx-auto mb-10">
            We'd love to hear about your project and discuss how we can help 
            bring your vision to life.
          </p>
          <Button variant="studio" size="xl" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;
