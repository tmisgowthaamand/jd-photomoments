import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-narrow text-center">
        <p className="text-label mb-4">Ready to Begin?</p>
        <h2 className="heading-section text-foreground mb-6">
          Let's Capture Your Story
        </h2>
        <p className="text-body max-w-xl mx-auto mb-10">
          Whether it's your wedding day, a corporate event, or a personal portrait 
          session, we're here to create images that you'll treasure for years to come.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="studio" size="xl" asChild>
            <Link to="/contact">Enquire About Your Shoot</Link>
          </Button>
          <Button variant="studioOutline" size="xl" asChild>
            <Link to="/portfolio">Explore Our Portfolio</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
