"use client";

import { useState } from "react";
import { X, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Envelope } from "@/lib/types";

interface AddMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  envelope: Envelope | null;
  availableBalance: number;
  onAddMoney: (envelopeId: string, amount: number) => void;
}

export function AddMoneyModal({
  isOpen,
  onClose,
  envelope,
  availableBalance,
  onAddMoney,
}: AddMoneyModalProps) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!envelope || !amount) return;

    const amountNum = parseFloat(amount);
    if (amountNum <= 0 || amountNum > availableBalance) return;

    onAddMoney(envelope.id, amountNum);
    setAmount("");
    onClose();
  };

  const amountNum = amount ? parseFloat(amount) : 0;
  const isValid = amountNum > 0 && amountNum <= availableBalance;

  if (!envelope) return null;

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
                <h2 className="text-2xl font-bold gradient-text">Add Money</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Envelope Info */}
              <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-sm text-gray-400 mb-1">Envelope</p>
                <p className="text-lg font-semibold text-white">{envelope.name}</p>
                <p className="text-2xl font-bold gradient-text mt-2">
                  ${envelope.balance.toFixed(2)}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Amount to Add
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                      $
                    </span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      max={availableBalance}
                      className="w-full pl-10 pr-4 py-4 text-2xl rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors"
                      autoFocus
                      required
                    />
                  </div>
                  {amount && !isValid && (
                    <p className="text-red-400 text-sm mt-2">
                      {amountNum > availableBalance
                        ? "Insufficient balance"
                        : "Amount must be greater than 0"}
                    </p>
                  )}
                </div>

                {/* Available Balance */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2">
                    <Wallet size={18} className="text-primary" />
                    <span className="text-sm text-gray-400">Available Balance</span>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    ${availableBalance.toFixed(2)}
                  </span>
                </div>

                {/* New Balance Preview */}
                {amount && isValid && (
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                    <p className="text-sm text-gray-400 mb-1">New Balance</p>
                    <p className="text-2xl font-bold text-primary">
                      ${(envelope.balance + amountNum).toFixed(2)}
                    </p>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-glow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
