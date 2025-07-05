import { Card, CardFormData, Transaction } from "@/types/card";
import {
  createNewCard,
  generateMultipleTransactions,
  generateSpecificTransactions,
} from "@/utils/cardUtils";

// Mock API delay to simulate real network requests
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// LocalStorage keys
const CARDS_STORAGE_KEY = "aspire-cards";
const TRANSACTIONS_STORAGE_KEY = "aspire-transactions";

// Mock database operations
class MockDatabase {
  private getCardsFromStorage(): Card[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(CARDS_STORAGE_KEY);
    if (!stored) return [];

    const cards = JSON.parse(stored);
    // Convert date strings back to Date objects
    return cards.map(
      (card: Omit<Card, "createdAt"> & { createdAt: string }) => ({
        ...card,
        createdAt: new Date(card.createdAt),
        recentTransactions: card.recentTransactions || [], // Ensure recentTransactions exists
      })
    );
  }

  private saveCardsToStorage(cards: Card[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(cards));
  }

  private getTransactionsFromStorage(): Transaction[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
    if (!stored) return [];

    const transactions = JSON.parse(stored);
    // Convert date strings back to Date objects
    return transactions.map(
      (txn: Omit<Transaction, "date"> & { date: string }) => ({
        ...txn,
        date: new Date(txn.date),
      })
    );
  }

  private saveTransactionsToStorage(transactions: Transaction[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(
      TRANSACTIONS_STORAGE_KEY,
      JSON.stringify(transactions)
    );
  }

  // Initialize with default cards and transactions
  initializeDefaultCards(): Card[] {
    const existingCards = this.getCardsFromStorage();
    if (existingCards.length > 0) {
      return this.getAllCardsWithRecentTransactions();
    }

    // Create default cards
    const defaultCards: Card[] = [
      createNewCard("Mark Henry"),
      createNewCard("Sarah Johnson"),
      createNewCard("Michael Brown"),
      createNewCard("Emily Davis"),
    ];

    this.saveCardsToStorage(defaultCards);

    // Generate comprehensive transaction history for each card
    const allTransactions: Transaction[] = [];
    defaultCards.forEach((card, index) => {
      // Generate different amounts of transactions for variety
      const transactionCounts = [25, 30, 20, 35]; // Different transaction volumes per card
      const randomTransactions = generateMultipleTransactions(
        card.id,
        transactionCounts[index]
      );

      // Add specific realistic transactions for each cardholder
      const specificTransactions = generateSpecificTransactions(
        card.id,
        card.name
      );

      allTransactions.push(...randomTransactions, ...specificTransactions);
    });
    this.saveTransactionsToStorage(allTransactions);

    return this.getAllCardsWithRecentTransactions();
  }

  getAllCards(): Card[] {
    const cards = this.getCardsFromStorage();
    // Sort cards by creation date (newest first)
    return cards.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  getAllTransactions(): Transaction[] {
    return this.getTransactionsFromStorage();
  }

  getTransactionsByCardId(cardId: string): Transaction[] {
    const transactions = this.getTransactionsFromStorage();
    return transactions.filter((txn) => txn.cardId === cardId);
  }

  getAllCardsWithRecentTransactions(): Card[] {
    const cards = this.getCardsFromStorage();
    const transactions = this.getTransactionsFromStorage();

    const cardsWithTransactions = cards.map((card) => {
      const cardTransactions = transactions
        .filter((txn) => txn.cardId === card.id)
        .sort((a, b) => b.date.getTime() - a.date.getTime()) // Sort by date descending
        .slice(0, 5); // Take only the last 5 transactions

      return {
        ...card,
        recentTransactions: cardTransactions,
      };
    });

    // Sort cards by creation date (newest first)
    return cardsWithTransactions.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  addCard(cardData: CardFormData): Card {
    const cards = this.getCardsFromStorage();
    const newCard = createNewCard(cardData.name);
    const updatedCards = [...cards, newCard];
    this.saveCardsToStorage(updatedCards);

    // Generate comprehensive transaction history for the new card
    const transactions = this.getTransactionsFromStorage();
    const newTransactions = generateMultipleTransactions(newCard.id, 20); // More transactions for new cards
    this.saveTransactionsToStorage([...transactions, ...newTransactions]);

    // Return card with recent transactions
    const recentTransactions = newTransactions
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);

    return {
      ...newCard,
      recentTransactions,
    };
  }

  updateCard(cardId: string, updates: Partial<Card>): Card | null {
    const cards = this.getCardsFromStorage();
    const cardIndex = cards.findIndex((card) => card.id === cardId);

    if (cardIndex === -1) {
      return null;
    }

    const updatedCard = { ...cards[cardIndex], ...updates };
    cards[cardIndex] = updatedCard;
    this.saveCardsToStorage(cards);

    // Return card with recent transactions
    const transactions = this.getTransactionsFromStorage();
    const recentTransactions = transactions
      .filter((txn) => txn.cardId === cardId)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);

    return {
      ...updatedCard,
      recentTransactions,
    };
  }

  deleteCard(cardId: string): boolean {
    const cards = this.getCardsFromStorage();
    const filteredCards = cards.filter((card) => card.id !== cardId);

    if (filteredCards.length === cards.length) {
      return false; // Card not found
    }

    // Also delete associated transactions
    const transactions = this.getTransactionsFromStorage();
    const filteredTransactions = transactions.filter(
      (txn) => txn.cardId !== cardId
    );
    this.saveTransactionsToStorage(filteredTransactions);

    this.saveCardsToStorage(filteredCards);
    return true;
  }
}

const mockDB = new MockDatabase();

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  status: number;
}

// Mock API endpoints
export class CardsAPI {
  // GET /api/cards - Fetch all cards
  static async getCards(): Promise<ApiResponse<Card[]>> {
    await delay(500); // Simulate network delay

    try {
      let cards = mockDB.getAllCardsWithRecentTransactions();

      // If no cards exist, initialize with default cards
      if (cards.length === 0) {
        cards = mockDB.initializeDefaultCards();
      }

      return {
        data: cards,
        success: true,
        message: "Cards fetched successfully",
      };
    } catch {
      throw {
        success: false,
        message: "Failed to fetch cards",
        status: 500,
      } as ApiError;
    }
  }

  // POST /api/cards - Add new card
  static async addCard(cardData: CardFormData): Promise<ApiResponse<Card>> {
    await delay(800); // Simulate network delay

    try {
      // Validate input
      if (!cardData.name || cardData.name.trim().length === 0) {
        throw {
          success: false,
          message: "Card name is required",
          status: 400,
        } as ApiError;
      }

      const newCard = mockDB.addCard(cardData);
      return {
        data: newCard,
        success: true,
        message: "Card added successfully",
      };
    } catch (error) {
      if ((error as ApiError).success === false) {
        throw error;
      }
      throw {
        success: false,
        message: "Failed to add card",
        status: 500,
      } as ApiError;
    }
  }

  // PATCH /api/cards/:id/freeze - Toggle card freeze status
  static async toggleCardFreeze(cardId: string): Promise<ApiResponse<Card>> {
    await delay(600); // Simulate network delay

    try {
      const cards = mockDB.getAllCards();
      const card = cards.find((c) => c.id === cardId);

      if (!card) {
        throw {
          success: false,
          message: "Card not found",
          status: 404,
        } as ApiError;
      }

      const updatedCard = mockDB.updateCard(cardId, {
        isFrozen: !card.isFrozen,
      });

      if (!updatedCard) {
        throw {
          success: false,
          message: "Failed to update card",
          status: 500,
        } as ApiError;
      }

      return {
        data: updatedCard,
        success: true,
        message: `Card ${
          updatedCard.isFrozen ? "frozen" : "unfrozen"
        } successfully`,
      };
    } catch (error) {
      if ((error as ApiError).success === false) {
        throw error;
      }
      throw {
        success: false,
        message: "Failed to toggle card freeze status",
        status: 500,
      } as ApiError;
    }
  }

  // PATCH /api/cards/:id/show-number - Toggle card number visibility
  static async toggleCardNumberVisibility(
    cardId: string
  ): Promise<ApiResponse<Card>> {
    await delay(300); // Simulate network delay

    try {
      const cards = mockDB.getAllCards();
      const card = cards.find((c) => c.id === cardId);

      if (!card) {
        throw {
          success: false,
          message: "Card not found",
          status: 404,
        } as ApiError;
      }

      const updatedCard = mockDB.updateCard(cardId, {
        showCardNumber: !card.showCardNumber,
      });

      if (!updatedCard) {
        throw {
          success: false,
          message: "Failed to update card visibility",
          status: 500,
        } as ApiError;
      }

      return {
        data: updatedCard,
        success: true,
        message: `Card number ${
          updatedCard.showCardNumber ? "shown" : "hidden"
        }`,
      };
    } catch (error) {
      if ((error as ApiError).success === false) {
        throw error;
      }
      throw {
        success: false,
        message: "Failed to toggle card number visibility",
        status: 500,
      } as ApiError;
    }
  }

  // PATCH /api/cards/:id - Update card details
  static async updateCard(
    cardId: string,
    updates: Partial<Card>
  ): Promise<ApiResponse<Card>> {
    await delay(600); // Simulate network delay

    try {
      const updatedCard = mockDB.updateCard(cardId, updates);

      if (!updatedCard) {
        throw {
          success: false,
          message: "Card not found",
          status: 404,
        } as ApiError;
      }

      return {
        data: updatedCard,
        success: true,
        message: "Card updated successfully",
      };
    } catch (error) {
      if ((error as ApiError).success === false) {
        throw error;
      }
      throw {
        success: false,
        message: "Failed to update card",
        status: 500,
      } as ApiError;
    }
  }

  // DELETE /api/cards/:id - Delete card
  static async deleteCard(cardId: string): Promise<ApiResponse<null>> {
    await delay(600); // Simulate network delay

    try {
      const success = mockDB.deleteCard(cardId);

      if (!success) {
        throw {
          success: false,
          message: "Card not found",
          status: 404,
        } as ApiError;
      }

      return {
        data: null,
        success: true,
        message: "Card deleted successfully",
      };
    } catch (error) {
      if ((error as ApiError).success === false) {
        throw error;
      }
      throw {
        success: false,
        message: "Failed to delete card",
        status: 500,
      } as ApiError;
    }
  }

  // Initialize default cards on app startup
  static initializeDefaultCards(): Card[] {
    return mockDB.initializeDefaultCards();
  }

  // Utility method to clear all data (for testing/reset purposes)
  static clearAllData(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem("aspire-cards");
    localStorage.removeItem("aspire-transactions");
  }
}

// Transactions API
export class TransactionsAPI {
  // GET /api/transactions - Fetch all transactions
  static async getTransactions(): Promise<ApiResponse<Transaction[]>> {
    await delay(400); // Simulate network delay

    try {
      const transactions = mockDB.getAllTransactions();
      return {
        data: transactions,
        success: true,
        message: "Transactions fetched successfully",
      };
    } catch {
      throw {
        success: false,
        message: "Failed to fetch transactions",
        status: 500,
      } as ApiError;
    }
  }

  // GET /api/transactions/card/:cardId - Fetch ALL transactions for a specific card
  static async getTransactionsByCard(
    cardId: string
  ): Promise<ApiResponse<Transaction[]>> {
    await delay(300); // Simulate network delay

    try {
      const transactions = mockDB.getTransactionsByCardId(cardId);
      return {
        data: transactions,
        success: true,
        message: "Card transactions fetched successfully",
      };
    } catch {
      throw {
        success: false,
        message: "Failed to fetch card transactions",
        status: 500,
      } as ApiError;
    }
  }
}

export default CardsAPI;
