"use client";

import { X, ArrowDown, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Contact, Transaction } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";

interface ContactDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
  transactions: Transaction[];
}

export function ContactDetailModal({ isOpen, onClose, contact, transactions }: ContactDetailModalProps) {
  if (!contact) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
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
          <div className="fixed inset-0 flex items-start justify-center z-[100]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full h-full bg-gradient-to-b from-dark-950 via-dark-900 to-black flex flex-col"
            >
              {/* Header */}
              <header className="glass-nav border-b border-primary/10 px-4 py-4 sticky top-0 z-10">
                <div className="max-w-md mx-auto flex items-center justify-between">
                  <h1 className="text-xl font-bold text-white">Transaction History</h1>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <X size={24} className="text-white" />
                  </button>
                </div>
              </header>

              {/* Content */}
              <main className="flex-1 overflow-y-auto">
                <div className="w-full max-w-md mx-auto px-4 py-6">
                  {/* Contact Info */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6 rounded-3xl border border-primary/20 mb-6"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar name={contact.name} size="lg" />
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-white mb-1">
                          {contact.name}
                        </h2>
                        <p className="text-gray-400 text-sm">{contact.username}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Transactions List */}
                  <div className="mb-4">
                    <h3 className="text-white font-semibold mb-3 px-1">Recent Transactions</h3>
                  </div>

                  <div className="space-y-3">
                    {transactions.length > 0 ? (
                      transactions.map((transaction, index) => (
                        <motion.div
                          key={transaction.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="glass-card p-4 rounded-2xl border border-white/10"
                        >
                          <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              transaction.type === 'receive' ? 'bg-primary/20' : 'bg-orange-500/20'
                            }`}>
                              {transaction.type === 'receive' ? (
                                <ArrowDown size={20} className="text-primary" />
                              ) : (
                                <ArrowUp size={20} className="text-orange-400" />
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="flex-1 min-w-0">
                                  <p className="text-white font-semibold text-sm">
                                    {transaction.type === 'receive' ? 'Received' : 'Sent'}
                                  </p>
                                  <p className="text-gray-400 text-xs">
                                    {transaction.description}
                                  </p>
                                </div>
                                <p className={`text-sm font-bold flex-shrink-0 ${
                                  transaction.type === 'receive' ? 'text-primary' : 'text-white'
                                }`}>
                                  {transaction.type === 'receive' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{formatDate(transaction.date)}</span>
                                <span>•</span>
                                <span>{formatTime(transaction.date)}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-400 mb-2">No transactions yet</p>
                        <p className="text-sm text-gray-500">
                          Start sending or receiving payments
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </main>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
