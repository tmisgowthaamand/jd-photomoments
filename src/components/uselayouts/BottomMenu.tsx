"use client";

import {
    Home01Icon,
    ShoppingBasket01Icon,
    Image01Icon,
    UserEdit01Icon,
    SentIcon,
    Sun03Icon,
    Moon02Icon,
    ComputerIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React, { useMemo, useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";

// Adjusted for jd-photomoments
const MAIN_NAV = [
    { icon: Home01Icon, name: "home", path: "/" },
    { icon: ShoppingBasket01Icon, name: "services", path: "/services" },
    { icon: Image01Icon, name: "portfolio", path: "/portfolio" },
    { icon: UserEdit01Icon, name: "about", path: "/about" },
    { icon: SentIcon, name: "contact", path: "/contact" },
];

const THEME_OPTIONS = [
    { key: "light", icon: Sun03Icon, text: "Light" },
    { key: "dark", icon: Moon02Icon, text: "Dark" },
    { key: "system", icon: ComputerIcon, text: "System" },
];

const BottomMenu = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [elementRef] = useMeasure();
    const [hiddenRef, hiddenBounds] = useMeasure();
    const [view, setView] = useState<
        "default" | "theme"
    >("default");

    const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setView("default");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const sharedHover =
        "group transition-all duration-75 px-3 py-2 text-[15px] text-muted-foreground w-full text-left rounded-[12px] hover:bg-muted/80 hover:text-foreground";

    const content = useMemo(() => {
        switch (view) {
            case "theme":
                return (
                    <div className="flex items-center justify-between gap-1.5 min-w-[270px] p-[6px] py-0.5">
                        {THEME_OPTIONS.map(({ key, icon: Icon, text }) => (
                            <button
                                key={key}
                                onClick={() => setTheme(key as "light" | "dark" | "system")}
                                className={`flex items-center justify-center gap-2 rounded-[12px] px-3 py-2 transition-all duration-100 ${theme === key
                                        ? "bg-accent text-foreground"
                                        : "text-muted-foreground hover:bg-muted"
                                    }`}
                            >
                                <HugeiconsIcon
                                    icon={Icon}
                                    size={18}
                                    className={`transition-all duration-75 ${theme === key ? "text-foreground" : "text-muted-foreground"
                                        }`}
                                />
                                <span>{text}</span>
                            </button>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    }, [view, theme, sharedHover]);

    return (
        <div
            ref={containerRef}
            className={cn("fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center")}
        >
            <div
                ref={hiddenRef}
                className="absolute left-[-9999px] top-[-9999px] invisible pointer-events-none"
            >
                <div className="rounded-[18px] bg-background/95 border border-border py-1">
                    {content}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {view !== "default" && (
                    <motion.div
                        key="submenu"
                        initial={{
                            opacity: 0,
                            scaleY: 0.9,
                            scaleX: 0.95,
                            height: 0,
                            width: 0,
                            originY: 1,
                            originX: 0.5,
                        }}
                        animate={{
                            opacity: 1,
                            scaleY: 1,
                            scaleX: 1,
                            height: hiddenBounds.height || "auto",
                            width: hiddenBounds.width || "auto",
                            originY: 1,
                            originX: 0.5,
                        }}
                        exit={{
                            opacity: 0,
                            scaleY: 0.9,
                            scaleX: 0.95,
                            height: 0,
                            width: 0,
                            originY: 1,
                            originX: 0.5,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: [0.45, 0, 0.25, 1],
                        }}
                        style={{
                            transformOrigin: "bottom center",
                        }}
                        className="absolute bottom-[70px] overflow-hidden"
                    >
                        <div
                            ref={elementRef}
                            className="rounded-[18px] bg-background/95 backdrop-blur-xl border border-border"
                        >
                            <AnimatePresence initial={false} mode="popLayout">
                                <motion.div
                                    key={view}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.96,
                                        filter: "blur(10px)",
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        filter: "blur(0px)",
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.95,
                                        filter: "blur(12px)",
                                    }}
                                    transition={{
                                        duration: 0.25,
                                        ease: [0.42, 0, 0.58, 1],
                                    }}
                                    className="py-1"
                                >
                                    {content}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-1 bg-background/80 backdrop-blur-xl border border-border/50 rounded-[20px] p-1.5 shadow-2xl">
                {MAIN_NAV.map(({ icon: Icon, name, path }) => (
                    <button
                        key={name}
                        className={`p-3 rounded-[16px] transition-all relative group ${window.location.pathname === path ? "bg-primary/10" : "hover:bg-muted/50"
                            }`}
                        onClick={() => navigate(path)}
                    >
                        <HugeiconsIcon
                            icon={Icon}
                            size={22}
                            className={`transition-all ${window.location.pathname === path ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                }`}
                        />
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-wider font-semibold">
                            {name}
                        </span>
                    </button>
                ))}
                <div className="w-px h-6 bg-border/50 mx-1" />
                <button
                    className={`p-3 rounded-[16px] transition-all ${view === 'theme' ? "bg-accent" : "hover:bg-muted"
                        }`}
                    onClick={() => setView(view === 'theme' ? 'default' : 'theme')}
                >
                    <HugeiconsIcon
                        icon={theme === 'light' ? Sun03Icon : theme === 'dark' ? Moon02Icon : ComputerIcon}
                        size={22}
                        className={`transition-all ${view === 'theme' ? "text-foreground" : "text-muted-foreground"
                            }`}
                    />
                </button>
            </div>
        </div>
    );
};

export default BottomMenu;
