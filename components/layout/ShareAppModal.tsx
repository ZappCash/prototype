"use client";

import { X, Share2, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareAppModal({ isOpen, onClose }: ShareAppModalProps) {
  const appUrl = "https://proto.zappcash.finance";

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "ZappCash - Fast USDC Payments",
          text: "Check out ZappCash for fast and secure USDC payments!",
          url: appUrl,
        });
      } catch (err) {
        console.log("Share cancelled or failed");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(appUrl);
      alert("Link copied to clipboard!");
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
            className="fixed inset-0 bg-black backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card rounded-3xl border border-primary/20 p-8 w-full max-w-md relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors z-10"
              >
                <X size={20} className="text-gray-400" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
                >
                  <Heart size={32} className="text-primary" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-3">
                  Do you like ZappCash?
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Help us share this prototype if you find ZappCash useful and would use it as your daily payment app.
                </p>
                <p className="text-xs text-gray-300">
                  Your support helps us improve and reach more people
                </p>
              </div>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-glow-md transition-all flex items-center justify-center gap-2 mb-3"
              >
                <Share2 size={20} />
                Share ZappCash
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
