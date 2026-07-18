import type { Namespace } from "@/lib/i18n/types";

export const help: Namespace = {
  "help.title": { en: "Help Center", fr: "Centre d'aide", ar: "مركز المساعدة" },
  "help.description": { en: "Find answers or get in touch with our support team", fr: "Trouvez des réponses ou contactez notre équipe d'assistance", ar: "ابحث عن إجابات أو تواصل مع فريق الدعم لدينا" },
  "help.search.placeholder": { en: "Search for answers...", fr: "Rechercher des réponses...", ar: "ابحث عن إجابات..." },
  "help.search.noResults": { en: "No results for “{query}”. Try a different search or contact support below.", fr: "Aucun résultat pour « {query} ». Essayez une autre recherche ou contactez l'assistance ci-dessous.", ar: "لا توجد نتائج لـ “{query}”. جرّب بحثًا مختلفًا أو تواصل مع الدعم أدناه." },
  "help.needItNow.title": { en: "Need it now?", fr: "Besoin d'aide immédiate ?", ar: "هل تحتاج مساعدة فورية؟" },
  "help.needItNow.desc": { en: "Use the live chat button in the bottom corner to talk to a support agent in real time.", fr: "Utilisez le bouton de chat en direct dans le coin inférieur pour parler à un agent d'assistance en temps réel.", ar: "استخدم زر الدردشة المباشرة في الزاوية السفلية للتحدث مع أحد وكلاء الدعم في الوقت الفعلي." },

  // FAQ categories
  "help.category.gettingStarted": { en: "Getting Started", fr: "Prise en main", ar: "البدء" },
  "help.category.payments": { en: "Payments & Transfers", fr: "Paiements et virements", ar: "المدفوعات والتحويلات" },
  "help.category.cards": { en: "Cards", fr: "Cartes", ar: "البطاقات" },
  "help.category.security": { en: "Security", fr: "Sécurité", ar: "الأمان" },
  "help.category.fees": { en: "Fees", fr: "Frais", ar: "الرسوم" },

  // FAQ items — Getting Started
  "help.faq.gs-1.q": { en: "How do I open a Jeebti account?", fr: "Comment ouvrir un compte Jeebti ?", ar: "كيف أفتح حسابًا في Jeebti؟" },
  "help.faq.gs-1.a": {
    en: "Download the app, tap Sign Up, and provide your name, email, phone number, and date of birth. You'll then complete identity verification (KYC) by uploading a photo ID — most accounts are approved within a few minutes.",
    fr: "Téléchargez l'application, appuyez sur Inscription, puis renseignez votre nom, e-mail, numéro de téléphone et date de naissance. Vous devrez ensuite compléter la vérification d'identité (KYC) en téléversant une pièce d'identité — la plupart des comptes sont approuvés en quelques minutes.",
    ar: "حمّل التطبيق واضغط على “إنشاء حساب”، ثم أدخل اسمك وبريدك الإلكتروني ورقم هاتفك وتاريخ ميلادك. بعد ذلك ستكمل عملية التحقق من الهوية (KYC) عبر رفع صورة لوثيقة هوية — تتم الموافقة على معظم الحسابات خلال دقائق معدودة.",
  },
  "help.faq.gs-2.q": { en: "Why is my KYC status still pending?", fr: "Pourquoi mon statut KYC est-il toujours en attente ?", ar: "لماذا لا تزال حالة التحقق من هويتي (KYC) قيد الانتظار؟" },
  "help.faq.gs-2.a": {
    en: "KYC review usually takes under 10 minutes but can take up to 24 hours during busy periods or if your documents need manual review. You can check your current status any time on your Profile page.",
    fr: "L'examen KYC prend généralement moins de 10 minutes, mais peut aller jusqu'à 24 heures en période de forte affluence ou si vos documents nécessitent un examen manuel. Vous pouvez vérifier votre statut à tout moment sur votre page Profil.",
    ar: "عادةً ما تستغرق مراجعة التحقق من الهوية أقل من 10 دقائق، لكنها قد تصل إلى 24 ساعة في أوقات الذروة أو إذا تطلّبت مستنداتك مراجعة يدوية. يمكنك التحقق من حالتك الحالية في أي وقت من صفحة ملفك الشخصي.",
  },
  "help.faq.gs-3.q": { en: "How do I top up my account?", fr: "Comment recharger mon compte ?", ar: "كيف أشحن حسابي؟" },
  "help.faq.gs-3.a": {
    en: "Go to your Wallet and tap Top Up. You can add funds from a linked debit card or an external bank transfer using your account's sort code and account number.",
    fr: "Accédez à votre Portefeuille et appuyez sur Recharger. Vous pouvez ajouter des fonds depuis une carte de débit associée ou par virement bancaire externe en utilisant le code guichet et le numéro de compte.",
    ar: "اذهب إلى محفظتك واضغط على “شحن”. يمكنك إضافة الأموال من بطاقة خصم مرتبطة أو عبر تحويل بنكي خارجي باستخدام رمز الفرع البنكي ورقم الحساب الخاص بك.",
  },
  "help.faq.gs-4.q": { en: "Can I have more than one account?", fr: "Puis-je avoir plusieurs comptes ?", ar: "هل يمكنني امتلاك أكثر من حساب واحد؟" },
  "help.faq.gs-4.a": {
    en: "Each Jeebti profile includes one current account and one savings account by default. Additional savings goals can be created from the Savings tab without opening new accounts.",
    fr: "Chaque profil Jeebti comprend par défaut un compte courant et un compte épargne. Des objectifs d'épargne supplémentaires peuvent être créés depuis l'onglet Épargne sans ouvrir de nouveaux comptes.",
    ar: "يتضمن كل ملف تعريف في Jeebti حسابًا جاريًا وحساب ادخار واحدًا افتراضيًا. يمكنك إنشاء أهداف ادخار إضافية من علامة تبويب الادخار دون فتح حسابات جديدة.",
  },

  // FAQ items — Payments & Transfers
  "help.faq.pay-1.q": { en: "How long do transfers take to arrive?", fr: "Combien de temps mettent les virements à arriver ?", ar: "كم من الوقت تستغرق التحويلات للوصول؟" },
  "help.faq.pay-1.a": {
    en: "Transfers to other Jeebti users are instant. Transfers to external UK bank accounts typically arrive within a few hours and always within one business day.",
    fr: "Les virements vers d'autres utilisateurs Jeebti sont instantanés. Les virements vers des comptes bancaires externes au Royaume-Uni arrivent généralement en quelques heures, et toujours sous un jour ouvré.",
    ar: "التحويلات إلى مستخدمي Jeebti الآخرين تتم فورًا. أما التحويلات إلى حسابات بنكية خارجية في المملكة المتحدة فتصل عادةً خلال ساعات قليلة، وفي جميع الأحوال خلال يوم عمل واحد.",
  },
  "help.faq.pay-2.q": { en: "Is there a limit on how much I can send?", fr: "Y a-t-il une limite au montant que je peux envoyer ?", ar: "هل هناك حد لمبلغ الأموال التي يمكنني إرسالها؟" },
  "help.faq.pay-2.a": {
    en: "Standard accounts can send up to £10,000 per single transfer and £25,000 per day. Verified accounts with a higher trust tier may have increased limits — contact support to request a review.",
    fr: "Les comptes standard peuvent envoyer jusqu'à 10 000 £ par virement et 25 000 £ par jour. Les comptes vérifiés avec un niveau de confiance supérieur peuvent bénéficier de limites plus élevées — contactez l'assistance pour demander une révision.",
    ar: "يمكن للحسابات القياسية إرسال ما يصل إلى 10,000 جنيه إسترليني في التحويل الواحد و25,000 جنيه إسترليني يوميًا. قد تحصل الحسابات الموثّقة ذات مستوى الثقة الأعلى على حدود مرتفعة — تواصل مع الدعم لطلب مراجعة.",
  },
  "help.faq.pay-3.q": { en: "How do I request money from someone?", fr: "Comment demander de l'argent à quelqu'un ?", ar: "كيف أطلب أموالًا من شخص ما؟" },
  "help.faq.pay-3.a": {
    en: "Open Receive from the navigation bar, enter the amount and an optional reference, then share the generated payment link or QR code with the person you're requesting from.",
    fr: "Ouvrez Recevoir depuis la barre de navigation, saisissez le montant et une référence facultative, puis partagez le lien de paiement ou le code QR généré avec la personne concernée.",
    ar: "افتح “استلام” من شريط التنقل، وأدخل المبلغ ومرجعًا اختياريًا، ثم شارك رابط الدفع أو رمز QR الذي تم إنشاؤه مع الشخص الذي تطلب منه الأموال.",
  },
  "help.faq.pay-4.q": { en: "Can I cancel a payment after sending it?", fr: "Puis-je annuler un paiement après l'avoir envoyé ?", ar: "هل يمكنني إلغاء دفعة بعد إرسالها؟" },
  "help.faq.pay-4.a": {
    en: "Payments to other Jeebti users are final once sent because funds settle instantly. If you've sent money to the wrong person, contact support immediately — we can often help you request a refund from the recipient.",
    fr: "Les paiements vers d'autres utilisateurs Jeebti sont définitifs une fois envoyés, car les fonds sont réglés instantanément. Si vous avez envoyé de l'argent à la mauvaise personne, contactez immédiatement l'assistance — nous pouvons souvent vous aider à demander un remboursement au destinataire.",
    ar: "تُعتبر المدفوعات إلى مستخدمي Jeebti الآخرين نهائية بمجرد إرسالها لأن الأموال تُسوّى فورًا. إذا أرسلت أموالًا إلى الشخص الخطأ، تواصل مع الدعم فورًا — يمكننا غالبًا مساعدتك في طلب استرداد المبلغ من المستلم.",
  },

  // FAQ items — Cards
  "help.faq.card-1.q": { en: "How do I freeze my card?", fr: "Comment geler ma carte ?", ar: "كيف أجمّد بطاقتي؟" },
  "help.faq.card-1.a": {
    en: "Open the Cards tab, select the card, and toggle Freeze. This instantly blocks new transactions while keeping the card active for when you unfreeze it — handy if you've misplaced it.",
    fr: "Ouvrez l'onglet Cartes, sélectionnez la carte, puis activez Geler. Cela bloque instantanément les nouvelles transactions tout en gardant la carte active pour quand vous la dégèlerez — pratique si vous l'avez égarée.",
    ar: "افتح علامة تبويب البطاقات، اختر البطاقة، ثم فعّل “تجميد”. يؤدي ذلك إلى حظر المعاملات الجديدة فورًا مع إبقاء البطاقة نشطة عند إلغاء التجميد لاحقًا — مفيد إذا فقدت البطاقة مؤقتًا.",
  },
  "help.faq.card-2.q": { en: "What's the difference between a virtual and physical card?", fr: "Quelle est la différence entre une carte virtuelle et une carte physique ?", ar: "ما الفرق بين البطاقة الافتراضية والبطاقة المادية؟" },
  "help.faq.card-2.a": {
    en: "A virtual card is issued instantly and works for online payments and mobile wallets right away. A physical card is a tangible card posted to your address, typically arriving within 5-7 business days, for use in shops and ATMs.",
    fr: "Une carte virtuelle est émise instantanément et fonctionne immédiatement pour les paiements en ligne et les portefeuilles mobiles. Une carte physique est une carte tangible envoyée à votre adresse, arrivant généralement sous 5 à 7 jours ouvrés, pour une utilisation en magasin et aux distributeurs.",
    ar: "تُصدَر البطاقة الافتراضية فورًا وتعمل مباشرة في المدفوعات عبر الإنترنت والمحافظ الرقمية. أما البطاقة المادية فهي بطاقة ملموسة تُرسَل إلى عنوانك، وتصل عادةً خلال 5-7 أيام عمل، لاستخدامها في المتاجر وأجهزة الصراف الآلي.",
  },
  "help.faq.card-3.q": { en: "How do I set a spending limit on my card?", fr: "Comment définir une limite de dépenses sur ma carte ?", ar: "كيف أحدد حد إنفاق على بطاقتي؟" },
  "help.faq.card-3.a": {
    en: "From the card details screen, tap Set Limit and choose a daily or monthly cap. You'll get a notification if a transaction would take you over the limit, and it will be declined.",
    fr: "Depuis l'écran de détails de la carte, appuyez sur Définir une limite et choisissez un plafond quotidien ou mensuel. Vous recevrez une notification si une transaction dépasse la limite, et elle sera refusée.",
    ar: "من شاشة تفاصيل البطاقة، اضغط على “تحديد حد” واختر حدًا يوميًا أو شهريًا. ستصلك إشعار إذا كانت معاملة ما ستتجاوز الحد، وسيتم رفضها.",
  },
  "help.faq.card-4.q": { en: "My card was lost or stolen — what do I do?", fr: "J'ai perdu ma carte ou elle a été volée — que faire ?", ar: "فقدت بطاقتي أو سُرقت — ماذا أفعل؟" },
  "help.faq.card-4.a": {
    en: "Freeze the card immediately from the Cards tab to block any new transactions, then request a replacement card from the same screen. Report any unauthorised transactions to support so we can investigate.",
    fr: "Gelez immédiatement la carte depuis l'onglet Cartes pour bloquer toute nouvelle transaction, puis demandez une carte de remplacement depuis le même écran. Signalez toute transaction non autorisée à l'assistance afin que nous puissions enquêter.",
    ar: "جمّد البطاقة فورًا من علامة تبويب البطاقات لمنع أي معاملات جديدة، ثم اطلب بطاقة بديلة من نفس الشاشة. أبلغ الدعم عن أي معاملات غير مصرح بها حتى نتمكن من التحقيق فيها.",
  },

  // FAQ items — Security
  "help.faq.sec-1.q": { en: "How do I enable two-factor authentication?", fr: "Comment activer l'authentification à deux facteurs ?", ar: "كيف أفعّل التحقق بخطوتين؟" },
  "help.faq.sec-1.a": {
    en: "Go to Settings > Security and turn on Two-Factor Authentication. You'll scan a QR code with an authenticator app (like Google Authenticator or Authy) and confirm with a 6-digit code to finish setup.",
    fr: "Accédez à Paramètres > Sécurité et activez l'authentification à deux facteurs. Vous scannerez un code QR avec une application d'authentification (comme Google Authenticator ou Authy) et confirmerez avec un code à 6 chiffres pour terminer la configuration.",
    ar: "اذهب إلى الإعدادات > الأمان وفعّل التحقق بخطوتين. ستقوم بمسح رمز QR باستخدام تطبيق مصادقة (مثل Google Authenticator أو Authy) وتأكيد الإعداد برمز مكوّن من 6 أرقام.",
  },
  "help.faq.sec-2.q": { en: "What should I do if I see a device I don't recognise?", fr: "Que faire si je vois un appareil que je ne reconnais pas ?", ar: "ماذا أفعل إذا رأيت جهازًا لا أتعرف عليه؟" },
  "help.faq.sec-2.a": {
    en: "Go to Settings > Security > Devices and remove any device you don't recognise immediately. We also recommend enabling two-factor authentication and reviewing your recent transactions for anything unfamiliar.",
    fr: "Accédez à Paramètres > Sécurité > Appareils et supprimez immédiatement tout appareil que vous ne reconnaissez pas. Nous recommandons également d'activer l'authentification à deux facteurs et de vérifier vos transactions récentes.",
    ar: "اذهب إلى الإعدادات > الأمان > الأجهزة، وأزل فورًا أي جهاز لا تتعرف عليه. كما ننصح بتفعيل التحقق بخطوتين ومراجعة معاملاتك الأخيرة بحثًا عن أي نشاط غير مألوف.",
  },
  "help.faq.sec-3.q": { en: "How does Jeebti protect me from fraud?", fr: "Comment Jeebti me protège-t-il contre la fraude ?", ar: "كيف يحميني Jeebti من الاحتيال؟" },
  "help.faq.sec-3.a": {
    en: "We monitor transactions in real time for unusual patterns, flag suspicious payments before they complete, and notify you instantly of new device sign-ins. Any flagged activity appears under Settings > Security > Fraud alerts.",
    fr: "Nous surveillons les transactions en temps réel pour détecter les schémas inhabituels, signalons les paiements suspects avant leur finalisation et vous notifions instantanément de toute nouvelle connexion. Toute activité signalée apparaît sous Paramètres > Sécurité > Alertes de fraude.",
    ar: "نراقب المعاملات في الوقت الفعلي بحثًا عن أنماط غير معتادة، ونحدد المدفوعات المشبوهة قبل اكتمالها، ونخطرك فورًا بأي تسجيل دخول من جهاز جديد. يظهر أي نشاط مشبوه ضمن الإعدادات > الأمان > تنبيهات الاحتيال.",
  },
  "help.faq.sec-4.q": { en: "Is biometric login safe?", fr: "La connexion biométrique est-elle sûre ?", ar: "هل تسجيل الدخول بالبصمة آمن؟" },
  "help.faq.sec-4.a": {
    en: "Yes. Biometric login uses your device's built-in Face ID, Touch ID, or fingerprint sensor — your biometric data never leaves your device or gets sent to Jeebti's servers.",
    fr: "Oui. La connexion biométrique utilise le capteur Face ID, Touch ID ou d'empreinte digitale intégré à votre appareil — vos données biométriques ne quittent jamais votre appareil et ne sont jamais envoyées aux serveurs de Jeebti.",
    ar: "نعم. يستخدم تسجيل الدخول بالبصمة مستشعر بصمة الوجه أو بصمة الإصبع المدمج في جهازك — لا تغادر بياناتك الحيوية جهازك مطلقًا ولا تُرسَل إلى خوادم Jeebti.",
  },

  // FAQ items — Fees
  "help.faq.fee-1.q": { en: "Does Jeebti charge monthly account fees?", fr: "Jeebti facture-t-il des frais mensuels de compte ?", ar: "هل يفرض Jeebti رسومًا شهرية على الحساب؟" },
  "help.faq.fee-1.a": {
    en: "No, standard current and savings accounts are free with no monthly maintenance fees. Optional premium features, like additional physical cards, may carry a small one-off fee shown before you confirm.",
    fr: "Non, les comptes courants et d'épargne standard sont gratuits, sans frais de tenue de compte mensuels. Les fonctionnalités premium optionnelles, comme des cartes physiques supplémentaires, peuvent entraîner de petits frais uniques affichés avant confirmation.",
    ar: "لا، الحسابات الجارية وحسابات الادخار القياسية مجانية دون أي رسوم صيانة شهرية. قد تترتب على الميزات الإضافية الاختيارية، مثل البطاقات المادية الإضافية، رسوم بسيطة تُدفع لمرة واحدة وتظهر قبل التأكيد.",
  },
  "help.faq.fee-2.q": { en: "Are there fees for sending money abroad?", fr: "Y a-t-il des frais pour envoyer de l'argent à l'étranger ?", ar: "هل هناك رسوم لإرسال الأموال إلى الخارج؟" },
  "help.faq.fee-2.a": {
    en: "Domestic UK transfers are always free. International transfers carry a small percentage-based fee plus the exchange rate margin, both shown clearly before you confirm the transfer.",
    fr: "Les virements nationaux au Royaume-Uni sont toujours gratuits. Les virements internationaux comportent des frais proportionnels modestes, ainsi qu'une marge de change, tous deux clairement indiqués avant la confirmation du virement.",
    ar: "التحويلات المحلية داخل المملكة المتحدة مجانية دائمًا. أما التحويلات الدولية فتخضع لرسوم بسيطة كنسبة مئوية بالإضافة إلى هامش سعر الصرف، ويظهر كلاهما بوضوح قبل تأكيد التحويل.",
  },
  "help.faq.fee-3.q": { en: "Do I get charged for ATM withdrawals?", fr: "Suis-je facturé pour les retraits au distributeur ?", ar: "هل تُفرض عليّ رسوم عند السحب من أجهزة الصراف الآلي؟" },
  "help.faq.fee-3.a": {
    en: "The first £250 withdrawn per month is free. After that, a flat £1.50 fee applies per withdrawal. Your remaining free allowance is shown at the top of the ATM withdrawal screen.",
    fr: "Les premiers 250 £ retirés chaque mois sont gratuits. Au-delà, des frais fixes de 1,50 £ s'appliquent par retrait. Votre solde d'allocation gratuite restant est affiché en haut de l'écran de retrait au distributeur.",
    ar: "أول 250 جنيهًا إسترلينيًا يتم سحبها شهريًا مجانية. بعد ذلك، تُطبَّق رسوم ثابتة قدرها 1.50 جنيه إسترليني لكل عملية سحب. يظهر رصيدك المجاني المتبقي أعلى شاشة السحب من الصراف الآلي.",
  },

  // Contact support card
  "help.contact.title": { en: "Contact support", fr: "Contacter l'assistance", ar: "تواصل مع الدعم" },
  "help.contact.desc": { en: "Can't find your answer? Send us a message", fr: "Vous ne trouvez pas votre réponse ? Envoyez-nous un message", ar: "لم تجد إجابتك؟ أرسل لنا رسالة" },
  "help.contact.field.subject": { en: "Subject", fr: "Objet", ar: "الموضوع" },
  "help.contact.field.subject.placeholder": { en: "Briefly describe your issue", fr: "Décrivez brièvement votre problème", ar: "صِف مشكلتك باختصار" },
  "help.contact.field.category": { en: "Category", fr: "Catégorie", ar: "الفئة" },
  "help.contact.field.category.placeholder": { en: "Select a category", fr: "Sélectionnez une catégorie", ar: "اختر فئة" },
  "help.contact.category.account": { en: "Account", fr: "Compte", ar: "الحساب" },
  "help.contact.category.card": { en: "Card", fr: "Carte", ar: "البطاقة" },
  "help.contact.category.payment": { en: "Payment", fr: "Paiement", ar: "الدفع" },
  "help.contact.category.kyc": { en: "Identity verification (KYC)", fr: "Vérification d'identité (KYC)", ar: "التحقق من الهوية (KYC)" },
  "help.contact.category.technical": { en: "Technical issue", fr: "Problème technique", ar: "مشكلة تقنية" },
  "help.contact.category.other": { en: "Other", fr: "Autre", ar: "أخرى" },
  "help.contact.field.message": { en: "Message", fr: "Message", ar: "الرسالة" },
  "help.contact.field.message.placeholder": { en: "Tell us more about what's going on", fr: "Donnez-nous plus de détails sur votre problème", ar: "أخبرنا بمزيد من التفاصيل عمّا يحدث" },
  "help.contact.submit": { en: "Submit ticket", fr: "Envoyer le ticket", ar: "إرسال التذكرة" },
  "help.contact.toast.missingFields": { en: "Please fill in all fields", fr: "Veuillez remplir tous les champs", ar: "يرجى تعبئة جميع الحقول" },
  "help.contact.toast.submitted": { en: "Support ticket submitted — #{ticketId}. We'll respond within 24 hours.", fr: "Ticket d'assistance envoyé — #{ticketId}. Nous vous répondrons sous 24 heures.", ar: "تم إرسال تذكرة الدعم — #{ticketId}. سنرد عليك خلال 24 ساعة." },

  // Live chat sheet
  "help.chat.triggerLabel": { en: "Live chat", fr: "Chat en direct", ar: "دردشة مباشرة" },
  "help.chat.title": { en: "Live chat support", fr: "Assistance par chat en direct", ar: "دعم الدردشة المباشرة" },
  "help.chat.desc": { en: "Typically replies in under a minute", fr: "Réponse généralement en moins d'une minute", ar: "الرد عادةً في أقل من دقيقة" },
  "help.chat.inputPlaceholder": { en: "Type a message...", fr: "Écrivez un message...", ar: "اكتب رسالة..." },
  "help.chat.inputAriaLabel": { en: "Chat message", fr: "Message de chat", ar: "رسالة الدردشة" },
  "help.chat.greeting": { en: "Hi there! I'm Jeebti's support assistant. How can I help you today?", fr: "Bonjour ! Je suis l'assistant d'assistance Jeebti. Comment puis-je vous aider aujourd'hui ?", ar: "مرحبًا! أنا مساعد الدعم في Jeebti. كيف يمكنني مساعدتك اليوم؟" },
  "help.chat.reply1": {
    en: "Thanks for reaching out! I'm looking into your account now — this'll just take a moment.",
    fr: "Merci de nous avoir contactés ! Je consulte votre compte dès maintenant — cela ne prendra qu'un instant.",
    ar: "شكرًا لتواصلك معنا! أنا أطّلع على حسابك الآن — سيستغرق ذلك لحظة فقط.",
  },
  "help.chat.reply2": {
    en: "I can see your recent activity. Could you tell me a bit more about the issue you're experiencing?",
    fr: "Je peux voir votre activité récente. Pouvez-vous m'en dire un peu plus sur le problème que vous rencontrez ?",
    ar: "يمكنني رؤية نشاطك الأخير. هل يمكنك إخباري بمزيد من التفاصيل حول المشكلة التي تواجهها؟",
  },
  "help.chat.reply3": {
    en: "Got it, I've logged this for our support team. You'll also get a confirmation by email within 24 hours.",
    fr: "Compris, j'ai transmis cela à notre équipe d'assistance. Vous recevrez également une confirmation par e-mail sous 24 heures.",
    ar: "تم، لقد سجّلت هذا لفريق الدعم لدينا. ستصلك أيضًا رسالة تأكيد عبر البريد الإلكتروني خلال 24 ساعة.",
  },
};
