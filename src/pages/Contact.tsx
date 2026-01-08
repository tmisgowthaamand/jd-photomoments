import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Section } from '@/components/layouts/Section';
import { PageHeader } from '@/components/layouts/PageHeader';
import { FeatureGrid } from '@/components/layouts/FeatureGrid';
import { CTA } from '@/components/layouts/CTA';
import { MorphingContactForm, MorphingInput } from '@/components/uselayouts/MorphingInput';
import { DiscoverButton, SendEnquiryButton } from '@/components/uselayouts/DiscoverButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock, Calendar, MessageSquare } from 'lucide-react';
import { motion } from "motion/react";

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
      <Section tone="muted" size="sm">
        <PageHeader
          eyebrow="Get in Touch"
          title={
            <>
              Contact<br />
              <span className="italic">Us</span>
            </>
          }
          description={
            <>
              Ready to discuss your project? Fill out the form below or reach out
              directly. We respond to all enquiries within 24 hours.
            </>
          }
        />
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Label htmlFor="name" className="text-sm font-medium">
                      Your Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-14 bg-card border-border focus:border-primary rounded-xl"
                    />
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
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
                      className="h-14 bg-card border-border focus:border-primary rounded-xl"
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="h-14 bg-card border-border focus:border-primary rounded-xl"
                    />
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <Label htmlFor="service" className="text-sm font-medium">
                      Service Interested In *
                    </Label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="h-14 w-full px-4 bg-card border border-border text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Label htmlFor="eventDate" className="text-sm font-medium">
                      Event/Shoot Date
                    </Label>
                    <Input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="h-14 bg-card border-border focus:border-primary rounded-xl"
                    />
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <Label htmlFor="location" className="text-sm font-medium">
                      Location
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City or venue"
                      className="h-14 bg-card border-border focus:border-primary rounded-xl"
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
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
                    className="bg-card border-border focus:border-primary resize-none rounded-xl"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <SendEnquiryButton
                    onClick={() => { }}
                    loading={isSubmitting}
                    className="w-full md:w-auto"
                  />
                </motion.div>
              </form>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <h3 className="font-heading text-2xl text-foreground mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <motion.div
                    className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <a
                        href="mailto:info@jdphotomoments.com"
                        className="text-foreground hover:text-primary transition-colors font-medium"
                      >
                        info@jdphotomoments.com
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <a
                        href="tel:+918939787600"
                        className="text-foreground hover:text-primary transition-colors font-medium"
                      >
                        +91 89397 87600
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Studio</p>
                      <p className="text-foreground">
                        10, Akash enclave, 4th Main Rd,<br />
                        VGN Mahalakshmi Nagar, Perumalagaram,<br />
                        Thiruverkadu, Chennai, Tamil Nadu 600077
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Quick Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-4"
            >
              <h4 className="font-heading text-lg text-foreground">What to Expect</h4>

              <motion.div
                className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <h5 className="font-medium text-foreground">Response Time</h5>
                </div>
                <p className="text-sm text-muted-foreground">
                  We respond to all enquiries within 24 hours during business days. For urgent matters, please call us directly.
                </p>
              </motion.div>

              <motion.div
                className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h5 className="font-medium text-foreground">Studio Hours</h5>
                </div>
                <p className="text-sm text-muted-foreground">
                  Monday – Friday: 9am – 6pm<br />
                  Saturday: By appointment<br />
                  Sunday: Closed
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Quick Contact Form - Morphing Style */}
      <Section tone="muted">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <p className="text-label text-primary mb-4">Quick Contact</p>
            <h2 className="heading-section text-foreground mb-4">Have a Quick Question?</h2>
            <p className="text-muted-foreground">Use our instant form for quick enquiries</p>
          </div>
          <MorphingContactForm />
        </div>
      </Section>

      <Section>
        <div className="container-narrow">
          <CTA
            eyebrow="Before You Send"
            title="Include as much detail as you can"
            description="Location, dates, and your preferred style help us respond with the right package and timeline."
            primaryHref="/services"
            primaryLabel="View Services"
            secondaryHref="/portfolio"
            secondaryLabel="Browse Portfolio"
          />
        </div>
      </Section>
    </Layout>
  );
};

export default Contact;
