"use client";
import React, { useEffect, useState } from "react";
import { Cloud, renderSimpleIcon, ICloud } from "react-icon-cloud";
import {
  siNextdotjs,
  siReact,
  siTypescript,
  siTailwindcss,
  siDocker,
  siLinux,
  siGit,
  siGithub,
  siExpo,
  siNodedotjs,
  siPnpm,
  siFramer,
  siZedindustries,
  siDotenv,
  siMongodb,
  siMongoose,
  siTermius,
} from "simple-icons";

type CloudOptions = ICloud["options"] & { repeatTags?: number };

const icons = [
  siNextdotjs,
  siReact,
  siTypescript,
  siTailwindcss,
  siDocker,
  siLinux,
  siGit,
  siGithub,
  siExpo,
  siNodedotjs,
  siPnpm,
  siFramer,
  siZedindustries,
  siDotenv,
  siMongodb,
  siMongoose,
  siTermius,
];

export const cloudProps: Omit<ICloud, "children"> & { options: CloudOptions } =
  {
    containerProps: {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      },
    },
    options: {
      reverse: true,
      depth: 1,
      wheelZoom: false,
      imageScale: 2,
      activeCursor: "default",
      tooltipDelay: 0,
      outlineColour: "#0000",
      clickToFront: 500,
      freezeActive: false,
      freezeDecel: false,
      dragControl: true,
      initial: [0.1, -0.1],
      repeatTags: 1,
    },
  };

export function StackCloud() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return null;

  return (
    // CHANGED: Using h-full and w-full to fill the Bento tile
    <div className="h-full w-full flex items-center justify-center relative bg-transparent">
      <Cloud {...cloudProps}>
        {icons.map((icon) =>
          renderSimpleIcon({
            icon,
            size: 42,
            bgHex: "#000",
            fallbackHex: "#fff",
            minContrastRatio: 1,
            aProps: {
              href: undefined,
              target: undefined,
              rel: undefined,
              onClick: (e: React.MouseEvent<HTMLAnchorElement>) =>
                e.preventDefault(),
              className: "cursor-pointer",
              style: { fill: "#71717a" }, // Stable grey color
            },
          })
        )}
      </Cloud>
    </div>
  );
}
