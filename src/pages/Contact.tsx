import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const serviceOptions = [
  'Wedding Photography',
  'Pre-Wedding Session',
  'Event Photography',
  'Portrait Session',
  'Commercial Photography',
  'Other / Not Sure',
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    eventDate: '',
    location: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Enquiry Sent",
      description: "Thank you for your enquiry. We'll be in touch within 24 hours.",
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      eventDate: '',
      location: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Page Header */}
      <section className="section-padding-sm bg-card">
        <div className="container-studio">
          <div className="max-w-3xl">
            <p className="text-label mb-4">Get in Touch</p>
            <h1 className="heading-display text-foreground mb-6">
              Contact<br />
              <span className="italic">Us</span>
            </h1>
            <p className="text-body text-lg">
              Ready to discuss your project? Fill out the form below or reach out 
              directly. We respond to all enquiries within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-background">
        <div className="container-studio">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Your Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12 bg-card border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-12 bg-card border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-12 bg-card border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-sm font-medium">
                      Service Interested In *
                    </Label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="h-12 w-full px-3 bg-card border border-border text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="eventDate" className="text-sm font-medium">
                      Event/Shoot Date
                    </Label>
                    <Input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="h-12 bg-card border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium">
                      Location
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City or venue"
                      className="h-12 bg-card border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    Tell Us About Your Project *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Share any details about your event, vision, or questions you have..."
                    className="bg-card border-border focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="studio"
                  size="xl"
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-2xl text-foreground mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <a
                        href="mailto:info@jdphotomoments.com"
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        info@jdphotomoments.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <a
                        href="tel:+918939787600"
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        +91 89397 87600
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Studio</p>
                      <p className="text-foreground">
                        10, Akash enclave, 4th Main Rd,<br />
                        VGN Mahalakshmi Nagar, Perumalagaram,<br />
                        Thiruverkadu, Chennai, Tamil Nadu 600077
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-card">
                <h4 className="font-heading text-lg text-foreground mb-3">
                  Response Time
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We respond to all enquiries within 24 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
              </div>

              <div className="p-6 bg-card">
                <h4 className="font-heading text-lg text-foreground mb-3">
                  Studio Hours
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Monday – Friday: 9am – 6pm<br />
                  Saturday: By appointment<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
