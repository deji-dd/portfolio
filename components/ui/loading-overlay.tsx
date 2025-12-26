"use client";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

const BOOT_LOGS = [
  "INITIALIZING KERNEL...",
  "LOADING DRIVERS [NVME_SSD]... OK",
  "LOADING DRIVERS [GPU_RTX]... OK",
  "MOUNTING FILE SYSTEMS...",
  "CHECKING INTEGRITY [ROOT]... VERIFIED",
  "STARTING TAILSCALE DAEMON...",
  "ESTABLISHING PEER CONNECTION [MESH_NET]... OK",
  "AUTHENTICATING USER [AYODEJI]... SUCCESS",
  "LOADING USER INTERFACE...",
  "SYSTEM OPTIMIZED [100%]"
];

type LoadingOverlayProps = {
  children: React.ReactNode;
};

export function LoadingOverlay({ children }: LoadingOverlayProps) {
  const [hide, setHide] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentLogIndex = 0;
    
    const interval = setInterval(() => {
      if (currentLogIndex >= BOOT_LOGS.length) {
        clearInterval(interval);
        setTimeout(() => setHide(true), 800); // Small delay after last log
        return;
      }

      setLogs((prev) => [...prev, BOOT_LOGS[currentLogIndex]]);
      currentLogIndex++;
      
      // Auto-scroll
      if (logsEndRef.current) {
         logsEndRef.current.scrollIntoView({ behavior: "smooth" });
      }

    }, 300); // Speed of log scroll

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence>
        {!hide && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] bg-black text-green-500 font-mono text-xs md:text-sm p-8 flex flex-col justify-end overflow-hidden cursor-none"
          >
             {/* Scanlines for loading screen specifically */}
             <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />
            
            <div className="relative z-10 max-w-2xl w-full mx-auto pb-12">
               {logs.map((log, i) => (
                 <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-1"
                 >
                    <span className="text-zinc-500 mr-2">{`[${(0.124 * (i + 1)).toFixed(3)}]`}</span>
                    {log}
                 </motion.div>
               ))}
               <div ref={logsEndRef} />
               <motion.span 
                 animate={{ opacity: [0, 1, 0] }}
                 transition={{ repeat: Infinity, duration: 0.8 }}
                 className="inline-block w-2 h-4 bg-green-500 ml-1 translate-y-1"
                />
            </div>
            
             <div className="absolute bottom-4 right-30 text-zinc-600 text-xs animate-pulse">
                SYSTEM_ID: CLOUD-LAB
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Render children - they load underneath */}
      {children}
    </div>
  );
}
