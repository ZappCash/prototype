"use client";

import { Users, Repeat, DollarSign, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = {
  id: string;
  icon: typeof Users;
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { id: "social", icon: Users, label: "Social", href: "/social" },
  { id: "recurring", icon: Repeat, label: "Recurring", href: "/recurring" },
  { id: "assets", icon: DollarSign, label: "Assets", href: "/assets" },
  { id: "settings", icon: Settings, label: "Settings", href: "/settings" },
];

interface BottomNavProps {
  activeTab?: string;
}

export function BottomNav({ activeTab = "assets" }: BottomNavProps) {
  const router = useRouter();

  const handleNavClick = (href: string) => {
    router.push(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-nav border-t border-primary/10">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeTab;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "flex flex-col items-center gap-1 transition-all",
                "min-w-[60px] py-1 rounded-xl",
                isActive
                  ? "text-primary"
                  : "text-gray-400 hover:text-gray-300"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                  isActive
                    ? "bg-primary/10 shadow-glow-md"
                    : "hover:bg-white/5"
                )}
              >
                <Icon size={20} />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
