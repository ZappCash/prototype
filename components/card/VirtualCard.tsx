"use client";

import { Zap, Wifi } from "lucide-react";

interface VirtualCardProps {
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
}

export function VirtualCard({
  cardNumber = "4532 •••• •••• 8790",
  cardHolder = "USUARIO",
  expiryDate = "12/28",
  cvv = "***",
}: VirtualCardProps) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative w-full h-56">
        {/* Front of Card */}
        <div className="absolute inset-0">
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-black via-gray-900 to-black border border-primary/30 shadow-2xl shadow-primary/20 p-6 flex flex-col justify-between overflow-hidden relative">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Lightning Bolts Decoration */}
            <div className="absolute top-4 right-4 opacity-20">
              <Zap size={80} className="text-primary" />
            </div>
            <div className="absolute bottom-8 left-8 opacity-10">
              <Zap size={60} className="text-secondary rotate-45" />
            </div>

            {/* Card Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between">
                {/* Chip - More realistic */}
                <div className="w-12 h-10 rounded-md bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 shadow-lg relative overflow-hidden">
                  {/* Chip grid pattern */}
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-[1px] p-1">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="bg-yellow-600/40 rounded-[1px]" />
                    ))}
                  </div>
                  {/* Metallic shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20" />
                </div>

                {/* Contactless */}
                <Wifi size={24} className="text-primary rotate-90" />
              </div>

              {/* Logo */}
              <div className="mt-2">
                <div className="flex items-center gap-1">
                  <Zap size={20} className="text-primary" />
                  <span className="text-primary font-bold text-lg tracking-wider">
                    ZAPPCASH
                  </span>
                </div>
              </div>
            </div>

            {/* Card Number */}
            <div className="relative z-10">
              <p className="text-white text-xl font-mono tracking-widest mb-4">
                {cardNumber}
              </p>

              {/* Card Holder & Expiry */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-gray-500 text-xs mb-1">CARD HOLDER</p>
                  <p className="text-white text-sm font-semibold tracking-wide">
                    {cardHolder}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-xs mb-1">EXPIRES</p>
                  <p className="text-white text-sm font-semibold">
                    {expiryDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
