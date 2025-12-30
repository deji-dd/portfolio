"use client";
import { useState, useEffect } from "react";

export function PageFooter() {
  const [lagosTime, setLagosTime] = useState("");
  const [uptime, setUptime] = useState(0);
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentYear(new Date().getFullYear());
    const timer = setInterval(() => {
      const now = new Date();

      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setLagosTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      setUptime(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <footer className="w-full border-t border-white/5 bg-black/40 backdrop-blur-md relative z-30">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
          {/* Left: System Status */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-zinc-300">System_Stable</span>
            </div>
            <div className="hidden sm:block">
              Build: <span className="text-zinc-400">v1.2.0-STABLE</span>
            </div>
          </div>

          {/* Center: Live Metrics */}
          <div className="flex items-center gap-8 py-2 md:py-0 px-4 rounded-full border border-white/5 bg-zinc-900/30">
            <div className="flex items-center gap-2">
              <span className="text-zinc-600">Lagos_NG:</span>
              <span className="text-sky-400 font-bold tabular-nums w-16">
                {lagosTime || "00:00:00"}
              </span>
            </div>
            <div className="h-3 w-px bg-white/10 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-zinc-600">Session_Uptime:</span>
              <span className="text-zinc-300 tabular-nums">
                {formatUptime(uptime)}
              </span>
            </div>
          </div>

          {/* Right: Copyright & Location */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden lg:block">
              <span className="text-zinc-600">Host:</span>{" "}
              <span className="text-zinc-400">ayodejib.dev</span>
            </div>
            <div className="h-3 w-px bg-white/10 hidden lg:block" />
            <span className="text-zinc-400">© {currentYear} Ayodeji B.</span>
          </div>
        </div>
      </div>

      {/* Subtle Scanline flicker effect on the footer */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-linear-to-b from-transparent via-white to-transparent h-px animate-scanline" />
    </footer>
  );
}
