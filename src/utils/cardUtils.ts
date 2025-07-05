import { Card, Transaction } from "@/types/card";

export const generateCardNumber = (): string => {
  // Generate a random 16-digit card number starting with 4 (Visa)
  const prefix = "4";
  let cardNumber = prefix;

  for (let i = 1; i < 16; i++) {
    cardNumber += Math.floor(Math.random() * 10);
  }

  // Format as XXXX XXXX XXXX XXXX
  return cardNumber.replace(/(.{4})/g, "$1 ").trim();
};

export const generateExpirationDate = (): string => {
  const currentDate = new Date();
  const futureYear =
    currentDate.getFullYear() + Math.floor(Math.random() * 5) + 2; // 2-7 years from now
  const month = Math.floor(Math.random() * 12) + 1;

  return `${month.toString().padStart(2, "0")}/${futureYear
    .toString()
    .slice(-2)}`;
};

export const generateCVV = (): string => {
  return Math.floor(Math.random() * 900 + 100).toString();
};

export const formatCardNumber = (cardNumber: string): string => {
  return cardNumber
    .replace(/\s/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
};

export const maskCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, "");
  const lastFour = cleaned.slice(-4);
  return `**** **** **** ${lastFour}`;
};

// Counter for unique card IDs
let cardCounter = 0;

// Generate unique card ID
const generateUniqueCardId = (): string => {
  cardCounter += 1;
  return `card_${Date.now()}_${cardCounter}`;
};

export const createNewCard = (name: string): Card => {
  return {
    id: generateUniqueCardId(),
    name,
    cardNumber: generateCardNumber(),
    expirationDate: generateExpirationDate(),
    cvv: generateCVV(),
    balance: Math.floor(Math.random() * 50000) + 10000, // Random balance between 10k-60k
    isFrozen: false,
    cardType: "debit",
    createdAt: new Date(),
    showCardNumber: false, // Default to hidden
    recentTransactions: [], // Will be populated by API
  };
};

// Helper function to create a card with recent transactions
export const createCardWithRecentTransactions = (
  name: string,
  transactions: Transaction[] = []
): Card => {
  const card = createNewCard(name);
  card.recentTransactions = transactions.slice(0, 5); // Keep only last 5 transactions
  return card;
};

// Transaction generation utilities
const merchantNames = [
  // Retail & Shopping
  "Hamleys",
  "Amazon",
  "Target",
  "Walmart",
  "Best Buy",
  "Costco",
  "Home Depot",
  "IKEA",
  "Zara",
  "H&M",
  "Nike",
  "Adidas",
  "Apple Store",
  "GameStop",
  "CVS Pharmacy",
  "Walgreens",

  // Food & Dining
  "McDonald's",
  "Starbucks",
  "Subway",
  "Pizza Hut",
  "Domino's",
  "KFC",
  "Burger King",
  "Taco Bell",
  "Chipotle",
  "Olive Garden",
  "Panera Bread",
  "Dunkin'",
  "Tim Hortons",
  "Whole Foods",
  "Trader Joe's",

  // Transportation
  "Uber",
  "Lyft",
  "Shell",
  "BP Gas Station",
  "Chevron",
  "Exxon",
  "Metro Transit",
  "Parking Meter",
  "Airport Parking",
  "Taxi Service",

  // Entertainment & Services
  "Netflix",
  "Spotify",
  "Disney+",
  "HBO Max",
  "AMC Theaters",
  "Regal Cinemas",
  "Steam",
  "PlayStation Store",
  "Xbox Live",
  "YouTube Premium",

  // Utilities & Bills
  "Electric Company",
  "Water Authority",
  "Internet Provider",
  "Mobile Service",
  "Insurance Premium",
  "Gym Membership",
  "Library Fine",

  // Travel & Hospitality
  "Hilton Hotels",
  "Marriott",
  "Airbnb",
  "Booking.com",
  "Southwest Airlines",
  "Delta Airlines",
  "Car Rental",
  "Hotel Booking",

  // Healthcare & Personal
  "Pharmacy",
  "Doctor Visit",
  "Dentist",
  "Veterinarian",
  "Hair Salon",
  "Spa Treatment",
  "Dry Cleaning",
];

const categories = [
  "Shopping",
  "Food & Dining",
  "Transportation",
  "Entertainment",
  "Gas & Fuel",
  "Groceries",
  "Home & Garden",
  "Technology",
  "Healthcare",
  "Travel",
  "Utilities",
  "Subscriptions",
  "Personal Care",
  "Education",
  "Insurance",
  "Automotive",
  "Pet Care",
];

const iconTypes: Transaction["iconType"][] = [
  "card",
  "plane",
  "megaphone",
  "shopping",
];

// Counter to ensure unique IDs
let transactionCounter = 0;

// Generate unique transaction ID
const generateUniqueTransactionId = (): string => {
  transactionCounter += 1;
  return `txn_${Date.now()}_${transactionCounter}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
};

// Enhanced transaction generation with more realistic patterns
export const generateTransaction = (cardId: string): Transaction => {
  const isCredit = Math.random() < 0.25; // 25% chance of credit (refunds, cashbacks, etc.)
  const merchantName =
    merchantNames[Math.floor(Math.random() * merchantNames.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const iconType = iconTypes[Math.floor(Math.random() * iconTypes.length)];

  // Generate more realistic amounts based on category
  let amount: number;
  if (category === "Groceries" || category === "Food & Dining") {
    amount = Math.floor(Math.random() * 80) + 15; // $15-$95
  } else if (category === "Gas & Fuel") {
    amount = Math.floor(Math.random() * 60) + 25; // $25-$85
  } else if (category === "Shopping" || category === "Technology") {
    amount = Math.floor(Math.random() * 300) + 50; // $50-$350
  } else if (category === "Travel") {
    amount = Math.floor(Math.random() * 800) + 200; // $200-$1000
  } else if (category === "Utilities" || category === "Subscriptions") {
    amount = Math.floor(Math.random() * 150) + 25; // $25-$175
  } else if (category === "Healthcare") {
    amount = Math.floor(Math.random() * 250) + 50; // $50-$300
  } else {
    amount = Math.floor(Math.random() * 200) + 20; // $20-$220
  }

  // Generate dates with more realistic patterns (more recent transactions)
  const date = new Date();
  const daysAgo = Math.floor(Math.random() * 60); // Within last 60 days
  const weightedDaysAgo = Math.floor(Math.pow(Math.random(), 2) * daysAgo); // Bias towards recent dates
  date.setDate(date.getDate() - weightedDaysAgo);

  // Add some time variation
  date.setHours(Math.floor(Math.random() * 24));
  date.setMinutes(Math.floor(Math.random() * 60));

  return {
    id: generateUniqueTransactionId(),
    cardId,
    merchantName,
    amount: isCredit ? amount : -amount,
    type: isCredit ? "credit" : "debit",
    category,
    date,
    description: isCredit
      ? `Refund from ${merchantName}`
      : `Purchase at ${merchantName}`,
    iconType,
  };
};

// Generate more diverse transaction patterns
export const generateMultipleTransactions = (
  cardId: string,
  count: number = 10
): Transaction[] => {
  const transactions = Array.from({ length: count }, () =>
    generateTransaction(cardId)
  );

  // Sort by date (newest first)
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

// Generate specific realistic transactions for different user types
export const generateSpecificTransactions = (
  cardId: string,
  cardHolderName: string
): Transaction[] => {
  const transactions: Transaction[] = [];

  // Create specific transaction patterns based on cardholder name
  if (cardHolderName === "Mark Henry") {
    // Tech enthusiast profile
    transactions.push(
      {
        id: generateUniqueTransactionId(),
        cardId,
        merchantName: "Apple Store",
        amount: -1299,
        type: "debit",
        category: "Technology",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        description: "Purchase at Apple Store",
        iconType: "shopping",
      },
      {
        id: generateUniqueTransactionId(),
        cardId,
        merchantName: "Steam",
        amount: -59.99,
        type: "debit",
        category: "Entertainment",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        description: "Purchase at Steam",
        iconType: "card",
      },
      {
        id: generateUniqueTransactionId(),
        cardId,
        merchantName: "Netflix",
        amount: -15.99,
        type: "debit",
        category: "Subscriptions",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        description: "Purchase at Netflix",
        iconType: "card",
      }
    );
  } else if (cardHolderName === "Sarah Johnson") {
    // Travel enthusiast profile
    transactions.push(
      {
        id: generateUniqueTransactionId(),
        cardId,
        merchantName: "Southwest Airlines",
        amount: -450,
        type: "debit",
        category: "Travel",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        description: "Purchase at Southwest Airlines",
        iconType: "plane",
      },
      {
        id: generateUniqueTransactionId(),
        cardId,
        merchantName: "Hilton Hotels",
        amount: -189,
        type: "debit",
        category: "Travel",
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        description: "Purchase at Hilton Hotels",
        iconType: "plane",
      },
      {
        id: generateUniqueTransactionId(),
        cardId,
        merchantName: "Airbnb",
        amount: 25,
        type: "credit",
        category: "Travel",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        description: "Refund from Airbnb",
        iconType: "plane",
      }
    );
  } else if (cardHolderName === "Michael Brown") {
    // Family person profile
    transactions.push(
      {
        id: generateUniqueTransactionId(),
        cardId,
        merchantName: "Costco",
        amount: -156.78,
        type: "debit",
        category: "Groceries",
        date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        description: "Purchase at Costco",
        iconType: "shopping",
      },
      {
        id: generateUniqueTransactionId(),
        cardId,
        merchantName: "Target",
        amount: -89.45,
        type: "debit",
        category: "Shopping",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        description: "Purchase at Target",
        iconType: "shopping",
      },
      {
        id: generateUniqueTransactionId(),
        cardId,
        merchantName: "Shell",
        amount: -45.2,
        type: "debit",
        category: "Gas & Fuel",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        description: "Purchase at Shell",
        iconType: "card",
      }
    );
  } else if (cardHolderName === "Emily Davis") {
    // Fashion & lifestyle profile
    transactions.push(
      {
        id: generateUniqueTransactionId(),
        cardId,
        merchantName: "Zara",
        amount: -125.5,
        type: "debit",
        category: "Shopping",
        date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
        description: "Purchase at Zara",
        iconType: "shopping",
      },
      {
        id: generateUniqueTransactionId(),
        cardId,
        merchantName: "Starbucks",
        amount: -6.75,
        type: "debit",
        category: "Food & Dining",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        description: "Purchase at Starbucks",
        iconType: "card",
      },
      {
        id: generateUniqueTransactionId(),
        cardId,
        merchantName: "Hair Salon",
        amount: -85.0,
        type: "debit",
        category: "Personal Care",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        description: "Purchase at Hair Salon",
        iconType: "card",
      }
    );
  }

  return transactions;
};
