"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EnvelopeType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CreateEnvelopeFABProps {
  onCreateEnvelope: (type: EnvelopeType) => void;
}

export function CreateEnvelopeFAB({ onCreateEnvelope }: CreateEnvelopeFABProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-32 right-6 z-40">
      {/* Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 flex flex-col gap-3 mb-2"
          >
            {/* Shared Option */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onCreateEnvelope("shared");
                setIsOpen(false);
              }}
              className="glass-card px-6 py-3 rounded-full border border-primary/30 hover:border-primary/50 transition-all flex items-center gap-3 whitespace-nowrap shadow-glow-md"
            >
              <span className="text-sm font-medium text-white">Shared</span>
            </motion.button>

            {/* Individual Option */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onCreateEnvelope("individual");
                setIsOpen(false);
              }}
              className="glass-card px-6 py-3 rounded-full border border-primary/30 hover:border-primary/50 transition-all flex items-center gap-3 whitespace-nowrap shadow-glow-md"
            >
              <span className="text-sm font-medium text-white">Individual</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-glow-lg transition-all",
          isOpen
            ? "bg-primary text-black rotate-45"
            : "bg-gradient-to-br from-primary to-secondary text-white"
        )}
      >
        <Plus size={24} />
      </motion.button>
    </div>
  );
}
