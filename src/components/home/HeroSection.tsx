import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-wedding.jpg';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Elegant bride in garden setting during golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-studio relative z-10">
        <div className="max-w-2xl">
          <p className="text-label text-background/80 mb-6 opacity-0 animate-fade-in-up">
            Professional Photography Studio
          </p>
          
          <h1 className="heading-display text-background mb-8 opacity-0 animate-fade-in-up animation-delay-100">
            Moments That<br />
            <span className="italic">Last Forever</span>
          </h1>
          
          <p className="text-lg md:text-xl text-background/80 leading-relaxed mb-10 max-w-lg opacity-0 animate-fade-in-up animation-delay-200">
            We capture weddings, events, portraits, and commercial projects 
            with artistry and care. Every shoot is handled by our experienced 
            team with meticulous attention to detail.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up animation-delay-300">
            <Button variant="studio" size="xl" asChild className="bg-background text-foreground hover:bg-background/90">
              <Link to="/contact">Enquire About Your Shoot</Link>
            </Button>
            <Button variant="studioGhost" size="xl" asChild className="text-background hover:text-background border-background/30 hover:border-background">
              <Link to="/portfolio">View Our Work</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0 animate-fade-in animation-delay-500">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-background/60">Scroll</span>
          <div className="w-px h-12 bg-background/30" />
        </div>
      </div>
    </section>
  );
}
