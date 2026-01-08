"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Grid3X3, LayoutGrid, Rows3, SlidersHorizontal, X, Check } from "lucide-react";

type FilterCategory = "All" | "Weddings" | "Pre-Weddings" | "Events" | "Portraits" | "Commercial";

interface DynamicToolbarProps {
    categories?: FilterCategory[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    viewMode?: "grid" | "masonry" | "list";
    onViewModeChange?: (mode: "grid" | "masonry" | "list") => void;
    showViewToggle?: boolean;
    className?: string;
}

const VIEW_MODES = [
    { key: "grid" as const, icon: Grid3X3, label: "Grid" },
    { key: "masonry" as const, icon: LayoutGrid, label: "Masonry" },
    { key: "list" as const, icon: Rows3, label: "List" },
];

const transition = {
    type: "spring",
    stiffness: 400,
    damping: 30,
} as const;

export function DynamicToolbar({
    categories = ["All", "Weddings", "Pre-Weddings", "Events", "Portraits", "Commercial"],
    activeCategory,
    onCategoryChange,
    viewMode = "grid",
    onViewModeChange,
    showViewToggle = true,
    className,
}: DynamicToolbarProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    return (
        <motion.div
            className={cn(
                "relative flex flex-col items-center gap-4",
                className
            )}
        >
            {/* Main Toolbar */}
            <motion.div
                layout
                className={cn(
                    "flex items-center gap-2 p-2 rounded-full",
                    "bg-background/80 backdrop-blur-xl border border-border/50",
                    "shadow-xl shadow-black/5"
                )}
            >
                {/* Filter Toggle (Mobile) */}
                <motion.button
                    className="md:hidden p-3 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                    onClick={() => setShowFilters(!showFilters)}
                    whileTap={{ scale: 0.95 }}
                >
                    {showFilters ? (
                        <X className="w-5 h-5 text-muted-foreground" />
                    ) : (
                        <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
                    )}
                </motion.button>

                {/* Categories (Desktop) */}
                <div className="hidden md:flex items-center gap-1">
                    {categories.map((category) => {
                        const isActive = activeCategory === category;
                        return (
                            <motion.button
                                key={category}
                                onClick={() => onCategoryChange(category)}
                                className={cn(
                                    "relative px-4 py-2.5 rounded-full text-sm font-medium transition-colors duration-200",
                                    isActive
                                        ? "text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Active Background */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeCategory"
                                        className="absolute inset-0 bg-primary rounded-full shadow-md"
                                        transition={transition}
                                    />
                                )}
                                <span className="relative z-10">{category}</span>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Divider */}
                {showViewToggle && (
                    <div className="hidden md:block w-px h-8 bg-border/50 mx-2" />
                )}

                {/* View Mode Toggle */}
                {showViewToggle && onViewModeChange && (
                    <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-full">
                        {VIEW_MODES.map(({ key, icon: Icon, label }) => {
                            const isActive = viewMode === key;
                            return (
                                <motion.button
                                    key={key}
                                    onClick={() => onViewModeChange(key)}
                                    className={cn(
                                        "p-2.5 rounded-full transition-colors duration-200",
                                        isActive
                                            ? "bg-background text-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                    whileTap={{ scale: 0.95 }}
                                    title={label}
                                >
                                    <Icon className="w-4 h-4" />
                                </motion.button>
                            );
                        })}
                    </div>
                )}
            </motion.div>

            {/* Mobile Filter Dropdown */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={transition}
                        className="md:hidden absolute top-full mt-2 p-3 rounded-2xl bg-background/95 backdrop-blur-xl border border-border shadow-2xl"
                    >
                        <div className="flex flex-wrap gap-2 max-w-[300px]">
                            {categories.map((category) => {
                                const isActive = activeCategory === category;
                                return (
                                    <motion.button
                                        key={category}
                                        onClick={() => {
                                            onCategoryChange(category);
                                            setShowFilters(false);
                                        }}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted text-muted-foreground hover:text-foreground"
                                        )}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {isActive && <Check className="w-3 h-3" />}
                                        {category}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Compact Filter Pills variant
export function FilterPills({
    categories = ["All", "Weddings", "Pre-Weddings", "Events", "Portraits", "Commercial"],
    activeCategory,
    onCategoryChange,
    className,
}: Omit<DynamicToolbarProps, 'viewMode' | 'onViewModeChange' | 'showViewToggle'>) {
    return (
        <div className={cn("flex flex-wrap gap-2 justify-center", className)}>
            {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                    <motion.button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={cn(
                            "relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                            "border",
                            isActive
                                ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                                : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {category}
                    </motion.button>
                );
            })}
        </div>
    );
}
