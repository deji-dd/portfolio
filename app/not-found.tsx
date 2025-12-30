"use client";

import Link from "next/link";
import { IconAlertTriangle, IconHome } from "@tabler/icons-react";
import { motion } from "motion/react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-red-500/5 mix-blend-overlay pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 relative"
                >
                    <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
                    <IconAlertTriangle className="w-24 h-24 text-red-500 relative z-10 mx-auto" stroke={1.5} />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-white/50 tracking-tighter mb-2"
                >
                    404 // SIGNAL LOST
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-zinc-500 font-mono text-sm mb-8"
                >
                    The requested trajectory coordinates could not be resolved. The target system may be offline or redacted.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link
                        href="/"
                        className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md bg-zinc-900 px-6 font-medium text-zinc-300 transition-all duration-300 hover:bg-zinc-800 hover:text-white border border-zinc-800 hover:border-zinc-700"
                    >
                        <span className="mr-2">
                            <IconHome className="w-4 h-4" />
                        </span>
                        <span>Return to Base</span>
                        <div className="absolute inset-0 -z-10 bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
