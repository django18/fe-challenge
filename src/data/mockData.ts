// Note: This file is kept for reference but is not actively used.
// The actual mock data generation is handled by the API service and cardUtils.
// See src/services/api.ts and src/utils/cardUtils.ts for the current implementation.

// Legacy mock data - replaced by dynamic generation
// The current system generates realistic transaction data with:
// - 70+ merchant names across multiple categories
// - Category-based realistic pricing
// - Specific transaction patterns for each cardholder
// - Random and weighted date distribution
// - Multiple transaction types and amounts

export const MOCK_DATA_INFO = {
  note: "Mock data is now dynamically generated",
  currentImplementation: {
    cards: "Generated in src/utils/cardUtils.ts - createNewCard()",
    transactions:
      "Generated in src/utils/cardUtils.ts - generateMultipleTransactions() and generateSpecificTransactions()",
    api: "Handled by src/services/api.ts - MockDatabase class",
  },
  features: [
    "25-35 transactions per card",
    "Category-based realistic amounts",
    "Recent transaction bias",
    "Specific user profiles (Tech, Travel, Family, Fashion)",
    "Mixed credit/debit transactions",
    "Realistic merchant names",
  ],
};
