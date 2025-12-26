"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  IconTerminal2,
  IconHome,
  IconBriefcase,
  IconMail,
  IconBrandGithub,
} from "@tabler/icons-react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

type Command = {
  id: string;
  title: string;
  icon: React.ReactNode;
  action: () => void;
};

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Toggle with Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    
    const openHandler = () => setIsOpen(true);

    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", openHandler);
    
    return () => {
        document.removeEventListener("keydown", down);
        window.removeEventListener("open-command-palette", openHandler);
    };
  }, []);

  const commands: Command[] = [
    {
      id: "home",
      title: "goto /home",
      icon: <IconHome className="w-4 h-4" />,
      action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    },
    {
      id: "projects",
      title: "goto /projects",
      icon: <IconBriefcase className="w-4 h-4" />,
      action: () => {
        const el = document.getElementById("projects-grid");
        el?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "contact",
      title: "goto /contact",
      icon: <IconMail className="w-4 h-4" />,
      action: () => {
         const el = document.getElementById("contact-section");
         el?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "github",
      title: "open github.com/deji-dd",
      icon: <IconBrandGithub className="w-4 h-4" />,
      action: () => window.open("https://github.com/deji-dd", "_blank"),
    },
  ];

  const handleCommandSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate processing time then close
    setTimeout(() => {
        setIsOpen(false);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[20vh]"
           onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-2xl px-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2 bg-zinc-900/50">
                    <IconTerminal2 className="w-4 h-4 text-zinc-400" />
                    <span className="text-xs font-mono text-zinc-500">SYSTEM COMMAND PALETTE</span>
                    <div className="ml-auto text-[10px] text-zinc-600 font-mono border border-zinc-800 px-1.5 py-0.5 rounded">
                        ESC to close
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-8 pb-4">
                     <PlaceholdersAndVanishInput
                        placeholders={["Type a command...", "try 'goto /projects'", "try 'open github'"]}
                        onChange={handleChange}
                        onSubmit={handleCommandSubmit}
                    />
                </div>

                {/* Suggestions / List (Static for now, could be dynamic) */}
                <div className="px-4 pb-4">
                    <div className="text-[10px] font-mono text-zinc-500 mb-2 px-2 uppercase tracking-wider">Available Commands</div>
                    <div className="space-y-1">
                        {commands.map((cmd) => (
                            <button
                                key={cmd.id}
                                onClick={() => {
                                    // Trigger pseudo-submit
                                    cmd.action();
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group font-mono"
                            >
                                <span className="opacity-50 group-hover:opacity-100 transition-opacity">
                                    {cmd.icon}
                                </span>
                                <span>{cmd.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
