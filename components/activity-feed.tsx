"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconCheck, IconAlertCircle, IconRefresh } from "@tabler/icons-react";

type Log = {
  id: number;
  timestamp: string;
  level: "INFO" | "WARN" | "SUCCESS";
  message: string;
  module: "ERP" | "DOCKER" | "SYSTEM" | "BACKUP";
};

const LOG_TEMPLATES: ReadonlyArray<Pick<Log, "level" | "module" | "message">> =
  [
    {
      level: "INFO",
      module: "DOCKER",
      message: "Container [internal-docs] health check passed",
    },
    {
      level: "SUCCESS",
      module: "BACKUP",
      message: "Snapshot [daily-erp-db] uploaded to S3",
    },
    {
      level: "INFO",
      module: "SYSTEM",
      message: "Tailscale re-authentication successful (Node: MBP)",
    },
    {
      level: "WARN",
      module: "ERP",
      message: "High latency detected on Worker_02 (142ms)",
    },
    {
      level: "SUCCESS",
      module: "SYSTEM",
      message: "SSL Certificate auto-renewed (*.ayodeji.dev)",
    },
    {
      level: "INFO",
      module: "DOCKER",
      message: "Pruning unused volumes... 420MB reclaimed",
    },
  ];

export function ActivityFeed() {
  const generateLog = (id: number): Log => {
    const template =
      LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
    const now = new Date();
    return {
      id,
      timestamp: now.toLocaleTimeString("en-GB", { hour12: false }), // 24h format
      level: template.level,
      module: template.module,
      message: template.message,
    };
  };

  const [logs, setLogs] = useState<Log[]>(() =>
    Array.from({ length: 3 }).map((_, i) => generateLog(i))
  );
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Live "Stream" effect
  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLog = generateLog(prev.length + Date.now());
        const newLogs = [...prev.slice(-2), newLog]; // Keep last 2 logs
        return newLogs;
      });
    }, 4500); // Add new log every 4.5 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full h-full flex flex-col font-mono text-[10px] p-4 relative overflow-hidden">
      {/* Header / Status Bar */}
      <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2 text-zinc-500 uppercase tracking-widest">
        <span className="flex items-center gap-2">
          <IconRefresh className="w-3 h-3 animate-spin duration-3000" />
          System_Journal
        </span>
        <span className="text-emerald-500">Live</span>
      </div>

      {/* The Scroll Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto flex flex-col gap-3 mask-image-b"
      >
        {mounted && (
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-3 items-start border-l border-white/5 pl-3"
              >
                <div className="min-w-12.5 text-zinc-600">{log.timestamp}</div>
                <div className="flex-1 flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className={getLevelColor(log.level)}>
                      {log.module}
                    </span>
                    {log.level === "WARN" && (
                      <IconAlertCircle className="w-3 h-3 text-amber-500" />
                    )}
                    {log.level === "SUCCESS" && (
                      <IconCheck className="w-3 h-3 text-emerald-500" />
                    )}
                  </div>
                  <span className="text-zinc-400 leading-tight">
                    {log.message}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Gradient Fade at bottom to smooth out exit */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-zinc-950/20 to-transparent pointer-events-none" />
    </div>
  );
}

function getLevelColor(level: Log["level"]) {
  switch (level) {
    case "INFO":
      return "text-blue-400";
    case "WARN":
      return "text-amber-400";
    case "SUCCESS":
      return "text-emerald-400";
    default:
      return "text-zinc-400";
  }
}
