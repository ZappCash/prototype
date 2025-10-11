"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";

interface ReceiveMethodCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  description?: string;
}

export function ReceiveMethodCard({ icon, label, value, description }: ReceiveMethodCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-3xl border border-white/10 hover:border-primary/30 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-400 mb-1">{label}</p>
          <p className="text-lg font-semibold text-white break-all mb-1">{value}</p>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center transition-all flex-shrink-0"
        >
          {copied ? (
            <Check size={18} className="text-primary" />
          ) : (
            <Copy size={18} className="text-gray-400" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
