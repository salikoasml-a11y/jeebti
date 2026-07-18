export interface FaqItem {
  id: string;
  categoryKey: string;
  questionKey: string;
  answerKey: string;
}

export const faqCategoryKeys = [
  "help.category.gettingStarted",
  "help.category.payments",
  "help.category.cards",
  "help.category.security",
  "help.category.fees",
] as const;

export const faqItems: FaqItem[] = [
  {
    id: "gs-1",
    categoryKey: "help.category.gettingStarted",
    questionKey: "help.faq.gs-1.q",
    answerKey: "help.faq.gs-1.a",
  },
  {
    id: "gs-2",
    categoryKey: "help.category.gettingStarted",
    questionKey: "help.faq.gs-2.q",
    answerKey: "help.faq.gs-2.a",
  },
  {
    id: "gs-3",
    categoryKey: "help.category.gettingStarted",
    questionKey: "help.faq.gs-3.q",
    answerKey: "help.faq.gs-3.a",
  },
  {
    id: "gs-4",
    categoryKey: "help.category.gettingStarted",
    questionKey: "help.faq.gs-4.q",
    answerKey: "help.faq.gs-4.a",
  },
  {
    id: "pay-1",
    categoryKey: "help.category.payments",
    questionKey: "help.faq.pay-1.q",
    answerKey: "help.faq.pay-1.a",
  },
  {
    id: "pay-2",
    categoryKey: "help.category.payments",
    questionKey: "help.faq.pay-2.q",
    answerKey: "help.faq.pay-2.a",
  },
  {
    id: "pay-3",
    categoryKey: "help.category.payments",
    questionKey: "help.faq.pay-3.q",
    answerKey: "help.faq.pay-3.a",
  },
  {
    id: "pay-4",
    categoryKey: "help.category.payments",
    questionKey: "help.faq.pay-4.q",
    answerKey: "help.faq.pay-4.a",
  },
  {
    id: "card-1",
    categoryKey: "help.category.cards",
    questionKey: "help.faq.card-1.q",
    answerKey: "help.faq.card-1.a",
  },
  {
    id: "card-2",
    categoryKey: "help.category.cards",
    questionKey: "help.faq.card-2.q",
    answerKey: "help.faq.card-2.a",
  },
  {
    id: "card-3",
    categoryKey: "help.category.cards",
    questionKey: "help.faq.card-3.q",
    answerKey: "help.faq.card-3.a",
  },
  {
    id: "card-4",
    categoryKey: "help.category.cards",
    questionKey: "help.faq.card-4.q",
    answerKey: "help.faq.card-4.a",
  },
  {
    id: "sec-1",
    categoryKey: "help.category.security",
    questionKey: "help.faq.sec-1.q",
    answerKey: "help.faq.sec-1.a",
  },
  {
    id: "sec-2",
    categoryKey: "help.category.security",
    questionKey: "help.faq.sec-2.q",
    answerKey: "help.faq.sec-2.a",
  },
  {
    id: "sec-3",
    categoryKey: "help.category.security",
    questionKey: "help.faq.sec-3.q",
    answerKey: "help.faq.sec-3.a",
  },
  {
    id: "sec-4",
    categoryKey: "help.category.security",
    questionKey: "help.faq.sec-4.q",
    answerKey: "help.faq.sec-4.a",
  },
  {
    id: "fee-1",
    categoryKey: "help.category.fees",
    questionKey: "help.faq.fee-1.q",
    answerKey: "help.faq.fee-1.a",
  },
  {
    id: "fee-2",
    categoryKey: "help.category.fees",
    questionKey: "help.faq.fee-2.q",
    answerKey: "help.faq.fee-2.a",
  },
  {
    id: "fee-3",
    categoryKey: "help.category.fees",
    questionKey: "help.faq.fee-3.q",
    answerKey: "help.faq.fee-3.a",
  },
];
