import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { BalanceCard } from "@/components/assets/BalanceCard";
import { QuickActions } from "@/components/assets/QuickActions";
import { TransactionsList } from "@/components/assets/TransactionsList";
import { mockUser, mockTransactions } from "@/lib/data/mock";

export default function AssetsPage() {
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
        <Header user={mockUser} />

        {/* Main Content */}
        <main className="flex-1 pb-24 overflow-y-auto">
          {/* Mobile Container */}
          <div className="max-w-md mx-auto">
            {/* Balance Section */}
            <BalanceCard balance={mockUser.balance} currency={mockUser.currency} />

            {/* Quick Actions */}
            <QuickActions />

            {/* Transactions List */}
            <TransactionsList transactions={mockTransactions} maxItems={5} />
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomNav activeTab="assets" />
      </div>
    </div>
  );
}
