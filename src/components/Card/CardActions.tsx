'use client';

import { Card as CardType } from '@/types/card';
import { Button } from '@/components/ui/Button';
import { Snowflake, Sun, Plus, Settings, CreditCard } from 'lucide-react';
import { cn } from '@/utils/cn';

interface CardActionsProps {
  card: CardType | null;
  onFreezeToggle: (cardId: string) => void;
  onAddCard: () => void;
  loading?: boolean;
}

export const CardActions = ({ card, onFreezeToggle, onAddCard, loading }: CardActionsProps) => {
  const handleFreezeToggle = () => {
    if (card) {
      onFreezeToggle(card.id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Primary Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Freeze/Unfreeze Card */}
        {card && (
          <Button
            onClick={handleFreezeToggle}
            variant={card.isFrozen ? "secondary" : "outline"}
            className={cn(
              "flex items-center justify-center space-x-2 py-4",
              card.isFrozen 
                ? "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" 
                : "border-orange-200 text-orange-700 hover:bg-orange-50"
            )}
            loading={loading}
          >
            {card.isFrozen ? (
              <>
                <Sun className="h-5 w-5" />
                <span>Unfreeze Card</span>
              </>
            ) : (
              <>
                <Snowflake className="h-5 w-5" />
                <span>Freeze Card</span>
              </>
            )}
          </Button>
        )}

        {/* Add New Card */}
        <Button
          onClick={onAddCard}
          variant="primary"
          className="flex items-center justify-center space-x-2 py-4"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Card</span>
        </Button>
      </div>

      {/* Secondary Actions */}
      {card && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <ActionButton
            icon={<Settings className="h-4 w-4" />}
            label="Set Spend Limit"
            onClick={() => console.log('Set spend limit')}
          />
          <ActionButton
            icon={<CreditCard className="h-4 w-4" />}
            label="Replace Card"
            onClick={() => console.log('Replace card')}
          />
          <ActionButton
            icon={<Settings className="h-4 w-4" />}
            label="Cancel Card"
            onClick={() => console.log('Cancel card')}
            variant="danger"
          />
          <ActionButton
            icon={<Settings className="h-4 w-4" />}
            label="Card Details"
            onClick={() => console.log('Card details')}
          />
        </div>
      )}
    </div>
  );
};

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

const ActionButton = ({ icon, label, onClick, variant = 'default' }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border p-3 text-sm transition-all hover:shadow-md",
        variant === 'danger'
          ? "border-red-200 text-red-600 hover:bg-red-50"
          : "border-gray-200 text-gray-600 hover:bg-gray-50"
      )}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-center text-xs">{label}</span>
    </button>
  );
};