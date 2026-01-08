import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

export function PageHeader({ eyebrow, title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <p className="text-label mb-4">{eyebrow}</p> : null}
      <h1 className="heading-display text-foreground mb-6">{title}</h1>
      {description ? <p className="text-body text-lg">{description}</p> : null}
    </div>
  );
}
