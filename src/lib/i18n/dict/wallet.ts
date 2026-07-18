import type { Namespace } from "@/lib/i18n/types";

export const wallet: Namespace = {
  "wallet.title": { en: "Wallet", fr: "Portefeuille", ar: "المحفظة" },
  "wallet.description": {
    en: "Manage your accounts and money.",
    fr: "Gérez vos comptes et votre argent.",
    ar: "أدر حساباتك وأموالك.",
  },

  "wallet.topUp": { en: "Top up", fr: "Recharger", ar: "شحن الرصيد" },
  "wallet.accountDetails": { en: "Account details", fr: "Détails du compte", ar: "تفاصيل الحساب" },
  "wallet.iban": { en: "IBAN", fr: "IBAN", ar: "آيبان" },
  "wallet.sortCode": { en: "Sort code", fr: "Code guichet", ar: "رمز الفرع" },
  "wallet.accountNumber": { en: "Account number", fr: "Numéro de compte", ar: "رقم الحساب" },
  "wallet.copyAria": {
    en: "Copy {label}",
    fr: "Copier {label}",
    ar: "نسخ {label}",
  },

  "wallet.balanceBreakdown.title": { en: "Balance breakdown", fr: "Répartition du solde", ar: "توزيع الرصيد" },
  "wallet.noBalance": { en: "No balance to show yet.", fr: "Aucun solde à afficher pour le moment.", ar: "لا يوجد رصيد لعرضه بعد." },

  "wallet.recentActivity": { en: "Recent activity", fr: "Activité récente", ar: "النشاط الأخير" },
  "wallet.noAccounts": { en: "No accounts found.", fr: "Aucun compte trouvé.", ar: "لم يتم العثور على أي حساب." },

  "wallet.topup.title": { en: "Top up", fr: "Recharger", ar: "شحن الرصيد" },
  "wallet.topup.description": {
    en: "Add money to your current account.",
    fr: "Ajoutez de l'argent à votre compte courant.",
    ar: "أضف أموالًا إلى حسابك الجاري.",
  },
  "wallet.topup.amountLabel": { en: "Amount", fr: "Montant", ar: "المبلغ" },
  "wallet.topup.fundingSourceLabel": { en: "Funding source", fr: "Source de financement", ar: "مصدر التمويل" },
  "wallet.topup.source.debitCard": {
    en: "Debit card ending {digits}",
    fr: "Carte de débit se terminant par {digits}",
    ar: "بطاقة خصم تنتهي بـ {digits}",
  },
  "wallet.topup.source.bankTransfer": { en: "Bank transfer", fr: "Virement bancaire", ar: "تحويل بنكي" },
  "wallet.topup.submitting": { en: "Adding money…", fr: "Ajout en cours…", ar: "جارٍ إضافة الأموال…" },
  "wallet.topup.errorAmount": {
    en: "Enter an amount greater than zero",
    fr: "Saisissez un montant supérieur à zéro",
    ar: "أدخل مبلغًا أكبر من الصفر",
  },
  "wallet.topup.successToast": {
    en: "Topped up {amount}",
    fr: "Recharge de {amount} effectuée",
    ar: "تم شحن {amount}",
  },
  "wallet.topup.errorGeneric": { en: "Top up failed", fr: "Échec de la recharge", ar: "فشلت عملية الشحن" },
};
