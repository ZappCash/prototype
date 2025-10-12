"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { TabFilter } from "@/components/envelopes/TabFilter";
import { EnvelopeCard } from "@/components/envelopes/EnvelopeCard";
import { CreateEnvelopeFAB } from "@/components/envelopes/CreateEnvelopeFAB";
import { CreateEnvelopeModal } from "@/components/envelopes/CreateEnvelopeModal";
import { AddMoneyModal } from "@/components/envelopes/AddMoneyModal";
import { WithdrawModal } from "@/components/envelopes/WithdrawModal";
import { EnvelopeDetailModal } from "@/components/envelopes/EnvelopeDetailModal";
import { mockUser, mockEnvelopes } from "@/lib/data/mock";
import { EnvelopeType, Envelope, EnvelopeCategory } from "@/lib/types";

export default function EnvelopesPage() {
  const [activeTab, setActiveTab] = useState<EnvelopeType>("individual");
  const [envelopes, setEnvelopes] = useState<Envelope[]>(mockEnvelopes);
  const [userBalance, setUserBalance] = useState(mockUser.balance);

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createModalType, setCreateModalType] = useState<EnvelopeType>("individual");
  const [addMoneyModalOpen, setAddMoneyModalOpen] = useState(false);
  const [selectedEnvelopeForMoney, setSelectedEnvelopeForMoney] = useState<Envelope | null>(null);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [selectedEnvelopeForWithdraw, setSelectedEnvelopeForWithdraw] = useState<Envelope | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedEnvelopeForDetail, setSelectedEnvelopeForDetail] = useState<Envelope | null>(null);

  // Filter envelopes based on active tab
  const filteredEnvelopes = envelopes.filter(
    (envelope) => envelope.type === activeTab
  );

  const handleCreateEnvelope = (type: EnvelopeType) => {
    setCreateModalType(type);
    setCreateModalOpen(true);
  };

  const handleCreateEnvelopeSubmit = (data: {
    name: string;
    description: string;
    category: EnvelopeCategory;
    goal?: number;
  }) => {
    const newEnvelope: Envelope = {
      id: `env${Date.now()}`,
      name: data.name,
      description: data.description,
      balance: 0,
      type: createModalType,
      category: data.category,
      goal: data.goal,
      createdBy: mockUser.id,
      createdAt: new Date(),
      ...(createModalType === "shared" && {
        shareUrl: `https://zappcash.app/envelope/env${Date.now()}`,
        qrCode: `QR_CODE_DATA_${Date.now()}`,
        participants: [mockUser.id],
      }),
    };

    setEnvelopes([...envelopes, newEnvelope]);
  };

  const handleAddMoneyClick = (envelopeId: string) => {
    const envelope = envelopes.find((e) => e.id === envelopeId);
    if (envelope) {
      setSelectedEnvelopeForMoney(envelope);
      setAddMoneyModalOpen(true);
    }
  };

  const handleAddMoneySubmit = (envelopeId: string, amount: number) => {
    setEnvelopes(
      envelopes.map((env) =>
        env.id === envelopeId
          ? { ...env, balance: env.balance + amount }
          : env
      )
    );
    setUserBalance(userBalance - amount);
  };

  const handleWithdrawClick = (envelopeId: string) => {
    const envelope = envelopes.find((env) => env.id === envelopeId);
    if (envelope) {
      setSelectedEnvelopeForWithdraw(envelope);
      setWithdrawModalOpen(true);
    }
  };

  const handleWithdrawSubmit = (envelopeId: string, amount: number) => {
    setEnvelopes(
      envelopes.map((env) =>
        env.id === envelopeId
          ? { ...env, balance: env.balance - amount }
          : env
      )
    );
    setUserBalance(userBalance + amount);
  };

  const handleEnvelopeClick = (envelope: Envelope) => {
    setSelectedEnvelopeForDetail(envelope);
    setDetailModalOpen(true);
  };

  const handleDeleteEnvelope = (envelopeId: string) => {
    setEnvelopes(envelopes.filter((env) => env.id !== envelopeId));
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
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <Header user={mockUser} />

        {/* Main Content */}
        <main className="flex-1 pb-24 overflow-y-auto">
          {/* Mobile Container */}
          <div className="max-w-md mx-auto px-4">
            {/* Page Title */}
            <div className="py-6">
              <h1 className="text-3xl font-bold text-center gradient-text">
                Envelopes
              </h1>
            </div>

            {/* Tab Filter */}
            <div className="mb-6">
              <TabFilter activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {/* Envelopes List */}
            <div className="space-y-4 pb-6">
              {filteredEnvelopes.length > 0 ? (
                filteredEnvelopes.map((envelope) => (
                  <div key={envelope.id}>
                    <EnvelopeCard
                      envelope={envelope}
                      onClick={handleEnvelopeClick}
                      onAddMoney={(id) => {
                        handleAddMoneyClick(id);
                      }}
                      onWithdraw={(id) => {
                        handleWithdrawClick(id);
                      }}
                      onDelete={(id) => {
                        handleDeleteEnvelope(id);
                      }}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">
                    No {activeTab === "individual" ? "individual" : "shared"} envelopes yet
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Press the + button to create one
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Create Envelope FAB */}
        <CreateEnvelopeFAB onCreateEnvelope={handleCreateEnvelope} />

        {/* Bottom Navigation */}
        <BottomNav activeTab="envelopes" />
      </div>

      {/* Modals */}
      <CreateEnvelopeModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        type={createModalType}
        onCreate={handleCreateEnvelopeSubmit}
      />

      <AddMoneyModal
        isOpen={addMoneyModalOpen}
        onClose={() => setAddMoneyModalOpen(false)}
        envelope={selectedEnvelopeForMoney}
        availableBalance={userBalance}
        onAddMoney={handleAddMoneySubmit}
      />

      <WithdrawModal
        isOpen={withdrawModalOpen}
        onClose={() => setWithdrawModalOpen(false)}
        envelope={selectedEnvelopeForWithdraw}
        onWithdraw={handleWithdrawSubmit}
      />

      <EnvelopeDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        envelope={selectedEnvelopeForDetail}
        onAddMoney={handleAddMoneyClick}
      />
    </div>
  );
}
