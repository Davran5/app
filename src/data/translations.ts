export type Language = 'en' | 'ru' | 'uz' | 'de';

export const translations = {
  en: {
    locale: 'en',
    nav: {
      home: 'Home',
      catalog: 'Trucks',
      services: 'Services',
      about: 'About',
      blog: 'News',
      careers: 'Careers',
      contacts: 'Contacts',
      products: 'Products',
      customSolutions: 'Custom Solutions',
    },
    cookieConsent: {
      title: 'Cookie Preferences',
      description: 'We use cookies to ensure you get the best experience on our website. Global Privacy Control (GPC) signal detected.',
      acceptAll: 'Accept All',
      necessaryOnly: 'Necessary Only',
      settings: 'Settings',
    },
    customSolutionsPage: {
      heroTitle: 'Custom Solutions',
      heroIntro: 'Bespoke engineering solutions tailored to your unique operational requirements. We transform complex visions into reliable industrial reality.',
      intro: {
        title: 'Your Vision,\nOur Expertise',
        desc1: "For over 75 years, we've partnered with industries worldwide to develop custom machinery that pushes the boundaries of what's possible in heavy equipment manufacturing.",
        desc2: 'From initial consultation through design, prototyping, and production, our engineering team delivers solutions that exceed expectations and stand the test of time.',
        stats: {
          projects: 'Custom Projects',
          experience: 'Years Experience',
        },
      },
      metalStructures: {
        title: 'Industrial Metal Structures',
        description: 'Design and fabrication of complex industrial-grade metal structures. We provide complete solutions from structural engineering to final assembly, ensuring maximum durability and compliance with international standards.',
      },
      capabilities: {
        title: 'Customization Capabilities',
        subtitle: 'Comprehensive engineering and fabrication services tailored to your specifications',
        items: {
          chassis: {
            title: 'Chassis Modification',
            description: 'Complete chassis modifications including wheelbase adjustments, drivetrain upgrades, and structural reinforcements for specialized applications.',
            capabilities: [
              'Extended wheelbase configurations',
              'Heavy-duty frame reinforcement',
              'Custom suspension systems',
              'Specialized drivetrain integration'
            ]
          },
          complexes: {
            title: 'Specialized Transport Engineering',
            description: 'Custom-built, heavy-duty transport complexes and automated loading systems engineered for extreme durability and precision performance.',
            capabilities: [
              'Multi-axle heavy haulers',
              'Specialized loading mechanisms',
              'Custom transport platforms',
              'Integrated equipment systems'
            ]
          },
          hydraulics: {
            title: 'Hydraulics & Electronics',
            description: 'Advanced hydraulic system integration and electronic control systems for precision operation and automation capabilities.',
            capabilities: [
              'Automated control systems',
              'Precision hydraulic circuits',
              'Electronic monitoring systems',
              'Remote operation capabilities'
            ]
          },
          containers: {
            title: 'Non-Standard Containers',
            description: 'Custom container fabrication for specialized cargo, including insulated tanks, pressure vessels, and unique geometric configurations.',
            capabilities: [
              'Pressure vessel fabrication',
              'Insulated tank systems',
              'Custom geometry containers',
              'Specialized material storage'
            ]
          }
        }
      },
      production: {
        title: 'Our Production Backbone',
        subtitle: 'Advanced equipment and experienced specialists enable us to handle projects of any complexity',
        items: {
          manufacturing: { title: 'Manufacturing Floor', desc: '15,000m² production facility' },
          cnc: { title: 'CNC Machining', desc: '±0.01mm precision' },
          welding: { title: 'Certified Welding', desc: 'MIG, TIG, Robotic' },
          assembly: { title: 'Assembly & Testing', desc: 'Rigorous quality control protocols' },
        }
      },
      cta: {
        title: 'Ready to Start Your Custom Project?',
        description: 'Get in touch with our engineering team to discuss your requirements',
        button: 'Request Consultation',
      },
    },
    home: {
      build: {
        explore: 'Explore',
      },
      process: {
        explore: 'Explore Our Process',
      },

      since: 'Since 1945',
      title: 'Engineering\nStrength',
      subtitle: 'The driving force of progress. Full-cycle manufacturing of industrial vehicles, cranes, and agricultural machinery for the toughest conditions.',
      exploreCatalog: 'Explore Catalog',
      contactUs: 'Contact Us',
      inquiryForm: 'Inquiry Form',
    },
    stats: {
      equipment: 'Types of Equipment',
      projects: 'Projects Delivered',
      employees: 'Employees',
      experience: 'Years of Experience',
    },
    intro: {
      welcomeTitle: 'Welcome to KRANTAS Group',
      welcomeDesc: 'A legacy of engineering excellence since 1945. We design and manufacture high-performance industrial vehicles, cranes, and specialized equipment tailored for the most demanding environments.',
      fleetRecovery: 'Comprehensive Fleet Recovery',
      fleetRecoveryDesc: 'Specializing in the complex restoration of trucks and heavy-duty cranes. Our facility handles everything from intricate milling and grinding to full-scale locksmith works.',
      fabrication: 'Advanced Fabrication Standards',
      fabricationDesc: 'We leverage a suite of modern technologies—including plasma cutting and CNC machining—to deliver structural integrity that exceeds industry standards.',
      advisory: 'Strategic Equipment Advisory',
      advisoryDesc: 'Minimize downtime with the right hardware. Our specialists provide deep-dive technical support to ensure your equipment matches your operational demands perfectly.',
    },
    aboutHome: {
      title: 'About Us',
      heading: 'From Repair Shop to Industry Leader',
      description: 'Our factory was founded in 1945 as a mechanical repair plant. After the 1966 earthquake, we pivoted to steel construction and lifting equipment. Today, KRANTAS Group is a full-cycle manufacturer with modern CNC machining, welding, plasma/laser cutting, and assembly.',
      points: ['Full-cycle manufacturing in-house', 'Export to Central Asia and beyond', 'International certifications'],
      learnMore: 'Learn More About Us',
    },
    mission: {
      title: 'Our Mission',
      heading: 'Localization That Strengthens Industry',
      description: 'We are building Uzbekistan\'s industrial independence by creating a network where national enterprises lead together. It\'s about more than business—it\'s about delivering local alternatives that outperform imports and finally cutting the cord on foreign dependence. We don\'t just supply parts; we partner with you to make your entire operation leaner and more profitable.',
      qualityFirst: 'Quality First',
      qualityFirstDesc: 'International standards are our baseline, not an afterthought. We\'ve built a culture where precision is the only instinct because in this industry, there is no room for "close enough."',
      localProduction: 'Local Production',
      localProductionDesc: 'We are the engine behind the "Made in Uzbekistan" seal. By keeping production here, we offer a level of reliability and rapid response that is hard to match.',
      globalStandards: 'Global Standards',
      globalStandardsDesc: 'We bridge the gap between local craftsmanship and high-quality engineering. You get the proximity of a local partner paired with the technical power of an advanced manufacturer.',
    },
    equipment: {
      title: 'Equipment Solutions',
      heading: 'What We Build',
      viewAll: 'View All Categories',
      customSolutions: 'Customized Solutions',
      customDesc: 'Our expertise. Bespoke engineering solutions tailored to your unique requirements.',
    },
    products: {
      title: 'Featured Products',
      heading: 'Built for Real Conditions',
      viewAll: 'View All Products',
      specs: 'Specifications',
      features: 'Features',
      inquiry: 'Send Inquiry',
    },
    production: {
      title: 'Production',
      heading: 'Full-Cycle Manufacturing',
      description: 'Design → tooling → metal structures → assembly → testing → certification. All in-house with modern CNC machining, plasma/laser cutting, and automated welding.',
      modeling: '3D Modeling & Engineering',
      modelingDesc: 'Complete design and detailing using advanced CAD software for precision manufacturing.',
      cnc: 'CNC Machining',
      cncDesc: 'High-precision machining of components with tolerances to ±0.01mm.',
      cutting: 'Plasma & Laser Cutting',
      cuttingDesc: 'Advanced cutting technologies for complex shapes and clean edges.',
      welding: 'Welding & Fabrication',
      weldingDesc: 'Certified welding processes including MIG, TIG, and robotic welding.',
      surface: 'Surface Treatment',
      surfaceDesc: 'Shot blasting, priming, and painting for corrosion protection.',
      assembly: 'Assembly & Testing',
      assemblyDesc: 'Complete assembly with rigorous quality control and testing protocols.',
    },
    cta: {
      title: 'Ready to Discuss Your Project?',
      description: 'Our specialists will help you choose the right equipment for your needs and provide a detailed quotation.',
      button: 'Get in Touch',
    },
    footer: {
      description: 'Engineering strength since 1945. Full-cycle manufacturing of industrial vehicles and equipment.',
      navigation: 'Navigation',
      products: 'Products',
      contact: 'Contact',
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      viewAll: 'View All →',
    },
    productsPage: {
      title: 'Our Products & Solutions',
      heroIntro: 'A full spectrum of engineering excellence. Discover our tailor-made industrial vehicles and our comprehensive catalog of proven machinery.',
      heading: 'Engineering Excellence, Delivered',
      description: 'KRANTAS Group offers a comprehensive portfolio of industrial solutions. Whether you need a customized vehicle built to your exact specifications or a proven catalog model ready for deployment, we deliver the engineering excellence and reliability your operations demand.',
      customTitle: 'Customised Engineering Solutions',
      customDesc: 'At KRANTAS, we understand that every operation has unique demands. Our custom engineering division specializes in designing and manufacturing specialized industrial vehicles and equipment tailored to your exact requirements.',
      customPoints: {
        1: 'Full design consultation and engineering support',
        2: 'Prototype development and testing',
        3: 'Specialized modifications and integrations',
      },
      customLink: 'Learn More About Custom Solutions',
      catalogTitle: 'Standard Product Catalog',
      catalogDesc: 'Our catalog features a comprehensive range of proven industrial vehicles and equipment. Each model is engineered for reliability, built with quality materials, and backed by decades of manufacturing expertise.',
      catalogPoints: {
        1: 'Ready-to-deploy standard configurations',
        2: 'Wide range of categories and applications',
        3: 'Competitive pricing and fast delivery',
      },
      catalogLink: 'Browse Our Full Catalog',
    },
    catalog: {
      title: 'Product Catalog',
      subtitle: 'From heavy-duty trucks to precision lifting systems—designed for real operating conditions.',
      heroIntro: 'Explore our comprehensive range of industrial vehicles and equipment. Every model is engineered for reliability and built to international standards.',
      categories: 'Categories',
      showAll: 'Show All Products',
      welcomeTitle: 'Engineering That Works',
      customSolution: 'Need a Custom Solution?',
      customDesc: 'We design and manufacture custom equipment tailored to your specific requirements.',
      backToCatalog: 'Back to Catalog',
      filter: 'Filter by Category',
      noProducts: 'No products found',
    },
    services: {
      title: 'Our Services',
      heading: 'Comprehensive Support',
      welcomeTitle: 'Our Services',
      heroIntro: 'Comprehensive support for your industrial fleet. From expert maintenance and original parts to custom engineering and technical project support.',
      introHeadline: 'Built for the Long Haul. \nBacked for a Lifetime.',
      introP1: 'We know that in your world, there is no room for excuses. That’s why we’ve built a support structure as rugged as our machinery.',
      introP2: 'When you choose Krantas, you aren\'t just buying an industrial asset; you’re gaining a dedicated team that stands behind every kilometer and every lift.',
      stats: {
        centers: 'Service Centers',
        parts: 'Spare Parts',
      },
      subtitle: 'From manufacturing to after-sales support—we provide a full spectrum of services to ensure your equipment performs at its best.',
      supportCenter: 'Support Center',
      supportDesc: 'Our highly qualified specialists will help you choose the right equipment and answer all technical questions.',
      facilities: 'Our Facilities',
      items: {
        afterSales: {
          title: 'After-Sales Service & Support',
          shortTitle: 'Service',
          description: 'Technical maintenance, warranty, spare parts and dedicated support throughout the product lifecycle. Our service centers are equipped with advanced diagnostic tools to ensure your fleet remains operational in the most demanding environments. We provide rapid response teams for on-site repairs and maintain a comprehensive inventory of genuine components to minimize downtime.',
          stages: {
            maintenance: { name: 'Maintenance', desc: 'Regular service' },
            repairs: { name: 'Repairs', desc: 'Quick and reliable' },
            parts: { name: 'Parts', desc: 'Original spare parts' },
            support: { name: 'Support', desc: '24/7 assistance' }
          }
        },
        quality: {
          title: 'Quality Control & Certification',
          shortTitle: 'Quality',
          description: 'Quality assurance at every production stage and compliance with mandatory certification requirements. Every vehicle undergoes a rigorous multi-point inspection process, including structural stress testing and hydraulic system validation, to meet international safety standards. Our internal laboratories perform material analysis and precision checks to guarantee the longevity and reliability of every unit bearing the Krantas name.',
          stages: {
            inspection: { name: 'Inspection', desc: 'Rigorous control' },
            testing: { name: 'Testing', desc: 'Performance validation' },
            certification: { name: 'Certification', desc: 'International standards' },
            documentation: { name: 'Documentation', desc: 'Full documentation' }
          }
        },
        localization: {
          title: 'Localization & Integration',
          shortTitle: 'Localization',
          description: 'Support for industrial localization projects and technology transfer for regional markets. We bridge the gap between global engineering excellence and local manufacturing capabilities, helping partners establish robust production lines within the region. Our team provides end-to-end consultancy on supply chain optimization and technical documentation adaptation to ensure seamless integration into local industrial ecosystems.',
          stages: {
            analysis: { name: 'Analysis', desc: 'Requirements study' },
            adaptation: { name: 'Adaptation', desc: 'Product localization' },
            integration: { name: 'Integration', desc: 'System compatibility' },
            training: { name: 'Training', desc: 'Knowledge transfer' }
          }
        },
        manufacturing: {
          title: 'Manufacturing & Assembly',
          shortTitle: 'Manufacturing',
          description: 'Serial and project-based production providing a full-cycle platform across all key stages. From raw material processing to final assembly, our 15,000m² facility utilizes high-precision CNC machining and automated welding to deliver consistent structural integrity. We handle the entire manufacturing journey in-house, ensuring that every project—whether a standard unit or a complex industrial complex—is built to exact specifications.',
          stages: {
            design: { name: 'Design', desc: '3D modeling' },
            fabrication: { name: 'Fabrication', desc: 'Cutting & forming' },
            assembly: { name: 'Assembly', desc: 'Component integration' },
            testing: { name: 'Testing', desc: 'Quality validation' }
          }
        },
        engineering: {
          title: 'Engineering & Customization',
          shortTitle: 'Engineering',
          description: 'Bespoke engineering solutions and product adaptation to meet specific operational requirements. Our design bureau utilizes advanced 3D modeling and structural simulation to develop machines that solve unique site-specific challenges. We specialize in transforming complex technical requirements into high-performance industrial assets, offering full structural and mechanical customization for specialized industries.',
          stages: {
            consulting: { name: 'Consulting', desc: 'Technical expertise' },
            design: { name: 'Design', desc: 'Custom solutions' },
            prototyping: { name: 'Prototyping', desc: 'Proof of concept' },
            implementation: { name: 'Implementation', desc: 'Full-scale rollout' }
          }
        }
      },
      facilitiesList: {
        warehouse: {
          title: 'Warehouse',
          description: 'Modern warehouse facilities for spare parts and component management. Over 5,000 sq.m of area.'
        },
        serviceStation: {
          title: 'Service Station',
          description: 'Fully equipped bays for service and repair. Modern diagnostic equipment and certified technicians.'
        },
        spareParts: {
          title: 'Spare Parts Center',
          description: 'Large stock of original spare parts and fast delivery. Over 10,000 items in stock.'
        }
      },
      inquiryForm: 'Inquiry Form'
    },
    about: {
      title: 'About Us',
      heroTitle: 'The Krantas Legacy',
      heroIntro: 'Engineering strength since 1945. Our legacy is built on full-cycle manufacturing of industrial machinery for the toughest environments.',
      heading: 'Engineering Strength Since 1945',
      welcomeTitle: 'About the Company',
      subtitle: 'From a mechanical repair shop to a full-cycle manufacturing group serving Central Asia and beyond.',
      story: 'Our Story',
      storyP1: 'Our factory was founded in 1945 as a mechanical repair plant for trucks and heavy machinery. In the early years, we specialized in keeping the region\'s vehicles running, earning a reputation for quality craftsmanship.',
      storyP2: 'After the devastating 1966 earthquake, the factory was repurposed and began production of steel structures and lifting equipment for civil and industrial construction.',
      storyP3: 'Following Uzbekistan\'s independence and subsequent privatization, a new phase began. We invested in modern technology, expanded our product offerings, and began serving international markets.',
      storyP4: 'Today, KRANTAS Group is a full-cycle manufacturer with modern CNC machining, welding, plasma/laser cutting, and assembly capabilities.',
      family: 'Family of KRANTAS',
      familyDesc: 'Generations of dedication. Decades of expertise. The people who make KRANTAS more than a company.',
      familyQuote: '"I have been working at KRANTAS for over 30 years. I have seen this company grow from a small repair shop to a major manufacturer. The pride I feel seeing our equipment working across the country is immeasurable."',
      familyQuoteAuthor: '— Rustam Khasanov, Chief Engineer',
      joinFamily: 'Join Our Family',
      history: 'Growth & Progress',
      production: 'Production Stages',
      manufacturing: 'Full-Cycle Manufacturing',
      manufacturingDesc: 'The factory has its own design bureau for independent development of projects and working drawings of new types of special equipment in accordance with the latest global trends.',
      manufacturingFeatures: ['3D Modeling & Detailing', 'Tooling Development', 'Steel Structures', 'Assembly & Testing', 'Quality Control', 'Certification'],
      chairman: 'Chairman\'s Message',
      chairmanQuote: '"KRANTAS Group is built on strong engineering traditions, local manufacturing, and a clear vision for the future. KRANTAS is not just a vehicle—it is a reliable engineering solution."',
      chairmanName: 'Karimov Mukhtor Akbarovich',
      chairmanTitle: 'Chairman, KRANTAS Group',
      team: 'Leadership that Builds',
      teamSubtitle: '',
      historyEvents: {
        1945: { title: 'Foundation', description: 'Founded as a mechanical repair plant for trucks and heavy machinery in Tashkent.' },
        1963: { title: 'Expansion', description: 'Began producing steel structures and lifting equipment for construction.' },
        1990: { title: 'Diversification', description: 'Expanded into special-purpose vehicles and truck crane manufacturing.' },
        2000: { title: 'Modernization', description: 'Introduced CNC machining and automated welding systems.' },
        2012: { title: 'Brand Launch', description: 'Launched the KRANTAS truck crane brand with full certification.' },
        2015: { title: 'International Growth', description: 'Entered Kazakhstan and Turkmenistan markets with export certification.' },
        2020: { title: 'New Facilities', description: 'Opened new assembly lines and expanded agricultural machinery production.' },
        2024: { title: 'Future Forward', description: 'Engineering the next generation of reliable industrial vehicles.' },
      },
      teamMemberStories: {
        sergey: {
          name: 'Petrov Sergey',
          role: 'Deputy Director',
          years: '50+ years with KRANTAS',
          text: 'From a young specialist in 1972 to leading operations as Deputy Director today. Witnessed KRANTAS transform from experimental plant to modern manufacturer while preserving core values.'
        },
        komil: {
          name: 'Komil Khaitmatov',
          role: 'Assembly Technician',
          years: '45 years with KRANTAS',
          text: 'Started as a driver in 1980, grew to master crane assembly. From KamAZ trucks to 60-ton cranes — he\'s been part of every transformation.'
        },
        elvira: {
          name: 'Elvira',
          role: 'Overhead Crane Operator',
          years: 'Third-generation · 10+ years',
          text: 'Parents, grandparents, and brothers all worked at KRANTAS. Father: 40 years as painter. Mother: 37 years as crane operator. A legacy of dedication.'
        }
      },
      certificatesList: {
        1: { name: 'Certificate', desc: 'OOO "KRANTAS"', org: 'Directorate of the International Industrial Fair and Cooperation Exchange' },
        2: { name: 'Certificate', desc: 'OOO "Crane and Special Trucks"', org: 'Directorate of the International Industrial Fair and Cooperation Exchange' },
        3: { name: 'Certificate', desc: 'OOO "TTEMZ"', org: 'Directorate of the International Industrial Fair and Cooperation Exchange' },
        4: { name: 'Performance Award', desc: 'Global Specific Performance Award 2022', org: 'FOTON' },
        5: { name: 'Diplom', desc: 'Turkmen Construction 2015', org: 'Chamber of Commerce and Industry' },
        6: { name: 'Certificate', desc: '17th Kazakhstan International Building Exhibition', org: 'Astana Build' },
      },
      certificates: 'Quality Standards',
      partners: 'Our Partners',
      partnersDesc: 'We partner with leading global manufacturers to ensure the highest quality of components and technology in our products.',
      geography: 'Supply Geography',
      geographyDesc: 'KRANTAS Group supplies equipment throughout Central Asia and beyond. Our products operate in diverse environments—from the mountains of Kyrgyzstan to the deserts of Turkmenistan.',
      distributors: {
        title: 'Our Distributors',
        description: 'KRANTAS Group partners with leading distributors across Central Asia and beyond. Our network ensures that wherever you operate, you have access to quality industrial equipment backed by local expertise and support.',
        mapLegend: 'Detailed coverage across 6 countries and 15+ cities',
        centersTitle: 'Regional Distribution Centers',
        regionalBranch: 'Regional Branch',
        regionalCenter: 'Regional Center',
        mountainSpecialist: 'Mountain Specialist',
        emergingMarkets: 'Emerging Markets',
        countries: {
          azerbaijan: 'Azerbaijan',
          kazakhstan: 'Kazakhstan',
          kyrgyzstan: 'Kyrgyzstan',
          tajikTurkmen: 'Tajikistan & Turkmenistan'
        }
      },
      teamRoles: {
        director: 'Director',
        deputyDirector: 'Deputy Director',
        deputyDirectorProduction: 'Deputy Director for Production',
        assemblyTechnician: 'Assembly Technician',
        craneOperator: 'Overhead Crane Operator'
      }
    },
    blog: {
      title: 'News',
      subtitle: 'Latest news, updates, and insights from the factory.',
      heroIntro: 'Latest KRANTAS Group updates. Follow our partnerships, production milestones, and regional growth.',
      latest: 'Latest Articles',
      stayUpdated: 'Stay Updated',
      newsletter: 'Subscribe to our newsletter to receive the latest news and industry insights.',
      subscribe: 'Subscribe',
      explore: 'Explore Newsroom',
      newsTeam: 'News Team',
      readOriginal: 'Read Original News',
      posts: {
        1: {
          title: 'Presidential Visit to Krantas Group Plant',
          excerpt: 'President Shavkat Mirziyoyev visited our production facilities, highlighting the importance of industrial localization and the expansion of our special equipment range to over 60 types.'
        },
        2: {
          title: 'Expansion into Military and Special Equipment Production',
          excerpt: 'Krantas Group announces plans for a $55 million project in Nurafshan to manufacture light armored vehicles and specialized trucks on a new 12-hectare industrial site.'
        },
        3: {
          title: 'Global Debut: Tarlon and Qalqon at IDEX-2023',
          excerpt: 'We proudly presented our latest light armored vehicles, Tarlon and Qalqon, at the international defense exhibition in the UAE, showcasing Uzbek engineering excellence on a global stage.'
        },
        4: {
          title: 'Strategic Partnership with MAZ and MTZ',
          excerpt: 'Krantas Group strengthens international ties through discussions with Belarusian partners to start assembling tractors and industrial machinery in Uzbekistan.'
        },
        5: {
          title: 'Enhancing Mining Efficiency at AGMK',
          excerpt: 'Our high-capacity dump trucks have been delivered to the Almalyk Mining and Metallurgical Complex, supporting the modernization and transport capacity of Uzbekistan\'s mining industry.'
        },
        6: {
          title: 'Introducing "Arslon": Uzbekistan\'s First Domestic BTR',
          excerpt: 'Developed to international standards, our new Armored Personnel Carrier "Arslon" has entered state trials, representing a major milestone in domestic defense manufacturing.'
        },
        7: {
          title: 'Significant Renovation and Infrastructure Development',
          excerpt: 'A major $333 million urban development project is proposed for our current Mirzo-Ulugbek location, paving the way for modern residential and social infrastructure.'
        }
      },
      featured: {
        lorem1: 'Detailed insights into our latest engineering breakthroughs and testing procedures.',
        lorem2: 'We continue to push the boundaries of what is possible in heavy machinery manufacturing.'
      }
    },
    careers: {
      title: 'Careers at KRANTAS',
      welcomeTitle: 'Join Our Team',
      heroIntro: 'Build the next generation of industrial technology with KRANTAS. We invite dedicated professionals to join our engineering and production teams.',
      subtitle: 'Build the next generation of industrial vehicles. Join a team that values precision, safety, and growth.',
      whyWork: 'Why Work With Us?',
      team: 'Honored Team Members',
      openPositions: 'Open Positions',
      apply: 'Apply',
      applyNow: 'Apply Now',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      submit: 'Submit Application',
      cancel: 'Cancel',
      joinTeam: 'Join a team where engineering excellence meets heritage.',
      experienceLabel: 'Experience:',
      ageLabel: 'Age:',
      requirementsLabel: 'Requirements:',
      fullTime: 'Full-time',
      applyPopupTitle: 'Apply for Position',
      namePlaceholder: 'Your full name',
      emailPlaceholder: 'your@email.com',
      phonePlaceholder: '+998 XX XXX XX XX',
      agePlaceholder: 'Years',
      experiencePlaceholder: 'Years',
      messagePlaceholder: 'Tell us about yourself...',
      positions: {
        1: {
          title: 'Mechanical Engineer',
          department: 'Engineering',
          location: 'Tashkent',
          experience: '3-5 years',
          age: '25-45',
          description: 'Design mechanical systems for industrial vehicles. Work with CAD software.',
          requirements: ['Bachelor\'s degree', 'CAD experience', 'Knowledge of manufacturing processes', 'Problem-solving skills']
        },
        2: {
          title: 'Welder',
          department: 'Production',
          location: 'Tashkent',
          experience: '2+ years',
          age: '20-50',
          description: 'Perform welding on steel structures. Comply with quality and safety standards.',
          requirements: ['Certification', 'MIG/TIG experience', 'Safety knowledge', 'Blueprint reading']
        },
        3: {
          title: 'CNC Operator',
          department: 'Production',
          location: 'Tashkent',
          experience: '2-4 years',
          age: '22-45',
          description: 'Operate CNC machines for precision machining. Program and maintain equipment.',
          requirements: ['Technical education', 'CNC programming', 'G-code knowledge', 'Attention to detail']
        },
        4: {
          title: 'Sales Manager',
          department: 'Sales',
          location: 'Tashkent',
          experience: '3+ years',
          age: '25-40',
          description: 'Develop client relationships. Identify new business opportunities.',
          requirements: ['Bachelor\'s degree', 'B2B sales experience', 'Communication skills', 'Market knowledge']
        }
      },
      teamMembers: {
        sergey: {
          name: 'Sergey Konstantinovich Petrov',
          role: 'Deputy Director for Production',
          story: 'Over 50 years at KRANTAS. Guided the company\'s transformation into a modern manufacturer.'
        },
        komil: {
          name: 'Komil Khaitmatov',
          role: 'Assembly Technician',
          story: '45 years at KRANTAS. Master of crane assembly.'
        },
        elvira: {
          name: 'Elvira',
          role: 'Overhead Crane Operator',
          story: 'Third-generation at KRANTAS. Operates overhead cranes with precision.'
        }
      }
    },
    contacts: {
      title: 'Contact Us',
      welcomeTitle: 'We Are Always in Touch',
      heroIntro: 'Our team is ready to assist with your technical or commercial inquiries. Reach out to our Tashkent headquarters for professional support.',
      subtitle: 'Inquire about products, services, or partnerships. We respond within 1-2 business days.',
      info: 'Contact Information',
      form: 'Send a Message',
      departments: 'Our Departments',
      address: 'Mirzo-Ulugbek district, Ziyolilar str. 1, Tashkent, Uzbekistan',
      phone: '+998 71 123 45 67',
      email: 'info@krantas.uz',
      sales: 'Sales Department',
      support: 'Technical Support',
      parts: 'Spare Parts',
      service: 'Service Center',
      hr: 'Human Resources',
      export: 'Export Department',
      name: 'Your Name',
      emailLabel: 'Your Email',
      messageLabel: 'Your Message',
      send: 'Send Message',
      heroTitle: 'Get in Touch',
      teamReady: 'Our team is ready to assist with any inquiries about our products, services, or industrial solutions.',
      headquarters: {
        title: 'KRANTAS Group Headquarters',
        description: 'The office is located approximately 30 minutes from Tashkent International Airport and the city center.',
        officeLabel: 'Our Office',
        postalCodeLabel: 'Postal Code',
        contactInfoLabel: 'Contact Information'
      },
      formTitle: 'Contact Form',
      inquiryForm: 'Inquiry Form',
      companyLabel: 'Company',
      organizationPlaceholder: 'Your organization',
      areaOfInterestLabel: 'Area of Interest',
      selectAreaPlaceholder: 'Select an area',
      phoneLabel: 'Phone Number',
      emailPlaceholder: 'your@email.com',
      successMessage: 'Message sent! We will contact you within 1-2 business days.',
      subjectOptions: {
        lifting: 'Lifting Equipment',
        dump: 'Dump Trucks',
        special: 'Special-purpose Machinery',
        metal: 'Metal Structures',
        agricultural: 'Agricultural Machinery',
        tanks: 'Tank Trucks',
        mining: 'Mining Trucks',
        cranes: 'Overhead & Gantry Cranes',
        custom: 'Customized Solutions',
        service: 'Spare Parts & Service',
        careers: 'Careers / Employment',
        other: 'Other Inquiry'
      }
    },
    equipmentSolutions: {
      title: 'Custom Engineering',
      heading: 'Unique Special Solutions',
      welcomeTitle: 'Bespoke Solutions',
      subtitle: 'Transform your vision into reality with our custom engineering capabilities. From concept to production, we deliver tailored solutions that meet your unique requirements.',
      howItWorks: 'How It Works',
      howItWorksTitle: 'You Can Bring Any Idea',
      howItWorksDesc1: 'Our engineering team works closely with you to understand your operational challenges and develop innovative solutions. Whether you need a modified chassis, specialized equipment integration, or entirely unique machinery, we have the expertise to deliver.',
      howItWorksDesc2: 'From initial consultation through design, prototyping, and final production, we maintain open communication to ensure the final product exceeds your expectations.',
      capabilities: 'Production Base',
      capabilitiesTitle: 'Our Capabilities and Production Base',
      types: 'Services',
      typesTitle: 'Types of Customization',
      chassis: 'Chassis Modification',
      chassisDesc: 'Full chassis modifications including wheelbase adjustment, drivetrain upgrades, and structural reinforcements for specialized applications.',
      complexes: 'Specialized Transport Engineering',
      complexesDesc: 'Design and fabrication of high-capacity transport complexes engineered for extreme operational demands. We deliver custom multi-axle configurations and automated loading systems built for durability and precision.',
      hydraulics: 'Hydraulics & Electronics',
      hydraulicsDesc: 'Advanced hydraulic system integration and electronic control systems for precision operation and automation capabilities.',
      containers: 'Non-Standard Containers',
      containersDesc: 'Custom container fabrication for specialized cargo, including insulated tanks, pressure vessels, and unique geometric configurations.',
      discussProject: 'Discuss Your Project',
      customProject: 'Have a custom project in mind?',
      customProjectDesc: 'Our engineering team is ready to discuss your unique requirements and develop a tailored solution that fits your operational needs.',
      startProject: 'Start Project',
      viewProducts: 'View Standard Products',
    },
    categories: {
      'lifting-equipment': { name: 'Lifting Equipment', description: 'Truck cranes and lifting solutions for construction and industrial applications' },
      'dump-trucks': { name: 'Dump Trucks', description: 'Heavy-duty dump trucks for mining, construction, and material transport' },
      'special-purpose': { name: 'Special-Purpose Machinery', description: 'Custom-built vehicles for specific industrial and municipal needs' },
      'agricultural': { name: 'Agricultural Machinery', description: 'Tractors, harvesters, and farming equipment for modern agriculture' },
      'tank-trucks': { name: 'Tank Trucks', description: 'Specialized tankers for fuel, water, and chemical transportation' },
      'overhead-gantry': { name: 'Overhead & Gantry Cranes', description: 'Industrial overhead bridge cranes and gantry systems for heavy lifting' },
      'mining-trucks': { name: 'Mining Trucks', description: 'Heavy-duty rigid and articulated trucks for mining and quarrying operations' },
      'metal-structures': { name: 'Metal Structures', description: 'Design and fabrication of industrial metal structures and complexes' },
    },
    specLabels: {
      model: 'Model',
      loadCapacity: 'Load Capacity',
      tankVolume: 'Tank Volume',
      wheelFormula: 'Wheel Formula',
      drive: 'Drive',
      environmentalClass: 'Env. Class',
      tippingSystem: 'Tipping System',
      liftingCapacity: 'Lifting Capacity',
      craneType: 'Crane Type',
      reach: 'Reach',
      liftingHeight: 'Lifting Height',
      outriggers: 'Outriggers',
      terrain: 'Terrain',
      drillingDiameter: 'Drill Diameter',
      drillingDepth: 'Drill Depth',
      mounting: 'Mounting',
      platformHeight: 'Platform Height',
      platformCapacity: 'Platform Capacity',
      stabilization: 'Stabilization',
      platform: 'Platform',
      material: 'Material',
      pumping: 'Pumping',
      certification: 'Certification',
      lining: 'Lining',
      compartments: 'Compartments',
      application: 'Application',
      chassis: 'Chassis',
      sweepingWidth: 'Sweeping Width',
      hopperVolume: 'Hopper Volume',
      vacuumSystem: 'Vacuum System',
      waterTank: 'Water Tank',
      waterCapacity: 'Water Capacity',
      pumpCapacity: 'Pump Capacity',
      equipment: 'Equipment',
      tools: 'Tools',
      storage: 'Storage',
      applications: 'Applications',
      pumpDepth: 'Pump Depth',
      seating: 'Seating',
      comfort: 'Comfort',
      rescue: 'Rescue',
      grainTank: 'Grain Tank',
      headerWidth: 'Header Width',
      threshing: 'Threshing',
      power: 'Power',
      augerType: 'Auger Type',
      control: 'Control',
      grabType: 'Grab Type',
      containerSize: 'Container Size',
      mobility: 'Mobility',
      structure: 'Structure',
      axles: 'Axles',
    },
    productsData: {
      'dt-dump-truck-4m3': {
        name: 'Dump Truck 4.5 t',
        description: 'Compact dump truck for urban construction and small projects.',
        fullDescription: 'The 4 m³ dump truck is designed for urban construction, landscaping, and small material transport operations. Compact size allows operation in confined spaces.',
        features: ['Compact design', 'Urban friendly', 'Easy maneuverability', 'Efficient operation', 'Low maintenance'],
        specs: { model: 'KDT-4.5', loadCapacity: '4.5 tons', tankVolume: '4 m³', wheelFormula: '4x2', drive: 'Diesel', environmentalClass: 'Euro 5' }
      },
      'dt-dump-truck-8m3': {
        name: 'Dump Truck 10 t',
        description: 'Medium-duty dump truck for construction and municipal services.',
        fullDescription: 'The 8 m³ dump truck offers balanced capacity and maneuverability for municipal services, road maintenance, and medium construction projects.',
        features: ['Medium capacity', 'Versatile use', 'Reliable performance', 'Fuel efficient', 'Construction ready'],
        specs: { model: 'KDT-10', loadCapacity: '10 tons', tankVolume: '8 m³', wheelFormula: '4x2', drive: 'Diesel', environmentalClass: 'Euro 5' }
      },
      'dt-dump-truck-16m3': {
        name: 'Dump Truck 20 t',
        description: 'Heavy-duty dump truck for construction and mining operations.',
        fullDescription: 'The 16 m³ dump truck is designed for heavy construction, mining, and large-scale material transport with robust construction and high payload capacity.',
        features: ['High capacity', 'Heavy-duty chassis', 'Mining ready', 'Reinforced body', 'Durable construction'],
        specs: { model: 'KDT-20', loadCapacity: '20 tons', tankVolume: '16 m³', wheelFormula: '6x4', drive: 'Diesel', environmentalClass: 'Euro 5' }
      },
      'mt-mining-truck-25t': {
        name: 'MT Mining Truck 240 t',
        description: 'Specialized mining truck for heavy-duty quarrying and extraction.',
        fullDescription: 'The MT Mining truck is specifically engineered for rigid off-road mining environments, delivering maximum payload capacity for quarrying and excavation operations with exceptional chassis durability.',
        features: ['Reinforced mining chassis', 'Heavy quarry duty', 'Off-road optimized', 'Powerful drivetrain', 'Industrial safety focus'],
        specs: { model: 'KMT-240', loadCapacity: '240 tons', tankVolume: '20 m³', wheelFormula: '6x4', drive: 'Diesel', environmentalClass: 'Euro 5' }
      },
      'dt-tipper-semi-trailer': {
        name: 'Tipper Semi-Trailer 24-26 m³',
        description: 'Large capacity tipper semi-trailer for bulk material transport.',
        fullDescription: 'The tipper semi-trailer provides maximum payload capacity for long-distance bulk material transport with hydraulic tipping system.',
        features: ['Large volume', 'Long distance', 'Hydraulic tipping', 'High efficiency', 'Bulk transport'],
        specs: { model: 'KTS-26', tankVolume: '24-26 m³', axles: '3-axle', drive: 'Semi-trailer', tippingSystem: 'Hydraulic' },
      },
      'le-crane-7t': {
        name: 'Truck-Mounted Knuckle Boom Crane 7 t',
        description: 'Compact knuckle boom crane for loading and material handling.',
        fullDescription: 'The 7-ton knuckle boom crane features articulated hydraulic arm for precise material handling and truck loading operations.',
        features: ['Knuckle boom', 'Hydraulic control', 'Precise positioning', 'Truck mounted', 'Versatile operation'],
        specs: { model: 'KLC-7', liftingCapacity: '7 tons', craneType: 'Knuckle Boom', drive: 'Hydraulic', reach: 'Up to 15m' }
      },
      'le-crane-10-15t': {
        name: 'Truck-Mounted Knuckle Boom Crane 10-15 t',
        description: 'Medium-duty knuckle boom crane for construction and logistics.',
        fullDescription: 'The 10-15 ton knuckle boom crane provides excellent reach and lifting capacity for construction and logistics applications.',
        features: ['Medium capacity', 'Extended reach', 'Construction ready', 'Logistics capable', 'Reliable performance'],
        specs: { model: 'KLC-15', liftingCapacity: '10-15 tons', craneType: 'Knuckle Boom', drive: 'Hydraulic', reach: 'Up to 20m' }
      },
      'le-crane-16t': {
        name: 'Truck-Mounted Crane 16 t',
        description: 'Mobile truck crane for construction lifting operations.',
        fullDescription: 'The 16-ton truck crane combines mobility with substantial lifting capacity for construction and industrial applications.',
        features: ['Mobile crane', 'Telescopic boom', 'Hydraulic outriggers', 'Construction grade', 'High stability'],
        specs: { model: 'KTC-16', liftingCapacity: '16 tons', craneType: 'Telescopic Boom', liftingHeight: '30m', outriggers: 'Hydraulic' }
      },
      'le-crane-25t': {
        name: 'Truck-Mounted Crane 25 t',
        description: 'Heavy-duty truck crane for large construction projects.',
        fullDescription: 'The 25-ton truck crane delivers powerful lifting capacity with excellent reach for large construction and industrial projects.',
        features: ['Heavy lift', 'Long boom', 'Large projects', 'Professional grade', 'Maximum stability'],
        specs: { model: 'KTC-25', liftingCapacity: '25 tons', craneType: 'Telescopic Boom', liftingHeight: '35m', outriggers: 'Hydraulic' }
      },
      'le-crane-32t': {
        name: 'Truck-Mounted Crane 32 t',
        description: 'Extra-heavy truck crane for major industrial operations.',
        fullDescription: 'The 32-ton truck crane provides exceptional lifting capacity for major industrial installations and infrastructure projects.',
        features: ['Extra capacity', 'Industrial grade', 'Extended height', 'Heavy projects', 'Superior stability'],
        specs: { model: 'KTC-32', liftingCapacity: '32 tons', craneType: 'Telescopic Boom', liftingHeight: '40m', outriggers: 'Hydraulic' }
      },
      'le-crane-50t': {
        name: 'Truck-Mounted Crane 50 t',
        description: 'Maximum capacity truck crane for heavy industrial lifting.',
        fullDescription: 'The 50-ton truck crane represents our most powerful mobile crane for the heaviest industrial and infrastructure projects.',
        features: ['Maximum capacity', 'Heavy industrial', 'Long reach', 'Infrastructure ready', 'Professional operation'],
        specs: { model: 'KTC-50', liftingCapacity: '50 tons', craneType: 'Telescopic Boom', liftingHeight: '48m', outriggers: 'Hydraulic' }
      },
      'le-all-terrain-crane': {
        name: 'All-Terrain Truck-Mounted Crane',
        description: 'All-terrain crane with off-road semi-trailer for remote sites.',
        fullDescription: 'The all-terrain truck-mounted crane features off-road capability with specialized semi-trailer for operation in challenging terrain.',
        features: ['All-terrain', 'Off-road capable', 'Semi-trailer', 'Remote sites', 'High mobility'],
        specs: { model: 'KATC-AT', craneType: 'All-Terrain', wheelFormula: '6x6', drive: 'All-wheel', terrain: 'Off-road capable' }
      },
      'le-earth-auger': {
        name: 'Truck-Mounted Earth Auger Ø 350mm',
        description: 'Truck-mounted drilling auger for foundation and pole installation.',
        fullDescription: 'The truck-mounted earth auger provides efficient drilling for foundation piles, utility poles, and fence installation with Ø 350mm capacity.',
        features: ['Earth drilling', 'Foundation work', 'Pole installation', 'Hydraulic power', 'Efficient operation'],
        specs: { model: 'KEA-350', drillingDiameter: 'Ø 350mm', drillingDepth: 'Up to 3m', drive: 'Hydraulic', mounting: 'Truck-mounted' }
      },
      'le-aerial-platform-18m': {
        name: 'Aerial Work Platform 18 m',
        description: 'Truck-mounted aerial platform for utility and maintenance work.',
        fullDescription: 'The 18-meter aerial work platform provides safe elevated access for utility maintenance, building work, and tree trimming operations.',
        features: ['18m reach', 'Safe platform', 'Utility work', 'Maintenance ready', 'Stable operation'],
        specs: { model: 'KAP-18', platformHeight: '18m', platformCapacity: '250 kg', drive: 'Hydraulic', stabilization: 'Outriggers' }
      },
      'le-aerial-platform-28m': {
        name: 'Aerial Work Platform 28 m',
        description: 'Extended reach aerial platform for high-rise maintenance.',
        fullDescription: 'The 28-meter aerial work platform provides extended reach for high-rise building maintenance, telecommunications, and electrical work.',
        features: ['28m reach', 'High-rise work', 'Telecoms ready', 'Electrical work', 'Extended height'],
        specs: { model: 'KAP-28', platformHeight: '28m', platformCapacity: '250 kg', drive: 'Hydraulic', stabilization: 'Outriggers' }
      },
      'le-aerial-platform-36m': {
        name: 'Aerial Work Platform 36 m',
        description: 'Maximum height aerial platform for specialized applications.',
        fullDescription: 'The 36-meter aerial work platform delivers maximum working height for specialized maintenance, construction, and industrial applications.',
        features: ['36m maximum', 'Specialized work', 'Industrial grade', 'Professional use', 'Superior reach'],
        specs: { model: 'KAP-36', platformHeight: '36m', platformCapacity: '200 kg', drive: 'Hydraulic', stabilization: 'Heavy outriggers' }
      },
      'le-crane-container-3.2t': {
        name: 'Truck-Mounted Crane 3.2 t',
        description: 'Truck crane with container platform for self-loading.',
        fullDescription: 'The 3.2-ton truck crane with container platform enables efficient self-loading and transport of containers and heavy goods.',
        features: ['Self-loading', 'Container transport', 'Efficient', 'Versatile', 'Compact'],
        specs: { liftingCapacity: '3.2 tons', platform: 'Container type', drive: 'Hydraulic' }
      },
      'tt-water-tanker-4-6m3': {
        name: 'Water Tanker 4-6 m³',
        description: 'Compact water tanker for drinking and technical water transport.',
        fullDescription: 'The 4-6 m³ water tanker provides potable and technical water transport for municipal services, construction sites, and rural areas.',
        features: ['Food-grade', 'Compact size', 'Potable water', 'Municipal use', 'Rural service'],
        specs: { model: 'KWT-6', tankVolume: '4-6 m³', material: 'Food-grade steel', pumping: 'Included', certification: 'Drinking water' }
      },
      'tt-water-tanker-allterrain': {
        name: 'Water Tanker All-Terrain 10-12 m³',
        description: 'All-terrain water tanker for off-road water delivery.',
        fullDescription: 'The all-terrain water tanker with 10-12 m³ capacity features off-road capability for remote site water delivery and construction support.',
        features: ['All-terrain', 'Off-road capable', 'Remote delivery', 'Construction support', 'Large capacity'],
        specs: { model: 'KWT-AT12', tankVolume: '10-12 m³', wheelFormula: '6x6', drive: 'All-terrain', material: 'Food-grade steel' }
      },
      'tt-acid-tanker-8-14m3': {
        name: 'Acid Tanker Truck 8-14 m³',
        description: 'Specialized acid tanker for chemical transport.',
        fullDescription: 'The acid tanker truck with 8-14 m³ capacity features corrosion-resistant construction for safe transport of acids and corrosive chemicals.',
        features: ['Acid resistant', 'Chemical transport', 'Safety features', 'ADR compliant', 'Corrosion proof'],
        specs: { model: 'KAT-14', tankVolume: '8-14 m³', material: 'Acid-resistant', lining: 'Rubber/PTFE', certification: 'ADR' }
      },
      'tt-acid-semi-trailer': {
        name: 'Acid Tank Semi-Trailer 14-20 m³',
        description: 'Large capacity acid tank semi-trailer for industrial chemicals.',
        fullDescription: 'The acid tank semi-trailer provides 14-20 m³ capacity for large-scale industrial chemical transport with full safety systems.',
        features: ['Large capacity', 'Semi-trailer', 'Industrial chemicals', 'Safety systems', 'Long distance'],
        specs: { model: 'KATS-20', tankVolume: '14-20 m³', axles: '3-axle', material: 'Acid-resistant', certification: 'ADR/UN' }
      },
      'tt-fuel-semi-trailer': {
        name: 'Fuel Tank Semi-Trailer 30-40 m³',
        description: 'High-capacity fuel tank semi-trailer for petroleum distribution.',
        fullDescription: 'The fuel tank semi-trailer delivers 30-40 m³ capacity for large-scale petroleum product distribution with multiple compartments.',
        features: ['Maximum capacity', 'Multi-compartment', 'Petroleum distribution', 'Long haul', 'Efficient delivery'],
        specs: { model: 'KFTS-40', tankVolume: '30-40 m³', compartments: 'Multi-compartment', axles: '3-axle', certification: 'ADR' }
      },
      'tt-fuel-tanker-4-6m3': {
        name: 'Fuel Tanker ATZ 4-6 m³',
        description: 'Fuel tanker and refueling truck for local distribution.',
        fullDescription: 'Compact fuel tanker and refueller designed for efficient local fuel distribution and on-site refueling.',
        features: ['Fuel distribution', 'Refueling', 'Compact', 'Efficient', 'Local use'],
        specs: { model: 'ATZ-6', tankVolume: '4-6 m³', material: 'Steel', application: 'Refueling' }
      },
      'tt-trailer-refueller-2-4m3': {
        name: 'Trailer Refueller 2-4 m³',
        description: 'Trailer-mounted fuel refueller for flexible deployment.',
        fullDescription: 'Trailer-mounted fuel refueller providing flexible and mobile refueling capabilities for construction sites and remote areas.',
        features: ['Mobile refueling', 'Trailer-mounted', 'Flexible', 'Construction sites', 'Remote areas'],
        specs: { model: 'TR-4', tankVolume: '2-4 m³', chassis: 'Trailer', application: 'Mobile Refueling' }
      },
      'tt-fuel-tanker-8-12m3': {
        name: 'Fuel Tanker ATZ 8-12 m³',
        description: 'Medium capacity fuel tanker for regional distribution.',
        fullDescription: 'Medium capacity fuel tanker designed for efficient regional fuel distribution and on-site refueling operations with 8-12 m³ capacity.',
        features: ['Medium capacity', 'Regional distribution', 'Refueling capable', 'Efficient', 'Versatile'],
        specs: { model: 'ATZ-12', tankVolume: '8-12 m³', material: 'Steel', application: 'Fuel Distribution' }
      },
      'tt-fuel-tanker-16-18m3': {
        name: 'Fuel Tanker ATZ 16-18 m³',
        description: 'Large capacity fuel tanker for commercial distribution.',
        fullDescription: 'Large capacity fuel tanker with 16-18 m³ volume for commercial fuel distribution and large-scale refueling operations.',
        features: ['Large capacity', 'Commercial grade', 'High volume', 'Distribution ready', 'Professional'],
        specs: { model: 'ATZ-18', tankVolume: '16-18 m³', material: 'Steel', application: 'Commercial Distribution' }
      },
      'tt-fuel-tanker-20-25m3': {
        name: 'Fuel Tanker ATZ 20-25 m³',
        description: 'Extra-large fuel tanker for industrial operations.',
        fullDescription: 'Extra-large capacity fuel tanker with 20-25 m³ volume for industrial fuel distribution and large-scale commercial operations.',
        features: ['Extra-large capacity', 'Industrial grade', 'Maximum volume', 'Heavy-duty', 'High efficiency'],
        specs: { model: 'ATZ-25', tankVolume: '20-25 m³', material: 'Steel', application: 'Industrial Distribution' }
      },
      'spm-vacuum-sweeper': {
        name: 'Vacuum Sweeper Truck',
        description: 'Municipal vacuum sweeper for street cleaning.',
        fullDescription: 'The vacuum sweeper truck provides efficient mechanical and vacuum sweeping for municipal street cleaning with dust suppression.',
        features: ['Vacuum sweeping', 'Dust suppression', 'Municipal grade', 'Large hopper', 'Efficient cleaning'],
        specs: { model: 'KVS-Municipal', sweepingWidth: '2.5m', hopperVolume: '6 m³', vacuumSystem: 'Included', waterTank: '1000L' }
      },
      'spm-firefighting-platform': {
        name: 'Firefighting Hydraulic Aerial Platform 72 m',
        description: 'High-rise firefighting and rescue platform.',
        fullDescription: 'The 72-meter firefighting hydraulic aerial platform provides firefighting and rescue capabilities for high-rise buildings and industrial facilities.',
        features: ['72m height', 'Firefighting', 'Rescue capable', 'Water cannon', 'High-rise ready'],
        specs: { model: 'KFF-72', platformHeight: '72m', waterCapacity: '2000L', pumpCapacity: '3000 L/min', reach: 'Up to 65m' }
      },
      'spm-firefighting-platform-52-55m': {
        name: 'Firefighting Hydraulic Aerial Platform 52-55 m',
        description: 'Mid-rise firefighting and rescue platform truck.',
        fullDescription: 'The 52-55 meter firefighting hydraulic aerial platform truck provides firefighting and rescue capabilities for mid-rise buildings and industrial facilities.',
        features: ['52-55m height', 'Firefighting', 'Rescue platform', 'Water system', 'Mid-rise capable'],
        specs: { model: 'KFF-55', platformHeight: '52-55m', waterCapacity: '1800L', pumpCapacity: '2500 L/min', reach: 'Up to 50m' }
      },
      'spm-mobile-workshop': {
        name: 'Mobile Vehicle Repair Workshop (MVRW)',
        description: 'Fully equipped mobile workshop for field maintenance.',
        fullDescription: 'The mobile vehicle repair workshop provides complete on-site maintenance and repair capabilities with tools, equipment, and spare parts storage.',
        features: ['Mobile workshop', 'Complete tools', 'On-site repair', 'Power generation', 'Field ready'],
        specs: { model: 'KMVRW', equipment: 'Full workshop', power: 'Generator 15kW', tools: 'Complete set', storage: 'Organized compartments' }
      },
      'spm-drilling-rig-urb50': {
        name: 'URB-50 Drilling Rig (8×8)',
        description: 'All-terrain drilling rig for exploration and well drilling.',
        fullDescription: 'The URB-50 drilling rig on 8×8 all-terrain chassis provides powerful drilling capability for exploration, water wells, and geotechnical applications.',
        features: ['Deep drilling', '8x8 chassis', 'All-terrain', 'Exploration ready', 'Water wells'],
        specs: { model: 'URB-50', wheelFormula: '8x8', drillingDepth: 'Up to 500m', drive: 'All-wheel', terrain: 'All-terrain' }
      },
      'spm-drilling-rig-zif': {
        name: 'ZIF Drilling Rig',
        description: 'Specialized drilling rig for industrial applications.',
        fullDescription: 'The ZIF drilling rig provides specialized drilling capability for industrial, construction, and geotechnical applications.',
        features: ['Industrial drilling', 'Construction use', 'Geotechnical', 'Hydraulic power', 'Versatile operation'],
        specs: { model: 'ZIF', drillingDepth: 'Up to 300m', applications: 'Industrial/Construction', drive: 'Hydraulic' }
      },
      'spm-dnp-pump-installation': {
        name: 'DNP Pump Installation System',
        description: 'Installation system for lowering pumps into wells.',
        fullDescription: 'The DNP installation system provides safe and efficient installation and removal of pumps in deep wells for oil, water, and industrial applications.',
        features: ['Pump installation', 'Deep wells', 'Oil/Water', 'Safe operation', 'Industrial grade'],
        specs: { model: 'DNP', pumpDepth: 'Up to 2000m', liftingCapacity: '5 tons', applications: 'Oil/Water wells', drive: 'Hydraulic' }
      },
      'spm-admin-convoy': {
        name: 'Administrative Convoy Vehicle',
        description: 'Special-purpose vehicle for administrative convoy transport.',
        fullDescription: 'Designed for safe and comfortable transport of administrative personnel and convoy operations.',
        features: ['Convoy transport', 'Administrative', 'Safe', 'Comfortable', 'Special purpose'],
        specs: { application: 'Administrative', seating: 'Multi-passenger', comfort: 'High' }
      },
      'spm-firefighting-ladder': {
        name: 'Firefighting Aerial Ladder',
        description: 'Firefighting vehicle with aerial ladder and rescue platform.',
        fullDescription: 'Equipped with an aerial ladder and rescue platform, this vehicle ensures effective high-angle firefighting and rescue operations.',
        features: ['Firefighting', 'Aerial ladder', 'Rescue platform', 'High angle', 'Effective'],
        specs: { application: 'Firefighting', equipment: 'Aerial ladder', rescue: 'Platform included' }
      },
      'spm-patrol-pickup': {
        name: 'Patrol Pickup (PPS)',
        description: 'Patrol and guard service pickup for security operations.',
        fullDescription: 'Rugged pickup truck configured for patrol and guard services, offering mobility and reliability for security tasks.',
        features: ['Patrol', 'Guard service', 'Security', 'Mobility', 'Reliability'],
        specs: { chassis: 'Pickup', drive: '4x4', application: 'Patrol/Guard' }
      },
      'am-grain-harvester': {
        name: 'Grain Combine Harvester (Self-Propelled)',
        description: 'Self-propelled combine harvester for efficient grain collection.',
        fullDescription: 'The grain combine harvester provides efficient harvesting of wheat, barley, corn, and other grain crops with advanced threshing and minimal loss.',
        features: ['Self-propelled', 'Large grain tank', 'Wide header', 'Low loss', 'Efficient harvesting'],
        specs: { model: 'KCH-SP', grainTank: '8000L', headerWidth: '6.5m', drive: 'Self-propelled', threshing: 'Advanced system' }
      },
      'am-tractor-n81': {
        name: 'Universal Tractor NURAFSHON N 81 (4×4)',
        description: '4×4 utility tractor based on Belarus platform for versatile farming.',
        fullDescription: 'The NURAFSHON N 81 universal tractor features 4×4 drive on Belarus platform for farming, municipal, and transport operations requiring enhanced traction.',
        features: ['4x4 drive', 'Belarus-based', 'Universal use', 'PTO included', 'Reliable platform'],
        specs: { model: 'N-81 4x4', platform: 'Belarus MTZ', wheelFormula: '4x4', power: '81 HP', drive: 'Mechanical' }
      },
      'am-tractor-earth-auger': {
        name: 'Tractor Equipped with Earth Auger',
        description: 'Tractor with mounted earth auger for agricultural drilling.',
        fullDescription: 'The tractor equipped with earth auger provides efficient drilling for fence posts, tree planting, and agricultural foundation work.',
        features: ['PTO-driven auger', 'Fence installation', 'Tree planting', 'Agricultural use', 'Versatile drilling'],
        specs: { model: 'N-Auger', augerType: 'PTO-driven', drillingDiameter: 'Variable', applications: 'Fence/Trees', drive: 'Tractor PTO' }
      },
      'am-tractor-n81c': {
        name: 'Universal Tractor N 81 C',
        description: 'Universal tractor NURAFSHON N 81 C based on Belarus platform.',
        fullDescription: 'The NURAFSHON N 81 C is a specialized variation of the universal tractor, offering reliable performance for agricultural tasks.',
        features: ['Universal tractor', 'Belarus-based', 'Reliable', 'Agricultural', 'Specialized'],
        specs: { model: 'N-81 C', platform: 'Belarus MTZ', power: '81 HP', drive: 'Mechanical' }
      },
      'og-overhead-bridge': {
        name: 'Overhead Bridge Crane',
        description: 'Heavy-duty overhead bridge crane for industrial facilities.',
        fullDescription: 'Industrial overhead bridge crane system designed for heavy lifting operations in factories, warehouses, and manufacturing facilities with precise load control.',
        features: ['Heavy-duty', 'Precise control', 'Industrial grade', 'Custom span', 'Electric operation'],
        specs: { liftingCapacity: 'Up to 50 tons', span: 'Custom', liftingHeight: 'Custom', control: 'Electric' }
      },
      'og-magnet-grab': {
        name: 'Magnet & Grab Crane',
        description: 'Specialized crane with magnet and grab attachments.',
        fullDescription: 'Overhead crane equipped with electromagnetic and mechanical grab systems for handling scrap metal, bulk materials, and specialized cargo.',
        features: ['Magnet system', 'Grab attachment', 'Scrap handling', 'Bulk materials', 'Versatile operation'],
        specs: { liftingCapacity: 'Up to 32 tons', grabType: 'Electromagnetic/Mechanical', control: 'Electric', applications: 'Scrap/Bulk' }
      },
      'og-container-overhead': {
        name: 'Container Overhead Cranes',
        description: 'Specialized overhead cranes for container handling.',
        fullDescription: 'Heavy-duty overhead crane system designed specifically for efficient container handling in ports, terminals, and logistics facilities.',
        features: ['Container handling', 'Port operations', 'High capacity', 'Automated control', 'Logistics ready'],
        specs: { liftingCapacity: 'Up to 65 tons', containerSize: '20ft/40ft', span: 'Custom', control: 'Automated' }
      },
      'og-single-girder-gantry': {
        name: 'Single-Girder Gantry Crane',
        description: 'Mobile single-girder gantry crane for outdoor operations.',
        fullDescription: 'Single-girder gantry crane with mobile design for outdoor material handling, construction sites, and storage yards with flexible positioning.',
        features: ['Single-girder', 'Mobile design', 'Outdoor capable', 'Flexible span', 'Rail-mounted'],
        specs: { liftingCapacity: 'Up to 20 tons', span: '10-35m', liftingHeight: '6-18m', mobility: 'Rail-mounted' }
      },
      'og-truss-gantry': {
        name: 'Truss Gantry Crane',
        description: 'Heavy-duty truss gantry crane for large-scale operations.',
        fullDescription: 'Robust truss gantry crane with reinforced structure for heavy-duty lifting in shipyards, construction sites, and industrial facilities.',
        features: ['Truss structure', 'Heavy-duty', 'Large span', 'Shipyard grade', 'Industrial operations'],
        specs: { liftingCapacity: 'Up to 100 tons', span: '20-50m', structure: 'Truss design', applications: 'Shipyard/Industrial' }
      }
    },
  },

  ru: {
    locale: 'ru',
    nav: {
      home: 'Главная',
      catalog: 'Грузовики',
      services: 'Услуги',
      about: 'О нас',
      blog: 'Новости',
      careers: 'Карьера',
      contacts: 'Контакты',
      products: 'Продукция',
      customSolutions: 'Спецрешения',
    },
    cookieConsent: {
      title: 'Настройки Cookie',
      description: 'Мы используем файлы cookie для улучшения работы сайта. Обнаружен сигнал Global Privacy Control (GPC).',
      acceptAll: 'Принять все',
      necessaryOnly: 'Только необходимые',
      settings: 'Настройки',
    },
    customSolutionsPage: {
      heroTitle: 'Спецрешения',
      heroIntro: 'Индивидуальные инженерные решения, адаптированные под ваши уникальные задачи. Мы превращаем сложные идеи в надежную промышленную реальность.',
      intro: {
        title: 'Ваше Видение,\nНаш Опыт',
        desc1: 'Более 75 лет мы сотрудничаем с предприятиями по всему миру, разрабатывая технику, расширяющую границы возможного в тяжелом машиностроении.',
        desc2: 'От консультации до проектирования и производства — наша команда предлагает решения, превосходящие ожидания.',
        stats: {
          projects: 'Спецпроектов',
          experience: 'Лет Опыта',
        },
      },
      metalStructures: {
        title: 'Промышленные Металлоконструкции',
        description: 'Проектирование и изготовление сложных промышленных металлоконструкций. Мы предлагаем полные решения от проектирования до финальной сборки, обеспечивая максимальную долговечность и соответствие международным стандартам.',
      },
      capabilities: {
        title: 'Возможности Кастомизации',
        subtitle: 'Комплексные инженерные и производственные услуги под ваши требования',
        items: {
          chassis: {
            title: 'Модификация Шасси',
            description: 'Полная модификация шасси, включая колесную базу и трансмиссию для спецзадач.',
            capabilities: [
              'Удлинение колесной базы',
              'Усиление рамы',
              'Спецподвеска',
              'Интеграция трансмиссии'
            ]
          },
          complexes: {
            title: 'Спецтранспорт',
            description: 'Тяжелые транспортные комплексы и системы погрузки для экстремальных условий.',
            capabilities: [
              'Многоосные тягачи',
              'Системы погрузки',
              'Спецплатформы',
              'Интеграция оборудования'
            ]
          },
          hydraulics: {
            title: 'Гидравлика и Электроника',
            description: 'Интеграция гидросистем и электронного управления для точности и автоматизации.',
            capabilities: [
              'Автоматизация',
              'Гидроконтуры',
              'Мониторинг',
              'Дистанционное управление'
            ]
          },
          containers: {
            title: 'Нестандартные Контейнеры',
            description: 'Изготовление контейнеров и емкостей под заказ, включая термоцистерны.',
            capabilities: [
              'Сосуды под давлением',
              'Термоцистерны',
              'Геометрия на заказ',
              'Спецхранение'
            ]
          }
        }
      },
      production: {
        title: 'Наше Производство',
        subtitle: 'Передовое оборудование и опытные специалисты.',
        items: {
          manufacturing: { title: 'Производственная Площадка', desc: '15,000м² цехов' },
          cnc: { title: 'ЧПУ Обработка', desc: 'Точность ±0.01мм' },
          welding: { title: 'Сварка', desc: 'MIG, TIG, Роботы' },
          assembly: { title: 'Сборка и Тесты', desc: 'Строгий контроль качества' },
        }
      },
      cta: {
        title: 'Готовы Начать Проект?',
        description: 'Свяжитесь с нами для обсуждения.',
        button: 'Запросить Консультацию',
      },
    },
    home: {
      build: {
        explore: 'Подробнее',
      },
      process: {
        explore: 'Изучить Процесс',
      },

      since: 'С 1945 года',
      title: 'Инженерная\nМощь',
      subtitle: 'Движущая сила прогресса. Производство полного цикла промышленных транспортных средств, кранов и сельскохозяйственной техники для самых сложных условий.',
      exploreCatalog: 'Исследовать Каталог',
      contactUs: 'Связаться',
      inquiryForm: 'Форма Запроса',
    },
    stats: {
      equipment: 'Видов Оборудования',
      projects: 'Выполненных Проектов',
      employees: 'Сотрудников',
      experience: 'Лет Опыта',
    },
    intro: {
      welcomeTitle: 'Добро пожаловать в KRANTAS Group',
      welcomeDesc: 'Наследие инженерного совершенства с 1945 года. Мы проектируем и производим высокопроизводительные промышленные транспортные средства, краны и специализированное оборудование для самых сложных условий эксплуатации.',
      fleetRecovery: 'Комплексное Восстановление Парка',
      fleetRecoveryDesc: 'Специализация на сложном восстановлении грузовиков и тяжелых кранов. Наше предприятие выполняет все — от сложного фрезерования и шлифовки до полномасштабных слесарных работ.',
      fabrication: 'Передовые Стандарты Изготовления',
      fabricationDesc: 'Мы используем современные технологии, включая плазменную резку и ЧПУ обработку, чтобы обеспечить структурную целостность, превышающую отраслевые стандарты.',
      advisory: 'Стратегический Консалтинг по Оборудованию',
      advisoryDesc: 'Минимизируйте простои с правильным оборудованием. Наши специалисты предоставляют углубленную техническую поддержку, чтобы ваше оборудование идеально соответствовало вашим эксплуатационным требованиям.',
    },
    aboutHome: {
      title: 'О Нас',
      heading: 'От Ремонтной Мастерской к Лидеру Отрасли',
      description: 'Наш завод был основан в 1945 году как механический ремонтный завод. После землетрясения 1966 года мы перешли к производству стальных конструкций и подъемного оборудования. Сегодня KRANTAS Group — производитель полного цикла с современным оборудованием.',
      points: ['Производство полного цикла', 'Экспорт в Центральную Азию', 'Международные сертификаты'],
      learnMore: 'Узнать Больше О Нас',
    },
    mission: {
      title: 'Наша Миссия',
      heading: 'Локализация, Укрепляющая Промышленность',
      description: 'Мы строим промышленную независимость Узбекистана, создавая сеть, где национальные предприятия лидируют вместе. Это больше, чем бизнес — это предоставление локальных альтернатив, которые превосходят импорт, и окончательный разрыв зависимости от зарубежных поставок. Мы не просто поставляем запчасти; мы партнеримся с вами, чтобы сделать всю вашу операцию более эффективной и прибыльной.',
      qualityFirst: 'Качество Прежде Всего',
      qualityFirstDesc: 'Международные стандарты — наша базовая линия, а не дополнительная мысль. Мы создали культуру, где точность — единственный инстинкт, потому что в этой отрасли нет места для «достаточно близко».',
      localProduction: 'Местное Производство',
      localProductionDesc: 'Мы — двигатель за печатью «Сделано в Узбекистане». Держать производство здесь, мы предлагаем уровень надежности и быстрого реагирования, который иностранные конкуренты просто не могут достичь.',
      globalStandards: 'Мировые Стандарты',
      globalStandardsDesc: 'Мы мостим разрыв между местным мастерством и высококачественной инженерией. Вы получаете близость местного партнера в сочетании с технической мощью передового производителя.',
    },
    equipment: {
      title: 'Решения для Оборудования',
      heading: 'Что Мы Производим',
      viewAll: 'Смотреть Все Категории',
      customSolutions: 'Индивидуальные Решения',
      customDesc: 'Наш опыт. Инженерные решения, адаптированные под ваши уникальные требования.',
    },
    products: {
      title: 'Избранные Продукты',
      heading: 'Создано для Реальных Условий',
      viewAll: 'Смотреть Все Продукты',
      specs: 'Характеристики',
      features: 'Особенности',
      inquiry: 'Отправить Запрос',
    },
    production: {
      title: 'Производство',
      heading: 'Производство Полного Цикла',
      description: 'Проектирование → оснастка → металлоконструкции → сборка → тестирование → сертификация. Всё внутри компании с современным оборудованием.',
      modeling: '3D Моделирование и Инжиниринг',
      modelingDesc: 'Полное проектирование и детализация с использованием современного CAD программного обеспечения для точного производства.',
      cnc: 'ЧПУ Обработка',
      cncDesc: 'Высокоточная обработка компонентов с допусками до ±0.01мм.',
      cutting: 'Плазменная и Лазерная Резка',
      cuttingDesc: 'Передовые технологии резки для сложных форм и чистых кромок.',
      welding: 'Сварка и Изготовление',
      weldingDesc: 'Сертифицированные сварочные процессы, включая MIG, TIG и роботизированную сварку.',
      surface: 'Поверхностная Обработка',
      surfaceDesc: 'Дробеструйная очистка, грунтовка и покраска для защиты от коррозии.',
      assembly: 'Сборка и Тестирование',
      assemblyDesc: 'Полная сборка с жестким контролем качества и протоколами тестирования.',
    },
    cta: {
      title: 'Готовы Обсудить Ваш Проект?',
      description: 'Наши специалисты помогут выбрать подходящее оборудование и предоставят детальное коммерческое предложение.',
      button: 'Связаться',
    },
    footer: {
      description: 'Инженерная мощь с 1945 года. Производство полного цикла промышленных транспортных средств и оборудования.',
      navigation: 'Навигация',
      products: 'Продукты',
      contact: 'Контакты',
      rights: 'Все права защищены.',
      privacy: 'Политика Конфиденциальности',
      terms: 'Условия Использования',
      viewAll: 'Смотреть Все →',
    },
    productsPage: {
      title: 'Наша Продукция и Решения',
      heroIntro: 'Полный спектр инженерного совершенства. Откройте для себя нашу спецтехнику по индивидуальным заказам и обширный каталог проверенных машин.',
      heading: 'Инженерное Совершенство',
      description: 'KRANTAS Group предлагает полный портфель промышленных решений. Будь то специализированное транспортное средство, построенное по вашим точным спецификациям, или проверенная модель из каталога, мы обеспечиваем надежность и качество, которые требуются вашему бизнесу.',
      customTitle: 'Индивидуальные Инженерные Решения',
      customDesc: 'В KRANTAS мы понимаем, что у каждой операции свои уникальные требования. Наше подразделение индивидуальной инженерии специализируется на проектировании и производстве специализированной техники и оборудования под ваши задачи.',
      customPoints: {
        1: 'Полная консультация и инженерная поддержка',
        2: 'Разработка прототипов и тестирование',
        3: 'Специализированные модификации и интеграции',
      },
      customLink: 'Узнать Больше о Решениях',
      catalogTitle: 'Каталог Стандартной Продукции',
      catalogDesc: 'Наш каталог включает широкий спектр проверенной промышленной техники. Каждая модель спроектирована для надежности, построена из качественных материалов и подкреплена десятилетиями производственного опыта.',
      catalogPoints: {
        1: 'Готовые к эксплуатации стандартные конфигурации',
        2: 'Широкий спектр категорий и применений',
        3: 'Конкурентные цены и быстрая доставка',
      },
      catalogLink: 'Смотреть Полный Каталог',
    },
    catalog: {
      title: 'Каталог Продуктов',
      subtitle: 'От тяжелых грузовиков до точных подъемных систем — разработано для реальных условий эксплуатации.',
      heroIntro: 'Изучите наш широкий ассортимент промышленной техники и оборудования. Каждая модель спроектирована для надежности и соответствует международным стандартам.',
      categories: 'Категории',
      showAll: 'Показать Все Продукты',
      welcomeTitle: 'Каталог Продуктов',
      customSolution: 'Нужно Индивидуальное Решение?',
      customDesc: 'Мы проектируем и производим оборудование по вашим специфическим требованиям.',
      backToCatalog: 'Назад в Каталог',
      filter: 'Фильтр по Категории',
      noProducts: 'Продукты не найдены',
    },
    services: {
      title: 'Наши Услуги',
      heading: 'Комплексная Поддержка',
      welcomeTitle: 'Наши Услуги',
      heroIntro: 'Комплексная поддержка вашего промышленного парка. От экспертного обслуживания и оригинальных запчастей до спецпроектов и технической поддержки.',
      introHeadline: 'Создано для долгой службы. \nПоддержка на всю жизнь.',
      introP1: 'Мы знаем, что в вашем мире нет места оправданиям. Вот почему мы создали структуру поддержки, такую же прочную, как и наше оборудование.',
      introP2: 'Выбирая Krantas, вы не просто покупаете промышленный актив; вы обретаете преданную команду, которая стоит за каждым километром и каждым подъемом.',
      stats: {
        centers: 'Сервис-центров',
        parts: 'Запчастей в наличии',
      },
      subtitle: 'От производства до послепродажного обслуживания — мы предоставляем полный спектр услуг для обеспечения максимальной производительности вашей техники.',
      supportCenter: 'Центр Поддержки',
      supportDesc: 'Наши высококвалифицированные специалисты помогут вам выбрать подходящее оборудование и ответят на все технические вопросы.',
      facilities: 'Наши Объекты',
      items: {
        afterSales: {
          title: 'Послепродажное Обслуживание и Поддержка',
          shortTitle: 'Сервис',
          description: 'Техническое обслуживание, гарантия, запасные части и специализированная поддержка на протяжении всего жизненного цикла продукта. Наши сервисные центры оснащены передовыми диагностическими инструментами, чтобы ваш автопарк оставался работоспособным в самых сложных условиях. Мы предоставляем группы быстрого реагирования для ремонта на месте и поддерживаем полный запас оригинальных компонентов для минимизации простоев.',
          stages: {
            maintenance: { name: 'Обслуживание', desc: 'Регулярный сервис' },
            repairs: { name: 'Ремонт', desc: 'Быстро и надежно' },
            parts: { name: 'Запчасти', desc: 'Оригинальные детали' },
            support: { name: 'Поддержка', desc: 'Помощь 24/7' }
          }
        },
        quality: {
          title: 'Контроль Качества и Сертификация',
          shortTitle: 'Качество',
          description: 'Обеспечение качества на каждом этапе производства и соответствие обязательным сертификационным требованиям. Каждое транспортное средство проходит строгий многоточечный контроль, включая испытания конструкций на нагрузку и проверку гидравлических систем на соответствие международным стандартам безопасности. Наши лаборатории проводят анализ материалов и прецизионные проверки, гарантируя долговечность и надежность каждого изделия под маркой Krantas.',
          stages: {
            inspection: { name: 'Инспекция', desc: 'Строгий контроль' },
            testing: { name: 'Тестирование', desc: 'Проверка параметров' },
            certification: { name: 'Сертификация', desc: 'Мировые стандарты' },
            documentation: { name: 'Документация', desc: 'Полный пакет' }
          }
        },
        localization: {
          title: 'Локализация и Интеграция',
          shortTitle: 'Локализация',
          description: 'Поддержка проектов промышленной локализации и трансфер технологий для региональных рынков. Мы преодолеваем разрыв между мировым инженерным совершенством и местными производственными возможностями, помогая партнерам создавать надежные производственные линии в регионе. Наша команда предоставляет комплексные консультации по оптимизации цепочки поставок и адаптации технической документации для бесшовной интеграции в местные промышленные экосистемы.',
          stages: {
            analysis: { name: 'Анализ', desc: 'Изучение требований' },
            adaptation: { name: 'Адаптация', desc: 'Локализация продукта' },
            integration: { name: 'Интеграция', desc: 'Совместимость систем' },
            training: { name: 'Обучение', desc: 'Передача знаний' }
          }
        },
        manufacturing: {
          title: 'Производство и Сборка',
          shortTitle: 'Производство',
          description: 'Серийное и проектное производство, обеспечивающее платформу полного цикла на всех ключевых этапах. Наше предприятие площадью 15 000 м² — от обработки сырья до окончательной сборки — использует высокоточную обработку на станках с ЧПУ и автоматизированную сварку для обеспечения стабильной целостности конструкции. Мы осуществляем весь производственный цикл собственными силами, гарантируя, что каждый проект — будь то стандартная единица или сложный промышленный комплекс — будет выполнен точно по спецификациям.',
          stages: {
            design: { name: 'Проектирование', desc: '3D-моделирование' },
            fabrication: { name: 'Изготовление', desc: 'Резка и формовка' },
            assembly: { name: 'Сборка', desc: 'Интеграция узлов' },
            testing: { name: 'Испытания', desc: 'Проверка качества' }
          }
        },
        engineering: {
          title: 'Инжиниринг и Кастомизация',
          shortTitle: 'Инжиниринг',
          description: 'Индивидуальные инженерные решения и адаптация продукции под конкретные эксплуатационные требования. Наше конструкторское бюро использует передовое 3D-моделирование и моделирование конструкций для разработки машин, решающих уникальные задачи на объектах. Мы специализируемся на преобразовании сложных технических требований в высокопроизводительные промышленные активы, предлагая полную конструктивную и механическую настройку для специализированных отраслей.',
          stages: {
            consulting: { name: 'Консалтинг', desc: 'Техэкспертиза' },
            design: { name: 'Дизайн', desc: 'Спецрешения' },
            prototyping: { name: 'Прототипирование', desc: 'Проверка концепции' },
            implementation: { name: 'Внедрение', desc: 'Полный запуск' }
          }
        }
      },
      facilitiesList: {
        warehouse: {
          title: 'Склад',
          description: 'Современные складские помещения для управления запчастями и комплектующими. Площадь более 5000 кв.м.'
        },
        serviceStation: {
          title: 'Сервисная Станция',
          description: 'Полностью оборудованные боксы для обслуживания и ремонта. Современное диагностическое оборудование.'
        },
        spareParts: {
          title: 'Центр Запасных Частей',
          description: 'Большой склад оригинальных запчастей и быстрая доставка. Более 10 000 наименований в наличии.'
        }
      },
      inquiryForm: 'Форма Запроса'
    },
    about: {
      title: 'О Нас',
      heroTitle: 'Наследие Krantas',
      heroIntro: 'Инженерная мощь с 1945 года. Наше наследие строится на производстве полного цикла промышленного оборудования для самых сложных условий.',
      heading: 'Инженерная Мощь с 1945 года',
      welcomeTitle: 'О Компании',
      subtitle: 'От механической мастерской до производственной группы полного цикла, обслуживающей Центральную Азию и страны зарубежья.',
      story: 'Наша История',
      storyP1: 'Наш завод был основан в 1945 году как механический ремонтный завод для грузовиков и тяжелой техники. В первые годы мы специализировались на поддержании автопарка региона, завоевав репутацию мастеров высокого качества.',
      storyP2: 'После разрушительного землетрясения 1966 года завод был перепрофилирован и начал производство стальных конструкций и подъемного оборудования для гражданского и промышленного строительства.',
      storyP3: 'После обретения Узбекистаном независимости и последующей приватизации начался новый этап. Мы инвестировали в современные технологии, расширили ассортимент продукции и вышли на международные рынки.',
      storyP4: 'Сегодня KRANTAS Group — это производитель полного цикла с современными возможностями ЧПУ-обработки, сварки, плазменной/лазерной резки и сборки.',
      family: 'Семья KRANTAS',
      familyDesc: 'Поколения, преданные делу. Десятилетия опыта. Люди, которые делают KRANTAS больше, чем просто компанией.',
      familyQuote: '"Я работаю в KRANTAS более 30 лет. Я видел, как эта компания выросла из небольшой мастерской в крупного производителя. Гордость, которую я испытываю, видя нашу технику работающей по всей стране, неизмерима."',
      familyQuoteAuthor: '— Рустам Хасанов, Главный Инженер',
      joinFamily: 'Присоединяйтесь к Нашей Семье',
      history: 'История и Достижения',
      production: 'Этапы Производства',
      manufacturing: 'Производство Полного Цикла',
      manufacturingDesc: 'Завод имеет собственное конструкторское бюро для независимой разработки проектов и рабочих чертежей новых типов спецтехники в соответствии с последними мировыми трендами.',
      manufacturingFeatures: ['3D Моделирование и Деталировка', 'Разработка Оснастки', 'Металлоконструкции', 'Сборка и Испытания', 'Контроль Качества', 'Сертификация'],
      chairman: 'Обращение Председателя',
      chairmanQuote: '"KRANTAS Group строится на сильных инженерных традициях, локальном производстве и четком видении будущего. KRANTAS — это не просто машина, это надежное инженерное решение."',
      chairmanName: 'Каримов Мухтор Акбарович',
      chairmanTitle: 'Председатель, KRANTAS Group',
      team: 'Руководство, которое строит',
      teamSubtitle: '',
      certificates: 'Стандарты Качества',
      historyEvents: {
        1945: { title: 'Основание', description: 'Основан как механический ремонтный завод для грузовиков и тяжелой техники в Ташкенте.' },
        1963: { title: 'Расширение', description: 'Начало производства стальных конструкций и подъемного оборудования для строительства.' },
        1990: { title: 'Диверсификация', description: 'Расширение в производство спецтехники и автокранов.' },
        2000: { title: 'Модернизация', description: 'Внедрение ЧПУ-обработки и автоматизированных сварочных систем.' },
        2012: { title: 'Запуск Бренда', description: 'Запуск бренда автокранов KRANTAS с полной сертификацией.' },
        2015: { title: 'Международный Рост', description: 'Выход на рынки Казахстана и Туркменистана с экспортной сертификацией.' },
        2020: { title: 'Новые Мощности', description: 'Открытие новых сборочных линий и расширение производства сельскохозяйственной техники.' },
        2024: { title: 'Взгляд в Будущее', description: 'Разработка следующего поколения надежных промышленных автомобилей.' },
      },
      teamMemberStories: {
        sergey: {
          name: 'Петров Сергей',
          role: 'Заместитель Директора',
          years: '50+ лет с KRANTAS',
          text: 'От молодого специалиста в 1972 году до руководства операциями на посту заместителя директора сегодня. Свидетель трансформации KRANTAS из экспериментального завода в современного производителя с сохранением ключевых ценностей.'
        },
        komil: {
          name: 'Комил Хаитматов',
          role: 'Мастер Сборки',
          years: '45 лет с KRANTAS',
          text: 'Начал водителем в 1980 году, вырос до мастера по сборке кранов. От грузовиков КАМАЗ до 60-тонных кранов — он был частью каждой трансформации.'
        },
        elvira: {
          name: 'Эльвира',
          role: 'Оператор Мостового Крана',
          years: 'Третье поколение · 10+ лет',
          text: 'Родители, бабушки, дедушки и братья работали в KRANTAS. Отец: 40 лет маляром. Мать: 37 лет крановщицей. Наследие преданности делу.'
        }
      },
      certificatesList: {
        1: { name: 'Сертификат', desc: 'ООО "KRANTAS"', org: 'Дирекция Международной Промышленной Ярмарки и Кооперационной Биржи' },
        2: { name: 'Сертификат', desc: 'ООО "Кран и Спецтехника"', org: 'Дирекция Международной Промышленной Ярмарки и Кооперационной Биржи' },
        3: { name: 'Сертификат', desc: 'ООО "ТТЭМЗ"', org: 'Дирекция Международной Промышленной Ярмарки и Кооперационной Биржи' },
        4: { name: 'Награда за Эффективность', desc: 'Global Specific Performance Award 2022', org: 'FOTON' },
        5: { name: 'Диплом', desc: 'Туркменское Строительство 2015', org: 'Торгово-промышленная палата' },
        6: { name: 'Сертификат', desc: '17-я Казахстанская Международная Строительная Выставка', org: 'Astana Build' },
      },
      partners: 'Наши Партнеры',
      partnersDesc: 'Мы сотрудничаем с ведущими мировыми производителями, чтобы гарантировать высочайшее качество компонентов и технологий в наших продуктах.',
      geography: 'География Поставок',
      geographyDesc: 'KRANTAS Group поставляет оборудование по всей Центральной Азии и за ее пределы. Наша продукция работает в самых разных условиях — от гор Кыргызстана до пустынь Туркменистана.',
      distributors: {
        title: 'Наши Дистрибьюторы',
        description: 'KRANTAS Group сотрудничает с ведущими дистрибьюторами в Центральной Азии и за ее пределами. Наша сеть гарантирует, что где бы вы ни работали, у вас будет доступ к качественному промышленному оборудованию, поддерживаемому местным опытом и поддержкой.',
        mapLegend: 'Подробное покрытие в 6 странах и более чем в 15 городах',
        centersTitle: 'Региональные распределительные центры',
        regionalBranch: 'Региональный филиал',
        regionalCenter: 'Региональный центр',
        mountainSpecialist: 'Горный специалист',
        emergingMarkets: 'Развивающиеся рынки',
        countries: {
          azerbaijan: 'Азербайджан',
          kazakhstan: 'Казахстан',
          kyrgyzstan: 'Кыргызстан',
          tajikTurkmen: 'Таджикистан и Туркменистан'
        }
      },
      teamRoles: {
        director: 'Директор',
        deputyDirector: 'Заместитель директора',
        deputyDirectorProduction: 'Заместитель директора по производству',
        assemblyTechnician: 'Мастер сборки',
        craneOperator: 'Оператор мостового крана'
      }
    },
    blog: {
      title: 'Новости',
      subtitle: 'Последние новости, обновления и инсайты с завода.',
      heroIntro: 'Последние новости и стратегические достижения KRANTAS Group. Будьте в курсе наших новых партнерств, производственных этапов и регионального развития.',
      latest: 'Последние Статьи',
      stayUpdated: 'Будьте в Курсе',
      newsletter: 'Подпишитесь на нашу рассылку, чтобы получать последние новости и аналитику отрасли.',
      subscribe: 'Подписаться',
      explore: 'Перейти в Раздел Новостей',
      newsTeam: 'Пресс-служба',
      readOriginal: 'Читать Оригинал',
      posts: {
        1: {
          title: 'Визит Президента на завод Krantas Group',
          excerpt: 'Президент Шавкат Мирзиёев посетил наши производственные мощности, подчеркнув важность промышленной локализации и расширения ассортимента спецтехники до более чем 60 видов.'
        },
        2: {
          title: 'Расширение производства военной и спецтехники',
          excerpt: 'Krantas Group объявляет о планах реализации проекта стоимостью 55 млн долларов в Нурафшане по производству легких бронированных машин и специализированных грузовиков.'
        },
        3: {
          title: 'Мировой дебют: Tarlon и Qalqon на IDEX-2023',
          excerpt: 'Мы с гордостью представили наши новейшие легкие бронированные машины Tarlon и Qalqon на международной оборонной выставке в ОАЭ, продемонстрировав инженерное мастерство Узбекистана.'
        },
        4: {
          title: 'Стратегическое партнерство с МАЗ и МТЗ',
          excerpt: 'Krantas Group укрепляет международные связи, обсуждая с белорусскими партнерами проект по сборке тракторов и промышленного оборудования в Узбекистане.'
        },
        5: {
          title: 'Поставка сверхтяжелой техники для АГМК',
          excerpt: 'Наши высокопроизводительные самосвалы были переданы Алмалыкскому горно-металлургическому комбинату, поддерживая модернизацию горнодобывающей промышленности страны.'
        },
        6: {
          title: 'Arslon: Первый отечественный бронетранспортер',
          excerpt: 'Разработанный по международным стандартам, наш новый БТР «Арслон» поступил на государственные испытания, став важной вехой в отечественном оборонном производстве.'
        },
        7: {
          title: 'Крупный проект реновации и развития инфраструктуры',
          excerpt: 'Предложен масштабный проект городского развития стоимостью 333 млн долларов на нашей текущей площадке в Мирзо-Улугбекском районе, открывающий путь для современной жилой инфраструктуры.'
        }
      },
      featured: {
        lorem1: 'Подробности о наших последних инженерных прорывах и методиках тестирования.',
        lorem2: 'Мы продолжаем расширять границы возможного в производстве тяжелого машиностроения.'
      }
    },
    careers: {
      title: 'Карьера в KRANTAS',
      welcomeTitle: 'Присоединяйтесь к Нам',
      heroIntro: 'Создавайте следующее поколение промышленных технологий вместе с KRANTAS. Мы приглашаем преданных делу профессионалов в нашу инженерную и производственную команду.',
      subtitle: 'Создавайте новое поколение промышленной техники. Присоединяйтесь к команде, которая ценит точность, безопасность и рост.',
      whyWork: 'Почему Стоит Работать у Нас?',
      team: 'Почетные Сотрудники',
      openPositions: 'Открытые Вакансии',
      apply: 'Подать Заявку',
      applyNow: 'Подать Сейчас',
      fullName: 'Полное Имя',
      email: 'Email',
      phone: 'Телефон',
      message: 'Сообщение',
      submit: 'Отправить Заявку',
      cancel: 'Отмена',
      joinTeam: 'Станьте частью команды, где инженерное мастерство встречается с традициями.',
      experienceLabel: 'Опыт:',
      ageLabel: 'Возраст:',
      requirementsLabel: 'Требования:',
      fullTime: 'Полная занятость',
      applyPopupTitle: 'Заявка на Вакансию',
      namePlaceholder: 'Ваше полное имя',
      emailPlaceholder: 'your@email.com',
      phonePlaceholder: '+998 XX XXX XX XX',
      agePlaceholder: 'Лет',
      experiencePlaceholder: 'Лет',
      messagePlaceholder: 'Расскажите о себе...',
      positions: {
        1: {
          title: 'Инженер-механик',
          department: 'Инжиниринг',
          location: 'Ташкент',
          experience: '3-5 лет',
          age: '25-45',
          description: 'Проектирование механических систем спецтехники. Работа в CAD-программах.',
          requirements: ['Высшее техническое образование', 'Опыт работы в CAD', 'Знание производственных процессов', 'Навыки решения проблем']
        },
        2: {
          title: 'Сварщик',
          department: 'Производство',
          location: 'Ташкент',
          experience: '2+ года',
          age: '20-50',
          description: 'Выполнение сварочных работ на металлоконструкциях. Соблюдение стандартов качества и безопасности.',
          requirements: ['Наличие сертификата', 'Опыт MIG/TIG сварки', 'Знание правил ТБ', 'Чтение чертежей']
        },
        3: {
          title: 'Оператор ЧПУ',
          department: 'Производство',
          location: 'Ташкент',
          experience: '2-4 года',
          age: '22-45',
          description: 'Работа на станках с ЧПУ для высокоточной обработки. Программирование и обслуживание.',
          requirements: ['Техническое образование', 'Программирование ЧПУ', 'Знание G-кодов', 'Внимательность к деталям']
        },
        4: {
          title: 'Менеджер по Продажам',
          department: 'Продажи',
          location: 'Ташкент',
          experience: '3+ года',
          age: '25-40',
          description: 'Развитие отношений с клиентами. Поиск новых секторов рынка.',
          requirements: ['Высшее образование', 'Опыт в B2B продажах', 'Коммуникабельность', 'Знание рынка']
        }
      },
      teamMembers: {
        sergey: {
          name: 'Сергей Петров',
          role: 'Заместитель Директора по Производству',
          story: 'Более 50 лет в KRANTAS. Руководил трансформацией завода в современного производителя.'
        },
        komil: {
          name: 'Комил Хаитматов',
          role: 'Мастер Сборки',
          story: '45 лет в KRANTAS. Мастер сборки крановой техники.'
        },
        elvira: {
          name: 'Эльвира',
          role: 'Оператор Мостового Крана',
          story: 'Третье поколение в KRANTAS. Управляет кранами с высочайшей точностью.'
        }
      }
    },
    contacts: {
      title: 'Контакты',
      welcomeTitle: 'Мы Всегда на Связи',
      heroIntro: 'Наша команда готова помочь с вашими техническими или коммерческими вопросами. Свяжитесь с нашим головным офисом в Ташкенте для профессиональной поддержки.',
      subtitle: 'Узнайте больше о продукции, услугах или партнерстве. Отвечаем в течение 1-2 рабочих дней.',
      info: 'Контактная Информация',
      form: 'Отправить Сообщение',
      departments: 'Наши Отделы',
      address: 'Мирзо-Улугбекский район, ул. Зиёлилар 1, Ташкент, Узбекистан',
      phone: '+998 71 123 45 67',
      email: 'info@krantas.uz',
      sales: 'Отдел Продаж',
      support: 'Техническая Поддержка',
      parts: 'Запасные Части',
      service: 'Сервисный Центр',
      hr: 'Отдел Кадров',
      export: 'Отдел Экспорта',
      name: 'Ваше Имя',
      emailLabel: 'Ваш Email',
      messageLabel: 'Ваше Сообщение',
      send: 'Отправить Сообщение',
      heroTitle: 'Свяжитесь с Нами',
      teamReady: 'Наша команда готова помочь с любыми вопросами о продукции, услугах или инженерных решениях.',
      headquarters: {
        title: 'Головной Офис KRANTAS Group',
        description: 'Офис расположен примерно в 30 минутах от международного аэропорта Ташкента и центра города.',
        officeLabel: 'Наш Офис',
        postalCodeLabel: 'Почтовый Индекс',
        contactInfoLabel: 'Контактная Информация'
      },
      formTitle: 'Контактная Форма',
      inquiryForm: 'Форма Запроса',
      companyLabel: 'Компания',
      organizationPlaceholder: 'Ваша организация',
      areaOfInterestLabel: 'Область Интереса',
      selectAreaPlaceholder: 'Выберите область',
      phoneLabel: 'Номер Телефона',
      emailPlaceholder: 'vash@email.com',
      successMessage: 'Сообщение отправлено! Мы свяжемся с вами в течение 1-2 рабочих дней.',
      subjectOptions: {
        lifting: 'Подъемное Оборудование',
        dump: 'Самосвалы',
        special: 'Спецтехника',
        metal: 'Металлоконструкции',
        agricultural: 'Сельхозтехника',
        tanks: 'Автоцистерны',
        mining: 'Карьерные Самосвалы',
        cranes: 'Мостовые и Козловые Краны',
        custom: 'Индивидуальные Решения',
        service: 'Запчасти и Сервис',
        careers: 'Карьера / Трудоустройство',
        other: 'Другой Запрос'
      }
    },
    equipmentSolutions: {
      title: 'Индивидуальный Инжиниринг',
      heading: 'Уникальные Спецрешения',
      welcomeTitle: 'Заказные Решения',
      subtitle: 'Воплотите ваше видение в реальность с нашими возможностями инжиниринга. От идеи до производства — мы создаем решения под ваши нужды.',
      howItWorks: 'Как Это Работает',
      howItWorksTitle: 'Вы Можете Предложить Любую Идею',
      howItWorksDesc1: 'Наша инженерная команда тесно сотрудничает с вами для понимания операционных задач. Нужна ли вам модификация шасси или уникальная техника — у нас есть опыт для реализации.',
      howItWorksDesc2: 'От первой консультации до проектирования, прототипирования и производства мы поддерживаем открытый диалог для достижения лучшего результата.',
      capabilities: 'Производственная База',
      capabilitiesTitle: 'Наши Возможности и База',
      types: 'Услуги',
      typesTitle: 'Виды Кастомизации',
      chassis: 'Модификация Шасси',
      chassisDesc: 'Полная модификация шасси, включая изменение колесной базы, модернизацию трансмиссии и усиление конструкции.',
      complexes: 'Специализированный Транспортный Инжиниринг',
      complexesDesc: 'Проектирование и производство высокопроизводительных транспортных комплексов, разработанных для экстремальных условий эксплуатации. Мы поставляем индивидуальные многоосные конфигурации и автоматизированные системы погрузки, созданные для долговечности и точности.',
      hydraulics: 'Гидравлика и Электроника',
      hydraulicsDesc: 'Интеграция передовых гидравлических систем и электронного управления для точности и автоматизации.',
      containers: 'Нестандартные Контейнеры',
      containersDesc: 'Изготовление контейнеров для спецгрузов, включая термоцистерны, сосуды под давлением и уникальную геометрию.',
      discussProject: 'Обсудить Проект',
      customProject: 'Есть проект на примете?',
      customProjectDesc: 'Наши инженеры готовы обсудить ваши требования и разработать решение, идеально подходящее для вашего бизнеса.',
      startProject: 'Начать Проект',
      viewProducts: 'Смотреть Стандартную Продукцию',
    },
    categories: {
      'lifting-equipment': { name: 'Подъемное Оборудование', description: 'Автокраны и подъемные решения для строительства и промышленности' },
      'dump-trucks': { name: 'Самосвалы', description: 'Тяжелые самосвалы для горнодобывающей промышленности, строительства и перевозки материалов' },
      'special-purpose': { name: 'Спецтехника', description: 'Специализированные транспортные средства для промышленных и муниципальных нужд' },
      'agricultural': { name: 'Сельхозтехника', description: 'Тракторы, комбайны и оборудование для современного сельского хозяйства' },
      'tank-trucks': { name: 'Автоцистерны', description: 'Специализированные цистерны для перевозки топлива, воды и химикатов' },
      'overhead-gantry': { name: 'Мостовые и Козловые Краны', description: 'Промышленные мостовые и козловые краны для тяжелых грузов' },
      'mining-trucks': { name: 'Карьерные Самосвалы', description: 'Тяжелые самосвалы для карьерных работ и добычи полезных ископаемых' },
      'metal-structures': { name: 'Металлоконструкции', description: 'Проектирование и производство промышленных металлоконструкций' },
    },
    specLabels: {
      model: 'Модель',
      loadCapacity: 'Грузоподъемность',
      tankVolume: 'Объем Цистерны',
      wheelFormula: 'Колесная Формула',
      drive: 'Привод',
      environmentalClass: 'Экол. Класс',
      tippingSystem: 'Система Опрокидывания',
      liftingCapacity: 'Грузоподъемность',
      craneType: 'Тип Крана',
      reach: 'Вылет Стрелы',
      liftingHeight: 'Высота Подъема',
      outriggers: 'Аутригеры',
      terrain: 'Проходимость',
      drillingDiameter: 'Диаметр Бурения',
      drillingDepth: 'Глубина Бурения',
      mounting: 'Монтаж',
      platformHeight: 'Высота Платформы',
      platformCapacity: 'Грузоподъемность Люльки',
      stabilization: 'Стабилизация',
      platform: 'Платформа',
      material: 'Материал',
      pumping: 'Насос',
      certification: 'Сертификация',
      lining: 'Футеровка',
      compartments: 'Отсеки',
      application: 'Применение',
      chassis: 'Шасси',
      sweepingWidth: 'Ширина Уборки',
      hopperVolume: 'Объем Бункера',
      vacuumSystem: 'Вакуумная Система',
      waterTank: 'Бак для Воды',
      waterCapacity: 'Емкость для Воды',
      pumpCapacity: 'Производительность Насоса',
      equipment: 'Оборудование',
      tools: 'Инструменты',
      storage: 'Хранение',
      applications: 'Применение',
      pumpDepth: 'Глубина Насоса',
      seating: 'Места',
      comfort: 'Комфорт',
      rescue: 'Спасение',
      grainTank: 'Зерновой Бункер',
      headerWidth: 'Ширина Жатки',
      threshing: 'Обмолот',
      power: 'Мощность',
      augerType: 'Тип Бура',
      control: 'Управление',
      grabType: 'Тип Грейфера',
      containerSize: 'Размер Контейнера',
      mobility: 'Мобильность',
      structure: 'Конструкция',
      axles: 'Оси',
    },
    productsData: {
      'dt-dump-truck-4m3': {
        name: 'Самосвал 4.5 т',
        description: 'Компактный самосвал для городского строительства и малых проектов.',
        fullDescription: 'Самосвал объемом 4 м³ предназначен для городского строительства, благоустройства и перевозки небольших объемов материалов. Компактные размеры позволяют работать в ограниченном пространстве.',
        features: ['Компактный дизайн', 'Для города', 'Маневренность', 'Эффективность', 'Низкие эксплуатационные расходы'],
        specs: { model: 'KDT-4.5', loadCapacity: '4.5 тонны', tankVolume: '4 м³', wheelFormula: '4x2', drive: 'Дизель', environmentalClass: 'Евро 5' }
      },
      'dt-dump-truck-8m3': {
        name: 'Самосвал 10 т',
        description: 'Среднетоннажный самосвал для строительства и коммунальных служб.',
        fullDescription: 'Самосвал объемом 8 м³ предлагает баланс грузоподъемности и маневренности для коммунальных служб, дорожных работ и строительных проектов среднего масштаба.',
        features: ['Средняя грузоподъемность', 'Универсальность', 'Надежность', 'Экономичность', 'Готов к стройке'],
        specs: { model: 'KDT-10', loadCapacity: '10 тонн', tankVolume: '8 м³', wheelFormula: '4x2', drive: 'Дизель', environmentalClass: 'Евро 5' }
      },
      'dt-dump-truck-16m3': {
        name: 'Самосвал 20 т',
        description: 'Тяжелый самосвал для строительства и карьерных работ.',
        fullDescription: 'Самосвал объемом 16 м³ разработан для тяжелого строительства, карьерных работ и перевозки сыпучих материалов. Отличается усиленной конструкцией и высокой грузоподъемностью.',
        features: ['Высокая грузоподъемность', 'Усиленное шасси', 'Для карьеров', 'Усиленный кузов', 'Надежная конструкция'],
        specs: { model: 'KDT-20', loadCapacity: '20 тонн', tankVolume: '16 м³', wheelFormula: '6x4', drive: 'Дизель', environmentalClass: 'Евро 5' }
      },
      'mt-mining-truck-25t': {
        name: 'Карьерный Самосвал 240 т',
        description: 'Специализированный карьерный самосвал для тяжелых условий добычи.',
        fullDescription: 'Карьерный самосвал MT специально разработан для жестких условий открытых горных работ, обеспечивая максимальную производительность при добыче полезных ископаемых благодаря исключительной прочности шасси.',
        features: ['Усиленное карьерное шасси', 'Тяжелые условия', 'Внедорожный', 'Мощная трансмиссия', 'Безопасность'],
        specs: { model: 'KMT-240', loadCapacity: '240 тонн', tankVolume: '20 м³', wheelFormula: '6x4', drive: 'Дизель', environmentalClass: 'Евро 5' }
      },
      'dt-tipper-semi-trailer': {
        name: 'Самосвальный Полуприцеп 24-26 м³',
        description: 'Самосвальный полуприцеп большой вместимости для перевозки сыпучих грузов.',
        fullDescription: 'Самосвальный полуприцеп обеспечивает максимальную грузоподъемность для перевозки сыпучих материалов на большие расстояния с гидравлической системой опрокидывания.',
        features: ['Большой объем', 'Дальние перевозки', 'Гидравлическое опрокидывание', 'Высокая эффективность', 'Сыпучие грузы'],
        specs: { model: 'KTS-26', tankVolume: '24-26 м³', axles: '3 оси', drive: 'Полуприцеп', tippingSystem: 'Гидравлическая' },
      },
      'le-crane-7t': {
        name: 'Автокран-манипулятор 7 т',
        description: 'Компактный кран-манипулятор для погрузки и обработки грузов.',
        fullDescription: '7-тонный кран-манипулятор оснащен шарнирно-сочлененной гидравлической стрелой для точной работы с грузами и погрузки на платформу.',
        features: ['КМУ', 'Гидравлическое управление', 'Точное позиционирование', 'На шасси', 'Универсальность'],
        specs: { model: 'KLC-7', liftingCapacity: '7 тонн', craneType: 'КМУ', drive: 'Гидравлический', reach: 'До 15м' }
      },
      'le-crane-10-15t': {
        name: 'Автокран-манипулятор 10-15 т',
        description: 'Кран-манипулятор средней грузоподъемности для строительства и логистики.',
        fullDescription: 'Кран-манипулятор грузоподъемностью 10-15 тонн обеспечивает отличный вылет и мощность для строительных и логистических задач.',
        features: ['Средняя грузоподъемность', 'Увеличенный вылет', 'Для стройки', 'Логистика', 'Надежность'],
        specs: { model: 'KLC-15', liftingCapacity: '10-15 тонн', craneType: 'КМУ', drive: 'Гидравлический', reach: 'До 20м' }
      },
      'le-crane-16t': {
        name: 'Автокран 16 т',
        description: 'Мобильный автокран для строительно-монтажных работ.',
        fullDescription: '16-тонный автокран сочетает мобильность с достаточной грузоподъемностью для широкого спектра строительных и промышленных работ.',
        features: ['Мобильный кран', 'Телескопическая стрела', 'Гидравлические аутригеры', 'Строительный класс', 'Стабильность'],
        specs: { model: 'KTC-16', liftingCapacity: '16 тонн', craneType: 'Телескопическая Стрела', liftingHeight: '30м', outriggers: 'Гидравлические' }
      },
      'le-crane-25t': {
        name: 'Автокран 25 т',
        description: 'Тяжелый автокран для крупных строительных проектов.',
        fullDescription: '25-тонный автокран обеспечивает мощную грузоподъемность и большой вылет стрелы для крупных строительных и промышленных объектов.',
        features: ['Тяжелый подъем', 'Длинная стрела', 'Крупные проекты', 'Профессиональный', 'Максимальная устойчивость'],
        specs: { model: 'KTC-25', liftingCapacity: '25 тонн', craneType: 'Телескопическая Стрела', liftingHeight: '35м', outriggers: 'Гидравлические' }
      },
      'le-crane-32t': {
        name: 'Автокран 32 т',
        description: 'Сверхтяжелый автокран для крупных промышленных операций.',
        fullDescription: '32-тонный автокран предоставляет исключительную грузоподъемность для монтажа промышленного оборудования и инфраструктурных проектов.',
        features: ['Сверхвысокая грузоподъемность', 'Промышленный класс', 'Увеличенная высота', 'Тяжелые проекты', 'Превосходная устойчивость'],
        specs: { model: 'KTC-32', liftingCapacity: '32 тонны', craneType: 'Телескопическая Стрела', liftingHeight: '40м', outriggers: 'Гидравлические' }
      },
      'le-crane-50t': {
        name: 'Автокран 50 т',
        description: 'Максимальная грузоподъемность для тяжелого промышленного подъема.',
        fullDescription: '50-тонный автокран — наш самый мощный мобильный кран для самых тяжелых промышленных и инфраструктурных задач.',
        features: ['Максимальная грузоподъемность', 'Тяжелая промышленность', 'Длинный вылет', 'Инфраструктура', 'Профессиональная эксплуатация'],
        specs: { model: 'KTC-50', liftingCapacity: '50 тонн', craneType: 'Телескопическая Стрела', liftingHeight: '48м', outriggers: 'Гидравлические' }
      },
      'le-all-terrain-crane': {
        name: 'Вездеходный Автокран',
        description: 'Вездеходный кран с полуприцепом для удаленных объектов.',
        fullDescription: 'Вездеходный автокран оснащен специализированным полуприцепом и обладает высокой проходимостью для работы в труднодоступной местности.',
        features: ['Вездеход', 'Внедорожный', 'Полуприцеп', 'Удаленные объекты', 'Высокая мобильность'],
        specs: { model: 'KATC-AT', craneType: 'Вездеходный', wheelFormula: '6x6', drive: 'Полный привод', terrain: 'Внедорожный' }
      },
      'le-earth-auger': {
        name: 'Ямобур на Шасси Ø 350мм',
        description: 'Бурильно-крановая машина для установки опор и фундаментов.',
        fullDescription: 'Ямобур на автомобильном шасси обеспечивает эффективное бурение под свайные фундаменты, опоры ЛЭП и установку ограждений диаметром 350 мм.',
        features: ['Бурение грунта', 'Фундаментные работы', 'Установка опор', 'Гидравлика', 'Эффективность'],
        specs: { model: 'KEA-350', drillingDiameter: 'Ø 350мм', drillingDepth: 'До 3м', drive: 'Гидравлический', mounting: 'На шасси' }
      },
      'le-aerial-platform-18m': {
        name: 'Автогидроподъемник 18 м',
        description: 'Автовышка для коммунальных и ремонтных работ.',
        fullDescription: '18-метровый автогидроподъемник обеспечивает безопасный доступ на высоту для обслуживания коммуникаций, строительных работ и обрезки деревьев.',
        features: ['Высота 18м', 'Безопасная люлька', 'Коммунальные работы', 'Ремонт', 'Стабильность'],
        specs: { model: 'KAP-18', platformHeight: '18м', platformCapacity: '250 кг', drive: 'Гидравлический', stabilization: 'Аутригеры' }
      },
      'le-aerial-platform-28m': {
        name: 'Автогидроподъемник 28 м',
        description: 'Автовышка увеличенного вылета для высотных работ.',
        fullDescription: '28-метровый автогидроподъемник обеспечивает увеличенный вылет для обслуживания высотных зданий, телекоммуникаций и электросетей.',
        features: ['Высота 28м', 'Высотные работы', 'Телекоммуникации', 'Электромонтаж', 'Увеличенная высота'],
        specs: { model: 'KAP-28', platformHeight: '28м', platformCapacity: '250 кг', drive: 'Гидравлический', stabilization: 'Аутригеры' }
      },
      'le-aerial-platform-36m': {
        name: 'Автогидроподъемник 36 м',
        description: 'Максимальная высота подъема для специальных задач.',
        fullDescription: '36-метровый автогидроподъемник обеспечивает максимальную рабочую высоту для специализированного обслуживания, строительства и промышленных применений.',
        features: ['Максимум 36м', 'Спецработы', 'Промышленный класс', 'Профессионально', 'Превосходный вылет'],
        specs: { model: 'KAP-36', platformHeight: '36м', platformCapacity: '200 кг', drive: 'Гидравлический', stabilization: 'Тяжелые аутригеры' }
      },
      'le-crane-container-3.2t': {
        name: 'Кран-манипулятор 3.2 т (Контейнеровоз)',
        description: 'Автокран с платформой для перевозки и самопогрузки контейнеров.',
        fullDescription: '3.2-тонный кран-манипулятор с контейнерной платформой позволяет эффективно осуществлять самопогрузку и транспортировку контейнеров и тяжелых грузов.',
        features: ['Самопогрузка', 'Перевозка контейнеров', 'Эффективность', 'Универсальность', 'Компактность'],
        specs: { liftingCapacity: '3.2 тонны', platform: 'Контейнерная', drive: 'Гидравлический' }
      },
      'tt-water-tanker-4-6m3': {
        name: 'Водовоз 4-6 м³',
        description: 'Компактная автоцистерна для питьевой и технической воды.',
        fullDescription: 'Водовоз объемом 4-6 м³ обеспечивает доставку питьевой и технической воды для коммунальных служб, строек и сельских районов.',
        features: ['Пищевая сталь', 'Компактность', 'Питьевая вода', 'Коммунальное использование', 'Сельское обслуживание'],
        specs: { model: 'KWT-6', tankVolume: '4-6 м³', material: 'Пищевая сталь', pumping: 'Включено', certification: 'Питьевая вода' }
      },
      'tt-water-tanker-allterrain': {
        name: 'Водовоз Вездеход 10-12 м³',
        description: 'Вездеходная автоцистерна для доставки воды в труднодоступные места.',
        fullDescription: 'Вездеходный водовоз объемом 10-12 м³ обладает высокой проходимостью для доставки воды на удаленные объекты и обеспечения строительства.',
        features: ['Вездеход', 'Внедорожный', 'Удаленная доставка', 'Поддержка строительства', 'Большой объем'],
        specs: { model: 'KWT-AT12', tankVolume: '10-12 м³', wheelFormula: '6x6', drive: 'Полный привод', material: 'Пищевая сталь' }
      },
      'tt-acid-tanker-8-14m3': {
        name: 'Кислотовоз 8-14 м³',
        description: 'Специализированная автоцистерна для перевозки кислот.',
        fullDescription: 'Кислотовоз объемом 8-14 м³ имеет коррозионностойкую конструкцию для безопасной перевозки кислот и агрессивных химикатов.',
        features: ['Кислотостойкость', 'Перевозка химии', 'Безопасность', 'Соответствие ADR', 'Защита от коррозии'],
        specs: { model: 'KAT-14', tankVolume: '8-14 м³', material: 'Кислотостойкий', lining: 'Резина/PTFE', certification: 'ADR' }
      },
      'tt-acid-semi-trailer': {
        name: 'Полуприцеп-кислотовоз 14-20 м³',
        description: 'Кислотный полуприцеп большой емкости для промышленной химии.',
        fullDescription: 'Полуприцеп-кислотовоз обеспечивает объем 14-20 м³ для крупномасштабных перевозок промышленных химикатов с полным комплексом систем безопасности.',
        features: ['Большая емкость', 'Полуприцеп', 'Промышленная химия', 'Системы безопасности', 'Дальние дистанции'],
        specs: { model: 'KATS-20', tankVolume: '14-20 м³', axles: '3 оси', material: 'Кислотостойкий', certification: 'ADR/UN' }
      },
      'tt-fuel-semi-trailer': {
        name: 'Бензовоз Полуприцеп 30-40 м³',
        description: 'Высокоемкий топливный полуприцеп для дистрибуции нефтепродуктов.',
        fullDescription: 'Топливный полуприцеп обеспечивает объем 30-40 м³ для масштабной дистрибуции нефтепродуктов. Имеет несколько отсеков.',
        features: ['Максимальный объем', 'Многосекционный', 'Дистрибуция топлива', 'Магистральный', 'Эффективная доставка'],
        specs: { model: 'KFTS-40', tankVolume: '30-40 м³', compartments: 'Многосекционный', axles: '3 оси', certification: 'ADR' }
      },
      'tt-fuel-tanker-4-6m3': {
        name: 'Бензовоз АТЗ 4-6 м³',
        description: 'Топливозаправщик для локальной дистрибуции.',
        fullDescription: 'Компактный бензовоз-топливозаправщик разработан для эффективной локальной развозки топлива и заправки техники на объектах.',
        features: ['Дистрибуция топлива', 'Заправка', 'Компактный', 'Эффективный', 'Локальный'],
        specs: { model: 'ATZ-6', tankVolume: '4-6 м³', material: 'Сталь', application: 'Заправка' }
      },
      'tt-trailer-refueller-2-4m3': {
        name: 'Прицеп-Топливозаправщик 2-4 м³',
        description: 'Прицепной топливозаправщик для гибкого использования.',
        fullDescription: 'Смонтированный на прицепе топливозаправщик обеспечивает мобильность и гибкость заправки на строительных площадках и удаленных участках.',
        features: ['Мобильная заправка', 'Прицепной', 'Гибкость', 'Стройплощадки', 'Удаленные зоны'],
        specs: { model: 'TR-4', tankVolume: '2-4 м³', chassis: 'Прицеп', application: 'Мобильная Заправка' }
      },
      'tt-fuel-tanker-8-12m3': {
        name: 'Бензовоз АТЗ 8-12 м³',
        description: 'Топливозаправщик средней емкости для региональной дистрибуции.',
        fullDescription: 'Бензовоз средней емкости (8-12 м³) разработан для эффективной региональной доставки топлива и операций по заправке.',
        features: ['Средняя емкость', 'Региональная доставка', 'Заправка', 'Эффективность', 'Универсальность'],
        specs: { model: 'ATZ-12', tankVolume: '8-12 м³', material: 'Сталь', application: 'Дистрибуция Топлива' }
      },
      'tt-fuel-tanker-16-18m3': {
        name: 'Бензовоз АТЗ 16-18 м³',
        description: 'Большегрузный бензовоз для коммерческой дистрибуции.',
        fullDescription: 'Топливозаправщик большой емкости (16-18 м³) для коммерческой дистрибуции топлива и масштабных заправочных операций.',
        features: ['Большая емкость', 'Коммерческий класс', 'Большой объем', 'Готов к дистрибуции', 'Профессиональный'],
        specs: { model: 'ATZ-18', tankVolume: '16-18 м³', material: 'Сталь', application: 'Коммерческая Дистрибуция' }
      },
      'tt-fuel-tanker-20-25m3': {
        name: 'Бензовоз АТЗ 20-25 м³',
        description: 'Сверхбольшой бензовоз для промышленных операций.',
        fullDescription: 'Сверхбольшой топливозаправщик объемом 20-25 м³ для промышленной дистрибуции топлива и крупных коммерческих операций.',
        features: ['Сверхбольшая емкость', 'Промышленный класс', 'Максимальный объем', 'Тяжелый режим', 'Высокая эффективность'],
        specs: { model: 'ATZ-25', tankVolume: '20-25 м³', material: 'Сталь', application: 'Промышленная Дистрибуция' }
      },
      'spm-vacuum-sweeper': {
        name: 'Вакуумно-подметальная Машина',
        description: 'Коммунальная вакуумная машина для уборки улиц.',
        fullDescription: 'Вакуумно-подметальная машина обеспечивает эффективную механизированную и вакуумную уборку городских улиц с подавлением пыли.',
        features: ['Вакуумная уборка', 'Пылеподавление', 'Коммунальный класс', 'Большой бункер', 'Эффективная очистка'],
        specs: { model: 'KVS-Municipal', sweepingWidth: '2.5м', hopperVolume: '6 м³', vacuumSystem: 'Включена', waterTank: '1000Л' }
      },
      'spm-firefighting-platform': {
        name: 'Пожарный Автогидроподъемник 72 м',
        description: 'Высотная пожарно-спасательная платформа.',
        fullDescription: '72-метровый пожарный автогидроподъемник обеспечивает возможности пожаротушения и спасения для высотных зданий и промышленных объектов.',
        features: ['Высота 72м', 'Пожаротушение', 'Спасательные работы', 'Лафетный ствол', 'Для высоток'],
        specs: { model: 'KFF-72', platformHeight: '72м', waterCapacity: '2000Л', pumpCapacity: '3000 Л/мин', reach: 'До 65м' }
      },
      'spm-firefighting-platform-52-55m': {
        name: 'Пожарный Автогидроподъемник 52-55 м',
        description: 'Пожарно-спасательная платформа средней высоты.',
        fullDescription: '52-55 метровый пожарный автогидроподъемник обеспечивает возможности пожаротушения и спасения для зданий средней этажности и промышленных объектов.',
        features: ['Высота 52-55м', 'Пожаротушение', 'Спасательная платформа', 'Водяная система', 'Средняя этажность'],
        specs: { model: 'KFF-55', platformHeight: '52-55м', waterCapacity: '1800Л', pumpCapacity: '2500 Л/мин', reach: 'До 50м' }
      },
      'spm-mobile-workshop': {
        name: 'Передвижная Авторемонтная Мастерская (ПАРМ)',
        description: 'Полностью оборудованная мобильная мастерская для полевого ремонта.',
        fullDescription: 'Мобильная авторемонтная мастерская обеспечивает полный спектр возможностей по техническому обслуживанию и ремонту на выезде, оснащена инструментами, оборудованием и местом для запчастей.',
        features: ['Мобильная мастерская', 'Полный набор', 'Ремонт на месте', 'Генерация энергии', 'Полевые условия'],
        specs: { model: 'KMVRW', equipment: 'Полная мастерская', power: 'Генератор 15кВт', tools: 'Полный комплект', storage: 'Организованные отсеки' }
      },
      'spm-drilling-rig-urb50': {
        name: 'Буровая Установка УРБ-50 (8×8)',
        description: 'Вездеходная буровая установка для разведки и бурения скважин.',
        fullDescription: 'Буровая установка УРБ-50 на шасси 8×8 обеспечивает мощное бурение для геологоразведки, скважин на воду и геотехнических работ.',
        features: ['Глубокое бурение', 'Шасси 8x8', 'Вездеход', 'Разведка', 'Водяные скважины'],
        specs: { model: 'URB-50', wheelFormula: '8x8', drillingDepth: 'До 500м', drive: 'Полный привод', terrain: 'Вездеход' }
      },
      'spm-drilling-rig-zif': {
        name: 'Буровая Установка ЗИФ',
        description: 'Специализированная буровая установка для промышленных задач.',
        fullDescription: 'Буровая установка ЗИФ обеспечивает специализированное бурение для промышленных, строительных и геотехнических приложений.',
        features: ['Промышленное бурение', 'Строительство', 'Геотехника', 'Гидравлика', 'Универсальность'],
        specs: { model: 'ZIF', drillingDepth: 'До 300м', applications: 'Пром/Строй', drive: 'Гидравлический' }
      },
      'spm-dnp-pump-installation': {
        name: 'Агрегат Монтажа Насосов (АНП)',
        description: 'Установка для спуска и подъема насосов в скважинах.',
        fullDescription: 'Система АНП обеспечивает безопасный и эффективный монтаж и демонтаж насосов в глубоких скважинах для нефтяных, водных и промышленных нужд.',
        features: ['Монтаж насосов', 'Глубокие скважины', 'Нефть/Вода', 'Безопасность', 'Промышленный класс'],
        specs: { model: 'DNP', pumpDepth: 'До 2000м', liftingCapacity: '5 тонн', applications: 'Нефть/Вода', drive: 'Гидравлический' }
      },
      'spm-admin-convoy': {
        name: 'Административно-Вахтовый Автомобиль',
        description: 'Специальный автомобиль для перевозки персонала и сопровождения.',
        fullDescription: 'Разработан для безопасной и комфортной перевозки административного персонала и сопровождения колонн.',
        features: ['Сопровождение', 'Административный', 'Безопасный', 'Комфортный', 'Спецназначение'],
        specs: { application: 'Административный', seating: 'Многоместный', comfort: 'Высокий' }
      },
      'spm-firefighting-ladder': {
        name: 'Пожарная Автолестница',
        description: 'Пожарный автомобиль с автолестницей и спасательной люлькой.',
        fullDescription: 'Оснащен автолестницей и спасательной люлькой, обеспечивает эффективное тушение пожаров на высоте и спасательные операции.',
        features: ['Пожаротушение', 'Автолестница', 'Спасательная люлька', 'Высокий угол', 'Эффективность'],
        specs: { application: 'Пожаротушение', equipment: 'Автолестница', rescue: 'Включая люльку' }
      },
      'spm-patrol-pickup': {
        name: 'Патрульный Пикап (ППС)',
        description: 'Пикап патрульно-постовой службы.',
        fullDescription: 'Надежный пикап, оборудованный для патрулирования и охраны, обеспечивает мобильность и надежность в задачах безопасности.',
        features: ['Патруль', 'Охрана', 'Безопасность', 'Мобильность', 'Надежность'],
        specs: { chassis: 'Пикап', drive: '4x4', application: 'Патруль/Охрана' }
      },
      'am-grain-harvester': {
        name: 'Зерноуборочный Комбайн (Самоходный)',
        description: 'Самоходный комбайн для эффективного сбора зерновых.',
        fullDescription: 'Зерноуборочный комбайн обеспечивает эффективную уборку пшеницы, ячменя, кукурузы и других зерновых культур с улучшенной системой обмолота и минимальными потерями.',
        features: ['Самоходный', 'Большой бункер', 'Широкая жатка', 'Мин. потери', 'Эффективность'],
        specs: { model: 'KCH-SP', grainTank: '8000Л', headerWidth: '6.5м', drive: 'Самоходный', threshing: 'Улучшенная система' }
      },
      'am-tractor-n81': {
        name: 'Универсальный Трактор NURAFSHON N 81 (4×4)',
        description: 'Трактор 4×4 на базе платформы Беларусь для универсальных работ.',
        fullDescription: 'Универсальный трактор NURAFSHON N 81 оснащен полным приводом 4×4 на платформе Беларусь для сельскохозяйственных, коммунальных и транспортных работ, требующих повышенной тяги.',
        features: ['Привод 4x4', 'База Беларусь', 'Универсальность', 'ВОМ', 'Надежная платформа'],
        specs: { model: 'N-81 4x4', platform: 'Belarus MTZ', wheelFormula: '4x4', power: '81 Л.С.', drive: 'Механический' }
      },
      'am-tractor-earth-auger': {
        name: 'Трактор с Ямобуром',
        description: 'Трактор с навесным ямобуром для сельскохозяйственного бурения.',
        fullDescription: 'Трактор, оборудованный ямобуром, обеспечивает эффективное бурение ям для столбов ограждений, посадки деревьев и сельскохозяйственных фундаментных работ.',
        features: ['Привод от ВОМ', 'Установка ограждений', 'Посадка деревьев', 'Сельхоз использование', 'Универсальное бурение'],
        specs: { model: 'N-Auger', augerType: 'От ВОМ', drillingDiameter: 'Переменный', applications: 'Заборы/Деревья', drive: 'Трактор ВОМ' }
      },
      'am-tractor-n81c': {
        name: 'Универсальный Трактор N 81 C',
        description: 'Универсальный трактор NURAFSHON N 81 C на базе платформы Беларусь.',
        fullDescription: 'NURAFSHON N 81 C — специализированная версия универсального трактора, предлагающая надежную производительность для сельскохозяйственных задач.',
        features: ['Универсальный трактор', 'База Беларусь', 'Надежный', 'Сельскохозяйственный', 'Специализированный'],
        specs: { model: 'N-81 C', platform: 'Belarus MTZ', power: '81 Л.С.', drive: 'Механический' }
      },
      'og-overhead-bridge': {
        name: 'Мостовой Кран',
        description: 'Тяжелый мостовой кран для промышленных цехов.',
        fullDescription: 'Промышленная система мостового крана, разработанная для тяжелых подъемных операций на заводах, складах и производственных предприятиях с точным контролем груза.',
        features: ['Тяжелый режим', 'Точный контроль', 'Промышленный класс', 'Индивид. пролет', 'Электропривод'],
        specs: { liftingCapacity: 'До 50 тонн', span: 'Индивидуальный', liftingHeight: 'Индивидуальная', control: 'Электрический' }
      },
      'og-magnet-grab': {
        name: 'Магнитно-Грейферный Кран',
        description: 'Специализированный кран с магнитом и грейфером.',
        fullDescription: 'Мостовой кран, оснащенный электромагнитными и механическими грейферными системами для работы с металлоломом, сыпучими материалами и спецгрузами.',
        features: ['Магнитная система', 'Грейфер', 'Металлолом', 'Сыпучие грузы', 'Универсальность'],
        specs: { liftingCapacity: 'До 32 тонн', grabType: 'Электромагнит/Механический', control: 'Электрический', applications: 'Лом/Сыпучие' }
      },
      'og-container-overhead': {
        name: 'Контейнерный Кран',
        description: 'Специализированный мостовой кран для контейнеров.',
        fullDescription: 'Тяжелая крановая система, разработанная специально для эффективной обработки контейнеров в портах, терминалах и логистических центрах.',
        features: ['Обработка контейнеров', 'Портовые операции', 'Высокая г/п', 'Автоматизация', 'Логистика'],
        specs: { liftingCapacity: 'До 65 тонн', containerSize: '20ft/40ft', span: 'Индивидуальный', control: 'Автоматизированный' }
      },
      'og-single-girder-gantry': {
        name: 'Однобалочный Козловой Кран',
        description: 'Мобильный однобалочный козловой кран для улицы.',
        fullDescription: 'Однобалочный козловой кран мобильной конструкции для наружных погрузочно-разгрузочных работ, строительных площадок и складов с гибким позиционированием.',
        features: ['Однобалочный', 'Мобильный', 'Для улицы', 'Гибкий пролет', 'Рельсовый'],
        specs: { liftingCapacity: 'До 20 тонн', span: '10-35м', liftingHeight: '6-18м', mobility: 'Рельсовый' }
      },
      'og-truss-gantry': {
        name: 'Ферменный Козловой Кран',
        description: 'Тяжелый ферменный козловой кран для масштабных операций.',
        fullDescription: 'Надежный козловой кран ферменной конструкции, усиленный для тяжелых подъемных работ на верфях, стройплощадках и промышленных объектах.',
        features: ['Ферменная конструкция', 'Тяжелый режим', 'Большой пролет', 'Верфи', 'Промышленность'],
        specs: { liftingCapacity: 'До 100 тонн', span: '20-50м', structure: 'Ферменная', applications: 'Верфи/Пром' }
      }
    },


  },
  uz: {
    locale: 'uz',
    nav: {
      home: 'Bosh Sahifa',
      catalog: 'Yuk Mashinalari',
      services: 'Xizmatlar',
      about: 'Biz Haqimizda',
      blog: 'Yangiliklar',
      careers: 'Karyera',
      contacts: 'Aloqa',
      products: 'Mahsulotlar',
      customSolutions: 'Maxsus Yechimlar',
    },
    cookieConsent: {
      title: 'Cookie Sozlamalari',
      description: 'Biz saytimizning ishlashini yaxshilash uchun cookie fayllardan foydalanamiz. Global Privacy Control (GPC) signali aniqlandi.',
      acceptAll: 'Hammasini qabul qilish',
      necessaryOnly: 'Faqat zaruriy',
      settings: 'Sozlamalar',
    },
    customSolutionsPage: {
      heroTitle: 'Maxsus Yechimlar',
      heroIntro: 'Sizning noyob talablaringizga moslashtirilgan maxsus muhandislik yechimlari. Biz murakkab g\'oyalarni ishonchli sanoat haqiqatiga aylantiramiz.',
      intro: {
        title: 'Sizning Tasavvuringiz,\nBizning Tajribamiz',
        desc1: '75 yildan ortiq vaqt davomida biz butun dunyo bo\'ylab sanoat korxonalari bilan hamkorlik qilib, og\'ir texnika chegaralarini kengaytiruvchi yechimlarni ishlab chiqdik.',
        desc2: 'Maslahatlashuvdan to loyihalash va ishlab chiqarishgacha jamoamiz kutilganidan a\'lo natijalarni taqdim etadi.',
        stats: {
          projects: 'Maxsus Loyihalar',
          experience: 'Yillik Tajriba',
        },
      },
      metalStructures: {
        title: 'Sanoat Metall Konstruktsiyalari',
        description: 'Murakkab sanoat darajasidagi metall konstruksiyalarni loyihalash va tayyorlash. Biz konstruktiv muhandislikdan yakuniy yig\'ishgacha to\'liq yechimlarni taqdim etamiz, maksimal chidamlilik va xalqaro standartlarga muvofiqligini ta\'minlaymiz.',
      },
      capabilities: {
        title: 'Moslashtirish Imkoniyatlari',
        subtitle: 'Sizning talablaringizga moslashtirilgan muhandislik xizmatlari',
        items: {
          chassis: {
            title: 'Shassi Modifikatsiyasi',
            description: 'Shassini to\'liq o\'zgartirish, jumladan g\'ildirak bazasi va uzatmalar.',
            capabilities: [
              'Uzaytirilgan baza',
              'Ramani kuchaytirish',
              'Maxsus podveska',
              'Transmissiya integratsiyasi'
            ]
          },
          complexes: {
            title: 'Maxsus Transport',
            description: 'O\'ta chidamlilik uchun mo\'ljallangan og\'ir yuk tashish komplekslari.',
            capabilities: [
              'Ko\'p o\'qli tirkamalar',
              'Yuklash tizimlari',
              'Maxsus platformalar',
              'Uskunalar integratsiyasi'
            ]
          },
          hydraulics: {
            title: 'Gidravlika va Elektronika',
            description: 'Aniq ishlash uchun ilg\'or gidravlik va elektron tizimlar.',
            capabilities: [
              'Avtomatlashtirish',
              'Gidrokonturlar',
              'Elektron monitoring',
              'Masofaviy boshqaruv'
            ]
          },
          containers: {
            title: 'Nostandart Konteynerlar',
            description: 'Maxsus yuklar uchun konteynerlar va rezervuarlar.',
            capabilities: [
              'Bosim ostidagi idishlar',
              'Izolyatsiyalangan tanklar',
              'Maxsus geometrija',
              'Material saqlash'
            ]
          }
        }
      },
      production: {
        title: 'Ishlab Chiqarish Bazasi',
        subtitle: 'Ilg\'or uskunalar va tajribali mutaxassislar.',
        items: {
          manufacturing: { title: 'Ishlab Chiqarish Maydoni', desc: '15,000m²' },
          cnc: { title: 'CNC Ishlov Berish', desc: '±0.01mm aniqlik' },
          welding: { title: 'Payvandlash', desc: 'MIG, TIG, Robotlar' },
          assembly: { title: 'Yig\'ish va Sinash', desc: 'Sifat nazorati' },
        }
      },
      cta: {
        title: 'Loyihani Boshlashga Tayyormisiz?',
        description: 'Talablaringizni muhokama qilish uchun bog\'laning.',
        button: 'Maslahat So\'rash',
      },
    },
    home: {
      build: {
        explore: 'Batafsil',
      },
      process: {
        explore: 'Jarayonimizni Ko\'ring',
      },
      categories: {
        dumpTrucks: 'Samosvallar',
        truckCranes: 'Avtokranlar',
        overheadCranes: 'Ko\'prik Kranlar',
        specialMachinery: 'Maxsus Texnika',
        tankers: 'Yoqilg\'i va Suv Tashuvchilar',
        agricultural: 'Qishloq Xo\'jaligi Texnikasi',
        machining: 'Og\'ir Ishlov Berish',
        construction: 'Qurilish',
        miningTrucks: 'Kon Samosvallari',
        metalStructures: 'Metall Konstruktsiyalar',
      },
      since: '1945-yildan Buyon',
      title: 'Muhandislik\nKuchi',
      subtitle: 'Taraqqiyotning harakatlantiruvchi kuchi. Sanoat avtomobillari, kranlar va qishloq xo\'jaligi texnikasini to\'liq siklda ishlab chiqarish.',
      exploreCatalog: 'Katalogni Ko\'rish',
      contactUs: 'Aloqa',
      inquiryForm: 'So\'rov Formasi',
    },
    stats: {
      equipment: 'Uskuna Turlari',
      projects: 'Bajarilgan Loyihalar',
      employees: 'Xodimlar',
      experience: 'Yillik Tajriba',
    },
    intro: {
      welcomeTitle: 'KRANTAS Groupga Xush Kelibsiz',
      welcomeDesc: '1945-yildan beri muhandislik mukammalligi merosi. Biz eng talabchan sharoitlar uchun mo\'ljallangan yuqori unumdorlikdagi sanoat avtomobillari, kranlar va maxsus uskunalarni loyihalashtiramiz va ishlab chiqaramiz.',
      fleetRecovery: 'Kompleks Parkni Tiklash',
      fleetRecoveryDesc: 'Yuk mashinalari va og\'ir yuk ko\'tarish kranlarini murakkab tiklashga ixtisoslashgan. Bizning korxonamiz murakkab frezerlash va silliqlashdan tortib to\'liq miqyosdagi chilangarlik ishlari qilishadi.',
      fabrication: 'Ilg\'or Ishlab Chiqarish Standartlari',
      fabricationDesc: 'Biz sanoat standartlaridan oshib ketuvchi strukturaviy yaxlitlikni ta\'minlash uchun plazma kesish va CNC ishlov berish kabi zamonaviy texnologiyalardan foydalanamiz.',
      advisory: 'Strategik Uskuna Maslahati',
      advisoryDesc: 'To\'g\'ri uskunalar bilan yuklamalarni kamaytiring. Bizning mutaxassislarimiz sizning uskunalaringiz sizning ekspluatatsiya talablaringizga mukammal mos kelishini ta\'minlash uchun chuqur texnik qo\'llab-quvvatlashni taqdim etadi.',
    },
    aboutHome: {
      title: 'Biz Haqimizda',
      heading: 'Ta\'mirlash Uchastkasidan Sanoat Liderigacha',
      description: 'Zavodimiz 1945-yilda mexanik ta\'mirlash zavodi sifatida tashkil etilgan. 1966-yilgi zilziladan keyin po\'lat konstruktsiyalari va yuk ko\'tarish uskunalari ishlab chiqarishga o\'tdik. Bugun KRANTAS Group zamonaviy uskunalar bilan to\'liq sikl ishlab chiqaruvchi kompaniya.',
      points: ['To\'liq sikl ishlab chiqarish', 'Markaziy Osiyoga eksport', 'Xalqaro sertifikatlar'],
      learnMore: 'Biz Haqimizda Ko\'proq',
    },
    mission: {
      title: 'Bizning Vazifamiz',
      heading: 'Sanoatni Mustahkamlaydigan Lokallashtirish',
      description: 'Biz milliy korxonalar birgalikda yetakchi bo\'ladigan tarmoq yaratib, O\'zbekistonning sanoatiy mustaqilligini qurmoqdamiz. Bu biznesdan ko\'ra ko\'proq narsa — bu importdan ustun keladigan mahalliy muqobil variantlarni taqdim etish va nihoyat xorijiy qaramlikdan uzilish. Biz shunchaki ehtiyot qismlarni yetkazib bermaymiz; biz sizning butun operatsiyangizni samaraliroq va foydaliroq qilish uchun siz bilan hamkorlik qilamiz.',
      qualityFirst: 'Sifat Birinchi',
      qualityFirstDesc: 'Xalqaro standartlar bizning asosiy chizig\'imiz, keyingi o\'ylash emas. Biz aniqlik yagona instinkt bo\'lgan madaniyatni yaratdik, chunki bu sanoatda "yetarlicha yaqin" uchun joy yo\'q.',
      localProduction: 'Mahalliy Ishlab Chiqarish',
      localProductionDesc: 'Biz "O\'zbekistonda Ishlab Chiqarilgan" muhrining ortidagi dvigatelimiz. Ishlab chiqarishni shu yerda saqlash orqali biz xorijiy raqobatchilar oddiygina erisha olmaydigan ishonchlilik va tezkor javob berish darajasini taklif qilamiz.',
      globalStandards: 'Jahon Standartlari',
      globalStandardsDesc: 'Biz mahallik hunarmandchilik va yuqori sifatli muhandislik o\'rtasidagi bo\'shliqni to\'ldiramiz. Siz mahalliy hamkoringizning yaqinligi bilan birga ilg\'or ishlab chiqaruvchining texnik kuchini olasiz.',
    },
    equipment: {
      title: 'Uskuna Yechimlari',
      heading: 'Biz Nima Ishlab Chiqaramiz',
      viewAll: 'Barcha Kategoriyalarni Ko\'rish',
      customSolutions: 'Maxsus Yechimlar',
      customDesc: 'Bizning tajribamiz. Sizning noyob talablaringizga moslashtirilgan muhandislik yechimlari.',
    },
    products: {
      title: 'Tanlangan Mahsulotlar',
      heading: 'Haqiqiy Sharoitlar Uchun Yaratilgan',
      viewAll: 'Barcha Mahsulotlarni Ko\'rish',
      specs: 'Xususiyatlari',
      features: 'Xususiyatlari',
      inquiry: 'So\'rov Yuborish',
    },
    production: {
      title: 'Ishlab Chiqarish',
      heading: 'To\'liq Siklli Ishlab Chiqarish',
      description: 'Loyihalash → asbob-uskunalar → metall konstruktsiyalar → yig\'ish → sinash → sertifikatlash. Zamonaviy uskunalar bilan to\'liq sikl.',
      modeling: '3D Modellashtirish va Muhandislik',
      modelingDesc: 'Aniq ishlab chiqarish uchun ilg\'or CAD dasturiy ta\'minotidan foydalanib, to\'liq loyihalash va tafsilotlash.',
      cnc: 'CNC Ishlov Berish',
      cncDesc: '±0.01mm gacha chetlangan komponentlarni yuqori aniqlikdagi ishlov berish.',
      cutting: 'Plazma va Lazer Kesish',
      cuttingDesc: 'Murakkab shakllar va toza kantlar uchun ilg\'or kesish texnologiyalari.',
      welding: 'Payvandlash va Ishlab Chiqarish',
      weldingDesc: 'MIG, TIG va robotlashtirilgan payvandlashni o\'z ichiga olgan sertifikatlangan payvandlash jarayonlari.',
      surface: 'Yuzani Qayta Ishlash',
      surfaceDesc: 'Korroziyadan himoya qilish uchun drobester yuvish, gruntlash va bo\'yash.',
      assembly: 'Yig\'ish va Sinash',
      assemblyDesc: 'Qattiq sifat nazorati va sinash protokollari bilan to\'liq yig\'ish.',
    },
    cta: {
      title: 'Loyihangizni Muhokama Qilishga Tayyormisiz?',
      description: 'Mutaxassislarimiz sizga mos uskunani tanlashga yordam beradi va batafsil taklif beradi.',
      button: 'Aloqa',
    },
    footer: {
      description: '1945-yildan beri muhandislik kuchi. Sanoat avtomobillari va uskunalarini to\'liq sikl ishlab chiqarish.',
      navigation: 'Navigatsiya',
      products: 'Mahsulotlar',
      contact: 'Aloqa',
      rights: 'Barcha huquqlar himoyalangan.',
      privacy: 'Maxfiylik Siyosati',
      terms: 'Foydalanish Shartlari',
      viewAll: 'Barchasini Ko\'rish →',
    },
    productsPage: {
      title: 'Mahsulotlar',
      heroIntro: 'Muhandislik mukammalligining to\'liq spektri. Maxsus buyurtma asosidagi texnikalarimiz va sinalgan mashinalarimizning keng katalogi bilan tanishing.',
      heading: 'Bizning Mahsulotlar va Yechimlar',
      description: 'KRANTAS Group sanoat yechimlarining to\'liq portfelini taklif etadi. Sizga aniq talablaringiz bo\'yicha tayyorlangan maxsus transport vositasi yoki katalogdagi tasdiqlangan model kerak bo\'ladimi, biz operatsiyalaringiz talab qiladigan ishonchlilikni ta\'minlaymiz.',
      customTitle: 'Maxsus Muhandislik Yechimlari',
      customDesc: 'KRANTAS da biz har bir operatsiyaning o\'ziga xos talablari borligini tushunamiz. Bizning maxsus muhandislik bo\'limimiz sizning talablaringizga moslashtirilgan maxsus sanoat transporti vositalari va uskunalarini loyihalash va ishlab chiqarishga ixtisoslashgan.',
      customPoints: {
        1: 'To\'liq loyihalash konsultatsiyasi va muhandislik yordami',
        2: 'Prototip yaratish va sinovdan o\'tkazish',
        3: 'Maxsus modifikatsiyalar va integratsiyalar',
      },
      customLink: 'Maxsus Yechimlar Haqida',
      catalogTitle: 'Standart Mahsulotlar Katalogi',
      catalogDesc: 'Bizning katalogimizda tasdiqlangan sanoat texnikasining keng assortimenti mavjud. Har bir model ishonchlilik uchun ishlab chiqilgan, sifatli materiallardan qurilgan va o\'n yillik ishlab chiqarish tajribasi bilan mustahkamlangan.',
      catalogPoints: {
        1: 'Ishlatishga tayyor standart konfiguratsiyalar',
        2: 'Keng toifalar va ilovalar',
        3: 'Raqobatbardosh narxlar va tez yetkazib berish',
      },
      catalogLink: 'To\'liq Katalogni Ko\'rish',
    },
    catalog: {
      title: 'Mahsulot Katalogi',
      subtitle: 'Og\'ir yuk mashinalaridan aniq ko\'tarish tizimlarigacha — haqiqiy ekspluatatsiya sharoitlari uchun mo\'ljallangan.',
      heroIntro: 'Sanoat texnikasi va uskunalarimizning keng assortimenti bilan tanishing. Har bir model ishonchlilik uchun ishlab chiqilgan va xalqaro standartlarga javob beradi.',
      categories: 'Kategoriyalar',
      showAll: 'Barcha Mahsulotlarni Ko\'rsatish',
      welcomeTitle: 'Mahsulot Katalogi',
      customSolution: 'Maxsus Yechim Kerakmi?',
      customDesc: 'Biz sizning maxsus talablaringizga moslashtirilgan uskunalarni loyihalaymiz va ishlab chiqaramiz.',
      backToCatalog: 'Katalogga Qaytish',
      filter: 'Kategoriya Bo\'yicha Filtrlash',
      noProducts: 'Mahsulotlar topilmadi',
    },
    services: {
      title: 'Bizning Xizmatlar',
      heading: 'Keng Ko\'lamli Xizmat',
      welcomeTitle: 'Bizning Xizmatlar',
      heroIntro: 'Sanoat texnikangiz uchun har tomonlama qo\'llab-quvvatlash. Mutaxassislar xizmati va original qismlardan tortib, maxsus loyihalargacha.',
      introHeadline: 'Uzoq xizmat uchun yaratilgan. \nButun umr davomida qo\'llab-quvvatlanadi.',
      introP1: 'Biz bilamizki, sizning dunyongizda bahonalarga o\'rin yo\'qligini bilamiz. Shuning uchun biz uskunalarimiz kabi mustahkam qo\'llab-quvvatlash tizimini yaratdik.',
      introP2: 'Krantasni tanlab, siz shunchaki sanoat aktivini sotib olmaysiz; har bir kilometr va har bir ko\'tarish ortida turgan sodiq jamoaga ega bo\'lasiz.',
      stats: {
        centers: 'Servis markazlari',
        parts: 'Ehtiyot qismlari',
      },
      subtitle: 'Ishlab chiqarishdan sotuvdan keyingi qo\'llab-quvvatlashgacha — biz to\'liq xizmatlar spektrini taqdim etamiz.',
      supportCenter: 'Qo\'llab-quvvatlash Markazi',
      supportDesc: 'Bizning yuqori malakali mutaxassislarimiz sizga mos uskunani tanlashga yordam beradi va barcha texnik savollarga javob beradi.',
      facilities: 'Bizning Obyektlar',
      items: {
        afterSales: {
          title: 'Sotuvdan Keyingi Xizmat',
          shortTitle: 'Xizmat',
          description: 'Texnik xizmat ko\'rsatish, kafolat, ehtiyot qismlar va mahsulotning butun hayotiy tsikli davomida maxsus qo\'llab-quvvatlash. Xizmat ko\'rsatish markazlarimiz eng qiyin sharoitlarda flotingiz ishchi holatda qolishini ta\'minlash uchun ilg\'or diagnostika asboblari bilan jihozlangan. Biz joylarda ta\'mirlash uchun tezkor javob guruhlarini taqdim etamiz va ishlamay qolish vaqtini minimallashtirish uchun original qismlarning to\'liq inventarizatsiyasini saqlaymiz.',
          stages: {
            maintenance: { name: 'Xizmat', desc: 'Doimiy xizmat' },
            repairs: { name: 'Ta\'mirlash', desc: 'Tez va ishonchli' },
            parts: { name: 'Qismlar', desc: 'Asl ehtiyot qismlar' },
            support: { name: 'Qo\'llab-quvvatlash', desc: '24/7 yordam' }
          }
        },
        quality: {
          title: 'Sifat Nazorati va Sertifikatlash',
          shortTitle: 'Sifat',
          description: 'Ishlab chiqarishning har bir bosqichida sifat kafolati va majburiy sertifikatlashtirish talablariga muvofiqligi. Har bir transport vositasi xalqaro xavfsizlik standartlariga javob berish uchun ko\'p nuqtali tekshiruvdan o\'tadi, shu jumladan tuzilmani stressga sinash va gidravlik tizimni tekshirish. Bizning laboratoriyalarimiz materiallar tahlili va aniq tekshiruvlarni amalga oshirib, Krantas brendi ostidagi har bir birlikning uzoq umr ko\'rishi va ishonchliligini kafolatlaydi.',
          stages: {
            inspection: { name: 'Tekshirish', desc: 'Qattiq nazorat' },
            testing: { name: 'Sinov', desc: 'Samaradorlikni tekshirish' },
            certification: { name: 'Sertifikatlash', desc: 'Xalqaro standartlar' },
            documentation: { name: 'Hujjatlar', desc: 'To\'liq hujjatlar' }
          }
        },
        localization: {
          title: 'Mahalliylashtirish va Integratsiya',
          shortTitle: 'Mahalliylashtirish',
          description: 'Sanoatni mahalliylashtirish loyihalarini va mintaqaviy bozorlar uchun texnologiya transferini qo\'llab-quvvatlash. Biz jahon muhandislik mukammalligi va mahalliy ishlab chiqarish imkoniyatlari o\'rtasidagi tafovutni bartaraf etamiz, hamkorlarga mintaqada mustahkam ishlab chiqarish liniyalarini yaratishda yordam beramiz. Jamoamiz mahalliy sanoat ekotizimlariga uzluksiz integratsiyani ta\'minlash uchun yetkazib berish zanjirini optimallashtirish va texnik hujjatlarni moslashtirish bo\'yicha konsalting xizmatlarini ko\'rsatadi.',
          stages: {
            analysis: { name: 'Tahlil', desc: 'Talablarni o\'rganish' },
            adaptation: { name: 'Moslashtirish', desc: 'Mahsulotni mahalliylashtirish' },
            integration: { name: 'Integratsiya', desc: 'Tizim mosligi' },
            training: { name: 'O\'qitish', desc: 'Bilim berish' }
          }
        },
        manufacturing: {
          title: 'Ishlab Chiqarish va Yig\'ish',
          shortTitle: 'Ishlab Chiqarish',
          description: 'Barcha asosiy bosqichlarda to\'liq tsiklli platformani ta\'minlaydigan seriyali va loyihaga asoslangan ishlab chiqarish. Xom ashyoni qayta ishlashdan yakuniy yig\'ishgacha, bizning 15 000 m² maydonli korxonamiz barqaror strukturaviy yaxlitlikni ta\'minlash uchun yuqori aniqlikdagi CNC ishlov berish va avtomatlashtirilgan payvandlashdan foydalanadi. Biz butun ishlab chiqarish jarayonini o\'zimiz amalga oshiramiz, har bir loyiha — xoh u standart birlik bo\'lsin, xoh murakkab sanoat majmuasi — aniq texnik talablarga muvofiq qurilishini ta\'minlaymiz.',
          stages: {
            design: { name: 'Dizayn', desc: '3D modellashtirish' },
            fabrication: { name: 'Tayyorlash', desc: 'Kesish va shakllantirish' },
            assembly: { name: 'Yig\'ish', desc: 'Komponentlarni integratsiyalash' },
            testing: { name: 'Sinov', desc: 'Sifatni tasdiqlash' }
          }
        },
        engineering: {
          title: 'Muhandislik va Moslashtirish',
          shortTitle: 'Muhandislik',
          description: 'Maxsus muhandislik yechimlari va mahsulotni aniq operatsion talablarga moslashtirish. Bizning dizayn byuromiz noyob ob\'ektlardagi qiyinchiliklarni hal qiladigan mashinalarni ishlab chiqish uchun ilg\'or 3D modellashtirish va strukturaviy simulyatsiyadan foydalanadi. Biz murakkab texnik talablarni yuqori samarali sanoat aktivlariga aylantirishga ixtisoslashganmiz, ixtisoslashtirilgan tarmoqlar uchun to\'liq strukturaviy va mexanik moslashtirishni taklif etamiz.',
          stages: {
            consulting: { name: 'Maslahat', desc: 'Texnik ekspertiza' },
            design: { name: 'Dizayn', desc: 'Maxsus yechimlar' },
            prototyping: { name: 'Prototip', desc: 'Konsepsiyani tekshirish' },
            implementation: { name: 'Joriy etish', desc: 'To\'liq o\'rnatish' }
          }
        }
      },
      facilitiesList: {
        warehouse: {
          title: 'Ombor',
          description: 'Ehtiyot qismlar va butlovchi qismlarni boshqarish uchun zamonaviy omborxonalar. 5000 kv.m dan ortiq maydon.'
        },
        serviceStation: {
          title: 'Xizmat Ko\'rsatish Stantsiyasi',
          description: 'Xizmat ko\'rsatish va ta\'mirlash uchun to\'liq jihozlangan bokslar. Zamonaviy diagnostika uskunalari.'
        },
        spareParts: {
          title: 'Ehtiyot Qismlar Markazi',
          description: 'Asl ehtiyot qismlarning katta zaxirasi va tez yetkazib berish. 10 000 dan ortiq nomlar mavjud.'
        }
      },
      inquiryForm: 'So\'rov Shakli'
    },
    about: {
      title: 'Biz Haqimizda',
      heroTitle: 'Krantas Merosi',
      heroIntro: '1945 yildan beri muhandislik qudrati. Bizning merosimiz eng murakkab sharoitlar uchun sanoat uskunalarini to\'liq siklli ishlab chiqarishga asoslangan.',
      heading: '1945-yildan Buyon Muhandislik Kuchi',
      welcomeTitle: 'Kompaniya haqida',
      subtitle: 'Mexanik ta\'mirlash zavodidan Markaziy Osiyo va undan tashqariga xizmat ko\'rsatuvchi to\'liq sikl ishlab chiqarish guruhigacha.',
      story: 'Bizning Tariximiz',
      storyP1: 'Zavodimiz 1945-yilda yuk mashinalari va og\'ir texnika uchun mexanik ta\'mirlash zavodi sifatida tashkil etilgan. Dastlabki yillarda biz mintaqa transport vositalarini ishlashda davom etishga ixtisoslashgan, sifatli ishchi kuchining obro\'sini qo\'lga kiritdik.',
      storyP2: '1966-yilgi vayronagarchilik zilziladan so\'ng, zavod qayta maqsadlandi va fuqarolik va sanoat qurilishi uchun po\'lat konstruktsiyalari va yuk ko\'tarish uskunalari ishlab chiqarishni boshladi.',
      storyP3: 'O\'zbekiston mustaqilligidan va keyingi xususiyalashtirishdan so\'ng yangi bosqich boshlandi. Biz zamonaviy texnologiyalarga sarmoya kiritdik, mahsulotlar assortimentini kengaytirdik va xalqaro bozorlarga xizmat ko\'rsatishni boshladik.',
      storyP4: 'Bugun KRANTAS Group zamonaviy CNC ishlov berish, payvandlash, plazma/lazer kesish va yig\'ish imkoniyatlariga ega to\'liq sikl ishlab chiqaruvchi.',
      family: 'KRANTAS Oilasi',
      familyDesc: 'Fidoyilik avlodlari. O\'n yillik tajriba. KRANTASni shunchaki kompaniya emas, balki buyuk oila qiladigan insonlar.',
      familyQuote: '"Men KRANTASda 30 yildan ortiq vaqt davomida ishlayman. Men bu kompaniyaning kichik ta\'mirlash ustaxonasidan katta ishlab chiqaruvchigacha o\'sganini ko\'rdim. Mamlakat bo\'ylab bizning uskunalarimiz ishlayotganini ko\'rishdan his qiladigan g\'urur o\'lchovsiz."',
      familyQuoteAuthor: '— Rustam Khasanov, Bosh Muhandis',
      joinFamily: 'Bizning oilamizga qo\'shiling',
      history: 'Tarix va Bosqichlar',
      production: 'Ishlab Chiqarish Bosqichlari',
      manufacturing: 'To\'liq Siklli Ishlab Chiqarish',
      manufacturingDesc: 'Zavodning o\'z loyiha byurosi mavjud bo\'lib, u so\'nggi jahon tendentsiyalariga muvofiq yangi turdagi maxsus uskunalar loyihalarini va ishchi chizmalarini mustaqil ravishda ishlab chiqish uchun xizmat qiladi.',
      manufacturingFeatures: ['3D Modellashtirish va Tafsilotlash', 'Asbob-uskunalar Ishlab Chiqish', 'Metall Konstruktsiyalar', 'Yig\'ish va Sinash', 'Sifat Nazorati', 'Sertifikatlash'],
      chairman: 'Rais Xabari',
      chairmanQuote: '"KRANTAS Group mustahkam muhandislik an\'analari, mahalliy ishlab chiqarish va kelajak uchun aniq tasavvurga asoslangan. KRANTAS shunchaki transport vositasi emas, balki ishonchli muhandislik yechimi."',
      chairmanName: 'Karimov Mukhtor Akbarovich',
      chairmanTitle: 'Rais, KRANTAS Group',
      team: 'Bizning Jamoa',
      teamSubtitle: 'Quruvchi Rahbarlik',
      certificates: 'Sifat Standartlari',
      historyEvents: {
        1945: { title: 'Tashkil Topish', description: 'Toshkentda yuk mashinalari va og\'ir texnika uchun mexanik ta\'mirlash zavodi sifatida tashkil etilgan.' },
        1963: { title: 'Kengayish', description: 'Qurilish uchun po\'lat konstruktsiyalar va yuk ko\'tarish uskunalari ishlab chiqarish boshlandi.' },
        1990: { title: 'Diversifikatsiya', description: 'Maxsus texnika va avtokranlar ishlab chiqarishga kengaytirildi.' },
        2000: { title: 'Modernizatsiya', description: 'CNC ishlov berish va avtomatlashtirilgan payvandlash tizimlari joriy etildi.' },
        2012: { title: 'Brendni Ishga Tushirish', description: 'To\'liq sertifikatlangan KRANTAS avtokran brendi ishga tushirildi.' },
        2015: { title: 'Xalqaro O\'sish', description: 'Qozog\'iston va Turkmaniston bozorlariga eksport sertifikati bilan kirib borildi.' },
        2020: { title: 'Yangi Quvvatlar', description: 'Yangi yig\'uv liniyalari ochildi va qishloq xo\'jaligi texnikasi ishlab chiqarish kengaytirildi.' },
        2024: { title: 'Kelajakka Nazar', description: 'Ishonchli sanoat transport vositalarining keyingi avlodini ishlab chiqish.' },
      },
      teamMemberStories: {
        sergey: {
          name: 'Petrov Sergey',
          role: 'Direktor O\'rinbosari',
          years: 'KRANTAS bilan 50 yildan ortiq',
          text: '1972-yilda yosh mutaxassis sifatida kelib, bugungi kunda Direktor o\'rinbosari sifatida operatsiyalarni boshqarmoqda. KRANTASning tajriba zavodidan zamonaviy ishlab chiqaruvchigacha bo\'lgan o\'zgarishiga guvoh bo\'lgan.'
        },
        komil: {
          name: 'Komil Xaitmatov',
          role: 'Yig\'ish Ustasi',
          years: 'KRANTAS bilan 45 yil',
          text: '1980-yilda haydovchi sifatida boshlagan, kran yig\'ish ustasi darajasiga ko\'tarilgan. KamAZ yuk mashinalaridan 60 tonnalik kranlargacha — u har bir o\'zgarishning bir qismi bo\'lgan.'
        },
        elvira: {
          name: 'Elvira',
          role: 'Ko\'prik Krani Operatori',
          years: 'Uchinchi avlod · 10+ yil',
          text: 'Ota-onasi, bobo-buvisi va aka-uka barchasi KRANTASda ishlagan. Otasi: 40 yil bo\'yoqchi. Onasi: 37 yil kran operatori. Sadoqat merosi.'
        }
      },
      certificatesList: {
        1: { name: 'Sertifikat', desc: 'MChJ "KRANTAS"', org: 'Xalqaro Sanoat Yarmarkasi va Kooperatsiya Birjasi Direksiyasi' },
        2: { name: 'Sertifikat', desc: 'MChJ "Kran va Maxsus Texnikalar"', org: 'Xalqaro Sanoat Yarmarkasi va Kooperatsiya Birjasi Direksiyasi' },
        3: { name: 'Sertifikat', desc: 'MChJ "TTEMZ"', org: 'Xalqaro Sanoat Yarmarkasi va Kooperatsiya Birjasi Direksiyasi' },
        4: { name: 'Samaradorlik Mukofoti', desc: 'Global Specific Performance Award 2022', org: 'FOTON' },
        5: { name: 'Diplom', desc: 'Turkmen Construction 2015', org: 'Savdo-Sanoat Palatasi' },
        6: { name: 'Sertifikat', desc: '17-xalqaro Qozog\'iston Qurilish Ko\'rgazmasi', org: 'Astana Build' },
      },
      partners: 'Bizning Hamkorlar',
      partnersDesc: 'Biz mahsulotlarimizda komponentlar va texnologiyalarning eng yuqori sifatini ta\'minlash uchun yetakchi global ishlab chiqaruvchilar bilan hamkorlik qilamiz.',
      geography: 'Yetkazib Berish Geografiyasi',
      geographyDesc: 'KRANTAS Group Markaziy Osiyo va undan tashqariga uskunalar yetkazib beradi. Bizning mahsulotlarimiz turli xil sharoitlarda ishlaydi — Qirg\'iziston tog\'laridan Turkmaniston cho\'llarigacha.',
      distributors: {
        title: 'Bizning Distribyutorlarimiz',
        description: 'KRANTAS Group Markaziy Osiyo va undan tashqaridagi yetakchi distribyutorlar bilan hamkorlik qiladi. Bizning tarmog\'imiz qayerda faoliyat yuritishingizdan qat\'i nazar, mahalliy tajriba va yordam bilan quvvatlangan sifatli sanoat uskunalaridan foydalanish imkoniyatini kafolatlaydi.',
        mapLegend: '6 ta davlat va 15 dan ortiq shaharlarni qamrab olgan',
        centersTitle: 'Mintaqaviy Tarqatish Markazlari',
        regionalBranch: 'Mintaqaviy Filial',
        regionalCenter: 'Mintaqaviy Markaz',
        mountainSpecialist: 'Tog\' Mutaxassisi',
        emergingMarkets: 'Rivojlanayotgan Bozorlar',
        countries: {
          azerbaijan: 'Ozarbayjon',
          kazakhstan: 'Qozog\'iston',
          kyrgyzstan: 'Qirg\'iziston',
          tajikTurkmen: 'Tojikiston va Turkmaniston'
        }
      },
      teamRoles: {
        director: 'Direktor',
        deputyDirector: 'Direktor o\'rinbosari',
        deputyDirectorProduction: 'Ishlab chiqarish bo\'yicha direktor o\'rinbosari',
        assemblyTechnician: 'Yig\'ish ustasi',
        craneOperator: 'Ko\'prik krani operatori'
      }
    },
    blog: {
      title: 'Yangiliklar',
      subtitle: 'Zavoddan so\'nggi yangiliklar, yangilanishlar va fikrlar.',
      heroIntro: 'KRANTAS Groupning so\'nggi yangiliklari va strategik yutuqlari. Yangi hamkorliklarimiz, ishlab chiqarish bosqichlari va mintaqaviy rivojlanishdan xabardor bo\'ling.',
      latest: 'So\'nggi Maqolalar',
      stayUpdated: 'Yangilanib Boring',
      newsletter: 'So\'nggi yangiliklarni olish uchun xabarlarimizga obuna bo\'ling.',
      subscribe: 'Obuna Bo\'lish',
      explore: 'Yangiliklar xonasi',
      newsTeam: 'Yangiliklar Jamoasi',
      readOriginal: 'Asl nusxani o\'qish',
      posts: {
        1: {
          title: 'O‘zbekiston Prezidentining Krantas zavodiga tashrifi',
          excerpt: 'Prezident Shavkat Mirziyoyev ishlab chiqarish quvvatlarimiz bilan tanishib, sanoat mahalliylashtirish va maxsus texnikalar qatorini 60 dan ortiq turga kengaytirish muhimligini ta’kidladi.'
        },
        2: {
          title: 'Harbiy va maxsus texnika ishlab chiqarish kengayishi',
          excerpt: 'Krantas Group Nurafshonda yengil zirhli avtomobillar va maxsus yuk mashinalari ishlab chiqarish bo‘yicha 55 million dollarlik loyihani amalga oshirish rejalarini e’lon qildi.'
        },
        3: {
          title: 'Global debyut: IDEX-2023da Tarlon va Qalqon',
          excerpt: 'BAAdagi xalqaro mudofaa ko‘rgazmasida biz o‘zimizning so‘nggi yengil zirhli avtomobillarimiz — Tarlon va Qalqonni g‘urur bilan taqdim etib, O‘zbekiston muhandislik salohiyatini namoyish etdik.'
        },
        4: {
          title: 'MAZ va MTZ bilan strategik hamkorlik',
          excerpt: 'Krantas Group belaruslik hamkorlar bilan O‘zbekistonda traktorlar va sanoat uskunalarini yig‘ish loyihasini muhokama qilib, xalqaro aloqalarni mustahkamlamoqda.'
        },
        5: {
          title: 'OKMK uchun og‘ir texnika yetkazib berish',
          excerpt: 'Bizning yuqori quvvatli samosvallarimiz Olmaliq kon-metallurgiya kombinatiga yetkazib berildi va mamlakatimiz tog‘-kon sanoatini modernizatsiya qilishga xizmat qilmoqda.'
        },
        6: {
          title: 'Arslon: Birinchi mahalliy zirhli transportyor',
          excerpt: 'Xalqaro standartlar asosida ishlab chiqilgan yangi "Arslon" zirhli transportyorimiz davlat sinovlaridan o‘tmoqda va mahalliy mudofaa sanoatida muhim qadam bo‘ldi.'
        },
        7: {
          title: 'Katta renovatsiya va infratuzilmani rivojlantirish loyihasi',
          excerpt: 'Mirzo Ulug‘bek tumanidagi hozirgi maydonimizda zamonaviy turar-joy va ijtimoiy infratuzilma barpo etishga qaratilgan 333 million dollarlik yirik shaharsozlik loyihasi taklif etildi.'
        }
      },
      featured: {
        lorem1: 'So\'nggi muhandislik yutuqlarimiz va sinov jarayonlarimiz haqida batafsil ma\'lumot.',
        lorem2: 'Biz og\'ir mashinasozlikda imkoniyatlar chegarasini kengaytirishda davom etamiz.'
      }
    },
    careers: {
      title: 'KRANTASda Karyera',
      welcomeTitle: 'Bizga Qo\'shiling',
      heroIntro: 'KRANTAS bilan sanoat texnologiyalarining yangi avlodini yarating. Biz muhandislik va ishlab chiqarish jamoamizga mutaxassislarni taklif qilamiz.',
      subtitle: 'Sanoat avtomobillarining keyingi avlodini yarating. Aniqlik, xavfsizlik va o\'sishni qadrlaydigan jamoaga qo\'shiling.',
      whyWork: 'Nima Uchun Biz Bilan Ishlash Kerak?',
      team: 'Hurmatli Jamoa A\'zolari',
      openPositions: 'Ochiq Vakansiyalar',
      apply: 'Ariza Topshirish',
      applyNow: 'Hozir Ariza Topshirish',
      fullName: 'To\'liq Ism',
      email: 'Elektron Pochta',
      phone: 'Telefon',
      message: 'Xabar',
      submit: 'Ariza Yuborish',
      cancel: 'Bekor Qilish',
      joinTeam: 'Muhandislik mukammalligi meros bilan uchrashadigan jamoaga qo\'shiling.',
      experienceLabel: 'Tajriba:',
      ageLabel: 'Yosh:',
      requirementsLabel: 'Talablar:',
      fullTime: 'To\'liq bandlik',
      applyPopupTitle: 'Ariza Topshirish',
      namePlaceholder: 'To\'liq ismingiz',
      emailPlaceholder: 'your@email.com',
      phonePlaceholder: '+998 XX XXX XX XX',
      agePlaceholder: 'Yosh',
      experiencePlaceholder: 'Yil',
      messagePlaceholder: 'O\'zingiz haqida gapirib bering...',
      positions: {
        1: {
          title: 'Mexanik Muhandis',
          department: 'Muhandislik',
          location: 'Toshkent',
          experience: '3-5 yil',
          age: '25-45',
          description: 'Sanoat transporti uchun mexanik tizimlarni loyihalash. CAD dasturlari bilan ishlash.',
          requirements: ['Bakalavr darajasi', 'CAD tajribasi', 'Ishlab chiqarish jarayonlarini bilish', 'Muammolarni hal qilish']
        },
        2: {
          title: 'Payvandchi',
          department: 'Ishlab chiqarish',
          location: 'Toshkent',
          experience: '2+ yil',
          age: '20-50',
          description: 'Po\'lat konstruksiyalarni payvandlash. Sifat va xavfsizlik standartlariga rioya qilish.',
          requirements: ['Sertifikat', 'MIG/TIG tajribasi', 'Xavfsizlik texnikasi', 'Chizmalarni o\'qish']
        },
        3: {
          title: 'CNC Operatori',
          department: 'Ishlab chiqarish',
          location: 'Toshkent',
          experience: '2-4 yil',
          age: '22-45',
          description: 'CNC dastgohlarida ishlash. Uskunalarni dasturlash va xizmat ko\'rsatish.',
          requirements: ['Texnik ma\'lumot', 'CNC dasturlash', 'G-code bilimi', 'Detallarga e\'tibor']
        },
        4: {
          title: 'Sotuv Menejeri',
          department: 'Sotuv',
          location: 'Toshkent',
          experience: '3+ yil',
          age: '25-40',
          description: 'Mijozlar bilan aloqalarni rivojlantirish. Yangi biznes imkoniyatlarini aniqlash.',
          requirements: ['Bakalavr darajasi', 'B2B sotuv tajribasi', 'Muloqot qobiliyatlari', 'Bozor bilimi']
        }
      },
      teamMembers: {
        sergey: {
          name: 'Sergey Konstantinovich Petrov',
          role: 'Ishlab Chiqarish Bo\'yicha Direktor O\'rinbosari',
          story: 'KRANTASda 50 yildan ortiq. Kompaniyaning zamonaviy ishlab chiqaruvchiga aylanishiga rahbarlik qilgan.'
        },
        komil: {
          name: 'Komil Xaitmatov',
          role: 'Yig\'uvchi Texnik',
          story: '45 yil KRANTASda. 1980 yilda haydovchi bo\'lib boshlagan. 16 dan 60 tonnagacha bo\'lgan kranlarni yig\'ish ustasi.'
        },
        elvira: {
          name: 'Elvira',
          role: 'Ko\'prikli Kran Operatori',
          story: 'KRANTAS oilasining uchinchi avlodi. Ishlab chiqarish samaradorligi va xavfsizligiga bevosita ta\'sir qiluvchi operator.'
        }
      }
    },
    contacts: {
      title: 'Biz Bilan Bog\'laning',
      welcomeTitle: 'Biz doimo aloqadamiz',
      heroIntro: 'Bizning jamoamiz texnik yoki tijorat so\'rovlaringizda yordam berishga tayyor. Professional yordam uchun Toshkentdagi bosh qorong\'imizga murojaat qiling.',
      subtitle: 'Mahsulotlar, xizmatlar yoki hamkorlik haqida so\'rang. Biz 1-2 ish kuni ichida javob beramiz.',
      info: 'Aloqa Ma\'lumotlari',
      form: 'Xabar Yuborish',
      departments: 'Bizning Bo\'limlar',
      address: 'Mirzo-Ulug\'bek tumani, Ziyolilar ko\'chasi, 1, Toshkent, O\'zbekiston',
      phone: '+998 71 123 45 67',
      email: 'info@krantas.uz',
      sales: 'Sotish Bo\'limi',
      support: 'Texnik Qo\'llab-quvvatlash',
      parts: 'Ehtiyot Qismlar',
      service: 'Xizmat Ko\'rsatish Markazi',
      hr: 'Kadrlar Bo\'limi',
      export: 'Eksport Bo\'limi',
      name: 'Ismingiz',
      emailLabel: 'Sizning Emailingiz',
      messageLabel: 'Sizning Xabaringiz',
      send: 'Xabarni Yuborish',
      heroTitle: 'Biz bilan bog\'laning',
      teamReady: 'Bizning jamoamiz mahsulotlarimiz, xizmatlarimiz yoki sanoat yechimlari bo\'yicha har qanday so\'rovlar bilan yordam berishga tayyor.',
      headquarters: {
        title: 'KRANTAS Group Bosh Qarorgohi',
        description: 'Ofis Toshkent xalqaro aeroportidan va shahar markazidan taxminan 30 daqiqalik masofada joylashgan.',
        officeLabel: 'Bizning Ofis',
        postalCodeLabel: 'Pochta Indeksi',
        contactInfoLabel: 'Aloqa Ma\'lumotlari'
      },
      formTitle: 'Aloqa Shakli',
      inquiryForm: 'So\'rov Shakli',
      companyLabel: 'Kompaniya',
      organizationPlaceholder: 'Sizning tashkilotingiz',
      areaOfInterestLabel: 'Qiziqish Sohasi',
      selectAreaPlaceholder: 'Sohani tanlang',
      phoneLabel: 'Telefon Raqami',
      emailPlaceholder: 'sizning@email.com',
      successMessage: 'Xabar yuborildi! Biz siz bilan 1-2 ish kuni ichida bog\'lanamiz.',
      subjectOptions: {
        lifting: 'Yuk Ko\'tarish Uskunalari',
        dump: 'Samosvallar',
        special: 'Maxsus Texnika',
        metal: 'Metall Konstruktsiyalar',
        agricultural: 'Qishloq Xo\'jaligi Texnikasi',
        tanks: 'Avtosisternalar',
        mining: 'Kon Samosvallari',
        cranes: 'Ko\'prikli va Ko\'tarma Kranlar',
        custom: 'Maxsus Yechimlar',
        service: 'Ehtiyot Qismlar va Servis',
        careers: 'Karyera / Ishga Joylashish',
        other: 'Boshqa So\'rov'
      }
    },
    equipmentSolutions: {
      title: 'Maxsus Muhandislik',
      heading: 'Noyob Maxsus Yechimlar',
      welcomeTitle: 'Buyurtma asosidagi yechimlar',
      subtitle: 'Maxsus muhandislik imkoniyatlarimiz bilan o\'z tasavvuringizni haqiqatga aylantiring. Kontsepsiyadan ishlab chiqarishgacha, biz sizning noyob talablaringizga javob beradigan moslashtirilgan yechimlarni taqdim etamiz.',
      howItWorks: 'Bu Qanday Ishlaydi',
      howItWorksTitle: 'Siz Har Qanday G\'oya Topsangiz Bo\'ladi',
      howItWorksDesc1: 'Bizning muhandislik jamoamiz sizning ekspluatatsiya muammolaringizni tushunish va innovatsion yechimlar ishlab chiqish uchun siz bilan yaqindan hamkorlik qiladi. Sizga modifikatsiyalangan shassi, maxsus uskuna integratsiyasi yoki mutlaqo noyob texnika kerak bo\'lsa, bizda buni amalga oshirish uchun tajriba mavjud.',
      howItWorksDesc2: 'Dastlabki maslahatdan loyihalash, prototiplash va yakuniy ishlab chiqarish orqali biz ochiq muloqotni qo\'llab-quvvatlaymiz, shunda yakuniy mahsulot sizning kutganlaringizdan oshib ketadi.',
      capabilities: 'Ishlab Chiqarish Bazasi',
      capabilitiesTitle: 'Bizning Imkoniyatlar va Ishlab Chiqarish Bazasi',
      types: 'Xizmatlar',
      typesTitle: 'Kustomlashtirish Turlari',
      chassis: 'Shassi Modifikatsiyasi',
      chassisDesc: 'Maxsus ilovalar uchun g\'ildirak bazasini sozlash, transmissiyani yangilash va konstruktsiyani mustahkamlashni o\'z ichiga olgan to\'liq shassi modifikatsiyalari.',
      complexes: 'Ixtisoslashtirilgan Transport Muhandisligi',
      complexesDesc: 'Ekstremal operatsion talablar uchun ishlab chiqilgan yuqori quvvatli transport majmualarini loyihalash va ishlab chiqarish. Biz chidamlilik va aniqlik uchun qurilgan maxsus ko\'p o\'qli konfiguratsiyalar va avtomatlashtirilgan yuklash tizimlarini yetkazib beramiz.',
      hydraulics: 'Gidraulika va Elektronika',
      hydraulicsDesc: 'Aniq ishlash va avtomatlashtirish imkoniyatlari uchun ilg\'or gidravlik tizim integratsiyasi va elektron boshqaruv tizimlari.',
      containers: 'Standartga Mos Kelmaydigan Konteynerlar',
      containersDesc: 'Izolyatsiyalangan baklar, bosim idishlari va noyob geometrik konfiguratsiyalarni o\'z ichiga olgan maxsus yuklar uchun maxsus konteyner ishlab chiqarish.',
      discussProject: 'Loyihangizni Muhokama Qiling',
      customProject: 'Maxsus Loyihangiz Bormi?',
      customProjectDesc: 'Bizning muhandislik jamoamiz sizning noyob talablaringizni muhokama qilishga va sizning ekspluatatsiya ehtiyojlaringizga mos keladigan moslashtirilgan yechimni ishlab chiqishga tayyor.',
      startProject: 'Loyihani Boshlash',
      viewProducts: 'Standart Mahsulotlarni Ko\'rish',
    },
    categories: {
      'lifting-equipment': { name: 'Yuk Ko\'tarish Uskunalari', description: 'Qurilish va sanoat uchun avtokranlar va yuk ko\'tarish yechimlari' },
      'dump-trucks': { name: 'Samosvallar', description: 'Tog\'-kon, qurilish va material tashish uchun og\'ir yuk samosvallari' },
      'special-purpose': { name: 'Maxsus Texnika', description: 'Sanoat va kommunal ehtiyojlar uchun maxsus transport vositalari' },
      'agricultural': { name: 'Qishloq Xo\'jaligi Texnikasi', description: 'Zamonaviy qishloq xo\'jaligi uchun traktorlar, kombaynlar va uskunalar' },
      'tank-trucks': { name: 'Avtositsernalar', description: 'Yoqilg\'i, suv va kimyoviy moddalar tashish uchun maxsus sisternalar' },
      'overhead-gantry': { name: 'Ko\'prik va Kozlovoy Kranlar', description: 'Og\'ir yuklarni ko\'tarish uchun sanoat ko\'prik va kozlovoy kran tizimlari' },
      'mining-trucks': { name: 'Kon Samosvallari', description: 'Tog\'-kon va karyer ishlari uchun og\'ir yukli qattiq va sharnirli samosvallar' },
      'metal-structures': { name: 'Metall Konstruktsiyalar', description: 'Sanoat metall konstruktsiyalari va komplekslarini loyihalash va ishlab chiqarish' },
    },
    specLabels: {
      model: 'Model',
      loadCapacity: 'Yuk Ko\'tarish Qobiliyati',
      tankVolume: 'Sistern Hajmi',
      wheelFormula: 'G\'ildirak Formulasi',
      drive: 'Yuritma',
      environmentalClass: 'Ekol. Sinf',
      tippingSystem: 'Ag\'darish Tizimi',
      liftingCapacity: 'Yuk Ko\'tarish Qobiliyati',
      craneType: 'Kran Turi',
      reach: 'Quloch',
      liftingHeight: 'Ko\'tarish Balandligi',
      outriggers: 'Tiryallar',
      terrain: 'O\'tuvchanlik',
      drillingDiameter: 'Burg\'ulash Diametri',
      drillingDepth: 'Burg\'ulash Chuqurligi',
      mounting: 'O\'rnatish',
      platformHeight: 'Platforma Balandligi',
      platformCapacity: 'Platforma Sig\'imi',
      stabilization: 'Barqarorlashtirish',
      platform: 'Platforma',
      material: 'Material',
      pumping: 'Nasoslash',
      certification: 'Sertifikatsiyalash',
      lining: 'Qoplama',
      compartments: 'Bo\'limlar',
      application: 'Qo\'llanilishi',
      chassis: 'Shassi',
      sweepingWidth: 'Tozalash Kengligi',
      hopperVolume: 'Bunker Hajmi',
      vacuumSystem: 'Vakuum Tizimi',
      waterTank: 'Suv Baki',
      waterCapacity: 'Suv Sig\'imi',
      pumpCapacity: 'Nasos Sig\'imi',
      equipment: 'Uskunalar',
      tools: 'Asboblar',
      storage: 'Saqlash',
      applications: 'Ilovalar',
      pumpDepth: 'Nasos Chuqurligi',
      seating: 'O\'rindiqlar',
      comfort: 'Qulaylik',
      rescue: 'Qutqaruv',
      grainTank: 'Don Bunkeri',
      headerWidth: 'Jatka Kengligi',
      threshing: 'Yanchish',
      power: 'Quvvat',
      augerType: 'Bur Turi',
      control: 'Boshqaruv',
      grabType: 'Greyfer Turi',
      containerSize: 'Konteyner O\'lchami',
      mobility: 'Mobillik',
      structure: 'Tuzilishi',
      axles: 'O\'qlar',
    },
    productsData: {
      'dt-dump-truck-4m3': {
        name: 'Samosval 4.5 t',
        description: 'Shahar qurilishi va kichik loyihalar uchun ixcham samosval.',
        fullDescription: '4 m³ hajmli samosval shahar qurilishi, obodonlashtirish va kichik material tashish operatsiyalari uchun mo\'ljallangan. Ixcham o\'lcham cheklangan joylarda ishlashga imkon beradi.',
        features: ['Ixcham dizayn', 'Shahar uchun qulay', 'Oson manevr', 'Samarali ishlash', 'Kam texnik xizmat'],
        specs: { model: 'KDT-4.5', loadCapacity: '4.5 tonna', tankVolume: '4 m³', wheelFormula: '4x2', drive: 'Dizel', environmentalClass: 'Euro 5' }
      },
      'dt-dump-truck-8m3': {
        name: 'Samosval 10 t',
        description: 'Qurilish va kommunal xizmatlar uchun o\'rta yuk samosvali.',
        fullDescription: '8 m³ hajmli samosval kommunal xizmatlar, yo\'l ta\'miri va o\'rta qurilish loyihalari uchun sig\'im va manevr muvozanatini taklif etadi.',
        features: ['O\'rta sig\'im', 'Ko\'p qirrali', 'Ishonchli ishlash', 'Yoqilg\'i tejamkor', 'Qurilishga tayyor'],
        specs: { model: 'KDT-10', loadCapacity: '10 tonna', tankVolume: '8 m³', wheelFormula: '4x2', drive: 'Dizel', environmentalClass: 'Euro 5' }
      },
      'dt-dump-truck-16m3': {
        name: 'Samosval 20 t',
        description: 'Qurilish va tog\'-kon ishlari uchun og\'ir samosval.',
        fullDescription: '16 m³ hajmli samosval og\'ir qurilish, tog\'-kon ishlari va katta hajmdagi materiallarni tashish uchun mo\'ljallangan bo\'lib, mustahkam konstruktsiya va yuqori yuk ko\'tarish qobiliyatiga ega.',
        features: ['Yuqori sig\'im', 'Og\'ir yuk shassi', 'Tog\'-kon uchun', 'Kuchaytirilgan kuzov', 'Chidamli konstruktsiya'],
        specs: { model: 'KDT-20', loadCapacity: '20 tonna', tankVolume: '16 m³', wheelFormula: '6x4', drive: 'Dizel', environmentalClass: 'Euro 5' }
      },
      'mt-mining-truck-25t': {
        name: 'Kon Samosvali 240 t',
        description: 'Og\'ir karyer va qazib olish ishlari uchun maxsus kon samosvali.',
        fullDescription: 'MT kon samosvali qattiq yo\'lsiz kon muhitlari uchun maxsus ishlab chiqilgan bo\'lib, ajoyib shassi chidamliligi bilan karyer va qazish operatsiyalari uchun maksimal yuk ko\'tarish qobiliyatini beradi.',
        features: ['Kuchaytirilgan kon shassisi', 'Og\'ir karyer ishi', 'Yo\'lsiz muhitga mos', 'Kuchli transmissiya', 'Sanoat xavfsizligi'],
        specs: { model: 'KMT-240', loadCapacity: '240 tonna', tankVolume: '20 m³', wheelFormula: '6x4', drive: 'Dizel', environmentalClass: 'Euro 5' }
      },
      'dt-tipper-semi-trailer': {
        name: 'Samosval Yarim Tirkama 24-26 m³',
        description: 'Sochma materiallarni tashish uchun katta sig\'imli yarim tirkama.',
        fullDescription: 'Samosval yarim tirkamasi gidravlik ag\'darish tizimi bilan uzoq masofaga sochma materiallarni tashish uchun maksimal yuk ko\'tarish qobiliyatini ta\'minlaydi.',
        features: ['Katta hajm', 'Uzoq masofa', 'Gidravlik ag\'darish', 'Yuqori samaradorlik', 'Sochma tashish'],
        specs: { model: 'KTS-26', tankVolume: '24-26 m³', axles: '3 o\'qli', drive: 'Yarim tirkama', tippingSystem: 'Gidravlik' },
      },
      'le-crane-7t': {
        name: 'Avtokran-manipulyator 7 t',
        description: 'Yuklash va materiallarni qayta ishlash uchun ixcham manipulyator kran.',
        fullDescription: '7 tonnalik manipulyator kran aniq materiallarni qayta ishlash va yuk mashinasini yuklash operatsiyalari uchun sharnirli gidravlik qo\'l bilan jihozlangan.',
        features: ['Manipulyator', 'Gidravlik boshqaruv', 'Aniq joylashtirish', 'Yuk mashinasiga o\'rnatilgan', 'Ko\'p qirrali ishlash'],
        specs: { model: 'KLC-7', liftingCapacity: '7 tonna', craneType: 'Manipulyator', drive: 'Gidravlik', reach: '15m gacha' }
      },
      'le-crane-10-15t': {
        name: 'Avtokran-manipulyator 10-15 t',
        description: 'Qurilish va logistika uchun o\'rta yuk manipulyator krani.',
        fullDescription: '10-15 tonnalik manipulyator kran qurilish va logistika dasturlari uchun ajoyib quloch va yuk ko\'tarish qobiliyatini ta\'minlaydi.',
        features: ['O\'rta sig\'im', 'Kengaytirilgan quloch', 'Qurilishga tayyor', 'Logistika uchun', 'Ishonchli ishlash'],
        specs: { model: 'KLC-15', liftingCapacity: '10-15 tonna', craneType: 'Manipulyator', drive: 'Gidravlik', reach: '20m gacha' }
      },
      'le-crane-16t': {
        name: 'Avtokran 16 t',
        description: 'Qurilish ko\'tarish operatsiyalari uchun mobil avtokran.',
        fullDescription: '16 tonnalik avtokran qurilish va sanoat dasturlari uchun mobillikni katta yuk ko\'tarish qobiliyati bilan birlashtiradi.',
        features: ['Mobil kran', 'Teleskopik strela', 'Gidravlik tiryallar', 'Qurilish darajasi', 'Yuqori barqarorlik'],
        specs: { model: 'KTC-16', liftingCapacity: '16 tonna', craneType: 'Teleskopik Strela', liftingHeight: '30m', outriggers: 'Gidravlik' }
      },
      'le-crane-25t': {
        name: 'Avtokran 25 t',
        description: 'Katta qurilish loyihalari uchun og\'ir yuk avtokrani.',
        fullDescription: '25 tonnalik avtokran katta qurilish va sanoat loyihalari uchun ajoyib quloch bilan kuchli yuk ko\'tarish qobiliyatini beradi.',
        features: ['Og\'ir ko\'tarish', 'Uzun strela', 'Katta loyihalar', 'Professional daraja', 'Maksimal barqarorlik'],
        specs: { model: 'KTC-25', liftingCapacity: '25 tonna', craneType: 'Teleskopik Strela', liftingHeight: '35m', outriggers: 'Gidravlik' }
      },
      'le-crane-32t': {
        name: 'Avtokran 32 t',
        description: 'Yirik sanoat operatsiyalari uchun o\'ta og\'ir avtokran.',
        fullDescription: '32 tonnalik avtokran yirik sanoat inshootlari va infratuzilma loyihalari uchun ajoyib yuk ko\'tarish qobiliyatini ta\'minlaydi.',
        features: ['Qo\'shimcha sig\'im', 'Sanoat darajasi', 'Kengaytirilgan balandlik', 'Og\'ir loyihalar', 'Yuqori barqarorlik'],
        specs: { model: 'KTC-32', liftingCapacity: '32 tonna', craneType: 'Teleskopik Strela', liftingHeight: '40m', outriggers: 'Gidravlik' }
      },
      'le-crane-50t': {
        name: 'Avtokran 50 t',
        description: 'Og\'ir sanoat ko\'tarish uchun maksimal sig\'imli avtokran.',
        fullDescription: '50 tonnalik avtokran eng og\'ir sanoat va infratuzilma loyihalari uchun bizning eng kuchli mobil kranimizni ifodalaydi.',
        features: ['Maksimal sig\'im', 'Og\'ir sanoat', 'Uzun quloch', 'Infratuzilmaga tayyor', 'Professional ishlash'],
        specs: { model: 'KTC-50', liftingCapacity: '50 tonna', craneType: 'Teleskopik Strela', liftingHeight: '48m', outriggers: 'Gidravlik' }
      },
      'le-all-terrain-crane': {
        name: 'Barcha Hududlar Uchun Avtokran',
        description: 'Uzoq joylar uchun yo\'lsiz yarim tirkamali barcha hududlar krani.',
        fullDescription: 'Barcha hududlar uchun avtokran murakkab yerlarda ishlash uchun ixtisoslashgan yarim tirkama bilan yo\'lsiz qobiliyatga ega.',
        features: ['Barcha hudud', 'Yo\'lsiz qobiliyat', 'Yarim tirkama', 'Uzoq joylar', 'Yuqori mobillik'],
        specs: { model: 'KATC-AT', craneType: 'Barcha Hududlar', wheelFormula: '6x6', drive: 'To\'liq g\'ildirakli', terrain: 'Yo\'lsiz qobiliyat' }
      },
      'le-earth-auger': {
        name: 'Avtoshassidagi Burg\'ulash Uskunasi Ø 350mm',
        description: 'Poydevor va ustun o\'rnatish uchun yuk mashinasiga o\'rnatilgan burg\'ulash shneki.',
        fullDescription: 'Yuk mashinasiga o\'rnatilgan burg\'ulash shneki poydevor qo\'ziqlari, kommunal ustunlar va panjara o\'rnatish uchun Ø 350 mm sig\'im bilan samarali burg\'ulashni ta\'minlaydi.',
        features: ['Tuproq burg\'ulash', 'Poydevor ishlari', 'Ustun o\'rnatish', 'Gidravlik quvvat', 'Samarali ishlash'],
        specs: { model: 'KEA-350', drillingDiameter: 'Ø 350mm', drillingDepth: '3m gacha', drive: 'Gidravlik', mounting: 'Yuk mashinasiga o\'rnatilgan' }
      },
      'le-aerial-platform-18m': {
        name: 'Avtogidroko\'taruvchi 18 m',
        description: 'Kommunal va ta\'mirlash ishlari uchun yuk mashinasiga o\'rnatilgan havo platformasi.',
        fullDescription: '18 metrlik havo ishlari platformasi kommunal xizmatlar, bino ishlari va daraxtlarni kesish operatsiyalari uchun xavfsiz yuqori kirishni ta\'minlaydi.',
        features: ['18m quloch', 'Xavfsiz platforma', 'Kommunal ishlar', 'Ta\'mirga tayyor', 'Barqaror ishlash'],
        specs: { model: 'KAP-18', platformHeight: '18m', platformCapacity: '250 kg', drive: 'Gidravlik', stabilization: 'Tiryallar' }
      },
      'le-aerial-platform-28m': {
        name: 'Avtogidroko\'taruvchi 28 m',
        description: 'Ko\'p qavatli binolarga xizmat ko\'rsatish uchun kengaytirilgan qulochli havo platformasi.',
        fullDescription: '28 metrlik havo ishlari platformasi ko\'p qavatli binolarga xizmat ko\'rsatish, telekommunikatsiya va elektr ishlari uchun kengaytirilgan qulochni ta\'minlaydi.',
        features: ['28m quloch', 'Ko\'p qavatli ish', 'Telekomga tayyor', 'Elektr ishlari', 'Kengaytirilgan balandlik'],
        specs: { model: 'KAP-28', platformHeight: '28m', platformCapacity: '250 kg', drive: 'Gidravlik', stabilization: 'Tiryallar' }
      },
      'le-aerial-platform-36m': {
        name: 'Avtogidroko\'taruvchi 36 m',
        description: 'Maxsus ilovalar uchun maksimal balandlikdagi havo platformasi.',
        fullDescription: '36 metrlik havo ishlari platformasi maxsus texnik xizmat ko\'rsatish, qurilish va sanoat ilovalari uchun maksimal ish balandligini beradi.',
        features: ['36m maksimal', 'Maxsus ishlar', 'Sanoat darajasi', 'Professional foydalanish', 'Ustun quloch'],
        specs: { model: 'KAP-36', platformHeight: '36m', platformCapacity: '200 kg', drive: 'Gidravlik', stabilization: 'Og\'ir tiryallar' }
      },
      'le-crane-container-3.2t': {
        name: 'Manipulyator Kran 3.2 t (Konteynertashuvchi)',
        description: 'O\'zi yuklashi uchun konteyner platformali avtokran.',
        fullDescription: 'Konteyner platformali 3.2 tonnalik avtokran konteynerlar va og\'ir yuklarni samarali o\'zi yuklash va tashish imkonini beradi.',
        features: ['O\'zi yuklash', 'Konteyner tashish', 'Samarali', 'Ko\'p qirrali', 'Ixcham'],
        specs: { liftingCapacity: '3.2 tonna', platform: 'Konteyner turi', drive: 'Gidravlik' }
      },
      'tt-water-tanker-4-6m3': {
        name: 'Suv Tashuvchi 4-6 m³',
        description: 'Ichimlik va texnik suv tashish uchun ixcham suv tashuvchi.',
        fullDescription: '4-6 m³ hajmli suv tashuvchi kommunal xizmatlar, qurilish maydonchalari va qishloq joylari uchun ichimlik va texnik suv tashishni ta\'minlaydi.',
        features: ['Oziq-ovqat darajasi', 'Ixcham o\'lcham', 'Ichimlik suvi', 'Kommunal foydalanish', 'Qishloq xizmati'],
        specs: { model: 'KWT-6', tankVolume: '4-6 m³', material: 'Oziq-ovqat po\'lati', pumping: 'Kiritilgan', certification: 'Ichimlik suvi' }
      },
      'tt-water-tanker-allterrain': {
        name: 'Suv Tashuvchi Barcha Hudud 10-12 m³',
        description: 'Yo\'lsiz suv yetkazib berish uchun barcha hudud suv tashuvchisi.',
        fullDescription: '10-12 m³ sig\'imli barcha hudud suv tashuvchisi uzoq joylarga suv yetkazib berish va qurilishni qo\'llab-quvvatlash uchun yo\'lsiz qobiliyatga ega.',
        features: ['Barcha hudud', 'Yo\'lsiz qobiliyat', 'Uzoq yetkazib berish', 'Qurilishni qo\'llab-quvvatlash', 'Katta sig\'im'],
        specs: { model: 'KWT-AT12', tankVolume: '10-12 m³', wheelFormula: '6x6', drive: 'Barcha hudud', material: 'Oziq-ovqat po\'lati' }
      },
      'tt-acid-tanker-8-14m3': {
        name: 'Kislota Tashuvchi Avtomobil 8-14 m³',
        description: 'Kimyoviy moddalar tashish uchun maxsus kislota tashuvchi.',
        fullDescription: '8-14 m³ sig\'imli kislota tashuvchi yuk mashinasi kislotalar va korroziv kimyoviy moddalarni xavfsiz tashish uchun korroziyaga chidamli konstruktsiyaga ega.',
        features: ['Kislotaga chidamli', 'Kimyoviy tashish', 'Xavfsizlik xususiyatlari', 'ADR mosligi', 'Korroziyaga qarshi'],
        specs: { model: 'KAT-14', tankVolume: '8-14 m³', material: 'Kislotaga chidamli', lining: 'Rezina/PTFE', certification: 'ADR' }
      },
      'tt-acid-semi-trailer': {
        name: 'Kislota Sesterna Yarim Tirkama 14-20 m³',
        description: 'Sanoat kimyoviy moddalarini tashish uchun katta sig\'imli kislota baki yarim tirkamasi.',
        fullDescription: 'Kislota baki yarim tirkamasi to\'liq xavfsizlik tizimlari bilan keng ko\'lamli sanoat kimyoviy moddalarini tashish uchun 14-20 m³ sig\'imni ta\'minlaydi.',
        features: ['Katta sig\'im', 'Yarim tirkama', 'Sanoat kimyosi', 'Xavfsizlik tizimlari', 'Uzoq masofa'],
        specs: { model: 'KATS-20', tankVolume: '14-20 m³', axles: '3 o\'qli', material: 'Kislotaga chidamli', certification: 'ADR/UN' }
      },
      'tt-fuel-semi-trailer': {
        name: 'Yoqilg\'i Sesterna Yarim Tirkama 30-40 m³',
        description: 'Neft mahsulotlarini tarqatish uchun yuqori sig\'imli yoqilg\'i baki yarim tirkamasi.',
        fullDescription: 'Yoqilg\'i baki yarim tirkamasi bir nechta bo\'limlar bilan keng ko\'lamli neft mahsulotlarini tarqatish uchun 30-40 m³ sig\'imni yetkazib beradi.',
        features: ['Maksimal sig\'im', 'Ko\'p bo\'limli', 'Neft tarqatish', 'Uzoq masofa', 'Samarali yetkazib berish'],
        specs: { model: 'KFTS-40', tankVolume: '30-40 m³', compartments: 'Ko\'p bo\'limli', axles: '3 o\'qli', certification: 'ADR' }
      },
      'tt-fuel-tanker-4-6m3': {
        name: 'Yoqilg\'i Tashuvchi ATZ 4-6 m³',
        description: 'Mahalliy tarqatish uchun yoqilg\'i tashuvchi va quyish mashinasi.',
        fullDescription: 'Samarali mahalliy yoqilg\'i tarqatish va joyida quyish uchun mo\'ljallangan ixcham yoqilg\'i tashuvchi va quyuvchi.',
        features: ['Yoqilg\'i tarqatish', 'Quyish', 'Ixcham', 'Samarali', 'Mahalliy foydalanish'],
        specs: { model: 'ATZ-6', tankVolume: '4-6 m³', material: 'Po\'lat', application: 'Quyish' }
      },
      'tt-trailer-refueller-2-4m3': {
        name: 'Tirkama Quyuvchi 2-4 m³',
        description: 'Moslashuvchan joylashtirish uchun tirkamaga o\'rnatilgan yoqilg\'i quyuvchi.',
        fullDescription: 'Qurilish maydonchalari va uzoq hududlar uchun moslashuvchan va mobil quyish imkoniyatlarini ta\'minlaydigan tirkamaga o\'rnatilgan yoqilg\'i quyuvchi.',
        features: ['Mobil quyish', 'Tirkamaga o\'rnatilgan', 'Moslashuvchan', 'Qurilish maydonchalari', 'Uzoq hududlar'],
        specs: { model: 'TR-4', tankVolume: '2-4 m³', chassis: 'Tirkama', application: 'Mobil Quyish' }
      },
      'tt-fuel-tanker-8-12m3': {
        name: 'Yoqilg\'i Tashuvchi ATZ 8-12 m³',
        description: 'Mintaqaviy tarqatish uchun o\'rta sig\'imli yoqilg\'i tashuvchi.',
        fullDescription: '8-12 m³ sig\'imli samarali mintaqaviy yoqilg\'i tarqatish va joyida quyish operatsiyalari uchun mo\'ljallangan o\'rta sig\'imli yoqilg\'i tashuvchi.',
        features: ['O\'rta sig\'im', 'Mintaqaviy tarqatish', 'Quyishga qodir', 'Samarali', 'Ko\'p qirrali'],
        specs: { model: 'ATZ-12', tankVolume: '8-12 m³', material: 'Po\'lat', application: 'Yoqilg\'i Tarqatish' }
      },
      'tt-fuel-tanker-16-18m3': {
        name: 'Yoqilg\'i Tashuvchi ATZ 16-18 m³',
        description: 'Tijorat tarqatish uchun katta sig\'imli yoqilg\'i tashuvchi.',
        fullDescription: 'Tijorat yoqilg\'i tarqatish va keng ko\'lamli quyish operatsiyalari uchun 16-18 m³ hajmli katta sig\'imli yoqilg\'i tashuvchi.',
        features: ['Katta sig\'im', 'Tijorat darajasi', 'Yuqori hajm', 'Tarqatishga tayyor', 'Professional'],
        specs: { model: 'ATZ-18', tankVolume: '16-18 m³', material: 'Po\'lat', application: 'Tijorat Tarqatish' }
      },
      'tt-fuel-tanker-20-25m3': {
        name: 'Yoqilg\'i Tashuvchi ATZ 20-25 m³',
        description: 'Sanoat operatsiyalari uchun o\'ta katta yoqilg\'i tashuvchi.',
        fullDescription: 'Sanoat yoqilg\'i tarqatish va keng ko\'lamli tijorat operatsiyalari uchun 20-25 m³ hajmli o\'ta katta sig\'imli yoqilg\'i tashuvchi.',
        features: ['O\'ta katta sig\'im', 'Sanoat darajasi', 'Maksimal hajm', 'Og\'ir yuk', 'Yuqori samaradorlik'],
        specs: { model: 'ATZ-25', tankVolume: '20-25 m³', material: 'Po\'lat', application: 'Sanoat Tarqatish' }
      },
      'spm-vacuum-sweeper': {
        name: 'Vakuum Supurish Mashinasi',
        description: 'Ko\'chalarni tozalash uchun kommunal vakuum supuruvchi.',
        fullDescription: 'Vakuum supurish mashinasi changni bostirish bilan kommunal ko\'chalarni tozalash uchun samarali mexanik va vakuum supurishni ta\'minlaydi.',
        features: ['Vakuum supurish', 'Changni bostirish', 'Kommunal daraja', 'Katta bunker', 'Samarali tozalash'],
        specs: { model: 'KVS-Municipal', sweepingWidth: '2.5m', hopperVolume: '6 m³', vacuumSystem: 'Kiritilgan', waterTank: '1000L' }
      },
      'spm-firefighting-platform': {
        name: 'Yong\'in O\'chirish Gidravlik Havo Platformasi 72 m',
        description: 'Ko\'p qavatli yong\'in o\'chirish va qutqaruv platformasi.',
        fullDescription: '72 metrlik yong\'in o\'chirish gidravlik havo platformasi ko\'p qavatli binolar va sanoat inshootlari uchun yong\'in o\'chirish va qutqaruv imkoniyatlarini ta\'minlaydi.',
        features: ['72m balandlik', 'Yong\'in o\'chirish', 'Qutqaruvchi qodir', 'Suv to\'pi', 'Ko\'p qavatli tayyor'],
        specs: { model: 'KFF-72', platformHeight: '72m', waterCapacity: '2000L', pumpCapacity: '3000 L/min', reach: '65m gacha' }
      },
      'spm-firefighting-platform-52-55m': {
        name: 'Yong\'in O\'chirish Gidravlik Havo Platformasi 52-55 m',
        description: 'O\'rta qavatli yong\'in o\'chirish va qutqaruv platformasi yuk mashinasi.',
        fullDescription: '52-55 metrlik yong\'in o\'chirish gidravlik havo platformasi yuk mashinasi o\'rta qavatli binolar va sanoat inshootlari uchun yong\'in o\'chirish va qutqaruv imkoniyatlarini ta\'minlaydi.',
        features: ['52-55m balandlik', 'Yong\'in o\'chirish', 'Qutqaruv platformasi', 'Suv tizimi', 'O\'rta qavatli qodir'],
        specs: { model: 'KFF-55', platformHeight: '52-55m', waterCapacity: '1800L', pumpCapacity: '2500 L/min', reach: '50m gacha' }
      },
      'spm-mobile-workshop': {
        name: 'Mobil Avtotransport Ta\'mirlash Ustaxonasi (MVRW)',
        description: 'Dala ta\'miri uchun to\'liq jihozlangan mobil ustaxona.',
        fullDescription: 'Mobil avtotransport ta\'mirlash ustaxonasi asboblar, uskunalar va ehtiyot qismlarni saqlash bilan to\'liq joyida texnik xizmat ko\'rsatish va ta\'mirlash imkoniyatlarini ta\'minlaydi.',
        features: ['Mobil ustaxona', 'To\'liq asboblar', 'Joyida ta\'mirlash', 'Elektr ishlab chiqarish', 'Dalaga tayyor'],
        specs: { model: 'KMVRW', equipment: 'To\'liq ustaxona', power: 'Generator 15kVt', tools: 'To\'liq to\'plam', storage: 'Tashkillashtirilgan bo\'limlar' }
      },
      'spm-drilling-rig-urb50': {
        name: 'URB-50 Burg\'ulash Uskunasi (8×8)',
        description: 'Qidiruv va quduq burg\'ulash uchun barcha hudud burg\'ulash uskunasi.',
        fullDescription: '8×8 barcha hudud shassisidagi URB-50 burg\'ulash uskunasi qidiruv, suv quduqlari va geotexnik dasturlar uchun kuchli burg\'ulash qobiliyatini ta\'minlaydi.',
        features: ['Chuqur burg\'ulash', '8x8 shassi', 'Barcha hudud', 'Qidiruvga tayyor', 'Suv quduqlari'],
        specs: { model: 'URB-50', wheelFormula: '8x8', drillingDepth: '500m gacha', drive: 'To\'liq g\'ildirakli', terrain: 'Barcha hudud' }
      },
      'spm-drilling-rig-zif': {
        name: 'ZIF Burg\'ulash Uskunasi',
        description: 'Sanoat dasturlari uchun ixtisoslashtirilgan burg\'ulash uskunasi.',
        fullDescription: 'ZIF burg\'ulash uskunasi sanoat, qurilish va geotexnik dasturlar uchun ixtisoslashgan burg\'ulash qobiliyatini ta\'minlaydi.',
        features: ['Sanoat burg\'ulash', 'Qurilishda foydalanish', 'Geotexnik', 'Gidravlik quvvat', 'Ko\'p qirrali ishlash'],
        specs: { model: 'ZIF', drillingDepth: '300m gacha', applications: 'Sanoat/Qurilish', drive: 'Gidravlik' }
      },
      'spm-dnp-pump-installation': {
        name: 'DNP Nasos O\'rnatish Tizimi',
        description: 'Nasoslarni quduqlarga tushirish uchun o\'rnatish tizimi.',
        fullDescription: 'DNP o\'rnatish tizimi neft, suv va sanoat dasturlari uchun chuqur quduqlarda nasoslarni xavfsiz va samarali o\'rnatish va olib tashlashni ta\'minlaydi.',
        features: ['Nasos o\'rnatish', 'Chuqur quduqlar', 'Neft/Suv', 'Xavfsiz ishlash', 'Sanoat darajasi'],
        specs: { model: 'DNP', pumpDepth: '2000m gacha', liftingCapacity: '5 tonna', applications: 'Neft/Suv quduqlari', drive: 'Gidravlik' }
      },
      'spm-admin-convoy': {
        name: 'Ma\'muriy Karvon Avtomobili',
        description: 'Ma\'muriy karvon tashish uchun maxsus mo\'ljallangan avtomobil.',
        fullDescription: 'Ma\'muriy xodimlarni va karvon operatsiyalarini xavfsiz va qulay tashish uchun mo\'ljallangan.',
        features: ['Karvon tashish', 'Ma\'muriy', 'Xavfsiz', 'Qulay', 'Maxsus maqsad'],
        specs: { application: 'Ma\'muriy', seating: 'Ko\'p yo\'lovchili', comfort: 'Yuqori' }
      },
      'spm-firefighting-ladder': {
        name: 'Yong\'in O\'chirish Havo Narvoni',
        description: 'Havo narvoni va qutqaruv platformasi bilan yong\'in o\'chirish avtomobili.',
        fullDescription: 'Havo narvoni va qutqaruv platformasi bilan jihozlangan ushbu avtomobil samarali yuqori burchakli yong\'in o\'chirish va qutqaruv operatsiyalarini ta\'minlaydi.',
        features: ['Yong\'in o\'chirish', 'Havo narvoni', 'Qutqaruv platformasi', 'Yuqori burchak', 'Samarali'],
        specs: { application: 'Yong\'in o\'chirish', equipment: 'Havo narvoni', rescue: 'Platforma kiritilgan' }
      },
      'spm-patrol-pickup': {
        name: 'Patrul Pikapi (PPS)',
        description: 'Xavfsizlik operatsiyalari uchun patrul va soqchi xizmati pikapi.',
        fullDescription: 'Patrul va soqchi xizmatlari uchun sozlangan mustahkam pikap yuk mashinasi, xavfsizlik vazifalari uchun mobillik va ishonchlilikni taklif etadi.',
        features: ['Patrul', 'Soqchi xizmati', 'Xavfsizlik', 'Mobillik', 'Ishonchlilik'],
        specs: { chassis: 'Pikap', drive: '4x4', application: 'Patrul/Soqchi' }
      },
      'am-grain-harvester': {
        name: 'Don Kombayni (O\'zi Yurar)',
        description: 'Samarali don yig\'ish uchun o\'zi yurar kombayn.',
        fullDescription: 'Don kombayni bug\'doy, arpa, makkajo\'xori va boshqa don ekinlarini ilg\'or yanchish va minimal yo\'qotish bilan samarali yig\'ib olishni ta\'minlaydi.',
        features: ['O\'zi yurar', 'Katta don bunkeri', 'Keng jatka', 'Kam yo\'qotish', 'Samarali hosil yig\'ish'],
        specs: { model: 'KCH-SP', grainTank: '8000L', headerWidth: '6.5m', drive: 'O\'zi yurar', threshing: 'Ilg\'or tizim' }
      },
      'am-tractor-n81': {
        name: 'Universal Traktor NURAFSHON N 81 (4×4)',
        description: 'Ko\'p qirrali dehqonchilik uchun Belarus platformasiga asoslangan 4×4 yordamchi traktor.',
        fullDescription: 'NURAFSHON N 81 universal traktori kuchaytirilgan tortishni talab qiladigan dehqonchilik, kommunal va transport operatsiyalari uchun Belarus platformasida 4×4 yuritmani o\'z ichiga oladi.',
        features: ['4x4 yuritma', 'Belarus asosida', 'Universal foydalanish', 'PTO kiritilgan', 'Ishonchli platforma'],
        specs: { model: 'N-81 4x4', platform: 'Belarus MTZ', wheelFormula: '4x4', power: '81 OT', drive: 'Mexanik' }
      },
      'am-tractor-earth-auger': {
        name: 'Yer Burg\'usi Bilan Jihozlangan Traktor',
        description: 'Qishloq xo\'jaligi burg\'ulash uchun o\'rnatilgan yer burg\'usi bilan traktor.',
        fullDescription: 'Yer burg\'usi bilan jihozlangan traktor panjara ustunlari, daraxt ekish va qishloq xo\'jaligi poydevor ishlari uchun samarali burg\'ulashni ta\'minlaydi.',
        features: ['PTO boshqariladigan burgu', 'Panjara o\'rnatish', 'Daraxt ekish', 'Qishloq xo\'jaligi', 'Ko\'p qirrali burg\'ulash'],
        specs: { model: 'N-Auger', augerType: 'PTO boshqariladigan', drillingDiameter: 'O\'zgaruvchan', applications: 'Panjara/Daraxtlar', drive: 'Traktor PTO' }
      },
      'am-tractor-n81c': {
        name: 'Universal Traktor N 81 C',
        description: 'Belarus platformasiga asoslangan universal traktor NURAFSHON N 81 C.',
        fullDescription: 'NURAFSHON N 81 C — ixtisoslashtirilgan versiya universal traktorning, qishloq xo\'jaligi vazifalari uchun ishonchli ishlashni taklif qiluvchi.',
        features: ['Universal traktor', 'Belarus asosida', 'Ishonchli', 'Qishloq xo\'jaligi', 'Ixtisoslashgan'],
        specs: { model: 'N-81 C', platform: 'Belarus MTZ', power: '81 OT', drive: 'Mexanik' }
      },
      'og-overhead-bridge': {
        name: 'Ko\'prik Kran',
        description: 'Sanoat inshootlari uchun og\'ir yuk ko\'prik krani.',
        fullDescription: 'Aniq yuk nazorati bilan zavodlar, omborlar va ishlab chiqarish inshootlarida og\'ir yuk ko\'tarish operatsiyalari uchun mo\'ljallangan sanoat ko\'prik kran tizimi.',
        features: ['Og\'ir yuk', 'Aniq nazorat', 'Sanoat darajasi', 'Maxsus oraliq', 'Elektr ishlash'],
        specs: { liftingCapacity: '50 tonnagacha', span: 'Maxsus', liftingHeight: 'Maxsus', control: 'Elektr' }
      },
      'og-magnet-grab': {
        name: 'Magnit va Greyfer Kran',
        description: 'Magnit va greyfer biriktirmalari bilan ixtisoslashgan kran.',
        fullDescription: 'Metallolom, sochma materiallar va maxsus yuklarni qayta ishlash uchun elektromagnit va mexanik greyfer tizimlari bilan jihozlangan ko\'prik kran.',
        features: ['Magnit tizimi', 'Greyfer biriktirmasi', 'Lomni qayta ishlash', 'Sochma materiallar', 'Ko\'p qirrali ishlash'],
        specs: { liftingCapacity: '32 tonnagacha', grabType: 'Elektromagnit/Mexanik', control: 'Elektr', applications: 'Lom/Sochma' }
      },
      'og-container-overhead': {
        name: 'Konteyner Ko\'prik Kranlari',
        description: 'Konteynerlarni qayta ishlash uchun ixtisoslashgan ko\'prik kranlar.',
        fullDescription: 'Portlar, terminallar va logistika inshootlarida konteynerlarni samarali qayta ishlash uchun maxsus mo\'ljallangan og\'ir yuk ko\'prik kran tizimi.',
        features: ['Konteynerni qayta ishlash', 'Port operatsiyalari', 'Yuqori sig\'im', 'Avtomatlashtirilgan boshqaruv', 'Logistikaga tayyor'],
        specs: { liftingCapacity: '65 tonnagacha', containerSize: '20ft/40ft', span: 'Maxsus', control: 'Avtomatlashtirilgan' }
      },
      'og-single-girder-gantry': {
        name: 'Bir To\'sinli Kozlovoy Kran',
        description: 'Tashqi operatsiyalar uchun mobil bir to\'sinli kozlovoy kran.',
        fullDescription: 'Moslashuvchan joylashtirish bilan tashqi materiallarni qayta ishlash, qurilish maydonchalari va saqlash hovlilari uchun mobil dizaynli bir to\'sinli kozlovoy kran.',
        features: ['Bir to\'sinli', 'Mobil dizayn', 'Tashqida ishlash imkoniyati', 'Moslashuvchan oraliq', 'Relsga o\'rnatilgan'],
        specs: { liftingCapacity: '20 tonnagacha', span: '10-35m', liftingHeight: '6-18m', mobility: 'Relsga o\'rnatilgan' }
      },
      'og-truss-gantry': {
        name: 'Ferma Kozlovoy Kran',
        description: 'Keng ko\'lamli operatsiyalar uchun og\'ir yuk ferma kozlovoy krani.',
        fullDescription: 'Kemasozlik zavodlari, qurilish maydonchalari va sanoat inshootlarida og\'ir yuk ko\'tarish uchun kuchaytirilgan tuzilishga ega mustahkam ferma kozlovoy krani.',
        features: ['Ferma tuzilishi', 'Og\'ir yuk', 'Katta oraliq', 'Kemasozlik darajasi', 'Sanoat operatsiyalari'],
        specs: { liftingCapacity: '100 tonnagacha', span: '20-50m', structure: 'Ferma dizayni', applications: 'Kemasozlik/Sanoat' }
      }
    },
  },
  de: {
    locale: 'de',
    nav: {
      home: 'Startseite',
      catalog: 'LKW',
      services: 'Dienstleistungen',
      about: 'Über Uns',
      blog: 'Nachrichten',
      careers: 'Karriere',
      contacts: 'Kontakt',
      products: 'Produkte',
      customSolutions: 'Sonderlösungen',
    },
    cookieConsent: {
      title: 'Cookie-Einstellungen',
      description: 'Wir verwenden Cookies, um die beste Erfahrung auf unserer Website zu gewährleisten. Global Privacy Control (GPC) Signal erkannt.',
      acceptAll: 'Alle akzeptieren',
      necessaryOnly: 'Nur notwendige',
      settings: 'Einstellungen',
    },
    customSolutionsPage: {
      heroTitle: 'Sonderlösungen',
      heroIntro: 'Maßgeschneiderte Engineering-Lösungen für Ihre spezifischen Anforderungen. Wir verwandeln komplexe Visionen in zuverlässige industrielle Realität.',
      intro: {
        title: 'Ihre Vision,\nUnsere Expertise',
        desc1: 'Seit über 75 Jahren entwickeln wir mit Partnern weltweit maßgeschneiderte Maschinen, die Grenzen im Schwermaschinenbau verschieben.',
        desc2: 'Von der Beratung bis zur Fertigung liefert unser Ingenieurteam Lösungen, die überdauern.',
        stats: {
          projects: 'Spezialprojekte',
          experience: 'Jahre Erfahrung',
        },
      },
      metalStructures: {
        title: 'Industrielle Metallkonstruktionen',
        description: 'Entwurf und Fertigung komplexer Metallkonstruktionen in Industriequalität. Wir bieten Komplettlösungen vom Baumanagement bis zur Endmontage und gewährleisten maximale Haltbarkeit sowie die Einhaltung internationaler Standards.',
      },
      capabilities: {
        title: 'Anpassungsmöglichkeiten',
        subtitle: 'Ingenieur- und Fertigungsdienstleistungen nach Ihren Spezifikationen',
        items: {
          chassis: {
            title: 'Fahrgestellmodifikation',
            description: 'Komplette Fahrgestellmodifikationen inklusive Radstand und Antrieb.',
            capabilities: [
              'Verlängerter Radstand',
              'Rahmenverstärkung',
              'Spezialfederung',
              'Antriebsintegration'
            ]
          },
          complexes: {
            title: 'Spezialtransporttechnik',
            description: 'Maßgeschneiderte Transportsysteme für extreme Belastungen.',
            capabilities: [
              'Vielachsige Schwerlasttransporter',
              'Ladesysteme',
              'Transportplattformen',
              'Geräteintegration'
            ]
          },
          hydraulics: {
            title: 'Hydraulik & Elektronik',
            description: 'Integration von Hydraulik und Elektronik für Präzision.',
            capabilities: [
              'Automatisierung',
              'Hydraulikkreise',
              'Überwachungssysteme',
              'Fernsteuerung'
            ]
          },
          containers: {
            title: 'Sondercontainer',
            description: 'Fertigung von Spezialcontainern und Druckbehältern.',
            capabilities: [
              'Druckbehälter',
              'Isoliertanks',
              'Spezialgeometrien',
              'Materiallagerung'
            ]
          }
        }
      },
      production: {
        title: 'Produktionsbasis',
        subtitle: 'Fortschrittliche Ausrüstung für komplexe Projekte.',
        items: {
          manufacturing: { title: 'Fertigungshalle', desc: '15.000m²' },
          cnc: { title: 'CNC-Bearbeitung', desc: '±0,01mm Präzision' },
          welding: { title: 'Schweißen', desc: 'MIG, TIG, Roboter' },
          assembly: { title: 'Montage & Test', desc: 'Qualitätskontrolle' },
        }
      },
      cta: {
        title: 'Bereit für Ihr Projekt?',
        description: 'Kontaktieren Sie uns für eine Beratung.',
        button: 'Beratung Anfordern',
      },
    },
    home: {
      build: {
        explore: 'Erkunden',
      },
      process: {
        explore: 'Prozess Erkunden',
      },
      categories: {
        dumpTrucks: 'Muldenkipper',
        truckCranes: 'Autokräne',
        overheadCranes: 'Brückenkräne',
        specialMachinery: 'Spezialmaschinen',
        tankers: 'Tankwagen',
        agricultural: 'Landmaschinen',
        machining: 'Schwerzerspanung',
        construction: 'Bauwesen',
        miningTrucks: 'Bergbau-LKWs',
        metalStructures: 'Metallkonstruktionen',
      },
      since: 'Seit 1945',
      title: 'Ingenieur\nStärke',
      subtitle: 'Die treibende Kraft des Fortschritts. Komplettfertigung von Nutzfahrzeugen, Kränen und Landmaschinen für die härtesten Bedingungen.',
      exploreCatalog: 'Katalog Erkunden',
      contactUs: 'Kontaktieren Sie Uns',
      inquiryForm: 'Anfrageformular',
    },
    stats: {
      equipment: 'Gerätetypen',
      projects: 'Abgeschlossene Projekte',
      employees: 'Mitarbeiter',
      experience: 'Jahre Erfahrung',
    },
    intro: {
      welcomeTitle: 'Willkommen bei der KRANTAS Group',
      welcomeDesc: 'Ein Erbe technischer Exzellenz seit 1945. Wir entwickeln und fertigen Hochleistungs-Nutzfahrzeuge, Krane und Spezialausrüstung für anspruchsvollste Einsatzbedingungen.',
      fleetRecovery: 'Umfassende Flottenwiederherstellung',
      fleetRecoveryDesc: 'Spezialisierung auf die komplexe Wiederherstellung von Lkw und schweren Kränen. Unsere Einrichtung bewältigt alles – von komplexem Fräsen und Schleifen bis hin zu umfassenden Schlosserarbeiten.',
      fabrication: 'Fortschrittliche Fertigungsstandards',
      fabricationDesc: 'Wir nutzen moderne Technologien – einschließlich Plasmaschneiden und CNC-Bearbeitung – um strukturelle Integrität zu liefern, die die Industriestandards übertrifft.',
      advisory: 'Strategische Geräteberatung',
      advisoryDesc: 'Minimieren Sie Ausfallzeiten mit der richtigen Hardware. Unsere Spezialisten bieten fundierte technische Unterstützung, um sicherzustellen, dass Ihre Ausrüstung perfekt zu Ihren Betriebsanforderungen passt.',
    },
    aboutHome: {
      title: 'Über Uns',
      heading: 'Von der Reparaturwerkstatt zum Branchenführer',
      description: 'Unsere Fabrik wurde 1945 als mechanische Reparaturwerkstatt gegründet. Nach dem Erdbeben von 1966 stiegen wir in den Stahlbau und Hebezeugbau ein. Heute ist KRANTAS Group ein Komplettanbieter mit moderner CNC-Bearbeitung, Schweißen, Plasma-/Laserschneiden und Montage.',
      points: ['Komplettfertigung im Haus', 'Export nach Zentralasien und darüber hinaus', 'Internationale Zertifizierungen'],
      learnMore: 'Erfahren Sie Mehr Über Uns',
    },
    mission: {
      title: 'Unsere Mission',
      heading: 'Lokalisierung, die die Industrie Stärkt',
      description: 'Wir bauen die industrielle Unabhängigkeit Usbekistans auf, indem wir ein Netzwerk schaffen, in dem nationale Unternehmen gemeinsam führen. Es geht um mehr als Geschäft – es geht darum, lokale Alternativen zu liefern, die Importe übertreffen, und endlich die Abhängigkeit von ausländischen Quellen zu beenden. Wir liefern nicht nur Teile; wir arbeiten mit Ihnen zusammen, um Ihre gesamte Operation schlanker und profitabler zu machen.',
      qualityFirst: 'Qualität Zuerst',
      qualityFirstDesc: 'Internationale Standards sind unsere Grundlinie, keine Nachgedanke. Wir haben eine Kultur aufgebaut, in der Präzision der einzige Instinkt ist, denn in dieser Branche gibt es keinen Raum für "gut genug".',
      localProduction: 'Lokale Produktion',
      localProductionDesc: 'Wir sind der Motor hinter dem Siegel "Hergestellt in Usbekistan". Indem wir die Produktion hier halten, bieten wir ein Maß an Zuverlässigkeit und schneller Reaktion, das ausländische Wettbewerber einfach nicht erreichen können.',
      globalStandards: 'Globale Standards',
      globalStandardsDesc: 'Wir schließen die Lücke zwischen lokalem Handwerk und hochwertiger Ingenieurskunst. Sie erhalten die Nähe eines lokalen Partners gepaart mit der technischen Kraft eines fortschrittlichen Herstellers.',
    },
    equipment: {
      title: 'Ausrüstungslösungen',
      heading: 'Was Wir Bauen',
      viewAll: 'Alle Kategorien Anzeigen',
      customSolutions: 'Maßgeschneiderte Lösungen',
      customDesc: 'Unsere Expertise. Maßgeschneiderte Ingenieurlösungen für Ihre einzigartigen Anforderungen.',
    },
    products: {
      title: 'Ausgewählte Produkte',
      heading: 'Für Reale Bedingungen Gebaut',
      viewAll: 'Alle Produkte Anzeigen',
      specs: 'Spezifikationen',
      features: 'Merkmale',
      inquiry: 'Anfrage Senden',
    },
    production: {
      title: 'Produktion',
      heading: 'Komplettfertigung',
      description: 'Konstruktion → Werkzeuge → Stahlkonstruktionen → Montage → Prüfung → Zertifizierung. Alles im Haus mit moderner CNC-Bearbeitung, Plasma-/Laserschneiden und automatisierter Schweißtechnik.',
      modeling: '3D-Modellierung & Engineering',
      modelingDesc: 'Vollständige Konstruktion und Detaillierung mit fortschrittlicher CAD-Software für präzise Fertigung.',
      cnc: 'CNC-Bearbeitung',
      cncDesc: 'Hochpräzise Bearbeitung von Komponenten mit Toleranzen bis zu ±0,01 mm.',
      cutting: 'Plasma- & Laserschneiden',
      cuttingDesc: 'Fortschrittliche Schneidetechnologien für komplexe Formen und saubere Kanten.',
      welding: 'Schweißen & Fertigung',
      weldingDesc: 'Zertifizierte Schweißverfahren einschließlich MIG, TIG und robotergestütztes Schweißen.',
      surface: 'Oberflächenbehandlung',
      surfaceDesc: 'Strahlen, Grundieren und Lackieren zum Korrosionsschutz.',
      assembly: 'Montage & Prüfung',
      assemblyDesc: 'Komplette Montage mit strenger Qualitätskontrolle und Testprotokollen.',
    },
    cta: {
      title: 'Bereit, Ihr Projekt zu Besprechen?',
      description: 'Lassen Sie uns über Ihre Anforderungen sprechen und gemeinsam die perfekte Lösung finden.',
      button: 'Kontakt Aufnehmen',
    },
    footer: {
      description: 'Ingenieurstärke seit 1945. Komplettfertigung von Nutzfahrzeugen und Ausrüstung.',
      navigation: 'Navigation',
      products: 'Produkte',
      contact: 'Kontakt',
      rights: 'Alle Rechte vorbehalten.',
      privacy: 'Datenschutzerklärung',
      terms: 'Nutzungsbedingungen',
      viewAll: 'Alle Anzeigen →',
    },
    productsPage: {
      title: 'Unsere Produkte und Lösungen',
      heroIntro: 'Das gesamte Spektrum technischer Exzellenz. Entdecken Sie unsere maßgeschneiderten Industriefahrzeuge und unseren Katalog bewährter Maschinen.',
      heading: 'Ingenieurskunst',
      description: 'Die KRANTAS Group bietet ein umfassendes Portfolio an Industrielösungen. Ob Sie ein maßgeschneidertes Fahrzeug nach Ihren genauen Spezifikationen oder ein bewährtes Katalogmodell benötigen, wir liefern die Zuverlässigkeit, die Ihr Betrieb verlangt.',
      customTitle: 'Maßgeschneiderte Ingenieurlösungen',
      customDesc: 'Bei KRANTAS verstehen wir, dass jeder Betrieb einzigartige Anforderungen hat. Unsere Abteilung für Sonderkonstruktionen ist darauf spezialisiert, spezielle Industriefahrzeuge und Ausrüstungen genau nach Ihren Vorgaben zu entwickeln und herzustellen.',
      customPoints: {
        1: 'Umfassende Designberatung und technische Unterstützung',
        2: 'Prototyping und Tests',
        3: 'Spezialisierte Modifikationen und Integrationen',
      },
      customLink: 'Mehr über Individuelle Lösungen',
      catalogTitle: 'Standard-Produktkatalog',
      catalogDesc: 'Unser Katalog umfasst eine breite Palette bewährter Industriefahrzeuge. Jedes Modell ist auf Zuverlässigkeit ausgelegt, aus hochwertigen Materialien gebaut und stützt sich auf jahrzehntelange Fertigungserfahrung.',
      catalogPoints: {
        1: 'Einsatzbereite Standardkonfigurationen',
        2: 'Breites Spektrum an Kategorien und Anwendungen',
        3: 'Wettbewerbsfähige Preise und schnelle Lieferung',
      },
      catalogLink: 'Vollständigen Katalog Ansehen',
    },
    catalog: {
      title: 'Produktkatalog',
      subtitle: 'Von schweren Lkw bis hin zu präzisen Hebesystemen – entwickelt für reale Betriebsbedingungen.',
      heroIntro: 'Entdecken Sie unser umfassendes Sortiment an Industriefahrzeugen und Ausrüstungen. Jedes Modell ist auf Zuverlässigkeit ausgelegt und entspricht internationalen Standards.',
      categories: 'Kategorien',
      showAll: 'Alle Produkte Anzeigen',
      welcomeTitle: 'Produktkatalog',
      customSolution: 'Benötigen Sie eine Maßgeschneiderte Lösung?',
      customDesc: 'Wir entwickeln und fertigen kundenspezifische Ausrüstung, die auf Ihre spezifischen Anforderungen zugeschnitten ist.',
      backToCatalog: 'Zurück zum Katalog',
      filter: 'Nach Kategorie Filtern',
      noProducts: 'Keine Produkte gefunden',
    },
    services: {
      title: 'Unsere Dienstleistungen',
      heading: 'Umfassende Unterstützung',
      welcomeTitle: 'Unsere Dienstleistungen',
      heroIntro: 'Umfassende Unterstützung für Ihren Fuhrpark. Von fachmännischer Wartung und Originalteilen bis hin zu kundenspezifischem Engineering und technischem Support.',
      introHeadline: 'Für die Ewigkeit gebaut. \nEin Leben lang unterstützt.',
      introP1: 'Wir wissen, dass es in Ihrer Welt keinen Platz für Entschuldigungen gibt. Deshalb haben wir eine Support-Struktur aufgebaut, die so robust ist wie unsere Maschinen.',
      introP2: 'Wenn Sie sich für Krantas entscheiden, kaufen Sie nicht nur ein Industriegut; Sie gewinnen ein engagiertes Team, das hinter jedem Kilometer und jedem Hub steht.',
      stats: {
        centers: 'Servicezentren',
        parts: 'Ersatzteile auf Lager',
      },
      subtitle: 'Von der Fertigung bis zum After-Sales-Support bieten wir End-to-End-Dienstleistungen, um sicherzustellen, dass Ihre Ausrüstung optimal funktioniert.',
      supportCenter: 'Support-Hotline',
      supportDesc: 'Unsere hochqualifizierten Spezialisten helfen Ihnen bei der Auswahl der richtigen Ausrüstung und beantworten alle technischen Fragen.',
      facilities: 'Unsere Einrichtungen',
      items: {
        afterSales: {
          title: 'Kundendienst & Support',
          shortTitle: 'Kundendienst',
          description: 'Technische Wartung, Garantie, Ersatzteile und engagierte Unterstützung während des gesamten Produktlebenszyklus. Unsere Servicezentren sind mit fortschrittlichen Diagnosewerkzeugen ausgestattet, um sicherzustellen, dass Ihre Flotte auch unter schwierigsten Bedingungen einsatzbereit bleibt. Wir stellen schnelle Eingreiftruppen für Reparaturen vor Ort bereit und führen einen vollständigen Bestand an Originalkomponenten, um Ausfallzeiten zu minimieren.',
          stages: {
            maintenance: { name: 'Wartung', desc: 'Regelmäßiger Service' },
            repairs: { name: 'Reparaturen', desc: 'Schnelle Lösungen' },
            parts: { name: 'Ersatzteile', desc: 'Originalteile' },
            support: { name: 'Support', desc: '24/7 Technische Hilfe' }
          }
        },
        quality: {
          title: 'Qualitätskontrolle & Zertifizierung',
          shortTitle: 'Qualität',
          description: 'Qualitätssicherung in jeder Produktionsphase und Einhaltung der obligatorischen Zertifizierungsanforderungen. Jedes Fahrzeug wird einer strengen Mehrpunktkontrolle unterzogen, einschließlich Belastungstests der Strukturen und Überprüfung der Hydrauliksysteme nach internationalen Sicherheitsstandards. Unsere Labore führen Materialanalysen und Präzisionsprüfungen durch, um die Langlebigkeit und Zuverlässigkeit jeder Einheit unter dem Markennamen Krantas zu garantieren.',
          stages: {
            inspection: { name: 'Inspektion', desc: 'Strenge Kontrollen' },
            testing: { name: 'Prüfung', desc: 'Leistungsvalidierung' },
            certification: { name: 'Zertifizierung', desc: 'Internationale Standards' },
            documentation: { name: 'Dokumentation', desc: 'Vollständige Unterlagen' }
          }
        },
        localization: {
          title: 'Lokalisierung & Integration',
          shortTitle: 'Lokalisierung',
          description: 'Unterstützung von industriellen Lokalisierungsprojekten und Technologietransfer für regionale Märkte. Wir schließen die Lücke zwischen globaler technischer Exzellenz und lokalen Fertigungsmöglichkeiten und helfen Partnern beim Aufbau robuster Produktionslinien in der Region. Unser Team bietet umfassende Beratung zur Optimierung der Lieferkette und zur Anpassung der technischen Dokumentation für eine nahtlose Integration in lokale industrielle Ökosysteme.',
          stages: {
            analysis: { name: 'Analyse', desc: 'Marktanforderungen' },
            adaptation: { name: 'Anpassung', desc: 'Produktlokalisierung' },
            integration: { name: 'Integration', desc: 'Systemkompatibilität' },
            training: { name: 'Schulung', desc: 'Wissenstransfer' }
          }
        },
        manufacturing: {
          title: 'Fertigung & Montage',
          shortTitle: 'Fertigung',
          description: 'Serien- und Projektfertigung, die eine Full-Cycle-Plattform über alle wichtigen Phasen hinweg bietet. Von der Rohmaterialverarbeitung bis zur Endmontage nutzt unser 15.000 m² großes Werk hochpräzise CNC-Bearbeitung und automatisiertes Schweißen, um eine konsistente strukturelle Integrität zu gewährleisten. Wir führen den gesamten Produktionsprozess intern durch und stellen sicher, dass jedes Projekt – ob Standardeinheit oder komplexer Industriekomplex – genau nach Spezifikation gebaut wird.',
          stages: {
            design: { name: 'Design', desc: '3D-Engineering' },
            fabrication: { name: 'Herstellung', desc: 'Schneiden & Formen' },
            assembly: { name: 'Montage', desc: 'Komponentenintegration' },
            testing: { name: 'Prüfung', desc: 'Qualitätsvalidierung' }
          }
        },
        engineering: {
          title: 'Engineering & Anpassung',
          shortTitle: 'Engineering',
          description: 'Maßgeschneiderte technische Lösungen und Produktanpassungen an spezifische betriebliche Anforderungen. Unser Designbüro nutzt fortschrittliche 3D-Modellierung und strukturelle Simulation, um Maschinen zu entwickeln, die einzigartige Herausforderungen vor Ort lösen. Wir sind darauf spezialisiert, komplexe technische Anforderungen in leistungsstarke Industrieanlagen umzusetzen und bieten vollständige strukturelle und mechanische Anpassungen für spezialisierte Branchen.',
          stages: {
            consulting: { name: 'Beratung', desc: 'Technische Expertise' },
            design: { name: 'Entwicklung', desc: 'Sonderlösungen' },
            prototyping: { name: 'Prototyping', desc: 'Konzeptnachweis' },
            implementation: { name: 'Implementierung', desc: 'Vollständige Umsetzung' }
          }
        }
      },
      facilitiesList: {
        warehouse: {
          title: 'Lager',
          description: 'Moderne Lagereinrichtungen mit organisiertem Bestandsmanagement. Unser Lager umfasst über 5.000 m² mit Klimatisierung.'
        },
        serviceStation: {
          title: 'Servicestation',
          description: 'Voll ausgestattete Servicebuchten für Wartung und Reparatur. Modernste Diagnosegeräte und zertifizierte Techniker.'
        },
        spareParts: {
          title: 'Ersatzteilzentrum',
          description: 'Umfassender Bestand an Originalersatzteilen mit schnellen Lieferoptionen. Über 10.000 Artikel auf Lager.'
        }
      },
      inquiryForm: 'Anfrageformular'
    },
    about: {
      title: 'Über Uns',
      heroTitle: 'Das Erbe von Krantas',
      heroIntro: 'Ingenieurkraft seit 1945. Unser Erbe basiert auf der Komplettfertigung von Industriemaschinen für härteste Einsatzbedingungen.',
      heading: 'Ingenieurstärke Seit 1945',
      welcomeTitle: 'Über das Unternehmen',
      subtitle: 'Von einer mechanischen Reparaturwerkstatt zu einer Komplettfertigungsgruppe, die Zentralasien und darüber hinaus bedient.',
      story: 'Unsere Geschichte',
      storyP1: 'Unsere Fabrik wurde 1945 als mechanische Reparaturwerkstatt für Lkw und schwere Maschinen gegründet. In den frühen Jahren waren wir darauf spezialisiert, die Fahrzeuge der Region am Laufen zu halten und bauten uns einen Ruf für qualitativ hochwertige Arbeit auf.',
      storyP2: 'Nach dem verheerenden Erdbeben von 1966 wurde die Fabrik umfunktioniert und begann mit der Produktion von Stahlkonstruktionen und Hebezeugen für den zivilen und industriellen Bau.',
      storyP3: 'Nach der Unabhängigkeit Usbekistans und der anschließenden Privatisierung begann eine neue Phase. Wir investierten in moderne Technologie, erweiterten unser Produktangebot und begannen, internationale Märkte zu bedienen.',
      storyP4: 'Heute ist KRANTAS Group ein Komplettanbieter mit modernen CNC-Bearbeitungs-, Schweiß-, Plasma-/Laserschneid- und Montagefähigkeiten.',
      family: 'KRANTAS Familie',
      familyDesc: 'Generationen von Hingabe. Jahrzehnte der Expertise. Die Menschen, die KRANTAS zu mehr als einem Unternehmen machen.',
      familyQuote: '"Ich arbeite seit über 30 Jahren bei KRANTAS. Ich habe gesehen, wie dieses Unternehmen von einer kleinen Reparaturwerkstatt zu einem großen Hersteller gewachsen ist. Der Stolz, den ich empfinde, wenn ich unsere Ausrüstung im ganzen Land arbeiten sehe, ist unermesslich."',
      familyQuoteAuthor: '— Rustam Khasanov, Chefingenieur',
      joinFamily: 'Werden Sie Teil Unserer Familie',
      history: 'Geschichte & Meilensteine',
      production: 'Produktionsstufen',
      manufacturing: 'Komplettfertigung',
      manufacturingDesc: 'Das Werk verfügt über ein eigenes Konstruktionsbüro für die unabhängige Entwicklung von Projekten und Arbeitszeichnungen neuer Sonderfahrzeugtypen entsprechend den neuesten globalen Trends in der Branchenentwicklung.',
      manufacturingFeatures: ['3D-Modellierung & Detaillierung', 'Werkzeugentwicklung', 'Stahlkonstruktionen', 'Montage & Prüfung', 'Qualitätskontrolle', 'Zertifizierung'],
      chairman: 'Vorsitzendenbotschaft',
      chairmanQuote: '"KRANTAS Group ist auf starken Ingenieurtraditionen, lokaler Fertigung und einer klaren Vision für die Zukunft aufgebaut. KRANTAS ist nicht nur ein Fahrzeug – es ist eine zuverlässige Ingenieurlösung."',
      chairmanName: 'Karimov Mukhtor Akbarovich',
      chairmanTitle: 'Vorsitzender, KRANTAS Group',
      team: 'Unser Team',
      teamSubtitle: 'Führung, die Baut',
      certificates: 'Qualitätsstandards',
      historyEvents: {
        1945: { title: 'Gründung', description: 'Gegründet als mechanische Reparaturwerkstatt für Lkw und schwere Maschinen in Taschkent.' },
        1963: { title: 'Expansion', description: 'Beginn der Produktion von Stahlkonstruktionen und Hebezeugen für das Bauwesen.' },
        1990: { title: 'Diversifizierung', description: 'Expansion in die Herstellung von Spezialfahrzeugen und Autokränen.' },
        2000: { title: 'Modernisierung', description: 'Einführung von CNC-Bearbeitung und automatisierten Schweißsystemen.' },
        2012: { title: 'Markeneinführung', description: 'Einführung der Autokran-Marke KRANTAS mit vollständiger Zertifizierung.' },
        2015: { title: 'Internationales Wachstum', description: 'Eintritt in die Märkte Kasachstan und Turkmenistan mit Exportzertifizierung.' },
        2020: { title: 'Neue Anlagen', description: 'Eröffnung neuer Montagelinien und Erweiterung der Landmaschinenproduktion.' },
        2024: { title: 'Zukunftsorientiert', description: 'Entwicklung der nächsten Generation zuverlässiger Industriefahrzeuge.' },
      },
      teamMemberStories: {
        sergey: {
          name: 'Petrov Sergey',
          role: 'Stellvertretender Direktor',
          years: '50+ Jahre bei KRANTAS',
          text: 'Voni einem jungen Spezialisten im Jahr 1972 bis zur Leitung des Betriebs als stellvertretender Direktor heute. Zeuge der Transformation von KRANTAS vom Versuchswerk zum modernen Hersteller unter Bewahrung der Grundwerte.'
        },
        komil: {
          name: 'Komil Khaitmatov',
          role: 'Montagetechniker',
          years: '45 Jahre bei KRANTAS',
          text: 'Begann 1980 als Fahrer, entwickelte sich zum Meister der Kranmontage. Von KamAZ-Lkw bis zu 60-Tonnen-Kränen – er war Teil jeder Transformation.'
        },
        elvira: {
          name: 'Elvira',
          role: 'Kranführerin',
          years: 'Dritte Generation · 10+ Jahre',
          text: 'Eltern, Großeltern und Brüder arbeiteten alle bei KRANTAS. Vater: 40 Jahre als Lackierer. Mutter: 37 Jahre als Kranführerin. Ein Vermächtnis der Hingabe.'
        }
      },
      certificatesList: {
        1: { name: 'Zertifikat', desc: 'OOO "KRANTAS"', org: 'Direktion der Internationalen Industriemesse und Kooperationsbörse' },
        2: { name: 'Zertifikat', desc: 'OOO "Kran- und Spezialfahrzeuge"', org: 'Direktion der Internationalen Industriemesse und Kooperationsbörse' },
        3: { name: 'Zertifikat', desc: 'OOO "TTEMZ"', org: 'Direktion der Internationalen Industriemesse und Kooperationsbörse' },
        4: { name: 'Leistungspreis', desc: 'Global Specific Performance Award 2022', org: 'FOTON' },
        5: { name: 'Diplom', desc: 'Turkmen Construction 2015', org: 'Industrie- und Handelskammer' },
        6: { name: 'Zertifikat', desc: '17. Internationale Bauausstellung Kasachstan', org: 'Astana Build' },
      },
      partners: 'Unsere Partner',
      partnersDesc: 'Wir arbeiten mit führenden globalen Herstellern zusammen, um höchste Qualität von Komponenten und Technologie in unseren Produkten zu gewährleisten.',
      geography: 'Geografie der Lieferungen',
      geographyDesc: 'KRANTAS Group liefert Ausrüstung in ganz Zentralasien und darüber hinaus. Unsere Produkte arbeiten in verschiedenen Umgebungen – von den Bergen Kirgistans bis zu den Wüsten Turkmenistans.',
      distributors: {
        title: 'Unsere Distributoren',
        description: 'Die KRANTAS Group arbeitet mit führenden Distributoren in ganz Zentralasien und darüber hinaus zusammen. Unser Netzwerk stellt sicher, dass Sie überall dort, wo Sie tätig sind, Zugang zu hochwertiger Industrieausrüstung haben, die von lokalem Fachwissen und Support unterstützt wird.',
        mapLegend: 'Detaillierte Abdeckung in 6 Ländern und über 15 Städten',
        centersTitle: 'Regionale Vertriebszentren',
        regionalBranch: 'Regionale Niederlassung',
        regionalCenter: 'Regionales Zentrum',
        mountainSpecialist: 'Gebirgsspezialist',
        emergingMarkets: 'Wachstumsmärkte',
        countries: {
          azerbaijan: 'Aserbaidschan',
          kazakhstan: 'Kasachstan',
          kyrgyzstan: 'Kirgisistan',
          tajikTurkmen: 'Tadschikistan & Turkmenistan'
        }
      },
      teamRoles: {
        director: 'Direktor',
        deputyDirector: 'Stellvertretender Direktor',
        deputyDirectorProduction: 'Stellvertretender Produktionsleiter',
        assemblyTechnician: 'Montagetechniker',
        craneOperator: 'Kranführerin'
      }
    },
    blog: {
      title: 'Nachrichten',
      subtitle: 'Neueste Nachrichten, Updates und Einblicke aus der Fabrik.',
      heroIntro: 'Aktuelle Nachrichten und strategische Entwicklungen der KRANTAS Group. Bleiben Sie über neue Partnerschaften und Produktionsmeilensteine informiert.',
      latest: 'Neueste Artikel',
      stayUpdated: 'Bleiben Sie Informiert',
      newsletter: 'Abonnieren Sie unseren Newsletter, um die neuesten Nachrichten und Brancheneinblicke zu erhalten.',
      subscribe: 'Abonnieren',
      explore: 'Newsroom erkunden',
      newsTeam: 'Nachrichten-Team',
      readOriginal: 'Originalnachrichten lesen',
      posts: {
        1: {
          title: 'Präsidentenbesuch im Krantas Group Werk',
          excerpt: 'Präsident Shavkat Mirziyoyev besuchte unsere Produktionsanlagen und betonte die Bedeutung der industriellen Lokalisierung und der Erweiterung unseres Spezialgerätesortiments auf über 60 Typen.'
        },
        2: {
          title: 'Erweiterung der Produktion von Militär- und Spezialfahrzeugen',
          excerpt: 'Die Krantas Group kündigt Pläne für ein 55-Millionen-Dollar-Projekt in Nurafshan an, um leichte gepanzerte Fahrzeuge und Spezial-Lkw auf einem neuen, 12 Hektar großen Industriegelände herzustellen.'
        },
        3: {
          title: 'Globales Debüt: Tarlon und Qalqon auf der IDEX-2023',
          excerpt: 'Mit Stolz haben wir unsere neuesten leichten gepanzerten Fahrzeuge Tarlon und Qalqon auf der internationalen Verteidigungsmesse in den VAE präsentiert und damit usbekische Ingenieurskunst auf Weltniveau gezeigt.'
        },
        4: {
          title: 'Strategische Partnerschaft mit MAZ und MTZ',
          excerpt: 'Die Krantas Group stärkt ihre internationalen Beziehungen durch Gespräche mit belarussischen Partnern über die Montage von Traktoren und Industriemaschinen in Usbekistan.'
        },
        5: {
          title: 'Steigerung der Bergbaueffizienz bei AGMK',
          excerpt: 'Unsere Hochleistungskipper wurden an den Bergbau- und Metallurgiekombinat Almalyk übergeben und unterstützen die Modernisierung der Bergbaukapazitäten Usbekistans.'
        },
        6: {
          title: 'Arslon: Der erste einheimische Schützenpanzer Usbekistans',
          excerpt: 'Unser neuer, nach internationalen Standards entwickelter Schützenpanzer „Arslon“ hat die staatliche Erprobung aufgenommen – ein Meilenstein für die heimische Verteidigungsindustrie.'
        },
        7: {
          title: 'Bedeutendes Renovierungs- und Infrastrukturprojekt',
          excerpt: 'Für unseren aktuellen Standort Mirzo-Ulugbek wurde ein 333 Millionen Dollar schweres Stadtentwicklungsprojekt vorgeschlagen, das den Weg für moderne Wohn- und Sozialinfrastruktur ebnet.'
        }
      },
      featured: {
        lorem1: 'Detaillierte Einblicke in unsere neuesten technischen Durchbrüche und Testverfahren.',
        lorem2: 'Wir verschieben weiterhin die Grenzen des Möglichen im Schwermaschinenbau.'
      }
    },
    careers: {
      title: 'Karriere bei KRANTAS',
      welcomeTitle: 'Werden Sie Teil unseres Teams',
      heroIntro: 'Bauen Sie mit KRANTAS die nächste Generation der Industrietechnik. Wir suchen engagierte Fachkräfte für unsere Engineering- und Produktionsteams.',
      subtitle: 'Bauen Sie die nächste Generation von Nutzfahrzeugen. Schließen Sie sich einem Team an, das Präzision, Sicherheit und Wachstum schätzt.',
      whyWork: 'Warum Mit Uns Arbeiten?',
      team: 'Ehrenwerte Teammitglieder',
      openPositions: 'Offene Stellen',
      apply: 'Bewerben',
      applyNow: 'Jetzt Bewerben',
      fullName: 'Vollständiger Name',
      email: 'E-Mail',
      phone: 'Telefon',
      message: 'Nachricht',
      submit: 'Bewerbung Einreichen',
      cancel: 'Abbrechen',
      joinTeam: 'Werden Sie Teil eines Teams, in dem technische Exzellenz auf Tradition trifft.',
      experienceLabel: 'Erfahrung:',
      ageLabel: 'Alter:',
      requirementsLabel: 'Anforderungen:',
      fullTime: 'Vollzeit',
      applyPopupTitle: 'Auf Stelle Bewerben',
      namePlaceholder: 'Ihr vollständiger Name',
      emailPlaceholder: 'ihre@email.com',
      phonePlaceholder: '+998 XX XXX XX XX',
      agePlaceholder: 'Jahre',
      experiencePlaceholder: 'Jahre',
      messagePlaceholder: 'Erzählen Sie uns über sich...',
      positions: {
        1: {
          title: 'Maschinenbauingenieur',
          department: 'Ingenieurwesen',
          location: 'Taschkent',
          experience: '3-5 Jahre',
          age: '25-45',
          description: 'Konstruktion mechanischer Systeme für Industriefahrzeuge. Arbeit mit CAD-Software.',
          requirements: ['Bachelor-Abschluss', 'CAD-Erfahrung', 'Kenntnisse in Fertigungsprozessen', 'Problemlösungsfähigkeiten']
        },
        2: {
          title: 'Schweißer',
          department: 'Produktion',
          location: 'Taschkent',
          experience: '2+ Jahre',
          age: '20-50',
          description: 'Schweißarbeiten an Stahlkonstruktionen. Einhaltung von Qualitäts- und Sicherheitsstandards.',
          requirements: ['Zertifizierung', 'MIG/TIG-Erfahrung', 'Sicherheitskenntnisse', 'Zeichnungslesen']
        },
        3: {
          title: 'CNC-Bediener',
          department: 'Produktion',
          location: 'Taschkent',
          experience: '2-4 Jahre',
          age: '22-45',
          description: 'Bedienung von CNC-Maschinen zur Präzisionsbearbeitung. Programmierung und Wartung der Ausrüstung.',
          requirements: ['Technische Ausbildung', 'CNC-Programmierung', 'G-Code-Kenntnisse', 'Detailgenauigkeit']
        },
        4: {
          title: 'Vertriebsmanager',
          department: 'Vertrieb',
          location: 'Taschkent',
          experience: '3+ Jahre',
          age: '25-40',
          description: 'Entwicklung von Kundenbeziehungen. Identifizierung neuer Geschäftsmöglichkeiten.',
          requirements: ['Bachelor-Abschluss', 'B2B-Vertriebserfahrung', 'Kommunikationsfähigkeiten', 'Marktkenntnisse']
        }
      },
      teamMembers: {
        sergey: {
          name: 'Sergey Konstantinovich Petrov',
          role: 'Stellvertretender Produktionsleiter',
          story: 'Über 50 Jahre bei KRANTAS. Leitete die Transformation des Unternehmens.'
        },
        komil: {
          name: 'Komil Khaitmatov',
          role: 'Montagetechniker',
          story: '45 Jahre bei KRANTAS. Meister der Kranmontage.'
        },
        elvira: {
          name: 'Elvira',
          role: 'Kranführerin',
          story: 'Dritte Generation bei KRANTAS. Bedient Brückenkrane mit Präzision.'
        }
      }
    },
    contacts: {
      title: 'Kontaktieren Sie Uns',
      welcomeTitle: 'Wir sind für Sie da',
      heroIntro: 'Unser Team steht Ihnen bei technischen oder kommerziellen Anfragen zur Verfügung. Kontaktieren Sie unseren Hauptsitz in Taschkent für professionelle Unterstützung.',
      subtitle: 'Fragen Sie nach Produkten, Dienstleistungen oder Partnerschaften. Wir antworten innerhalb von 1–2 Werktagen.',
      info: 'Kontaktinformationen',
      form: 'Nachricht Senden',
      departments: 'Unsere Abteilungen',
      address: 'Bezirk Mirzo-Ulugbek, Ziyolilar Straße 1, Taschkent, Usbekistan',
      phone: '+998 71 123 45 67',
      email: 'info@krantas.uz',
      sales: 'Vertriebsabteilung',
      support: 'Technischer Support',
      parts: 'Ersatzteile',
      service: 'Servicezentrum',
      hr: 'Personalabteilung',
      export: 'Exportabteilung',
      name: 'Ihr Name',
      emailLabel: 'Ihre E-Mail',
      messageLabel: 'Ihre Nachricht',
      send: 'Nachricht Senden',
      heroTitle: 'Kontaktieren Sie uns',
      teamReady: 'Unser Team steht bereit, um Sie bei Anfragen zu unseren Produkten oder Dienstleistungen zu unterstützen.',
      headquarters: {
        title: 'KRANTAS Group Hauptsitz',
        description: 'Das Büro liegt ca. 30 Autominuten vom internationalen Flughafen Taschkent entfernt.',
        officeLabel: 'Unser Büro',
        postalCodeLabel: 'Postleitzahl',
        contactInfoLabel: 'Kontaktinformationen'
      },
      formTitle: 'Kontaktformular',
      inquiryForm: 'Anfrageformular',
      companyLabel: 'Unternehmen',
      organizationPlaceholder: 'Ihre Organisation',
      areaOfInterestLabel: 'Interessenbereich',
      selectAreaPlaceholder: 'Wählen Sie einen Bereich',
      phoneLabel: 'Telefonnummer',
      emailPlaceholder: 'ihre@email.com',
      successMessage: 'Nachricht gesendet! Wir werden uns innerhalb von 1-2 Werktagen mit Ihnen in Verbindung setzen.',
      subjectOptions: {
        lifting: 'Hebezeuge',
        dump: 'Kipper',
        special: 'Spezialmaschinen',
        metal: 'Metallkonstruktionen',
        agricultural: 'Landmaschinen',
        tanks: 'Tankwagen',
        mining: 'Bergbaulastwagen',
        cranes: 'Brücken- und Portalkräne',
        custom: 'Maßgeschneiderte Lösungen',
        service: 'Ersatzteile & Service',
        careers: 'Karriere / Beschäftigung',
        other: 'Andere Anfrage'
      }
    },
    equipmentSolutions: {
      title: 'Kundenspezifische Entwicklung',
      heading: 'Individuelle Sonderlösungen',
      welcomeTitle: 'Maßgeschneiderte Lösungen',
      subtitle: 'Verwandeln Sie Ihre Vision mit unseren maßgeschneiderten Engineering-Fähigkeiten in die Realität. Von der Konzeption bis zur Produktion liefern wir maßgeschneiderte Lösungen, die Ihren einzigartigen Anforderungen entsprechen.',
      howItWorks: 'Wie Es Funktioniert',
      howItWorksTitle: 'Sie Können Jede Idee Haben',
      howItWorksDesc1: 'Unser Ingenieurteam arbeitet eng mit Ihnen zusammen, um Ihre betrieblichen Herausforderungen zu verstehen und innovative Lösungen zu entwickeln. Ob Sie eine modifizierte Chassis, eine spezialisierte Geräteintegration oder völlig einzigartige Maschinerie benötigen – wir haben die Expertise, um dies zu liefern.',
      howItWorksDesc2: 'Von der ersten Beratung über Konstruktion, Prototyping bis hin zur Endfertigung pflegen wir offene Kommunikation, um sicherzustellen, dass das Endprodukt Ihre Erwartungen übertrifft.',
      capabilities: 'Produktionsbasis',
      capabilitiesTitle: 'Unsere Fähigkeiten und Produktionsbasis',
      types: 'Dienstleistungen',
      typesTitle: 'Arten der Anpassung',
      chassis: 'Chassis-Modifikation',
      chassisDesc: 'Vollständige Chassis-Modifikationen einschließlich Radstandsjustierung, Antriebsstrang-Upgrades und strukturelle Verstärkungen für spezialisierte Anwendungen.',
      complexes: 'Spezialisierte Transporttechnik',
      complexesDesc: 'Entwicklung und Fertigung von Hochleitungs-Transportkomplexen für extreme betriebliche Anforderungen. Wir liefern maßgeschneiderte Mehrachskonfigurationen und automatisierte Beladesysteme, die auf Langlebigkeit und Präzision ausgelegt sind.',
      hydraulics: 'Hydraulik und Elektronik',
      hydraulicsDesc: 'Fortschrittliche Hydrauliksystem-Integration und elektronische Steuerungssysteme für präzisen Betrieb und Automatisierungsfähigkeiten.',
      containers: 'Nicht-Standard-Container',
      containersDesc: 'Individuelle Containerfertigung für spezialisierte Ladung, einschließlich isolierter Tanks, Druckbehälter und einzigartiger geometrischer Konfigurationen.',
      discussProject: 'Ihr Projekt Besprechen',
      customProject: 'Haben Sie ein individuelles Projekt im Sinn?',
      customProjectDesc: 'Unser Ingenieurteam ist bereit, Ihre einzigartigen Anforderungen zu besprechen und eine maßgeschneiderte Lösung zu entwickeln, die Ihren betrieblichen Anforderungen entspricht.',
      startProject: 'Projekt Starten',
      viewProducts: 'Standardprodukte Anzeigen',
    },
    categories: {
      'lifting-equipment': { name: 'Hebetechnik', description: 'Mobilkrane und Hebelösungen für Bau und Industrie' },
      'dump-trucks': { name: 'Muldenkipper', description: 'Schwere Muldenkipper für Bergbau, Bauwesen und Materialtransport' },
      'special-purpose': { name: 'Spezialfahrzeuge', description: 'Spezialtransportfahrzeuge für industrielle und kommunale Anforderungen' },
      'agricultural': { name: 'Landtechnik', description: 'Traktoren, Erntemaschinen und Geräte für die moderne Landwirtschaft' },
      'tank-trucks': { name: 'Tankwagen', description: 'Spezialtankwagen für Kraftstoff, Wasser und Chemikalien' },
      'overhead-gantry': { name: 'Brücken- und Portalkrane', description: 'Industrielle Brücken- und Portalkransysteme für das Heben schwerer Lasten' },
      'mining-trucks': { name: 'Bergbau-Muldenkipper', description: 'Schwere Starr- und Knickgelenk-Muldenkipper für Bergbau und Steinbruch' },
      'metal-structures': { name: 'Stahlbau', description: 'Konstruktion und Fertigung von industriellen Stahlkonstruktionen und Komplexen' },
    },
    specLabels: {
      model: 'Modell',
      loadCapacity: 'Tragfähigkeit',
      tankVolume: 'Tankvolumen',
      wheelFormula: 'Radformel',
      drive: 'Antrieb',
      environmentalClass: 'Umweltklasse',
      tippingSystem: 'Kippsystem',
      liftingCapacity: 'Traglast',
      craneType: 'Krantyp',
      reach: 'Reichweite',
      liftingHeight: 'Hubhöhe',
      outriggers: 'Abstützungen',
      terrain: 'Geländegängigkeit',
      drillingDiameter: 'Bohrdurchmesser',
      drillingDepth: 'Bohrtiefe',
      mounting: 'Montage',
      platformHeight: 'Plattformhöhe',
      platformCapacity: 'Plattformkapazität',
      stabilization: 'Stabilisierung',
      platform: 'Plattform',
      material: 'Material',
      pumping: 'Pumpen',
      certification: 'Zertifizierung',
      lining: 'Auskleidung',
      compartments: 'Kammern',
      application: 'Anwendung',
      chassis: 'Fahrgestell',
      sweepingWidth: 'Kehrbreite',
      hopperVolume: 'Behältervolumen',
      vacuumSystem: 'Vakuumsystem',
      waterTank: 'Wassertank',
      waterCapacity: 'Wasserkapazität',
      pumpCapacity: 'Pumpenleistung',
      equipment: 'Ausrüstung',
      tools: 'Werkzeuge',
      storage: 'Lagerung',
      applications: 'Anwendungen',
      pumpDepth: 'Pumpentiefe',
      seating: 'Sitzplätze',
      comfort: 'Komfort',
      rescue: 'Rettung',
      grainTank: 'Korntank',
      headerWidth: 'Schneidwerksbreite',
      threshing: 'Dreschwerk',
      power: 'Leistung',
      augerType: 'Schneckentyp',
      control: 'Steuerung',
      grabType: 'Greifertyp',
      containerSize: 'Containergröße',
      mobility: 'Mobilität',
      structure: 'Struktur',
      axles: 'Achsen',
    },
    productsData: {
      'dt-dump-truck-4m3': {
        name: 'Muldenkipper 4,5 t',
        description: 'Kompakter Muldenkipper für städtischen Bau und kleine Projekte.',
        fullDescription: 'Der 4 m³ Muldenkipper ist für städtische Bauvorhaben, Landschaftsbau und kleine Materialtransporte konzipiert. Die kompakte Größe ermöglicht den Einsatz auf engstem Raum.',
        features: ['Kompaktes Design', 'Stadtfreundlich', 'Leichte Manövrierbarkeit', 'Effizienter Betrieb', 'Geringer Wartungsaufwand'],
        specs: { model: 'KDT-4.5', loadCapacity: '4,5 Tonnen', tankVolume: '4 m³', wheelFormula: '4x2', drive: 'Diesel', environmentalClass: 'Euro 5' }
      },
      'dt-dump-truck-8m3': {
        name: 'Muldenkipper 10 t',
        description: 'Mittelschwerer Muldenkipper für Bau und Kommunaldienste.',
        fullDescription: 'Der 8 m³ Muldenkipper bietet ein Gleichgewicht aus Kapazität und Manövrierfähigkeit für kommunale Dienste, Straßeninstandhaltung und mittlere Bauprojekte.',
        features: ['Mittlere Kapazität', 'Vielseitig', 'Zuverlässige Leistung', 'Kraftstoffsparend', 'Baustellentauglich'],
        specs: { model: 'KDT-10', loadCapacity: '10 Tonnen', tankVolume: '8 m³', wheelFormula: '4x2', drive: 'Diesel', environmentalClass: 'Euro 5' }
      },
      'dt-dump-truck-16m3': {
        name: 'Muldenkipper 20 t',
        description: 'Schwerer Muldenkipper für Bau und Bergbau.',
        fullDescription: 'Der 16 m³ Muldenkipper ist für schwere Bauarbeiten, Bergbau und große Materialtransporte ausgelegt und zeichnet sich durch robuste Bauweise und hohe Tragfähigkeit aus.',
        features: ['Hohe Kapazität', 'Schwerlast-Fahrgestell', 'Bergbau-tauglich', 'Verstärkte Karosserie', 'Langlebige Konstruktion'],
        specs: { model: 'KDT-20', loadCapacity: '20 Tonnen', tankVolume: '16 m³', wheelFormula: '6x4', drive: 'Diesel', environmentalClass: 'Euro 5' }
      },
      'mt-mining-truck-25t': {
        name: 'Bergbau-Muldenkipper 240 t',
        description: 'Spezialisierter Muldenkipper für schwere Steinbruch- und Aushubarbeiten.',
        fullDescription: 'Der MT Bergbau-Muldenkipper wurde speziell für raue Offroad-Bergbauumgebungen entwickelt and bietet maximale Tragfähigkeit für Steinbruch- and Aushubarbeiten mit außergewöhnlicher Fahrgestellhaltbarkeit.',
        features: ['Verstärktes Bergbau-Fahrgestell', 'Schwere Steinrucharbeit', 'Offroad-fähig', 'Kraftvoller Antriebsstrang', 'Industrielle Sicherheit'],
        specs: { model: 'KMT-240', loadCapacity: '240 Tonnen', tankVolume: '20 m³', wheelFormula: '6x4', drive: 'Diesel', environmentalClass: 'Euro 5' }
      },
      'dt-tipper-semi-trailer': {
        name: 'Kipp-Sattelauflieger 24-26 m³',
        description: 'Großvolumiger Sattelauflieger für Schüttguttransport.',
        fullDescription: 'Der Kipp-Sattelauflieger bietet maximale Tragfähigkeit für den Ferntransport von Schüttgut mit einem hydraulischen Kippsystem.',
        features: ['Großes Volumen', 'Langstrecke', 'Hydraulisches Kippen', 'Hohe Effizienz', 'Schüttguttransport'],
        specs: { model: 'KTS-26', tankVolume: '24-26 m³', axles: '3 Achsen', drive: 'Sattelauflieger', tippingSystem: 'Hydraulisch' },
      },
      'le-crane-7t': {
        name: 'Ladekran 7 t',
        description: 'Kompakter Ladekran für Verladung und Materialumschlag.',
        fullDescription: 'Der 7-Tonnen-Ladekran ist mit einem hydraulischen Gelenkarm für präzisen Materialumschlag und LKW-Verladeoperationen ausgestattet.',
        features: ['Ladekran', 'Hydraulische Steuerung', 'Präzise Positionierung', 'LKW-montiert', 'Vielseitiger Betrieb'],
        specs: { model: 'KLC-7', liftingCapacity: '7 Tonnen', craneType: 'Ladekran', drive: 'Hydraulisch', reach: 'Bis zu 15m' }
      },
      'le-crane-10-15t': {
        name: 'Ladekran 10-15 t',
        description: 'Mittelschwerer Ladekran für Bau und Logistik.',
        fullDescription: 'Der 10-15-Tonnen-Ladekran bietet eine ausgezeichnete Reichweite und Tragfähigkeit für Bau- und Logistikanwendungen.',
        features: ['Mittlere Kapazität', 'Erweiterte Reichweite', 'Baustellentauglich', 'Für Logistik', 'Zuverlässige Leistung'],
        specs: { model: 'KLC-15', liftingCapacity: '10-15 Tonnen', craneType: 'Ladekran', drive: 'Hydraulisch', reach: 'Bis zu 20m' }
      },
      'le-crane-16t': {
        name: 'Autokran 16 t',
        description: 'Mobiler Autokran für Bauhebearbeiten.',
        fullDescription: 'Der 16-Tonnen-Autokran kombiniert Mobilität mit erheblicher Tragfähigkeit für Bau- und Industrieanwendungen.',
        features: ['Mobilkran', 'Teleskopausleger', 'Hydraulische Stützen', 'Bauqualität', 'Hohe Stabilität'],
        specs: { model: 'KTC-16', liftingCapacity: '16 Tonnen', craneType: 'Teleskopausleger', liftingHeight: '30m', outriggers: 'Hydraulisch' }
      },
      'le-crane-25t': {
        name: 'Autokran 25 t',
        description: 'Schwerlast-Autokran für große Bauprojekte.',
        fullDescription: 'Der 25-Tonnen-Autokran bietet starke Tragfähigkeit mit ausgezeichneter Reichweite für große Bau- und Industrieprojekte.',
        features: ['Schwerlastheben', 'Langer Ausleger', 'Großprojekte', 'Professionell', 'Maximale Stabilität'],
        specs: { model: 'KTC-25', liftingCapacity: '25 Tonnen', craneType: 'Teleskopausleger', liftingHeight: '35m', outriggers: 'Hydraulisch' }
      },
      'le-crane-32t': {
        name: 'Autokran 32 t',
        description: 'Extraschwerer Autokran für große Industrieoperationen.',
        fullDescription: 'Der 32-Tonnen-Autokran bietet außergewöhnliche Tragfähigkeit für große Industrieanlagen und Infrastrukturprojekte.',
        features: ['Zusätzliche Kapazität', 'Industriestufe', 'Erweiterte Höhe', 'Schwere Projekte', 'Hohe Stabilität'],
        specs: { model: 'KTC-32', liftingCapacity: '32 Tonnen', craneType: 'Teleskopausleger', liftingHeight: '40m', outriggers: 'Hydraulisch' }
      },
      'le-crane-50t': {
        name: 'Autokran 50 t',
        description: 'Maximale Kapazität Autokran für Schwerindustrie.',
        fullDescription: 'Der 50-Tonnen-Autokran repräsentiert unseren stärksten Mobilkran für die schwersten Industrie- und Infrastrukturprojekte.',
        features: ['Maximale Kapazität', 'Schwerindustrie', 'Lange Reichweite', 'Infrastrukturbereit', 'Professionelle Leistung'],
        specs: { model: 'KTC-50', liftingCapacity: '50 Tonnen', craneType: 'Teleskopausleger', liftingHeight: '48m', outriggers: 'Hydraulisch' }
      },
      'le-all-terrain-crane': {
        name: 'All-Terrain-Kran',
        description: 'Offroad-Sattelauflieger-All-Terrain-Kran für abgelegene Standorte.',
        fullDescription: 'Der All-Terrain-Autokran verfügt über Offroad-Fähigkeiten mit einem spezialisierten Sattelauflieger für den Betrieb in schwierigem Gelände.',
        features: ['All-Terrain', 'Offroad-fähig', 'Sattelauflieger', 'Abgelegene Standorte', 'Hohe Mobilität'],
        specs: { model: 'KATC-AT', craneType: 'All-Terrain', wheelFormula: '6x6', drive: 'Allrad', terrain: 'Offroad-fähig' }
      },
      'le-earth-auger': {
        name: 'Erdbohranlage Ø 350mm',
        description: 'LKW-montierter Erdbohrer für Fundament- und Masteninstallation.',
        fullDescription: 'Der LKW-montierte Erdbohrer bietet effizientes Bohren mit Ø 350 mm Kapazität für Fundamentpfähle, Versorgungsmasten und Zauninstallationen.',
        features: ['Erdbohren', 'Fundamentarbeiten', 'Masteninstallation', 'Hydraulikkraft', 'Effizienter Betrieb'],
        specs: { model: 'KEA-350', drillingDiameter: 'Ø 350mm', drillingDepth: 'Bis zu 3m', drive: 'Hydraulisch', mounting: 'LKW-montiert' }
      },
      'le-aerial-platform-18m': {
        name: 'Hubarbeitsbühne 18 m',
        description: 'LKW-montierte Arbeitsbühne für Kommunal- und Wartungsarbeiten.',
        fullDescription: 'Die 18-Meter-Hubarbeitsbühne bietet sicheren Höhenzugang für kommunale Dienste, Gebäudearbeiten und Baumpflegearbeiten.',
        features: ['18m Reichweite', 'Sichere Plattform', 'Kommunale Arbeit', 'Wartungsbereit', 'Stabiler Betrieb'],
        specs: { model: 'KAP-18', platformHeight: '18m', platformCapacity: '250 kg', drive: 'Hydraulisch', stabilization: 'Abstützungen' }
      },
      'le-aerial-platform-28m': {
        name: 'Hubarbeitsbühne 28 m',
        description: 'Arbeitsbühne mit erweiterter Reichweite für Hochhauswartung.',
        fullDescription: 'Die 28-Meter-Hubarbeitsbühne bietet erweiterte Reichweite für Hochhauswartung, Telekommunikations- und Elektroarbeiten.',
        features: ['28m Reichweite', 'Hochhausarbeit', 'Telekom-bereit', 'Elektroarbeiten', 'Erweiterte Höhe'],
        specs: { model: 'KAP-28', platformHeight: '28m', platformCapacity: '250 kg', drive: 'Hydraulisch', stabilization: 'Abstützungen' }
      },
      'le-aerial-platform-36m': {
        name: 'Hubarbeitsbühne 36 m',
        description: 'Maximale Höhe Arbeitsbühne für Spezialanwendungen.',
        fullDescription: 'Die 36-Meter-Hubarbeitsbühne bietet maximale Arbeitshöhe für spezialisierte Wartungs-, Bau- und Industrieanwendungen.',
        features: ['36m Maximal', 'Spezialarbeiten', 'Industriestufe', 'Professioneller Einsatz', 'Überlegene Reichweite'],
        specs: { model: 'KAP-36', platformHeight: '36m', platformCapacity: '200 kg', drive: 'Hydraulisch', stabilization: 'Schwere Abstützungen' }
      },
      'le-crane-container-3.2t': {
        name: 'Ladekran 3,2 t (Containerverlader)',
        description: 'Autokran mit Containerplattform zur Selbstverladung.',
        fullDescription: 'Der 3,2-Tonnen-Autokran mit Containerplattform ermöglicht effiziente Selbstverladung und Transport von Containern und schweren Lasten.',
        features: ['Selbstverladung', 'Containertransport', 'Effizient', 'Vielseitig', 'Kompakt'],
        specs: { liftingCapacity: '3,2 Tonnen', platform: 'Containertyp', drive: 'Hydraulisch' }
      },
      'tt-water-tanker-4-6m3': {
        name: 'Wassertankwagen 4-6 m³',
        description: 'Kompakter Wassertankwagen für Trink- und Brauchwasser.',
        fullDescription: 'Der 4-6 m³ Wassertankwagen bietet Trink- und Brauchwassertransport für kommunale Dienste, Baustellen und ländliche Gebiete.',
        features: ['Lebensmittelqualität', 'Kompakte Größe', 'Trinkwasser', 'Kommunale Nutzung', 'Ländlicher Service'],
        specs: { model: 'KWT-6', tankVolume: '4-6 m³', material: 'Lebensmittelstahl', pumping: 'Inklusive', certification: 'Trinkwasser' }
      },
      'tt-water-tanker-allterrain': {
        name: 'Wassertankwagen All-Terrain 10-12 m³',
        description: 'All-Terrain-Wassertankwagen für Wasserlieferung abseits der Straße.',
        fullDescription: 'Der 10-12 m³ All-Terrain-Wassertankwagen verfügt über Offroad-Fähigkeiten für Wasserlieferungen an abgelegene Standorte und zur Bauunterstützung.',
        features: ['All-Terrain', 'Offroad-fähig', 'Fernlieferung', 'Bauunterstützung', 'Große Kapazität'],
        specs: { model: 'KWT-AT12', tankVolume: '10-12 m³', wheelFormula: '6x6', drive: 'All-Terrain', material: 'Lebensmittelstahl' }
      },
      'tt-acid-tanker-8-14m3': {
        name: 'Säuretankwagen 8-14 m³',
        description: 'Spezial-Säuretankwagen für Chemikalientransport.',
        fullDescription: 'Der 8-14 m³ Säuretankwagen verfügt über eine korrosionsbeständige Konstruktion für den sicheren Transport von Säuren und korrosiven Chemikalien.',
        features: ['Säurebeständig', 'Chemikalientransport', 'Sicherheitsmerkmale', 'ADR-konform', 'Korrosionsschutz'],
        specs: { model: 'KAT-14', tankVolume: '8-14 m³', material: 'Säurebeständig', lining: 'Gummi/PTFE', certification: 'ADR' }
      },
      'tt-acid-semi-trailer': {
        name: 'Säuretank-Sattelauflieger 14-20 m³',
        description: 'Großvolumiger Säuretank-Sattelauflieger für Industriechemikalien.',
        fullDescription: 'Der Säuretank-Sattelauflieger bietet 14-20 m³ Kapazität für den Transport von Industriechemikalien in großem Maßstab mit vollständigen Sicherheitssystemen.',
        features: ['Große Kapazität', 'Sattelauflieger', 'Industriechemie', 'Sicherheitssysteme', 'Langstrecke'],
        specs: { model: 'KATS-20', tankVolume: '14-20 m³', axles: '3 Achsen', material: 'Säurebeständig', certification: 'ADR/UN' }
      },
      'tt-fuel-semi-trailer': {
        name: 'Kraftstofftank-Sattelauflieger 30-40 m³',
        description: 'Hochkapazitäts-Kraftstofftank-Sattelauflieger für Erdölverteilung.',
        fullDescription: 'Der Kraftstofftank-Sattelauflieger liefert 30-40 m³ Kapazität für die groß angelegte Erdölverteilung mit mehreren Kammern.',
        features: ['Maximale Kapazität', 'Mehrkammer', 'Erdölverteilung', 'Langstrecke', 'Effiziente Lieferung'],
        specs: { model: 'KFTS-40', tankVolume: '30-40 m³', compartments: 'Mehrkammer', axles: '3 Achsen', certification: 'ADR' }
      },
      'tt-fuel-tanker-4-6m3': {
        name: 'Kraftstofftankwagen ATZ 4-6 m³',
        description: 'Kraftstofftankwagen für lokale Verteilung und Betankung.',
        fullDescription: 'Kompakter Kraftstofftankwagen und Betanker, konzipiert für effiziente lokale Kraftstoffverteilung und Betankung vor Ort.',
        features: ['Kraftstoffverteilung', 'Betankung', 'Kompakt', 'Effizient', 'Lokale Nutzung'],
        specs: { model: 'ATZ-6', tankVolume: '4-6 m³', material: 'Stahl', application: 'Betankung' }
      },
      'tt-trailer-refueller-2-4m3': {
        name: 'Anhänger-Betanker 2-4 m³',
        description: 'Anhänger-montierter Betanker für flexible Bereitstellung.',
        fullDescription: 'Anhänger-montierter Kraftstoffbetanker, der flexible und mobile Betankungsmöglichkeiten für Baustellen und abgelegene Gebiete bietet.',
        features: ['Mobile Betankung', 'Anhänger-montiert', 'Flexibel', 'Baustellen', 'Abgelegene Gebiete'],
        specs: { model: 'TR-4', tankVolume: '2-4 m³', chassis: 'Anhänger', application: 'Mobile Betankung' }
      },
      'tt-fuel-tanker-8-12m3': {
        name: 'Kraftstofftankwagen ATZ 8-12 m³',
        description: 'Mittelschwerer Kraftstofftankwagen für regionale Verteilung.',
        fullDescription: 'Kraftstofftankwagen mittlerer Kapazität mit 8-12 m³, konzipiert für effiziente regionale Kraftstoffverteilung und Betankungsoperationen vor Ort.',
        features: ['Mittlere Kapazität', 'Regionale Verteilung', 'Betankungsfähig', 'Effizient', 'Vielseitig'],
        specs: { model: 'ATZ-12', tankVolume: '8-12 m³', material: 'Stahl', application: 'Kraftstoffverteilung' }
      },
      'tt-fuel-tanker-16-18m3': {
        name: 'Kraftstofftankwagen ATZ 16-18 m³',
        description: 'Großvolumiger Kraftstofftankwagen für kommerzielle Verteilung.',
        fullDescription: 'Großvolumiger Kraftstofftankwagen mit 16-18 m³ für kommerzielle Kraftstoffverteilung und groß angelegte Betankungsoperationen.',
        features: ['Große Kapazität', 'Kommerziell', 'Hohes Volumen', 'Verteilungsbereit', 'Professionell'],
        specs: { model: 'ATZ-18', tankVolume: '16-18 m³', material: 'Stahl', application: 'Kommerzielle Verteilung' }
      },
      'tt-fuel-tanker-20-25m3': {
        name: 'Kraftstofftankwagen ATZ 20-25 m³',
        description: 'Extra großer Kraftstofftankwagen für Industrieoperationen.',
        fullDescription: 'Extra großvolumiger Kraftstofftankwagen mit 20-25 m³ für industrielle Kraftstoffverteilung und groß angelegte kommerzielle Operationen.',
        features: ['Extra große Kapazität', 'Industriestufe', 'Maximales Volumen', 'Schwerlast', 'Hohe Effizienz'],
        specs: { model: 'ATZ-25', tankVolume: '20-25 m³', material: 'Stahl', application: 'Industrielle Verteilung' }
      },
      'spm-vacuum-sweeper': {
        name: 'Vakuum-Kehrmaschine',
        description: 'Kommunale Vakuum-Kehrmaschine für Straßenreinigung.',
        fullDescription: 'Die Vakuum-Kehrmaschine bietet effiziente mechanische und Vakuum-Reinigung für kommunale Straßen mit Staubunterdrückung.',
        features: ['Vakuum-Reinigung', 'Staubunterdrückung', 'Kommunal', 'Großer Behälter', 'Effiziente Reinigung'],
        specs: { model: 'KVS-Municipal', sweepingWidth: '2,5m', hopperVolume: '6 m³', vacuumSystem: 'Inklusive', waterTank: '1000L' }
      },
      'spm-firefighting-platform': {
        name: 'Feuerwehr-Gelenkmastbühne 72 m',
        description: 'Hochhaus-Brandbekämpfungs- und Rettungsbühne.',
        fullDescription: 'Die 72-Meter-Feuerwehr-Gelenkmastbühne bietet Brandbekämpfungs- und Rettungsmöglichkeiten für Hochhäuser und Industrieanlagen.',
        features: ['72m Höhe', 'Brandbekämpfung', 'Rettungsfähig', 'Wasserwerfer', 'Hochhaus-bereit'],
        specs: { model: 'KFF-72', platformHeight: '72m', waterCapacity: '2000L', pumpCapacity: '3000 L/min', reach: 'Bis zu 65m' }
      },
      'spm-firefighting-platform-52-55m': {
        name: 'Feuerwehr-Gelenkmastbühne 52-55 m',
        description: 'Mittelgroße Brandbekämpfungs- und Rettungsbühne.',
        fullDescription: 'Die 52-55-Meter-Feuerwehr-Gelenkmastbühne bietet Brandbekämpfungs- und Rettungsmöglichkeiten für mittelhohe Gebäude und Industrieanlagen.',
        features: ['52-55m Höhe', 'Brandbekämpfung', 'Rettungsplattform', 'Wassersystem', 'Mittelhoch'],
        specs: { model: 'KFF-55', platformHeight: '52-55m', waterCapacity: '1800L', pumpCapacity: '2500 L/min', reach: 'Bis zu 50m' }
      },
      'spm-mobile-workshop': {
        name: 'Mobile Kfz-Reparaturwerkstatt (MVRW)',
        description: 'Voll ausgestattete mobile Werkstatt für Feldreparaturen.',
        fullDescription: 'Die mobile Kfz-Reparaturwerkstatt bietet vollständige Wartungs- und Reparaturmöglichkeiten vor Ort mit Lagerung für Werkzeuge, Ausrüstung und Ersatzteile.',
        features: ['Mobile Werkstatt', 'Vollständige Werkzeuge', 'Vor-Ort-Reparatur', 'Stromerzeugung', 'Feld-bereit'],
        specs: { model: 'KMVRW', equipment: 'Vollständige Werkstatt', power: 'Generator 15kW', tools: 'Komplettset', storage: 'Organisierte Fächer' }
      },
      'spm-drilling-rig-urb50': {
        name: 'URB-50 Bohranlage (8×8)',
        description: 'All-Terrain-Bohranlage für Exploration und Brunnenbohren.',
        fullDescription: 'Die URB-50 Bohranlage auf 8×8 Fahrgestell bietet leistungsstarke Bohrkapazität für Exploration, Wasserbrunnen und geotechnische Anwendungen.',
        features: ['Tiefbohren', '8x8 Fahrgestell', 'All-Terrain', 'Exploration', 'Wasserbrunnen'],
        specs: { model: 'URB-50', wheelFormula: '8x8', drillingDepth: 'Bis zu 500m', drive: 'Allrad', terrain: 'All-Terrain' }
      },
      'spm-drilling-rig-zif': {
        name: 'ZIF Bohranlage',
        description: 'Spezialisierte Bohranlage für Industrieanwendungen.',
        fullDescription: 'Die ZIF Bohranlage bietet spezialisierte Bohrkapazität für industrielle, bautechnische und geotechnische Anwendungen.',
        features: ['Industriebohren', 'Bauen-Nutzung', 'Geotechnisch', 'Hydraulikkraft', 'Vielseitiger Betrieb'],
        specs: { model: 'ZIF', drillingDepth: 'Bis zu 300m', applications: 'Industrie/Bau', drive: 'Hydraulisch' }
      },
      'spm-dnp-pump-installation': {
        name: 'DNP Pumpeninstallationssystem',
        description: 'Installationssystem zum Absenken von Pumpen in Brunnen.',
        fullDescription: 'Das DNP Installationssystem bietet sichere und effiziente Installation und Entfernung von Pumpen in Tiefbrunnen für Öl-, Wasser- und Industrieanwendungen.',
        features: ['Pumpeninstallation', 'Tiefbrunnen', 'Öl/Wasser', 'Sicherer Betrieb', 'Industriestufe'],
        specs: { model: 'DNP', pumpDepth: 'Bis zu 2000m', liftingCapacity: '5 Tonnen', applications: 'Öl-/Wasserbrunnen', drive: 'Hydraulisch' }
      },
      'spm-admin-convoy': {
        name: 'Verwaltungs-Konvoi-Fahrzeug',
        description: 'Speziell entworfenes Fahrzeug für Verwaltungskonvoi-Transport.',
        fullDescription: 'Entworfen für den sicheren und komfortablen Transport von Verwaltungspersonal und Konvoi-Operationen.',
        features: ['Konvoi-Transport', 'Verwaltung', 'Sicher', 'Komfortabel', 'Spezialzweck'],
        specs: { application: 'Verwaltung', seating: 'Mehrpersonen', comfort: 'Hoch' }
      },
      'spm-firefighting-ladder': {
        name: 'Feuerwehr-Drehleiter',
        description: 'Löschfahrzeug mit Drehleiter und Rettungskorb.',
        fullDescription: 'Ausgestattet mit einer Drehleiter und Rettungskorb bietet dieses Fahrzeug effiziente Hochwinkel-Brandbekämpfung und Rettungsoperationen.',
        features: ['Brandbekämpfung', 'Drehleiter', 'Rettungskorb', 'Hochwinkel', 'Effizient'],
        specs: { application: 'Brandbekämpfung', equipment: 'Drehleiter', rescue: 'Korb inklusive' }
      },
      'spm-patrol-pickup': {
        name: 'Patrouillen-Pickup (PPS)',
        description: 'Patrouillen- und Wachdienst-Pickup für Sicherheitsoperationen.',
        fullDescription: 'Robuster Pickup-Truck, konfiguriert für Patrouillen- und Wachdienste, bietet Mobilität und Zuverlässigkeit für Sicherheitsaufgaben.',
        features: ['Patrouille', 'Wachdienst', 'Sicherheit', 'Mobilität', 'Zuverlässigkeit'],
        specs: { chassis: 'Pickup', drive: '4x4', application: 'Patrouille/Wache' }
      },
      'am-grain-harvester': {
        name: 'Mähdrescher (Selbstfahrend)',
        description: 'Selbstfahrender Mähdrescher für effiziente Getreideernte.',
        fullDescription: 'Der Mähdrescher sorgt für effiziente Ernte von Weizen, Gerste, Mais und anderen Getreidearten mit fortschrittlichem Dreschen und minimalem Verlust.',
        features: ['Selbstfahrend', 'Großer Korntank', 'Breites Schneidwerk', 'Geringer Verlust', 'Effiziente Ernte'],
        specs: { model: 'KCH-SP', grainTank: '8000L', headerWidth: '6,5m', drive: 'Selbstfahrend', threshing: 'Fortschrittliches System' }
      },
      'am-tractor-n81': {
        name: 'Universaltraktor NURAFSHON N 81 (4×4)',
        description: '4×4 Traktor auf Belarus-Plattform für vielseitige Landwirtschaft.',
        fullDescription: 'Der NURAFSHON N 81 Universaltraktor verfügt über 4×4 Antrieb auf der Belarus-Plattform für Landwirtschafts-, Kommunal- und Transportarbeiten, die erhöhte Traktion erfordern.',
        features: ['4x4 Antrieb', 'Belarus-basiert', 'Universelle Nutzung', 'Zapfwelle inklusive', 'Zuverlässige Plattform'],
        specs: { model: 'N-81 4x4', platform: 'Belarus MTZ', wheelFormula: '4x4', power: '81 PS', drive: 'Mechanisch' }
      },
      'am-tractor-earth-auger': {
        name: 'Traktor mit Erdbohrer',
        description: 'Traktor mit montiertem Erdbohrer für landwirtschaftliches Bohren.',
        fullDescription: 'Der Traktor mit Erdbohrer bietet effizientes Bohren für Zaunpfosten, Baumpflanzung und landwirtschaftliche Fundamentarbeiten.',
        features: ['Zapfwellen-Bohrer', 'Zaunbau', 'Baumpflanzung', 'Landwirtschaft', 'Vielseitiges Bohren'],
        specs: { model: 'N-Auger', augerType: 'Zapfwellenbetrieben', drillingDiameter: 'Variabel', applications: 'Zaun/Bäume', drive: 'Traktor Zapfwelle' }
      },
      'am-tractor-n81c': {
        name: 'Universaltraktor N 81 C',
        description: 'Universaltraktor NURAFSHON N 81 C auf Belarus-Plattform.',
        fullDescription: 'Der NURAFSHON N 81 C ist eine spezialisierte Variante des Universaltraktors, der zuverlässige Leistung für landwirtschaftliche Aufgaben bietet.',
        features: ['Universaltraktor', 'Belarus-basiert', 'Zuverlässig', 'Landwirtschaft', 'Spezialisiert'],
        specs: { model: 'N-81 C', platform: 'Belarus MTZ', power: '81 PS', drive: 'Mechanisch' }
      },
      'og-overhead-bridge': {
        name: 'Brückenkran',
        description: 'Schwerlast-Brückenkran für Industrieanlagen.',
        fullDescription: 'Industrielles Brückenkran-System, konzipiert für schwere Hebeoperationen in Fabriken, Lagern und Produktionsstätten mit präziser Lastkontrolle.',
        features: ['Schwerlast', 'Präzise Kontrolle', 'Industriestufe', 'Individuelle Spannweite', 'Elektrischer Betrieb'],
        specs: { liftingCapacity: 'Bis zu 50 Tonnen', span: 'Individuell', liftingHeight: 'Individuell', control: 'Elektrisch' }
      },
      'og-magnet-grab': {
        name: 'Magnet- und Greiferkran',
        description: 'Spezialkran mit Magnet- und Greiferanbau.',
        fullDescription: 'Brückenkran, ausgestattet mit Elektromagnet- und mechanischen Greifersystemen für den Umschlag von Metallschrott, Schüttgut und Speziallasten.',
        features: ['Magnetsystem', 'Greiferanbau', 'Schrottumschlag', 'Schüttgut', 'Vielseitiger Betrieb'],
        specs: { liftingCapacity: 'Bis zu 32 Tonnen', grabType: 'Elektromagnetisch/Mechanisch', control: 'Elektrisch', applications: 'Schrott/Schüttgut' }
      },
      'og-container-overhead': {
        name: 'Container-Brückenkrane',
        description: 'Spezialisierte Brückenkrane für Containerumschlag.',
        fullDescription: 'Schwerlast-Brückenkran-System, speziell entwickelt für effizienten Containerumschlag in Häfen, Terminals und Logistikanlagen.',
        features: ['Containerumschlag', 'Hafenbetrieb', 'Hohe Kapazität', 'Automatisierte Steuerung', 'Logistik-bereit'],
        specs: { liftingCapacity: 'Bis zu 65 Tonnen', containerSize: '20ft/40ft', span: 'Individuell', control: 'Automatisiert' }
      },
      'og-single-girder-gantry': {
        name: 'Einträger-Portalkran',
        description: 'Mobiler Einträger-Portalkran für Außenoperationen.',
        fullDescription: 'Einträger-Portalkran mit mobilem Design für Außenmaterialumschlag, Baustellen und Lagerplätze mit flexibler Positionierung.',
        features: ['Einträger', 'Mobiles Design', 'Außenfähig', 'Flexible Spannweite', 'Schienengebunden'],
        specs: { liftingCapacity: 'Bis zu 20 Tonnen', span: '10-35m', liftingHeight: '6-18m', mobility: 'Schienengebunden' }
      },
      'og-truss-gantry': {
        name: 'Fachwerk-Portalkran',
        description: 'Schwerlast-Fachwerk-Portalkran für Großoperationen.',
        fullDescription: 'Robuster Portalkran mit Fachwerkstruktur, verstärkt für schwere Hebeaufgaben in Werften, auf Baustellen und in Industrieanlagen.',
        features: ['Fachwerkstruktur', 'Schwerlast', 'Große Spannweite', 'Werft-Grad', 'Industrieoperationen'],
        specs: { liftingCapacity: 'Bis zu 100 Tonnen', span: '20-50m', structure: 'Fachwerkdesign', applications: 'Werft/Industrie' }
      }
    },
  },
};


export function getTranslation(lang: Language) {
  return translations[lang];
}