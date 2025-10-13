"use client";

import { X, CreditCard, Wallet, Copy, Check, Share2 } from "lucide-react";
import { Transaction } from "@/lib/types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TransactionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export function TransactionDetailModal({
  isOpen,
  onClose,
  transaction,
}: TransactionDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!transaction) return null;

  const handleCopyHash = async () => {
    if (transaction.txHash) {
      await navigator.clipboard.writeText(transaction.txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    // Generate receipt data
    const receiptText = `
ZappCash Receipt
━━━━━━━━━━━━━━━━━━━━
${transaction.description || transaction.contact || "Transaction"}
${new Date(transaction.date).toLocaleDateString()} - ${new Date(transaction.date).toLocaleTimeString()}

Amount: $${transaction.amount.toFixed(2)} USDC
Status: ${transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
Method: ${transaction.method === "card" ? "Card" : "Wallet"}
${transaction.txHash ? `TX: ${transaction.txHash}` : ""}
━━━━━━━━━━━━━━━━━━━━
    `.trim();

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Transaction Receipt",
          text: receiptText,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(receiptText);
      alert("Receipt copied to clipboard!");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-400/10 border-green-400/30";
      case "pending":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "failed":
        return "text-red-400 bg-red-400/10 border-red-400/30";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
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
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto"
          >
            <div className="glass-card-strong rounded-3xl p-6 max-h-[85vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4 flex-1">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {transaction.method === "card" ? (
                      <CreditCard size={24} className="text-primary" />
                    ) : (
                      <Wallet size={24} className="text-primary" />
                    )}
                  </div>

                  {/* Title & Date */}
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white mb-1">
                      {transaction.description || transaction.contact || "Transaction"}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {formatDate(transaction.date)} • {formatTime(transaction.date)}
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors flex-shrink-0 ml-2"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Status Badge */}
              <div className="mb-6">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                    transaction.status
                  )}`}
                >
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </span>
              </div>

              {/* Transaction Details */}
              <div className="space-y-3 mb-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                  Transaction Details
                </h3>

                {/* Total Amount */}
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-sm text-gray-400">Total Amount</span>
                  <span className="text-base font-semibold text-white">
                    ${transaction.amount.toFixed(2)} USDC
                  </span>
                </div>

                {/* Transaction Method */}
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <span className="text-sm text-gray-400">Transaction Type</span>
                  <span className="text-base font-medium text-white">
                    {transaction.method === "card" ? "Card Payment" : "Wallet Transfer"}
                  </span>
                </div>

                {/* Transaction Hash */}
                {transaction.txHash && (
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-sm text-gray-400">Transaction ID</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-white">
                        {transaction.txHash.slice(0, 8)}...{transaction.txHash.slice(-6)}
                      </span>
                      <button
                        onClick={handleCopyHash}
                        className="p-1 rounded hover:bg-white/10 transition-colors"
                      >
                        {copied ? (
                          <Check size={16} className="text-green-400" />
                        ) : (
                          <Copy size={16} className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Local Currency Amount */}
                {transaction.localAmount && transaction.localCurrency && (
                  <>
                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-sm text-gray-400">Purchase Amount</span>
                      <span className="text-base font-medium text-white">
                        ${transaction.amount.toFixed(2)} USDC
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-white/10">
                      <span className="text-sm text-gray-400">
                        Amount in {transaction.localCurrency}
                      </span>
                      <span className="text-base font-medium text-white">
                        {transaction.localCurrency === "CRC" ? "₡" : "$"}
                        {transaction.localAmount.toFixed(2)}
                      </span>
                    </div>

                    {transaction.exchangeRate && (
                      <div className="flex items-center justify-between py-3 border-b border-white/10">
                        <span className="text-sm text-gray-400">Exchange Rate</span>
                        <span className="text-base font-medium text-white">
                          ${transaction.exchangeRate.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </>
                )}

                {/* Purchase Type */}
                {transaction.purchaseType && (
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-sm text-gray-400">Purchase Type</span>
                    <span className="text-base font-medium text-white capitalize">
                      {transaction.purchaseType === "in-person" ? "In Person" : "Online"}
                    </span>
                  </div>
                )}

                {/* Location */}
                {transaction.city && (
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-sm text-gray-400">City</span>
                    <span className="text-base font-medium text-white">{transaction.city}</span>
                  </div>
                )}

                {transaction.country && (
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-sm text-gray-400">Country</span>
                    <span className="text-base font-medium text-white">{transaction.country}</span>
                  </div>
                )}

                {/* Card Info */}
                {transaction.method === "card" && transaction.cardLast4 && (
                  <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <span className="text-sm text-gray-400">Card</span>
                    <span className="text-base font-medium text-white">
                      {transaction.cardBrand || "Card"} •••• {transaction.cardLast4}
                    </span>
                  </div>
                )}
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="w-full px-6 py-3 rounded-xl border-2 border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-all flex items-center justify-center gap-2"
              >
                <Share2 size={18} />
                Share Receipt
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
