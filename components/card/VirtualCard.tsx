"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  const [isFlipped, setIsFlipped] = useState(false);

  // Auto-flip every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="perspective-1000 w-full max-w-sm mx-auto">
      <motion.div
        className="relative w-full h-56 cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of Card */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
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

        {/* Back of Card */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-black via-gray-900 to-black border border-primary/30 shadow-2xl shadow-primary/20 overflow-hidden relative">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-secondary rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Magnetic Stripe with colored lines */}
            <div className="w-full h-12 bg-black mt-6 relative overflow-hidden">
              <div className="absolute inset-0 flex flex-col">
                <div className="h-[2px] bg-gray-700" />
                <div className="flex-1 bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800" />
                <div className="h-[3px] bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-700" />
                <div className="h-[2px] bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800" />
                <div className="h-[2px] bg-gray-700" />
              </div>
            </div>

            {/* CVV Section */}
            <div className="px-6 mt-6 relative z-10">
              <div className="bg-white rounded-lg p-3 relative overflow-hidden">
                {/* Colored stripes in signature panel */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-yellow-500 to-red-500" />
                <div className="absolute left-1 top-0 bottom-0 w-[2px] bg-gradient-to-b from-green-500 via-purple-500 to-orange-500" />
                
                <div className="flex items-center justify-between">
                  <div className="flex-1 pl-2">
                    <div className="space-y-1">
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                      <div className="h-2 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="ml-6 bg-white px-4 py-1.5 rounded border-2 border-dashed border-gray-300">
                    <p className="text-black font-mono font-bold text-base">123</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-xs mt-2 text-right">
                Security Code
              </p>
            </div>

            {/* Footer */}
            <div className="absolute bottom-5 left-6 right-6">
              <div className="flex items-center gap-1">
                <Zap size={16} className="text-primary" />
                <span className="text-primary font-bold text-sm tracking-wider">
                  ZAPPCASH
                </span>
              </div>
            </div>

            {/* Lightning Bolt Decoration */}
            <div className="absolute bottom-4 right-4 opacity-10">
              <Zap size={60} className="text-primary" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tap to flip hint */}
      <p className="text-center text-gray-500 text-xs mt-4">
        Tap card to flip • Auto-rotates every 4s
      </p>
    </div>
  );
}
