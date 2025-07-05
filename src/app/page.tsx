"use client";

import { useState, useCallback } from "react";
import { Card as CardType, CardFormData } from "@/types/card";
import { useCardsRedux } from "@/hooks/useCardsRedux";
import { CardCarousel } from "@/components/Card/CardCarousel";
import { AddCardModal } from "@/components/Modal/AddCardModal";
import { Sidebar } from "@/components/ui/Sidebar";
import { TransactionList } from "@/components/ui/TransactionList";
import { MobileNav } from "@/components/ui/MobileNav";
import { Accordion } from "@/components/ui/Accordion";
import { Plus } from "lucide-react";
import Image from "next/image";
import AspireLogoSvg from "@/assets/icons/Aspire-Logo.svg";
import FreezeCardIconSvg from "@/assets/icons/freeze-card.svg";
import SetSpendLimitIconSvg from "@/assets/icons/set-spend-limit.svg";
import GPayIconSvg from "@/assets/icons/GPay.svg";
import ReplaceCardIconSvg from "@/assets/icons/replace-card.svg";
import DeactivateCardIconSvg from "@/assets/icons/deactivate-card.svg";
import { Button, ActionButton } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { CardDetails, CardTransactions } from "@/assets/icons";

export default function HomePage() {
  const {
    cards,
    error,
    selectedCard,
    addingCard,
    addCard,
    toggleCardFreeze,
    selectCard,
    isCardUpdating,
  } = useCardsRedux();

  // Transaction management - removed for now, will be used for "Show All" feature

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"my-cards" | "company-cards">(
    "my-cards"
  );
  const [isCardDetailsOpen, setCardDetailsOpen] = useState(false);
  const [isTransactionsOpen, setTransactionsOpen] = useState(true);

  // Get the current card or first card if none selected
  const currentCard = selectedCard || cards[0];

  // Note: We only show recent transactions from card object
  // Full transaction loading will happen when user clicks "Show All" (future feature)

  const handleAddCard = async (data: CardFormData) => {
    await addCard(data);
    setIsAddModalOpen(false);
  };

  const handleFreezeToggle = async (cardId: string) => {
    await toggleCardFreeze(cardId);
  };

  const handleCardSelect = useCallback(
    (card: CardType) => {
      selectCard(card.id);
    },
    [selectCard]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row lg:h-screen">
      {/* Mobile Header - Fixed at top on mobile */}
      <div className="lg:hidden bg-[#0C365A] text-white px-4 pt-6 pb-30 fixed top-0 left-0 right-0 z-10">
        {/* Logo top right */}
        <div className="flex justify-end mb-4">
          <div className="w-6 h-6 bg-[#01D167] rounded flex items-center justify-center">
            <Image
              src={AspireLogoSvg}
              alt="Aspire Logo"
              width={16}
              height={16}
              className="brightness-0 invert"
            />
          </div>
        </div>

        {/* Balance and New card */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-base">Account balance</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="bg-[#01D167] px-1.5 py-0.5 rounded text-sm font-semibold">
                S$
              </span>
              <span className="text-3xl font-bold">
                {currentCard?.balance.toLocaleString("en-SG") || "0"}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-1 text-[#0C365A] font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>New card</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 mb-6">
          <button
            onClick={() => setActiveTab("my-cards")}
            className={cn(
              "pb-2 border-b-2 text-sm font-medium",
              activeTab === "my-cards"
                ? "border-[#01D167] text-white"
                : "border-transparent text-white/70"
            )}
          >
            My debit cards
          </button>
          <button
            onClick={() => setActiveTab("company-cards")}
            className={cn(
              "pb-2 border-b-2 text-sm font-medium",
              activeTab === "company-cards"
                ? "border-[#01D167] text-white"
                : "border-transparent text-white/70"
            )}
          >
            All company cards
          </button>
        </div>

        {/* Card Carousel - Integrated into header on mobile */}
        <div className="px-4">
          <CardCarousel cards={cards} onCardSelect={handleCardSelect} />
        </div>
      </div>

      {/* Left Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:block lg:w-64 xl:w-80">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row pb-20 lg:pb-12 lg:overflow-y-auto lg:h-full">
        {/* Center Content - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block flex-1 p-6 lg:p-8">
          {/* Available Balance */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-sm text-gray-600 mb-2">
                  Available balance
                </h1>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#01D167] text-white px-2 py-1 rounded text-sm font-semibold">
                    S$
                  </div>
                  <span className="text-3xl font-bold text-gray-900">
                    {currentCard?.balance.toLocaleString("en-SG") || "0"}
                  </span>
                </div>
              </div>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[#0C365A] hover:bg-[#0C365A] text-white px-6 py-2 rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>New card</span>
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("my-cards")}
                className={cn(
                  "pb-3 border-b-2 font-medium text-sm transition-colors",
                  activeTab === "my-cards"
                    ? "border-[#01D167] text-[#01D167]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                )}
              >
                My debit cards
              </button>
              <button
                onClick={() => setActiveTab("company-cards")}
                className={cn(
                  "pb-3 border-b-2 font-medium text-sm transition-colors",
                  activeTab === "company-cards"
                    ? "border-[#01D167] text-[#01D167]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                )}
              >
                All company cards
              </button>
            </div>
          </div>

          {/* Tab Body */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-12 lg:mb-0 grid gap-8 lg:grid-cols-5">
            {/* Left Column – Carousel & Actions */}
            <div className="lg:col-span-3">
              {/* Error Display */}
              {error && (
                <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {/* Card Carousel */}
              <div className="mb-8">
                <CardCarousel cards={cards} onCardSelect={handleCardSelect} />
              </div>

              {/* Card Actions */}
              {currentCard && (
                <div className="grid grid-cols-5 gap-3 bg-[#EDF3FF] rounded-lg p-2">
                  <ActionButton
                    icon={
                      <Image
                        src={FreezeCardIconSvg}
                        alt="Freeze card"
                        width={32}
                        height={32}
                      />
                    }
                    label="Freeze card"
                    onClick={() => handleFreezeToggle(currentCard.id)}
                    loading={isCardUpdating(currentCard.id)}
                  />
                  <ActionButton
                    icon={
                      <Image
                        src={SetSpendLimitIconSvg}
                        alt="Set spend limit"
                        width={32}
                        height={32}
                      />
                    }
                    label="Set spend limit"
                    onClick={() => console.log("Set spend limit")}
                  />
                  <ActionButton
                    icon={
                      <Image
                        src={GPayIconSvg}
                        alt="GPay"
                        width={32}
                        height={32}
                      />
                    }
                    label="Add to GPay"
                    onClick={() => console.log("Add to GPay")}
                  />
                  <ActionButton
                    icon={
                      <Image
                        src={ReplaceCardIconSvg}
                        alt="Replace card"
                        width={32}
                        height={32}
                      />
                    }
                    label="Replace card"
                    onClick={() => console.log("Replace card")}
                  />
                  <ActionButton
                    icon={
                      <Image
                        src={DeactivateCardIconSvg}
                        alt="Deactivate card"
                        width={32}
                        height={32}
                      />
                    }
                    label="Cancel card"
                    onClick={() => console.log("Cancel card")}
                  />
                </div>
              )}
            </div>

            {/* Right Column – Accordions */}
            <div className="space-y-6 lg:overflow-y-auto lg:pr-1 lg:max-h-full lg:col-span-2">
              {/* Card Details Accordion */}
              <Accordion
                title="Card details"
                icon={CardDetails}
                iconAlt="Card details"
                isOpen={isCardDetailsOpen}
                onToggle={() => setCardDetailsOpen(!isCardDetailsOpen)}
              >
                {currentCard && (
                  <div className="space-y-4 text-sm text-gray-700 p-4">
                    <div className="flex justify-between">
                      <span>Name on card</span>
                      <span className="font-medium">{currentCard.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Card expiry</span>
                      <span className="font-medium">
                        {currentCard.expirationDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Card type</span>
                      <span className="font-medium capitalize">
                        {currentCard.cardType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status</span>
                      <span
                        className={`font-medium ${
                          currentCard.isFrozen
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {currentCard.isFrozen ? "Frozen" : "Active"}
                      </span>
                    </div>
                  </div>
                )}
              </Accordion>

              {/* Recent Transactions Accordion */}
              <Accordion
                title="Recent transactions"
                icon={CardTransactions}
                iconAlt="Card transactions"
                isOpen={isTransactionsOpen}
                onToggle={() => setTransactionsOpen(!isTransactionsOpen)}
                className="mb-2"
              >
                {currentCard && (
                  <div className="space-y-4 text-sm text-gray-700">
                    <div className="p-4">
                      <TransactionList
                        transactions={currentCard.recentTransactions || []}
                      />
                    </div>
                    {/* Show all transactions footer */}
                    {currentCard.recentTransactions &&
                      currentCard.recentTransactions.length > 0 && (
                        <div className="border-t border-gray-200 p-4 bg-[#EDFFF5]">
                          <button
                            className="w-full text-center text-sm font-medium text-[#01D167] hover:text-[#00B859] transition-colors"
                            onClick={() =>
                              console.log(
                                "Show all transactions for card:",
                                currentCard.id
                              )
                            }
                          >
                            Show all transactions
                          </button>
                        </div>
                      )}
                  </div>
                )}
              </Accordion>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Modal Section - Slides up over header */}
        <div className="lg:hidden">
          <div className="h-screen overflow-y-auto pt-[475px]">
            <div className="bg-white rounded-t-3xl min-h-screen relative z-20">
              {/* Error Display */}
              {error && (
                <div className="mx-6 pt-6 rounded-lg bg-red-50 border border-red-200 p-4">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              {/* Card Actions - Integrated into rounded card with blue background */}
              {currentCard && (
                <div className="bg-[#EDF3FF] rounded-t-3xl pt-4 pb-4">
                  <div className="px-4">
                    <div className="grid grid-cols-5 gap-1 bg-[#EDF3FF] rounded-lg p-1">
                      <ActionButton
                        icon={
                          <Image
                            src={FreezeCardIconSvg}
                            alt="Freeze card"
                            width={32}
                            height={32}
                          />
                        }
                        label="Freeze card"
                        onClick={() => handleFreezeToggle(currentCard.id)}
                        loading={isCardUpdating(currentCard.id)}
                      />
                      <ActionButton
                        icon={
                          <Image
                            src={SetSpendLimitIconSvg}
                            alt="Set spend limit"
                            width={32}
                            height={32}
                          />
                        }
                        label="Set spend limit"
                        onClick={() => console.log("Set spend limit")}
                      />
                      <ActionButton
                        icon={
                          <Image
                            src={GPayIconSvg}
                            alt="GPay"
                            width={32}
                            height={32}
                          />
                        }
                        label="Add to GPay"
                        onClick={() => console.log("Add to GPay")}
                      />
                      <ActionButton
                        icon={
                          <Image
                            src={ReplaceCardIconSvg}
                            alt="Replace card"
                            width={32}
                            height={32}
                          />
                        }
                        label="Replace card"
                        onClick={() => console.log("Replace card")}
                      />
                      <ActionButton
                        icon={
                          <Image
                            src={DeactivateCardIconSvg}
                            alt="Deactivate card"
                            width={32}
                            height={32}
                          />
                        }
                        label="Cancel card"
                        onClick={() => console.log("Cancel card")}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Accordions with padding */}
              <div className="p-6 space-y-6 pb-10">
                {/* Card Details Accordion */}
                <Accordion
                  title="Card details"
                  icon={CardDetails}
                  iconAlt="Card details"
                  isOpen={isCardDetailsOpen}
                  onToggle={() => setCardDetailsOpen(!isCardDetailsOpen)}
                >
                  {currentCard && (
                    <div className="space-y-4 text-sm text-gray-700 p-4">
                      <div className="flex justify-between">
                        <span>Name on card</span>
                        <span className="font-medium">{currentCard.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Card expiry</span>
                        <span className="font-medium">
                          {currentCard.expirationDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Card type</span>
                        <span className="font-medium capitalize">
                          {currentCard.cardType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status</span>
                        <span
                          className={`font-medium ${
                            currentCard.isFrozen
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {currentCard.isFrozen ? "Frozen" : "Active"}
                        </span>
                      </div>
                    </div>
                  )}
                </Accordion>

                {/* Recent Transactions Accordion */}
                <Accordion
                  title="Recent transactions"
                  icon={CardTransactions}
                  iconAlt="Card transactions"
                  isOpen={isTransactionsOpen}
                  onToggle={() => setTransactionsOpen(!isTransactionsOpen)}
                  className="mb-2"
                >
                  {currentCard && (
                    <div className="space-y-4 text-sm text-gray-700">
                      <div className="p-4">
                        <TransactionList
                          transactions={currentCard.recentTransactions || []}
                        />
                      </div>
                      {/* Show all transactions footer */}
                      {currentCard.recentTransactions &&
                        currentCard.recentTransactions.length > 0 && (
                          <div className="border-t border-gray-200 p-4 bg-[#EDFFF5]">
                            <button
                              className="w-full text-center text-sm font-medium text-[#01D167] hover:text-[#00B859] transition-colors"
                              onClick={() =>
                                console.log(
                                  "Show all transactions for card:",
                                  currentCard.id
                                )
                              }
                            >
                              Show all transactions
                            </button>
                          </div>
                        )}
                    </div>
                  )}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      <AddCardModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCard}
        loading={addingCard}
      />

      {/* Mobile Navigation - Fixed at bottom */}
      <MobileNav />
    </div>
  );
}
