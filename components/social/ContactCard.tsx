"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Contact } from "@/lib/types";
import { Send, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface ContactCardProps {
  contact: Contact;
  isAdded: boolean;
  onClick?: () => void;
  onSend?: (contact: Contact) => void;
  onAdd?: (contact: Contact) => void;
}

export function ContactCard({ contact, isAdded, onClick, onSend, onAdd }: ContactCardProps) {
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAdded && onSend) {
      onSend(contact);
    } else if (!isAdded && onAdd) {
      onAdd(contact);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 rounded-2xl border border-white/10 hover:border-primary/30 transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <Avatar name={contact.name} size="md" />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm truncate">
            {contact.name}
          </h3>
          <p className="text-gray-400 text-xs truncate">
            {contact.username}
          </p>
        </div>

        {/* Action Button */}
        {isAdded ? (
          <button
            onClick={handleButtonClick}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-black text-sm font-semibold hover:shadow-glow-md transition-all flex items-center gap-2"
          >
            <Send size={16} />
            Send
          </button>
        ) : (
          <button
            onClick={handleButtonClick}
            className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/30 text-primary flex items-center justify-center transition-all"
          >
            <Plus size={20} />
          </button>
        )}
      </div>
    </motion.div>
  );
}
