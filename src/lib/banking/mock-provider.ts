import type { BankProvider } from "./provider";
import type { Account, Card, SavingsGoal, Transaction, TransactionCategory } from "@/lib/types";
import {
  demoAccount,
  demoSavingsAccount,
  demoCards,
  demoContacts,
  demoSavingsGoals,
  demoTransactions,
} from "@/lib/seed";

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));
const genId = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 10)}`;

const accounts: Account[] = [demoAccount, demoSavingsAccount];
let transactions: Transaction[] = [...demoTransactions];
let cards: Card[] = [...demoCards];
let goals: SavingsGoal[] = [...demoSavingsGoals];

/**
 * In-memory + demo-seeded implementation of BankProvider. Simulates network
 * latency so the UI feels real. Swap this out for a live implementation
 * (e.g. wrapping a licensed banking partner's API) behind the same
 * interface — no UI code changes required.
 */
export class MockBankProvider implements BankProvider {
  async getAccounts(_userId: string) {
    await delay();
    // Real auth identifies the person; this illustrative banking ledger
    // (balances/transactions/cards/goals) is intentionally shared demo
    // data per the project's mock-provider design — see provider.ts.
    return accounts;
  }

  async getAccount(accountId: string) {
    await delay(150);
    return accounts.find((a) => a.id === accountId);
  }

  async getTransactions(accountId: string) {
    await delay();
    return transactions.filter((t) => t.accountId === accountId).sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }

  async createTransfer(input: {
    fromAccountId: string;
    toAccountNumber: string;
    toSortCode: string;
    toName: string;
    amount: number;
    reference?: string;
  }) {
    await delay(700);
    const account = accounts.find((a) => a.id === input.fromAccountId);
    if (!account) throw new Error("Account not found");
    if (input.amount <= 0) throw new Error("Amount must be greater than zero");
    if (account.availableBalance < input.amount) throw new Error("Insufficient funds");

    account.balance = Math.round((account.balance - input.amount) * 100) / 100;
    account.availableBalance = account.balance;

    const tx: Transaction = {
      id: genId("txn"),
      accountId: input.fromAccountId,
      type: "debit",
      amount: input.amount,
      currency: account.currency,
      merchant: input.toName,
      category: "transfer",
      status: "completed",
      description: input.reference,
      date: new Date().toISOString(),
      counterparty: { name: input.toName, accountNumber: input.toAccountNumber },
    };
    transactions = [tx, ...transactions];
    return tx;
  }

  async requestMoney(_input: { accountId: string; fromName: string; amount: number; reference?: string }) {
    await delay(400);
    const id = genId("req");
    return { id, link: `https://jeebti.app/pay/${id}` };
  }

  async getCards(_userId: string) {
    await delay();
    return cards;
  }

  async freezeCard(cardId: string) {
    await delay(300);
    const card = cards.find((c) => c.id === cardId);
    if (!card) throw new Error("Card not found");
    card.status = "frozen";
    return card;
  }

  async unfreezeCard(cardId: string) {
    await delay(300);
    const card = cards.find((c) => c.id === cardId);
    if (!card) throw new Error("Card not found");
    card.status = "active";
    return card;
  }

  async requestPhysicalCard(userId: string, accountId: string) {
    await delay(600);
    const card: Card = {
      id: genId("card"),
      userId,
      accountId,
      type: "physical",
      network: "visa",
      status: "pending",
      label: "Jeebti Debit Card",
      last4: String(Math.floor(1000 + Math.random() * 9000)),
      fullNumber: `4929 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
      expiry: "12/29",
      cvv: String(Math.floor(100 + Math.random() * 900)),
      holderName: "AMELIA CLARKE",
      spendingLimit: 5000,
      createdAt: new Date().toISOString(),
      color: "from-blue-600 via-blue-700 to-slate-900",
    };
    cards = [card, ...cards];
    return card;
  }

  async createVirtualCard(userId: string, accountId: string, label: string) {
    await delay(500);
    const card: Card = {
      id: genId("card"),
      userId,
      accountId,
      type: "virtual",
      network: "mastercard",
      status: "active",
      label: label || "Virtual Card",
      last4: String(Math.floor(1000 + Math.random() * 9000)),
      fullNumber: `5412 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
      expiry: "12/29",
      cvv: String(Math.floor(100 + Math.random() * 900)),
      holderName: "AMELIA CLARKE",
      spendingLimit: 1000,
      createdAt: new Date().toISOString(),
      color: "from-violet-600 via-purple-700 to-slate-900",
    };
    cards = [card, ...cards];
    return card;
  }

  async applyForCreditCard(userId: string, accountId: string) {
    await delay(900);
    const card: Card = {
      id: genId("card"),
      userId,
      accountId,
      type: "credit",
      network: "visa",
      status: "pending",
      label: "Jeebti Credit Card",
      last4: String(Math.floor(1000 + Math.random() * 9000)),
      fullNumber: `4556 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
      expiry: "12/29",
      cvv: String(Math.floor(100 + Math.random() * 900)),
      holderName: "AMELIA CLARKE",
      spendingLimit: 3000,
      createdAt: new Date().toISOString(),
      color: "from-amber-500 via-amber-600 to-slate-900",
    };
    cards = [card, ...cards];
    return card;
  }

  async setCardLimit(cardId: string, limit: number) {
    await delay(300);
    const card = cards.find((c) => c.id === cardId);
    if (!card) throw new Error("Card not found");
    card.spendingLimit = limit;
    return card;
  }

  async getSavingsGoals(_userId: string) {
    await delay();
    return goals;
  }

  async createSavingsGoal(input: Omit<SavingsGoal, "id" | "createdAt" | "currentAmount">) {
    await delay(500);
    const goal: SavingsGoal = {
      ...input,
      id: genId("goal"),
      currentAmount: 0,
      createdAt: new Date().toISOString(),
    };
    goals = [goal, ...goals];
    return goal;
  }

  async contributeToGoal(goalId: string, amount: number) {
    await delay(400);
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) throw new Error("Goal not found");
    const account = accounts.find((a) => a.id === demoAccount.id);
    if (account) {
      if (account.availableBalance < amount) throw new Error("Insufficient funds");
      account.balance = Math.round((account.balance - amount) * 100) / 100;
      account.availableBalance = account.balance;
    }
    goal.currentAmount = Math.round((goal.currentAmount + amount) * 100) / 100;
    return goal;
  }

  async withdrawFromGoal(goalId: string, amount: number) {
    await delay(400);
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) throw new Error("Goal not found");
    if (goal.currentAmount < amount) throw new Error("Insufficient goal balance");
    goal.currentAmount = Math.round((goal.currentAmount - amount) * 100) / 100;
    const account = accounts.find((a) => a.id === demoAccount.id);
    if (account) {
      account.balance = Math.round((account.balance + amount) * 100) / 100;
      account.availableBalance = account.balance;
    }
    return goal;
  }

  async getContacts(_userId: string) {
    await delay(250);
    return demoContacts;
  }

  async getSpendingByCategory(accountId: string, range: "week" | "month" | "year") {
    await delay(300);
    const days = range === "week" ? 7 : range === "month" ? 30 : 365;
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    const relevant = transactions.filter(
      (t) => t.accountId === accountId && t.type === "debit" && +new Date(t.date) >= cutoff
    );
    const totals = new Map<TransactionCategory, number>();
    for (const t of relevant) {
      totals.set(t.category, Math.round(((totals.get(t.category) ?? 0) + t.amount) * 100) / 100);
    }
    return Array.from(totals.entries()).map(([category, amount]) => ({ category, amount }));
  }
}
