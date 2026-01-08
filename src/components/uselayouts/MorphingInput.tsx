"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Search, X, ArrowRight, Send, User, Mail, Phone, MessageSquare } from "lucide-react";

interface MorphingInputProps {
    placeholder?: string;
    icon?: React.ElementType;
    onSubmit?: (value: string) => void;
    variant?: "search" | "email" | "message";
    className?: string;
}

const VARIANTS = {
    search: {
        icon: Search,
        placeholder: "Search our services...",
        submitIcon: ArrowRight,
    },
    email: {
        icon: Mail,
        placeholder: "Enter your email address",
        submitIcon: Send,
    },
    message: {
        icon: MessageSquare,
        placeholder: "Type your message...",
        submitIcon: Send,
    },
};

const transition = {
    type: "spring",
    stiffness: 400,
    damping: 30,
} as const;

export function MorphingInput({
    placeholder,
    icon,
    onSubmit,
    variant = "search",
    className,
}: MorphingInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const config = VARIANTS[variant];
    const Icon = icon || config.icon;
    const SubmitIcon = config.submitIcon;
    const displayPlaceholder = placeholder || config.placeholder;

    const handleSubmit = async () => {
        if (!value.trim()) return;

        setIsSubmitting(true);
        await onSubmit?.(value);

        setTimeout(() => {
            setIsSubmitting(false);
            setValue("");
            inputRef.current?.blur();
        }, 1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
        if (e.key === "Escape") {
            setValue("");
            inputRef.current?.blur();
        }
    };

    return (
        <motion.div
            className={cn(
                "relative",
                className
            )}
            animate={{
                width: isFocused ? "100%" : "auto",
            }}
            transition={transition}
        >
            <motion.div
                className={cn(
                    "relative flex items-center gap-3 rounded-full overflow-hidden",
                    "border transition-all duration-300",
                    isFocused
                        ? "bg-background border-primary shadow-lg shadow-primary/10"
                        : "bg-muted/50 border-border hover:border-primary/50"
                )}
                animate={{
                    paddingLeft: isFocused ? 20 : 16,
                    paddingRight: isFocused ? 8 : 16,
                    paddingTop: 12,
                    paddingBottom: 12,
                }}
                transition={transition}
            >
                {/* Icon */}
                <motion.div
                    animate={{
                        scale: isFocused ? 0.9 : 1,
                        opacity: isFocused ? 0.5 : 1,
                    }}
                    transition={transition}
                >
                    <Icon className="w-5 h-5 text-muted-foreground" />
                </motion.div>

                {/* Input */}
                <input
                    ref={inputRef}
                    type={variant === "email" ? "email" : "text"}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    onKeyDown={handleKeyDown}
                    placeholder={displayPlaceholder}
                    className={cn(
                        "flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground",
                        "min-w-[200px] text-base"
                    )}
                />

                {/* Clear Button */}
                <AnimatePresence>
                    {value && !isSubmitting && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            onClick={() => setValue("")}
                            className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Submit Button */}
                <AnimatePresence>
                    {(isFocused || value) && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5, x: -10 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.5, x: -10 }}
                            transition={transition}
                            onClick={handleSubmit}
                            disabled={!value.trim() || isSubmitting}
                            className={cn(
                                "p-3 rounded-full transition-all duration-300",
                                value.trim()
                                    ? "bg-primary text-primary-foreground hover:shadow-md"
                                    : "bg-muted text-muted-foreground"
                            )}
                        >
                            <motion.div
                                animate={{
                                    rotate: isSubmitting ? 360 : 0,
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: isSubmitting ? Infinity : 0,
                                    ease: "linear",
                                }}
                            >
                                <SubmitIcon className="w-5 h-5" />
                            </motion.div>
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Focus Ring */}
            <AnimatePresence>
                {isFocused && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 rounded-full bg-primary/5 -z-10"
                        style={{ margin: -4 }}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Contact Form with morphing inputs
export function MorphingContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const fields = [
        { id: "name", icon: User, placeholder: "Your Name", type: "text" },
        { id: "email", icon: Mail, placeholder: "Email Address", type: "email" },
        { id: "phone", icon: Phone, placeholder: "Phone Number", type: "tel" },
    ];

    return (
        <div className="space-y-4 max-w-md mx-auto">
            <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-heading font-semibold text-foreground mb-6 text-center"
            >
                Quick Contact
            </motion.h3>

            {fields.map((field, index) => {
                const Icon = field.icon;
                const isFocused = focusedField === field.id;

                return (
                    <motion.div
                        key={field.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <motion.div
                            className={cn(
                                "flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all duration-300",
                                isFocused
                                    ? "bg-background border-primary shadow-lg shadow-primary/10"
                                    : "bg-muted/30 border-border hover:border-primary/50"
                            )}
                            animate={{
                                scale: isFocused ? 1.02 : 1,
                            }}
                            transition={transition}
                        >
                            <motion.div
                                animate={{
                                    scale: isFocused ? 1.1 : 1,
                                    color: isFocused ? "var(--primary)" : "var(--muted-foreground)",
                                }}
                            >
                                <Icon className="w-5 h-5" />
                            </motion.div>
                            <input
                                type={field.type}
                                placeholder={field.placeholder}
                                value={formData[field.id as keyof typeof formData]}
                                onChange={(e) =>
                                    setFormData({ ...formData, [field.id]: e.target.value })
                                }
                                onFocus={() => setFocusedField(field.id)}
                                onBlur={() => setFocusedField(null)}
                                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                            />
                        </motion.div>
                    </motion.div>
                );
            })}

            {/* Message Field */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <motion.div
                    className={cn(
                        "flex items-start gap-3 px-5 py-4 rounded-2xl border transition-all duration-300",
                        focusedField === "message"
                            ? "bg-background border-primary shadow-lg shadow-primary/10"
                            : "bg-muted/30 border-border hover:border-primary/50"
                    )}
                    animate={{
                        scale: focusedField === "message" ? 1.02 : 1,
                    }}
                    transition={transition}
                >
                    <motion.div
                        className="mt-1"
                        animate={{
                            scale: focusedField === "message" ? 1.1 : 1,
                            color: focusedField === "message" ? "var(--primary)" : "var(--muted-foreground)",
                        }}
                    >
                        <MessageSquare className="w-5 h-5" />
                    </motion.div>
                    <textarea
                        placeholder="Tell us about your project..."
                        value={formData.message}
                        onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                        }
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        rows={4}
                        className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground resize-none"
                    />
                </motion.div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 px-6 rounded-2xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow"
            >
                <Send className="w-5 h-5" />
                Send Message
            </motion.button>
        </div>
    );
}
