import { cn } from "@/lib/utils";

type SectionTone = "default" | "muted" | "inverse";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  tone?: SectionTone;
  size?: "sm" | "md" | "lg";
}

export function Section({
  children,
  className,
  containerClassName,
  tone = "default",
  size = "lg",
}: SectionProps) {
  return (
    <section
      className={cn(
        size === "sm" && "section-padding-sm",
        size === "md" && "py-16 md:py-20 lg:py-24",
        size === "lg" && "section-padding",
        tone === "default" && "bg-background text-foreground",
        tone === "muted" && "bg-card text-foreground",
        tone === "inverse" && "bg-foreground text-background dark:bg-card dark:text-foreground",
        className,
      )}
    >
      <div className={cn("container-studio", containerClassName)}>{children}</div>
    </section>
  );
}
