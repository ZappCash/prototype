"use client";

import { X, ArrowDown, ArrowUp, Gift, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Notification } from "@/lib/types";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

export function NotificationsModal({ isOpen, onClose, notifications }: NotificationsModalProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <ArrowDown size={20} className="text-primary" />;
      case "request":
        return <ArrowUp size={20} className="text-orange-400" />;
      case "envelope":
        return <Gift size={20} className="text-primary" />;
      case "system":
        return <Bell size={20} className="text-blue-400" />;
      default:
        return <Bell size={20} className="text-gray-400" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
                  <h1 className="text-xl font-bold text-white">Notifications</h1>
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
                  {/* Unread count */}
                  {unreadCount > 0 && (
                    <div className="mb-4 text-center">
                      <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium">
                        {unreadCount} new notification{unreadCount > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}

                  {/* Notifications List */}
                  <div className="space-y-3">
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`glass-card p-4 rounded-2xl border ${
                            notification.read
                              ? 'border-white/10'
                              : 'border-primary/30 bg-primary/5'
                          } hover:border-primary/30 transition-all cursor-pointer`}
                        >
                          <div className="flex items-start gap-3">
                            {/* Icon */}
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h3 className="text-white font-semibold text-sm">
                                  {notification.title}
                                </h3>
                                {!notification.read && (
                                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                                )}
                              </div>
                              <p className="text-gray-400 text-sm mb-2">
                                {notification.message}
                              </p>
                              <span className="text-xs text-gray-500">
                                {formatTimestamp(notification.timestamp)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                          <Bell size={32} className="text-gray-600" />
                        </div>
                        <p className="text-gray-400 mb-2">No notifications yet</p>
                        <p className="text-sm text-gray-500">
                          We'll notify you when something happens
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
