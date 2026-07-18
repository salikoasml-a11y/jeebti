import type { Namespace } from "@/lib/i18n/types";

export const payments: Namespace = {
  // Shared contact picker (used by Send Money)
  "payments.contactPicker.search": { en: "Search contacts", fr: "Rechercher des contacts", ar: "البحث في جهات الاتصال" },
  "payments.contactPicker.empty": { en: "No contacts found.", fr: "Aucun contact trouvé.", ar: "لم يتم العثور على جهات اتصال." },
  "payments.contactPicker.jeebtiBadge": { en: "Jeebti", fr: "Jeebti", ar: "جيبتي" },

  // Send Money flow
  "payments.send.page.title": { en: "Send Money", fr: "Envoyer de l'argent", ar: "إرسال الأموال" },
  "payments.send.page.description": {
    en: "Transfer money to a contact or a new payee.",
    fr: "Transférez de l'argent à un contact ou à un nouveau bénéficiaire.",
    ar: "حوّل الأموال إلى جهة اتصال أو مستفيد جديد.",
  },
  "payments.send.tab.contacts": { en: "Contacts", fr: "Contacts", ar: "جهات الاتصال" },
  "payments.send.tab.payNew": { en: "Pay someone new", fr: "Payer un nouveau bénéficiaire", ar: "الدفع لشخص جديد" },

  "payments.send.newRecipient.name": { en: "Recipient name", fr: "Nom du bénéficiaire", ar: "اسم المستفيد" },
  "payments.send.newRecipient.accountNumber": { en: "Account number", fr: "Numéro de compte", ar: "رقم الحساب" },
  "payments.send.newRecipient.sortCode": { en: "Sort code", fr: "Code guichet", ar: "رمز الفرع المصرفي" },
  "payments.send.newRecipient.continue": { en: "Continue", fr: "Continuer", ar: "متابعة" },

  "payments.send.back": { en: "Back", fr: "Retour", ar: "رجوع" },

  "payments.send.amount.label": { en: "Amount", fr: "Montant", ar: "المبلغ" },
  "payments.send.amount.available": { en: "Available: {amount}", fr: "Disponible : {amount}", ar: "المتاح: {amount}" },
  "payments.send.amount.error.invalid": { en: "Enter a valid amount", fr: "Saisissez un montant valide", ar: "أدخل مبلغًا صالحًا" },
  "payments.send.amount.error.exceedsBalance": {
    en: "Amount exceeds your available balance",
    fr: "Le montant dépasse votre solde disponible",
    ar: "المبلغ يتجاوز رصيدك المتاح",
  },
  "payments.send.amount.reference": { en: "Reference (optional)", fr: "Référence (facultatif)", ar: "المرجع (اختياري)" },
  "payments.send.amount.referencePlaceholder": { en: "What's this for?", fr: "À quoi cela correspond-il ?", ar: "ما سبب هذا التحويل؟" },
  "payments.send.amount.continue": { en: "Continue", fr: "Continuer", ar: "متابعة" },

  "payments.send.review.sending": { en: "You're sending", fr: "Vous envoyez", ar: "أنت ترسل" },
  "payments.send.review.to": { en: "to {name}", fr: "à {name}", ar: "إلى {name}" },
  "payments.send.review.recipient": { en: "Recipient", fr: "Bénéficiaire", ar: "المستفيد" },
  "payments.send.review.sortCodeAccount": { en: "Sort code · Account", fr: "Code guichet · Compte", ar: "رمز الفرع · الحساب" },
  "payments.send.review.reference": { en: "Reference", fr: "Référence", ar: "المرجع" },
  "payments.send.review.amount": { en: "Amount", fr: "Montant", ar: "المبلغ" },
  "payments.send.review.sending2": { en: "Sending...", fr: "Envoi en cours...", ar: "جارٍ الإرسال..." },
  "payments.send.review.confirmAndSend": { en: "Confirm and send", fr: "Confirmer et envoyer", ar: "تأكيد وإرسال" },

  "payments.send.success.sentTo": { en: "sent to {name}", fr: "envoyé à {name}", ar: "أُرسل إلى {name}" },
  "payments.send.success.newBalance": { en: "New balance:", fr: "Nouveau solde :", ar: "الرصيد الجديد:" },
  "payments.send.success.sendAnother": { en: "Send another", fr: "Envoyer un autre paiement", ar: "إرسال تحويل آخر" },
  "payments.send.success.done": { en: "Done", fr: "Terminé", ar: "تم" },

  "payments.send.toast.error": { en: "Something went wrong", fr: "Une erreur est survenue", ar: "حدث خطأ ما" },

  // Receive Money page
  "payments.receive.page.title": { en: "Receive Money", fr: "Recevoir de l'argent", ar: "استلام الأموال" },
  "payments.receive.page.description": {
    en: "Share your account details or request a specific amount.",
    fr: "Partagez vos coordonnées bancaires ou demandez un montant précis.",
    ar: "شارك تفاصيل حسابك أو اطلب مبلغًا محددًا.",
  },
  "payments.receive.accountDetails.title": { en: "Your account details", fr: "Vos coordonnées bancaires", ar: "تفاصيل حسابك" },
  "payments.receive.accountDetails.accountName": { en: "Account name", fr: "Nom du compte", ar: "اسم الحساب" },
  "payments.receive.accountDetails.iban": { en: "IBAN", fr: "IBAN", ar: "رقم الآيبان" },
  "payments.receive.accountDetails.sortCode": { en: "Sort code", fr: "Code guichet", ar: "رمز الفرع المصرفي" },
  "payments.receive.accountDetails.accountNumber": { en: "Account number", fr: "Numéro de compte", ar: "رقم الحساب" },
  "payments.receive.accountDetails.noAccount": { en: "No account found.", fr: "Aucun compte trouvé.", ar: "لم يتم العثور على حساب." },

  "payments.receive.request.title": { en: "Request a specific amount", fr: "Demander un montant précis", ar: "طلب مبلغ محدد" },
  "payments.receive.request.amount": { en: "Amount", fr: "Montant", ar: "المبلغ" },
  "payments.receive.request.from": { en: "From", fr: "De la part de", ar: "من" },
  "payments.receive.request.fromPlaceholder": { en: "Who are you requesting from?", fr: "À qui adressez-vous cette demande ?", ar: "ممن تطلب هذا المبلغ؟" },
  "payments.receive.request.reference": { en: "Reference (optional)", fr: "Référence (facultatif)", ar: "المرجع (اختياري)" },
  "payments.receive.request.referencePlaceholder": { en: "e.g. Dinner split", fr: "ex. Partage de l'addition", ar: "مثال: تقسيم فاتورة العشاء" },
  "payments.receive.request.creating": { en: "Creating request...", fr: "Création de la demande...", ar: "جارٍ إنشاء الطلب..." },
  "payments.receive.request.create": { en: "Create request", fr: "Créer la demande", ar: "إنشاء الطلب" },
  "payments.receive.request.newRequest": { en: "New request", fr: "Nouvelle demande", ar: "طلب جديد" },
  "payments.receive.request.toast.created": { en: "Payment request created", fr: "Demande de paiement créée", ar: "تم إنشاء طلب الدفع" },
  "payments.receive.request.toast.error": { en: "Something went wrong", fr: "Une erreur est survenue", ar: "حدث خطأ ما" },

  "payments.receive.toast.copied": { en: "Copied", fr: "Copié", ar: "تم النسخ" },
  "payments.receive.toast.linkCopied": { en: "Link copied", fr: "Lien copié", ar: "تم نسخ الرابط" },

  // QR Payments page
  "payments.qr.page.title": { en: "QR Payments", fr: "Paiements QR", ar: "الدفع برمز QR" },
  "payments.qr.page.description": {
    en: "Get paid or pay someone instantly with a QR code.",
    fr: "Recevez ou effectuez un paiement instantané grâce à un code QR.",
    ar: "استلم أو ادفع لشخص فورًا باستخدام رمز QR.",
  },
  "payments.qr.tab.myQr": { en: "My QR", fr: "Mon code QR", ar: "رمز QR الخاص بي" },
  "payments.qr.tab.scan": { en: "Scan to Pay", fr: "Scanner pour payer", ar: "المسح للدفع" },

  "payments.qr.myQr.noAccount": { en: "No account found.", fr: "Aucun compte trouvé.", ar: "لم يتم العثور على حساب." },
  "payments.qr.myQr.share": { en: "Share", fr: "Partager", ar: "مشاركة" },
  "payments.qr.myQr.toast.copied": { en: "Payment details copied", fr: "Coordonnées de paiement copiées", ar: "تم نسخ تفاصيل الدفع" },

  "payments.qr.scan.pointCamera": { en: "Point your camera at a QR code", fr: "Pointez votre caméra vers un code QR", ar: "وجّه الكاميرا نحو رمز QR" },
  "payments.qr.scan.simulate": { en: "Simulate scan (demo)", fr: "Simuler un scan (démo)", ar: "محاكاة المسح (تجريبي)" },
  "payments.qr.scan.orEnterCode": { en: "Or enter code manually", fr: "Ou saisissez le code manuellement", ar: "أو أدخل الرمز يدويًا" },
  "payments.qr.scan.codePlaceholder": { en: "Payment code", fr: "Code de paiement", ar: "رمز الدفع" },
  "payments.qr.scan.useCode": { en: "Use code", fr: "Utiliser le code", ar: "استخدام الرمز" },
  "payments.qr.scan.back": { en: "Back", fr: "Retour", ar: "رجوع" },
  "payments.qr.scan.amount": { en: "Amount", fr: "Montant", ar: "المبلغ" },
  "payments.qr.scan.paying": { en: "Paying...", fr: "Paiement en cours...", ar: "جارٍ الدفع..." },
  "payments.qr.scan.confirmAndPay": { en: "Confirm and pay", fr: "Confirmer et payer", ar: "تأكيد والدفع" },
  "payments.qr.scan.toast.noContacts": {
    en: "No contacts available to simulate a scan",
    fr: "Aucun contact disponible pour simuler un scan",
    ar: "لا توجد جهات اتصال متاحة لمحاكاة المسح",
  },
  "payments.qr.scan.toast.paidSuccess": { en: "{amount} sent to {name}", fr: "{amount} envoyé à {name}", ar: "تم إرسال {amount} إلى {name}" },
  "payments.qr.scan.toast.error": { en: "Something went wrong", fr: "Une erreur est survenue", ar: "حدث خطأ ما" },
};
