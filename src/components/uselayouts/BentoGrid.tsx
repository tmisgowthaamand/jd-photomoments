
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BentoItem {
    src: string;
    alt: string;
    label: string;
    className?: string;
}

interface BentoGridProps {
    title?: string;
    eyebrow?: string;
    description?: string;
    items: BentoItem[];
}

export function BentoGrid({ title, eyebrow, description, items }: BentoGridProps) {
    return (
        <div className="w-full">
            {eyebrow && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-label text-center mb-4 text-primary"
                >
                    {eyebrow}
                </motion.p>
            )}

            {title && (
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="heading-section text-center mb-6"
                >
                    {title}
                </motion.h2>
            )}

            {description && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-body text-center max-w-2xl mx-auto mb-16"
                >
                    {description}
                </motion.p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                {items.map((item, i) => (
                    <BentoItem
                        key={i}
                        item={item}
                        index={i}
                        className={i === 0 || i === 3 ? "md:col-span-2" : ""}
                    />
                ))}
            </div>
        </div>
    );
}

const BentoItem = ({ item, index, className }: { item: BentoItem; index: number; className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={cn("group relative overflow-hidden rounded-2xl bg-muted shadow-sm hover:shadow-lg transition-all duration-300", className)}
        >
            <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-medium text-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    {item.label}
                </p>
            </div>
        </motion.div>
    );
};
