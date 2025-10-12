"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { IconButton } from "@/components/ui/IconButton";
import { QrCode, Share2, Bell } from "lucide-react";
import { User } from "@/lib/types";
import { QRCodeModal } from "@/components/layout/QRCodeModal";
import { ShareAppModal } from "@/components/layout/ShareAppModal";
import { NotificationsModal } from "@/components/layout/NotificationsModal";
import { mockNotifications } from "@/lib/data/mock";

interface HeaderProps {
  user: User;
}

export function Header({ user }: HeaderProps) {
  const router = useRouter();
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [notificationsModalOpen, setNotificationsModalOpen] = useState(false);

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-50 glass-nav border-b border-primary/10">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Left: Avatar + Name */}
          <button
            onClick={() => router.push("/settings/account")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Avatar name={user.name} size="md" />
            <span className="text-white font-semibold">{user.name}</span>
          </button>

          {/* Right: Action Icons */}
          <div className="flex items-center gap-1">
            <IconButton
              icon={QrCode}
              variant="ghost"
              onClick={() => setQrModalOpen(true)}
            />
            <IconButton
              icon={Share2}
              variant="ghost"
              onClick={() => setShareModalOpen(true)}
            />
            <div className="relative">
              <IconButton
                icon={Bell}
                variant="ghost"
                onClick={() => setNotificationsModalOpen(true)}
              />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full text-black text-xs font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        address={user.address}
      />

      {/* Share App Modal */}
      <ShareAppModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={notificationsModalOpen}
        onClose={() => setNotificationsModalOpen(false)}
        notifications={mockNotifications}
      />
    </>
  );
}
