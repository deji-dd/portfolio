import { Timeline } from "@/components/ui/timeline";

export function SystemLogs() {
  const data = [
    {
      title: "2025",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Optimizing the Cloud Lab and deploying corporate tools.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-800 p-2 rounded-lg border border-white/10 text-[10px] text-zinc-400 font-mono">
              BUILD: Corporate Invoice Tracker
            </div>
            <div className="bg-zinc-800 p-2 rounded-lg border border-white/10 text-[10px] text-zinc-400 font-mono">
              PUBLISH: BT Technologies Site
            </div>
            <div className="bg-zinc-800 p-2 rounded-lg border border-white/10 text-[10px] text-zinc-400 font-mono">
              MOUNT: Custom Azure VPS
            </div>
            <div className="bg-zinc-800 p-2 rounded-lg border border-white/10 text-[10px] text-zinc-400 font-mono">
              INIT: Portfolio Deployed
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Established core infrastructure and expanded client projects.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-800 p-2 rounded-lg border border-white/10 text-[10px] text-zinc-400 font-mono">
              PUBLISH: Mental Health Co Landing Page
            </div>
            <div className="bg-zinc-800 p-2 rounded-lg border border-white/10 text-[10px] text-zinc-400 font-mono">
              DEPLOY: ERP System Mgmt
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Initial deployments and freelance growth.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-800 p-2 rounded-lg border border-white/10 text-[10px] text-zinc-400 font-mono">
              PUBLISH: Glorious Eagles Site
            </div>
            <div className="bg-zinc-800 p-2 rounded-lg border border-white/10 text-[10px] text-zinc-400 font-mono">
              PUBLISH: Ginoba Foundation
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-black/50 rounded-xl overflow-hidden border border-white/10 h-full">
      <Timeline data={data} />
    </div>
  );
}
