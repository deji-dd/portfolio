import { cn } from "@/lib/utils";
import { IconUserCircle } from "@tabler/icons-react";
import { useGlitch } from "react-powerglitch";

export function HeroSection() {
  const glitch = useGlitch({
    playMode: "always",
    createContainers: true,
    types: {
      "background-color": false,
      "background-image": false,
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8 items-center py-10">
      <div className="flex flex-col space-y-6">
        <div className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-4 flex items-center gap-2">
          <span className="text-white">Ayodeji B</span>
          <span className="text-blue-500 text-5xl md:text-8xl">.</span>
        </div>

        <div className="text-2xl md:text-3xl font-bold text-zinc-300">
          Systems Engineer & Next.js Architect
        </div>

        <div className="max-w-lg">
          <div
            className={cn("font-bold", "text-zinc-400 text-sm md:text-base")}
          >
            <div className="mt-4">
              <div className="text-2xl leading-snug tracking-wide">
                Merging modern frontend architecture with production-grade
                systems engineering.
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <span className="text-[10px] font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-500 uppercase">
            Lagos, NG
          </span>
          <span className="text-[10px] font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-500 uppercase flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Online
          </span>
        </div>
      </div>

      <div className="relative flex justify-center md:justify-end">
        <div
          ref={glitch.ref}
          className="relative size-48 md:size-72 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900/50 flex items-center justify-center group"
        >
          {/* Placeholder UI */}
          <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/10 to-transparent opacity-50" />
          <IconUserCircle className="w-20 h-20 text-zinc-700 group-hover:text-zinc-500 transition-colors" />
          <div className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-600 animate-pulse">
            [IDENTITY_REDACTED]
          </div>

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/20" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/20" />
        </div>
      </div>
    </div>
  );
}
