"use client";
import { cn } from "@/lib/utils";
import { ActivityFeed } from "@/components/activity-feed";
import { InteractiveTree } from "@/components/interactive-tree";
import { LabStatus } from "@/components/lab-status";
import { StackCloud } from "@/components/stack-cloud";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";

const items = [
  {
    title: "The Cloud Lab",
    description:
      "Personal infrastructure running on M-series hardware via Tailscale networking.",
    header: <LabStatus />,
    className: "md:col-span-1",
  },
  {
    title: "Institutional Knowledge Base",
    description:
      "Streamlining IS Unit onboarding with a localized Next.js & Docker documentation system.",
    header: <InteractiveTree />,
    className: "md:col-span-1",
  },
  {
    title: "Enterprise Systems",
    description:
      "Administration and custom module development for ERPNext & HRMS environments.",
    header: <ActivityFeed />,
    className: "md:col-span-1",
  },
  {
    title: "The Hybrid Stack",
    description:
      "Bridging modern frontend architectures with robust systems engineering and enterprise infrastructure.",
    header: <StackCloud />,
    className: "md:col-span-3 md:row-span-2 h-full",
  },
];

export function ProjectsGrid() {
  return (
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
  );
}
