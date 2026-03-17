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
  phone: '+998 71 262 23 61',
  address: '100170, Tashkent, Uzbekistan',
};

export const PRIVACY_POLICY_CONTENT: LegalDocumentContent = {
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
};

export const TERMS_OF_SERVICE_CONTENT: LegalDocumentContent = {
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
};
