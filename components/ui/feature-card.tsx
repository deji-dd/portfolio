"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { IconCloud } from "@tabler/icons-react";

export const FeatureCard = ({
    title,
    description,
    icon,
    children,
    className,
}: {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "relative overflow-hidden p-6 rounded-xl border border-neutral-200 dark:border-white/[0.1] bg-white dark:bg-black group/feature hover:shadow-lg transition duration-200",
                className
            )}
        >
            <div className="relative z-10">
                <div className="mb-4 inline-flex items-center justify-center rounded-md bg-neutral-100 dark:bg-neutral-800 p-2 text-neutral-600 dark:text-neutral-300">
                    {icon || <IconCloud className="w-6 h-6" />}
                </div>
                <h3 className="mb-2 text-lg font-bold text-neutral-800 dark:text-neutral-100">
                    {title}
                </h3>
                <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                    {description}
                </p>
                <div className="w-full h-full text-neutral-500 dark:text-neutral-400">
                    {children}
                </div>
            </div>

            {/* Decorative gradient blob */}
            <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl group-hover/feature:bg-blue-500/30 transition-colors" />
        </div>
    );
};
