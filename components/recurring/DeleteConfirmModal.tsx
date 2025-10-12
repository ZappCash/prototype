"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RecurringPayment } from "@/lib/types";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: RecurringPayment | null;
  onConfirm: (id: string) => void;
}

export function DeleteConfirmModal({ isOpen, onClose, payment, onConfirm }: DeleteConfirmModalProps) {
  if (!payment) return null;

  const handleConfirm = () => {
    onConfirm(payment.id);
    onClose();
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card rounded-3xl border border-white/10 p-8 w-full max-w-sm text-center"
            >
              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-2">Delete Payment?</h2>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete <span className="text-white font-semibold">{payment.name}</span>?
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-6 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
