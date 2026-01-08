import { motion } from "motion/react";

const steps = [
  {
    number: '01',
    title: 'Enquiry',
    description: 'Share your vision, dates, and requirements. We respond within 24 hours to discuss your project.',
  },
  {
    number: '02',
    title: 'Consultation',
    description: 'We meet to understand your needs in detail and craft a tailored approach for your shoot.',
  },
  {
    number: '03',
    title: 'Planning',
    description: 'Our team prepares shot lists, scouts locations, and coordinates all logistics.',
  },
  {
    number: '04',
    title: 'Shoot Day',
    description: 'Professional execution with multiple photographers ensuring comprehensive coverage.',
  },
  {
    number: '05',
    title: 'Delivery',
    description: 'Carefully edited images delivered in your preferred format within the agreed timeline.',
  },
];

export function ProcessSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-studio">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-label mb-4">How We Work</p>
          <h2 className="heading-section text-foreground mb-6">
            A Seamless Process
          </h2>
          <p className="text-body">
            From initial enquiry to final delivery, we ensure a smooth,
            professional experience. Our organized approach means you can
            focus on what matters while we handle the rest.
          </p>
        </div>

        {/* Process Steps */}
        <div className="flex gap-8 overflow-x-auto pb-12 snap-x hide-scrollbar">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative min-w-[280px] flex-1 snap-start"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="text-left">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl md:text-5xl font-heading text-primary/30 font-light">
                    {step.number}
                  </span>
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="h-px bg-border flex-grow min-w-[4rem] w-full" />
                  )}
                </div>

                <h3 className="font-heading text-xl text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
