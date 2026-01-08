import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import studioTeam from '@/assets/studio-team.jpg';
import { Counter } from '@/components/uselayouts/Counter';

const stats = [
  { value: 12, suffix: '+', label: 'Years of Experience' },
  { value: 500, suffix: '+', label: 'Events Covered' },
  { value: 150, suffix: '+', label: 'Weddings Captured' },
  { value: 8, suffix: '', label: 'Team Members' },
];

export function TrustSection() {
  return (
    <section className="section-padding bg-foreground text-background">
      <div className="container-studio">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="image-hover aspect-[4/3]">
              <img
                src={studioTeam}
                alt="JD Photomoments team at work"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-label text-background/60 mb-4">Why Choose Us</p>
            <h2 className="heading-section text-background mb-6">
              A Studio You Can Trust
            </h2>
            <p className="text-lg text-background/70 leading-relaxed mb-8">
              With over a decade of experience, our team has developed refined
              workflows and a consistent approach that delivers beautiful results
              every time. We understand the importance of your moments and treat
              each project with the care it deserves.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <span className="block font-heading text-4xl text-background mb-1">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-sm text-background/60">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <Button variant="outline" size="lg" asChild className="border-background text-background hover:bg-background hover:text-foreground">
              <Link to="/about">Learn About Our Studio</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
