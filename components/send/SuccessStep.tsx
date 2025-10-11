"use client";

import { CheckCircle2, Home, Repeat } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface SuccessStepProps {
  amount: number;
  recipient: { type: "username" | "address"; value: string };
  transactionId: string;
}

export function SuccessStep({ amount, recipient, transactionId }: SuccessStepProps) {
  const router = useRouter();

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="text-center space-y-6">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-primary/30"
            />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <CheckCircle2 size={48} className="text-black" />
            </div>
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-white mb-2">Transfer Successful!</h2>
          <p className="text-gray-400">Your transaction has been completed</p>
        </motion.div>

        {/* Transaction Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6 rounded-3xl border border-primary/20 space-y-4"
        >
          <div className="text-center pb-4 border-b border-white/10">
            <p className="text-sm text-gray-400 mb-2">Amount Sent</p>
            <p className="text-4xl font-bold gradient-text">${amount.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">USDC</p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">To</span>
              <span className="text-white font-medium">
                {recipient.type === "username" 
                  ? recipient.value 
                  : `${recipient.value.slice(0, 6)}...${recipient.value.slice(-4)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Transaction ID</span>
              <span className="text-white font-mono text-xs">
                {transactionId.slice(0, 8)}...
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span className="text-primary font-medium">Completed</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3 pt-4"
        >
          <button
            onClick={() => router.push("/assets")}
            className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-glow-md transition-all flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Back to Home
          </button>
          <button
            onClick={() => router.push("/send")}
            className="w-full px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Repeat size={20} />
            Send Again
          </button>
        </motion.div>
      </div>
    </div>
  );
}
