"use client";
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

export function LabStatus() {
  const [latencyMs, setLatencyMs] = useState(22);
  const SCAN_DURATION_MS = 3000;
  useEffect(() => {
    const id = setInterval(() => {
      setLatencyMs((prev) => {
        const delta = (Math.random() - 0.5) * 4; // gentle jitter
        const next = Math.max(15, Math.min(40, Math.round(prev + delta)));
        return next;
      });
    }, SCAN_DURATION_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      className="relative flex flex-col h-full justify-between p-2 overflow-hidden"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -2 }}
    >
      <motion.div
        className="pointer-events-none absolute top-0 left-0 h-0.5 w-full bg-linear-to-r from-transparent via-green-400/60 to-transparent"
        animate={{ opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0), rgba(34,197,94,0.6), rgba(0,0,0,0))",
        }}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
            Lab Online
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-zinc-600 italic">
            via Tailscale
          </span>
          <motion.span
            key={latencyMs}
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="px-2 py-0.5 rounded-sm bg-zinc-800 text-[9px] font-mono text-green-400 border border-white/5"
          >
            {latencyMs} ms
          </motion.span>
        </div>
      </div>

      <div className="my-auto">
        <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-tight">
          MacBook Pro M-Series
        </h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {["OrbStack", "PM2", "Docker"].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.05 * i,
                type: "spring",
                stiffness: 300,
                damping: 26,
              }}
              whileHover={{ scale: 1.03 }}
              className="px-2 py-0.5 rounded-sm bg-zinc-800 text-[9px] font-mono text-zinc-500 border border-white/5 shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_12px_0_rgba(56,239,125,0.15)]"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-2 border-t border-white/5">
        <p className="text-[10px] text-zinc-500 font-mono leading-none">
          Location: Lagos, NG
        </p>
      </div>
    </motion.div>
  );
}
