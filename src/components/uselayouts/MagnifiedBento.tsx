"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface MagnifiedBentoItem {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    span?: "normal" | "wide" | "tall" | "large";
}

interface MagnifiedBentoProps {
    items?: MagnifiedBentoItem[];
    className?: string;
}

import weddingImage from '@/assets/hero-wedding.jpg';
import weddingDetail from '@/assets/wedding-detail.jpg';
import weddingCeremony from '@/assets/wedding-ceremony.jpg';
import eventImage from '@/assets/event-sample.jpg';
import portraitImage from '@/assets/portrait-sample.jpg';
import commercialImage from '@/assets/commercial-sample.jpg';

const DEFAULT_ITEMS: MagnifiedBentoItem[] = [
    {
        id: "1",
        title: "Eternal Weddings",
        subtitle: "Love Stories Captured",
        image: weddingImage,
        span: "large",
    },
    {
        id: "2",
        title: "Bridal Details",
        subtitle: "Every Moment Matters",
        image: weddingDetail,
        span: "normal",
    },
    {
        id: "3",
        title: "Sacred Ceremonies",
        subtitle: "Timeless Traditions",
        image: weddingCeremony,
        span: "tall",
    },
    {
        id: "4",
        title: "Corporate Events",
        subtitle: "Professional Excellence",
        image: eventImage,
        span: "wide",
    },
    {
        id: "5",
        title: "Portrait Sessions",
        subtitle: "Your Best Self",
        image: portraitImage,
        span: "normal",
    },
    {
        id: "6",
        title: "Brand Photography",
        subtitle: "Elevate Your Image",
        image: commercialImage,
        span: "normal",
    },
];

const transition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
} as const;

export function MagnifiedBento({
    items = DEFAULT_ITEMS,
    className,
}: MagnifiedBentoProps) {
    const [selectedItem, setSelectedItem] = useState<MagnifiedBentoItem | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const getSpanClass = (span?: string) => {
        switch (span) {
            case "wide":
                return "md:col-span-2";
            case "tall":
                return "md:row-span-2";
            case "large":
                return "md:col-span-2 md:row-span-2";
            default:
                return "";
        }
    };

    const navigateImage = (direction: "prev" | "next") => {
        if (!selectedItem) return;
        const currentIndex = items.findIndex((item) => item.id === selectedItem.id);
        const newIndex =
            direction === "next"
                ? (currentIndex + 1) % items.length
                : (currentIndex - 1 + items.length) % items.length;
        setSelectedItem(items[newIndex]);
    };

    return (
        <>
            <div
                className={cn(
                    "grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]",
                    className
                )}
            >
                {items.map((item, index) => {
                    const isHovered = hoveredId === item.id;

                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onHoverStart={() => setHoveredId(item.id)}
                            onHoverEnd={() => setHoveredId(null)}
                            onClick={() => setSelectedItem(item)}
                            className={cn(
                                "relative rounded-3xl overflow-hidden cursor-pointer group",
                                "border border-border/50 shadow-lg",
                                getSpanClass(item.span)
                            )}
                        >
                            {/* Image */}
                            <motion.div
                                className="absolute inset-0"
                                animate={{
                                    scale: isHovered ? 1.1 : 1,
                                }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            {/* Overlay */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                                animate={{
                                    opacity: isHovered ? 1 : 0.7,
                                }}
                                transition={{ duration: 0.3 }}
                            />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <motion.div
                                    animate={{
                                        y: isHovered ? -10 : 0,
                                    }}
                                    transition={transition}
                                >
                                    <motion.p
                                        className="text-white/70 text-sm mb-1"
                                        animate={{
                                            opacity: isHovered ? 1 : 0.8,
                                        }}
                                    >
                                        {item.subtitle}
                                    </motion.p>
                                    <h3 className="text-white text-xl md:text-2xl font-heading font-light">
                                        {item.title}
                                    </h3>
                                </motion.div>

                                {/* Zoom Icon */}
                                <motion.div
                                    className="absolute top-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-sm"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: isHovered ? 1 : 0,
                                        scale: isHovered ? 1 : 0.8,
                                    }}
                                    transition={transition}
                                >
                                    <ZoomIn className="w-5 h-5 text-white" />
                                </motion.div>
                            </div>

                            {/* Magnify Effect on Hover */}
                            <motion.div
                                className="absolute inset-0 pointer-events-none"
                                animate={{
                                    opacity: isHovered ? 1 : 0,
                                }}
                            >
                                <div className="absolute inset-0 border-4 border-white/20 rounded-3xl" />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                        onClick={() => setSelectedItem(null)}
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                            onClick={() => setSelectedItem(null)}
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        {/* Navigation */}
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="absolute left-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateImage("prev");
                            }}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>

                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateImage("next");
                            }}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>

                        {/* Image */}
                        <motion.div
                            key={selectedItem.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={transition}
                            className="max-w-5xl max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedItem.image}
                                alt={selectedItem.title}
                                className="w-full h-full object-contain"
                            />
                        </motion.div>

                        {/* Caption */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white"
                        >
                            <p className="text-white/60 text-sm">{selectedItem.subtitle}</p>
                            <h3 className="text-2xl font-heading font-light">{selectedItem.title}</h3>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
