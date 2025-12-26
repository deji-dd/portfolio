"use client";
import React, { useEffect, useState } from "react";
import { animate, motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
    SiNextdotjs,
    SiReact,
    SiTailwindcss,
    SiDocker,
    SiLinux,
} from "react-icons/si";

export function TechStackCard() {
    return (
        <Card>
            <CardSkeletonContainer>
                <Skeleton />
            </CardSkeletonContainer>
        </Card>
    );
}

const Skeleton = () => {
    const scale = [1, 1.1, 1];
    const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"];
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sequence: any = [
            [
                ".circle-1",
                {
                    scale,
                    transform,
                },
                { duration: 0.8 },
            ],
            [
                ".circle-2",
                {
                    scale,
                    transform,
                },
                { duration: 0.8 },
            ],
            [
                ".circle-3",
                {
                    scale,
                    transform,
                },
                { duration: 0.8 },
            ],
            [
                ".circle-4",
                {
                    scale,
                    transform,
                },
                { duration: 0.8 },
            ],
            [
                ".circle-5",
                {
                    scale,
                    transform,
                },
                { duration: 0.8 },
            ],
        ];

        animate(sequence, {
            repeat: Infinity,
            repeatDelay: 1,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="p-8 py-0 overflow-hidden h-full relative flex items-center justify-center">
            <div className="flex flex-row shrink-0 justify-center items-center gap-2">
                <Container className="h-8 w-8 circle-1">
                    <SiNextdotjs className="h-4 w-4 dark:text-white" />
                </Container>
                <Container className="h-12 w-12 circle-2">
                    <SiDocker className="h-6 w-6 text-blue-500" />
                </Container>
                <Container className="circle-3">
                    <SiReact className="h-8 w-8 text-cyan-400" />
                </Container>
                <Container className="h-12 w-12 circle-4">
                    <SiTailwindcss className="h-6 w-6 text-sky-400" />
                </Container>
                <Container className="h-8 w-8 circle-5">
                    <SiLinux className="h-4 w-4 dark:text-white" />
                </Container>
            </div>

            <div className="h-40 w-px absolute top-1/2 -translate-y-1/2 m-auto z-40 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move">
                <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
                    <Sparkles />
                </div>
            </div>
        </div>
    );
};

const Sparkles = () => {
    const [sparklesData, setSparklesData] = useState<Array<{
        top: string;
        left: string;
        time: number;
        moveX: number;
        moveY: number;
        opacity: number;
    }>>([]);

    useEffect(() => {
        const data = [...Array(12)].map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            time: Math.random() * 2 + 4,
            moveX: Math.random() * 2 - 1,
            moveY: Math.random() * 2 - 1,
            opacity: Math.random()
        }));
        // eslint-disable-next-line
        setSparklesData(data);
    }, []);

    return (
        <div className="absolute inset-0">
            {sparklesData.map((data, i) => (
                <motion.span
                    key={`star-${i}`}
                    animate={{
                        top: `calc(${data.top} + ${data.moveY}px)`,
                        left: `calc(${data.left} + ${data.moveX}px)`,
                        opacity: data.opacity,
                        scale: [1, 1.2, 0],
                    }}
                    transition={{
                        duration: data.time,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        position: "absolute",
                        top: data.top,
                        left: data.left,
                        width: `2px`,
                        height: `2px`,
                        borderRadius: "50%",
                        zIndex: 1,
                    }}
                    className="inline-block bg-black dark:bg-white"
                ></motion.span>
            ))}
        </div>
    );
};

export const Card = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "h-full w-full p-4 py-0 -mt-14 rounded-xl border-none bg-transparent group",
                className
            )}
        >
            {children}
        </div>
    );
};

export const CardTitle = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <h3
            className={cn(
                "text-lg font-semibold text-gray-800 dark:text-white py-2",
                className
            )}
        >
            {children}
        </h3>
    );
};

export const CardDescription = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <p
            className={cn(
                "text-sm font-normal text-neutral-600 dark:text-neutral-400 max-w-sm",
                className
            )}
        >
            {children}
        </p>
    );
};

export const CardSkeletonContainer = ({
    className,
    children,
    showGradient = true,
}: {
    className?: string;
    children: React.ReactNode;
    showGradient?: boolean;
}) => {
    return (
        <div
            className={cn(
                "h-[15rem] md:h-[20rem] rounded-xl z-40",
                className,
                showGradient &&
                "bg-neutral-300 dark:bg-[rgba(40,40,40,0.70)] [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]"
            )}
        >
            {children}
        </div>
    );
};

const Container = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                `h-16 w-16 rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)]
    shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]
    `,
                className
            )}
        >
            {children}
        </div>
    );
};
