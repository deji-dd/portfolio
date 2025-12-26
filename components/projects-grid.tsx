"use client";
import { memo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ActivityFeed } from "@/components/activity-feed";
import { InteractiveTree } from "@/components/interactive-tree";
import { StackCloud } from "@/components/stack-cloud";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  useModal,
} from "@/components/ui/animated-modal";
import { motion } from "motion/react";
import { NetworkMesh } from "./network-mesh";
import { LabStatus } from "./lab-status";
import { SystemLogs } from "./system-logs";
import { HardwareSpecs } from "./hardware-specs";

type Item = {
  title: string;
  description: string;
  header: React.ReactNode;
  className?: string;
  modalEnabled?: boolean; // default to true when undefined
  modalContent?: React.ReactNode;
};

const items: Item[] = [
  {
    title: "The Cloud Lab",
    description:
      "Personal infrastructure running on M-series hardware via Tailscale networking.",
    header: <NetworkMesh />,
    className: "md:col-span-2",
    modalContent: (
      <ModalContent className="max-w-3xl overflow-y-auto">
        <div className="flex flex-col gap-6 p-6">
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
              {/* We pass the real URL to the status component */}
              <LabStatus />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-zinc-400 text-sm leading-relaxed">
              My development environment is a{" "}
              <span className="text-white">Cloud Lab</span> hosted on an Azure
              VPS, accessible via a custom subdomain. Using{" "}
              <span className="text-white">Tailscale</span> mesh networking, all
              my devices connect securely without exposing ports. Containers are
              orchestrated via <span className="text-white">Docker</span>, with{" "}
              <span className="text-white">NPM</span> for reverse proxy and{" "}
              <span className="text-white">Portainer</span> for container
              management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-white/5 bg-zinc-900/30">
              <h5 className="text-zinc-300 text-[10px] uppercase font-bold mb-2">
                Container Orchestration
              </h5>
              <p className="text-zinc-500 text-xs">
                Using <span className="text-blue-400 font-mono">Docker</span> to
                containerize services, with{" "}
                <span className="text-blue-400 font-mono">Portainer</span> for
                visual management and easy container lifecycle control across
                the lab.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-zinc-900/30">
              <h5 className="text-zinc-300 text-[10px] uppercase font-bold mb-2">
                Zero-Trust Networking
              </h5>
              <p className="text-zinc-500 text-xs">
                All devices connected via{" "}
                <span className="text-blue-400 font-mono">Tailscale</span> mesh
                network. No ports exposed—secure access to the Azure VPS lab
                from any device, anywhere in the world.
              </p>
            </div>
          </div>

          {/* Docker Containers */}
          <div className="bg-black/50 p-4 rounded-lg border border-white/10 font-mono text-[11px] text-zinc-400">
            <div className="flex items-center gap-2 mb-2 text-blue-500">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>docker ps --format table</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Container</span>
                <span>Status</span>
                <span>Memory</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>portainer</span>
                <span className="text-green-500">running</span>
                <span>45MB</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>npm-proxy</span>
                <span className="text-green-500">running</span>
                <span>32MB</span>
              </div>
            </div>
          </div>
        </div>
      </ModalContent>
    ),
  },
  {
    title: "Institutional Knowledge Base",
    description:
      "Streamlining IS Unit onboarding with a localized Next.js & Docker documentation system.",
    header: <InteractiveTree />,
    className: "md:col-span-1",
    modalContent: (
      <ModalContent className="max-w-3xl overflow-y-auto">
        <div className="flex flex-col gap-6 p-6">
          <header>
            <h4 className="text-3xl font-bold text-white tracking-tighter">
              Institutional Knowledge Base
            </h4>
            <p className="text-blue-500 font-mono text-xs mt-1 uppercase">
              Next.js • Docker • PM2 • Documentation-as-Code
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <div className="space-y-4">
              <h5 className="text-zinc-100 font-semibold border-l-2 border-blue-500 pl-3">
                The Problem
              </h5>
              <p className="text-zinc-400 text-sm leading-relaxed">
                The IS Unit staff relied heavily on verbal onboarding. This
                &quot;tribal knowledge&quot; led to inconsistent server
                configurations, repeated questions, and bottlenecks when senior
                staff were unavailable.
              </p>
            </div>

            <div className="space-y-4">
              <h5 className="text-zinc-100 font-semibold border-l-2 border-green-500 pl-3">
                The Solution
              </h5>
              <p className="text-zinc-400 text-sm leading-relaxed">
                I engineered a localized, high-performance documentation engine.
                By using Next.js for the frontend and Docker for the deployment,
                I ensured the docs were as reliable as the systems they
                described.
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/50 rounded-xl p-4 border border-white/5 font-mono text-[11px]">
            <div className="text-zinc-500 mb-2">
              {/* Infrastructure Snippet */}
            </div>
            <pre className="text-blue-400">
              {`services:
  docs:
    container_name: internal-docs
    build: .
    restart: unless-stopped
    ports:
      - "3004:3000"
    environment:
      - NODE_ENV=production`}
            </pre>
          </div>

          <div className="space-y-2">
            <h5 className=" font-semibold uppercase text-[10px] tracking-widest text-zinc-500">
              Key Outcomes
            </h5>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-zinc-400">
              <li className="flex items-center gap-2">
                <div className="h-1 w-1 bg-blue-500 rounded-full" />
                Reduced onboarding time by ~40%
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1 w-1 bg-blue-500 rounded-full" />
                Standardized SSL/Exchange renewal docs
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1 w-1 bg-blue-500 rounded-full" />
                Instant search via localized indexing
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1 w-1 bg-blue-500 rounded-full" />
                Zero-downtime containerized management
              </li>
            </ul>
          </div>
        </div>
      </ModalContent>
    ),
  },

  {
    title: "Enterprise Systems",
    description:
      "Administration and custom module development for ERPNext & HRMS environments.",
    header: <ActivityFeed />,
    className: "md:col-span-1",
    modalContent: (
      <ModalContent className="max-w-3xl overflow-y-auto">
        <div className="flex flex-col gap-6 p-6">
          <header>
            <h4 className="text-3xl font-bold text-white tracking-tighter uppercase">
              Enterprise Infrastructure
            </h4>
            <p className="text-purple-500 font-mono text-[10px] mt-1 uppercase tracking-widest">
              Windows Server • Hyper-V • Docker • ERPNext • Production Admin
            </p>
          </header>

          <div className="space-y-4">
            <p className="text-zinc-400 text-sm leading-relaxed">
              I manage the core production environment for the company. This
              includes a
              <span className="text-white"> Physical Hyper-V Server</span>{" "}
              hosting a Windows 11 VM that serves as our primary application
              node.
            </p>
          </div>

          <div className="bg-zinc-900/80 p-5 rounded-xl border border-white/10 space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-1">
                <h5 className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  ERP & HRMS Control
                </h5>
                <p className="text-zinc-500 text-[11px]">
                  Administering the Docker-based production branch for ERPNext.
                  Developing custom Python hooks and JS escalations to automate
                  HR workflows.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <h5 className="text-xs font-bold uppercase tracking-wider text-purple-400">
                Documentation Engine
              </h5>
              <p className="text-zinc-500 text-[11px]">
                Deploying the IS Unit knowledge base as a containerized service
                within the production VM, ensuring 99.9% availability for staff
                onboarding.
              </p>
            </div>
          </div>

          {/* System Metadata Visual */}
          <div className="flex gap-2 font-mono text-[9px]">
            <div className="px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-white/5">
              HYPER-V: ACTIVE
            </div>
            <div className="px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-white/5">
              DOCKER-ENGINE: RUNNING
            </div>
            <div className="px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-white/5">
              CERT: RENEWED (EXCHANGE)
            </div>
          </div>
        </div>
      </ModalContent>
    ),
  },
  {
    title: "System Events",
    description: "Chronological log of key project milestones and deployments.",
    header: <SystemLogs />,
    className: "md:col-span-2", // Wider for logs
    modalEnabled: false,
  },
  {
    title: "Hardware Manifest",
    description: "Live specification of the underlying physical infrastructure.",
    header: <HardwareSpecs />,
    className: "md:col-span-1",
    modalEnabled: false,
  },
  {
    title: "The Hybrid Stack",
    description:
      "Bridging modern frontend architectures with robust systems engineering and enterprise infrastructure.",
    header: <StackCloud />,
    className: "md:col-span-2 md:row-span-2",
    modalEnabled: false,
  },
];

interface ProjectsGridProps {
  onModalStateChange: (isOpen: boolean) => void;
}

const ProjectCard = memo(function ProjectCard({
  item,
  onModalStateChange,
}: {
  item: Item;
  onModalStateChange: (isOpen: boolean) => void;
}) {
  const modalEnabled = item.modalEnabled !== false;

  if (!modalEnabled) {
    return (
      <div
        className={cn(
          "relative w-full flex flex-col group/modal-btn cursor-default",

          item.className
        )}
      >
        <CardSpotlight
          radius={100}
          className={cn(
            "p-8 border border-white/10 bg-zinc-900/50 backdrop-blur-sm group overflow-hidden",
            item.className
          )}
        >
          <div className="relative z-20 h-full flex flex-col">
            <div className="flex-1">{item.header}</div>
            <div className="mt-4">
              <h3 className="text-left text-xl font-bold text-white group-hover:text-sky-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-left text-sm text-zinc-400 mt-2">
                {item.description}
              </p>
            </div>
          </div>
        </CardSpotlight>
      </div>
    );
  }

  return (
    <ModalCardContent item={item} onModalStateChange={onModalStateChange} />
  );
});

const ModalCardContent = memo(function ModalCardContent({
  item,
  onModalStateChange,
}: {
  item: Item;
  onModalStateChange: (isOpen: boolean) => void;
}) {
  const { open } = useModal();
  const modalEnabled = item.modalEnabled !== false;

  useEffect(() => {
    onModalStateChange(open);
  }, [open, onModalStateChange]);

  return (
    <ModalTrigger
      className={cn(
        "relative w-full flex flex-col group/modal-btn h-100",
        item.className
      )}
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.01 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="h-full w-full"
      >
        <CardSpotlight
          radius={150} // Increased for more visibility
          className={cn(
            "p-8 border border-white/5 bg-zinc-900/40 backdrop-blur-md group overflow-hidden h-full transition-all duration-500",
            "hover:border-sky-500/40 hover:shadow-[0_0_30px_-10px_rgba(56,189,248,0.2)]",
            item.className
          )}
        >
          <div className="relative z-20 h-full flex flex-col">
            <div className="flex-1">{item.header}</div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <h3 className="text-left text-xl font-bold text-white group-hover:text-sky-400 transition-colors">
                  {item.title}
                </h3>
                {modalEnabled && (
                  <div className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
              <p className="text-left text-sm text-zinc-500 mt-2 group-hover:text-zinc-400 transition-colors">
                {item.description}
              </p>
            </div>
          </div>
        </CardSpotlight>
      </motion.div>
    </ModalTrigger>
  );
});

export function ProjectsGrid({ onModalStateChange }: ProjectsGridProps) {
  return (
    <div id="grid" className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item) => {
        const modalEnabled = item.modalEnabled !== false;

        if (!modalEnabled) {
          return (
            <ProjectCard
              key={item.title}
              item={item}
              onModalStateChange={onModalStateChange}
            />
          );
        }

        return (
          <Modal key={item.title}>
            <ProjectCard item={item} onModalStateChange={onModalStateChange} />
            <ModalBody>
              {item.modalContent}
              <ModalFooter className="gap-4">
                <button
                  aria-label="Open live demo"
                  className="px-2 py-1 bg-gray-200 text-black dark:bg-white dark:text-black border border-gray-300 rounded-md text-sm w-28"
                >
                  Live Demo
                </button>
                <button
                  aria-label="View source code"
                  className="bg-black text-white dark:bg-zinc-900 dark:text-white px-2 py-1 rounded-md border border-white/10 text-sm w-28"
                >
                  Source Code
                </button>
              </ModalFooter>
            </ModalBody>
          </Modal>
        );
      })}
    </div>
  );
}
