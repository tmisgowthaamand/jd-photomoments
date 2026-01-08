"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { cn } from "@/lib/utils";
import { LayoutList, LayoutGrid, Layers, Image } from "lucide-react";

import weddingImage from '@/assets/hero-wedding.jpg';
import weddingDetail from '@/assets/wedding-detail.jpg';
import weddingCeremony from '@/assets/wedding-ceremony.jpg';
import eventImage from '@/assets/event-sample.jpg';
import portraitImage from '@/assets/portrait-sample.jpg';
import portraitCorporate from '@/assets/portrait-corporate.jpg';
import commercialImage from '@/assets/commercial-sample.jpg';
import preweddingImage from '@/assets/prewedding-sample.jpg';

interface CollectionItem {
    id: string;
    title: string;
    category: string;
    image: string;
    color: string;
}

const COLLECTION: CollectionItem[] = [
    {
        id: "item-1",
        title: "Cinematic Horizons",
        category: "Wedding",
        image: weddingImage,
        color: "#F472B6",
    },
    {
        id: "item-2",
        title: "Abstract Dreams",
        category: "Pre-Wedding",
        image: preweddingImage,
        color: "#A78BFA",
    },
    {
        id: "item-3",
        title: "Urban Nights",
        category: "Event",
        image: eventImage,
        color: "#60A5FA",
    },
    {
        id: "item-4",
        title: "Golden Moments",
        category: "Portrait",
        image: portraitImage,
        color: "#34D399",
    },
    {
        id: "item-5",
        title: "Eternal Beauty",
        category: "Wedding",
        image: weddingCeremony,
        color: "#F472B6",
    },
    {
        id: "item-6",
        title: "Corporate Edge",
        category: "Commercial",
        image: commercialImage,
        color: "#FBBF24",
    },
    {
        id: "item-7",
        title: "Delicate Details",
        category: "Wedding",
        image: weddingDetail,
        color: "#F472B6",
    },
    {
        id: "item-8",
        title: "Professional Aura",
        category: "Portrait",
        image: portraitCorporate,
        color: "#34D399",
    },
];

type ViewMode = "list" | "card" | "pack";

const VIEW_OPTIONS = [
    { key: "list" as ViewMode, icon: LayoutList, label: "List View" },
    { key: "card" as ViewMode, icon: LayoutGrid, label: "Card View" },
    { key: "pack" as ViewMode, icon: Layers, label: "Pack View" },
];

const transition = {
    type: "spring",
    stiffness: 350,
    damping: 30,
} as const;

export function AnimatedCollection() {
    const [viewMode, setViewMode] = useState<ViewMode>("card");
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <section className="w-full py-16 px-4 md:px-8 bg-background">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10"
                >
                    <div>
                        <h2 className="text-2xl md:text-3xl font-heading font-light text-foreground">
                            My Collection
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            {COLLECTION.length} curated photographs
                        </p>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center gap-1 p-1.5 bg-muted rounded-2xl">
                        {VIEW_OPTIONS.map(({ key, icon: Icon, label }) => (
                            <button
                                key={key}
                                onClick={() => setViewMode(key)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                                    viewMode === key
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="hidden md:inline">{label.split(' ')[0]}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Collection Grid */}
                <LayoutGroup>
                    <motion.div
                        layout
                        className={cn(
                            "w-full",
                            viewMode === "list" && "flex flex-col gap-3",
                            viewMode === "card" && "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
                            viewMode === "pack" && "relative h-[500px] flex items-center justify-center"
                        )}
                    >
                        <AnimatePresence mode="popLayout">
                            {COLLECTION.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    layoutId={item.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        rotate: viewMode === "pack"
                                            ? (index - COLLECTION.length / 2) * 5
                                            : 0,
                                        x: viewMode === "pack"
                                            ? (index - COLLECTION.length / 2) * 30
                                            : 0,
                                        y: viewMode === "pack"
                                            ? Math.sin(index) * 20
                                            : 0,
                                        zIndex: viewMode === "pack"
                                            ? hoveredItem === item.id
                                                ? 50
                                                : COLLECTION.length - index
                                            : 1,
                                    }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={transition}
                                    onHoverStart={() => setHoveredItem(item.id)}
                                    onHoverEnd={() => setHoveredItem(null)}
                                    whileHover={viewMode === "pack" ? {
                                        y: -30,
                                        scale: 1.1,
                                        rotate: 0,
                                        zIndex: 50,
                                    } : undefined}
                                    className={cn(
                                        "group cursor-pointer overflow-hidden bg-card",
                                        viewMode === "list" && "flex items-center gap-4 p-3 rounded-2xl border border-border hover:border-primary/50 transition-colors",
                                        viewMode === "card" && "aspect-[3/4] rounded-2xl border border-border hover:border-primary/50 transition-colors relative",
                                        viewMode === "pack" && "absolute w-48 h-64 rounded-2xl border-4 border-background shadow-2xl"
                                    )}
                                >
                                    {/* List View */}
                                    {viewMode === "list" && (
                                        <>
                                            <motion.div
                                                layoutId={`image-${item.id}`}
                                                className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </motion.div>
                                            <div className="flex-1 min-w-0">
                                                <motion.h3
                                                    layoutId={`title-${item.id}`}
                                                    className="font-medium text-foreground truncate"
                                                >
                                                    {item.title}
                                                </motion.h3>
                                                <motion.p
                                                    layoutId={`category-${item.id}`}
                                                    className="text-sm text-muted-foreground"
                                                >
                                                    {item.category}
                                                </motion.p>
                                            </div>
                                            <div
                                                className="w-3 h-3 rounded-full flex-shrink-0"
                                                style={{ backgroundColor: item.color }}
                                            />
                                        </>
                                    )}

                                    {/* Card View */}
                                    {viewMode === "card" && (
                                        <>
                                            <motion.div
                                                layoutId={`image-${item.id}`}
                                                className="absolute inset-0"
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </motion.div>
                                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                <motion.h3
                                                    layoutId={`title-${item.id}`}
                                                    className="font-medium text-white truncate"
                                                >
                                                    {item.title}
                                                </motion.h3>
                                                <motion.p
                                                    layoutId={`category-${item.id}`}
                                                    className="text-sm text-white/70"
                                                >
                                                    {item.category}
                                                </motion.p>
                                            </div>
                                            <div
                                                className="absolute top-3 right-3 w-2 h-2 rounded-full"
                                                style={{ backgroundColor: item.color }}
                                            />
                                        </>
                                    )}

                                    {/* Pack View */}
                                    {viewMode === "pack" && (
                                        <motion.div
                                            layoutId={`image-${item.id}`}
                                            className="w-full h-full"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                whileHover={{ opacity: 1 }}
                                                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 text-center"
                                            >
                                                <motion.h3
                                                    layoutId={`title-${item.id}`}
                                                    className="font-medium text-white"
                                                >
                                                    {item.title}
                                                </motion.h3>
                                                <motion.p
                                                    layoutId={`category-${item.id}`}
                                                    className="text-sm text-white/70"
                                                >
                                                    {item.category}
                                                </motion.p>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </LayoutGroup>
            </div>
        </section>
    );
}
