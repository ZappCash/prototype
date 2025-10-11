"use client";

import { useState } from "react";
import { Wallet } from "lucide-react";
import { motion } from "framer-motion";

interface AmountStepProps {
  availableBalance: number;
  onNext: (amount: number) => void;
  onBack: () => void;
}

export function AmountStep({ availableBalance, onNext, onBack }: AmountStepProps) {
  const [amount, setAmount] = useState("");

  const amountNum = amount ? parseFloat(amount) : 0;
  const isValid = amountNum > 0 && amountNum <= availableBalance;

  const handleQuickAmount = (percentage: number) => {
    const quickAmount = (availableBalance * percentage).toFixed(2);
    setAmount(quickAmount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onNext(amountNum);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Enter Amount</h2>
        <p className="text-gray-400 text-sm">How much do you want to send?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount Input */}
        <div className="glass-card p-8 rounded-3xl border border-white/10">
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-400 mb-4">
              Amount in USDC
            </label>
            <div className="flex items-center justify-center">
              <span className="text-6xl font-bold text-gray-600">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                max={availableBalance}
                className="text-6xl font-bold bg-transparent text-white placeholder-gray-600 focus:outline-none text-center w-48"
                autoFocus
                required
              />
            </div>
            {amount && !isValid && (
              <p className="text-red-400 text-sm mt-4">
                {amountNum > availableBalance
                  ? "Insufficient balance"
                  : "Amount must be greater than 0"}
              </p>
            )}
          </div>
        </div>

        {/* Available Balance */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2">
            <Wallet size={18} className="text-primary" />
            <span className="text-sm text-gray-400">Available Balance</span>
          </div>
          <span className="text-sm font-semibold text-white">
            ${availableBalance.toFixed(2)}
          </span>
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "25%", value: 0.25 },
            { label: "50%", value: 0.5 },
            { label: "75%", value: 0.75 },
            { label: "Max", value: 1 },
          ].map((quick) => (
            <button
              key={quick.label}
              type="button"
              onClick={() => handleQuickAmount(quick.value)}
              className="py-3 px-4 rounded-xl bg-white/5 hover:bg-primary/20 text-gray-400 hover:text-primary font-medium transition-all border border-white/10 hover:border-primary/30"
            >
              {quick.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-glow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
