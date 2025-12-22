"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function GridOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 pointer-events-none overflow-hidden",
        className
      )}
    >
      {/* Dot Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.22]">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="grid-dots"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <motion.circle
                cx="1"
                cy="1"
                r="1"
                fill="#6b7280"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-dots)" />
        </svg>
      </div>

      {/* Subtle Horizontal Lines */}
      <div className="absolute inset-0 flex flex-col justify-around opacity-[0.14]">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="h-px w-full bg-linear-to-r from-transparent via-sky-400/50 to-transparent"
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 6,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Corner Brackets (Command Center Style) */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-green-500/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-green-500/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-green-500/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-green-500/30" />

      {/* Scanning Line Effect */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-sky-400/60 to-transparent"
        animate={{
          y: ["0vh", "100vh"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
