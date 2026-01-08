
import {
    KeyframeOptions,
    animate,
    useInView,
    useIsomorphicLayoutEffect,
} from "motion/react";
import { useRef } from "react";

type CounterProps = {
    from?: number;
    to: number;
    animationOptions?: KeyframeOptions;
    className?: string;
    suffix?: string;
};

export const Counter = ({
    from = 0,
    to,
    animationOptions,
    className,
    suffix = "",
}: CounterProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });

    useIsomorphicLayoutEffect(() => {
        const element = ref.current;

        if (!element) return;
        if (!inView) return;

        // Set initial value
        element.textContent = String(from) + suffix;

        // If reduced motion is enabled in system's preferences
        if (window.matchMedia("(prefers-reduced-motion)").matches) {
            element.textContent = String(to) + suffix;
            return;
        }

        const controls = animate(from, to, {
            duration: 2,
            ease: "easeOut",
            ...animationOptions,
            onUpdate(value) {
                element.textContent = value.toFixed(0) + suffix;
            },
        });

        return () => {
            controls.stop();
        };
    }, [ref, inView, from, to, suffix]);

    return <span className={className} ref={ref} />;
};
