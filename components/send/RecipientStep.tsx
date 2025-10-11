"use client";

import { useState } from "react";
import { QrCode, User, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RecipientStepProps {
  onNext: (recipient: { type: "username" | "address"; value: string }) => void;
}

type InputMethod = "qr" | "username" | "address";

export function RecipientStep({ onNext }: RecipientStepProps) {
  const [activeMethod, setActiveMethod] = useState<InputMethod>("username");
  const [inputValue, setInputValue] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    setIsValidating(true);
    
    // Simulate validation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsValidating(false);

    if (activeMethod === "username") {
      onNext({ type: "username", value: inputValue });
    } else if (activeMethod === "address") {
      onNext({ type: "address", value: inputValue });
    }
  };

  const handleQRScan = () => {
    // TODO: Implement QR scanner
    alert("QR Scanner - Coming soon!");
  };

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Send to</h2>
        <p className="text-gray-400 text-sm">Choose how to find recipient</p>
      </div>

      {/* Method Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveMethod("qr")}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2",
            activeMethod === "qr"
              ? "bg-primary/20 text-primary border border-primary/30"
              : "bg-white/5 text-gray-400 hover:bg-white/10"
          )}
        >
          <QrCode size={18} />
          <span className="text-sm">QR</span>
        </button>
        <button
          onClick={() => setActiveMethod("username")}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2",
            activeMethod === "username"
              ? "bg-primary/20 text-primary border border-primary/30"
              : "bg-white/5 text-gray-400 hover:bg-white/10"
          )}
        >
          <User size={18} />
          <span className="text-sm">Username</span>
        </button>
        <button
          onClick={() => setActiveMethod("address")}
          className={cn(
            "flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2",
            activeMethod === "address"
              ? "bg-primary/20 text-primary border border-primary/30"
              : "bg-white/5 text-gray-400 hover:bg-white/10"
          )}
        >
          <Wallet size={18} />
          <span className="text-sm">Address</span>
        </button>
      </div>

      {/* Input Area */}
      <motion.div
        key={activeMethod}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeMethod === "qr" ? (
          <div className="glass-card p-8 rounded-3xl border border-white/10 text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-2xl bg-white/5 border-2 border-dashed border-primary/30 flex items-center justify-center">
              <QrCode size={64} className="text-primary/50" />
            </div>
            <button
              onClick={handleQRScan}
              className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-glow-md transition-all"
            >
              Scan QR Code
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="glass-card p-6 rounded-3xl border border-white/10">
              <label className="block text-sm font-medium text-gray-400 mb-3">
                {activeMethod === "username" ? "Username" : "Wallet Address"}
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  activeMethod === "username"
                    ? "@username"
                    : "0x..."
                }
                className="w-full px-4 py-4 text-lg rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors"
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              disabled={!inputValue.trim() || isValidating}
              className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-glow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isValidating ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Validating...
                </>
              ) : (
                "Continue"
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
