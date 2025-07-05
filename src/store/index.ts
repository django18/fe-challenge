import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./slices/cardsSlice";
import transactionsReducer from "./slices/transactionsSlice";

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    transactions: transactionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        // Custom function to check if value is serializable
        isSerializable: (value: unknown) => {
          // Allow Date objects to be stored in state
          return (
            value instanceof Date ||
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean" ||
            value === null ||
            value === undefined ||
            Array.isArray(value) ||
            (typeof value === "object" &&
              Object.prototype.toString.call(value) === "[object Object]")
          );
        },
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
