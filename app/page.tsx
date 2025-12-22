"use client";
import { ActivityFeed } from "@/components/activity-feed";
import { InteractiveTree } from "@/components/interactive-tree";
import { LabStatus } from "@/components/lab-status";
import { StackCloud } from "@/components/stack-cloud";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconExchange,
  IconHome,
  IconTerminal2,
} from "@tabler/icons-react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";

const words = `Systems Engineer & Next.js Architect. I build the software glue that connects modern web interfaces with robust enterprise infrastructure.`;

const items = [
  {
    title: "The Cloud Lab",
    description:
      "Personal infrastructure running on M-series hardware via Tailscale networking.",
    header: <LabStatus />,
    className: "md:col-span-1",
    icon: null,
  },
  {
    title: "Institutional Knowledge Base",
    description:
      "Streamlining IS Unit onboarding with a localized Next.js & Docker documentation system.",
    header: <InteractiveTree />,
    className: "md:col-span-1",
    icon: null,
  },
  {
    title: "Enterprise Systems",
    description:
      "Administration and custom module development for ERPNext & HRMS environments.",
    header: <ActivityFeed />,
    className: "md:col-span-1",
    icon: null,
  },
  {
    title: "The Hybrid Stack",
    description:
      "Bridging modern frontend architectures with robust systems engineering and enterprise infrastructure.",
    header: <StackCloud />,
    className: "md:col-span-3 md:row-span-2 h-full",
  },
];

export default function Home() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Projects",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#grid", // We'll add an ID to your grid
    },
    {
      title: "Infrastructure",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com", // Replace with yours
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://linkedin.com", // Replace with yours
    },
  ];

  const placeholders = [
    "How can I reach you?",
    "Tell me about the IS Unit documentation...",
    "What's the status of the Lab?",
    "Ask about ERPNext customizations...",
    "Initialize a collaboration...",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
  };

  return (
    <div className="min-h-screen bg-black py-20 px-4 relative">
      <div className="max-w-6xl mx-auto relative z-20 flex flex-col space-y-20 md:space-y-52">
        <section className="mt-10 md:mt-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-4"
          >
            Ayodeji B<span className="text-blue-500">.</span>
          </motion.h1>

          <div className="max-w-2xl">
            <TextGenerateEffect words={words} className="text-zinc-400" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex gap-4 mt-8"
          >
            {/* Minimalist badges for quick context */}
            <span className="text-[10px] font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-500 uppercase">
              Lagos, NG
            </span>
            <span className="text-[10px] font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-500 uppercase">
              Available for Architecture
            </span>
          </motion.div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[1fr]">
          {items.map((item, i) => (
            <Modal key={i}>
              <ModalTrigger
                className={cn(
                  "relative h-full w-full flex flex-col group/modal-btn",
                  item.className
                )}
              >
                <CardSpotlight
                  radius={100}
                  className={cn(
                    "p-8 border border-white/10 bg-zinc-900/50 backdrop-blur-sm group overflow-hidden h-full",
                    item.className
                  )}
                >
                  <div className="relative z-20 h-full flex flex-col">
                    <div className="flex-1">{item.header}</div>
                    <div className="mt-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-zinc-400 mt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardSpotlight>
              </ModalTrigger>

              <ModalBody>
                <ModalContent>
                  <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                    Deep Dive: {item.title}
                  </h4>
                  <div className="flex justify-center items-center">
                    <p className="text-zinc-400 font-mono text-sm">
                      Technical Overview of the {item.title} implementation...
                    </p>
                  </div>
                </ModalContent>
                <ModalFooter className="gap-4">
                  <button className="px-2 py-1 bg-gray-200 text-black dark:bg-white dark:text-black border border-gray-300 rounded-md text-sm w-28">
                    Live Demo
                  </button>
                  <button className="bg-black text-white dark:bg-zinc-900 dark:text-white px-2 py-1 rounded-md border border-white/10 text-sm w-28">
                    Source Code
                  </button>
                </ModalFooter>
              </ModalBody>
            </Modal>
          ))}
        </div>

        <section className="flex flex-col items-center justify-center pb-40">
          <h2 className="mb-10 text-xl text-center sm:text-4xl dark:text-white text-black font-bold tracking-tighter">
            Initialize&nbsp;&nbsp;a&nbsp;&nbsp;
            <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">
              Connection
            </span>
          </h2>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
          />
        </section>
      </div>
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
        <FloatingDock items={links} />
      </div>
      <footer className="w-full border-t border-white/5 bg-zinc-900/20 py-4 mt-20 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
          <div className="flex gap-6">
            <span>
              Status: <span className="text-green-500">Production</span>
            </span>
            <span>Loc: Lagos, NG</span>
          </div>
          <div className="hidden md:block">
            Build: <span className="text-zinc-400">v16.1.0-stable</span>
          </div>
          <div>© 2025 Ayodeji B.</div>
        </div>
      </footer>
      <BackgroundBeams />
    </div>
  );
}
