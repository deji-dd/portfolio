"use client";
import { motion } from "motion/react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = `Systems Engineer & Next.js Architect. I build the software glue that connects modern web interfaces with robust enterprise infrastructure.`;

export function HeroSection() {
  return (
    <div className="flex flex-col space-y-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-4 flex items-center gap-2"
      >
        Ayodeji B<span className="text-blue-500">.</span>
      </motion.h1>

      <div className="max-w-2xl">
        <TextGenerateEffect words={words} className="text-zinc-400" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="flex gap-4 mt-8"
      >
        <span className="text-[10px] font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-500 uppercase">
          Lagos, NG
        </span>
        <span className="text-[10px] font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-500 uppercase">
          Available for Architecture
        </span>
      </motion.div>
    </div>
  );
}
