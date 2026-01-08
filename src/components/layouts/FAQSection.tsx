import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQSectionProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  items: FAQItem[];
}

export function FAQSection({ eyebrow, title, description, items }: FAQSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
      <div>
        {eyebrow ? <p className="text-label mb-4">{eyebrow}</p> : null}
        <h2 className="heading-section text-foreground mb-6">{title}</h2>
        {description ? <p className="text-body">{description}</p> : null}
      </div>

      <Accordion type="single" collapsible className="w-full">
        {items.map((item, idx) => (
          <AccordionItem key={item.question} value={`item-${idx}`}>
            <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
