"use client";

import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, CreditCard, Wallet, Copy, Check, Share2 } from "lucide-react";
import { useState, useMemo, useRef } from "react";
import { mockTransactions } from "@/lib/data/mock";
import { toPng } from "html-to-image";

export default function TransactionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const transaction = useMemo(() => {
    return mockTransactions.find((tx) => tx.id === params.id);
  }, [params.id]);

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Transaction not found</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-primary hover:text-primary/80"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const handleCopyHash = async () => {
    if (transaction.txHash) {
      await navigator.clipboard.writeText(transaction.txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (!receiptRef.current) return;

    try {
      setIsGenerating(true);

      // Set capturing mode to compress width
      setIsCapturing(true);

      // Wait for DOM to update
      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate PNG from the receipt element
      const dataUrl = await toPng(receiptRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#0a0a0a",
      });

      // Reset capturing mode
      setIsCapturing(false);

      // Convert data URL to Blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Create a File from the Blob
      const file = new File([blob], "zappcash-receipt.jpg", { type: "image/jpeg" });

      // Try to share via Web Share API
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "ZappCash Receipt",
          text: `Transaction: ${transaction.description || transaction.contact}`,
          files: [file],
        });
      } else {
        // Fallback: download the image
        const link = document.createElement("a");
        link.download = `zappcash-receipt-${transaction.id}.jpg`;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error("Error generating receipt:", err);
      alert("Failed to generate receipt. Please try again.");
    } finally {
      setIsGenerating(false);
      setIsCapturing(false);
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
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-black text-white flex flex-col relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb-green animate-orb-1 top-20 left-10 opacity-20" />
        <div className="orb-dark-green animate-orb-2 bottom-40 right-10 opacity-15" />
      </div>

      {/* Dot Pattern Overlay */}
      <div className="fixed inset-0 dot-pattern opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="glass-nav border-b border-primary/10 px-4 py-4">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <ArrowLeft size={24} className="text-white" />
            </button>
            <h1 className="text-xl font-bold text-white">Transaction Details</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 pb-24">
          <div className={`mx-auto space-y-6 transition-all ${isCapturing ? 'max-w-md' : 'max-w-2xl'}`}>
            {/* Receipt Container for Screenshot */}
            <div ref={receiptRef} className="space-y-6 bg-gradient-to-b from-dark-950 via-dark-900 to-black rounded-3xl" style={{ padding: isCapturing ? '24px' : '0' }}>
              {/* Logo for Receipt - Only visible when capturing */}
              {isCapturing && (
                <div className="text-center pb-4 border-b border-white/10">
                  <h1 className="text-2xl font-bold gradient-text">ZappCash</h1>
                  <p className="text-xs text-gray-400 mt-1">Payment Receipt</p>
                </div>
              )}

              {/* Transaction Header */}
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {transaction.method === "card" ? (
                    <CreditCard size={28} className="text-primary" />
                  ) : (
                    <Wallet size={28} className="text-primary" />
                  )}
                </div>

                {/* Title & Date */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {transaction.description || transaction.contact || "Transaction"}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {formatDate(transaction.date)} • {formatTime(transaction.date)}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                <span
                  className={`inline-flex px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                    transaction.status
                  )}`}
                >
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </span>
              </div>

              {/* Transaction Details */}
              <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-1">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                  Transaction Details
                </h3>

                {/* Total Amount */}
                <div className="flex items-center justify-between py-4 border-b border-white/10">
                  <span className="text-sm text-gray-400">Total Amount</span>
                  <span className="text-lg font-semibold text-white">
                    ${Math.abs(transaction.amount).toFixed(2)} USDC
                  </span>
                </div>

                {/* Transaction Method */}
                <div className="flex items-center justify-between py-4 border-b border-white/10">
                  <span className="text-sm text-gray-400">Transaction Type</span>
                  <span className="text-base font-medium text-white">
                    {transaction.method === "card" ? "Card Payment" : "Wallet Transfer"}
                  </span>
                </div>

                {/* Transaction Hash */}
                {transaction.txHash && (
                  <div className="flex items-center justify-between py-4 border-b border-white/10">
                    <span className="text-sm text-gray-400">Transaction ID</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-white">
                        {transaction.txHash.slice(0, 10)}...{transaction.txHash.slice(-8)}
                      </span>
                      <button
                        onClick={handleCopyHash}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        {copied ? (
                          <Check size={18} className="text-green-400" />
                        ) : (
                          <Copy size={18} className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Local Currency Amount */}
                {transaction.localAmount && transaction.localCurrency && (
                  <>
                    <div className="flex items-center justify-between py-4 border-b border-white/10">
                      <span className="text-sm text-gray-400">Purchase Amount</span>
                      <span className="text-base font-medium text-white">
                        ${Math.abs(transaction.amount).toFixed(2)} USDC
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-4 border-b border-white/10">
                      <span className="text-sm text-gray-400">
                        Amount in {transaction.localCurrency}
                      </span>
                      <span className="text-base font-medium text-white">
                        {transaction.localCurrency === "CRC" ? "₡" : "$"}
                        {transaction.localAmount.toFixed(2)}
                      </span>
                    </div>

                    {transaction.exchangeRate && (
                      <div className="flex items-center justify-between py-4 border-b border-white/10">
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
                  <div className="flex items-center justify-between py-4 border-b border-white/10">
                    <span className="text-sm text-gray-400">Purchase Type</span>
                    <span className="text-base font-medium text-white capitalize">
                      {transaction.purchaseType === "in-person" ? "In Person" : "Online"}
                    </span>
                  </div>
                )}

                {/* Location */}
                {transaction.city && (
                  <div className="flex items-center justify-between py-4 border-b border-white/10">
                    <span className="text-sm text-gray-400">City</span>
                    <span className="text-base font-medium text-white">{transaction.city}</span>
                  </div>
                )}

                {transaction.country && (
                  <div className="flex items-center justify-between py-4 border-b border-white/10">
                    <span className="text-sm text-gray-400">Country</span>
                    <span className="text-base font-medium text-white">{transaction.country}</span>
                  </div>
                )}

                {/* Card Info */}
                {transaction.method === "card" && transaction.cardLast4 && (
                  <div className="flex items-center justify-between py-4">
                    <span className="text-sm text-gray-400">Card</span>
                    <span className="text-base font-medium text-white">
                      {transaction.cardBrand || "Card"} •••• {transaction.cardLast4}
                    </span>
                  </div>
                )}
              </div>

              {/* Receipt Footer - Only visible when capturing */}
              {isCapturing && (
                <div className="text-center pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-500">
                    Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    zappcash.com
                  </p>
                </div>
              )}
            </div>
            {/* End of Receipt Container */}

            {/* Share Button - Outside the receipt container */}
            <button
              onClick={handleShare}
              disabled={isGenerating}
              className="w-full px-6 py-4 rounded-xl border-2 border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Share2 size={20} />
              {isGenerating ? "Generating Receipt..." : "Share Receipt"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
