"use client";

import { X, Users, Target, Share2, QrCode, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Envelope } from "@/lib/types";

interface EnvelopeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  envelope: Envelope | null;
  onAddMoney: (envelopeId: string) => void;
}

export function EnvelopeDetailModal({
  isOpen,
  onClose,
  envelope,
  onAddMoney,
}: EnvelopeDetailModalProps) {
  if (!envelope) return null;

  const progress = envelope.goal
    ? Math.min((envelope.balance / envelope.goal) * 100, 100)
    : 0;

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
              className="glass-card rounded-3xl border border-primary/20 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-white">{envelope.name}</h2>
                    {envelope.type === "shared" && (
                      <Users size={20} className="text-primary" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                      {envelope.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs font-medium">
                      {envelope.type === "individual" ? "Individual" : "Shared"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Balance */}
              <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                <p className="text-sm text-gray-400 mb-2">Current Balance</p>
                <p className="text-4xl font-bold gradient-text">
                  ${envelope.balance.toFixed(2)}
                </p>
              </div>

              {/* Description */}
              {envelope.description && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-400 mb-2">Description</p>
                  <p className="text-white">{envelope.description}</p>
                </div>
              )}

              {/* Goal Progress */}
              {envelope.goal && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Target size={16} className="text-primary" />
                      <p className="text-sm font-medium text-gray-400">Savings Goal</p>
                    </div>
                    <p className="text-sm font-semibold text-white">
                      ${envelope.goal.toFixed(2)}
                    </p>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    {progress.toFixed(0)}% completed
                  </p>
                </div>
              )}

              {/* Shared Envelope Info */}
              {envelope.type === "shared" && (
                <div className="mb-6 space-y-4">
                  {/* Participants */}
                  {envelope.participants && (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Users size={16} className="text-primary" />
                        <p className="text-sm font-medium text-gray-400">Participants</p>
                      </div>
                      <p className="text-white font-semibold">
                        {envelope.participants.length} people
                      </p>
                    </div>
                  )}

                  {/* Share Options */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 transition-all flex flex-col items-center gap-2">
                      <QrCode size={24} className="text-primary" />
                      <span className="text-xs text-gray-400">QR Code</span>
                    </button>
                    <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 transition-all flex flex-col items-center gap-2">
                      <Share2 size={24} className="text-primary" />
                      <span className="text-xs text-gray-400">Share Link</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div>
                <button
                  onClick={() => {
                    onAddMoney(envelope.id);
                    onClose();
                  }}
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-glow-md transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Add Money
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
