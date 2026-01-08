
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-wedding.jpg";
import { TextReveal } from "./TextReveal";
import { MagneticButton } from "./MagneticButton";
import { ArrowDown } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
            {/* Background Image with Parallax-like scale effect on load */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-full h-full"
                >
                    <img
                        src={heroImage}
                        alt="Elegant bride in garden setting during golden hour"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 h-32 bottom-0 top-auto" />
            </div>

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
                        <p className="text-label text-white/90 tracking-widest text-sm font-semibold uppercase">
                            Professional Photography Studio
                        </p>
                    </motion.div>

                    <div className="heading-display text-white mb-8 overflow-hidden">
                        <TextReveal text="Moments That" className="block" delay={0.2} />
                        <div className="italic font-serif text-primary-foreground/90">
                            <TextReveal text="Last Forever" delay={0.4} />
                        </div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-xl font-light"
                    >
                        We capture weddings, events, portraits, and commercial projects
                        with artistry and care. Every shoot is handled by our experienced
                        team with meticulous attention to detail.
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <MagneticButton>
                            <Button variant="default" size="xl" asChild className="bg-white text-black hover:bg-gray-100 rounded-full px-8 h-14 text-base font-medium shadow-lg hover:shadow-xl transition-all">
                                <Link to="/contact">Enquire About Your Shoot</Link>
                            </Button>
                        </MagneticButton>

                        <MagneticButton>
                            <Button variant="outline" size="xl" asChild className="text-white border-white/30 hover:bg-white/10 hover:border-white rounded-full px-8 h-14 text-base backdrop-blur-sm transition-all bg-transparent">
                                <Link to="/portfolio">View Our Work</Link>
                            </Button>
                        </MagneticButton>
                    </div>
                </div>
            </div>

            {/* Animated Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
                <div className="flex flex-col items-center gap-2 text-white/60">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                        <ArrowDown className="w-4 h-4" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
