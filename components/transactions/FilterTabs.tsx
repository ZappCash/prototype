"use client";

import { cn } from "@/lib/utils";
import { TransactionType } from "@/lib/types";

interface FilterTabsProps {
  activeFilter: TransactionType | "all";
  onFilterChange: (filter: TransactionType | "all") => void;
}

const filters: { id: TransactionType | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "send", label: "Sent" },
  { id: "receive", label: "Received" },
  { id: "payment", label: "Payments" },
  { id: "request", label: "Requests" },
];

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            "px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all",
            activeFilter === filter.id
              ? "bg-primary/20 text-primary border border-primary/30"
              : "bg-white/5 text-gray-400 hover:bg-white/10"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
