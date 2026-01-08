"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Camera, Heart, Users, Building2, Sparkles } from "lucide-react";

import weddingImage from '@/assets/hero-wedding.jpg';
import preweddingImage from '@/assets/prewedding-sample.jpg';
import eventImage from '@/assets/event-sample.jpg';
import portraitImage from '@/assets/portrait-sample.jpg';
import commercialImage from '@/assets/commercial-sample.jpg';

interface Feature {
    id: string;
    title: string;
    description: string;
    image: string;
    icon: React.ElementType;
    accent: string;
}

const FEATURES: Feature[] = [
    {
        id: "weddings",
        title: "Wedding Photography",
        description: "Capturing your most precious moments with elegance and emotion. We document every detail of your special day.",
        image: weddingImage,
        icon: Heart,
        accent: "#F472B6",
    },
    {
        id: "pre-weddings",
        title: "Pre-Wedding Sessions",
        description: "Tell your love story through beautiful, cinematic pre-wedding shoots at stunning locations.",
        image: preweddingImage,
        icon: Sparkles,
        accent: "#A78BFA",
    },
    {
        id: "events",
        title: "Event Photography",
        description: "Professional coverage for corporate events, galas, and private celebrations with reliable quality.",
        image: eventImage,
        icon: Users,
        accent: "#60A5FA",
    },
    {
        id: "portraits",
        title: "Portrait Photography",
        description: "Executive headshots, personal branding, and family portraits that make lasting impressions.",
        image: portraitImage,
        icon: Camera,
        accent: "#34D399",
    },
    {
        id: "commercial",
        title: "Commercial Photography",
        description: "High-quality product and brand photography to elevate your business image and marketing.",
        image: commercialImage,
        icon: Building2,
        accent: "#FBBF24",
    },
];

const transition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
} as const;

export function FeatureCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const next = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    }, []);

    const prev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + FEATURES.length) % FEATURES.length);
    }, []);

    useEffect(() => {
        if (isAutoPlaying) {
            intervalRef.current = setInterval(() => {
                next();
            }, 5000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isAutoPlaying, next]);

    const handleChipClick = (index: number) => {
        setActiveIndex(index);
        setIsAutoPlaying(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const activeFeature = FEATURES[activeIndex];

    return (
        <section className="w-full py-20 px-4 md:px-8 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-label text-primary mb-4">What We Offer</p>
                    <h2 className="heading-section text-foreground">Our Photography Services</h2>
                </motion.div>

                {/* Floating Chips */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {FEATURES.map((feature, index) => {
                        const Icon = feature.icon;
                        const isActive = index === activeIndex;
                        return (
                            <motion.button
                                key={feature.id}
                                onClick={() => handleChipClick(index)}
                                className={cn(
                                    "flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all duration-300",
                                    "border backdrop-blur-sm",
                                    isActive
                                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                                        : "bg-background/80 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                                )}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{feature.title.split(' ')[0]}</span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Main Carousel */}
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Image */}
                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl order-1 lg:order-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeFeature.id}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <img
                                    src={activeFeature.image}
                                    alt={activeFeature.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <div className="absolute bottom-6 right-6 flex gap-3">
                            <button
                                onClick={() => {
                                    prev();
                                    setIsAutoPlaying(false);
                                }}
                                className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => {
                                    next();
                                    setIsAutoPlaying(false);
                                }}
                                className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Progress Indicator */}
                        <div className="absolute bottom-6 left-6 flex gap-2">
                            {FEATURES.map((_, index) => (
                                <motion.div
                                    key={index}
                                    className={cn(
                                        "h-1 rounded-full transition-all duration-300",
                                        index === activeIndex
                                            ? "w-8 bg-white"
                                            : "w-2 bg-white/40"
                                    )}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="order-2 lg:order-2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeFeature.id}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={transition}
                                className="space-y-6"
                            >
                                <motion.div
                                    className="inline-flex items-center gap-3 px-4 py-2 rounded-full border"
                                    style={{
                                        borderColor: `${activeFeature.accent}40`,
                                        backgroundColor: `${activeFeature.accent}10`,
                                    }}
                                >
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: activeFeature.accent }}
                                    >
                                        <activeFeature.icon className="w-4 h-4 text-white" />
                                    </div>
                                    <span
                                        className="text-sm font-medium"
                                        style={{ color: activeFeature.accent }}
                                    >
                                        Featured Service
                                    </span>
                                </motion.div>

                                <h3 className="text-3xl md:text-4xl font-heading font-light text-foreground">
                                    {activeFeature.title}
                                </h3>

                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {activeFeature.description}
                                </p>

                                <motion.a
                                    href="/contact"
                                    whileHover={{ x: 5 }}
                                    className="inline-flex items-center gap-2 text-primary font-medium hover:text-foreground transition-colors group"
                                >
                                    Enquire Now
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </motion.a>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
