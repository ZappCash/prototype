export interface User {
  id: string;
  name: string;
  username: string;
  address: string;
  avatar?: string;
  balance: number;
  currency: "USDC" | "USD";
}

export type TransactionType = "send" | "receive" | "request" | "payment";
export type TransactionStatus = "pending" | "completed" | "failed";
export type TransactionMethod = "wallet" | "card";
export type PurchaseType = "online" | "in-person";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: Date;
  status: TransactionStatus;
  contact?: string;
  description?: string;
  method?: TransactionMethod; // wallet or card
  txHash?: string; // Transaction hash for blockchain
  localAmount?: number; // Amount in local currency
  localCurrency?: string; // e.g., "CRC"
  exchangeRate?: number; // Exchange rate used
  purchaseType?: PurchaseType; // online or in-person
  city?: string;
  country?: string;
  cardLast4?: string; // Last 4 digits of card
  cardBrand?: string; // e.g., "Visa", "Mastercard"
}

export type EnvelopeType = "individual" | "shared";

export type EnvelopeCategory = 
  | "Travel" 
  | "Bills" 
  | "Food" 
  | "Entertainment" 
  | "Savings" 
  | "Emergency" 
  | "Shopping" 
  | "Other";

export interface Envelope {
  id: string;
  name: string;
  description?: string;
  balance: number;
  type: EnvelopeType;
  category: EnvelopeCategory;
  goal?: number; // Meta de ahorro opcional
  color?: string;
  icon?: string;
  shareUrl?: string; // Solo para compartidos
  qrCode?: string; // Solo para compartidos
  participants?: string[]; // Solo para compartidos - IDs de usuarios
  createdBy?: string; // ID del creador
  createdAt: Date;
}

export type RecipientType = "username" | "address";

export interface RecurringPayment {
  id: string;
  name: string; // e.g., "Barbería", "Netflix", "Gym"
  recipientType: RecipientType;
  recipient: string; // username o address
  amount: number;
  description?: string;
  category?: string; // e.g., "Personal Care", "Subscription", "Services"
  lastPaid?: Date;
  createdAt: Date;
}

export type NotificationType = "payment" | "request" | "envelope" | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  amount?: number;
  contact?: string;
}

export interface Contact {
  id: string;
  name: string;
  username: string;
  address: string;
  avatar?: string;
  lastTransaction?: Date;
}
