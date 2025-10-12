"use client";

import { Envelope } from "@/lib/types";
import { Plus, Users, ArrowDownToLine, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface EnvelopeCardProps {
  envelope: Envelope;
  onAddMoney?: (envelopeId: string) => void;
  onWithdraw?: (envelopeId: string) => void;
  onDelete?: (envelopeId: string) => void;
  onClick?: (envelope: Envelope) => void;
}

export function EnvelopeCard({ envelope, onAddMoney, onWithdraw, onDelete, onClick }: EnvelopeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onClick?.(envelope)}
      className="glass-card p-6 rounded-3xl border border-white/10 hover:border-primary/30 transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Envelope Name */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-white">{envelope.name}</h3>
            {envelope.type === "shared" && (
              <Users size={16} className="text-primary" />
            )}
          </div>

          {/* Balance */}
          <p className="text-3xl font-bold gradient-text">
            ${envelope.balance.toFixed(2)}
          </p>

          {/* Participants count for shared envelopes */}
          {envelope.type === "shared" && envelope.participants && (
            <p className="text-xs text-gray-400 mt-2">
              {envelope.participants.length} participants
            </p>
          )}
        </div>

        {/* Add Money Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddMoney?.(envelope.id);
          }}
          className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 flex items-center justify-center transition-all hover:scale-110"
        >
          <Plus size={24} className="text-primary" />
        </button>
      </div>

      {/* Action Buttons - Conditional based on balance */}
      <div className="flex gap-2">
        {envelope.balance > 0 ? (
          // Show Withdraw button when there are funds
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWithdraw?.(envelope.id);
            }}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center justify-center gap-2"
          >
            <ArrowDownToLine size={16} />
            <span className="text-sm font-medium">Withdraw</span>
          </button>
        ) : (
          // Show Delete button when balance is 0
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Delete envelope "${envelope.name}"?`)) {
                onDelete?.(envelope.id);
              }
            }}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 size={16} />
            <span className="text-sm font-medium">Delete Envelope</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
