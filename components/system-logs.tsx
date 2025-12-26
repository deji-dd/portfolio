"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type LogEntry = {
  timestamp: string;
  status: "SUCCESS" | "WARNING" | "INFO" | "ERROR";
  message: string;
  id: string;
};

const INITIAL_LOGS: LogEntry[] = [
  { timestamp: "2023-Q3", status: "SUCCESS", message: "PUBLISH: Ginoba Foundation Landing Page", id: "1" },
  { timestamp: "2023-Q4", status: "SUCCESS", message: "PUBLISH: Glorious Eagles Landing Page", id: "2" },
  { timestamp: "2025-Q1", status: "SUCCESS", message: "BUILD: Corporate Internal Invoice Tracker", id: "3" },
  { timestamp: "2025-Q1", status: "SUCCESS", message: "PUBLISH: BT Technologies LTD Landing Page", id: "4" },
  { timestamp: "2025-Q2", status: "SUCCESS", message: "PUBLISH: Ornate Mental Health Services Landing Page", id: "5" },
  { timestamp: "2025-Q3", status: "SUCCESS", message: "DEPLOY: Corporate Internal ERP System Management", id: "6" },
  { timestamp: "2025-Q4", status: "SUCCESS", message: "BUILD: Corporate Internal Documentation Web App", id: "7" },
  { timestamp: "2025-Q4", status: "INFO", message: "NET: Purchased Domain ayodejib.dev", id: "8" },
  { timestamp: "2025-Q4", status: "SUCCESS", message: "INIT: Portfolio Website Deployed", id: "9" },
  { timestamp: "2025-Q4", status: "SUCCESS", message: "MOUNT: Custom Azure VPS Infrastructure", id: "10" },
  { timestamp: "2025-Q1", status: "INFO", message: "SYS: Optimization & Refactoring of Cloud Lab", id: "11" },
];

export function SystemLogs() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [logs, setLogs] = useState(INITIAL_LOGS);

  // Auto-scroll on mount
  useEffect(() => {
    if (scrollRef.current) {
      // scroll logic if needed, but static list for now is fine
    }
  }, []);

  return (
    <div className="h-full w-full bg-black/90 font-mono text-[10px] md:text-xs p-4 rounded-xl border border-white/10 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
        <span className="text-zinc-500 uppercase tracking-widest">System Logs</span>
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/20 border border-red-500/50" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <span className="w-2 h-2 rounded-full bg-green-500/20 border border-green-500/50" />
        </div>
      </div>

      <div className="flex-1 pr-2 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
        <div className="space-y-1.5 font-mono">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-2 opacity-80 hover:opacity-100 transition-opacity">
              <span className="text-zinc-600 min-w-[60px]">{log.timestamp}</span>
              <span className={cn(
                "font-bold min-w-[60px]",
                log.status === "SUCCESS" ? "text-green-500" :
                  log.status === "WARNING" ? "text-yellow-500" :
                    log.status === "ERROR" ? "text-red-500" : "text-blue-400"
              )}>
                [{log.status}]
              </span>
              <span className="text-zinc-300">{log.message}</span>
            </div>
          ))}
          <div className="animate-pulse text-green-500 mt-2">_</div>
        </div>
      </div>
    </div>
  );
}
