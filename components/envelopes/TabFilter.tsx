"use client";

import { cn } from "@/lib/utils";
import { EnvelopeType } from "@/lib/types";

interface TabFilterProps {
  activeTab: EnvelopeType;
  onTabChange: (tab: EnvelopeType) => void;
}

export function TabFilter({ activeTab, onTabChange }: TabFilterProps) {
  return (
    <div className="flex items-center justify-center gap-1 p-1 glass-card rounded-full border border-white/10 max-w-sm mx-auto">
      <button
        onClick={() => onTabChange("individual")}
        className={cn(
          "flex-1 px-6 py-2 rounded-full text-sm font-medium transition-all",
          activeTab === "individual"
            ? "bg-primary/20 text-primary border border-primary/30"
            : "text-gray-400 hover:text-gray-300"
        )}
      >
        My
      </button>
      <button
        onClick={() => onTabChange("shared")}
        className={cn(
          "flex-1 px-6 py-2 rounded-full text-sm font-medium transition-all",
          activeTab === "shared"
            ? "bg-primary/20 text-primary border border-primary/30"
            : "text-gray-400 hover:text-gray-300"
        )}
      >
        Shared
      </button>
    </div>
  );
}
