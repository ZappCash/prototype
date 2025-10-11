"use client";

import { ArrowLeft, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { VirtualCard } from "@/components/card/VirtualCard";
import { mockUser } from "@/lib/data/mock";

export default function CardPage() {
  const router = useRouter();

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
            <h1 className="text-xl font-bold gradient-text">Virtual Card</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 py-8 overflow-y-auto flex flex-col justify-center">
          <div className="w-full max-w-md mx-auto px-4">
            {/* Coming Soon Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
                <Sparkles size={16} className="text-primary" />
                <span className="text-primary font-semibold text-sm">
                  Coming Soon
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Your Virtual Card
              </h2>
              <p className="text-gray-400 text-sm">
                Spend your USDC anywhere, anytime
              </p>
            </div>

            {/* Virtual Card */}
            <div className="mb-12">
              <VirtualCard
                cardNumber="4532 •••• •••• 8790"
                cardHolder={mockUser.name.toUpperCase()}
                expiryDate="12/28"
                cvv="123"
              />
            </div>

            {/* CTA Button */}
            <button
              disabled
              className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary/50 to-secondary/50 text-white font-semibold transition-all opacity-50 cursor-not-allowed"
            >
              Request Card (Coming Soon)
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
