"use client";


export function ScanlineOverlay() {
  if (process.env.NODE_ENV === "development") return null;

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
