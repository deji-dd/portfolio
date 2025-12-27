"use client";

import { IconDeviceAnalytics, IconServer } from "@tabler/icons-react";

export function HardwareSpecs() {
    return (
        <div className="h-full w-full bg-zinc-950/50 p-6 rounded-xl border border-white/10 flex flex-col justify-center font-mono text-xs relative overflow-hidden group">

            {/* Background ASCII Art or Logo Watermark */}
            <div className="absolute -right-4 -bottom-4 text-[10rem] opacity-[0.03] rotate-12 pointer-events-none select-none">
                <IconServer />
            </div>

            <div className="z-10 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <IconDeviceAnalytics className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold uppercase tracking-wider">Cloud Lab</h3>
                        <p className="text-zinc-500">lab.ayodejib.dev</p>
                    </div>
                </div>

                <div className="grid grid-cols-[1fr_2fr] gap-y-2 text-[11px] md:text-xs">
                    <span className="text-zinc-500">OS</span>
                    <span className="text-zinc-300 truncate">Ubuntu 24.04 LTS (Noble)</span>

                    <span className="text-zinc-500">Kernel</span>
                    <span className="text-zinc-300 truncate">6.8.0-1008-azure</span>

                    {/* <span className="text-zinc-500">Uptime</span>
                <span className="text-green-400">14 days, 3 hours, 22 mins</span> */}

                    <span className="text-zinc-500">vCPU</span>
                    <span className="text-zinc-300 truncate">Azure B2als_v2 (2 vCPU)</span>

                    <span className="text-zinc-500">Memory</span>
                    <span className="text-zinc-300 truncate">4096MiB</span>

                    <span className="text-zinc-500">Disk</span>
                    <span className="text-zinc-300 truncate">64GB Standard SSD (LRS)</span>

                    <span className="text-zinc-500">Region</span>
                    <span className="text-zinc-300 truncate">South Africa (North)</span>
                </div>

                {/* Color Palette visualization like real neofetch */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                    <div className="h-3 w-8 bg-black rounded" />
                    <div className="h-3 w-8 bg-red-500 rounded" />
                    <div className="h-3 w-8 bg-green-500 rounded" />
                    <div className="h-3 w-8 bg-yellow-500 rounded" />
                    <div className="h-3 w-8 bg-blue-500 rounded" />
                    <div className="h-3 w-8 bg-purple-500 rounded" />
                    <div className="h-3 w-8 bg-cyan-500 rounded" />
                </div>
            </div>
        </div>
    );
}
