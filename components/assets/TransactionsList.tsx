"use client";

import { Transaction } from "@/lib/types";
import { TransactionItem } from "@/components/ui/TransactionItem";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface TransactionsListProps {
  transactions: Transaction[];
  maxItems?: number;
}

export function TransactionsList({ transactions, maxItems = 5 }: TransactionsListProps) {
  const router = useRouter();
  const displayedTransactions = transactions.slice(0, maxItems);

  const handleTransactionClick = (transaction: Transaction) => {
    router.push(`/transaction/${transaction.id}`);
  };

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-lg font-semibold text-white">Last Transactions</h2>
        <button 
          onClick={() => router.push("/transactions")}
          className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
        >
          See all
        </button>
      </div>

      {/* Transactions Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glass-card rounded-3xl p-2 border border-white/10"
      >
        {displayedTransactions.length > 0 ? (
          <div className="space-y-1">
            {displayedTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              >
                <TransactionItem
                  transaction={transaction}
                  onClick={() => handleTransactionClick(transaction)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-gray-400 text-sm">No transactions yet</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
