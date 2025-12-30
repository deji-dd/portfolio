"use client";

import { IconDeviceAnalytics, IconServer } from "@tabler/icons-react";

export function HardwareSpecs({ compact = false }: { compact?: boolean }) {
    return (
        <div className="h-full w-full bg-zinc-950/50 p-4 rounded-xl border border-white/10 flex flex-col justify-center font-mono text-xs relative overflow-hidden group">

            {/* Background ASCII Art or Logo Watermark */}
            <div className="absolute -right-4 -bottom-4 text-[10rem] opacity-[0.03] rotate-12 pointer-events-none select-none">
                <IconServer />
            </div>

            <div className="z-10 space-y-3">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <IconDeviceAnalytics className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-wider text-[10px] md:text-xs">Cloud Lab</h3>
                        <p className="text-zinc-500 text-[10px]">lab.ayodejib.dev</p>
                    </div>
                </div>

                <div className="grid grid-cols-[1fr_2fr] gap-y-1.5 text-[10px] md:text-[11px]">
                    <span className="text-zinc-500">OS</span>
                    <span className="text-zinc-300 truncate">Ubuntu 24.04 LTS (Noble)</span>

                    {!compact && (
                        <>
                            <span className="text-zinc-500">Kernel</span>
                            <span className="text-zinc-300 truncate">6.8.0-1008-azure</span>
                        </>
                    )}

                    {/* <span className="text-zinc-500">Uptime</span>
                <span className="text-green-400">14 days, 3 hours, 22 mins</span> */}

                    <span className="text-zinc-500">vCPU</span>
                    <span className="text-zinc-300 truncate">Azure B2als_v2 (2 vCPU)</span>

                    <span className="text-zinc-500">Memory</span>
                    <span className="text-zinc-300 truncate">4096MiB</span>

                    <span className="text-zinc-500">Disk</span>
                    <span className="text-zinc-300 truncate">64GB Standard SSD (LRS)</span>

                    {!compact && (
                        <>
                            <span className="text-zinc-500">Region</span>
                            <span className="text-zinc-300 truncate">South Africa (North)</span>
                        </>
                    )}
                </div>

                {/* Color Palette visualization like real neofetch */}
                {!compact && (
                    <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
                        <div className="h-2 w-6 bg-black rounded-sm" />
                        <div className="h-2 w-6 bg-red-500 rounded-sm" />
                        <div className="h-2 w-6 bg-green-500 rounded-sm" />
                        <div className="h-2 w-6 bg-yellow-500 rounded-sm" />
                        <div className="h-2 w-6 bg-blue-500 rounded-sm" />
                        <div className="h-2 w-6 bg-purple-500 rounded-sm" />
                        <div className="h-2 w-6 bg-cyan-500 rounded-sm" />
                    </div>
                )}
            </div>
        </div>
    );
}
