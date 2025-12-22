"use client";
import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { motion, AnimatePresence } from "motion/react";
import { IconArrowLeft, IconTerminal2 } from "@tabler/icons-react";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [initialMessage, setInitialMessage] = useState("");

  const placeholders = [
    "How can I reach you?",
    "Tell me about your Windows Server setup...",
    "Ask about ERPNext customizations...",
    "Initialize a collaboration...",
  ];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic for capturing the message from the Vanish input is handled via onChange
    if (initialMessage.trim().length > 0) {
      setSubmitted(true);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center pb-40 relative z-30">
      <h2 className="text-3xl md:text-5xl text-white font-bold tracking-tighter text-center">
        Initialize{" "}
        <span className="text-sky-500 underline decoration-sky-500/30 underline-offset-8">
          Connection
        </span>
      </h2>

      <div className="w-full -mt-16 max-w-xl min-h-75 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={(e) => setInitialMessage(e.target.value)}
                onSubmit={onSubmit}
              />
              <p className="text-center text-[10px] font-mono text-zinc-600 mt-4 uppercase tracking-[0.2em]">
                Secure Line: 256-bit End-to-End Encryption
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 40, rotateX: 15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              className="w-full max-w-md p-8 rounded-2xl border border-sky-500/20 bg-zinc-900/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              {/* Decorative Console Header */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-sky-500/50 to-transparent" />

              <div className="mb-8 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <IconTerminal2 className="h-4 w-4 text-sky-500" />
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                      Finalize Transmission
                    </h3>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg border border-white/5 mt-3">
                    <p className="text-zinc-500 text-[10px] font-mono uppercase mb-1">
                      Payload:
                    </p>
                    <p className="text-sky-400/80 text-xs font-mono italic leading-tight">
                      &quot;{initialMessage}&quot;
                    </p>
                  </div>
                </div>
              </div>

              <form className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono flex justify-between">
                    <span>Return Address</span>
                    <span className="text-sky-500/50">Required</span>
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="engineer@company.com"
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-zinc-700"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    className="w-full bg-sky-500 text-black font-bold py-3 rounded-lg hover:bg-sky-400 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-2"
                  >
                    Transmit Signal
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="flex items-center justify-center gap-2 text-[10px] text-zinc-600 hover:text-zinc-400 uppercase tracking-widest transition-colors py-2"
                  >
                    <IconArrowLeft className="h-3 w-3" />
                    Edit Payload
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
