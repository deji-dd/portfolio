"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const LAB_URL = "https://lab.ayodejib.dev";

export function LabStatus() {
  const [isOnline, setIsOnline] = useState(false); // Default to offline/intermittent
  const [latency, setLatency] = useState<number | null>(null);
  const [waveformHeights] = useState(() =>
    [...Array(20)].map(() => Math.floor(Math.random() * 100))
  );

  // The "Ping" Effect
  useEffect(() => {
    const checkStatus = async () => {
      // If you don't have a URL yet, we simulate "Intermittent" availability
      // Or we can try to fetch if you provide the URL
      if (!LAB_URL.includes("your-lab-url")) {
        try {
          const start = Date.now();
          // A simple HEAD request to check availability
          await fetch(LAB_URL, { method: "HEAD", mode: "no-cors" });
          setLatency(Date.now() - start);
          setIsOnline(true);
        } catch {
          setIsOnline(false);
        }
      } else {
        // Simulation Mode for Demo
        const randomState = Math.random() > 0.3; // 70% chance of being "Online"
        setIsOnline(randomState);
        setLatency(Math.floor(Math.random() * 50) + 10);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-2 font-mono text-[10px]">
      <div className="flex justify-between items-center border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-2 w-2 rounded-full animate-pulse",
              isOnline ? "bg-green-500" : "bg-amber-500"
            )}
          />
          <span className="text-zinc-500">cloud-lab</span>
        </div>
        <span
          className={cn(
            "tracking-tighter",
            isOnline ? "text-sky-500" : "text-zinc-600"
          )}
        >
          {isOnline ? "ONLINE" : "STANDBY"}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 opacity-90">
        <div className="flex flex-col gap-1">
          <span className="text-zinc-600 text-[8px]">STATUS</span>
          <span className={isOnline ? "text-green-400" : "text-amber-400"}>
            {isOnline ? "ACTIVE" : "SLEEP"}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-zinc-600 text-[8px]">UPTIME</span>
          <span className="text-zinc-300">{isOnline ? "99.4%" : "PAUSED"}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-zinc-600 text-[8px]">LATENCY</span>
          <span className={isOnline ? "text-sky-400" : "text-zinc-600"}>
            {isOnline ? `${latency}ms` : "--"}
          </span>
        </div>
      </div>

      {/* Network Activity Visualization */}
      <div className="h-8 w-full flex items-end gap-0.5 mt-2 opacity-60">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height: isOnline ? `${Math.max(20, waveformHeights[i])}%` : "10%",
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className={cn(
              "flex-1 rounded-sm",
              isOnline
                ? "bg-gradient-to-t from-sky-500 to-sky-400"
                : "bg-zinc-700"
            )}
          />
        ))}
      </div>
    </div>
  );
}
