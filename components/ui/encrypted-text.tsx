"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { cn } from "@/lib/utils";

interface HyperTextProps {
    text: string;
    duration?: number;
    framerProps?: Variants;
    className?: string;
    animateOnLoad?: boolean;
    delay?: number;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function HyperText({
    text,
    duration = 800,
    framerProps = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 3 },
    },
    className,
    animateOnLoad = true,
    delay = 0,
}: HyperTextProps) {
    const [displayText, setDisplayText] = useState(text.split(""));
    const [trigger, setTrigger] = useState(false);
    const interations = useRef(0);
    const isFirstRender = useRef(true);

    const triggerAnimation = () => {
        interations.current = 0;
        setTrigger(true);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;

        const startAnimation = () => {
            interval = setInterval(() => {
                if (!animateOnLoad && isFirstRender.current) {
                    clearInterval(interval);
                    isFirstRender.current = false;
                    return;
                }
                if (interations.current < text.length) {
                    setDisplayText((t) =>
                        t.map((l, i) =>
                            l === " "
                                ? l
                                : i <= interations.current
                                    ? text[i]
                                    : alphabets[Math.floor(Math.random() * 26)]
                        )
                    );
                    interations.current = interations.current + 0.1;
                } else {
                    setTrigger(false);
                    clearInterval(interval);
                }
            }, duration / (text.length * 10));
        };

        const timer = setTimeout(startAnimation, delay);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        }
    }, [text, duration, trigger, animateOnLoad, delay]);

    return (
        <div
            className="flex scale-100 cursor-default overflow-hidden py-2"
            onMouseEnter={triggerAnimation}
        >
            <AnimatePresence mode="wait">
                {displayText.map((letter, i) => (
                    <motion.h1
                        key={i}
                        className={cn("font-mono", className)}
                        {...framerProps}
                    >
                        {letter}
                    </motion.h1>
                ))}
            </AnimatePresence>
        </div>
    );
}
