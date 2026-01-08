
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TextReveal } from "./TextReveal";
import { MagneticButton } from "./MagneticButton";
import { ArrowDown } from "lucide-react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { useTheme } from "@/components/ui/theme-provider";

export function Hero() {
    const { theme } = useTheme();
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    return (
        <WavyBackground
            containerClassName="relative min-h-[100dvh] flex items-center overflow-hidden"
            className="w-full"
            colors={isDark ? ["#d4a373", "#e6ccb2", "#9c6644", "#7f5539", "#b08968"] : ["#9c6644", "#7f5539", "#5D3A29", "#4A2F21", "#d4a373"]} // Darker tones for light mode contrast
            backgroundFill={isDark ? "#1c1917" : "#fafaf9"}
            waveWidth={50}
            blur={8}
            speed="slow"
            waveOpacity={0.3}
            waveYPos={0.75}
        >
            {/* Content */}
            <div className="container-studio relative z-10 pt-20">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="flex items-center gap-2 mb-6"
                    >
                        <span className="h-px w-10 bg-primary/80"></span>
                        <p className="text-label tracking-widest text-sm font-semibold uppercase">
                            Professional Photography Studio
                        </p>
                    </motion.div>

                    <div className="heading-display mb-8 overflow-hidden text-foreground">
                        <TextReveal text="Moments That" className="block" delay={0.2} />
                        <div className="italic font-serif text-primary">
                            <TextReveal text="Last Forever" delay={0.4} />
                        </div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-lg md:text-xl text-foreground font-medium leading-relaxed mb-10 max-w-xl"
                    >
                        We capture weddings, events, portraits, and commercial projects
                        with artistry and care. Every shoot is handled by our experienced
                        team with meticulous attention to detail.
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <MagneticButton>
                            <Button variant="default" size="xl" asChild className="rounded-full px-8 h-14 text-base font-medium shadow-lg hover:shadow-xl transition-all">
                                <Link to="/contact">Enquire About Your Shoot</Link>
                            </Button>
                        </MagneticButton>

                        <MagneticButton>
                            <Button variant="outline" size="xl" asChild className="rounded-full px-8 h-14 text-base backdrop-blur-sm transition-all bg-transparent/10 hover:bg-background/20 border-foreground/20">
                                <Link to="/portfolio">View Our Work</Link>
                            </Button>
                        </MagneticButton>
                    </div>
                </div>
            </div>

            {/* Animated Scroll Indicator - Positioned absolutely relative to the container */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                        <ArrowDown className="w-4 h-4" />
                    </motion.div>
                </div>
            </motion.div>
        </WavyBackground>
    );
}
