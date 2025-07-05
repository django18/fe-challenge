import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import {
  fetchCards,
  addCard as addCardAction,
  toggleCardFreeze as toggleCardFreezeAction,
  toggleCardNumberVisibility as toggleCardNumberVisibilityAction,
  updateCard as updateCardAction,
  deleteCard as deleteCardAction,
  clearError,
  setSelectedCard,
  initializeCards,
} from "@/store/slices/cardsSlice";
import {
  fetchTransactions,
  fetchTransactionsByCard,
} from "@/store/slices/transactionsSlice";
import { Card, CardFormData } from "@/types/card";
import CardsAPI from "@/services/api";

export const useCardsRedux = () => {
  const dispatch = useAppDispatch();
  const { cards, loading, error, selectedCardId, addingCard, updatingCardId } =
    useAppSelector((state) => state.cards);
  const {
    transactions,
    loading: transactionsLoading,
    error: transactionsError,
  } = useAppSelector((state) => state.transactions);

  // Initialize cards on app startup
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Fetch cards from API (will auto-initialize if empty)
        await dispatch(fetchCards()).unwrap();
      } catch (error) {
        console.error("Failed to initialize cards:", error);
        // Fallback: initialize with default cards
        const defaultCards = CardsAPI.initializeDefaultCards();
        dispatch(initializeCards(defaultCards));
      }
    };

    initializeApp();
  }, [dispatch]);

  // Memoized callbacks
  const addCard = useCallback(
    async (cardData: CardFormData) => {
      try {
        await dispatch(addCardAction(cardData)).unwrap();
        return { success: true, error: null };
      } catch (error) {
        return { success: false, error: error as string };
      }
    },
    [dispatch]
  );

  const toggleCardFreeze = useCallback(
    async (cardId: string) => {
      try {
        await dispatch(toggleCardFreezeAction(cardId)).unwrap();
        return { success: true, error: null };
      } catch (error) {
        return { success: false, error: error as string };
      }
    },
    [dispatch]
  );

  const toggleCardNumberVisibility = useCallback(
    async (cardId: string) => {
      try {
        await dispatch(toggleCardNumberVisibilityAction(cardId)).unwrap();
        return { success: true, error: null };
      } catch (error) {
        return { success: false, error: error as string };
      }
    },
    [dispatch]
  );

  const updateCard = useCallback(
    async (cardId: string, updates: Partial<Card>) => {
      try {
        await dispatch(updateCardAction({ cardId, updates })).unwrap();
        return { success: true, error: null };
      } catch (error) {
        return { success: false, error: error as string };
      }
    },
    [dispatch]
  );

  const deleteCard = useCallback(
    async (cardId: string) => {
      try {
        await dispatch(deleteCardAction(cardId)).unwrap();
        return { success: true, error: null };
      } catch (error) {
        return { success: false, error: error as string };
      }
    },
    [dispatch]
  );

  const selectCard = useCallback(
    (cardId: string | null) => {
      dispatch(setSelectedCard(cardId));
    },
    [dispatch]
  );

  const clearErrorMessage = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const refreshCards = useCallback(async () => {
    try {
      await dispatch(fetchCards()).unwrap();
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  const clearAllData = useCallback(() => {
    CardsAPI.clearAllData();
    // Reload the page to reinitialize everything
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }, []);

  const loadTransactions = useCallback(async () => {
    try {
      await dispatch(fetchTransactions()).unwrap();
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error as string };
    }
  }, [dispatch]);

  const loadTransactionsByCard = useCallback(
    async (cardId: string) => {
      try {
        await dispatch(fetchTransactionsByCard(cardId)).unwrap();
        return { success: true, error: null };
      } catch (error) {
        return { success: false, error: error as string };
      }
    },
    [dispatch]
  );

  // Get selected card object
  const selectedCard = selectedCardId
    ? cards.find((card) => card.id === selectedCardId) || null
    : null;

  // Check if a specific card is being updated
  const isCardUpdating = (cardId: string) => updatingCardId === cardId;

  return {
    // State
    cards,
    loading,
    error,
    selectedCard,
    addingCard,
    updatingCardId,
    transactions,
    transactionsLoading,
    transactionsError,

    // Actions
    addCard,
    toggleCardFreeze,
    toggleCardNumberVisibility,
    updateCard,
    deleteCard,
    selectCard,
    clearErrorMessage,
    refreshCards,
    loadTransactions,
    loadTransactionsByCard,
    clearAllData,

    // Utilities
    isCardUpdating,
  };
};
