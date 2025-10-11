"use client";

import { RecurringPayment } from "@/lib/types";
import { User, Wallet, Send, Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface RecurringPaymentCardProps {
  payment: RecurringPayment;
  onPay: (payment: RecurringPayment) => void;
  onEdit: (payment: RecurringPayment) => void;
  onDelete: (id: string) => void;
}

export function RecurringPaymentCard({ payment, onPay, onEdit, onDelete }: RecurringPaymentCardProps) {
  const formatDate = (date?: Date) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 rounded-3xl border border-white/10 hover:border-primary/30 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            {payment.recipientType === "username" ? (
              <User size={24} className="text-primary" />
            ) : (
              <Wallet size={24} className="text-primary" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white mb-1">{payment.name}</h3>
            <p className="text-sm text-gray-400 truncate">{payment.recipient}</p>
            {payment.description && (
              <p className="text-xs text-gray-500 mt-1">{payment.description}</p>
            )}
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <p className="text-xl font-bold gradient-text">${payment.amount.toFixed(2)}</p>
          {payment.category && (
            <span className="inline-block mt-1 px-2 py-1 rounded-full bg-white/5 text-xs text-gray-400">
              {payment.category}
            </span>
          )}
        </div>
      </div>

      {/* Last Paid */}
      {payment.lastPaid && (
        <div className="mb-4 px-3 py-2 rounded-xl bg-white/5">
          <p className="text-xs text-gray-500">Last paid: {formatDate(payment.lastPaid)}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onPay(payment)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-glow-md transition-all flex items-center justify-center gap-2"
        >
          <Send size={16} />
          Pay Now
        </button>
        <button
          onClick={() => onEdit(payment)}
          className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={() => {
            if (confirm(`Delete "${payment.name}"?`)) {
              onDelete(payment.id);
            }
          }}
          className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}
