"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function AboutSection() {
    return (
        <section className="relative w-full py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Column: Heading & Stats */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-sm text-zinc-500 font-mono tracking-widest uppercase border-b border-white/10 pb-2 mb-4">
                            Identity Verification
                        </h3>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            A systems thinker building for the{" "}
                            <span className="text-blue-500">web</span> and{" "}
                            <span className="text-purple-500">infrastructure</span>.
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/30">
                            <div className="text-2xl font-bold text-white mb-1">3+</div>
                            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                                Years Experience
                            </div>
                        </div>
                        <div className="p-4 rounded-xl border border-white/10 bg-zinc-900/30">
                            <div className="text-2xl font-bold text-white mb-1">15+</div>
                            <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                                Projects Deployed
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Bio */}
                <div className="space-y-6 text-zinc-400 leading-relaxed text-sm md:text-base">
                    <p>
                        I am a Software Engineer based in Lagos, Nigeria, specializing in the
                        intersection of frontend architecture and backend systems. I don't
                        just build websites; I engineer comprehensive digital solutions that
                        stand the test of scale.
                    </p>
                    <p>
                        My background covers the full spectrum of development: from crafting
                        pixel-perfect interactions in Next.js to provisioning Linux
                        servers and managing Docker swarms. I believe that understanding the
                        underlying hardware makes me a better frontend developer, and vice
                        versa.
                    </p>
                    <p>
                        Currently, I am focused on building accessible, high-performance
                        applications that solve real business problems, while maintaining a
                        personal "Cloud Lab" to experiment with bleeding-edge technologies.
                    </p>
                </div>
            </div>
        </section>
    );
}
