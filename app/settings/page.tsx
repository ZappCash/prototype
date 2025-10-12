"use client";

import { useState } from "react";
import { X as XIcon, User, Settings as SettingsIcon, HelpCircle, Bug, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { mockUser } from "@/lib/data/mock";

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  external?: boolean;
}

export default function SettingsPage() {
  const router = useRouter();

  const settingsItems: SettingItem[] = [
    {
      id: "account",
      title: "Account details",
      description: "Phone & email",
      icon: <User size={24} className="text-primary" />,
      href: "/settings/account",
    },
    {
      id: "app-settings",
      title: "App settings",
      description: "Tokens, currency, notifications",
      icon: <SettingsIcon size={24} className="text-primary" />,
      href: "/settings/app",
    },
    {
      id: "help",
      title: "Help & support",
      description: "Get help with ZappCash",
      icon: <HelpCircle size={24} className="text-primary" />,
      href: "/settings/help",
    },
    {
      id: "bug",
      title: "Report a bug",
      description: "Help us improve",
      icon: <Bug size={24} className="text-primary" />,
      href: "/settings/report-bug",
    },
    {
      id: "twitter",
      title: "Follow us on X",
      description: "@zappcashfi",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
        </svg>
      ),
      href: "https://x.com/zappcashfi",
      external: true,
    },
  ];

  const handleItemClick = (item: SettingItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.href) {
      if (item.external) {
        window.open(item.href, "_blank");
      } else {
        router.push(item.href);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-black text-white flex flex-col relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb-green animate-orb-1 top-20 left-10 opacity-20" />
        <div className="orb-dark-green animate-orb-2 bottom-40 right-10 opacity-15" />
        <div className="orb-green animate-orb-3 top-1/2 left-1/2 opacity-10" />
      </div>

      {/* Dot Pattern Overlay */}
      <div className="fixed inset-0 dot-pattern opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <Header user={mockUser} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-24">
          <div className="max-w-md mx-auto p-6">
            {/* Settings List */}
            <div className="space-y-3">
              {settingsItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleItemClick(item)}
                  className="w-full glass-card p-4 rounded-2xl border border-white/10 hover:border-primary/30 transition-all flex items-center gap-4 group"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                    {item.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 text-left">
                    <h3 className="text-base font-semibold text-white mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
                </motion.button>
              ))}
            </div>

            {/* App Version */}
            <div className="mt-12 mb-6 text-center">
              <p className="text-sm text-gray-500">
                App version 0.1.0 (beta)
              </p>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomNav activeTab="settings" />
      </div>
    </div>
  );
}
