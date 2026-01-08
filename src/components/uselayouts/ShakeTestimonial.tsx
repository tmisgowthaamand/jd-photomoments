"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    avatar: string;
    content: string;
    color: string;
    textColor: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Aravind & Priya",
        role: "Wedding Couple",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aravind",
        content:
            "The photos are absolutely breathtaking! JD PhotoMoments captured every single detail of our wedding with such elegance and emotion.",
        color: "#FDF4FF",
        textColor: "#701A75",
    },
    {
        id: 2,
        name: "Vikram Sethi",
        role: "CEO, TechInnovations",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
        content:
            "Incredible professional headshots. The team made me feel at ease and the results were beyond my expectations.",
        color: "#F0F9FF",
        textColor: "#075985",
    },
    {
        id: 3,
        name: "Meera Reddy",
        role: "Event Coordinator",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera",
        content:
            "JD PhotoMoments is our go-to for all corporate events. Their consistency and ability to capture candid moments is unparalleled.",
        color: "#F0FDF4",
        textColor: "#166534",
    },
    {
        id: 4,
        name: "Sanjay Kumar",
        role: "Father of the Bride",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sanjay",
        content:
            "A truly wonderful experience. They were unobtrusive yet captured everything. The wedding album is a masterpiece.",
        color: "#FFFBEB",
        textColor: "#92400E",
    },
];

export default function ShakeTestimonial() {
    const [cards, setCards] = useState(testimonials);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleNext = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);

        setTimeout(() => {
            setCards((prev) => {
                const [first, ...rest] = prev;
                return [...rest, first];
            });
            setIsAnimating(false);
        }, 600);
    }, [isAnimating]);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 4000); // Slower interval for readability
        return () => clearInterval(interval);
    }, [handleNext]);

    return (
        <div className="flex items-center justify-center w-full bg-transparent p-4 overflow-hidden py-10 min-h-[500px]">
            <div
                className="relative w-full max-w-[370px] h-[280px] lg:max-w-[440px] lg:h-[340px]"
                style={{ perspective: "1200px" }}
            >
                <AnimatePresence mode="popLayout">
                    {cards.map((card, index) => {
                        const isTop = index === 0;

                        return (
                            <motion.div
                                key={card.id}
                                layout
                                style={{
                                    backgroundColor: card.color,
                                    zIndex: testimonials.length - index,
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    transformOrigin: "center center",
                                    borderColor: `${card.textColor}20`,
                                }}
                                initial={{
                                    scale: 0.7,
                                    opacity: 0,
                                    y: 40,
                                    rotateX: -20,
                                }}
                                animate={{
                                    scale:
                                        isTop && isAnimating
                                            ? [1, 1.05, 1, 1.05, 1, 1, 0.9]
                                            : 1 - index * 0.05,
                                    y:
                                        isTop && isAnimating
                                            ? [0, 0, 0, 0, 0, 0, -300]
                                            : index * 15,
                                    rotateX:
                                        isTop && isAnimating ? [0, 0, 0, 0, 0, 0, 15] : -index * 2,
                                    x: isTop && isAnimating ? [0, -12, 12, -12, 12, 0, 0] : 0,
                                    rotate: isTop && isAnimating ? [0, -2, 2, -2, 2, 0, -5] : 0,

                                    opacity: index < 4 ? 1 : 0,

                                    transition:
                                        isTop && isAnimating
                                            ? {
                                                duration: 0.6,
                                                times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
                                                ease: "easeOut",
                                            }
                                            : {
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 30,
                                                mass: 0.6,
                                            },
                                }}
                                className={cn(
                                    "w-full h-full rounded-[40px] p-8 md:p-10 shadow-2xl",
                                    "border flex flex-col justify-between overflow-hidden",
                                    "cursor-pointer select-none backdrop-blur-3xl",
                                    "hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] transition-shadow duration-500"
                                )}
                                onClick={handleNext}
                            >
                                <div className="flex flex-col gap-6 ">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-14 h-14 bg-white/80 rounded-2xl shadow-inner border border-black/5 overflow-hidden shrink-0">
                                            <img
                                                src={card.avatar}
                                                className="w-full h-full object-cover"
                                                alt={card.name}
                                            />
                                        </div>

                                        <div className="flex flex-col justify-center">
                                            <h3
                                                className="font-bold text-lg md:text-xl leading-tight m-0"
                                                style={{ color: card.textColor }}
                                            >
                                                {card.name}
                                            </h3>
                                            <p
                                                className="text-xs lg:text-sm opacity-60 m-0 font-medium"
                                                style={{ color: card.textColor }}
                                            >
                                                {card.role}
                                            </p>
                                        </div>
                                    </div>
                                    <p
                                        className="text-lg md:text-xl font-serif font-medium leading-relaxed italic m-0"
                                        style={{ color: card.textColor }}
                                    >
                                        "{card.content}"
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
