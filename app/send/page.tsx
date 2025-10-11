"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { StepIndicator } from "@/components/send/StepIndicator";
import { RecipientStep } from "@/components/send/RecipientStep";
import { AmountStep } from "@/components/send/AmountStep";
import { ConfirmStep } from "@/components/send/ConfirmStep";
import { SuccessStep } from "@/components/send/SuccessStep";
import { mockUser } from "@/lib/data/mock";

type Step = 1 | 2 | 3 | 4;

interface RecipientData {
  type: "username" | "address";
  value: string;
}

export default function SendPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [recipient, setRecipient] = useState<RecipientData | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [transactionId] = useState(`0x${Math.random().toString(16).slice(2, 18)}`);

  const steps = ["Recipient", "Amount", "Confirm"];

  const handleRecipientNext = (recipientData: RecipientData) => {
    setRecipient(recipientData);
    setCurrentStep(2);
  };

  const handleAmountNext = (amountValue: number) => {
    setAmount(amountValue);
    setCurrentStep(3);
  };

  const handleConfirm = () => {
    setCurrentStep(4);
  };

  const handleBack = () => {
    if (currentStep > 1 && currentStep < 4) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
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
        <header className="glass-nav border-b border-primary/10 px-4 py-4">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <button
              onClick={() => currentStep === 4 ? router.push("/assets") : currentStep === 1 ? router.back() : handleBack()}
              className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <ArrowLeft size={24} className="text-white" />
            </button>
            <h1 className="text-xl font-bold gradient-text">Send Money</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </header>

        {/* Step Indicator */}
        {currentStep < 4 && (
          <StepIndicator
            currentStep={currentStep}
            totalSteps={3}
            steps={steps}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 py-6 overflow-y-auto">
          {currentStep === 1 && (
            <RecipientStep onNext={handleRecipientNext} />
          )}

          {currentStep === 2 && recipient && (
            <AmountStep
              availableBalance={mockUser.balance}
              onNext={handleAmountNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && recipient && (
            <ConfirmStep
              recipient={recipient}
              amount={amount}
              onConfirm={handleConfirm}
              onBack={handleBack}
            />
          )}

          {currentStep === 4 && recipient && (
            <SuccessStep
              amount={amount}
              recipient={recipient}
              transactionId={transactionId}
            />
          )}
        </main>
      </div>
    </div>
  );
}
