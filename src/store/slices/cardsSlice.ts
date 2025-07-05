import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Card, CardFormData } from "@/types/card";
import CardsAPI, { ApiError } from "@/services/api";

// Async thunks for API calls
export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await CardsAPI.getCards();
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message);
    }
  }
);

export const addCard = createAsyncThunk(
  "cards/addCard",
  async (cardData: CardFormData, { rejectWithValue }) => {
    try {
      const response = await CardsAPI.addCard(cardData);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message);
    }
  }
);

export const toggleCardFreeze = createAsyncThunk(
  "cards/toggleCardFreeze",
  async (cardId: string, { rejectWithValue }) => {
    try {
      const response = await CardsAPI.toggleCardFreeze(cardId);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message);
    }
  }
);

export const toggleCardNumberVisibility = createAsyncThunk(
  "cards/toggleCardNumberVisibility",
  async (cardId: string, { rejectWithValue }) => {
    try {
      const response = await CardsAPI.toggleCardNumberVisibility(cardId);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message);
    }
  }
);

export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async (
    { cardId, updates }: { cardId: string; updates: Partial<Card> },
    { rejectWithValue }
  ) => {
    try {
      const response = await CardsAPI.updateCard(cardId, updates);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message);
    }
  }
);

export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async (cardId: string, { rejectWithValue }) => {
    try {
      await CardsAPI.deleteCard(cardId);
      return cardId;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.message);
    }
  }
);

// Initial state
interface CardsState {
  cards: Card[];
  loading: boolean;
  error: string | null;
  selectedCardId: string | null;
  addingCard: boolean;
  updatingCardId: string | null;
}

const initialState: CardsState = {
  cards: [],
  loading: false,
  error: null,
  selectedCardId: null,
  addingCard: false,
  updatingCardId: null,
};

// Cards slice
const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedCard: (state, action: PayloadAction<string | null>) => {
      state.selectedCardId = action.payload;
    },
    initializeCards: (state, action: PayloadAction<Card[]>) => {
      // Sort cards by creation date (newest first)
      state.cards = action.payload.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    },
  },
  extraReducers: (builder) => {
    // Fetch cards
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        // Cards are already sorted by API, but ensure consistency
        state.cards = action.payload.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
        state.error = null;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add card
    builder
      .addCase(addCard.pending, (state) => {
        state.addingCard = true;
        state.error = null;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.addingCard = false;
        // Add new card at the beginning since it's the newest
        state.cards.unshift(action.payload);
        state.error = null;
      })
      .addCase(addCard.rejected, (state, action) => {
        state.addingCard = false;
        state.error = action.payload as string;
      });

    // Toggle card freeze
    builder
      .addCase(toggleCardFreeze.pending, (state, action) => {
        state.updatingCardId = action.meta.arg;
        state.error = null;
      })
      .addCase(toggleCardFreeze.fulfilled, (state, action) => {
        state.updatingCardId = null;
        const index = state.cards.findIndex(
          (card) => card.id === action.payload.id
        );
        if (index !== -1) {
          state.cards[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(toggleCardFreeze.rejected, (state, action) => {
        state.updatingCardId = null;
        state.error = action.payload as string;
      });

    // Toggle card number visibility
    builder
      .addCase(toggleCardNumberVisibility.pending, (state, action) => {
        state.updatingCardId = action.meta.arg;
        state.error = null;
      })
      .addCase(toggleCardNumberVisibility.fulfilled, (state, action) => {
        state.updatingCardId = null;
        const index = state.cards.findIndex(
          (card) => card.id === action.payload.id
        );
        if (index !== -1) {
          state.cards[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(toggleCardNumberVisibility.rejected, (state, action) => {
        state.updatingCardId = null;
        state.error = action.payload as string;
      });

    // Update card
    builder
      .addCase(updateCard.pending, (state, action) => {
        state.updatingCardId = action.meta.arg.cardId;
        state.error = null;
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.updatingCardId = null;
        const index = state.cards.findIndex(
          (card) => card.id === action.payload.id
        );
        if (index !== -1) {
          state.cards[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.updatingCardId = null;
        state.error = action.payload as string;
      });

    // Delete card
    builder
      .addCase(deleteCard.pending, (state, action) => {
        state.updatingCardId = action.meta.arg;
        state.error = null;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.updatingCardId = null;
        state.cards = state.cards.filter((card) => card.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.updatingCardId = null;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setSelectedCard, initializeCards } =
  cardsSlice.actions;
export default cardsSlice.reducer;
