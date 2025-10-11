"use client";

import { QrCode } from "lucide-react";
import { motion } from "framer-motion";

interface QRCodeDisplayProps {
  data: string;
  label: string;
}

export function QRCodeDisplay({ data, label }: QRCodeDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-8 rounded-3xl border border-primary/20"
    >
      <div className="text-center">
        <p className="text-sm text-gray-400 mb-6">{label}</p>
        
        {/* QR Code Placeholder */}
        <div className="w-64 h-64 mx-auto mb-6 rounded-2xl bg-white p-4 flex items-center justify-center">
          {/* In production, use a QR code library like qrcode.react */}
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
            <QrCode size={120} className="text-primary/50" />
          </div>
        </div>

        <p className="text-xs text-gray-500">
          Scan this QR code to receive payments
        </p>
      </div>
    </motion.div>
  );
}
