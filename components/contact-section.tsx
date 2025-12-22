"use client";
import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { motion, AnimatePresence } from "motion/react";

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
    // Simulate a system delay for the "processing" feel
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  return (
    <section className="flex flex-col items-center justify-center pb-40 relative">
      <h2 className="mb-10 text-3xl md:text-5xl text-white font-bold tracking-tighter">
        Initialize a{" "}
        <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">
          Connection
        </span>
      </h2>

      <div className="w-full max-w-xl min-h-25 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="input"
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={(e) => setInitialMessage(e.target.value)}
                onSubmit={onSubmit}
              />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl shadow-2xl"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white">
                  Finalize Connection
                </h3>
                <p className="text-zinc-500 text-xs mt-1">
                  Routing message: &quot;{initialMessage}&quot;
                </p>
              </div>

              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                    Return Email
                  </label>
                  <input
                    type="email"
                    placeholder="engineer@company.com"
                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
                <button className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition-colors text-sm">
                  Transmit Message
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
