import { create } from "zustand";
import type { Account, Card, Contact, SavingsGoal, Transaction } from "@/lib/types";
import { bankProvider } from "@/lib/banking/client";
import {
  demoDevices,
  demoFraudAlerts,
  demoNotifications,
  demoSessions,
} from "@/lib/seed";

interface BankingState {
  loaded: boolean;
  loading: boolean;
  accounts: Account[];
  transactions: Transaction[];
  cards: Card[];
  goals: SavingsGoal[];
  contacts: Contact[];
  notifications: typeof demoNotifications;
  devices: typeof demoDevices;
  sessions: typeof demoSessions;
  fraudAlerts: typeof demoFraudAlerts;

  load: (userId: string) => Promise<void>;
  primaryAccount: () => Account | undefined;
  savingsAccount: () => Account | undefined;

  sendMoney: (input: { toAccountNumber: string; toSortCode: string; toName: string; amount: number; reference?: string }) => Promise<Transaction>;
  topUp: (amount: number, source: string) => Promise<Transaction>;
  requestMoney: (input: { amount: number; fromName: string; reference?: string }) => Promise<{ id: string; link: string }>;
  removeDevice: (id: string) => void;
  freezeCard: (cardId: string) => Promise<void>;
  unfreezeCard: (cardId: string) => Promise<void>;
  requestPhysicalCard: () => Promise<void>;
  createVirtualCard: (label: string) => Promise<void>;
  applyForCreditCard: () => Promise<void>;
  setCardLimit: (cardId: string, limit: number) => Promise<void>;

  createGoal: (input: { name: string; emoji: string; targetAmount: number; targetDate?: string; color: string; roundUpEnabled: boolean }) => Promise<void>;
  contributeToGoal: (goalId: string, amount: number) => Promise<void>;
  withdrawFromGoal: (goalId: string, amount: number) => Promise<void>;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  revokeSession: (id: string) => void;
  trustDevice: (id: string) => void;
  resolveFraudAlert: (id: string) => void;
}

export const useBankingStore = create<BankingState>((set, get) => ({
  loaded: false,
  loading: false,
  accounts: [],
  transactions: [],
  cards: [],
  goals: [],
  contacts: [],
  notifications: [],
  devices: [],
  sessions: [],
  fraudAlerts: [],

  load: async (userId: string) => {
    if (get().loaded || get().loading) return;
    set({ loading: true });
    const accounts = await bankProvider.getAccounts(userId);
    const primary = accounts.find((a) => a.type === "current") ?? accounts[0];
    const [transactions, cards, goals, contacts] = await Promise.all([
      primary ? bankProvider.getTransactions(primary.id) : Promise.resolve([]),
      bankProvider.getCards(userId),
      bankProvider.getSavingsGoals(userId),
      bankProvider.getContacts(userId),
    ]);
    set({
      accounts,
      transactions,
      cards,
      goals,
      contacts,
      notifications: demoNotifications,
      devices: demoDevices,
      sessions: demoSessions,
      fraudAlerts: demoFraudAlerts,
      loaded: true,
      loading: false,
    });
  },

  primaryAccount: () => get().accounts.find((a) => a.type === "current"),
  savingsAccount: () => get().accounts.find((a) => a.type === "savings"),

  sendMoney: async (input) => {
    const primary = get().primaryAccount();
    if (!primary) throw new Error("No account found");
    const tx = await bankProvider.createTransfer({ fromAccountId: primary.id, ...input });
    const updatedAccount = await bankProvider.getAccount(primary.id);
    set((s) => ({
      transactions: [tx, ...s.transactions],
      accounts: s.accounts.map((a) => (a.id === primary.id && updatedAccount ? updatedAccount : a)),
    }));
    return tx;
  },

  topUp: async (amount, source) => {
    const primary = get().primaryAccount();
    if (!primary) throw new Error("No account found");
    if (amount <= 0) throw new Error("Amount must be greater than zero");
    const tx: Transaction = {
      id: `txn_topup_${Math.random().toString(36).slice(2, 10)}`,
      accountId: primary.id,
      type: "credit",
      amount,
      currency: primary.currency,
      merchant: source,
      category: "income",
      status: "completed",
      description: `Top up from ${source}`,
      date: new Date().toISOString(),
    };
    set((s) => ({
      transactions: [tx, ...s.transactions],
      accounts: s.accounts.map((a) =>
        a.id === primary.id
          ? { ...a, balance: Math.round((a.balance + amount) * 100) / 100, availableBalance: Math.round((a.availableBalance + amount) * 100) / 100 }
          : a
      ),
    }));
    return tx;
  },

  requestMoney: async (input) => {
    const primary = get().primaryAccount();
    if (!primary) throw new Error("No account found");
    return bankProvider.requestMoney({ accountId: primary.id, fromName: input.fromName, amount: input.amount, reference: input.reference });
  },

  removeDevice: (id) => set((s) => ({ devices: s.devices.filter((d) => d.id !== id) })),

  freezeCard: async (cardId) => {
    const card = await bankProvider.freezeCard(cardId);
    set((s) => ({ cards: s.cards.map((c) => (c.id === cardId ? card : c)) }));
  },
  unfreezeCard: async (cardId) => {
    const card = await bankProvider.unfreezeCard(cardId);
    set((s) => ({ cards: s.cards.map((c) => (c.id === cardId ? card : c)) }));
  },
  requestPhysicalCard: async () => {
    const primary = get().primaryAccount();
    if (!primary) throw new Error("No account found");
    const card = await bankProvider.requestPhysicalCard(primary.userId, primary.id);
    set((s) => ({ cards: [card, ...s.cards] }));
  },
  createVirtualCard: async (label) => {
    const primary = get().primaryAccount();
    if (!primary) throw new Error("No account found");
    const card = await bankProvider.createVirtualCard(primary.userId, primary.id, label);
    set((s) => ({ cards: [card, ...s.cards] }));
  },
  applyForCreditCard: async () => {
    const primary = get().primaryAccount();
    if (!primary) throw new Error("No account found");
    const card = await bankProvider.applyForCreditCard(primary.userId, primary.id);
    set((s) => ({ cards: [card, ...s.cards] }));
  },
  setCardLimit: async (cardId, limit) => {
    const card = await bankProvider.setCardLimit(cardId, limit);
    set((s) => ({ cards: s.cards.map((c) => (c.id === cardId ? card : c)) }));
  },

  createGoal: async (input) => {
    const primary = get().primaryAccount();
    if (!primary) throw new Error("No account found");
    const goal = await bankProvider.createSavingsGoal({ userId: primary.userId, ...input });
    set((s) => ({ goals: [goal, ...s.goals] }));
  },
  contributeToGoal: async (goalId, amount) => {
    const goal = await bankProvider.contributeToGoal(goalId, amount);
    const primary = get().primaryAccount();
    const updatedAccount = primary ? await bankProvider.getAccount(primary.id) : undefined;
    set((s) => ({
      goals: s.goals.map((g) => (g.id === goalId ? goal : g)),
      accounts: s.accounts.map((a) => (a.id === primary?.id && updatedAccount ? updatedAccount : a)),
    }));
  },
  withdrawFromGoal: async (goalId, amount) => {
    const goal = await bankProvider.withdrawFromGoal(goalId, amount);
    const primary = get().primaryAccount();
    const updatedAccount = primary ? await bankProvider.getAccount(primary.id) : undefined;
    set((s) => ({
      goals: s.goals.map((g) => (g.id === goalId ? goal : g)),
      accounts: s.accounts.map((a) => (a.id === primary?.id && updatedAccount ? updatedAccount : a)),
    }));
  },

  markNotificationRead: (id) =>
    set((s) => ({ notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)) })),
  markAllNotificationsRead: () =>
    set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
  revokeSession: (id) => set((s) => ({ sessions: s.sessions.filter((sess) => sess.id !== id) })),
  trustDevice: (id) =>
    set((s) => ({ devices: s.devices.map((d) => (d.id === id ? { ...d, trusted: true } : d)) })),
  resolveFraudAlert: (id) =>
    set((s) => ({ fraudAlerts: s.fraudAlerts.map((f) => (f.id === id ? { ...f, status: "resolved" } : f)) })),
}));
