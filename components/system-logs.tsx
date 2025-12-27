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
            Deployment of initial production workloads for non-profit and healthcare sectors.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LogEntry text="PUBLISH: Ginoba Foundation Portal" />
            <LogEntry text="DEPLOY: Glorious Eagles Platform" />
            <LogEntry text="INIT: Client Intake & File Systems" />
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Transition to Systems Administration. Managed on-premise infrastructure at BT Technologies.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LogEntry text="INIT: Joined BT Technologies (SysAdmin)" />
            <LogEntry text="INIT: Physical Server Management" />
            <LogEntry text="BUILD: Internal Invoice Tracker (v1)" />
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Hybrid Engineering: Unifying Fullstack Dev with DevOps automation (Docker, AD, Firewalls).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LogEntry text="MOUNT: Enterprise ERP Cluster (Frappe)" />
            <LogEntry text="PUBLISH: Ornate Mental Health Booking" />
            <LogEntry text="DEPLOY: BT Tech Corporate Refactor" />
            <LogEntry text="BUILD: Internal Documentation Hub" />
            <LogEntry text="INIT: Cloud Lab & Portfolio v3" />
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
