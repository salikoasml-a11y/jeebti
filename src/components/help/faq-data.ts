export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const faqCategories = [
  "Getting Started",
  "Payments & Transfers",
  "Cards",
  "Security",
  "Fees",
] as const;

export const faqItems: FaqItem[] = [
  {
    id: "gs-1",
    category: "Getting Started",
    question: "How do I open a Jeebti account?",
    answer:
      "Download the app, tap Sign Up, and provide your name, email, phone number, and date of birth. You'll then complete identity verification (KYC) by uploading a photo ID — most accounts are approved within a few minutes.",
  },
  {
    id: "gs-2",
    category: "Getting Started",
    question: "Why is my KYC status still pending?",
    answer:
      "KYC review usually takes under 10 minutes but can take up to 24 hours during busy periods or if your documents need manual review. You can check your current status any time on your Profile page.",
  },
  {
    id: "gs-3",
    category: "Getting Started",
    question: "How do I top up my account?",
    answer:
      "Go to your Wallet and tap Top Up. You can add funds from a linked debit card or an external bank transfer using your account's sort code and account number.",
  },
  {
    id: "gs-4",
    category: "Getting Started",
    question: "Can I have more than one account?",
    answer:
      "Each Jeebti profile includes one current account and one savings account by default. Additional savings goals can be created from the Savings tab without opening new accounts.",
  },
  {
    id: "pay-1",
    category: "Payments & Transfers",
    question: "How long do transfers take to arrive?",
    answer:
      "Transfers to other Jeebti users are instant. Transfers to external UK bank accounts typically arrive within a few hours and always within one business day.",
  },
  {
    id: "pay-2",
    category: "Payments & Transfers",
    question: "Is there a limit on how much I can send?",
    answer:
      "Standard accounts can send up to £10,000 per single transfer and £25,000 per day. Verified accounts with a higher trust tier may have increased limits — contact support to request a review.",
  },
  {
    id: "pay-3",
    category: "Payments & Transfers",
    question: "How do I request money from someone?",
    answer:
      "Open Receive from the navigation bar, enter the amount and an optional reference, then share the generated payment link or QR code with the person you're requesting from.",
  },
  {
    id: "pay-4",
    category: "Payments & Transfers",
    question: "Can I cancel a payment after sending it?",
    answer:
      "Payments to other Jeebti users are final once sent because funds settle instantly. If you've sent money to the wrong person, contact support immediately — we can often help you request a refund from the recipient.",
  },
  {
    id: "card-1",
    category: "Cards",
    question: "How do I freeze my card?",
    answer:
      "Open the Cards tab, select the card, and toggle Freeze. This instantly blocks new transactions while keeping the card active for when you unfreeze it — handy if you've misplaced it.",
  },
  {
    id: "card-2",
    category: "Cards",
    question: "What's the difference between a virtual and physical card?",
    answer:
      "A virtual card is issued instantly and works for online payments and mobile wallets right away. A physical card is a tangible card posted to your address, typically arriving within 5-7 business days, for use in shops and ATMs.",
  },
  {
    id: "card-3",
    category: "Cards",
    question: "How do I set a spending limit on my card?",
    answer:
      "From the card details screen, tap Set Limit and choose a daily or monthly cap. You'll get a notification if a transaction would take you over the limit, and it will be declined.",
  },
  {
    id: "card-4",
    category: "Cards",
    question: "My card was lost or stolen — what do I do?",
    answer:
      "Freeze the card immediately from the Cards tab to block any new transactions, then request a replacement card from the same screen. Report any unauthorised transactions to support so we can investigate.",
  },
  {
    id: "sec-1",
    category: "Security",
    question: "How do I enable two-factor authentication?",
    answer:
      "Go to Settings > Security and turn on Two-Factor Authentication. You'll scan a QR code with an authenticator app (like Google Authenticator or Authy) and confirm with a 6-digit code to finish setup.",
  },
  {
    id: "sec-2",
    category: "Security",
    question: "What should I do if I see a device I don't recognise?",
    answer:
      "Go to Settings > Security > Devices and remove any device you don't recognise immediately. We also recommend enabling two-factor authentication and reviewing your recent transactions for anything unfamiliar.",
  },
  {
    id: "sec-3",
    category: "Security",
    question: "How does Jeebti protect me from fraud?",
    answer:
      "We monitor transactions in real time for unusual patterns, flag suspicious payments before they complete, and notify you instantly of new device sign-ins. Any flagged activity appears under Settings > Security > Fraud alerts.",
  },
  {
    id: "sec-4",
    category: "Security",
    question: "Is biometric login safe?",
    answer:
      "Yes. Biometric login uses your device's built-in Face ID, Touch ID, or fingerprint sensor — your biometric data never leaves your device or gets sent to Jeebti's servers.",
  },
  {
    id: "fee-1",
    category: "Fees",
    question: "Does Jeebti charge monthly account fees?",
    answer:
      "No, standard current and savings accounts are free with no monthly maintenance fees. Optional premium features, like additional physical cards, may carry a small one-off fee shown before you confirm.",
  },
  {
    id: "fee-2",
    category: "Fees",
    question: "Are there fees for sending money abroad?",
    answer:
      "Domestic UK transfers are always free. International transfers carry a small percentage-based fee plus the exchange rate margin, both shown clearly before you confirm the transfer.",
  },
  {
    id: "fee-3",
    category: "Fees",
    question: "Do I get charged for ATM withdrawals?",
    answer:
      "The first £250 withdrawn per month is free. After that, a flat £1.50 fee applies per withdrawal. Your remaining free allowance is shown at the top of the ATM withdrawal screen.",
  },
];
