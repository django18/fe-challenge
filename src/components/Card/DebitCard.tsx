import { Card as CardType } from "@/types/card";
import { maskCardNumber } from "@/utils/cardUtils";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";
import { useCardsRedux } from "@/hooks/useCardsRedux";
import { Eye, EyeOff } from "lucide-react";

interface DebitCardProps {
  card: CardType;
  className?: string;
}

export const DebitCard = ({ card, className }: DebitCardProps) => {
  const {
    name,
    cardNumber,
    expirationDate,
    cvv,
    isFrozen,
    showCardNumber,
    id,
  } = card;
  const { toggleCardNumberVisibility, toggleCardFreeze, isCardUpdating } =
    useCardsRedux();

  const handleToggleCardNumber = async () => {
    await toggleCardNumberVisibility(id);
  };

  const handleToggleFreeze = async () => {
    await toggleCardFreeze(id);
  };

  const isUpdating = isCardUpdating(id);

  return (
    <div
      className={cn(
        "relative w-full max-w-none md:max-w-sm rounded-xl p-4 md:p-6 text-white shadow-lg transition-all duration-300",
        "bg-gradient-to-br from-green-400 via-green-500 to-green-600",
        isFrozen && "opacity-50 grayscale",
        className
      )}
    >
      {/* Top Section - Logo and Show Card Number Button */}
      <div className="mb-6 md:mb-8 flex items-center justify-between">
        <div className="text-lg md:text-xl font-bold">aspire</div>

        {/* Show Card Number Button */}
        <Button
          onClick={handleToggleCardNumber}
          disabled={isUpdating}
          variant="outline"
          size="sm"
          className="h-8 px-2 md:px-3 bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs md:text-sm"
        >
          {showCardNumber ? (
            <>
              <EyeOff className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              Hide card number
            </>
          ) : (
            <>
              <Eye className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              Show card number
            </>
          )}
        </Button>
      </div>

      {/* Cardholder Name */}
      <div className="mb-6 md:mb-8">
        <div className="text-lg md:text-xl font-medium">{name}</div>
      </div>

      {/* Card Number */}
      <div className="mb-6 md:mb-8">
        <div className="text-base md:text-lg font-mono tracking-wider">
          {showCardNumber ? cardNumber : maskCardNumber(cardNumber)}
        </div>
      </div>

      {/* Card Details */}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs opacity-75">Thru:</div>
          <div className="text-sm md:text-base font-medium">
            {expirationDate}
          </div>
        </div>
        <div>
          <div className="text-xs opacity-75">CVV:</div>
          <div className="text-sm md:text-base font-medium">
            {showCardNumber ? cvv : "***"}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl md:text-3xl font-bold italic">VISA</div>
        </div>
      </div>

      {/* Frozen Overlay */}
      {isFrozen && (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/30 backdrop-blur-sm cursor-pointer"
          onClick={handleToggleFreeze}
        >
          <div className="rounded-lg bg-white/20 px-3 md:px-4 py-2 text-center">
            <div className="text-xs md:text-sm font-medium">Card Frozen</div>
            <div className="text-xs opacity-75">Tap to unfreeze</div>
          </div>
        </div>
      )}

      {/* Chip */}
      {/* <div className="absolute left-4 md:left-6 top-16 md:top-20 h-5 md:h-6 w-6 md:w-8 rounded bg-gradient-to-br from-yellow-300 to-yellow-500" /> */}
    </div>
  );
};
