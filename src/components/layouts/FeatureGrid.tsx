
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface FeatureItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeatureGridProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  items: FeatureItem[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function FeatureGrid({
  eyebrow,
  title,
  description,
  items,
  columns = 3,
  className,
}: FeatureGridProps) {
  return (
    <div className={cn("", className)}>
      <div className="max-w-2xl">
        {eyebrow ? <p className="text-label mb-4">{eyebrow}</p> : null}
        <h2 className="heading-section text-foreground mb-6">{title}</h2>
        {description ? <p className="text-body">{description}</p> : null}
      </div>

      <div
        className={cn(
          "mt-12 grid gap-6",
          columns === 1 && "grid-cols-1",
          columns === 2 && "grid-cols-1 md:grid-cols-2",
          columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        )}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-background border border-border p-6 md:p-8 hover:border-primary/50 transition-colors duration-300"
          >
            {item.icon ? <div className="text-primary mb-4">{item.icon}</div> : null}
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3">{item.title}</h3>
            <p className="text-body-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
