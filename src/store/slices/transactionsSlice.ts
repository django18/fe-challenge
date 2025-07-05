import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TransactionState } from "@/types/card";
import { TransactionsAPI } from "@/services/api";

// Initial state
const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await TransactionsAPI.getTransactions();
    return response.data;
  }
);

export const fetchTransactionsByCard = createAsyncThunk(
  "transactions/fetchTransactionsByCard",
  async (cardId: string) => {
    const response = await TransactionsAPI.getTransactionsByCard(cardId);
    return response.data;
  }
);

// Create the slice
const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    clearTransactions: (state) => {
      state.transactions = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch transactions";
      })
      // Fetch transactions by card
      .addCase(fetchTransactionsByCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionsByCard.fulfilled, (state, action) => {
        state.loading = false;
        // Replace transactions for the specific card
        const cardTransactions = action.payload;
        if (cardTransactions.length > 0) {
          const cardId = cardTransactions[0].cardId;
          state.transactions = state.transactions.filter(
            (txn) => txn.cardId !== cardId
          );
          state.transactions.push(...cardTransactions);
        }
      })
      .addCase(fetchTransactionsByCard.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch card transactions";
      });
  },
});

export const { clearTransactions, clearError } = transactionsSlice.actions;
export default transactionsSlice.reducer;
