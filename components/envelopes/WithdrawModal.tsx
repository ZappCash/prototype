"use client";

import { useState } from "react";
import { X, ArrowDownToLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Envelope } from "@/lib/types";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  envelope: Envelope | null;
  onWithdraw: (envelopeId: string, amount: number) => void;
}

export function WithdrawModal({ isOpen, onClose, envelope, onWithdraw }: WithdrawModalProps) {
  const [amount, setAmount] = useState("");

  if (!envelope) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);
    
    if (withdrawAmount > 0 && withdrawAmount <= envelope.balance) {
      onWithdraw(envelope.id, withdrawAmount);
      setAmount("");
      onClose();
    }
  };

  const handleMaxClick = () => {
    setAmount(envelope.balance.toString());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card rounded-3xl border border-primary/20 p-6 w-full max-w-md"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <ArrowDownToLine size={20} className="text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Withdraw Funds</h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Envelope Info */}
              <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-sm text-gray-400 mb-1">From envelope</p>
                <p className="text-lg font-semibold text-white mb-2">{envelope.name}</p>
                <p className="text-sm text-gray-400">
                  Available: <span className="text-primary font-semibold">${envelope.balance.toFixed(2)}</span>
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Amount to withdraw
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-400">$</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      max={envelope.balance}
                      className="w-full pl-10 pr-20 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-2xl font-semibold placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleMaxClick}
                      className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-primary/20 text-primary text-sm font-semibold hover:bg-primary/30 transition-colors"
                    >
                      MAX
                    </button>
                  </div>
                  {parseFloat(amount) > envelope.balance && (
                    <p className="text-red-400 text-xs mt-2">Insufficient funds in envelope</p>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <p className="text-xs text-blue-200">
                    Funds will be returned to your main account balance
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > envelope.balance}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-glow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Withdraw to Main Account
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
