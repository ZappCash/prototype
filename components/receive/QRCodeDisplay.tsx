"use client";

import { QrCode } from "lucide-react";
import { motion } from "framer-motion";

interface QRCodeDisplayProps {
  data: string;
  label: string;
}

export function QRCodeDisplay({ data, label }: QRCodeDisplayProps) {
  return (
    <div className="text-center">
      <p className="text-sm text-gray-400 mb-6">{label}</p>

      {/* QR Code Placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-64 h-64 mx-auto mb-6 rounded-2xl bg-black border-2 border-primary flex items-center justify-center"
      >
        {/* In production, use a QR code library like qrcode.react */}
        <QrCode size={140} className="text-primary" />
      </motion.div>

      <p className="text-xs text-gray-500">
        Scan this QR code to receive payments
      </p>
    </div>
  );
}
