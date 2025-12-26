"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function ScanlineOverlay() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden select-none">
      {/* Scanlines */}
      <div
        className="absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent 50%, #000 50%)",
          backgroundSize: "100% 4px",
        }}
      />
      

      {/* Radial Vignette */}
      <div className="absolute inset-0 z-30 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />
      
    </div>
  );
}
