"use client";

import { Transaction } from "@/lib/types";
import { ArrowDownLeft, ArrowUpRight, CreditCard, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionItemProps {
  transaction: Transaction;
  onClick?: () => void;
}

export function TransactionItem({ transaction, onClick }: TransactionItemProps) {
  const isPositive = transaction.amount > 0;
  
  const getIcon = () => {
    switch (transaction.type) {
      case "send":
        return <ArrowUpRight className="text-red-400" size={18} />;
      case "receive":
        return <ArrowDownLeft className="text-primary" size={18} />;
      case "payment":
        return <CreditCard className="text-blue-400" size={18} />;
      case "request":
        return <Mail className="text-yellow-400" size={18} />;
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return "Hace unos minutos";
    if (hours < 24) return `Hace ${hours}h`;
    if (hours < 48) return "Ayer";
    return date.toLocaleDateString("es-CR", { month: "short", day: "numeric" });
  };

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-3 px-4 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
          {getIcon()}
        </div>
        <div className="text-left">
          <p className="text-white font-medium text-sm">{transaction.contact}</p>
          <p className="text-gray-400 text-xs">{formatDate(transaction.date)}</p>
        </div>
      </div>

      <div className="text-right">
        <p
          className={cn(
            "font-semibold text-sm",
            isPositive ? "text-primary" : "text-white"
          )}
        >
          {isPositive ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
        </p>
        <p className="text-gray-400 text-xs">{transaction.status}</p>
      </div>
    </button>
  );
}
