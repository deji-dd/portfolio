import { Timeline } from "@/components/ui/timeline";
import { cn } from "@/lib/utils";

const LogEntry = ({ text }: { text: string }) => {
  const [prefix, ...rest] = text.split(":");
  const content = rest.join(":").trim();

  let colorClass = "text-zinc-400";
  if (prefix === "PUBLISH") colorClass = "text-emerald-400";
  if (prefix === "DEPLOY") colorClass = "text-violet-400";
  if (prefix === "BUILD") colorClass = "text-blue-400";
  if (prefix === "MOUNT") colorClass = "text-orange-400";
  if (prefix === "INIT") colorClass = "text-white";

  return (
    <div className="bg-zinc-900/50 p-2 rounded-lg border border-white/10 text-[10px] font-mono">
      <span className={cn("font-bold mr-2", colorClass)}>{prefix}:</span>
      <span className="text-zinc-400">{content}</span>
    </div>
  );
};

export function SystemLogs() {
  const data = [
    {
      title: "2023",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Foundation phase: Building the core infrastructure and initial client deployments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LogEntry text="INIT: Deji.dev Network Initialization" />
            <LogEntry text="PUBLISH: Ginoba Foundation Portal" />
            <LogEntry text="MOUNT: Private Cloud Storage Cluster" />
            <LogEntry text="DEPLOY: Glorious Eagles Platform" />
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Expansion phase: Scaling systems and integrating complex enterprise modules.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LogEntry text="PUBLISH: Mental Health Co. Landing Page" />
            <LogEntry text="BUILD: ERPNext Custom HRMS Module" />
            <LogEntry text="DEPLOY: Legacy System Migration (v2)" />
            <LogEntry text="MOUNT: Docker Swarm Cluster" />
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Optimization phase: Automated pipelines and high-performance architecture.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LogEntry text="BUILD: Corporate Invoice Intelligence System" />
            <LogEntry text="PUBLISH: BT Technologies Corporate Site" />
            <LogEntry text="MOUNT: Azure Hybrid Cloud Environment" />
            <LogEntry text="INIT: System Command Center (Portfolio v3)" />
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
