"use client";
import { motion } from "motion/react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

const PARTICLE_COUNT = 70;

export function DataFlowParticles({ className }: { className?: string }) {
  const particles = useMemo<Particle[]>(() => {
    const rand = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const seed = i + 1;
      return {
        x: rand(seed) * 100,
        size: 6 + rand(seed * 1.37) * 18,
        duration: 6 + rand(seed * 2.21) * 8,
        delay: rand(seed * 3.03) * 6,
        opacity: 0.25 + rand(seed * 4.19) * 0.5,
      };
    });
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 pointer-events-none overflow-hidden",
        className
      )}
    >
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute w-[1.5px] rounded-full bg-sky-400"
          style={{
            left: `${particle.x}%`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            filter: "drop-shadow(0 0 6px rgba(56,189,248,0.45))",
          }}
          initial={{ y: "-10%" }}
          animate={{ y: "110%" }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}
