"use client";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

type BaseLog = {
  status: string;
  msg: string;
  color: string;
};

type LogItem = BaseLog & { id: number };

const logs: BaseLog[] = [
  {
    status: "SUCCESS",
    msg: "Escalation Module Deployed",
    color: "text-green-400",
  },
  {
    status: "INFO",
    msg: "SSL Cert Renewed (Exchange)",
    color: "text-blue-400",
  },
  {
    status: "WARN",
    msg: "Backup Sync: 4.2GB Uploaded",
    color: "text-yellow-400",
  },
  {
    status: "SYSTEM",
    msg: "ERPNext Custom Hooks Active",
    color: "text-purple-400",
  },
  {
    status: "LOG",
    msg: "IS Unit Docs synced to Docker",
    color: "text-zinc-500",
  },
];

export function ActivityFeed() {
  const [visibleLogs, setVisibleLogs] = useState<LogItem[]>(() =>
    logs.slice(0, 3).map((l, idx) => ({ ...l, id: idx }))
  );
  const nextIdRef = useRef<number>(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLogs((prev) => {
        const base = logs[Math.floor(Math.random() * logs.length)];
        const newItem: LogItem = { ...base, id: nextIdRef.current++ };
        const updated = [...prev, newItem];
        return updated.length > 3 ? updated.slice(updated.length - 3) : updated;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2 p-4 font-mono text-[10px] bg-black/20 h-full rounded-xl overflow-hidden">
      <AnimatePresence mode="popLayout">
        {visibleLogs.map((log, i) => {
          const isNewest = i === visibleLogs.length - 1;
          return (
            <motion.div
              key={log.id}
              layout
              initial={isNewest ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex gap-2 items-start border-b border-white/5 pb-2"
            >
              <span className={`font-bold ${log.color}`}>[{log.status}]</span>
              <span className="text-zinc-400 lowercase">{log.msg}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
      <div className="mt-auto flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[8px] text-zinc-600 uppercase">
          Live System Monitor
        </span>
      </div>
    </div>
  );
}
