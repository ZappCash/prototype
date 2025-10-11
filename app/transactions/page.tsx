"use client";

import { useState, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchBar } from "@/components/transactions/SearchBar";
import { FilterTabs } from "@/components/transactions/FilterTabs";
import { TransactionItem } from "@/components/ui/TransactionItem";
import { mockTransactions } from "@/lib/data/mock";
import { TransactionType } from "@/lib/types";

export default function TransactionsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<TransactionType | "all">("all");

  // Filter and search transactions
  const filteredTransactions = useMemo(() => {
    let filtered = mockTransactions;

    // Filter by type
    if (activeFilter !== "all") {
      filtered = filtered.filter((tx) => tx.type === activeFilter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tx) =>
          tx.contact?.toLowerCase().includes(query) ||
          tx.description?.toLowerCase().includes(query) ||
          tx.amount.toString().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, activeFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-black text-white flex flex-col relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb-green animate-orb-1 top-20 left-10 opacity-20" />
        <div className="orb-dark-green animate-orb-2 bottom-40 right-10 opacity-15" />
        <div className="orb-green animate-orb-3 top-1/2 left-1/2 opacity-10" />
      </div>

      {/* Dot Pattern Overlay */}
      <div className="fixed inset-0 dot-pattern opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="glass-nav border-b border-primary/10 px-4 py-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <ArrowLeft size={24} className="text-white" />
            </button>
            <h1 className="text-xl font-bold gradient-text">All Transactions</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 py-6 overflow-y-auto">
          <div className="w-full max-w-2xl mx-auto px-4 space-y-6">
            {/* Search Bar */}
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by contact, description, or amount..."
            />

            {/* Filter Tabs */}
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">
                {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
              {(searchQuery || activeFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("all");
                  }}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Transactions List */}
            <div className="space-y-3">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-2">No transactions found</p>
                  <p className="text-sm text-gray-500">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
