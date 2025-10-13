"use client";

import { useState } from "react";
import { ArrowLeft, QrCode, User, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { QRCodeDisplay } from "@/components/receive/QRCodeDisplay";
import { ReceiveMethodCard } from "@/components/receive/ReceiveMethodCard";
import { mockUser } from "@/lib/data/mock";

type ReceiveMethod = "qr" | "details";

export default function ReceivePage() {
  const router = useRouter();
  const [activeMethod, setActiveMethod] = useState<ReceiveMethod>("qr");

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
        <header className="glass-nav border-b border-primary/10 px-4 py-4">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <ArrowLeft size={24} className="text-white" />
            </button>
            <h1 className="text-xl font-bold text-white">Receive Money</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 py-6 overflow-y-auto">
          <div className="w-full max-w-md mx-auto px-4">
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Share your info
              </h2>
              <p className="text-gray-400 text-sm">
                Choose how you want to receive payments
              </p>
            </div>

            {/* Method Tabs */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => setActiveMethod("qr")}
                className={cn(
                  "flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2",
                  activeMethod === "qr"
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                )}
              >
                <QrCode size={18} />
                <span className="text-sm">QR Code</span>
              </button>
              <button
                onClick={() => setActiveMethod("details")}
                className={cn(
                  "flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2",
                  activeMethod === "details"
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                )}
              >
                <Wallet size={18} />
                <span className="text-sm">Details</span>
              </button>
            </div>

            {/* Content */}
            <motion.div
              key={activeMethod}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeMethod === "qr" ? (
                <QRCodeDisplay
                  data={mockUser.address}
                  label="Scan to send me money"
                />
              ) : (
                <div className="space-y-4">
                  <ReceiveMethodCard
                    icon={<User size={24} className="text-primary" />}
                    label="Username"
                    value={mockUser.username}
                    description="Share your username for easy payments"
                  />
                  <ReceiveMethodCard
                    icon={<Wallet size={24} className="text-primary" />}
                    label="Wallet Address"
                    value={mockUser.address}
                    description="Your unique blockchain address"
                  />
                </div>
              )}
            </motion.div>

            {/* Info Card */}
            <div className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/30">
              <p className="text-xs text-gray-300 text-center">
                Anyone can send you USDC using any of these methods
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
