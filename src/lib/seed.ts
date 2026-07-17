import type {
  Account,
  AdminAnalytics,
  AuditLogEntry,
  Card,
  Contact,
  Device,
  FraudAlert,
  KycSubmission,
  AppNotification,
  SavingsGoal,
  Session,
  SupportTicket,
  Transaction,
  TransactionCategory,
  User,
} from "@/lib/types";

const DAY = 24 * 60 * 60 * 1000;
const now = () => Date.now();
const iso = (t: number) => new Date(t).toISOString();
const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const DEMO_USER_ID = "usr_demo_001";

export const demoUser: User = {
  id: DEMO_USER_ID,
  firstName: "Amelia",
  lastName: "Clarke",
  email: "amelia.clarke@example.com",
  phone: "+44 7700 900123",
  avatarUrl: undefined,
  dateOfBirth: "1994-03-12",
  address: { line1: "14 Camden High Street", city: "London", postcode: "NW1 7JE", country: "United Kingdom" },
  kycStatus: "verified",
  role: "customer",
  createdAt: iso(now() - 220 * DAY),
  twoFactorEnabled: true,
  biometricEnabled: true,
};

export const demoAccount: Account = {
  id: "acc_demo_current",
  userId: DEMO_USER_ID,
  type: "current",
  name: "Jeebti Current Account",
  iban: "GB29 JEEB 6016 1331 9268 19",
  sortCode: "60-16-13",
  accountNumber: "31926819",
  balance: 4832.47,
  availableBalance: 4832.47,
  currency: "GBP",
  createdAt: iso(now() - 220 * DAY),
};

export const demoSavingsAccount: Account = {
  id: "acc_demo_savings",
  userId: DEMO_USER_ID,
  type: "savings",
  name: "Jeebti Savings Pot",
  iban: "GB77 JEEB 6016 1331 9268 27",
  sortCode: "60-16-13",
  accountNumber: "31926827",
  balance: 6250,
  availableBalance: 6250,
  currency: "GBP",
  createdAt: iso(now() - 220 * DAY),
};

const merchants: Record<TransactionCategory, string[]> = {
  groceries: ["Waitrose", "Tesco Express", "Sainsbury's", "Whole Foods Market", "Lidl"],
  transport: ["TfL Travel", "Uber", "Trainline", "Bolt", "Shell Petrol"],
  entertainment: ["Netflix", "Spotify", "Cineworld", "Steam", "Disney+"],
  dining: ["Pret A Manger", "Nando's", "Dishoom", "Costa Coffee", "Deliveroo"],
  shopping: ["ASOS", "Amazon", "John Lewis", "Zara", "Apple Store"],
  bills: ["British Gas", "Thames Water", "EE Mobile", "Virgin Media", "Council Tax"],
  income: ["Acme Corp Payroll", "Freelance Client", "HMRC Refund"],
  transfer: ["To J. Smith", "From M. Patel", "Pot Transfer"],
  subscriptions: ["Notion", "iCloud+", "Gym Membership", "Amazon Prime"],
  health: ["Boots Pharmacy", "NHS Dental", "Nuffield Health"],
  travel: ["British Airways", "Airbnb", "Booking.com", "Ryanair"],
  other: ["Cash Withdrawal", "Charity Donation", "Miscellaneous"],
};

function genTransactions(accountId: string, count: number): Transaction[] {
  const cats = Object.keys(merchants) as TransactionCategory[];
  const txs: Transaction[] = [];
  for (let i = 0; i < count; i++) {
    const category = i === 0 ? "income" : pick(cats.filter((c) => c !== "income" || Math.random() > 0.92));
    const isIncome = category === "income";
    const amount = isIncome
      ? Math.round(rand(1200, 3200) * 100) / 100
      : Math.round(rand(3, 180) * 100) / 100;
    const daysAgo = Math.floor(rand(0, 75));
    txs.push({
      id: `txn_${accountId}_${i}`,
      accountId,
      type: isIncome ? "credit" : "debit",
      amount,
      currency: "GBP",
      merchant: pick(merchants[category]),
      category,
      status: Math.random() > 0.96 ? "pending" : "completed",
      date: iso(now() - daysAgo * DAY - Math.floor(rand(0, DAY))),
    });
  }
  return txs.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export const demoTransactions: Transaction[] = genTransactions(demoAccount.id, 60);

export const demoCards: Card[] = [
  {
    id: "card_virtual_01",
    userId: DEMO_USER_ID,
    accountId: demoAccount.id,
    type: "virtual",
    network: "visa",
    status: "active",
    label: "Everyday Virtual",
    last4: "4821",
    fullNumber: "4929 1147 2038 4821",
    expiry: "09/28",
    cvv: "482",
    holderName: "AMELIA CLARKE",
    spendingLimit: 2000,
    createdAt: iso(now() - 200 * DAY),
    color: "from-blue-600 via-blue-700 to-slate-900",
  },
  {
    id: "card_physical_01",
    userId: DEMO_USER_ID,
    accountId: demoAccount.id,
    type: "physical",
    network: "mastercard",
    status: "active",
    label: "Jeebti Debit Card",
    last4: "7734",
    fullNumber: "5412 7501 9933 7734",
    expiry: "04/27",
    cvv: "219",
    holderName: "AMELIA CLARKE",
    spendingLimit: 5000,
    createdAt: iso(now() - 220 * DAY),
    color: "from-slate-900 via-slate-800 to-black",
  },
];

export const demoSavingsGoals: SavingsGoal[] = [
  {
    id: "goal_01",
    userId: DEMO_USER_ID,
    name: "Japan Trip",
    emoji: "✈️",
    targetAmount: 3500,
    currentAmount: 2140,
    targetDate: iso(now() + 140 * DAY),
    color: "bg-blue-500",
    createdAt: iso(now() - 90 * DAY),
    roundUpEnabled: true,
  },
  {
    id: "goal_02",
    userId: DEMO_USER_ID,
    name: "Emergency Fund",
    emoji: "🛡️",
    targetAmount: 10000,
    currentAmount: 6250,
    color: "bg-emerald-500",
    createdAt: iso(now() - 300 * DAY),
    roundUpEnabled: false,
  },
  {
    id: "goal_03",
    userId: DEMO_USER_ID,
    name: "New MacBook",
    emoji: "💻",
    targetAmount: 1800,
    currentAmount: 540,
    targetDate: iso(now() + 60 * DAY),
    color: "bg-violet-500",
    createdAt: iso(now() - 30 * DAY),
    roundUpEnabled: true,
  },
];

export const demoContacts: Contact[] = [
  { id: "ct_01", name: "James Smith", handle: "@jamessmith", accountNumber: "48213390", sortCode: "20-30-40", bankName: "Jeebti", isJeebtiUser: true },
  { id: "ct_02", name: "Priya Patel", handle: "@priyap", accountNumber: "11238845", sortCode: "40-12-09", bankName: "Barclays", isJeebtiUser: false },
  { id: "ct_03", name: "Oliver Bennett", handle: "@oliverb", accountNumber: "77654321", sortCode: "60-16-13", bankName: "Jeebti", isJeebtiUser: true },
  { id: "ct_04", name: "Sofia Rossi", handle: "@sofiar", accountNumber: "90887766", sortCode: "23-05-80", bankName: "Monzo", isJeebtiUser: false },
  { id: "ct_05", name: "Liam O'Connor", handle: "@liamoc", accountNumber: "33445566", sortCode: "60-16-13", bankName: "Jeebti", isJeebtiUser: true },
];

export const demoNotifications: AppNotification[] = [
  { id: "ntf_01", userId: DEMO_USER_ID, type: "transaction", title: "Payment sent", message: "You sent £45.00 to James Smith", read: false, createdAt: iso(now() - 2 * 3600 * 1000) },
  { id: "ntf_02", userId: DEMO_USER_ID, type: "security", title: "New device sign-in", message: "A new device signed in from London, UK", read: false, createdAt: iso(now() - 1 * DAY) },
  { id: "ntf_03", userId: DEMO_USER_ID, type: "savings", title: "Goal milestone reached", message: "You're 61% of the way to Japan Trip", read: true, createdAt: iso(now() - 3 * DAY) },
  { id: "ntf_04", userId: DEMO_USER_ID, type: "card", title: "Virtual card created", message: "Your Everyday Virtual card is ready to use", read: true, createdAt: iso(now() - 5 * DAY) },
  { id: "ntf_05", userId: DEMO_USER_ID, type: "fraud", title: "Unusual activity detected", message: "We blocked a suspicious £890 transaction", read: true, createdAt: iso(now() - 8 * DAY) },
];

export const demoDevices: Device[] = [
  { id: "dev_01", userId: DEMO_USER_ID, name: "iPhone 15 Pro", type: "mobile", os: "iOS 18.1", browser: "Jeebti App", location: "London, UK", ipAddress: "82.132.44.10", lastActive: iso(now() - 5 * 60 * 1000), isCurrent: true, trusted: true },
  { id: "dev_02", userId: DEMO_USER_ID, name: "MacBook Pro", type: "desktop", os: "macOS 15", browser: "Chrome 129", location: "London, UK", ipAddress: "82.132.44.10", lastActive: iso(now() - 2 * DAY), isCurrent: false, trusted: true },
  { id: "dev_03", userId: DEMO_USER_ID, name: "Unknown Android", type: "mobile", os: "Android 14", browser: "Chrome Mobile", location: "Manchester, UK", ipAddress: "51.9.201.77", lastActive: iso(now() - 14 * DAY), isCurrent: false, trusted: false },
];

export const demoSessions: Session[] = demoDevices.map((d, i) => ({
  id: `ses_0${i + 1}`,
  userId: DEMO_USER_ID,
  deviceId: d.id,
  createdAt: d.lastActive,
  lastActive: d.lastActive,
  location: d.location,
  isCurrent: d.isCurrent,
}));

export const demoFraudAlerts: FraudAlert[] = [
  { id: "fr_01", userId: DEMO_USER_ID, severity: "high", title: "Blocked suspicious payment", description: "£890.00 to an unrecognised merchant in Lagos, Nigeria was blocked.", status: "resolved", createdAt: iso(now() - 8 * DAY) },
  { id: "fr_02", userId: DEMO_USER_ID, severity: "low", title: "New device sign-in", description: "Sign-in from an unrecognised Android device in Manchester.", status: "open", createdAt: iso(now() - 14 * DAY) },
];

// ---------------- Admin data ----------------

const firstNames = ["Amelia", "James", "Priya", "Oliver", "Sofia", "Liam", "Grace", "Noah", "Ella", "Mohammed", "Chloe", "Daniel", "Isla", "Ethan", "Freya"];
const lastNames = ["Clarke", "Smith", "Patel", "Bennett", "Rossi", "O'Connor", "Wright", "Khan", "Murphy", "Ahmed", "Turner", "Walsh", "Reid", "Hughes", "Foster"];

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  status: "active" | "suspended" | "pending";
  kycStatus: "unverified" | "pending" | "verified" | "rejected";
  balance: number;
  joinedAt: string;
  role: "customer" | "admin" | "support";
}

export const demoAdminUsers: AdminUser[] = Array.from({ length: 42 }).map((_, i) => {
  const fn = pick(firstNames);
  const ln = pick(lastNames);
  return {
    id: `usr_${1000 + i}`,
    name: `${fn} ${ln}`,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@example.com`,
    status: pick(["active", "active", "active", "suspended", "pending"]),
    kycStatus: pick(["verified", "verified", "pending", "unverified", "rejected"]),
    balance: Math.round(rand(20, 18500) * 100) / 100,
    joinedAt: iso(now() - Math.floor(rand(1, 400)) * DAY),
    role: "customer",
  };
});
demoAdminUsers.unshift({ id: DEMO_USER_ID, name: "Amelia Clarke", email: demoUser.email, status: "active", kycStatus: "verified", balance: demoAccount.balance, joinedAt: demoUser.createdAt, role: "customer" });

export const demoKycSubmissions: KycSubmission[] = Array.from({ length: 12 }).map((_, i) => {
  const u = pick(demoAdminUsers);
  return {
    id: `kyc_${i + 1}`,
    userId: u.id,
    userName: u.name,
    email: u.email,
    status: pick(["pending", "pending", "verified", "rejected"]),
    documentType: pick(["passport", "driving_licence", "national_id"]),
    submittedAt: iso(now() - Math.floor(rand(0, 20)) * DAY),
    riskScore: Math.round(rand(2, 95)),
  };
});

export const demoSupportTickets: SupportTicket[] = Array.from({ length: 16 }).map((_, i) => {
  const u = pick(demoAdminUsers);
  const status = pick(["open", "in_progress", "resolved", "closed"] as const);
  return {
    id: `tkt_${2000 + i}`,
    userId: u.id,
    userName: u.name,
    subject: pick([
      "Card payment declined abroad",
      "Unable to verify identity",
      "Missing transaction",
      "App keeps crashing on login",
      "Request to increase card limit",
      "Dispute a transaction",
      "Update phone number",
      "Close my account",
    ]),
    category: pick(["account", "card", "payment", "kyc", "technical", "other"]),
    status,
    priority: pick(["low", "medium", "high", "urgent"]),
    createdAt: iso(now() - Math.floor(rand(0, 30)) * DAY),
    updatedAt: iso(now() - Math.floor(rand(0, 5)) * DAY),
    messages: [
      { id: "m1", author: "user", authorName: u.name, message: "Hi, I'm having an issue and need help resolving it as soon as possible.", createdAt: iso(now() - Math.floor(rand(1, 30)) * DAY) },
      ...(status !== "open" ? [{ id: "m2", author: "support" as const, authorName: "Jeebti Support", message: "Thanks for reaching out — we're looking into this now and will update you shortly.", createdAt: iso(now() - Math.floor(rand(0, 4)) * DAY) }] : []),
    ],
  };
});

export const demoAuditLogs: AuditLogEntry[] = Array.from({ length: 30 }).map((_, i) => {
  const actions = [
    { action: "Suspended user account", targetType: "user" },
    { action: "Approved KYC submission", targetType: "kyc" },
    { action: "Rejected KYC submission", targetType: "kyc" },
    { action: "Froze card", targetType: "card" },
    { action: "Reversed transaction", targetType: "transaction" },
    { action: "Resolved support ticket", targetType: "ticket" },
    { action: "Updated user role", targetType: "user" },
    { action: "Dismissed fraud alert", targetType: "fraud_alert" },
  ];
  const a = pick(actions);
  const admin = pick(["Nadia Hussain", "Tom Baxter", "Jeebti Support"]);
  return {
    id: `log_${i + 1}`,
    actorId: "adm_001",
    actorName: admin,
    actorRole: admin === "Jeebti Support" ? "support" : "admin",
    action: a.action,
    targetType: a.targetType,
    targetId: `${a.targetType}_${Math.floor(rand(1000, 9999))}`,
    details: `${a.action} via admin console`,
    createdAt: iso(now() - Math.floor(rand(0, 45)) * DAY),
    ipAddress: `10.0.${Math.floor(rand(0, 255))}.${Math.floor(rand(0, 255))}`,
  };
});

export const demoAdminAnalytics: AdminAnalytics = {
  totalUsers: demoAdminUsers.length,
  activeUsers: demoAdminUsers.filter((u) => u.status === "active").length,
  totalBalance: Math.round(demoAdminUsers.reduce((s, u) => s + u.balance, 0) * 100) / 100,
  totalTransactionsToday: 214,
  totalVolumeToday: 48210.65,
  newSignupsThisWeek: 9,
  pendingKyc: demoKycSubmissions.filter((k) => k.status === "pending").length,
  openTickets: demoSupportTickets.filter((t) => t.status === "open" || t.status === "in_progress").length,
  fraudAlertsOpen: demoFraudAlerts.filter((f) => f.status === "open").length,
};
