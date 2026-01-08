import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  align?: "left" | "center";
  className?: string;
}

export function CTA({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  align = "center",
  className,
}: CTAProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "", className)}>
      {eyebrow ? <p className={cn("text-label mb-4", align === "center" ? "mx-auto" : "")}>{eyebrow}</p> : null}
      <h2 className={cn("heading-section mb-6", align === "center" ? "mx-auto" : "")}>{title}</h2>
      {description ? <p className={cn("text-body max-w-2xl mb-10", align === "center" ? "mx-auto" : "")}>{description}</p> : null}

      <div className={cn("flex flex-col sm:flex-row gap-4", align === "center" ? "justify-center" : "")}> 
        <Button variant="studio" size="xl" asChild>
          <Link to={primaryHref}>{primaryLabel}</Link>
        </Button>
        {secondaryHref && secondaryLabel ? (
          <Button variant="studioOutline" size="xl" asChild>
            <Link to={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
