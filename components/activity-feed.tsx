"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconCheck, IconAlertCircle, IconRefresh } from "@tabler/icons-react";

type Log = {
  id: number;
  timestamp: string;
  level: "INFO" | "WARN" | "SUCCESS";
  message: string;
  module: "ERP" | "DOCKER" | "SYSTEM" | "BACKUP" | "NETWORK";
};

const LOG_TEMPLATES: ReadonlyArray<Pick<Log, "level" | "module" | "message">> =
  [
    // --- DOCKER ---
    { level: "INFO", module: "DOCKER", message: "Container [frappe-worker-1] healthy (uptime: 4d 12h)" },
    { level: "INFO", module: "DOCKER", message: "Image pull completed: frappe/erpnext:v15.10.0" },
    { level: "SUCCESS", module: "DOCKER", message: "Volume cleanup: reclaimed 2.1GB space" },
    { level: "WARN", module: "DOCKER", message: "High memory usage on [redis-cache] (82%)" },
    { level: "INFO", module: "DOCKER", message: "Restarting service [mariadb] due to config change" },

    // --- ERP / FRAPPE ---
    { level: "SUCCESS", module: "ERP", message: "Background Job: Daily Payroll Process finished (0.4s)" },
    { level: "INFO", module: "ERP", message: "HRMS: Employee sync completed for 142 records" },
    { level: "WARN", module: "ERP", message: "Queue: High load on [default] queue (12 jobs pending)" },
    { level: "INFO", module: "ERP", message: "Scheduler: Executing [process_deferred_accounting]" },
    { level: "SUCCESS", module: "ERP", message: "Doctype [Salary Slip] schema updated" },

    // --- SYSTEM / AZURE ---
    { level: "INFO", module: "SYSTEM", message: "Kernel: Updated to 6.8.0-1009-azure" },
    { level: "INFO", module: "SYSTEM", message: "Cron: Daily system usage report generated" },
    { level: "WARN", module: "SYSTEM", message: "UFW: Blocked suspicious connection from 192.168.x.x" },
    { level: "INFO", module: "SYSTEM", message: "Systemd: Reloading nginx configuration..." },
    { level: "SUCCESS", module: "SYSTEM", message: "Azure Agent: VM Extension provisioned successfully" },

    // --- BACKUP ---
    { level: "SUCCESS", module: "BACKUP", message: "Snapshot [daily-erp-db] uploaded to S3" },
    { level: "INFO", module: "BACKUP", message: "Incremental backup started for volume [vol-0a3f]" },
    { level: "SUCCESS", module: "BACKUP", message: "Verified integrity of archive [config-2023.tar.gz]" },

    // --- NETWORK ---
    { level: "INFO", module: "NETWORK", message: "Tailscale: Direct connection established to [macbook-pro]" },
    { level: "SUCCESS", module: "NETWORK", message: "Nginx: SSL cert renewed for *.ayodejib.dev" },
    { level: "INFO", module: "NETWORK", message: "DNS: Propagating new records for lab.ayodejib.dev" },
    { level: "WARN", module: "NETWORK", message: "Latency spike detected on interface [eth0] (+45ms)" },
  ];

export function ActivityFeed() {
  const lastLogIndexRef = useRef<number | null>(null);

  const generateLog = (id: number): Log => {
    let randomIndex;
    // Simple dedup: try to get a different index than the last one
    do {
      randomIndex = Math.floor(Math.random() * LOG_TEMPLATES.length);
    } while (randomIndex === lastLogIndexRef.current && LOG_TEMPLATES.length > 1);

    lastLogIndexRef.current = randomIndex;
    const template = LOG_TEMPLATES[randomIndex];

    const now = new Date();
    return {
      id,
      timestamp: now.toLocaleTimeString("en-GB", { hour12: false }), // 24h format
      level: template.level,
      module: template.module,
      message: template.message,
    };
  };

  const [logs, setLogs] = useState<Log[]>([]);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Live "Stream" effect
  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);

    // Generate initial logs
    const initialLogs = Array.from({ length: 3 }).map((_, i) => generateLog(i));
    setLogs(initialLogs);

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
                    <span className={getLogColor(log)}>
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

function getLogColor(log: Log) {
  if (log.module === "NETWORK") return "text-purple-400";

  switch (log.level) {
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
