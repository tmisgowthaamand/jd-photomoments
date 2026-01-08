import { cn } from "@/lib/utils";

export interface GalleryItem {
  src: string;
  alt: string;
  label?: string;
}

interface GalleryGridProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  items: GalleryItem[];
  className?: string;
}

export function GalleryGrid({ eyebrow, title, description, items, className }: GalleryGridProps) {
  return (
    <div className={cn("", className)}>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-2xl">
          {eyebrow ? <p className="text-label mb-4">{eyebrow}</p> : null}
          <h2 className="heading-section text-foreground">{title}</h2>
          {description ? <p className="text-body mt-4">{description}</p> : null}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {items.map((item, index) => (
          <div
            key={`${item.alt}-${index}`}
            className={cn(
              "group image-hover relative overflow-hidden",
              index === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square",
            )}
          >
            <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-colors duration-300 flex items-end p-4 md:p-6">
              {item.label ? (
                <span className="text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                  {item.label}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
