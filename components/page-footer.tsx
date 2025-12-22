"use client";
import { useState, useEffect } from "react";

export function PageFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="w-full border-t border-white/5 bg-zinc-900/20 py-4 mt-20 backdrop-blur-md relative z-20">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
        <div className="flex gap-6">
          <span>
            Status: <span className="text-green-500">Production</span>
          </span>
          <span className="hidden md:inline-flex">Loc: Lagos, NG</span>
        </div>
        <div className="hidden md:block">
          Build: <span className="text-zinc-400">v16.1.0-stable</span>
        </div>
        <div className="text-sky-500 font-bold">Local_Time: {time}</div>
        <div>© 2025 Ayodeji B.</div>
      </div>
    </footer>
  );
}
