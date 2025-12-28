"use client";
import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { motion, AnimatePresence } from "motion/react";
import { IconArrowLeft, IconTerminal2, IconLoader2 } from "@tabler/icons-react";
import { toast } from "sonner";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [initialMessage, setInitialMessage] = useState("");

  // Form State
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const placeholders = [
    "How can I reach you?",
    "Tell me about your Windows Server setup...",
    "Ask about ERPNext customizations...",
    "Initialize a collaboration...",
  ];

  const handleInitialSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (initialMessage.trim().length >= 10) {
      setSubmitted(true);
    } else {
      toast.error("Message too short", {
        description: "Please enter at least 10 characters to initialize connection."
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !initialMessage) return;

    setIsSubmitting(true);
    const loadingToast = toast.loading("Establishing secure connection...");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message: initialMessage }),
      });

      const data = await res.json();

      if (!res.ok) {
        let errorMessage = "Transmission failed";

        if (typeof data.error === "string") {
          errorMessage = data.error;
        } else if (data.error && typeof data.error === "object") {
          // Handle Resend error object or other objects
          errorMessage = data.error.message || JSON.stringify(data.error);
        }

        // Append validation details if available
        if (data.details && typeof data.details === "object") {
          const fieldErrors = Object.values(data.details.fieldErrors || {})
            .flat()
            .join(", ");
          if (fieldErrors) {
            errorMessage += `: ${fieldErrors}`;
          }
        }

        throw new Error(errorMessage);
      }

      toast.success("Signal Transmitted Successfully", {
        id: loadingToast,
        description: "I will respond to your frequency shortly.",
      });

      // Reset form
      setInitialMessage("");
      setEmail("");
      setSubmitted(false);
    } catch (error) {
      toast.error("Transmission Error", {
        id: loadingToast,
        description: error instanceof Error ? error.message : "Packet loss detected.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center pb-20 relative z-30">
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
                initialValue={initialMessage}
                onChange={(e) => setInitialMessage(e.target.value)}
                onSubmit={handleInitialSubmit}
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
                    <p className="text-sky-400/80 text-xs font-mono italic leading-tight line-clamp-3">
                      &quot;{initialMessage}&quot;
                    </p>
                  </div>
                </div>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono flex justify-between">
                    <span>Return Address</span>
                    <span className="text-sky-500/50">Required</span>
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="engineer@company.com"
                    disabled={isSubmitting}
                    className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label={isSubmitting ? "Transmitting signal, please wait" : "Transmit signal"}
                    aria-busy={isSubmitting}
                    aria-disabled={isSubmitting}
                    className="w-full bg-sky-500 text-black font-bold py-3 rounded-lg hover:bg-sky-400 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                  >
                    {isSubmitting ? (
                      <>
                        <IconLoader2 className="h-4 w-4 animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      "Transmit Signal"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 text-[10px] text-zinc-600 hover:text-zinc-400 uppercase tracking-widest transition-colors py-2 disabled:opacity-50"
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
