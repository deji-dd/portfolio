"use client";
import { HeroSection } from "@/components/hero-section";
import { ProjectsGrid } from "@/components/projects-grid";
import { ContactSection } from "@/components/contact-section";
import { NavigationDock } from "@/components/navigation-dock";
import { PageFooter } from "@/components/page-footer";
import { GridOverlay } from "@/components/ui/grid-overlay";
import { DataFlowParticles } from "@/components/ui/data-flow-particles";
import { useState } from "react";

export default function Home() {
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
  return (
    <div className="relative min-h-screen bg-command overflow-x-hidden">
      <DataFlowParticles className="z-0 opacity-30" />
      {/* Radial Vignette - Essential for depth */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none z-[1]" />
      <GridOverlay className="z-0 opacity-60" />
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col space-y-20 md:space-y-52">
          <HeroSection />
          <ProjectsGrid onModalStateChange={setIsAnyModalOpen} />
          <ContactSection />
        </div>
      </div>
      <NavigationDock isHidden={isAnyModalOpen} />
      <PageFooter />
    </div>
  );
}
