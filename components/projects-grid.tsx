import { cn } from "@/lib/utils";
import { ActivityFeed } from "@/components/activity-feed";
import { InteractiveTree } from "@/components/interactive-tree";
import { BentoGrid } from "@/components/ui/bento-grid";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { TechStackCard } from "@/components/ui/tech-stack-card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { NetworkMesh } from "./network-mesh";
import { LabStatus } from "./lab-status";
import { HardwareSpecs } from "./hardware-specs";

import {
  IconCpu,
  IconNetwork,
  IconFolders,
  IconServer,
} from "@tabler/icons-react";

type Item = {
  title: string;
  description: string;
  header: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  modalEnabled?: boolean;
  modalContent?: React.ReactNode;
  isCustomCard?: boolean; // Flag to render custom card directly (like TechStack)
};

const items: Item[] = [
  {
    title: "The Cloud Lab",
    description: "Personal VPS infrastructure on Azure & M-series.",
    header: <NetworkMesh />,
    icon: <IconNetwork className="h-4 w-4 text-neutral-500" />,
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
              <LabStatus />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-zinc-400 text-sm leading-relaxed">
              My development environment is a{" "}
              <span className="text-white">Cloud Lab</span> hosted on an Azure
              VPS, accessible via a custom subdomain. Using{" "}
              <span className="text-white">Tailscale</span> mesh networking, all
              my devices connect securely.
            </p>
          </div>
        </div>
      </ModalContent>
    ),
  },
  {
    title: "Hardware Manifest",
    description: "Live infrastructure spec.",
    header: <HardwareSpecs />,
    icon: <IconCpu className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-1",
    modalEnabled: false,
  },
  {
    title: "Enterprise Systems",
    description: "Admin & modules for ERPNext & HRMS.",
    header: <ActivityFeed />,
    icon: <IconServer className="h-4 w-4 text-neutral-500" />,
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
          <p className="text-zinc-400 text-sm mt-4">
            Administration and custom module development for ERPNext & HRMS environments.
          </p>
        </div>
      </ModalContent>
    ),
  },
  {
    title: "Institutional Knowledge Base",
    description: "Localized Next.js & Docker documentation system.",
    header: <InteractiveTree />,
    icon: <IconFolders className="h-4 w-4 text-neutral-500" />,
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
          <p className="text-zinc-400 text-sm mt-4">
            Streamlining IS Unit onboarding with a localized Next.js & Docker documentation system.
          </p>
        </div>
      </ModalContent>
    ),
  },
  {
    title: "The Hybrid Stack",
    description: "Frontend & Systems Engineering.",
    header: <TechStackCard />, // Using the new component directly
    className: "md:col-span-1",
    modalEnabled: false,
    isCustomCard: true,
  },
];

interface ProjectsGridProps {
  onModalStateChange: (isOpen: boolean) => void;
}

export function ProjectsGrid({ }: ProjectsGridProps) {
  return (
    <div>
      <div className="mb-4 text-center">
        <p className="text-xs text-zinc-500 animate-pulse tracking-widest uppercase">
          [TIP] Click visual cards to access secure details
        </p>
      </div>
      <BentoGrid className="max-w-6xl mx-auto">
        {items.map((item, i) => {
          const modalEnabled = item.modalEnabled !== false;

          // Use HoverBorderGradient for standard items
          const content = (
            <HoverBorderGradient
              containerClassName="h-full w-full"
              className="h-full w-full bg-black p-4 flex flex-col justify-between"
              as="div"
            >
              {/* Header Container */}
              <div className="flex-1 w-full min-h-[6rem] rounded-xl overflow-hidden border border-white/5 bg-zinc-900/50 relative">
                {item.header}
              </div>

              {/* Content Container */}
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
          );

          if (!modalEnabled) {
            return <div key={i} className={item.className}>{content}</div>;
          }

          return (
            <Modal key={i}>
              <ModalTrigger className={cn("h-full w-full", item.className)}>
                {content}
              </ModalTrigger>
              <ModalBody>
                {item.modalContent}
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
          );
        })}
      </BentoGrid>
    </div>
  );
}
