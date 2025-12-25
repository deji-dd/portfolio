"use client";
import { motion } from "motion/react";
import {
  IconWorld,
  IconBrandNextjs,
  IconLockAccess,
  IconServer,
  IconDeviceDesktop,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const nodes = [
  {
    id: "dns",
    label: "Cloudflare DNS",
    icon: <IconWorld className="w-5 h-5" />,
    color: "text-orange-400",
    desc: "Domain & Nameservers",
  },
  {
    id: "portfolio",
    label: "Vercel Edge",
    icon: <IconBrandNextjs className="w-5 h-5" />,
    color: "text-white",
    desc: "Portfolio (domain root)",
  },
  {
    id: "tunnel",
    label: "Tailscale Mesh",
    icon: <IconLockAccess className="w-5 h-5" />,
    color: "text-sky-500",
    desc: "Zero-Trust Network",
  },
  {
    id: "lab",
    label: "Azure VPS",
    icon: <IconServer className="w-5 h-5" />,
    color: "text-green-500",
    desc: "Cloud Lab (lab.domain)",
  },
  {
    id: "devices",
    label: "All Devices",
    icon: <IconDeviceDesktop className="w-5 h-5" />,
    color: "text-purple-500",
    desc: "Mesh-Connected Network",
  },
];

export function NetworkMesh() {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  return (
    <div className="w-full p-4 md:p-8 rounded-2xl border border-white/5 bg-zinc-900/20 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] mask-[linear-gradient(to_bottom,transparent,black)]" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 min-h-40">
        {/* The Connection Lines */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-zinc-800 -translate-y-1/2 hidden md:block" />

        {/* The Moving Packet */}
        <div className="absolute top-1/2 left-4 right-4 h-1 -translate-y-1/2 hidden md:block overflow-hidden">
          <motion.div
            className="w-20 h-full bg-linear-to-r from-transparent via-sky-500 to-transparent"
            animate={{ x: ["-100%", "1000%"] }} // Moves across the line
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {nodes.map((node, i) => (
          <div key={node.id} className="relative group">
            <motion.div
              onHoverStart={() => setActiveNode(i)}
              onHoverEnd={() => setActiveNode(null)}
              className={cn(
                "relative z-20 p-4 rounded-xl border border-zinc-800 bg-zinc-950 transition-all duration-300 cursor-pointer",
                activeNode === i
                  ? "border-sky-500/50 shadow-[0_0_20px_rgba(14,165,233,0.3)] scale-110"
                  : "hover:border-zinc-700"
              )}
            >
              <div className={cn("mb-2 flex justify-center", node.color)}>
                {node.icon}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 text-center">
                {node.label}
              </div>
            </motion.div>

            {/* Hover Tooltip */}
            <div
              className={cn(
                "absolute -bottom-10 left-1/2 -translate-x-1/2 w-max px-3 py-1 rounded bg-zinc-800 text-[10px] text-zinc-300 transition-all duration-200 pointer-events-none",
                activeNode === i
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              )}
            >
              {node.desc}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center text-[10px] text-zinc-600 font-mono uppercase">
        <div>
          Status: <span className="text-green-500">Mesh_Active</span>
        </div>
        <div>
          Latency: <span className="text-zinc-400">~24ms</span>
        </div>
      </div>
    </div>
  );
}
