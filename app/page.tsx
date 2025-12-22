"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { HeroSection } from "@/components/hero-section";
import { ProjectsGrid } from "@/components/projects-grid";
import { ContactSection } from "@/components/contact-section";
import { NavigationDock } from "@/components/navigation-dock";
import { PageFooter } from "@/components/page-footer";
import { useState } from "react";

export default function Home() {
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <BackgroundBeams className="fixed" />
      <div className="relative z-20 py-20 px-4">
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
