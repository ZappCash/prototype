"use client";

import { Avatar } from "@/components/ui/Avatar";
import { IconButton } from "@/components/ui/IconButton";
import { QrCode, Share2, Bell } from "lucide-react";
import { User } from "@/lib/types";

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-primary/10">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Left: Avatar + Name */}
        <div className="flex items-center gap-3">
          <Avatar name={user.name} size="md" />
          <span className="text-white font-semibold">{user.name}</span>
        </div>

        {/* Right: Action Icons */}
        <div className="flex items-center gap-1">
          <IconButton icon={QrCode} variant="ghost" />
          <IconButton icon={Share2} variant="ghost" />
          <IconButton icon={Bell} variant="ghost" />
        </div>
      </div>
    </header>
  );
}
