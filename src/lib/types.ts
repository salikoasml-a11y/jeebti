// Core domain types for the Jeebti platform.
// These types define the shape of data returned by the BankProvider abstraction
// (see src/lib/banking/provider.ts) so that a future real banking API integration
// can slot in without touching UI code.

export type Currency = "GBP" | "USD" | "EUR";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  dateOfBirth: string;
  address: {
    line1: string;
    city: string;
    postcode: string;
    country: string;
  };
  kycStatus: "unverified" | "pending" | "verified" | "rejected";
  role: "customer" | "admin" | "support";
  createdAt: string;
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
}

export interface Account {
  id: string;
  userId: string;
  type: "current" | "savings";
  name: string;
  iban: string;
  sortCode: string;
  accountNumber: string;
  balance: number;
  availableBalance: number;
  currency: Currency;
  createdAt: string;
}

export type TransactionCategory =
  | "groceries"
  | "transport"
  | "entertainment"
  | "dining"
  | "shopping"
  | "bills"
  | "income"
  | "transfer"
  | "subscriptions"
  | "health"
  | "travel"
  | "other";

export type TransactionStatus = "completed" | "pending" | "failed" | "reversed";

export interface Transaction {
  id: string;
  accountId: string;
  type: "debit" | "credit";
  amount: number;
  currency: Currency;
  merchant: string;
  category: TransactionCategory;
  status: TransactionStatus;
  description?: string;
  date: string;
  cardId?: string;
  counterparty?: {
    name: string;
    accountNumber?: string;
  };
}

export type CardType = "virtual" | "physical" | "credit";
export type CardStatus = "active" | "frozen" | "pending" | "blocked" | "expired";
export type CardNetwork = "visa" | "mastercard";

export interface Card {
  id: string;
  userId: string;
  accountId: string;
  type: CardType;
  network: CardNetwork;
  status: CardStatus;
  label: string;
  last4: string;
  fullNumber: string;
  expiry: string;
  cvv: string;
  holderName: string;
  spendingLimit: number;
  createdAt: string;
  color: string;
}

export interface SavingsGoal {
  id: string;
  userId: string;
  name: string;
  emoji: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string;
  color: string;
  createdAt: string;
  roundUpEnabled: boolean;
}

export type NotificationType =
  | "transaction"
  | "security"
  | "savings"
  | "card"
  | "system"
  | "fraud";

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Contact {
  id: string;
  name: string;
  handle: string;
  avatarUrl?: string;
  accountNumber?: string;
  sortCode?: string;
  bankName?: string;
  isJeebtiUser: boolean;
}

export interface Device {
  id: string;
  userId: string;
  name: string;
  type: "mobile" | "desktop" | "tablet";
  os: string;
  browser: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
  trusted: boolean;
}

export interface Session {
  id: string;
  userId: string;
  deviceId: string;
  createdAt: string;
  lastActive: string;
  location: string;
  isCurrent: boolean;
}

export interface FraudAlert {
  id: string;
  userId: string;
  severity: "low" | "medium" | "high";
  title: string;
  description: string;
  transactionId?: string;
  status: "open" | "resolved" | "dismissed";
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  category: "account" | "card" | "payment" | "kyc" | "technical" | "other";
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  createdAt: string;
  updatedAt: string;
  messages: { id: string; author: "user" | "support"; authorName: string; message: string; createdAt: string }[];
}

export interface AuditLogEntry {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: "admin" | "support" | "system";
  action: string;
  targetType: string;
  targetId: string;
  details: string;
  createdAt: string;
  ipAddress: string;
}

export interface KycSubmission {
  id: string;
  userId: string;
  userName: string;
  email: string;
  status: "pending" | "verified" | "rejected";
  documentType: "passport" | "driving_licence" | "national_id";
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
  riskScore: number;
}

export interface AdminAnalytics {
  totalUsers: number;
  activeUsers: number;
  totalBalance: number;
  totalTransactionsToday: number;
  totalVolumeToday: number;
  newSignupsThisWeek: number;
  pendingKyc: number;
  openTickets: number;
  fraudAlertsOpen: number;
}
