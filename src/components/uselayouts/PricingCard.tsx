"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Check, Camera, Star, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PricingTier {
    id: string;
    name: string;
    icon: React.ElementType;
    description: string;
    price: {
        wedding: string;
        event: string;
    };
    features: string[];
    popular?: boolean;
    accentColor: string;
}

const PRICING_TIERS: PricingTier[] = [
    {
        id: "essential",
        name: "Essential",
        icon: Camera,
        description: "Perfect for intimate gatherings and small events",
        price: {
            wedding: "₹45,000",
            event: "₹25,000",
        },
        features: [
            "4 hours coverage",
            "1 photographer",
            "150+ edited photos",
            "Online gallery",
            "Print-ready files",
        ],
        accentColor: "#60A5FA",
    },
    {
        id: "premium",
        name: "Premium",
        icon: Star,
        description: "Our most popular package for comprehensive coverage",
        price: {
            wedding: "₹85,000",
            event: "₹45,000",
        },
        features: [
            "Full day coverage",
            "2 photographers",
            "300+ edited photos",
            "Candid + posed shots",
            "Premium photo album",
            "Highlight video",
            "Same-day previews",
        ],
        popular: true,
        accentColor: "#F472B6",
    },
    {
        id: "luxury",
        name: "Luxury",
        icon: Crown,
        description: "The complete experience for your special moments",
        price: {
            wedding: "₹1,50,000",
            event: "₹85,000",
        },
        features: [
            "Multi-day coverage",
            "3 photographers + videographer",
            "500+ edited photos",
            "Cinematic wedding film",
            "Luxury leather album",
            "Pre-wedding session included",
            "Drone coverage",
            "Live streaming",
        ],
        accentColor: "#FBBF24",
    },
];

const transition = {
    type: "spring",
    stiffness: 400,
    damping: 30,
} as const;

export function PricingCard() {
    const [category, setCategory] = useState<"wedding" | "event">("wedding");
    const [selectedTier, setSelectedTier] = useState<string>("premium");

    return (
        <section className="w-full py-20 px-4 md:px-8 bg-gradient-to-b from-muted/30 to-background">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="text-label text-primary mb-4">Investment</p>
                    <h2 className="heading-section text-foreground mb-4">Photography Packages</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Transparent pricing for all our services. Every package includes our signature editing style and quality.
                    </p>
                </motion.div>

                {/* Category Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex items-center gap-1 p-1.5 bg-muted rounded-full">
                        <button
                            onClick={() => setCategory("wedding")}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                                category === "wedding"
                                    ? "bg-background text-foreground shadow-md"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Wedding
                        </button>
                        <button
                            onClick={() => setCategory("event")}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative",
                                category === "event"
                                    ? "bg-background text-foreground shadow-md"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            Event
                            <span className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full">
                                20% OFF
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {PRICING_TIERS.map((tier, index) => {
                        const Icon = tier.icon;
                        const isSelected = selectedTier === tier.id;

                        return (
                            <motion.div
                                key={tier.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedTier(tier.id)}
                                className={cn(
                                    "relative rounded-[2rem] p-8 cursor-pointer transition-all duration-300",
                                    "border-2 backdrop-blur-sm",
                                    isSelected
                                        ? "bg-background shadow-2xl scale-[1.02] border-primary"
                                        : "bg-background/50 border-border hover:border-primary/50 hover:shadow-lg",
                                    tier.popular && "md:-translate-y-4"
                                )}
                            >
                                {/* Popular Badge */}
                                {tier.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="px-4 py-1.5 bg-gradient-to-r from-primary to-pink-500 text-white text-xs font-bold rounded-full shadow-lg"
                                        >
                                            Most Popular
                                        </motion.div>
                                    </div>
                                )}

                                {/* Selection Indicator */}
                                <motion.div
                                    className={cn(
                                        "absolute top-6 right-6 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                                        isSelected
                                            ? "bg-primary border-primary"
                                            : "border-border"
                                    )}
                                >
                                    <AnimatePresence>
                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                            >
                                                <Check className="w-4 h-4 text-white" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Icon */}
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                                    style={{ backgroundColor: `${tier.accentColor}20` }}
                                >
                                    <Icon
                                        className="w-7 h-7"
                                        style={{ color: tier.accentColor }}
                                    />
                                </div>

                                {/* Tier Name */}
                                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                                    {tier.name}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    {tier.description}
                                </p>

                                {/* Price */}
                                <div className="mb-8">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={category}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex items-baseline gap-2"
                                        >
                                            <span className="text-4xl font-heading font-bold text-foreground">
                                                {tier.price[category]}
                                            </span>
                                            <span className="text-muted-foreground text-sm">
                                                / package
                                            </span>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feature, featureIndex) => (
                                        <motion.li
                                            key={feature}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: featureIndex * 0.05 }}
                                            className="flex items-center gap-3 text-sm text-muted-foreground"
                                        >
                                            <div
                                                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                                style={{ backgroundColor: `${tier.accentColor}20` }}
                                            >
                                                <Check
                                                    className="w-3 h-3"
                                                    style={{ color: tier.accentColor }}
                                                />
                                            </div>
                                            {feature}
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <Button
                                    variant={isSelected ? "default" : "outline"}
                                    className="w-full rounded-full h-12"
                                    asChild
                                >
                                    <Link to="/contact">
                                        {isSelected ? "Book Now" : "Select Package"}
                                    </Link>
                                </Button>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Custom Quote CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-muted-foreground mb-4">
                        Need a custom package? We create tailored solutions for every project.
                    </p>
                    <Button variant="link" className="text-primary" asChild>
                        <Link to="/contact">Request a Custom Quote →</Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
