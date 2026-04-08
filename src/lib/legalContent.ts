import type { Language } from '../data/translations';

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalDocumentContent {
  title: string;
  lead: string;
  updatedAt: string;
  framework: string[];
  sections: LegalSection[];
  contactBody: string;
  note: string;
}

export const COMPANY_LEGAL_CONTACT = {
  name: 'KRANTAS Group',
  email: 'info@krantas.uz',
  phone: '+998 90 330 00 00',
  address: '100170, Tashkent, Uzbekistan',
};

const PRIVACY_POLICY_CONTENT_BY_LANGUAGE: Record<Language, LegalDocumentContent> = {
  en: {
    title: 'Privacy Policy',
    lead:
      'This Privacy Policy explains how KRANTAS Group collects, uses, stores, and protects personal information submitted through the website and related communication channels.',
    updatedAt: 'March 17, 2026',
    framework: [
      'Law of the Republic of Uzbekistan “On Personal Data” No. ZRU-547 dated July 2, 2019.',
      'Law of the Republic of Uzbekistan “On Electronic Commerce” No. ZRU-792 dated September 29, 2022, where digital inquiries and online business communication are involved.',
      'Cabinet of Ministers Resolution No. 71 dated February 8, 2020 regarding the State Register of Personal Data Databases, where applicable.',
    ],
    sections: [
      {
        id: 'what-we-collect',
        title: '1. Personal Data We Collect',
        paragraphs: [
          'We may collect information you provide when you submit a contact form, vacancy application, service request, dealer inquiry, or other business communication through the website.',
        ],
        bullets: [
          'Name, company name, position, phone number, email address, and language preference.',
          'Inquiry details such as subject, product interest, service needs, message content, or recruitment-related information.',
          'Technical data such as IP address, browser information, consent choices, and security or usage events needed to operate the website.',
        ],
      },
      {
        id: 'how-we-use',
        title: '2. Why We Use the Data',
        paragraphs: [
          'We use personal data to respond to inquiries, coordinate sales and service communication, review employment applications, maintain website security, improve website performance, and comply with legal obligations.',
          'Where you request a quote, service support, dealer contact, or project discussion, your information may also be used for pre-contractual communication and internal routing inside KRANTAS Group.',
        ],
      },
      {
        id: 'cookies',
        title: '3. Cookies, Analytics, and Embedded Services',
        paragraphs: [
          'The website uses necessary technologies to keep the site secure and functional. Optional analytics technologies are used only according to the user’s consent settings.',
          'Services such as Google Maps, Telegram links, or analytics tools may process technical interaction data under their own terms when you choose to use them.',
        ],
      },
      {
        id: 'sharing',
        title: '4. Sharing and Retention',
        paragraphs: [
          'We do not sell personal data. We may share personal data with hosting providers, technical vendors, analytics providers, legal advisers, or authorities where this is necessary for site operations, business follow-up, legal compliance, or protection of KRANTAS rights.',
          'Personal data is retained only for as long as reasonably necessary for the stated purpose, internal record-keeping, or legal, tax, employment, audit, and dispute-management requirements.',
        ],
      },
      {
        id: 'security',
        title: '5. Security and Data Subject Rights',
        paragraphs: [
          'KRANTAS Group applies technical and organizational measures intended to protect information against unauthorized access, misuse, alteration, or loss. However, no public internet service can guarantee absolute security.',
          'Subject to applicable law, you may request access, correction, updating, deletion where legally permitted, or withdrawal of consent for processing that depends on consent. We may ask for reasonable identity verification before acting on a request.',
        ],
      },
      {
        id: 'updates',
        title: '6. Updates to This Policy',
        paragraphs: [
          'We may revise this Privacy Policy when website features, internal processes, service providers, or legal requirements change. The date shown on this page reflects the latest review date.',
        ],
      },
    ],
    contactBody:
      'For privacy questions or requests, contact KRANTAS Group at info@krantas.uz, by phone at +998 71 262 23 61, or by written correspondence to our Tashkent office.',
    note:
      'This policy is drafted for the current KRANTAS website and should be reviewed again if the site adds user accounts, online payments, new tracking tools, or direct online contracting.',
  },
  ru: {
    title: 'Политика конфиденциальности',
    lead:
      'Настоящая Политика конфиденциальности объясняет, как KRANTAS Group собирает, использует, хранит и защищает персональные данные, передаваемые через сайт и связанные каналы связи.',
    updatedAt: '17 марта 2026',
    framework: [
      'Закон Республики Узбекистан «О персональных данных» № ЗРУ-547 от 2 июля 2019 года.',
      'Закон Республики Узбекистан «Об электронной коммерции» № ЗРУ-792 от 29 сентября 2022 года в части электронного делового взаимодействия.',
      'Постановление Кабинета Министров № 71 от 8 февраля 2020 года о Государственном реестре баз персональных данных, где применимо.',
    ],
    sections: [
      {
        id: 'what-we-collect',
        title: '1. Какие данные мы собираем',
        paragraphs: [
          'Мы можем собирать сведения, которые вы предоставляете при отправке формы обратной связи, отклика на вакансию, сервисного запроса, дилерского обращения или иного делового сообщения через сайт.',
        ],
        bullets: [
          'Имя, название компании, должность, номер телефона, адрес электронной почты и предпочитаемый язык общения.',
          'Данные обращения: тема, интересующий продукт, сервисные потребности, текст сообщения или информация, связанная с трудоустройством.',
          'Технические данные: IP-адрес, сведения о браузере, настройки согласия, события безопасности и использования, необходимые для работы сайта.',
        ],
      },
      {
        id: 'how-we-use',
        title: '2. Для чего мы используем данные',
        paragraphs: [
          'Мы используем персональные данные для ответа на запросы, координации продаж и сервисного взаимодействия, рассмотрения заявок на трудоустройство, обеспечения безопасности сайта, улучшения его работы и соблюдения требований законодательства.',
          'Если вы запрашиваете коммерческое предложение, сервисную поддержку, контакт дилера или обсуждение проекта, ваши данные также могут использоваться для преддоговорной коммуникации и внутренней маршрутизации внутри KRANTAS Group.',
        ],
      },
      {
        id: 'cookies',
        title: '3. Cookie-файлы, аналитика и встроенные сервисы',
        paragraphs: [
          'Сайт использует необходимые технологии для безопасной и корректной работы. Дополнительные аналитические технологии применяются только в соответствии с настройками согласия пользователя.',
          'Сервисы вроде Google Maps, ссылок Telegram или аналитических инструментов могут обрабатывать технические данные взаимодействия в соответствии со своими собственными правилами, если вы решаете ими воспользоваться.',
        ],
      },
      {
        id: 'sharing',
        title: '4. Передача и хранение данных',
        paragraphs: [
          'Мы не продаем персональные данные. Мы можем передавать их хостинг-провайдерам, техническим подрядчикам, аналитическим сервисам, юридическим консультантам или государственным органам, если это необходимо для работы сайта, деловой обработки обращений, соблюдения закона или защиты прав KRANTAS.',
          'Персональные данные хранятся только столько времени, сколько разумно необходимо для заявленной цели, внутреннего учета или требований законодательства, налогообложения, трудовых отношений, аудита и урегулирования споров.',
        ],
      },
      {
        id: 'security',
        title: '5. Безопасность и права субъекта данных',
        paragraphs: [
          'KRANTAS Group применяет технические и организационные меры, направленные на защиту информации от несанкционированного доступа, неправомерного использования, изменения или утраты. При этом ни один публичный интернет-сервис не может гарантировать абсолютную безопасность.',
          'В пределах применимого законодательства вы можете запросить доступ, исправление, обновление, удаление данных там, где это допустимо законом, либо отзыв согласия на обработку, основанную на согласии. До выполнения запроса мы можем запросить разумное подтверждение личности.',
        ],
      },
      {
        id: 'updates',
        title: '6. Обновления настоящей политики',
        paragraphs: [
          'Мы можем пересматривать настоящую Политику конфиденциальности при изменении функций сайта, внутренних процессов, поставщиков услуг или требований законодательства. Дата на этой странице отражает дату последнего пересмотра.',
        ],
      },
    ],
    contactBody:
      'По вопросам конфиденциальности и запросам, связанным с персональными данными, свяжитесь с KRANTAS Group по адресу info@krantas.uz, по телефону +998 71 262 23 61 или письменно через наш офис в Ташкенте.',
    note:
      'Настоящая политика подготовлена для текущей версии сайта KRANTAS и должна быть пересмотрена повторно, если на сайте появятся личные кабинеты, онлайн-платежи, новые инструменты отслеживания или прямое онлайн-заключение договоров.',
  },
  uz: {
    title: 'Maxfiylik siyosati',
    lead:
      'Ushbu Maxfiylik siyosati KRANTAS Group sayt va unga bog‘liq aloqa kanallari orqali yuborilgan shaxsiy ma’lumotlarni qanday yig‘ishi, ishlatishi, saqlashi va himoya qilishini tushuntiradi.',
    updatedAt: '2026-yil 17-mart',
    framework: [
      'O‘zbekiston Respublikasining 2019-yil 2-iyuldagi O‘RQ-547-son “Shaxsga doir ma’lumotlar to‘g‘risida”gi Qonuni.',
      'Raqamli biznes muloqoti bilan bog‘liq hollarda O‘zbekiston Respublikasining 2022-yil 29-sentabrdagi O‘RQ-792-son “Elektron tijorat to‘g‘risida”gi Qonuni.',
      'Tegishli holatlarda shaxsga doir ma’lumotlar bazalari davlat reyestri bo‘yicha 2020-yil 8-fevraldagi 71-son Vazirlar Mahkamasi qarori.',
    ],
    sections: [
      {
        id: 'what-we-collect',
        title: '1. Qanday ma’lumotlarni yig‘amiz',
        paragraphs: [
          'Siz aloqa formasi, vakansiyaga ariza, servis so‘rovi, dilerga murojaat yoki sayt orqali boshqa biznes xabar yuborganingizda taqdim etgan ma’lumotlarni yig‘ishimiz mumkin.',
        ],
        bullets: [
          'Ism, kompaniya nomi, lavozim, telefon raqami, elektron pochta manzili va til afzalligi.',
          'Murojaat tafsilotlari: mavzu, qiziqtirgan mahsulot, servis ehtiyoji, xabar matni yoki ishga qabul bilan bog‘liq ma’lumotlar.',
          'Saytni ishlatish uchun zarur bo‘lgan IP-manzil, brauzer ma’lumotlari, rozilik tanlovlari, xavfsizlik va foydalanish hodisalari kabi texnik ma’lumotlar.',
        ],
      },
      {
        id: 'how-we-use',
        title: '2. Ma’lumotlardan nima uchun foydalanamiz',
        paragraphs: [
          'Biz shaxsiy ma’lumotlardan so‘rovlarga javob berish, savdo va servis muloqotini muvofiqlashtirish, ishga qabul arizalarini ko‘rib chiqish, sayt xavfsizligini ta’minlash, sayt ish faoliyatini yaxshilash va qonuniy majburiyatlarni bajarish uchun foydalanamiz.',
          'Agar siz tijorat taklifi, servis yordami, diler bilan aloqa yoki loyiha muhokamasini so‘rasangiz, ma’lumotlaringiz KRANTAS Group ichidagi oldi-shartnomaviy muloqot va ichki yo‘naltirish uchun ham ishlatilishi mumkin.',
        ],
      },
      {
        id: 'cookies',
        title: '3. Cookie fayllar, analitika va tashqi servislar',
        paragraphs: [
          'Sayt xavfsiz va barqaror ishlashi uchun zarur texnologiyalardan foydalanadi. Qo‘shimcha analitik texnologiyalar faqat foydalanuvchi roziligiga muvofiq qo‘llaniladi.',
          'Google Maps, Telegram havolalari yoki analitika vositalari kabi servislar, agar siz ulardan foydalansangiz, o‘z qoidalariga muvofiq texnik o‘zaro aloqa ma’lumotlarini qayta ishlashi mumkin.',
        ],
      },
      {
        id: 'sharing',
        title: '4. Ma’lumotlarni uzatish va saqlash',
        paragraphs: [
          'Biz shaxsiy ma’lumotlarni sotmaymiz. Zarur bo‘lganda saytni yuritish, biznes murojaatlarni qayta ishlash, qonunchilikka rioya qilish yoki KRANTAS huquqlarini himoya qilish maqsadida ma’lumotlarni hosting provayderlari, texnik yetkazib beruvchilar, analitika xizmatlari, yuridik maslahatchilar yoki vakolatli organlarga taqdim etishimiz mumkin.',
          'Shaxsiy ma’lumotlar faqat ko‘rsatilgan maqsad, ichki hisob, qonuniy, soliq, mehnat, audit va nizolarni boshqarish talablari uchun zarur bo‘lgan muddat davomida saqlanadi.',
        ],
      },
      {
        id: 'security',
        title: '5. Xavfsizlik va ma’lumot subyektining huquqlari',
        paragraphs: [
          'KRANTAS Group ma’lumotlarni ruxsatsiz kirish, noto‘g‘ri foydalanish, o‘zgartirish yoki yo‘qotilishdan himoya qilishga qaratilgan texnik va tashkiliy choralarni qo‘llaydi. Shunga qaramay, hech bir ommaviy internet xizmati mutlaq xavfsizlikni kafolatlay olmaydi.',
          'Amaldagi qonunchilikka muvofiq siz ma’lumotlarga kirish, ularni tuzatish, yangilash, qonun ruxsat etgan hollarda o‘chirish yoki rozilikka asoslangan qayta ishlash uchun bergan roziligingizni qaytarib olishni so‘rashingiz mumkin. So‘rovni bajarishdan oldin shaxsingizni oqilona tekshirishimiz mumkin.',
        ],
      },
      {
        id: 'updates',
        title: '6. Ushbu siyosatga o‘zgartirishlar',
        paragraphs: [
          'Sayt funksiyalari, ichki jarayonlar, xizmat ko‘rsatuvchi provayderlar yoki qonunchilik talablari o‘zgarganda ushbu Maxfiylik siyosatini yangilashimiz mumkin. Ushbu sahifada ko‘rsatilgan sana oxirgi ko‘rib chiqish sanasini bildiradi.',
        ],
      },
    ],
    contactBody:
      'Maxfiylik bo‘yicha savollar yoki so‘rovlar uchun KRANTAS Group bilan info@krantas.uz manzili, +998 71 262 23 61 telefoni yoki Toshkentdagi ofisimiz orqali yozma tarzda bog‘lanishingiz mumkin.',
    note:
      'Ushbu siyosat KRANTAS saytining amaldagi holati uchun tayyorlangan va saytga foydalanuvchi akkauntlari, onlayn to‘lovlar, yangi kuzatuv vositalari yoki to‘g‘ridan-to‘g‘ri onlayn shartnoma funksiyalari qo‘shilsa, qayta ko‘rib chiqilishi kerak.',
  },
  de: {
    title: 'Datenschutzrichtlinie',
    lead:
      'Diese Datenschutzrichtlinie erläutert, wie KRANTAS Group personenbezogene Daten erfasst, verwendet, speichert und schützt, die über die Website und zugehörige Kommunikationskanäle übermittelt werden.',
    updatedAt: '17. März 2026',
    framework: [
      'Gesetz der Republik Usbekistan „Über personenbezogene Daten“ Nr. ZRU-547 vom 2. Juli 2019.',
      'Gesetz der Republik Usbekistan „Über den elektronischen Handel“ Nr. ZRU-792 vom 29. September 2022, soweit elektronische geschäftliche Kommunikation betroffen ist.',
      'Beschluss des Ministerkabinetts Nr. 71 vom 8. Februar 2020 über das staatliche Register personenbezogener Datenbanken, soweit anwendbar.',
    ],
    sections: [
      {
        id: 'what-we-collect',
        title: '1. Welche personenbezogenen Daten wir erheben',
        paragraphs: [
          'Wir können Daten erfassen, die Sie bereitstellen, wenn Sie ein Kontaktformular, eine Bewerbung, eine Serviceanfrage, eine Händleranfrage oder eine andere geschäftliche Mitteilung über die Website senden.',
        ],
        bullets: [
          'Name, Firmenname, Position, Telefonnummer, E-Mail-Adresse und Sprachpräferenz.',
          'Angaben zur Anfrage wie Thema, Produktinteresse, Servicebedarf, Nachrichteninhalt oder bewerbungsbezogene Informationen.',
          'Technische Daten wie IP-Adresse, Browserinformationen, Einwilligungseinstellungen sowie Sicherheits- und Nutzungsereignisse, die für den Betrieb der Website erforderlich sind.',
        ],
      },
      {
        id: 'how-we-use',
        title: '2. Warum wir die Daten verwenden',
        paragraphs: [
          'Wir verwenden personenbezogene Daten, um auf Anfragen zu reagieren, Vertriebs- und Servicekommunikation zu koordinieren, Bewerbungen zu prüfen, die Website zu schützen, ihre Leistung zu verbessern und gesetzliche Pflichten zu erfüllen.',
          'Wenn Sie ein Angebot, Serviceunterstützung, Händlerkontakt oder eine Projektbesprechung anfragen, können Ihre Daten außerdem für vorvertragliche Kommunikation und interne Weiterleitung innerhalb der KRANTAS Group verwendet werden.',
        ],
      },
      {
        id: 'cookies',
        title: '3. Cookies, Analytik und eingebettete Dienste',
        paragraphs: [
          'Die Website verwendet notwendige Technologien, um sicher und funktionsfähig zu bleiben. Optionale Analysetechnologien werden nur entsprechend den Einwilligungseinstellungen des Nutzers eingesetzt.',
          'Dienste wie Google Maps, Telegram-Links oder Analysetools können technische Interaktionsdaten nach ihren eigenen Bedingungen verarbeiten, wenn Sie sich für deren Nutzung entscheiden.',
        ],
      },
      {
        id: 'sharing',
        title: '4. Weitergabe und Speicherdauer',
        paragraphs: [
          'Wir verkaufen keine personenbezogenen Daten. Wir können personenbezogene Daten an Hosting-Anbieter, technische Dienstleister, Analyseanbieter, Rechtsberater oder Behörden weitergeben, soweit dies für den Betrieb der Website, geschäftliche Nachverfolgung, rechtliche Pflichten oder den Schutz der Rechte von KRANTAS erforderlich ist.',
          'Personenbezogene Daten werden nur so lange gespeichert, wie es für den angegebenen Zweck, die interne Dokumentation oder gesetzliche, steuerliche, arbeitsrechtliche, prüfungsbezogene und streitbezogene Anforderungen vernünftigerweise erforderlich ist.',
        ],
      },
      {
        id: 'security',
        title: '5. Sicherheit und Rechte der betroffenen Person',
        paragraphs: [
          'KRANTAS Group setzt technische und organisatorische Maßnahmen ein, um Informationen vor unbefugtem Zugriff, Missbrauch, Veränderung oder Verlust zu schützen. Dennoch kann kein öffentlicher Internetdienst absolute Sicherheit garantieren.',
          'Vorbehaltlich des anwendbaren Rechts können Sie Auskunft, Berichtigung, Aktualisierung, Löschung soweit gesetzlich zulässig oder den Widerruf einer einwilligungsbasierten Verarbeitung verlangen. Vor der Bearbeitung eines Antrags können wir einen angemessenen Identitätsnachweis verlangen.',
        ],
      },
      {
        id: 'updates',
        title: '6. Änderungen dieser Richtlinie',
        paragraphs: [
          'Wir können diese Datenschutzrichtlinie überarbeiten, wenn sich Website-Funktionen, interne Prozesse, Dienstleister oder gesetzliche Anforderungen ändern. Das auf dieser Seite angegebene Datum zeigt das Datum der letzten Prüfung an.',
        ],
      },
    ],
    contactBody:
      'Bei Fragen zum Datenschutz oder entsprechenden Anfragen kontaktieren Sie KRANTAS Group unter info@krantas.uz, telefonisch unter +998 71 262 23 61 oder schriftlich über unser Büro in Taschkent.',
    note:
      'Diese Richtlinie wurde für die aktuelle KRANTAS-Website erstellt und sollte erneut abgestimmt werden, falls Benutzerkonten, Online-Zahlungen, neue Tracking-Werkzeuge oder direkte Online-Vertragsabschlüsse eingeführt werden.',
  },
};

const TERMS_OF_SERVICE_CONTENT_BY_LANGUAGE: Record<Language, LegalDocumentContent> = {
  en: {
    title: 'Terms of Service',
    lead:
      'These Terms of Service govern access to and use of the KRANTAS Group website. The website is intended primarily for corporate, industrial, recruitment, dealer, and service communication.',
    updatedAt: 'March 17, 2026',
    framework: [
      'Applicable civil legislation of the Republic of Uzbekistan.',
      'Law of the Republic of Uzbekistan “On Electronic Commerce” No. ZRU-792 dated September 29, 2022, where website interactions create electronic business communication.',
      'Applicable rules on advertising, intellectual property, data protection, and unfair competition in the Republic of Uzbekistan.',
    ],
    sections: [
      {
        id: 'scope',
        title: '1. Scope and Nature of the Website',
        paragraphs: [
          'By using this website, you agree to use it lawfully and in a way that does not interfere with the website, KRANTAS operations, other visitors, or connected systems.',
          'The website is informational and business-oriented. Unless expressly stated in a separate written contract, quotation, or signed supply agreement, website materials do not themselves create a binding commercial offer or supply obligation.',
        ],
      },
      {
        id: 'product-info',
        title: '2. Product and Service Information',
        paragraphs: [
          'Product descriptions, specifications, application examples, photographs, and service information are provided for general business information only. Configurations, capacities, availability, and technical characteristics may change without prior website notice.',
          'Submitting an inquiry, service request, or dealer contact form does not create a purchase agreement, employment relationship, guaranteed timeline, or public offer unless confirmed separately in writing.',
        ],
      },
      {
        id: 'acceptable-use',
        title: '3. Acceptable Use',
        paragraphs: [
          'You must not use the website to transmit unlawful, infringing, malicious, misleading, or technically harmful content or to attempt unauthorized access to KRANTAS systems.',
        ],
        bullets: [
          'No scraping abuse, denial-of-service behavior, malicious code, or credential attacks.',
          'No unlawful use of dealer, employee, vacancy, or technical information published on the site.',
          'No copying or reuse of site materials in a way that infringes KRANTAS or third-party rights.',
        ],
      },
      {
        id: 'intellectual-property',
        title: '4. Intellectual Property',
        paragraphs: [
          'Unless otherwise stated, the website design, trademarks, texts, graphics, product materials, and other content are owned by KRANTAS Group or used under applicable rights and permissions.',
          'You may view or download website materials only for legitimate internal review or business communication with KRANTAS. Any broader reproduction, publication, resale, or derivative use requires prior written permission.',
        ],
      },
      {
        id: 'availability',
        title: '5. Third-Party Services, Availability, and Liability',
        paragraphs: [
          'The website may contain links to third-party services such as maps, messaging channels, and external publications. KRANTAS is not responsible for the independent content, availability, or legal terms of those third-party resources.',
          'KRANTAS aims to keep the website accurate and available, but does not guarantee uninterrupted access, error-free operation, or the absence of all vulnerabilities. To the maximum extent permitted by law, KRANTAS disclaims liability for indirect, incidental, or consequential losses arising solely from use of the website as an informational resource.',
        ],
      },
      {
        id: 'governing-law',
        title: '6. Governing Law and Disputes',
        paragraphs: [
          'These Terms are governed by the laws of the Republic of Uzbekistan. Unless mandatory law requires otherwise, disputes connected specifically with the website shall be resolved by the competent courts of Uzbekistan.',
          'Commercial supply, warranty, recruitment, procurement, defense, and project obligations are governed separately by the relevant signed contract, tender, or procurement documentation.',
        ],
      },
    ],
    contactBody:
      'Questions about these Terms may be directed to KRANTAS Group at info@krantas.uz or by phone at +998 71 262 23 61.',
    note:
      'These Terms are drafted for the current public website and should be aligned again if KRANTAS launches account-based services, online contracting, or direct online sales.',
  },
  ru: {
    title: 'Условия использования',
    lead:
      'Настоящие Условия использования регулируют доступ к сайту KRANTAS Group и его использование. Сайт предназначен прежде всего для корпоративного, промышленного, кадрового, дилерского и сервисного взаимодействия.',
    updatedAt: '17 марта 2026',
    framework: [
      'Применимое гражданское законодательство Республики Узбекистан.',
      'Закон Республики Узбекистан «Об электронной коммерции» № ЗРУ-792 от 29 сентября 2022 года в части электронного делового взаимодействия через сайт.',
      'Применимые нормы о рекламе, интеллектуальной собственности, защите данных и недобросовестной конкуренции в Республике Узбекистан.',
    ],
    sections: [
      {
        id: 'scope',
        title: '1. Сфера действия и характер сайта',
        paragraphs: [
          'Используя сайт, вы соглашаетесь использовать его законно и таким образом, который не нарушает работу сайта, деятельность KRANTAS, интересы других посетителей или связанных систем.',
          'Сайт носит информационный и деловой характер. Если иное прямо не предусмотрено отдельным письменным договором, коммерческим предложением или подписанным договором поставки, материалы сайта сами по себе не образуют обязательное коммерческое предложение или обязательство по поставке.',
        ],
      },
      {
        id: 'product-info',
        title: '2. Информация о продукции и услугах',
        paragraphs: [
          'Описания продукции, технические характеристики, примеры применения, фотографии и сведения об услугах предоставляются исключительно в целях общего делового информирования. Конфигурации, грузоподъемность, наличие и технические параметры могут изменяться без предварительного уведомления на сайте.',
          'Отправка запроса, сервисной заявки или формы связи с дилером не создает договор купли-продажи, трудовых отношений, гарантированного срока исполнения или публичной оферты, если это отдельно не подтверждено письменно.',
        ],
      },
      {
        id: 'acceptable-use',
        title: '3. Допустимое использование',
        paragraphs: [
          'Запрещается использовать сайт для передачи незаконного, нарушающего права, вредоносного, вводящего в заблуждение или технически опасного контента, а также для попыток несанкционированного доступа к системам KRANTAS.',
        ],
        bullets: [
          'Запрещены злоупотребляющий парсинг, поведение типа отказа в обслуживании, вредоносный код и атаки на учетные данные.',
          'Запрещено незаконное использование информации о дилерах, сотрудниках, вакансиях или технических данных, опубликованных на сайте.',
          'Запрещено копирование и повторное использование материалов сайта с нарушением прав KRANTAS или третьих лиц.',
        ],
      },
      {
        id: 'intellectual-property',
        title: '4. Интеллектуальная собственность',
        paragraphs: [
          'Если иное не указано отдельно, дизайн сайта, товарные знаки, тексты, графика, материалы о продукции и иной контент принадлежат KRANTAS Group либо используются на законных основаниях.',
          'Вы можете просматривать или загружать материалы сайта только для законного внутреннего анализа или делового взаимодействия с KRANTAS. Любое более широкое воспроизведение, публикация, перепродажа или производное использование требует предварительного письменного разрешения.',
        ],
      },
      {
        id: 'availability',
        title: '5. Сторонние сервисы, доступность и ответственность',
        paragraphs: [
          'Сайт может содержать ссылки на сторонние сервисы, включая карты, каналы связи и внешние публикации. KRANTAS не несет ответственности за независимое содержание, доступность или правовые условия таких сторонних ресурсов.',
          'KRANTAS стремится поддерживать сайт точным и доступным, однако не гарантирует бесперебойный доступ, безошибочную работу или отсутствие всех уязвимостей. В максимально допустимой законом степени KRANTAS исключает ответственность за косвенные, случайные или последующие убытки, возникающие исключительно из использования сайта как информационного ресурса.',
        ],
      },
      {
        id: 'governing-law',
        title: '6. Применимое право и споры',
        paragraphs: [
          'Настоящие Условия регулируются законодательством Республики Узбекистан. Если императивные нормы не требуют иного, споры, связанные непосредственно с сайтом, подлежат рассмотрению компетентными судами Узбекистана.',
          'Обязательства по поставке, гарантии, трудоустройству, закупкам, оборонным проектам и иным проектам регулируются отдельно соответствующим подписанным договором, тендерной или закупочной документацией.',
        ],
      },
    ],
    contactBody:
      'Вопросы по настоящим Условиям могут быть направлены в KRANTAS Group по адресу info@krantas.uz или по телефону +998 71 262 23 61.',
    note:
      'Настоящие Условия подготовлены для текущего публичного сайта и должны быть повторно согласованы, если KRANTAS запустит сервисы с учетными записями, онлайн-заключение договоров или прямые онлайн-продажи.',
  },
  uz: {
    title: 'Foydalanish shartlari',
    lead:
      'Ushbu Foydalanish shartlari KRANTAS Group saytiga kirish va undan foydalanishni tartibga soladi. Sayt asosan korporativ, sanoat, kadrlar, dilerlik va servis aloqalari uchun mo‘ljallangan.',
    updatedAt: '2026-yil 17-mart',
    framework: [
      'O‘zbekiston Respublikasining amaldagi fuqarolik qonunchiligi.',
      'Sayt orqali yuzaga keladigan elektron biznes aloqalari bilan bog‘liq hollarda O‘zbekiston Respublikasining 2022-yil 29-sentabrdagi O‘RQ-792-son “Elektron tijorat to‘g‘risida”gi Qonuni.',
      'O‘zbekiston Respublikasida reklama, intellektual mulk, ma’lumotlarni himoya qilish va insofsiz raqobat bo‘yicha amaldagi qoidalar.',
    ],
    sections: [
      {
        id: 'scope',
        title: '1. Saytning qo‘llanish doirasi va mohiyati',
        paragraphs: [
          'Ushbu saytdan foydalangan holda siz uni qonuniy tarzda va sayt ishiga, KRANTAS faoliyatiga, boshqa tashrif buyuruvchilarga yoki ulangan tizimlarga xalaqit bermaydigan tarzda ishlatishga rozilik bildirasiz.',
          'Sayt axborot va biznes yo‘nalishida ishlaydi. Alohida yozma shartnoma, tijorat taklifi yoki imzolangan yetkazib berish shartnomasida boshqacha ko‘rsatilmagan bo‘lsa, sayt materiallari o‘z-o‘zidan majburiy tijorat taklifi yoki yetkazib berish majburiyatini yaratmaydi.',
        ],
      },
      {
        id: 'product-info',
        title: '2. Mahsulot va xizmatlar haqidagi ma’lumotlar',
        paragraphs: [
          'Mahsulot tavsiflari, texnik ko‘rsatkichlar, qo‘llash misollari, suratlar va xizmatlar haqidagi ma’lumotlar faqat umumiy biznes ma’lumotlari sifatida taqdim etiladi. Konfiguratsiya, yuk ko‘tarish quvvati, mavjudlik va texnik xususiyatlar oldindan sayt ogohlantirishi berilmasdan o‘zgarishi mumkin.',
          'So‘rov yuborish, servis talabi yoki diler bilan aloqa formasi yuborish, agar bu alohida yozma ravishda tasdiqlanmasa, sotib olish shartnomasi, mehnat munosabati, kafolatlangan muddat yoki ommaviy oferta yaratmaydi.',
        ],
      },
      {
        id: 'acceptable-use',
        title: '3. Ruxsat etilgan foydalanish',
        paragraphs: [
          'Saytdan noqonuniy, huquqbuzar, zararli, chalg‘ituvchi yoki texnik jihatdan xavfli kontentni uzatish yoki KRANTAS tizimlariga ruxsatsiz kirishga urinish uchun foydalanish taqiqlanadi.',
        ],
        bullets: [
          'Zararli scraping, xizmatni rad etish xatti-harakati, zararli kod yoki hisob ma’lumotlariga hujumlarga yo‘l qo‘yilmaydi.',
          'Saytda e’lon qilingan diler, xodim, vakansiya yoki texnik ma’lumotlardan noqonuniy foydalanish taqiqlanadi.',
          'Sayt materiallarini KRANTAS yoki uchinchi shaxslar huquqlarini buzadigan tarzda ko‘chirish yoki qayta ishlatish taqiqlanadi.',
        ],
      },
      {
        id: 'intellectual-property',
        title: '4. Intellektual mulk',
        paragraphs: [
          'Alohida ko‘rsatilmagan bo‘lsa, sayt dizayni, tovar belgilari, matnlar, grafikalar, mahsulot materiallari va boshqa kontent KRANTAS Groupga tegishli yoki qonuniy ruxsat asosida ishlatiladi.',
          'Siz sayt materiallarini faqat qonuniy ichki ko‘rib chiqish yoki KRANTAS bilan biznes muloqoti uchun ko‘rishingiz yoki yuklab olishingiz mumkin. Har qanday kengroq ko‘paytirish, nashr qilish, qayta sotish yoki hosila foydalanish oldindan yozma ruxsatni talab qiladi.',
        ],
      },
      {
        id: 'availability',
        title: '5. Uchinchi tomon servislar, mavjudlik va javobgarlik',
        paragraphs: [
          'Sayt xaritalar, messenjer kanallari va tashqi nashrlar kabi uchinchi tomon servislariga havolalarni o‘z ichiga olishi mumkin. KRANTAS bunday uchinchi tomon resurslarining mustaqil mazmuni, mavjudligi yoki huquqiy shartlari uchun javobgar emas.',
          'KRANTAS saytni aniq va mavjud saqlashga intiladi, biroq uzluksiz kirish, xatosiz ishlash yoki barcha zaifliklarning yo‘qligini kafolatlamaydi. Qonun ruxsat etgan maksimal darajada, KRANTAS sayt axborot resursi sifatida ishlatilishi natijasida yuzaga keladigan bilvosita, tasodifiy yoki oqibatli zararlar uchun javobgarlikni rad etadi.',
        ],
      },
      {
        id: 'governing-law',
        title: '6. Qo‘llaniladigan huquq va nizolar',
        paragraphs: [
          'Ushbu Shartlar O‘zbekiston Respublikasi qonunlari bilan tartibga solinadi. Majburiy qonun normalari boshqacha talab qilmasa, sayt bilan bevosita bog‘liq nizolar O‘zbekistonning vakolatli sudlarida ko‘rib chiqiladi.',
          'Tijorat yetkazib berish, kafolat, ishga qabul, xarid, mudofaa va loyiha majburiyatlari alohida tegishli imzolangan shartnoma, tender yoki xarid hujjatlari bilan tartibga solinadi.',
        ],
      },
    ],
    contactBody:
      'Ushbu Shartlar bo‘yicha savollar KRANTAS Groupga info@krantas.uz manzili yoki +998 71 262 23 61 telefoni orqali yuborilishi mumkin.',
    note:
      'Ushbu Shartlar joriy ommaviy sayt uchun tayyorlangan va agar KRANTAS akkauntga asoslangan servislar, onlayn shartnomalar yoki to‘g‘ridan-to‘g‘ri onlayn savdoni ishga tushirsa, qayta moslashtirilishi kerak.',
  },
  de: {
    title: 'Nutzungsbedingungen',
    lead:
      'Diese Nutzungsbedingungen regeln den Zugang zur Website der KRANTAS Group und deren Nutzung. Die Website ist in erster Linie für Unternehmens-, Industrie-, Personal-, Händler- und Servicekommunikation bestimmt.',
    updatedAt: '17. März 2026',
    framework: [
      'Anwendbares Zivilrecht der Republik Usbekistan.',
      'Gesetz der Republik Usbekistan „Über den elektronischen Handel“ Nr. ZRU-792 vom 29. September 2022, soweit Website-Interaktionen elektronische Geschäftskommunikation begründen.',
      'Anwendbare Regelungen zu Werbung, geistigem Eigentum, Datenschutz und unlauterem Wettbewerb in der Republik Usbekistan.',
    ],
    sections: [
      {
        id: 'scope',
        title: '1. Geltungsbereich und Charakter der Website',
        paragraphs: [
          'Durch die Nutzung dieser Website erklären Sie sich damit einverstanden, sie rechtmäßig und in einer Weise zu verwenden, die weder die Website, die KRANTAS-Abläufe, andere Besucher noch verbundene Systeme beeinträchtigt.',
          'Die Website dient Informations- und Geschäftszwecken. Sofern in einem gesonderten schriftlichen Vertrag, Angebot oder unterzeichneten Liefervertrag nicht ausdrücklich anders geregelt, stellen Website-Inhalte für sich genommen weder ein verbindliches kommerzielles Angebot noch eine Lieferverpflichtung dar.',
        ],
      },
      {
        id: 'product-info',
        title: '2. Produkt- und Serviceinformationen',
        paragraphs: [
          'Produktbeschreibungen, Spezifikationen, Anwendungsbeispiele, Fotografien und Serviceinformationen dienen ausschließlich allgemeinen geschäftlichen Informationszwecken. Konfigurationen, Kapazitäten, Verfügbarkeit und technische Merkmale können sich ohne vorherige Mitteilung auf der Website ändern.',
          'Die Übermittlung einer Anfrage, Serviceanfrage oder Händlerkontaktanfrage begründet keinen Kaufvertrag, kein Arbeitsverhältnis, keinen garantierten Zeitplan und kein öffentliches Angebot, sofern dies nicht gesondert schriftlich bestätigt wird.',
        ],
      },
      {
        id: 'acceptable-use',
        title: '3. Zulässige Nutzung',
        paragraphs: [
          'Sie dürfen die Website nicht zur Übermittlung rechtswidriger, verletzender, schädlicher, irreführender oder technisch gefährlicher Inhalte nutzen oder versuchen, unbefugten Zugriff auf KRANTAS-Systeme zu erlangen.',
        ],
        bullets: [
          'Kein missbräuchliches Scraping, kein Denial-of-Service-Verhalten, keine Schadsoftware und keine Zugangsdatenangriffe.',
          'Keine rechtswidrige Nutzung von Händler-, Mitarbeiter-, Stellen- oder technischen Informationen, die auf der Website veröffentlicht werden.',
          'Kein Kopieren oder Wiederverwenden von Website-Materialien in einer Weise, die Rechte von KRANTAS oder Dritten verletzt.',
        ],
      },
      {
        id: 'intellectual-property',
        title: '4. Geistiges Eigentum',
        paragraphs: [
          'Soweit nicht anders angegeben, stehen Website-Design, Marken, Texte, Grafiken, Produktmaterialien und sonstige Inhalte im Eigentum der KRANTAS Group oder werden auf Grundlage entsprechender Rechte und Erlaubnisse genutzt.',
          'Sie dürfen Website-Materialien nur zur legitimen internen Prüfung oder zur geschäftlichen Kommunikation mit KRANTAS ansehen oder herunterladen. Jede weitergehende Vervielfältigung, Veröffentlichung, Weiterveräußerung oder abgeleitete Nutzung bedarf der vorherigen schriftlichen Genehmigung.',
        ],
      },
      {
        id: 'availability',
        title: '5. Dienste Dritter, Verfügbarkeit und Haftung',
        paragraphs: [
          'Die Website kann Links zu Diensten Dritter wie Karten, Kommunikationskanälen und externen Veröffentlichungen enthalten. KRANTAS ist nicht für den unabhängigen Inhalt, die Verfügbarkeit oder die rechtlichen Bedingungen dieser Drittressourcen verantwortlich.',
          'KRANTAS bemüht sich, die Website korrekt und verfügbar zu halten, übernimmt jedoch keine Gewähr für ununterbrochenen Zugang, fehlerfreien Betrieb oder das Fehlen sämtlicher Schwachstellen. Soweit gesetzlich zulässig, schließt KRANTAS die Haftung für mittelbare, zufällige oder Folgeschäden aus, die ausschließlich aus der Nutzung der Website als Informationsquelle entstehen.',
        ],
      },
      {
        id: 'governing-law',
        title: '6. Anwendbares Recht und Streitigkeiten',
        paragraphs: [
          'Diese Bedingungen unterliegen dem Recht der Republik Usbekistan. Soweit zwingendes Recht nichts anderes verlangt, werden Streitigkeiten, die speziell mit der Website zusammenhängen, von den zuständigen Gerichten Usbekistans entschieden.',
          'Pflichten in Bezug auf Lieferung, Garantie, Personal, Beschaffung, Verteidigung und Projekte werden gesondert durch den jeweiligen unterzeichneten Vertrag, die Ausschreibung oder Beschaffungsunterlagen geregelt.',
        ],
      },
    ],
    contactBody:
      'Fragen zu diesen Bedingungen können an KRANTAS Group unter info@krantas.uz oder telefonisch unter +998 71 262 23 61 gerichtet werden.',
    note:
      'Diese Bedingungen wurden für die aktuelle öffentliche Website erstellt und sollten erneut abgestimmt werden, falls KRANTAS konto-basierte Dienste, Online-Vertragsschlüsse oder direkten Online-Verkauf einführt.',
  },
};

export function getPrivacyPolicyContent(language: Language) {
  return PRIVACY_POLICY_CONTENT_BY_LANGUAGE[language] ?? PRIVACY_POLICY_CONTENT_BY_LANGUAGE.en;
}

export function getTermsOfServiceContent(language: Language) {
  return TERMS_OF_SERVICE_CONTENT_BY_LANGUAGE[language] ?? TERMS_OF_SERVICE_CONTENT_BY_LANGUAGE.en;
}
