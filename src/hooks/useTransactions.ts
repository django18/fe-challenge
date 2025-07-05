import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import {
  fetchTransactions,
  fetchTransactionsByCard,
  clearTransactions,
  clearError,
} from "@/store/slices/transactionsSlice";

export const useTransactions = () => {
  const dispatch = useAppDispatch();
  const { transactions, loading, error } = useAppSelector(
    (state) => state.transactions
  );

  const loadAllTransactions = useCallback(async () => {
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

  const clearAllTransactions = useCallback(() => {
    dispatch(clearTransactions());
  }, [dispatch]);

  const clearErrorMessage = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Get transactions for a specific card
  const getTransactionsByCard = useCallback(
    (cardId: string) => {
      return transactions.filter(
        (transaction) => transaction.cardId === cardId
      );
    },
    [transactions]
  );

  return {
    // State
    transactions,
    loading,
    error,

    // Actions
    loadAllTransactions,
    loadTransactionsByCard,
    clearAllTransactions,
    clearErrorMessage,

    // Utilities
    getTransactionsByCard,
  };
};
