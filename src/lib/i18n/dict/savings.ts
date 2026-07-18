import type { Namespace } from "@/lib/i18n/types";

export const savings: Namespace = {
  "savings.page.title": { en: "Savings", fr: "Épargne", ar: "الادخار" },
  "savings.page.description": {
    en: "Set goals and watch your money grow.",
    fr: "Définissez des objectifs et regardez votre argent fructifier.",
    ar: "حدد أهدافك وشاهد أموالك تنمو.",
  },
  "savings.action.newGoal": { en: "New goal", fr: "Nouvel objectif", ar: "هدف جديد" },
  "savings.action.createFirstGoal": { en: "Create your first goal", fr: "Créez votre premier objectif", ar: "أنشئ هدفك الأول" },

  "savings.summary.totalSaved": { en: "Total saved", fr: "Total épargné", ar: "إجمالي المدخرات" },
  "savings.summary.activeGoals": { en: "Active goals", fr: "Objectifs actifs", ar: "الأهداف النشطة" },

  "savings.empty.title": { en: "You don't have any savings goals yet.", fr: "Vous n'avez encore aucun objectif d'épargne.", ar: "ليس لديك أي هدف ادخار بعد." },

  "savings.goal.of": { en: "{current} of {target}", fr: "{current} sur {target}", ar: "{current} من {target}" },
  "savings.goal.roundUp": { en: "Round-up", fr: "Arrondi", ar: "التقريب" },
  "savings.goal.funded": { en: "{pct}% funded", fr: "{pct} % atteint", ar: "تم تمويل {pct}٪" },
  "savings.goal.daysLeft": { en: "{days} day left", fr: "{days} jour restant", ar: "يوم واحد متبقٍ" },
  "savings.goal.daysLeftPlural": { en: "{days} days left", fr: "{days} jours restants", ar: "{days} أيام متبقية" },
  "savings.goal.targetDatePassed": { en: "Target date passed", fr: "Date cible dépassée", ar: "تجاوزت التاريخ المستهدف" },
  "savings.goal.addMoney": { en: "Add money", fr: "Ajouter de l'argent", ar: "إضافة أموال" },
  "savings.goal.withdraw": { en: "Withdraw", fr: "Retirer", ar: "سحب" },

  "savings.toast.error": { en: "Something went wrong", fr: "Une erreur est survenue", ar: "حدث خطأ ما" },
  "savings.toast.goalCreated": { en: "Savings goal created", fr: "Objectif d'épargne créé", ar: "تم إنشاء هدف الادخار" },
  "savings.toast.moneyAdded": { en: "Money added to goal", fr: "Argent ajouté à l'objectif", ar: "تمت إضافة الأموال إلى الهدف" },
  "savings.toast.moneyWithdrawn": { en: "Money withdrawn from goal", fr: "Argent retiré de l'objectif", ar: "تم سحب الأموال من الهدف" },

  "savings.newGoal.title": { en: "New savings goal", fr: "Nouvel objectif d'épargne", ar: "هدف ادخار جديد" },
  "savings.newGoal.description": {
    en: "Set a target and start saving towards it.",
    fr: "Fixez un objectif et commencez à épargner pour l'atteindre.",
    ar: "حدد هدفًا وابدأ الادخار لتحقيقه.",
  },
  "savings.newGoal.name": { en: "Goal name", fr: "Nom de l'objectif", ar: "اسم الهدف" },
  "savings.newGoal.namePlaceholder": { en: "e.g. Summer holiday", fr: "ex. Vacances d'été", ar: "مثال: عطلة الصيف" },
  "savings.newGoal.emoji": { en: "Emoji", fr: "Emoji", ar: "رمز تعبيري" },
  "savings.newGoal.targetAmount": { en: "Target amount", fr: "Montant cible", ar: "المبلغ المستهدف" },
  "savings.newGoal.targetDate": { en: "Target date (optional)", fr: "Date cible (facultatif)", ar: "التاريخ المستهدف (اختياري)" },
  "savings.newGoal.color": { en: "Color", fr: "Couleur", ar: "اللون" },
  "savings.newGoal.color.emerald": { en: "Emerald", fr: "Émeraude", ar: "زمردي" },
  "savings.newGoal.color.blue": { en: "Blue", fr: "Bleu", ar: "أزرق" },
  "savings.newGoal.color.purple": { en: "Purple", fr: "Violet", ar: "بنفسجي" },
  "savings.newGoal.color.amber": { en: "Amber", fr: "Ambre", ar: "كهرماني" },
  "savings.newGoal.color.rose": { en: "Rose", fr: "Rose", ar: "وردي" },
  "savings.newGoal.color.cyan": { en: "Cyan", fr: "Cyan", ar: "سماوي" },
  "savings.newGoal.roundUpSaving": { en: "Round-up saving", fr: "Épargne par arrondi", ar: "الادخار بالتقريب" },
  "savings.newGoal.roundUpDescription": {
    en: "Round up card spending into this goal.",
    fr: "Arrondissez vos dépenses par carte vers cet objectif.",
    ar: "قرّب مبالغ إنفاق البطاقة وأضفها إلى هذا الهدف.",
  },
  "savings.newGoal.creating": { en: "Creating...", fr: "Création...", ar: "جارٍ الإنشاء..." },
  "savings.newGoal.create": { en: "Create goal", fr: "Créer l'objectif", ar: "إنشاء الهدف" },

  "savings.addMoney.title": { en: "Add money to {name}", fr: "Ajouter de l'argent à {name}", ar: "إضافة أموال إلى {name}" },
  "savings.addMoney.description": {
    en: "{current} of {target} saved.",
    fr: "{current} sur {target} épargnés.",
    ar: "تم ادخار {current} من {target}.",
  },
  "savings.addMoney.amount": { en: "Amount", fr: "Montant", ar: "المبلغ" },
  "savings.addMoney.adding": { en: "Adding...", fr: "Ajout en cours...", ar: "جارٍ الإضافة..." },

  "savings.withdraw.title": { en: "Withdraw from {name}", fr: "Retirer de {name}", ar: "سحب من {name}" },
  "savings.withdraw.description": { en: "{current} available in this goal.", fr: "{current} disponibles dans cet objectif.", ar: "{current} متاحة في هذا الهدف." },
  "savings.withdraw.amount": { en: "Amount", fr: "Montant", ar: "المبلغ" },
  "savings.withdraw.withdrawing": { en: "Withdrawing...", fr: "Retrait en cours...", ar: "جارٍ السحب..." },
};
