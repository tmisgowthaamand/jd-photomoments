"use client";

import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import React, { useState, useId, useRef } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Button } from "@/components/ui/button";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

import weddingImage from '@/assets/hero-wedding.jpg';
import weddingDetail from '@/assets/wedding-detail.jpg';
import weddingCeremony from '@/assets/wedding-ceremony.jpg';
import eventImage from '@/assets/event-sample.jpg';
import portraitImage from '@/assets/portrait-sample.jpg';
import portraitCorporate from '@/assets/portrait-corporate.jpg';

const PHOTOS = [
    {
        id: "photo-1",
        src: weddingImage,
        alt: "Wedding moments",
        rotation: -15,
        x: -90,
        y: 10,
        zIndex: 10,
    },
    {
        id: "photo-2",
        src: weddingCeremony,
        alt: "Ceremony capture",
        rotation: -3,
        x: -10,
        y: -15,
        zIndex: 20,
    },
    {
        id: "photo-3",
        src: eventImage,
        alt: "Corporate events",
        rotation: 12,
        x: 75,
        y: 5,
        zIndex: 30,
    },
    {
        id: "photo-4",
        src: portraitImage,
        alt: "Portraits",
    },
    {
        id: "photo-5",
        src: weddingDetail,
        alt: "Bridal detail",
    },
    {
        id: "photo-6",
        src: portraitCorporate,
        alt: "Professional headshots",
    },
];

const transition = {
    type: "spring",
    stiffness: 160,
    damping: 18,
    mass: 1,
} as const;

export function ExpandableGallery() {
    const [isExpanded, setIsExpanded] = useState(false);
    const layoutGroupId = useId();
    const containerRef = useRef<HTMLDivElement>(null);

    useOutsideClick(containerRef, () => {
        if (isExpanded) {
            setIsExpanded(false);
        }
    });

    return (
        <section className="relative w-full px-4 md:px-8 py-20 bg-background flex flex-col items-center justify-start min-h-[700px] overflow-hidden">
            <LayoutGroup id={layoutGroupId}>
                <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
                    <div className="w-full h-12 flex items-center justify-between px-4 mb-2">
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.button
                                    key="back-button"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    onClick={() => setIsExpanded(false)}
                                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all group z-50 pointer-events-auto"
                                >
                                    <div className="p-2 rounded-full bg-muted group-hover:bg-accent transition-colors text-foreground">
                                        <HugeiconsIcon
                                            icon={ArrowLeft01Icon}
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <span className="font-medium">Close Gallery</span>
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>

                    <motion.div
                        ref={containerRef}
                        layout
                        className={cn(
                            "relative w-full",
                            isExpanded
                                ? "grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4"
                                : "flex flex-col items-center justify-start pt-4"
                        )}
                        transition={transition}
                    >
                        <div
                            className={cn(
                                "relative",
                                isExpanded
                                    ? "contents"
                                    : "h-[450px] w-full flex items-center justify-center mb-8"
                            )}
                        >
                            {PHOTOS.map((photo, index) => {
                                const isPrimary = index < 3;
                                if (!isPrimary && !isExpanded) return null;

                                return (
                                    <motion.div
                                        key={`card-${photo.id}`}
                                        layoutId={`card-container-${photo.id}`}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            rotate: !isExpanded ? photo.rotation || 0 : 0,
                                            x: !isExpanded ? photo.x || 0 : 0,
                                            y: !isExpanded ? photo.y || 0 : 0,
                                            zIndex: !isExpanded ? photo.zIndex || index : 10,
                                        }}
                                        transition={transition}
                                        whileHover={
                                            !isExpanded
                                                ? {
                                                    scale: 1.05,
                                                    y: (photo.y || 0) - 15,
                                                    rotate: (photo.rotation || 0) * 0.8,
                                                    zIndex: 50,
                                                    transition: {
                                                        type: "spring",
                                                        stiffness: 400,
                                                        damping: 25,
                                                    },
                                                }
                                                : { scale: 1.02 }
                                        }
                                        className={cn(
                                            "cursor-pointer overflow-hidden bg-muted",
                                            isExpanded
                                                ? "relative aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] border-4 md:border-[6px] border-background shadow-lg"
                                                : "absolute w-44 h-56 md:w-64 md:h-80 rounded-[2rem] md:rounded-[2.5rem] border-[6px] border-background shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                                        )}
                                        onClick={() => !isExpanded && setIsExpanded(true)}
                                    >
                                        <motion.div
                                            layoutId={`image-inner-${photo.id}`}
                                            layout="position"
                                            className="w-full h-full relative"
                                            transition={transition}
                                        >
                                            <img
                                                src={photo.src}
                                                alt={photo.alt}
                                                className="w-full h-full object-cover select-none pointer-events-none"
                                            />
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <AnimatePresence>
                            {!isExpanded && (
                                <motion.div
                                    key="stack-content"
                                    initial={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="text-center max-w-2xl space-y-8 z-10"
                                >
                                    <h2 className="text-3xl md:text-5xl font-light tracking-tight text-foreground/90 leading-tight font-serif italic">
                                        Capturing the essence <br /> of your most precious moments.
                                    </h2>

                                    <div className="flex justify-center">
                                        <Button
                                            variant="default"
                                            onClick={() => setIsExpanded(true)}
                                            className="rounded-full cursor-pointer py-6 px-10 border-border/40 font-medium group text-lg shadow-xl hover:shadow-2xl transition-all"
                                        >
                                            Explore Our Story
                                            <HugeiconsIcon
                                                icon={ArrowRight01Icon}
                                                className="transition-transform group-hover:translate-x-1 ml-2"
                                                width={20}
                                                height={20}
                                            />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </LayoutGroup>
        </section>
    );
}
