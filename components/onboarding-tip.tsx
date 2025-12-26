"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { IconTerminal2, IconX } from "@tabler/icons-react";

export function OnboardingTip() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show after a delay, but only if they haven't seen it (could use localStorage, 
    // but for now session-based via simple state delay is less clearable).
    // Let's rely on a timeout after the boot sequence usually finishes.
    const timer = setTimeout(() => {
      setShow(true);
    }, 4500); // 4.5s (Wait for boot sequence ~3-4s)

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        exit={{ opacity: 0, y: 20, x: "-50%" }}
        className="fixed bottom-20 md:bottom-30 left-1/2 z-50 flex items-center gap-4 bg-zinc-900/90 border border-zinc-800 backdrop-blur-md px-6 py-4 rounded-full shadow-2xl min-w-[90vw] md:min-w-md"
      >
        <div className="bg-zinc-800 p-2 rounded-full">
            <IconTerminal2 className="w-5 h-5 text-green-500 animate-pulse" />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-semibold text-white truncate">System Ready</span>
            <span className="text-xs text-zinc-400 break-words leading-tight">
               <span className="hidden md:inline">Press <span className="text-white font-mono bg-zinc-800 px-1 rounded">Cmd+K</span> to execute commands.</span>
               <span className="md:hidden">Open the bottom dock and tap the terminal icon to run system commands.</span>
            </span>
        </div>
        <button 
            onClick={() => setShow(false)}
            className="ml-auto text-zinc-500 hover:text-white transition-colors"
        >
            <IconX className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
