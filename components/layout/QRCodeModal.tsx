"use client";

import { ArrowLeft, QrCode, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
}

export function QRCodeModal({ isOpen, onClose, address }: QRCodeModalProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My ZappCash QR Code",
          text: `Send me USDC payments to: ${address}`,
          url: window.location.origin + "/receive",
        });
      } catch (err) {
        console.log("Share cancelled or failed");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(address);
      alert("Address copied to clipboard!");
    }
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
            className="fixed inset-0 bg-black backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-start justify-center z-[60]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full h-full bg-gradient-to-b from-dark-950 via-dark-900 to-black flex flex-col"
            >
              {/* Header */}
              <header className="glass-nav border-b border-primary/10 px-4 py-4 sticky top-0 z-10">
                <div className="max-w-md mx-auto flex items-center justify-between">
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <ArrowLeft size={24} className="text-white" />
                  </button>
                  <h1 className="text-xl font-bold gradient-text">My QR Code</h1>
                  <div className="w-10" /> {/* Spacer */}
                </div>
              </header>

              {/* Content */}
              <main className="flex-1 py-8 flex flex-col">
                <div className="w-full max-w-md mx-auto px-4 flex-1 flex flex-col">
                  {/* Description */}
                  <div className="text-center mb-8">
                    <p className="text-gray-400 text-sm">
                      Share this QR code so people can scan it and send you payments easily
                    </p>
                  </div>

                  {/* QR Code Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-64 h-64 mx-auto mb-6 rounded-2xl bg-black border-2 border-primary flex items-center justify-center"
                  >
                    {/* In production, use a QR code library like qrcode.react */}
                    <QrCode size={140} className="text-primary" />
                  </motion.div>

                  {/* Spacer to push button to bottom */}
                  <div className="flex-1" />

                  {/* Share Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    onClick={handleShare}
                    className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-glow-md transition-all flex items-center justify-center gap-2 mb-6"
                  >
                    <Share2 size={20} />
                    Share My QR Code
                  </motion.button>
                </div>
              </main>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
