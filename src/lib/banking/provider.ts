import type {
  Account,
  Card,
  Contact,
  SavingsGoal,
  Transaction,
  TransactionCategory,
  User,
} from "@/lib/types";

/**
 * BankProvider is the abstraction boundary between the Jeebti UI and whichever
 * banking backend is powering it. Jeebti partners with regulated banking
 * infrastructure providers rather than building its own ledger — this
 * interface is what a real integration (e.g. a banking-as-a-service partner)
 * implements. Until that integration is connected, `MockBankProvider`
 * (see mock-provider.ts) serves realistic in-memory/local-storage data so
 * every screen is fully functional in demos.
 *
 * No implementation here is D360-specific — swap `client.ts`'s export to
 * point at a real provider without changing any page or component.
 */
export interface BankProvider {
  getAccounts(userId: string): Promise<Account[]>;
  getAccount(accountId: string): Promise<Account | undefined>;

  getTransactions(accountId: string): Promise<Transaction[]>;
  createTransfer(input: {
    fromAccountId: string;
    toAccountNumber: string;
    toSortCode: string;
    toName: string;
    amount: number;
    reference?: string;
  }): Promise<Transaction>;
  requestMoney(input: {
    accountId: string;
    fromName: string;
    amount: number;
    reference?: string;
  }): Promise<{ id: string; link: string }>;

  getCards(userId: string): Promise<Card[]>;
  freezeCard(cardId: string): Promise<Card>;
  unfreezeCard(cardId: string): Promise<Card>;
  requestPhysicalCard(userId: string, accountId: string): Promise<Card>;
  createVirtualCard(userId: string, accountId: string, label: string): Promise<Card>;
  applyForCreditCard(userId: string, accountId: string): Promise<Card>;
  setCardLimit(cardId: string, limit: number): Promise<Card>;

  getSavingsGoals(userId: string): Promise<SavingsGoal[]>;
  createSavingsGoal(input: Omit<SavingsGoal, "id" | "createdAt" | "currentAmount">): Promise<SavingsGoal>;
  contributeToGoal(goalId: string, amount: number): Promise<SavingsGoal>;
  withdrawFromGoal(goalId: string, amount: number): Promise<SavingsGoal>;

  getContacts(userId: string): Promise<Contact[]>;

  getSpendingByCategory(
    accountId: string,
    range: "week" | "month" | "year"
  ): Promise<{ category: TransactionCategory; amount: number }[]>;
}

export interface AuthProvider {
  signUp(input: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<User>;
  signIn(email: string, password: string): Promise<User>;
  signOut(): Promise<void>;
  getSession(): Promise<User | null>;
}
