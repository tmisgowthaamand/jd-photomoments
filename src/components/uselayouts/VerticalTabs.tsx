"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Heart, Award, Users, Clock, Camera, CheckCircle } from "lucide-react";

import weddingImage from '@/assets/hero-wedding.jpg';
import eventImage from '@/assets/event-sample.jpg';
import portraitImage from '@/assets/portrait-sample.jpg';
import commercialImage from '@/assets/commercial-sample.jpg';

interface TabItem {
    id: string;
    icon: React.ElementType;
    title: string;
    subtitle: string;
    content: {
        heading: string;
        description: string;
        features: string[];
        image: string;
        stats?: { label: string; value: string }[];
    };
    color: string;
}

const TABS: TabItem[] = [
    {
        id: "why-us",
        icon: Heart,
        title: "Why Choose Us",
        subtitle: "Our Difference",
        content: {
            heading: "A Studio You Can Trust",
            description: "With over a decade of experience, we've refined our craft and built a team that consistently delivers exceptional results. We don't just take photos—we create memories that last generations.",
            features: [
                "Consistent quality across every project",
                "Team of 8+ experienced photographers",
                "State-of-the-art equipment",
                "Personalized approach for each client",
            ],
            image: weddingImage,
            stats: [
                { label: "Years Experience", value: "10+" },
                { label: "Happy Clients", value: "500+" },
                { label: "Events Covered", value: "1000+" },
            ],
        },
        color: "#F472B6",
    },
    {
        id: "process",
        icon: Clock,
        title: "Our Process",
        subtitle: "How We Work",
        content: {
            heading: "From Consultation to Delivery",
            description: "We've developed a streamlined process that ensures you get the best results without any stress. From the first consultation to the final delivery, we handle everything with professionalism.",
            features: [
                "Initial consultation to understand your vision",
                "Detailed planning and preparation",
                "Professional shoot with multiple team members",
                "Expert editing and post-production",
                "Timely delivery with premium presentation",
            ],
            image: eventImage,
        },
        color: "#60A5FA",
    },
    {
        id: "team",
        icon: Users,
        title: "The Team",
        subtitle: "Meet Our Experts",
        content: {
            heading: "Professionals Behind the Lens",
            description: "Our team comprises skilled photographers, each bringing their unique expertise to every project. This collaborative approach ensures comprehensive coverage and diverse creative perspectives.",
            features: [
                "Lead photographers with 10+ years experience",
                "Specialized teams for different event types",
                "Dedicated post-production specialists",
                "Event coordinators for seamless execution",
            ],
            image: portraitImage,
        },
        color: "#34D399",
    },
    {
        id: "quality",
        icon: Award,
        title: "Quality Promise",
        subtitle: "Our Guarantee",
        content: {
            heading: "Excellence in Every Frame",
            description: "We're committed to delivering images that exceed your expectations. Our quality promise ensures you receive premium results every single time, backed by our satisfaction guarantee.",
            features: [
                "Premium grade editing and color correction",
                "High-resolution files for all uses",
                "Multiple rounds of review and refinement",
                "Satisfaction guaranteed on every project",
            ],
            image: commercialImage,
        },
        color: "#FBBF24",
    },
];

const transition = {
    type: "spring",
    stiffness: 400,
    damping: 30,
} as const;

export function VerticalTabs() {
    const [activeTab, setActiveTab] = useState<string>(TABS[0].id);
    const activeContent = TABS.find((tab) => tab.id === activeTab)?.content;
    const activeColor = TABS.find((tab) => tab.id === activeTab)?.color;

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
                    <p className="text-label text-primary mb-4">About Us</p>
                    <h2 className="heading-section text-foreground">Get to Know JD Photomoments</h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
                    {/* Tab Navigation */}
                    <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
                        {TABS.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;

                            return (
                                <motion.button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "relative flex-shrink-0 flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300",
                                        "border min-w-[200px] lg:min-w-0 lg:w-full",
                                        isActive
                                            ? "bg-background border-primary/50 shadow-lg"
                                            : "bg-muted/30 border-transparent hover:bg-muted/50 hover:border-border"
                                    )}
                                    whileHover={{ x: isActive ? 0 : 4 }}
                                >
                                    <div
                                        className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                                            isActive ? "shadow-md" : ""
                                        )}
                                        style={{
                                            backgroundColor: isActive
                                                ? `${tab.color}20`
                                                : "transparent",
                                        }}
                                    >
                                        <Icon
                                            className="w-5 h-5 transition-colors duration-300"
                                            style={{
                                                color: isActive
                                                    ? tab.color
                                                    : "var(--muted-foreground)",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h3
                                            className={cn(
                                                "font-medium transition-colors duration-300",
                                                isActive
                                                    ? "text-foreground"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            {tab.title}
                                        </h3>
                                        <p
                                            className={cn(
                                                "text-xs transition-colors duration-300",
                                                isActive
                                                    ? "text-muted-foreground"
                                                    : "text-muted-foreground/60"
                                            )}
                                        >
                                            {tab.subtitle}
                                        </p>
                                    </div>

                                    {/* Active Indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabIndicator"
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full hidden lg:block"
                                            style={{ backgroundColor: tab.color }}
                                            transition={transition}
                                        />
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Tab Content */}
                    <div className="relative min-h-[500px]">
                        <AnimatePresence mode="wait">
                            {activeContent && (
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={transition}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                                >
                                    {/* Text Content */}
                                    <div className="order-2 md:order-1">
                                        <motion.h3
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="text-2xl md:text-3xl font-heading font-light text-foreground mb-4"
                                        >
                                            {activeContent.heading}
                                        </motion.h3>
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15 }}
                                            className="text-muted-foreground leading-relaxed mb-6"
                                        >
                                            {activeContent.description}
                                        </motion.p>

                                        {/* Features List */}
                                        <ul className="space-y-3 mb-8">
                                            {activeContent.features.map((feature, index) => (
                                                <motion.li
                                                    key={feature}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.2 + index * 0.05 }}
                                                    className="flex items-start gap-3 text-sm"
                                                >
                                                    <CheckCircle
                                                        className="w-5 h-5 mt-0.5 flex-shrink-0"
                                                        style={{ color: activeColor }}
                                                    />
                                                    <span className="text-muted-foreground">
                                                        {feature}
                                                    </span>
                                                </motion.li>
                                            ))}
                                        </ul>

                                        {/* Stats */}
                                        {activeContent.stats && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                                className="flex gap-6"
                                            >
                                                {activeContent.stats.map((stat, index) => (
                                                    <div key={stat.label}>
                                                        <p
                                                            className="text-2xl font-heading font-bold"
                                                            style={{ color: activeColor }}
                                                        >
                                                            {stat.value}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {stat.label}
                                                        </p>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Image */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="order-1 md:order-2 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
                                    >
                                        <img
                                            src={activeContent.image}
                                            alt={activeContent.heading}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
