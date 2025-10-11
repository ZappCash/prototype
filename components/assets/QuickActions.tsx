"use client";

import { Send, Download, Mail, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type ActionItem = {
  id: string;
  icon: typeof Send;
  label: string;
  bgColor: string;
  iconColor: string;
};

const actions: ActionItem[] = [
  { 
    id: "send", 
    icon: Send, 
    label: "Send", 
    bgColor: "bg-primary/10 hover:bg-primary/20",
    iconColor: "text-primary"
  },
  { 
    id: "receive", 
    icon: Download, 
    label: "Receive", 
    bgColor: "bg-secondary/10 hover:bg-secondary/20",
    iconColor: "text-secondary"
  },
  { 
    id: "envelopes", 
    icon: Mail, 
    label: "Envelopes", 
    bgColor: "bg-primary/10 hover:bg-primary/20",
    iconColor: "text-primary"
  },
  { 
    id: "card", 
    icon: CreditCard, 
    label: "Card", 
    bgColor: "bg-secondary/10 hover:bg-secondary/20",
    iconColor: "text-secondary"
  },
];

export function QuickActions() {
  const router = useRouter();

  const handleActionClick = (actionId: string) => {
    if (actionId === "envelopes") {
      router.push("/envelopes");
    } else if (actionId === "send") {
      router.push("/send");
    } else if (actionId === "receive") {
      router.push("/receive");
    } else if (actionId === "card") {
      router.push("/card");
    } else {
      console.log(`Action clicked: ${actionId}`);
      // TODO: Implement other actions
    }
  };

  return (
    <div className="px-6 py-6">
      <div className="flex items-center justify-center gap-6">
        {actions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleActionClick(action.id)}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className={`
                  w-16 h-16 rounded-2xl 
                  ${action.bgColor}
                  flex items-center justify-center
                  border border-white/5
                  group-hover:border-primary/30
                  group-hover:scale-110
                  group-hover:shadow-glow-md
                  transition-all duration-300
                `}
              >
                <Icon size={28} className={action.iconColor} />
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {action.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
