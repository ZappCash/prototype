"use client";

import { motion } from "framer-motion";

interface BalanceCardProps {
  balance: number;
  currency: string;
}

export function BalanceCard({ balance, currency }: BalanceCardProps) {
  return (
    <div className="py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* Balance Amount */}
        <motion.h1
          className="text-7xl font-bold text-white mb-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          ${balance.toFixed(2)}
        </motion.h1>

        {/* Currency Label */}
        <p className="text-gray-400 text-sm font-medium tracking-wide">
          {currency}
        </p>
      </motion.div>
    </div>
  );
}
