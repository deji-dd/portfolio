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
            Initial deployments and freelance growth.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <LogEntry text="INIT: Ginoba Foundation Site Creation" />
            <LogEntry text="PUBLISH: Ginoba Foundation Site" />
            <LogEntry text="INIT: Glorious Eagles Site Creation" />
            <LogEntry text="PUBLISH: Glorious Eagles Site" />

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
            <LogEntry text="PUBLISH: Mental Health Co Landing Page" />
            <LogEntry text="DEPLOY: ERP System Mgmt" />
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Optimizing the Cloud Lab and deploying corporate tools.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <LogEntry text="BUILD: Corporate Invoice Tracker" />
            <LogEntry text="PUBLISH: BT Technologies Site" />
            <LogEntry text="MOUNT: Custom Azure VPS" />
            <LogEntry text="INIT: Portfolio Deployed" />
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
