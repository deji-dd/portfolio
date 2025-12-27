"use client";
import { HeroSection } from "@/components/hero-section";
import { ProjectsGrid } from "@/components/projects-grid";
import { ContactSection } from "@/components/contact-section";
import { NavigationDock } from "@/components/navigation-dock";
import { PageFooter } from "@/components/page-footer";
import { GridOverlay } from "@/components/ui/grid-overlay";
import { DataFlowParticles } from "@/components/ui/data-flow-particles";
import { CommandPalette } from "@/components/command-palette";
import { OnboardingTip } from "@/components/onboarding-tip";
import { SystemLogs } from "@/components/system-logs";
import { AboutSection } from "@/components/about-section";
import { useEffect } from "react";

export default function Home() {
  // Force scroll to top on load to prevent unrelated focus jumps
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-command overflow-x-hidden">
      <DataFlowParticles className="z-0 opacity-30" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none z-1" />
      <GridOverlay className="z-0 opacity-60" />
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col space-y-20 md:space-y-52">
          <HeroSection />
          <ProjectsGrid />

          <AboutSection />

          <div className="space-y-4">
            <h3 className="text-sm text-zinc-500 font-mono tracking-widest uppercase border-b border-white/10 pb-2">
              System Events Log
            </h3>
            <SystemLogs />
          </div>

          <ContactSection />
        </div>
      </div>
      <NavigationDock />
      <CommandPalette />
      <OnboardingTip />
      <PageFooter />
    </div>
  );
}
