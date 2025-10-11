"use client";

import { useState } from "react";
import { User, Wallet, ArrowRight, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ConfirmStepProps {
  recipient: { type: "username" | "address"; value: string };
  amount: number;
  onConfirm: () => void;
  onBack: () => void;
}

export function ConfirmStep({ recipient, amount, onConfirm, onBack }: ConfirmStepProps) {
  const [isSending, setIsSending] = useState(false);

  const fee = 0.01; // Fixed fee for demo
  const total = amount + fee;

  const handleConfirm = async () => {
    setIsSending(true);
    
    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSending(false);
    onConfirm();
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Confirm Transfer</h2>
        <p className="text-gray-400 text-sm">Review details before sending</p>
      </div>

      <div className="space-y-4">
        {/* Recipient Card */}
        <div className="glass-card p-6 rounded-3xl border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              {recipient.type === "username" ? (
                <User size={20} className="text-primary" />
              ) : (
                <Wallet size={20} className="text-primary" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400">Sending to</p>
              <p className="text-white font-semibold">
                {recipient.type === "username" ? recipient.value : `${recipient.value.slice(0, 6)}...${recipient.value.slice(-4)}`}
              </p>
            </div>
          </div>
        </div>

        {/* Amount Card */}
        <div className="glass-card p-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">You're sending</p>
            <p className="text-5xl font-bold gradient-text mb-4">
              ${amount.toFixed(2)}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10">
              <span className="text-xs text-gray-400">USDC</span>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Amount</span>
            <span className="text-white font-medium">${amount.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Network Fee</span>
            <span className="text-white font-medium">${fee.toFixed(2)}</span>
          </div>
          <div className="h-px bg-white/10 my-2" />
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold">Total</span>
            <span className="text-white font-bold text-lg">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
          <AlertCircle size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-200">
            Make sure the recipient address is correct. Transactions cannot be reversed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            disabled={isSending}
            className="flex-1 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            disabled={isSending}
            className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-glow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSending ? (
              <>
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Now
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
