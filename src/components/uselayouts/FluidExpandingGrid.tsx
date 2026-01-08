"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

import weddingImage from '@/assets/hero-wedding.jpg';
import preweddingImage from '@/assets/prewedding-sample.jpg';
import eventImage from '@/assets/event-sample.jpg';
import portraitImage from '@/assets/portrait-sample.jpg';
import commercialImage from '@/assets/commercial-sample.jpg';

interface GridItem {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    gradient: string;
}

const GRID_ITEMS: GridItem[] = [
    {
        id: "weddings",
        title: "Weddings",
        description: "Your Day, Documented",
        longDescription: "We approach every wedding with the understanding that this is one of the most important days of your life. Our team works discreetly yet comprehensively, ensuring no moment goes uncaptured.",
        image: weddingImage,
        gradient: "from-pink-500/80 to-rose-600/80",
    },
    {
        id: "pre-weddings",
        title: "Pre-Weddings",
        description: "Tell Your Story",
        longDescription: "Before the big day, take time to create beautiful images that tell the story of your relationship. We work with you to find the perfect locations.",
        image: preweddingImage,
        gradient: "from-purple-500/80 to-violet-600/80",
    },
    {
        id: "events",
        title: "Events",
        description: "Professional Coverage",
        longDescription: "From corporate conferences to gala dinners, private parties to product launches, we provide reliable, professional coverage that captures every key moment.",
        image: eventImage,
        gradient: "from-blue-500/80 to-indigo-600/80",
    },
    {
        id: "portraits",
        title: "Portraits",
        description: "Make an Impression",
        longDescription: "Whether you need corporate headshots, personal branding images, or family portraits, our sessions deliver polished, professional results.",
        image: portraitImage,
        gradient: "from-emerald-500/80 to-teal-600/80",
    },
    {
        id: "commercial",
        title: "Commercial",
        description: "Elevate Your Brand",
        longDescription: "High-quality product photography and brand shoots that help your business stand out. We deliver images that align with your marketing goals.",
        image: commercialImage,
        gradient: "from-amber-500/80 to-orange-600/80",
    },
];

const transition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
} as const;

export function FluidExpandingGrid() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleItemClick = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section className="w-full py-20 px-4 md:px-8 bg-muted/30">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-label text-primary mb-4">Explore</p>
                    <h2 className="heading-section text-foreground">Our Expertise</h2>
                </motion.div>

                {/* Grid */}
                <div className="space-y-4">
                    {GRID_ITEMS.map((item, index) => {
                        const isExpanded = expandedId === item.id;

                        return (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ ...transition, delay: index * 0.1 }}
                                onClick={() => handleItemClick(item.id)}
                                className={cn(
                                    "relative overflow-hidden rounded-3xl cursor-pointer",
                                    "border border-border",
                                    "group transition-shadow duration-300",
                                    isExpanded ? "shadow-2xl" : "hover:shadow-lg"
                                )}
                            >
                                <motion.div
                                    layout
                                    className={cn(
                                        "relative transition-all duration-500 overflow-hidden",
                                        isExpanded ? "h-[400px] md:h-[450px]" : "h-24 md:h-28"
                                    )}
                                >
                                    {/* Background Image */}
                                    <motion.div
                                        className="absolute inset-0"
                                        initial={false}
                                        animate={{
                                            opacity: isExpanded ? 1 : 0.3,
                                            scale: isExpanded ? 1 : 1.1,
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className={cn(
                                            "absolute inset-0 bg-gradient-to-r",
                                            item.gradient,
                                            "transition-opacity duration-500",
                                            isExpanded ? "opacity-60" : "opacity-0"
                                        )} />
                                    </motion.div>

                                    {/* Collapsed State */}
                                    <AnimatePresence>
                                        {!isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute inset-0 flex items-center justify-between px-6 md:px-10 bg-background/90 backdrop-blur-sm"
                                            >
                                                <div className="flex items-center gap-6">
                                                    <motion.div
                                                        whileHover={{ scale: 1.1 }}
                                                        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg"
                                                    >
                                                        <img
                                                            src={item.image}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </motion.div>
                                                    <div>
                                                        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <motion.div
                                                    whileHover={{ x: 3 }}
                                                    className="flex items-center gap-2 text-primary"
                                                >
                                                    <span className="text-sm font-medium hidden md:block">
                                                        View Details
                                                    </span>
                                                    <ChevronRight className="w-5 h-5" />
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Expanded State */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                transition={{ delay: 0.2 }}
                                                className="absolute inset-0 flex flex-col justify-end p-8 md:p-12"
                                            >
                                                <div className="max-w-2xl">
                                                    <motion.p
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.3 }}
                                                        className="text-white/80 text-sm uppercase tracking-widest mb-3"
                                                    >
                                                        {item.description}
                                                    </motion.p>
                                                    <motion.h3
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.35 }}
                                                        className="text-3xl md:text-4xl font-heading font-light text-white mb-4"
                                                    >
                                                        {item.title}
                                                    </motion.h3>
                                                    <motion.p
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.4 }}
                                                        className="text-white/90 text-base md:text-lg leading-relaxed mb-6"
                                                    >
                                                        {item.longDescription}
                                                    </motion.p>
                                                    <motion.a
                                                        href="/contact"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.45 }}
                                                        whileHover={{ x: 5 }}
                                                        className="inline-flex items-center gap-2 text-white font-medium group"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        Enquire About {item.title}
                                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </motion.a>
                                                </div>

                                                {/* Close hint */}
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.5 }}
                                                    className="absolute top-6 right-6 text-white/60 text-sm"
                                                >
                                                    Click to collapse
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
