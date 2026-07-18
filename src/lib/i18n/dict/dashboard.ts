import type { Namespace } from "@/lib/i18n/types";

export const dashboard: Namespace = {
  "dashboard.greeting.morning": { en: "Good morning", fr: "Bonjour", ar: "صباح الخير" },
  "dashboard.greeting.afternoon": { en: "Good afternoon", fr: "Bon après-midi", ar: "مساء الخير" },
  "dashboard.greeting.evening": { en: "Good evening", fr: "Bonsoir", ar: "مساء الخير" },

  "dashboard.available": { en: "Available", fr: "Disponible", ar: "المتاح" },
  "dashboard.action.send": { en: "Send", fr: "Envoyer", ar: "إرسال" },
  "dashboard.action.receive": { en: "Receive", fr: "Recevoir", ar: "استلام" },
  "dashboard.action.topUp": { en: "Top up", fr: "Recharger", ar: "شحن" },
  "dashboard.action.qr": { en: "QR", fr: "QR", ar: "QR" },

  "dashboard.spending.title": { en: "Spending this month", fr: "Dépenses ce mois-ci", ar: "الإنفاق هذا الشهر" },

  "dashboard.goals.title": { en: "Savings goals", fr: "Objectifs d'épargne", ar: "أهداف الادخار" },
  "dashboard.goals.empty": {
    en: "You haven't created any savings goals yet.",
    fr: "Vous n'avez pas encore créé d'objectif d'épargne.",
    ar: "لم تُنشئ أي هدف ادخار بعد.",
  },

  "dashboard.transactions.title": { en: "Recent transactions", fr: "Transactions récentes", ar: "المعاملات الأخيرة" },
  "dashboard.transactions.empty": { en: "No transactions yet.", fr: "Aucune transaction pour le moment.", ar: "لا توجد معاملات بعد." },

  "dashboard.notifications.title": { en: "Notifications", fr: "Notifications", ar: "الإشعارات" },
  "dashboard.notifications.empty": { en: "You're all caught up.", fr: "Vous êtes à jour.", ar: "أنت على اطّلاع بكل شيء." },
};
