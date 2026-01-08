"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    avatar: string;
    content: string;
    rating: number;
    project?: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Aravind & Priya",
        role: "Wedding Couple",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aravind",
        content: "JD PhotoMoments exceeded all our expectations. They captured not just photos, but the essence of our entire wedding celebration. Every frame tells our love story perfectly.",
        rating: 5,
        project: "Traditional Wedding | Chennai",
    },
    {
        id: 2,
        name: "Vikram Sethi",
        role: "CEO, TechInnovations",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
        content: "The corporate headshots they delivered transformed our entire company's image. Professional, efficient, and the results speak for themselves.",
        rating: 5,
        project: "Corporate Portraits | 50+ Employees",
    },
    {
        id: 3,
        name: "Meera Reddy",
        role: "Event Coordinator",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera",
        content: "Working with JD PhotoMoments for our annual gala was a dream. They understood our vision instantly and delivered stunning coverage of every moment.",
        rating: 5,
        project: "Annual Corporate Gala | 500 Attendees",
    },
    {
        id: 4,
        name: "Sanjay Kumar",
        role: "Father of the Bride",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjay",
        content: "They were everywhere and nowhere at the same time – capturing every precious moment without being intrusive. The wedding album is a masterpiece our family treasures.",
        rating: 5,
        project: "Destination Wedding | Goa",
    },
];

const transition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
} as const;

export function EmptyTestimonial() {
    const [activeIndex, setActiveIndex] = useState(0);

    const next = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const activeTestimonial = testimonials[activeIndex];

    return (
        <section className="w-full py-20 px-4 md:px-8 bg-gradient-to-br from-muted/30 via-background to-muted/30">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-label text-primary mb-4">Testimonials</p>
                    <h2 className="heading-section text-foreground">What Our Clients Say</h2>
                </motion.div>

                {/* Main Testimonial Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Quote Icon Background */}
                    <Quote className="absolute -top-8 -left-4 w-24 h-24 text-primary/10 rotate-180" />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTestimonial.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={transition}
                            className="relative bg-background rounded-[3rem] p-10 md:p-16 border border-border shadow-2xl shadow-primary/5"
                        >
                            {/* Rating */}
                            <div className="flex gap-1 mb-8">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Star
                                            className={cn(
                                                "w-6 h-6",
                                                i < activeTestimonial.rating
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-muted"
                                            )}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Content */}
                            <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif text-foreground leading-relaxed mb-10 italic">
                                "{activeTestimonial.content}"
                            </blockquote>

                            {/* Author */}
                            <div className="flex items-center justify-between flex-wrap gap-6">
                                <div className="flex items-center gap-4">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-16 h-16 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg"
                                    >
                                        <img
                                            src={activeTestimonial.avatar}
                                            alt={activeTestimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                    <div>
                                        <h4 className="font-heading font-semibold text-lg text-foreground">
                                            {activeTestimonial.name}
                                        </h4>
                                        <p className="text-muted-foreground text-sm">
                                            {activeTestimonial.role}
                                        </p>
                                        {activeTestimonial.project && (
                                            <p className="text-primary text-xs mt-1">
                                                {activeTestimonial.project}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Navigation */}
                                <div className="flex gap-3">
                                    <motion.button
                                        onClick={prev}
                                        className="p-4 rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ChevronLeft className="w-5 h-5 text-foreground" />
                                    </motion.button>
                                    <motion.button
                                        onClick={next}
                                        className="p-4 rounded-full bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20 transition-all"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={cn(
                                    "transition-all duration-300",
                                    index === activeIndex
                                        ? "w-8 h-2 rounded-full bg-primary"
                                        : "w-2 h-2 rounded-full bg-muted hover:bg-primary/50"
                                )}
                                whileHover={{ scale: 1.2 }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Floating Avatars */}
                <div className="flex justify-center gap-3 mt-12">
                    {testimonials.map((testimonial, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <motion.button
                                key={testimonial.id}
                                onClick={() => setActiveIndex(index)}
                                className={cn(
                                    "relative rounded-full overflow-hidden transition-all duration-300",
                                    isActive
                                        ? "w-14 h-14 ring-4 ring-primary shadow-lg"
                                        : "w-12 h-12 opacity-50 hover:opacity-100"
                                )}
                                whileHover={{ scale: 1.1 }}
                            >
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-full h-full object-cover"
                                />
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
