"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";


export function LabStatus() {
  const [isOnline, setIsOnline] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [waveformHeights, setWaveformHeights] = useState<number[]>([]);
  const [sparklineData, setSparklineData] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setWaveformHeights([...Array(20)].map(() => Math.floor(Math.random() * 100)));
    setSparklineData([...Array(30)].map(() => 50));

    const checkStatus = async () => {
      // Simulation Logic
      const randomState = Math.random() > 0.05; // 95% Chance online
      setIsOnline(randomState);
      const newLatency = Math.floor(Math.random() * 40) + 15;
      setLatency(newLatency);

      // Update Waveform
      setWaveformHeights(prev => {
        const next = [...prev];
        next.shift();
        next.push(Math.floor(Math.random() * 100));
        return next;
      });

      // Update Sparkline
      setSparklineData(prev => {
        const next = [...prev];
        next.shift();
        next.push(newLatency);
        return next;
      });
    };

    checkStatus();
    const interval = setInterval(checkStatus, 1000); // Check every 1s for "Live" feel
    return () => clearInterval(interval);
  }, []);

  // Generate Sparkline Path
  const getSparklinePath = () => {
    if (sparklineData.length === 0) return "";
    const width = 100;
    const height = 30;
    const step = width / (sparklineData.length - 1);

    const points = sparklineData.map((val, i) => {
      const x = i * step;
      // val is 0-100ish, map to height
      // high latency = lower y (visual graph goes up?) usually graph goes up for high value
      // lets say 0 at bottom, 30 at top. 
      // val is roughly 15-60.
      const normalized = Math.min(Math.max(val, 0), 100);
      const y = height - (normalized / 100) * height;
      return `${x},${y}`;
    });
    return `M${points.join(" L")}`;
  };

  if (!isMounted) return null;

  return (
    <div className="flex flex-col gap-4 p-2 font-mono text-[10px]">
      <div className="flex justify-between items-center border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-2 w-2 rounded-full animate-pulse",
              isOnline ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-red-500"
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
          {isOnline ? "ONLINE" : "OFFLINE"}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 opacity-90">
        <div className="flex flex-col gap-1">
          <span className="text-zinc-600 text-[8px]">STATUS</span>
          <span className={isOnline ? "text-green-400" : "text-red-400"}>
            {isOnline ? "ACTIVE" : "DOWN"}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-zinc-600 text-[8px]">UPTIME</span>
          <span className="text-zinc-300">{isOnline ? "99.9%" : "ERR"}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-zinc-600 text-[8px]">LATENCY</span>
          <span className={isOnline ? "text-sky-400" : "text-zinc-600"}>
            {isOnline ? `${latency}ms` : "--"}
          </span>
        </div>
      </div>

      {/* Sparkline Graph */}
      <div className="h-8 w-full relative overflow-hidden bg-white/5 rounded border border-white/5 mt-1">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 30">
          <path
            d={getSparklinePath()}
            fill="none"
            stroke={isOnline ? "#0ea5e9" : "#52525b"}
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          {/* Fill area under curve */}
          <path
            d={`${getSparklinePath()} L100,30 L0,30 Z`}
            fill={isOnline ? "rgba(14, 165, 233, 0.2)" : "rgba(82, 82, 91, 0.1)"}
            stroke="none"
          />
        </svg>
      </div>

    </div>
  );
}
