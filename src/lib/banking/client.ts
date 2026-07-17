import { MockBankProvider } from "./mock-provider";
import type { BankProvider } from "./provider";

// Single source of truth for which BankProvider implementation the app uses.
// When a real banking partner integration is ready, swap this export for a
// provider that implements the same `BankProvider` interface — nothing else
// in the app needs to change.
export const bankProvider: BankProvider = new MockBankProvider();
