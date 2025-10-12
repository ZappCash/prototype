"use client";

import { CheckCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RecurringPayment } from "@/lib/types";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: RecurringPayment | null;
}

export function PaymentSuccessModal({ isOpen, onClose, payment }: PaymentSuccessModalProps) {
  if (!payment) return null;

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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="glass-card rounded-3xl border border-primary/20 p-8 w-full max-w-md text-center"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
              >
                <CheckCircle size={48} className="text-primary" />
              </motion.div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-2">Payment Sent!</h2>
              <p className="text-gray-400 mb-6">Your payment was processed successfully</p>

              {/* Payment Details */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-sm text-gray-400 mb-1">Amount</p>
                  <p className="text-3xl font-bold gradient-text">${payment.amount.toFixed(2)}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-sm text-gray-400 mb-1">To</p>
                  <p className="text-lg font-semibold text-white">{payment.name}</p>
                  <p className="text-sm text-gray-400 font-mono mt-1">
                    {payment.recipientType === "username" 
                      ? payment.recipient 
                      : `${payment.recipient.slice(0, 6)}...${payment.recipient.slice(-4)}`
                    }
                  </p>
                </div>

                {payment.category && (
                  <div className="flex items-center justify-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                      {payment.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-glow-md transition-all"
              >
                Done
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
