"use client";

import { useState } from "react";
import { ArrowLeft, Bell, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AppSettingsPage() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [currency, setCurrency] = useState("USD");

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "CRC", name: "Costa Rican Colón", symbol: "₡" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-black text-white flex flex-col relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb-green animate-orb-1 top-20 left-10 opacity-20" />
        <div className="orb-dark-green animate-orb-2 bottom-40 right-10 opacity-15" />
      </div>

      {/* Dot Pattern Overlay */}
      <div className="fixed inset-0 dot-pattern opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center gap-4 p-6 border-b border-white/10">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">App Settings</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 pb-24">
          <div className="max-w-md mx-auto space-y-6">
            {/* Notifications Toggle */}
            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bell size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">Notifications</h3>
                    <p className="text-sm text-gray-400">Enable push notifications</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    notificationsEnabled ? "bg-primary" : "bg-white/10"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                      notificationsEnabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Currency Selector */}
            <div className="glass-card p-5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Display Currency</h3>
                  <p className="text-sm text-gray-400">Choose your preferred currency</p>
                </div>
              </div>

              <div className="space-y-2">
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() => setCurrency(curr.code)}
                    className={`w-full p-4 rounded-xl border transition-all ${
                      currency === curr.code
                        ? "bg-primary/10 border-primary/50"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{curr.symbol}</span>
                        <div className="text-left">
                          <p className="text-white font-medium">{curr.code}</p>
                          <p className="text-sm text-gray-400">{curr.name}</p>
                        </div>
                      </div>
                      {currency === curr.code && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 3L4.5 8.5L2 6"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
