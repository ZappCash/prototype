"use client";

import { useState, useEffect } from "react";
import { X, User, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { RecurringPayment, RecipientType } from "@/lib/types";

interface EditRecurringModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: RecurringPayment | null;
  onUpdate: (id: string, data: {
    name: string;
    recipientType: RecipientType;
    recipient: string;
    amount: number;
    description: string;
    category: string;
  }) => void;
}

export function EditRecurringModal({ isOpen, onClose, payment, onUpdate }: EditRecurringModalProps) {
  const [name, setName] = useState("");
  const [recipientType, setRecipientType] = useState<RecipientType>("username");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // Load payment data when modal opens
  useEffect(() => {
    if (payment) {
      setName(payment.name);
      setRecipientType(payment.recipientType);
      setRecipient(payment.recipient);
      setAmount(payment.amount.toString());
      setDescription(payment.description || "");
      setCategory(payment.category || "");
    }
  }, [payment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!payment) return;

    onUpdate(payment.id, {
      name,
      recipientType,
      recipient,
      amount: parseFloat(amount),
      description,
      category,
    });

    onClose();
  };

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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card rounded-3xl border border-primary/20 p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Edit Payment</h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Payment Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Barbería, Netflix, Gym"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Recipient Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Recipient Type *
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setRecipientType("username")}
                      className={cn(
                        "flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2",
                        recipientType === "username"
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-white/5 text-gray-400 hover:bg-white/10"
                      )}
                    >
                      <User size={18} />
                      Username
                    </button>
                    <button
                      type="button"
                      onClick={() => setRecipientType("address")}
                      className={cn(
                        "flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2",
                        recipientType === "address"
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-white/5 text-gray-400 hover:bg-white/10"
                      )}
                    >
                      <Wallet size={18} />
                      Address
                    </button>
                  </div>
                </div>

                {/* Recipient */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    {recipientType === "username" ? "Username" : "Wallet Address"} *
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder={recipientType === "username" ? "@username" : "0x..."}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Amount (USDC) *
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Subscription, Bills, Services"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Optional notes..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-glow-md transition-all"
                >
                  Update Payment
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
