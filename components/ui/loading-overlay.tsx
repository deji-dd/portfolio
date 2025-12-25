"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconRefresh } from "@tabler/icons-react";

type LoadingOverlayProps = {
  children: React.ReactNode;
  minDurationMs?: number;
  maxDurationMs?: number;
};

export function LoadingOverlay({
  children,
  minDurationMs = 1500,
  maxDurationMs = 5000,
}: LoadingOverlayProps) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let minTimer: NodeJS.Timeout | null = null;
    let maxTimer: NodeJS.Timeout | null = null;
    let fontsReady = false;

    const attemptHide = () => {
      // Only hide if minimum time has passed
      if (minTimer === null) {
        setHide(true);
      }
    };

    // Minimum duration before we can hide
    minTimer = setTimeout(() => {
      minTimer = null;
      // If any readiness signal already fired, hide now
      if (fontsReady || document.readyState === "complete") {
        setHide(true);
      }
    }, minDurationMs);

    // Maximum duration (safety valve)
    maxTimer = setTimeout(() => {
      setHide(true);
    }, maxDurationMs);

    // Listen for fonts ready
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        fontsReady = true;
        attemptHide();
      });
    }

    // Listen for document ready
    const handleReadyStateChange = () => {
      if (document.readyState === "complete") {
        attemptHide();
      }
    };

    document.addEventListener("readystatechange", handleReadyStateChange);

    return () => {
      if (minTimer) clearTimeout(minTimer);
      if (maxTimer) clearTimeout(maxTimer);
      document.removeEventListener("readystatechange", handleReadyStateChange);
    };
  }, [minDurationMs, maxDurationMs]);

  return (
    <div className="relative">
      <AnimatePresence>
        {!hide && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-black text-white flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-3">
              <IconRefresh className="w-5 h-5 animate-spin duration-1500 text-zinc-400" />
              <div className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                Initializing Interface
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-zinc-950/40 to-transparent pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Render children underneath; they'll be visible when overlay fades */}
      {children}
    </div>
  );
}
