"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
  Terminal,
} from "lucide-react";

type TreeItem =
  | { name: string; type: "file" }
  | { name: string; type: "folder"; children: TreeItem[] };

const isFolderNode = (
  node: TreeItem
): node is { name: string; type: "folder"; children: TreeItem[] } =>
  node.type === "folder";

const treeData: TreeItem = {
  name: "internal-docs",
  type: "folder",
  children: [
    {
      name: "onboarding",
      type: "folder",
      children: [
        { name: "network-setup.md", type: "file" },
        { name: "vpn-config.pdf", type: "file" },
      ],
    },
    {
      name: "infrastructure",
      type: "folder",
      children: [
        { name: "docker-compose.yml", type: "file" },
        { name: "ssl-renewal.sh", type: "file" },
      ],
    },
    { name: "erp-escalations.json", type: "file" },
  ],
};

const TreeNode = ({ item, level = 0 }: { item: TreeItem; level?: number }) => {
  const [isOpen, setIsOpen] = useState(level < 1); // Auto-open root
  const isFolder = item.type === "folder";

  const handleToggle = (e: React.MouseEvent) => {
    if (isFolder) {
      e.stopPropagation();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="select-none">
      <div
        onClick={handleToggle}
        className={`flex items-center gap-2 py-1 px-2 rounded-md transition-colors cursor-pointer
          ${isFolder ? "hover:bg-white/5" : "hover:bg-blue-500/10"}
        `}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {isFolder ? (
          <>
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
              <ChevronRight className="h-3 w-3 text-zinc-500" />
            </motion.div>
            {isOpen ? (
              <FolderOpen className="h-4 w-4 text-blue-400" />
            ) : (
              <Folder className="h-4 w-4 text-blue-400" />
            )}
          </>
        ) : (
          <FileText className="h-4 w-4 text-zinc-500" />
        )}
        <span
          className={`text-xs font-mono ${
            isFolder ? "text-zinc-300" : "text-zinc-500"
          }`}
        >
          {item.name}
        </span>
      </div>

      <AnimatePresence>
        {isFolderNode(item) && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-l border-white/5 ml-3.5"
          >
            {item.children.map((child) => (
              <TreeNode key={child.name} item={child} level={level + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function InteractiveTree() {
  return (
    <div className="p-4 bg-black/40 rounded-xl border border-white/5 h-full overflow-y-auto custom-scrollbar">
      <div className="flex items-center gap-2 mb-4 pb-2 border-bottom border-white/5">
        <Terminal className="h-3 w-3 text-blue-500" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
          Project Structure
        </span>
      </div>
      <TreeNode item={treeData} />
    </div>
  );
}
