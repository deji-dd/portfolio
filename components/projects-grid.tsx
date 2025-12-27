"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { cn } from "@/lib/utils";
import { ActivityFeed } from "@/components/activity-feed";
import { InteractiveTree } from "@/components/interactive-tree";
import { BentoGrid } from "@/components/ui/bento-grid";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { NetworkMesh } from "./network-mesh";
import { LabStatus } from "./lab-status";
import { HardwareSpecs } from "./hardware-specs";
import { TechStackDisplay } from "@/components/ui/tech-stack-display";
import {
  IconCpu,
  IconNetwork,
  IconFolders,
  IconServer,
  IconArrowLeft,
} from "@tabler/icons-react";

type Item = {
  id: string; // Unique ID for layoutId
  title: string;
  description: string;
  header: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  content?: React.ReactNode; // Detail content
  isCustomCard?: boolean;
};

// Data Definition
const items: Item[] = [
  {
    id: "cloud-lab",
    title: "The Cloud Lab",
    description: "Personal VPS infrastructure on Azure & M-series.",
    header: <NetworkMesh />,
    icon: <IconNetwork className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-2",
    content: (
      <div className="flex flex-col gap-6 p-6 h-full overflow-y-auto">
        <header>
          <h4 className="text-3xl font-bold text-white tracking-tighter uppercase">
            The Cloud Lab
          </h4>
          <p className="text-blue-500 font-mono text-[10px] mt-1 uppercase tracking-widest">
            Azure VPS • Ubuntu Linux • Docker • NPM • Portainer • Tailscale
          </p>
        </header>

        <div className="my-6">
          <h5 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-4">
            Live Telemetry Stream
          </h5>
          <div className="p-4 rounded-xl border border-white/10 bg-black/50">
            <LabStatus />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-zinc-400 text-sm leading-relaxed">
            My development environment is a{" "}
            <span className="text-white">Cloud Lab</span> hosted on an Azure VPS,
            accessible via a custom subdomain. Using{" "}
            <span className="text-white">Tailscale</span> mesh networking, all my
            devices connect securely.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "hardware",
    title: "Hardware Manifest",
    description: "Live infrastructure spec.",
    header: <HardwareSpecs />,
    icon: <IconCpu className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-1",
    content: (
      <div className="p-6">
        <HardwareSpecs />
        <p className="mt-4 text-zinc-400 text-sm">Real-time hardware specifications of the Cloud Lab environment.</p>
      </div>
    ),
  },
  {
    id: "tech-stack",
    title: "The Hybrid Stack",
    description: "Frontend & Systems Engineering.",
    header: <TechStackDisplay />,
    className: "md:col-span-2 md:row-span-2",
    isCustomCard: true,
    content: (
      <div className="p-6 h-full flex flex-col">
        <h4 className="text-3xl font-bold text-white tracking-tighter uppercase mb-6">
          Command Center Stack
        </h4>
        <div className="flex-1 min-h-100">
          <TechStackDisplay />
        </div>
      </div>
    )
  },
  {
    id: "enterprise",
    title: "Enterprise Systems",
    description: "Admin & modules for ERPNext & HRMS.",
    header: <ActivityFeed />,
    icon: <IconServer className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-1",
    content: (
      <div className="flex flex-col gap-6 p-6 h-full overflow-y-auto">
        <header>
          <h4 className="text-3xl font-bold text-white tracking-tighter uppercase">
            Enterprise Infrastructure
          </h4>
          <p className="text-purple-500 font-mono text-[10px] mt-1 uppercase tracking-widest">
            Windows Server • Hyper-V • Docker • ERPNext • Production Admin
          </p>
        </header>
        <p className="text-zinc-400 text-sm mt-4">
          Administration and custom module development for ERPNext & HRMS
          environments.
        </p>
      </div>
    ),
  },
  {
    id: "knowledge-base",
    title: "Institutional Knowledge Base",
    description: "Localized Next.js & Docker documentation system.",
    header: <InteractiveTree />,
    icon: <IconFolders className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-1",
    content: (
      <div className="flex flex-col gap-6 p-6 h-full overflow-y-auto">
        <header>
          <h4 className="text-3xl font-bold text-white tracking-tighter">
            Institutional Knowledge Base
          </h4>
          <p className="text-blue-500 font-mono text-xs mt-1 uppercase">
            Next.js • Docker • PM2 • Documentation-as-Code
          </p>
        </header>
        <p className="text-zinc-400 text-sm mt-4">
          Streamlining IS Unit onboarding with a localized Next.js & Docker
          documentation system.
        </p>
      </div>
    ),
  },
];

export function ProjectsGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedItem = items.find((i) => i.id === selectedId);

  return (
    <LayoutGroup>
      <div className="mb-4 text-center">
        <AnimatePresence mode="wait">
          {!selectedId && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-zinc-500 animate-pulse tracking-widest uppercase"
            >
              [TIP] Click modules to expand command view
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Grid View */}
      <AnimatePresence mode="popLayout">
        {!selectedId ? (
          <BentoGrid className="max-w-6xl mx-auto">
            {items.map((item) => (
              <motion.div
                layoutId={`card-${item.id}`}
                key={item.id}
                className={cn("cursor-pointer relative", item.className)}
                onClick={() => setSelectedId(item.id)}
              >
                <HoverBorderGradient
                  containerClassName="h-full w-full"
                  className="h-full w-full bg-black p-4 flex flex-col justify-between"
                  as="div"
                >
                  {/* Header */}
                  <div className="flex-1 w-full min-h-24 rounded-xl overflow-hidden border border-white/5 bg-zinc-900/50 relative">
                    {/* Add pointer-events-none to children in grid view to prevent interaction conflicts */}
                    <div className="pointer-events-none h-full w-full">
                      {item.header}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="mt-4 flex flex-col items-start space-y-2">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <h3 className="font-bold text-neutral-200 tracking-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-neutral-400 text-xs text-left">
                      {item.description}
                    </p>
                  </div>
                </HoverBorderGradient>
              </motion.div>
            ))}
          </BentoGrid>
        ) : (
          /* Master-Detail View */
          <div className="max-w-6xl pe-2 md:pe-0 mx-auto h-auto md:h-150 flex flex-col md:flex-row gap-4">
            {/* Left Sidebar (List) */}
            <div className="w-full md:w-87.5 shrink-0 flex flex-col gap-2 overflow-y-auto pr-2 max-h-full">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-zinc-500 hover:text-white mb-4 text-sm font-mono uppercase tracking-wider"
                onClick={() => setSelectedId(null)}
              >
                <IconArrowLeft className="w-4 h-4" /> Back to Grid
              </motion.button>

              {items.map((item) => (
                <motion.div
                  layoutId={`card-${item.id}`}
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={cn(
                    "p-4 rounded-xl border cursor-pointer transition-colors relative overflow-hidden",
                    selectedId === item.id
                      ? "bg-zinc-900 border-white/20"
                      : "bg-black border-white/5 hover:border-white/10"
                  )}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    {item.icon}
                    <div className="flex flex-col items-start">
                      <h3 className={cn("text-sm font-bold", selectedId === item.id ? "text-white" : "text-zinc-400")}>
                        {item.title}
                      </h3>
                      {selectedId === item.id && (
                        <p className="text-[10px] text-zinc-500 mt-1 line-clamp-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Active Indicator */}
                  {selectedId === item.id && (
                    <motion.div
                      layoutId="active-glow"
                      className="absolute inset-0 bg-blue-500/5 z-0"
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Right Content */}
            <motion.div
              key="content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.2 }}
              className="w-87.5 md:w-162.5 shrink-0 bg-black border border-white/10 rounded-2xl overflow-hidden relative min-h-125"
            >
              {/* Scanline overlay for detail view */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-1 bg-size-[100%_2px,3px_100%] opacity-20" />

              <div className="relative z-10 h-full">
                {selectedItem?.content}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
