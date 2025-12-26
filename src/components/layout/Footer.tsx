import { Link } from 'react-router-dom';

const services = [
  { name: 'Weddings', href: '/services#weddings' },
  { name: 'Pre-Weddings', href: '/services#pre-weddings' },
  { name: 'Events', href: '/services#events' },
  { name: 'Portraits', href: '/services#portraits' },
  { name: 'Commercial', href: '/services#commercial' },
];

const quickLinks = [
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-studio section-padding-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <h3 className="font-heading text-3xl md:text-4xl font-medium tracking-tight text-background mb-4">
                JD Photomoments
              </h3>
            </Link>
            <p className="text-background/70 max-w-md leading-relaxed">
              A professional photography studio dedicated to capturing life's most important moments 
              with artistry, consistency, and care.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-label text-background/60 mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-background/70 hover:text-background transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-label text-background/60 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-background/70 hover:text-background transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/50">
              © {new Date().getFullYear()} JD Photomoments. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="mailto:info@jdphotomoments.com"
                className="text-sm text-background/50 hover:text-background transition-colors"
              >
                info@jdphotomoments.com
              </a>
              <a
                href="tel:+91 8939787600"
                className="text-sm text-background/50 hover:text-background transition-colors"
              >
                +91 8939787600
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
