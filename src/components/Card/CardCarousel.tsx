"use client";

import { useState, useRef, useEffect } from "react";
import { Card as CardType } from "@/types/card";
import { DebitCard } from "./DebitCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

interface CardCarouselProps {
  cards: CardType[];
  onCardSelect?: (card: CardType) => void;
  className?: string;
}

export const CardCarousel = ({
  cards,
  onCardSelect,
  className,
}: CardCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const goToCard = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (cards.length > 0 && onCardSelect) {
      onCardSelect(cards[currentIndex]);
    }
  }, [currentIndex, cards, onCardSelect]);

  if (cards.length === 0) {
    return (
      <div className={cn("flex h-64 items-center justify-center", className)}>
        <div className="text-center text-gray-500">
          <div className="text-lg font-medium">No cards available</div>
          <div className="text-sm">Add your first card to get started</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full", className)}>
      {/* Main Carousel */}
      <div ref={carouselRef} className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {cards.map((card, index) => (
            <div
              key={card.id + card.cardNumber}
              className="w-full flex-shrink-0 px-0 md:px-4"
              onClick={() => setCurrentIndex(index)}
            >
              <DebitCard
                card={card}
                className={cn(
                  "mx-auto cursor-pointer transition-all duration-300",
                  index === currentIndex ? "scale-100" : "scale-95 opacity-75"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {cards.length > 1 && (
        <>
          <button
            onClick={prevCard}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all hover:bg-white hover:shadow-xl hidden md:block"
            aria-label="Previous card"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={nextCard}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-all hover:bg-white hover:shadow-xl hidden md:block"
            aria-label="Next card"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {cards.length > 1 && (
        <div className="mt-6 flex justify-center space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToCard(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-200",
                index === currentIndex
                  ? "bg-green-500 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Card Counter */}
      {/* <div className="mt-4 text-center text-sm text-gray-600">
        {currentIndex + 1} of {cards.length} cards
      </div> */}
    </div>
  );
};
