import type { Namespace } from "@/lib/i18n/types";

export const cards: Namespace = {
  "cards.page.title": { en: "Cards", fr: "Cartes", ar: "البطاقات" },
  "cards.page.description": {
    en: "Manage your virtual, physical and credit cards.",
    fr: "Gérez vos cartes virtuelles, physiques et de crédit.",
    ar: "أدر بطاقاتك الافتراضية والفعلية وبطاقات الائتمان.",
  },
  "cards.action.addCard": { en: "Add card", fr: "Ajouter une carte", ar: "إضافة بطاقة" },
  "cards.action.createVirtualCard": { en: "Create virtual card", fr: "Créer une carte virtuelle", ar: "إنشاء بطاقة افتراضية" },
  "cards.action.requestPhysicalCard": { en: "Request physical card", fr: "Demander une carte physique", ar: "طلب بطاقة فعلية" },
  "cards.action.applyCreditCard": { en: "Apply for credit card", fr: "Demander une carte de crédit", ar: "التقدم بطلب بطاقة ائتمان" },

  "cards.empty.title": { en: "You don't have any cards yet.", fr: "Vous n'avez encore aucune carte.", ar: "ليس لديك أي بطاقات بعد." },

  "cards.tile.spendingLimit": { en: "Spending limit", fr: "Plafond de dépenses", ar: "حد الإنفاق" },
  "cards.tile.freezeCard": { en: "Freeze card", fr: "Geler la carte", ar: "تجميد البطاقة" },
  "cards.tile.viewDetails": { en: "View details", fr: "Voir les détails", ar: "عرض التفاصيل" },
  "cards.tile.setLimit": { en: "Set limit", fr: "Définir un plafond", ar: "تحديد الحد" },

  "cards.toast.frozen": { en: "Card frozen", fr: "Carte gelée", ar: "تم تجميد البطاقة" },
  "cards.toast.unfrozen": { en: "Card unfrozen", fr: "Carte dégelée", ar: "تم إلغاء تجميد البطاقة" },
  "cards.toast.error": { en: "Something went wrong", fr: "Une erreur est survenue", ar: "حدث خطأ ما" },
  "cards.toast.copied": { en: "Copied", fr: "Copié", ar: "تم النسخ" },
  "cards.toast.limitUpdated": { en: "Spending limit updated", fr: "Plafond de dépenses mis à jour", ar: "تم تحديث حد الإنفاق" },
  "cards.toast.virtualCardCreated": { en: "Virtual card created", fr: "Carte virtuelle créée", ar: "تم إنشاء البطاقة الافتراضية" },

  "cards.face.type.virtual": { en: "virtual card", fr: "carte virtuelle", ar: "بطاقة افتراضية" },
  "cards.face.type.physical": { en: "physical card", fr: "carte physique", ar: "بطاقة فعلية" },
  "cards.face.type.credit": { en: "credit card", fr: "carte de crédit", ar: "بطاقة ائتمان" },
  "cards.face.frozen": { en: "Frozen", fr: "Gelée", ar: "مجمّدة" },
  "cards.face.pending": { en: "Pending", fr: "En attente", ar: "قيد الانتظار" },
  "cards.face.cardHolder": { en: "Card holder", fr: "Titulaire de la carte", ar: "حامل البطاقة" },
  "cards.face.expires": { en: "Expires", fr: "Expire le", ar: "تاريخ الانتهاء" },

  "cards.details.title": { en: "Card details", fr: "Détails de la carte", ar: "تفاصيل البطاقة" },
  "cards.details.description": {
    en: "Sensitive details are hidden until you reveal them.",
    fr: "Les informations sensibles sont masquées jusqu'à ce que vous les affichiez.",
    ar: "التفاصيل الحساسة مخفية حتى تقوم بإظهارها.",
  },
  "cards.details.reveal": { en: "Reveal card details", fr: "Afficher les détails de la carte", ar: "إظهار تفاصيل البطاقة" },
  "cards.details.cardNumber": { en: "Card number", fr: "Numéro de carte", ar: "رقم البطاقة" },
  "cards.details.expiry": { en: "Expiry", fr: "Expiration", ar: "تاريخ الانتهاء" },
  "cards.details.cvv": { en: "CVV", fr: "CVV", ar: "رمز التحقق CVV" },

  "cards.setLimit.title": { en: "Set spending limit", fr: "Définir le plafond de dépenses", ar: "تحديد حد الإنفاق" },
  "cards.setLimit.description": {
    en: "Monthly limit for {label}.",
    fr: "Plafond mensuel pour {label}.",
    ar: "الحد الشهري لـ {label}.",
  },
  "cards.setLimit.monthlyLimit": { en: "Monthly limit", fr: "Plafond mensuel", ar: "الحد الشهري" },
  "cards.setLimit.saving": { en: "Saving...", fr: "Enregistrement...", ar: "جارٍ الحفظ..." },
  "cards.setLimit.save": { en: "Save limit", fr: "Enregistrer le plafond", ar: "حفظ الحد" },

  "cards.createVirtual.title": { en: "Create virtual card", fr: "Créer une carte virtuelle", ar: "إنشاء بطاقة افتراضية" },
  "cards.createVirtual.description": {
    en: "Instantly issue a new virtual card for online spending.",
    fr: "Émettez instantanément une nouvelle carte virtuelle pour vos achats en ligne.",
    ar: "أصدر فورًا بطاقة افتراضية جديدة للإنفاق عبر الإنترنت.",
  },
  "cards.createVirtual.label": { en: "Card label", fr: "Nom de la carte", ar: "اسم البطاقة" },
  "cards.createVirtual.labelPlaceholder": { en: "e.g. Subscriptions", fr: "ex. Abonnements", ar: "مثال: الاشتراكات" },
  "cards.createVirtual.creating": { en: "Creating...", fr: "Création...", ar: "جارٍ الإنشاء..." },
  "cards.createVirtual.create": { en: "Create card", fr: "Créer la carte", ar: "إنشاء البطاقة" },

  "cards.requestPhysical.title": { en: "Request physical card", fr: "Demander une carte physique", ar: "طلب بطاقة فعلية" },
  "cards.requestPhysical.description": {
    en: "Confirm your delivery address below.",
    fr: "Confirmez votre adresse de livraison ci-dessous.",
    ar: "أكّد عنوان التسليم أدناه.",
  },
  "cards.requestPhysical.requesting": { en: "Requesting...", fr: "Demande en cours...", ar: "جارٍ الطلب..." },
  "cards.requestPhysical.confirmAddress": { en: "Confirm address", fr: "Confirmer l'adresse", ar: "تأكيد العنوان" },
  "cards.requestPhysical.successTitle": { en: "Card on the way", fr: "Votre carte est en route", ar: "البطاقة في الطريق" },
  "cards.requestPhysical.successDescription": {
    en: "Your new physical card has been ordered and will arrive by post within 5-7 working days.",
    fr: "Votre nouvelle carte physique a été commandée et arrivera par courrier sous 5 à 7 jours ouvrés.",
    ar: "تم طلب بطاقتك الفعلية الجديدة وستصل بالبريد خلال 5 إلى 7 أيام عمل.",
  },

  "cards.applyCredit.title": { en: "Apply for a credit card", fr: "Demander une carte de crédit", ar: "التقدم بطلب بطاقة ائتمان" },
  "cards.applyCredit.description": {
    en: "Tell us a bit about your finances so we can review your application.",
    fr: "Parlez-nous un peu de votre situation financière afin que nous puissions examiner votre demande.",
    ar: "أخبرنا قليلاً عن وضعك المالي حتى نتمكن من مراجعة طلبك.",
  },
  "cards.applyCredit.income": { en: "Estimated annual income", fr: "Revenu annuel estimé", ar: "الدخل السنوي التقديري" },
  "cards.applyCredit.incomePlaceholder": { en: "e.g. 35000", fr: "ex. 35000", ar: "مثال: 35000" },
  "cards.applyCredit.employmentStatus": { en: "Employment status", fr: "Statut professionnel", ar: "الحالة الوظيفية" },
  "cards.applyCredit.selectStatus": { en: "Select status", fr: "Sélectionner un statut", ar: "اختر الحالة" },
  "cards.applyCredit.employment.employed": { en: "Employed", fr: "Salarié", ar: "موظف" },
  "cards.applyCredit.employment.selfEmployed": { en: "Self-employed", fr: "Indépendant", ar: "يعمل لحسابه الخاص" },
  "cards.applyCredit.employment.student": { en: "Student", fr: "Étudiant", ar: "طالب" },
  "cards.applyCredit.employment.unemployed": { en: "Unemployed", fr: "Sans emploi", ar: "غير موظف" },
  "cards.applyCredit.employment.retired": { en: "Retired", fr: "Retraité", ar: "متقاعد" },
  "cards.applyCredit.agree": {
    en: "I agree to the credit card terms and conditions and consent to a credit check.",
    fr: "J'accepte les conditions générales de la carte de crédit et consens à une vérification de solvabilité.",
    ar: "أوافق على شروط وأحكام بطاقة الائتمان وأوافق على إجراء فحص ائتماني.",
  },
  "cards.applyCredit.submitting": { en: "Submitting...", fr: "Envoi en cours...", ar: "جارٍ الإرسال..." },
  "cards.applyCredit.submit": { en: "Submit application", fr: "Envoyer la demande", ar: "إرسال الطلب" },
  "cards.applyCredit.successTitle": { en: "Application submitted", fr: "Demande envoyée", ar: "تم إرسال الطلب" },
  "cards.applyCredit.successDescription": {
    en: "Your credit card application is pending review. We'll notify you once it's approved.",
    fr: "Votre demande de carte de crédit est en cours d'examen. Nous vous informerons dès son approbation.",
    ar: "طلب بطاقة الائتمان الخاص بك قيد المراجعة. سنُعلمك فور الموافقة عليه.",
  },
  "cards.applyCredit.appliedOn": { en: "Applied on {date}", fr: "Demande envoyée le {date}", ar: "تم التقديم في {date}" },
};
