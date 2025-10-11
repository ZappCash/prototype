"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { RecurringPaymentCard } from "@/components/recurring/RecurringPaymentCard";
import { CreateRecurringModal } from "@/components/recurring/CreateRecurringModal";
import { EditRecurringModal } from "@/components/recurring/EditRecurringModal";
import { mockRecurringPayments, mockUser } from "@/lib/data/mock";
import { RecurringPayment, RecipientType } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function RecurringPage() {
  const router = useRouter();
  const [payments, setPayments] = useState<RecurringPayment[]>(mockRecurringPayments);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<RecurringPayment | null>(null);

  const handleCreate = (data: {
    name: string;
    recipientType: RecipientType;
    recipient: string;
    amount: number;
    description: string;
    category: string;
  }) => {
    const newPayment: RecurringPayment = {
      id: `rec${Date.now()}`,
      ...data,
      createdAt: new Date(),
    };
    setPayments([newPayment, ...payments]);
  };

  const handleUpdate = (id: string, data: {
    name: string;
    recipientType: RecipientType;
    recipient: string;
    amount: number;
    description: string;
    category: string;
  }) => {
    setPayments(
      payments.map((payment) =>
        payment.id === id
          ? { ...payment, ...data }
          : payment
      )
    );
  };

  const handleDelete = (id: string) => {
    setPayments(payments.filter((payment) => payment.id !== id));
  };

  const handlePay = (payment: RecurringPayment) => {
    // Navigate to send page with pre-filled data
    // For now, just update lastPaid
    setPayments(
      payments.map((p) =>
        p.id === payment.id
          ? { ...p, lastPaid: new Date() }
          : p
      )
    );
    
    // TODO: Navigate to send page with pre-filled recipient and amount
    alert(`Payment of $${payment.amount} to ${payment.recipient} initiated!`);
  };

  const handleEdit = (payment: RecurringPayment) => {
    setSelectedPayment(payment);
    setEditModalOpen(true);
  };

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
      <div className="relative z-10 flex flex-col min-h-screen pb-20">
        {/* Header */}
        <Header user={mockUser} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 py-6">
            {/* Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-center gradient-text mb-2">
                Recurring Payments
              </h1>
              <p className="text-center text-gray-400 text-sm">
                Save your frequent payments for quick access
              </p>
            </div>

            {/* Payments List */}
            <div className="space-y-4">
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <RecurringPaymentCard
                    key={payment.id}
                    payment={payment}
                    onPay={handlePay}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-2">No recurring payments yet</p>
                  <p className="text-sm text-gray-500">
                    Press the + button to create one
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* FAB - Create Button */}
        <button
          onClick={() => setCreateModalOpen(true)}
          className="fixed bottom-32 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary shadow-glow-lg hover:shadow-glow-xl transition-all hover:scale-110 flex items-center justify-center z-40"
        >
          <Plus size={28} className="text-black" />
        </button>

        {/* Bottom Navigation */}
        <BottomNav activeTab="recurring" />
      </div>

      {/* Modals */}
      <CreateRecurringModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreate}
      />

      <EditRecurringModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        payment={selectedPayment}
        onUpdate={handleUpdate}
      />
    </div>
  );
}
