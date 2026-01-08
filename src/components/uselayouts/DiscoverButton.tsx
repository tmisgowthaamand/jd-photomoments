"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, Send, Loader2 } from "lucide-react";

interface DiscoverButtonProps {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    icon?: React.ElementType;
    loading?: boolean;
}

const sizeClasses = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-base gap-2.5",
    lg: "px-8 py-4 text-lg gap-3",
};

const variantClasses = {
    primary:
        "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30",
    secondary:
        "bg-background text-foreground border border-border hover:border-primary/50 hover:shadow-lg",
    ghost:
        "bg-transparent text-foreground hover:bg-muted",
};

export function DiscoverButton({
    variant = "primary",
    size = "md",
    children,
    href,
    onClick,
    className,
    icon: Icon = ArrowRight,
    loading = false,
}: DiscoverButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

    const content = (
        <>
            {/* Main Content */}
            <span className="relative z-10 font-medium">{children}</span>

            {/* Icon Container */}
            <motion.span
                className="relative z-10 flex items-center justify-center"
                animate={{
                    x: isHovered ? 4 : 0,
                    scale: isHovered ? 1.1 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                }}
            >
                {loading ? (
                    <Loader2 className={cn(
                        "animate-spin",
                        size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5"
                    )} />
                ) : (
                    <Icon
                        className={cn(
                            size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5"
                        )}
                    />
                )}
            </motion.span>

            {/* Shine Effect */}
            <motion.div
                className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                initial={false}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                    animate={{
                        x: isHovered ? "200%" : "-100%",
                    }}
                    transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                    }}
                />
            </motion.div>

            {/* Glow Effect */}
            <AnimatePresence>
                {isHovered && variant === "primary" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10"
                    />
                )}
            </AnimatePresence>
        </>
    );

    const sharedClasses = cn(
        "relative inline-flex items-center justify-center rounded-full overflow-hidden",
        "transition-all duration-300 cursor-pointer select-none",
        sizeClasses[size],
        variantClasses[variant],
        loading && "pointer-events-none opacity-80",
        className
    );

    if (href) {
        return (
            <motion.a
                ref={buttonRef as React.RefObject<HTMLAnchorElement>}
                href={href}
                className={sharedClasses}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileTap={{ scale: 0.98 }}
            >
                {content}
            </motion.a>
        );
    }

    return (
        <motion.button
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            onClick={onClick}
            className={sharedClasses}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
        >
            {content}
        </motion.button>
    );
}

// Pre-configured variants for common use cases
export function BookNowButton({ className, ...props }: Omit<DiscoverButtonProps, 'children' | 'icon'>) {
    return (
        <DiscoverButton
            variant="primary"
            size="lg"
            icon={Sparkles}
            className={className}
            {...props}
        >
            Book Your Session
        </DiscoverButton>
    );
}

export function SendEnquiryButton({ className, loading, ...props }: Omit<DiscoverButtonProps, 'children' | 'icon'>) {
    return (
        <DiscoverButton
            variant="primary"
            size="md"
            icon={Send}
            loading={loading}
            className={className}
            {...props}
        >
            {loading ? "Sending..." : "Send Enquiry"}
        </DiscoverButton>
    );
}

export function ViewPortfolioButton({ className, ...props }: Omit<DiscoverButtonProps, 'children'>) {
    return (
        <DiscoverButton
            variant="secondary"
            size="md"
            className={className}
            {...props}
        >
            View Portfolio
        </DiscoverButton>
    );
}
