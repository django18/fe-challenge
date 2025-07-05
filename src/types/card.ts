export interface Card {
  id: string;
  name: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  balance: number;
  isFrozen: boolean;
  cardType: "debit" | "credit";
  createdAt: Date;
  showCardNumber: boolean;
  recentTransactions: Transaction[];
}

export interface Transaction {
  id: string;
  cardId: string;
  merchantName: string;
  amount: number;
  type: "credit" | "debit";
  category: string;
  date: Date;
  description: string;
  iconType: "card" | "plane" | "megaphone" | "shopping";
}

export interface CardFormData {
  name: string;
}

export interface CardState {
  cards: Card[];
  loading: boolean;
  error: string | null;
}

export interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}
