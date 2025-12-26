"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import {
    SiDocker,
    SiLinux,
    SiNextdotjs,
    SiTailwindcss,
    SiTypescript,
    SiAmazon,
    SiMongodb,
    SiRedis,
} from "react-icons/si";

const TechModule = ({
    icon: Icon,
    name,
    status = "active",
    load = 0,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    name: string;
    status?: "active" | "standby" | "processing";
    load?: number;
}) => {
    const [randomValues, setRandomValues] = useState({ duration: 2, delay: 0 });

    useEffect(() => {
        // eslint-disable-next-line
        setRandomValues({
            duration: Math.random() * 2 + 2,
            delay: Math.random() * 2,
        });
    }, []);

    return (
        <div className="relative group flex flex-col items-center justify-between p-3 bg-zinc-900/40 border border-white/5 rounded-lg overflow-hidden hover:bg-zinc-800/50 transition-colors h-24 w-full">
            {/* Scanline */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-[10px] w-full pointer-events-none"
                animate={{ top: ["-10%", "110%"] }}
                transition={{
                    duration: randomValues.duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: randomValues.delay,
                }}
            />

            <div className="flex w-full justify-between items-start">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                    MOD-{name.substring(0, 3).toUpperCase()}
                </span>
                <div className="flex gap-1">
                    <div
                        className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            status === "active"
                                ? "bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"
                                : status === "processing"
                                    ? "bg-yellow-500 animate-pulse"
                                    : "bg-zinc-700"
                        )}
                    />
                </div>
            </div>

            <Icon className="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors z-10" />

            <div className="w-full flex justify-between items-end mt-2">
                <span className="text-[10px] font-bold text-zinc-300 group-hover:text-cyan-400 transition-colors">
                    {name}
                </span>
                <span className="text-[8px] font-mono text-zinc-600 group-hover:text-cyan-500/70">
                    {load}% LD
                </span>
            </div>
        </div>
    );
};

export function TechStackDisplay() {
    const [mounted, setMounted] = useState(false);
    // eslint-disable-next-line
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="w-full h-full flex flex-col bg-zinc-950/30 p-4 font-mono select-none group">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-500 rounded-[1px] animate-pulse" />
                    <h3 className="text-xs font-bold text-zinc-400 tracking-widest uppercase">
                        System Modules
                    </h3>
                </div>
                <div className="text-[9px] text-zinc-600">
                    AUTO-SCALING: <span className="text-green-500">ON</span>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 flex-grow">
                <TechModule icon={SiNextdotjs} name="Next.js" load={45} />
                <TechModule icon={SiMongodb} name="MongoDB" load={82} status="processing" />
                <TechModule icon={SiTypescript} name="TypeScript" load={12} />
                <TechModule icon={SiTailwindcss} name="Tailwind" load={30} />
                <TechModule icon={SiDocker} name="Docker" load={66} status="processing" />
                <TechModule icon={SiLinux} name="Linux" load={91} />
                <TechModule icon={SiRedis} name="Redis" load={24} />
                <TechModule icon={SiAmazon} name="AWS" load={58} status="active" />
            </div>

            {/* Footer / Status Bar */}
            <div className="mt-3 pt-2 border-t border-white/5 flex justify-between text-[8px] text-zinc-600">
                <div className="flex gap-4">
                    <span>MEM: 64%</span>
                    <span>CPU: 32%</span>
                    <span>NET: 1.2GB/s</span>
                </div>
                <div>
                    SYNCED
                </div>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 p-2 opacity-50">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M0 0 H 20 V 20" stroke="currentColor" className="text-cyan-500/30" strokeWidth="2" fill="none" />
                </svg>
            </div>
        </div>
    );
}
