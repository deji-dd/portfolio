"use client";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconExchange,
  IconFileDownload,
  IconHome,
  IconTerminal2,
} from "@tabler/icons-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { cn } from "@/lib/utils";

export function NavigationDock() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Projects",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#grid",
    },
    {
      title: "Infrastructure",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/deji-dd",
    },
    {
      title: "LinkedIn",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/ayodeji-buraimoh-1368b9243/",
    },
    {
      title: "Download CV",
      icon: (
        <IconFileDownload className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/cv.pdf",
    },
    {
      title: "Command Palette (Cmd+K)",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      // We'll handle the click in the FloatingDock or via a global event listener on the href
      onClick: () => {
        window.dispatchEvent(new CustomEvent("open-command-palette"));
      }
    },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-10 left-1/2 -translate-x-1/2 transition-all duration-300 z-50 opacity-100 translate-y-0"
      )}
    >
      <FloatingDock items={links} />
    </div>
  );
}
