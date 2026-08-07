import { PortfolioData } from '../types/portfolio';

export const initialPortfolioData: PortfolioData = {
  personalInfo: {
    name: 'Bangalore Siddegowda Ramesh',
    title: 'Entrepreneur | CEO | Dual Affiliated Service Leader',
    tagline: 'Empowering Enterprise Technology, Talent Acquisition, Youth Wellness & Community Leadership across Karnataka & Globally',
    shortIntro: 'A distinguished social entrepreneur, IT executive, and dedicated Dual Affiliated Service Leader with over 22 years of experience in enterprise solutions, contract staffing, clean water CSR initiatives, and community empowerment.',
    email: 'bsr@bsrits.com',
    phone: '', // Contact numbers kept private per privacy policy; email is primary contact
    location: 'Bengaluru, Karnataka, India',
    linkedin: 'https://linkedin.com/in/bsramesh',
    website: 'https://WIN5M.com',
    heroImage: '', // Kept blank per user request
  },

  about: {
    heading: 'ABOUT ME',
    subheading: 'Academic Foundations, Entrepreneurial Leadership & Social Stewardship',
    biography: [
      'Bangalore Siddegowda Ramesh (Ramesh B.S) is a seasoned entrepreneur, technology consultant, and prominent social leader based in Bengaluru, Karnataka. Holding degrees in Business Administration (BBA), Information Technology (MIT from Sikkim Manipal University), and Master in Business Administration (MBA), Ramesh combines strong academic rigor with over two decades of hands-on industry leadership.',
      'He is the CEO of BSR IT Solutions Private Limited, driving web development, staffing services, and technology solution delivery. Driven by a deep passion for community platforms, he founded Bangalorean.com to connect Bangaloreans globally with a focus on humanitarian causes, as well as WIN5M.com—a community partnership unit focused on youth sports talent, calorie balance, and stress management for families nationwide.',
      'A staunch believer in giving back to society, Ramesh has served extensively in Rotary International as President of Rotary Bangalore Banashankari (2013-14) and is currently a pivotal leader in Lions International District 317F as Region Chairperson, District Coordinator, and Charter Secretary of Lions Club of Bangalore Brigade, where he successfully spearheaded ₹31+ Lakhs in corporate CSR funding for rural Reverse Osmosis (RO) clean water plants.'
    ],
    vision: 'To build scalable enterprise platforms and youth wellness initiatives while leveraging CSR capital to provide clean drinking water, education, and healthcare access to rural communities.',
    mission: 'Connecting talent through right channels, inspiring families toward active living, and leading Lions & Rotary humanitarian missions with transparency and dedication.',
    coreValues: [
      'Right Talent through Right Channels',
      'Community Empowerment & Humanitarian Service',
      'Integrity in Corporate Governance',
      'Youth Sports & Wellness Advancement',
      'Sustainable CSR Water & Health Infrastructure'
    ],
    achievements: [
      {
        id: 'ach-1',
        title: 'Enterprise & IT Leadership',
        value: '22+ Yrs',
        description: 'Leading BSR IT Solutions & enterprise staffing platforms across India.',
        iconName: 'Globe'
      },
      {
        id: 'ach-2',
        title: 'CSR Clean Water Funded',
        value: '₹31+ Lakhs',
        description: 'Raised corporate CSR funds to establish 3 RO water plants in rural Karnataka.',
        iconName: 'HeartHandshake'
      },
      {
        id: 'ach-3',
        title: 'Youth Wellness Community',
        value: 'WIN5M',
        description: 'Created nationwide community unit to foster sports talent & family health.',
        iconName: 'Award'
      },
      {
        id: 'ach-4',
        title: 'Lions & Rotary Service',
        value: 'Region Chair',
        description: 'Charter Secretary, President, Zone Chair & Region Chairperson leadership.',
        iconName: 'MapPin'
      }
    ],
    highlights: [
      {
        id: 'hl-1',
        title: 'Charter Secretary & President - LCB Brigade',
        description: 'Instrumental in creating Lions Club of Bangalore Brigade and executing ₹31L CSR water projects in Lingarajpuram & Thralu.'
      },
      {
        id: 'hl-2',
        title: 'Rotary Club President & Transformation Leader',
        description: 'Served as President of Rotary Bangalore Banashankari (2013-14), leading Pulse Polio campaigns & regular blood donation drives.'
      },
      {
        id: 'hl-3',
        title: 'Founder of Bangalorean.com & WIN5M.com',
        description: 'Pioneered global community networking platforms for Bengaluru and nationwide youth physical activity initiatives.'
      }
    ],
    image: '' // Kept blank per user request
  },

  lionisticJourney: {
    heading: 'MY LIONISTIC JOURNEY',
    subheading: 'Dedicated Service, District Leadership, International Fellowship & MJF Honor in Lions Clubs International',
    overview: 'Being a Lion has expanded my circle of like-minded leaders while providing a global platform to give back to the community. Conferred the Melvin Jones Fellow (MJF) honor in 2025-2026 by LCIF, we turn experience, compassion, and international synergy into enduring humanitarian impact.',
    
    mjfHonor: {
      year: '2025 - 2026',
      title: 'Melvin Jones Fellow (MJF)',
      organization: 'Lions Clubs International Foundation (LCIF)',
      description: 'Conferred the prestigious Melvin Jones Fellow (MJF) recognition in the year 2025-2026—the highest honor bestowed by LCIF for exemplary dedication to humanitarian service, clean water CSR infrastructure, and youth empowerment.',
      highlights: [
        'Highest international honor for humanitarian stewardship in Lions Clubs International.',
        'Recognized for raising ₹31+ Lakhs CSR funding for rural clean drinking water plants.',
        'Championing youth Leo club leadership across 12 clubs in District 317F.',
        'Sustaining global LCIF mission initiatives and international cross-border fellowship.'
      ]
    },

    milestones: [
      {
        id: 'lion-0',
        year: '2025 - 2026',
        position: 'Melvin Jones Fellow (MJF) Honoree',
        organization: 'Lions Clubs International Foundation (LCIF)',
        location: 'District 317F / Global LCIF',
        description: 'Awarded the prestigious Melvin Jones Fellow (MJF) title by LCIF for outstanding contribution to humanitarian causes, community welfare, and CSR water infrastructure.',
        achievements: [
          'Conferred Melvin Jones Fellowship (MJF) recognition for the Lions Year 2025-2026.',
          'Acknowledged by District 317F and LCIF leadership for transformative service impact.'
        ],
        category: 'Council'
      },
      {
        id: 'lion-1',
        year: '2026 - 2027',
        position: 'Region Chairperson',
        organization: 'Lions International District 317F',
        location: 'Bengaluru Region',
        description: 'Providing strategic leadership and operational guidance for multiple Lions zones and 12 advisory Leo clubs across District 317F.',
        achievements: [
          'Overseeing regional humanitarian service projects and club growth.',
          'Fostering cross-district collaboration and leadership development.'
        ],
        category: 'District'
      },
      {
        id: 'lion-2',
        year: '2023 - 2026',
        position: 'District Coordinator Leo 317F & Leo Advisor of 12 Leo Clubs',
        organization: 'Lions International District 317F',
        location: 'District 317F',
        description: 'Coordinating youth Leo clubs and mentoring young leaders across LEO Ashraya, LEO Satva, LEO Vishwayuvashakti and 9 additional advisory Leo clubs.',
        achievements: [
          'Guiding leadership development, civic engagement, and community service across 12 Leo Clubs.',
          'Mentoring youth across schools and colleges while organizing sports, health, and empowerment campaigns.'
        ],
        category: 'District'
      },
      {
        id: 'lion-3',
        year: '2024 - 2025',
        position: 'Zone Chairperson',
        organization: 'Lions International District 317F',
        description: 'Led Zone governance, club support, and membership retention for Lions clubs in the assigned region.',
        achievements: [
          'Strengthened club administration and community service engagement.',
          'Coordinated joint district humanitarian drives.'
        ],
        category: 'District'
      },
      {
        id: 'lion-5',
        year: '2022 - 2023',
        position: 'President',
        organization: 'Lions Club of Bangalore Brigade (LCB Brigade)',
        location: 'Bengaluru',
        description: 'Led club operations, member motivation, and project execution following the successful charter year.',
        achievements: [
          'Completed implementation and handover of 3 Reverse Osmosis (RO) water purification plants to local Panchayats.',
          'Expanded blood donation drives and community health camps.'
        ],
        category: 'Club'
      },
      {
        id: 'lion-6',
        year: '2021 - 2022',
        position: 'Charter Secretary & Co-Founder',
        organization: 'Lions Club of Bangalore Brigade (District 317F)',
        location: 'Bengaluru',
        description: 'Instrumental in creating the LCB Brigade club under Charter President Ln. A.V. Nagaraj and PDG Mohan.',
        achievements: [
          'Raised ₹31+ Lakhs in Corporate CSR funds within 12 months for 3 RO water purification plants.',
          'Executed RO plants in rural Bangalore areas (Lingarajpuram, Karnataka-Tamil Nadu Border, and Thralu) to provide clean drinking water.'
        ],
        category: 'Club'
      },
      {
        id: 'lion-7',
        year: 'International Fellowship',
        position: 'International Lions Goodwill Delegate',
        organization: 'Lions International Global Network',
        location: 'Nepal (Districts 325 B1 & B2) / Singapore (District 309)',
        description: 'Represented District 317F in international Lions visits, building strong cross-border service ties.',
        achievements: [
          'Engaged with Ln. Puja Shrestha Rajbanshi (District 325 B2 - Nepal) and Ln. Bishwo Raj Paudel (District 325 B1 - Nepal).',
          'Interacted with Lions leaders from District 309 in Singapore to foster global humanitarian partnership.'
        ],
        category: 'International'
      }
    ],

    internationalExposures: [
      {
        id: 'exp-1',
        title: 'Nepal Goodwill Lions Delegation & Cross-Border Service',
        country: 'Nepal',
        district: 'Districts 325 B1 & B2',
        dignitaries: ['Ln. Puja Shrestha Rajbanshi (District 325 B2)', 'Ln. Bishwo Raj Paudel (District 325 B1)'],
        description: 'Represented Lions International District 317F during official visits to Kathmandu and Pokhara, building bilateral service partnerships, clean water exchange models, and youth Leo joint initiatives.',
        keyOutcomes: [
          'Exchanged international club banners and goodwill greetings.',
          'Shared blueprint of ₹31L CSR Reverse Osmosis clean water infrastructure.',
          'Initiated Indo-Nepal Youth Leo cultural & leadership exchange discussions.'
        ],
        year: '2024 - 2025'
      },
      {
        id: 'exp-2',
        title: 'Singapore Lions Leadership & Enterprise Staffing Forum',
        country: 'Singapore',
        district: 'District 309',
        dignitaries: ['District 309 Cabinet Officers & Club Presidents'],
        description: 'Engaged with Lions leaders in Singapore to exchange best practices in modern club governance, digital platform integration, enterprise IT talent staffing, and WIN5M youth sports wellness.',
        keyOutcomes: [
          'Discussed cross-border youth sports talent development via WIN5M.',
          'Analyzed digital recordkeeping and transparent CSR governance models.',
          'Strengthened District 317F - District 309 international fellowship ties.'
        ],
        year: '2025'
      },
      {
        id: 'exp-3',
        title: 'Melvin Jones Fellowship (MJF) Global LCIF Network',
        country: 'Global / USA',
        district: 'LCIF Global Network',
        dignitaries: ['Lions Clubs International Foundation Trustees & District 317F Leaders'],
        description: 'Inducted into the global Melvin Jones Fellows network for 2025-2026, aligning local District 317F humanitarian drives with LCIF global grant causes (Vision, Youth, Disaster Relief, Hunger, Diabetes).',
        keyOutcomes: [
          'Conferred MJF pin and plaque for exemplary humanitarian stewardship.',
          'Championed LCIF causes across 12 Leo advisory clubs.',
          'Pledged continued CSR funding architecture for clean water and youth health.'
        ],
        year: '2025 - 2026'
      }
    ],

    blogPosts: [
      {
        id: 'blog-1',
        title: 'Borders Without Barriers: My Lions International Delegation to Nepal',
        date: 'August 2025',
        author: 'Ln. B.S. Ramesh, MJF',
        location: 'Kathmandu & Pokhara, Nepal (Districts 325 B1 & B2)',
        readTime: '4 min read',
        summary: 'A journey of friendship and purpose: Interacting with Nepalese Lions leaders Ln. Puja Shrestha Rajbanshi and Ln. Bishwo Raj Paudel to advance clean water solutions and youth Leo exchanges.',
        content: `Lions Clubs International is truly a global family without boundaries. During my official delegation to Nepal representing District 317F, I had the honor of engaging with distinguished Lions leaders, including Ln. Puja Shrestha Rajbanshi (District 325 B2) and Ln. Bishwo Raj Paudel (District 325 B1).

Our discussions centered on two vital pillars: clean drinking water CSR projects and empowering youth through Leo clubs. I presented the operational architecture of our ₹31+ Lakhs Reverse Osmosis (RO) water purification initiative in Karnataka, demonstrating how local corporate CSR funds can be effectively harnessed by Lions clubs to bring pure water to rural Panchayats.

Furthermore, we laid the groundwork for an Indo-Nepal Youth Leo Exchange program, allowing Leos from Bangalore and Nepal to collaborate on cultural, environmental, and leadership projects. Exchanging club banners and sharing service visions reminded me that compassion speaks a universal language.`,
        tags: ['Nepal Delegation', 'District 325 B1/B2', 'Clean Water CSR', 'International Fellowship']
      },
      {
        id: 'blog-2',
        title: 'Innovating Governance & Youth Sports: Lions District 309 Visit to Singapore',
        date: 'July 2025',
        author: 'Ln. B.S. Ramesh, MJF',
        location: 'Singapore (District 309)',
        readTime: '5 min read',
        summary: 'Exchanging enterprise staffing insights, digital transparency models, and WIN5M youth athletic programs with Lions leaders in Singapore.',
        content: `Visiting Lions District 309 in Singapore provided an inspiring opportunity to blend corporate expertise with humanitarian service. As CEO of BSR IT Solutions and a Dual Affiliated Service Leader, I presented our WIN5M.com community sports unit—focusing on encouraging youngsters toward active sports participation and family calorie balance.

Lions leaders in Singapore expressed immense interest in how technology, enterprise staffing frameworks, and structured sports campaigns can be combined to engage the next generation of leaders. We explored how digital recordkeeping, transparent audit trails, and online member portals elevate club efficiency.

International fellowship visits like these reinforce my commitment as Region Chairperson and Leo Advisor to bring global best practices back to District 317F.`,
        tags: ['Singapore District 309', 'WIN5M Sports', 'Enterprise Governance', 'Global Lions']
      },
      {
        id: 'blog-3',
        title: 'The Journey to Melvin Jones Fellow (MJF) 2025–2026 Recognition',
        date: 'January 2026',
        author: 'Ln. B.S. Ramesh, MJF',
        location: 'Lions Clubs International Foundation (LCIF)',
        readTime: '6 min read',
        summary: 'Reflecting on receiving LCIF’s highest honor in 2025-2026 for continuous humanitarian service, CSR water stewardship, and mentoring 12 Leo clubs.',
        content: `Receiving the Melvin Jones Fellowship (MJF) recognition for the Lions Year 2025-2026 is one of the most humbling milestones of my service career. Named after Melvin Jones, the founder of Lions Clubs International, the MJF award represents the pinnacle of commitment to humanitarian service and support for LCIF.

When we founded the Lions Club of Bangalore Brigade as Charter Secretary, our vision was clear: to turn compassion into tangible, lasting community infrastructure. Raising ₹31+ Lakhs in corporate CSR capital within 12 months to install 3 RO water purification plants in rural Lingarajpuram, Thralu, and the TN-border was proof of what transparent leadership can achieve.

As District Coordinator for Leos and Region Chairperson, this MJF honor belongs to every member, corporate donor, and young Leo leader who stood shoulder to shoulder with us. Service Above Self and We Serve will remain my guiding lights.`,
        tags: ['MJF 2025-2026', 'LCIF Honor', 'Humanitarian Leadership', 'LCB Brigade']
      },
      {
        id: 'blog-4',
        title: 'Architecting Clean Water Infrastructure: A Blueprint for Corporate CSR',
        date: 'November 2024',
        author: 'Ln. B.S. Ramesh, MJF',
        location: 'Bengaluru Rural & Urban Panchayats',
        readTime: '4 min read',
        summary: 'How Lions Club of Bangalore Brigade raised ₹31+ Lakhs CSR funds and handed over 3 high-capacity RO water purification plants to local rural Panchayats.',
        content: `Access to clean drinking water is a fundamental human right, yet many rural villages in Karnataka struggle with high fluoridation and waterborne ailments. During my tenure as Charter Secretary and President of LCB Brigade, we identified clean water as our core flagship service drive.

By presenting clear financial audits and measurable impact metrics to corporate CSR heads, we secured ₹31+ Lakhs funding. The execution involved acquiring land permissions, installing industrial grade Reverse Osmosis filtration systems, and executing formal handovers to local Panchayats.

Today, thousands of villagers collect pure drinking water daily. This project stands as a benchmark for how Lions clubs can act as trusted execution partners for corporate CSR initiatives.`,
        tags: ['CSR Clean Water', 'RO Water Plants', 'LCB Brigade', 'Rural Health']
      }
    ],

    galleryBannerImages: [
      {
        id: 'gal-1',
        url: '',
        title: 'Region Chairperson & Cabinet Installation Assembly',
        category: 'District 317F'
      },
      {
        id: 'gal-2',
        url: '',
        title: 'Nepal International Lions Goodwill Delegation (Districts 325 B1/B2)',
        category: 'International Visits'
      },
      {
        id: 'gal-3',
        url: '',
        title: 'Melvin Jones Fellow (MJF 2025-2026) Award Ceremony',
        category: 'LCIF Honor'
      },
      {
        id: 'gal-4',
        url: '',
        title: 'Singapore District 309 Leadership & WIN5M Youth Forum',
        category: 'International Visits'
      },
      {
        id: 'gal-5',
        url: '',
        title: '12 Leo Advisory Clubs Youth Convention & Sports Meet',
        category: 'Leo Advisory'
      },
      {
        id: 'gal-6',
        url: '',
        title: 'CSR ₹31L Rural RO Clean Water Plant Handover to Panchayat',
        category: 'Humanitarian CSR'
      }
    ]
  },

  services: {
    heading: 'SERVICES INVOLVED IN',
    subheading: 'Entrepreneurial Solutions, Talent Staffing & Social Infrastructure Services',
    description: 'Combining enterprise technology consulting, contract staffing delivery, youth sports management, and CSR clean water project architecture.',
    services: [
      {
        id: 'srv-1',
        title: 'IT Solutions, Web Development & Software Delivery',
        description: 'As Co-Founder & CEO of BSR IT Solutions Pvt Ltd, delivering robust web application development, IT consulting, and custom software delivery.',
        iconName: 'ShieldCheck',
        yearsOfExperience: 22,
        features: [
          'Custom Web & Platform Development',
          'IT Infrastructure Consulting',
          'Software Project Delivery',
          'Client Expectation & SLA Management'
        ],
        tag: 'BSR IT Solutions'
      },
      {
        id: 'srv-2',
        title: 'Contract Staffing & Strategic Talent Acquisition',
        description: 'Pioneered contract staffing marketplace platforms (Oncontract.com / StaffOnContract.com / calify.io) connecting enterprise IT leaders with right talent through right channels.',
        iconName: 'Presentation',
        yearsOfExperience: 15,
        features: [
          'Online Contract Staffing Platform Delivery',
          'Executive & IT Talent Acquisition',
          'Vendor & Advisory Council Alignment',
          'Solution & Delivery Operations'
        ],
        tag: 'Staffing & Platform'
      },
      {
        id: 'srv-3',
        title: 'CSR Project Management & RO Water Infrastructure',
        description: 'Structuring and executing corporate social responsibility (CSR) funding for large-scale rural drinking water purification infrastructure.',
        iconName: 'HeartHandshake',
        yearsOfExperience: 10,
        features: [
          'Corporate CSR Fund Raising (₹31+ Lakhs)',
          'RO Plant Installation & Panchayat Handover',
          'Rural Community Water Sanitation',
          'Lions & Corporate Stakeholder Coordination'
        ],
        tag: 'CSR & Clean Water'
      },
      {
        id: 'srv-4',
        title: 'Youth Sports & Family Calorie Balance Initiatives',
        description: 'Founding WIN5M.com to manage stress levels, encourage sports participation in youngsters, and help families achieve active lifestyle balance.',
        iconName: 'TrendingUp',
        yearsOfExperience: 10,
        features: [
          'Youth Sports Talent Identification',
          'Family Physical Activity Guidance',
          'Stress Management Workshops',
          'Community Sports Partnerships'
        ],
        tag: 'WIN5M Community'
      }
    ]
  },

  hobbies: {
    heading: 'HOBBIES & PERSONAL PASSIONS',
    subheading: 'Active Community Engagement, Health & Global Social Fellowship',
    description: 'Extending leadership into blood donation drives, youth sports development, city networking platforms, and international social interactions.',
    hobbies: [
      {
        id: 'hob-1',
        title: 'Youth Sports Development & Calorie Balance',
        category: 'Sports & Wellness',
        description: 'Passionate about sports talent identification in youngsters, family stress management, and daily physical activity through WIN5M.com.',
        iconName: 'Trophy',
        image: '',
        highlights: ['WIN5M Community Unit', 'Youth Talent Promotion']
      },
      {
        id: 'hob-2',
        title: 'Blood Donation Drives & Pulse Polio Movement',
        category: 'Social Service',
        description: 'Regular voluntary blood donor and active campaigner for Pulse Polio immunization drives across Bangalore.',
        iconName: 'Palette',
        image: '',
        highlights: ['Rotary Banashankari Leadership', 'Regular Donor']
      },
      {
        id: 'hob-3',
        title: 'City Platforms & Digital Networking',
        category: 'Community Tech',
        description: 'Creating Bangalorean.com to connect Bangaloreans globally and foster local civic & humanitarian collaboration.',
        iconName: 'Watch',
        image: '',
        highlights: ['Bangalorean.com Founder', 'Global Community Connect']
      },
      {
        id: 'hob-4',
        title: 'International Travel & Cultural Fellowship',
        category: 'Global Exchange',
        description: 'Travelling internationally to engage with Lions Clubs leaders across Nepal (Districts 325 B1/B2) and Singapore (District 309).',
        iconName: 'Compass',
        image: '',
        highlights: ['Nepal Lions Interaction', 'Singapore District 309 Visit']
      }
    ]
  },

  career: {
    heading: 'CAREER TRAJECTORY & EXPERIENCE',
    subheading: 'Over 22 Years of Entrepreneurial Leadership, Staffing Innovation & Academic Consulting',
    resumeUrl: '#download-resume',
    experiences: [
      {
        id: 'car-1',
        organization: 'BSR IT Solutions Private Limited',
        designation: 'Co-Founder & CEO',
        duration: 'Sep 2003 - Present (22 yrs 11 mos)',
        location: 'Bengaluru, Karnataka, India',
        type: 'Corporate',
        responsibilities: [
          'Serving as driving force behind web development, staffing services, and IT solution delivery operations.',
          'Holding key positions in client acquisition, service industry challenges, and successful execution.',
          'Pioneering WIN5M.com community partnership unit for youth sports and family health balance.'
        ],
        keyAchievements: [
          'Successfully built and sustained 22+ years of enterprise IT service operations.',
          'Launched WIN5M community initiative for stress management and sports talent in kids.'
        ]
      },
      {
        id: 'car-2',
        organization: 'Bangalorean.com',
        designation: 'Founder',
        duration: 'Jun 2015 - Present (11 yrs 2 mos)',
        location: 'Bengaluru Area, India',
        type: 'Leadership',
        responsibilities: [
          'Creating a global digital platform for Bangaloreans with primary focus on humanitarian causes and city networking.',
          'Scaling platform services across metros and cities in India.'
        ],
        keyAchievements: [
          'Established an upgraded digital yellow pages & social platform for Bengaluru.'
        ]
      },
      {
        id: 'car-3',
        organization: 'StaffOnContract.com / Oncontract.com (now calify.io)',
        designation: 'Head of Business Management / Head of Sales & Delivery, India',
        duration: 'Apr 2011 - Jul 2012 (1 yr 4 mos)',
        location: 'Bengaluru, Chennai, Hyderabad',
        type: 'Corporate',
        responsibilities: [
          'Held unique leadership position for sales, delivery, and online contract staffing marketplace.',
          'Collaborated with advisory council and industry mentors from Citibank, Bank of Baroda, and Oracle Financial Software Services.'
        ],
        keyAchievements: [
          'Executed online contract staffing platform serving top IT firms like TCS, Patni, Hexaware, Mastek, and L&T Infotech.'
        ]
      },
      {
        id: 'car-4',
        organization: 'Brilliant Tutorials - South Bangalore',
        designation: 'Academic Consultant',
        duration: 'Prior Leadership',
        location: 'Bengaluru, India',
        type: 'Advisory',
        responsibilities: [
          'Involved in identifying, implementing, and sustaining computer education programs for south zone, Bangalore.'
        ],
        keyAchievements: [
          'Strengthened academic computer education infrastructure across South Bangalore.'
        ]
      },
      {
        id: 'car-5',
        organization: 'Wipro Technologies',
        designation: 'Trainee',
        duration: 'Feb 2002 - Apr 2002 (3 mos)',
        location: 'Bengaluru, India',
        type: 'Corporate',
        responsibilities: [
          'Completed live project as part of final semester Master in Information Technology (MIT) from Sikkim Manipal University.'
        ],
        keyAchievements: [
          'Gained hands-on software development training at Wipro Technologies.'
        ]
      }
    ],
    certificatesAndAwards: [
      {
        id: 'cert-1',
        title: 'Master in Business Administration (MBA)',
        issuer: 'Postgraduate Degree',
        year: 'Academic Qualification',
        type: 'Certificate',
        description: 'Advanced degree in business administration and strategic management.'
      },
      {
        id: 'cert-2',
        title: 'Master in Information Technology (MIT)',
        issuer: 'Sikkim Manipal University (Distance Education)',
        year: 'Academic Qualification',
        type: 'Certificate',
        description: 'Completed final semester live project at Wipro Technologies.'
      },
      {
        id: 'cert-3',
        title: 'Bachelor in Business Administration (BBA)',
        issuer: 'Undergraduate Degree',
        year: 'Academic Qualification',
        type: 'Certificate',
        description: 'Foundational degree in business management and administration.'
      },
      {
        id: 'cert-4',
        title: 'Rotary President Leadership Honor (2013-14)',
        issuer: 'Rotary International District 3190',
        year: '2013-2014',
        type: 'Award',
        description: 'Awarded for leading transformation of Rotary Bangalore Banashankari (RBB) and Pulse Polio drives.'
      },
      {
        id: 'cert-5',
        title: 'Lions Charter Secretary & RO Water Project Honor',
        issuer: 'Lions Clubs International District 317F',
        year: '2021-2022',
        type: 'Award',
        description: 'Recognized for establishing LCB Brigade & raising ₹31+ Lakhs CSR funds for 3 rural RO water plants.'
      }
    ]
  },

  activities: {
    heading: 'MY ACTIVITIES',
    subheading: 'Service Missions, Governance Meetings & Global Fellowship Delegations',
    description: 'Explore video highlights of community service initiatives, Lions & Rotary leadership meetings, and international travel activities.',
    activities: [
      {
            "id": "act-1",
            "youtubeId": "7bql4N4bHP0",
            "url": "https://youtu.be/7bql4N4bHP0",
            "title": "Saplings Plantation @ Bangalore University by LCB Brigade",
            "category": "Service Activities",
            "description": "Tree saplings plantation drive at Bangalore University campus organized by Lions Club of Bangalore Brigade in association with Kshiti NGO and BMS Engineering College students.",
            "hashtags": [
                  "#TreePlantation",
                  "#BangaloreUniversity",
                  "#LCBBrigade",
                  "#GreenEnvironment",
                  "#BMSEngineering"
            ],
            "date": "2022",
            "location": "Bangalore University, Bengaluru"
      },
      {
            "id": "act-2",
            "youtubeId": "pba08VV2ivc",
            "url": "https://youtu.be/pba08VV2ivc",
            "title": "Lions International Peace Poster Contest by LCB Brigade",
            "category": "Service Activities",
            "description": "Organizing the prestigious annual Lions International Peace Poster Contest for school children to foster global harmony, creativity, and peace awareness.",
            "hashtags": [
                  "#PeacePoster",
                  "#LionsInternational",
                  "#LCBBrigade",
                  "#YouthArtContest",
                  "#PeaceAwareness"
            ],
            "date": "2022",
            "location": "Bengaluru"
      },
      {
            "id": "act-3",
            "youtubeId": "OIx6RYZcU1g",
            "url": "https://youtu.be/OIx6RYZcU1g",
            "title": "Sri Sai Old Age Home & Special School Outreach - Tavarekere",
            "category": "Service Activities",
            "description": "Humanitarian outreach visit providing food essentials, ration kits, and support at Sri Sai Old Age Home and Special School for Speech & Hearing Impaired children.",
            "hashtags": [
                  "#OldAgeHomeCare",
                  "#SpecialNeedsSupport",
                  "#LCBBrigade",
                  "#HumanitarianService",
                  "#Tavarekere"
            ],
            "date": "2022",
            "location": "Tavarekere, Karnataka"
      },
      {
            "id": "act-4",
            "youtubeId": "7LYRHWnGWtA",
            "url": "https://youtu.be/7LYRHWnGWtA",
            "title": "Corporate CSR Community Activity Supported by MPPL",
            "category": "Service Activities",
            "description": "Corporate Social Responsibility (CSR) social infrastructure project execution supported by MPPL to empower local community welfare.",
            "hashtags": [
                  "#CSRActivity",
                  "#MPPL",
                  "#CorporateCSR",
                  "#LCBBrigade",
                  "#CommunityWelfare"
            ],
            "date": "2022",
            "location": "Bengaluru Suburbs"
      },
      {
            "id": "act-5",
            "youtubeId": "B69jCJmMt7I",
            "url": "https://youtu.be/B69jCJmMt7I",
            "title": "Festive Sweets Distribution @ Morarji Desai School",
            "category": "Service Activities",
            "description": "Distributing festive sweets, nutritional snacks, and gifts for residential school students at Morarji Desai Residential School in Doddamaralavadi.",
            "hashtags": [
                  "#ChildWelfare",
                  "#MorarjiDesaiSchool",
                  "#Doddamaralavadi",
                  "#LCBBrigade",
                  "#FestiveGiving"
            ],
            "date": "2022",
            "location": "Doddamaralavadi, Karnataka"
      },
      {
            "id": "act-6",
            "youtubeId": "HLA6RZKN8nI",
            "url": "https://youtu.be/HLA6RZKN8nI",
            "title": "Blood Donation Camp @ Elita Promenade, JP Nagar",
            "category": "Service Activities",
            "description": "Organizing voluntary blood donation camp at Elita Promenade apartments, JP Nagar, collecting lifesaving blood units for hospital blood banks.",
            "hashtags": [
                  "#BloodDonation",
                  "#JPNagar",
                  "#ElitaPromenade",
                  "#SaveLives",
                  "#LionsService"
            ],
            "date": "2022",
            "location": "JP Nagar, Bengaluru"
      },
      {
            "id": "act-7",
            "youtubeId": "XBxI4KEQggU",
            "url": "https://youtu.be/XBxI4KEQggU",
            "title": "Mega Voluntary Blood Donation Camp - LCB Brigade",
            "category": "Service Activities",
            "description": "Mega blood donation drive organized by Lions Club of Bangalore Brigade to combat blood bank shortages across hospitals in Bengaluru.",
            "hashtags": [
                  "#BloodDonationCamp",
                  "#LCBBrigade",
                  "#LionsDistrict317F",
                  "#SaveLives",
                  "#VoluntaryDonor"
            ],
            "date": "2022",
            "location": "Bengaluru"
      },
      {
            "id": "act-8",
            "youtubeId": "Y716AwBBz8U",
            "url": "https://youtu.be/Y716AwBBz8U",
            "title": "Academic Notebooks Distribution Drive by LCB Brigade",
            "category": "Service Activities",
            "description": "Providing high-quality free academic notebooks and stationery supply kits to government school students to encourage continuous education.",
            "hashtags": [
                  "#NotebookDistribution",
                  "#EducationSupport",
                  "#LCBBrigade",
                  "#EmpowerStudents",
                  "#StudentWelfare"
            ],
            "date": "2022",
            "location": "Bengaluru"
      },
      {
            "id": "act-9",
            "youtubeId": "MiidO7Yo4a4",
            "url": "https://youtu.be/MiidO7Yo4a4",
            "title": "Free Eye Cataract Screening & Surgery Camp - LCB Brigade",
            "category": "Service Activities",
            "description": "Free eye cataract screening camp and fully sponsored surgical procedures for elderly underprivileged residents.",
            "hashtags": [
                  "#EyeCare",
                  "#CataractSurgery",
                  "#VisionSight",
                  "#LCBBrigade",
                  "#FreeEyeCamp"
            ],
            "date": "2022",
            "location": "Bengaluru Suburbs"
      },
      {
            "id": "act-10",
            "youtubeId": "s5fwZnhiMp4",
            "url": "https://youtu.be/s5fwZnhiMp4",
            "title": "365 Days Full Meals Hunger Relief Mission - District 317F",
            "category": "Service Activities",
            "description": "Year-round 365 Days Full Meals hunger relief project serving wholesome warm meals daily to needy urban and rural populations.",
            "hashtags": [
                  "#365FullMeals",
                  "#HungerRelief",
                  "#LionsDistrict317F",
                  "#ZeroHunger",
                  "#FeedTheNeedy"
            ],
            "date": "2023",
            "location": "District 317F Region"
      },
      {
            "id": "act-11",
            "youtubeId": "f91sLBEd9LU",
            "url": "https://youtu.be/f91sLBEd9LU",
            "title": "Lions District 317F Mega Hunger Relief Food Distribution",
            "category": "Service Activities",
            "description": "Direct food package and cooked meal distribution drive led by Lions International District 317F across vulnerable communities.",
            "hashtags": [
                  "#HungerRelief",
                  "#LionsDistrict317F",
                  "#CommunityService",
                  "#HumanitarianAid"
            ],
            "date": "2023",
            "location": "Karnataka"
      },
      {
            "id": "act-12",
            "youtubeId": "Jg-Q5_U0HpU",
            "url": "https://youtu.be/Jg-Q5_U0HpU",
            "title": "School Bags Distribution - 75th Independence Day Celebration",
            "category": "Service Activities",
            "description": "Commemorating 75th Azadi Ka Amrit Mahotsav by distributing durable school bags and learning kits to primary school students.",
            "hashtags": [
                  "#SchoolBagsDistribution",
                  "#75thIndependenceDay",
                  "#AzadiKaAmritMahotsav",
                  "#LCBBrigade"
            ],
            "date": "2022",
            "location": "Bengaluru"
      },
      {
            "id": "act-13",
            "youtubeId": "haH98KAMjt0",
            "url": "https://youtu.be/haH98KAMjt0",
            "title": "COVID Booster Vaccination Drive @ Harohalli Industrial Area",
            "category": "Service Activities",
            "description": "Free COVID-19 booster vaccination camp conducted for factory workers and daily wage laborers in Harohalli Industrial Cluster.",
            "hashtags": [
                  "#BoosterVaccination",
                  "#HarohalliIndustries",
                  "#PublicHealth",
                  "#LionsCare",
                  "#WorkerWelfare"
            ],
            "date": "2022",
            "location": "Harohalli, Karnataka"
      },
      {
            "id": "act-14",
            "youtubeId": "drQDyIhysnk",
            "url": "https://youtu.be/drQDyIhysnk",
            "title": "Voluntary Blood Donation Drive - 22nd August 2022",
            "category": "Service Activities",
            "description": "Annual voluntary blood donation drive organized by LCB Brigade collecting over 150+ blood units for emergency hospital cases.",
            "hashtags": [
                  "#BloodDonation",
                  "#LCBBrigade",
                  "#HealthService",
                  "#SaveLives",
                  "#LionsDistrict317F"
            ],
            "date": "2022",
            "location": "Bengaluru"
      },
      {
            "id": "act-15",
            "youtubeId": "v_-ALSiubYg",
            "url": "https://youtu.be/v_-ALSiubYg",
            "title": "10,000 Tree Saplings Plantation Drive on 15th August",
            "category": "Service Activities",
            "description": "Mega green initiative planting 10,000 tree saplings across urban parks and green belts on Independence Day.",
            "hashtags": [
                  "#10000TreeSaplings",
                  "#15thAugust",
                  "#GreenIndia",
                  "#LCBBrigade",
                  "#GoGreen"
            ],
            "date": "2022",
            "location": "Bengaluru"
      },
      {
            "id": "act-16",
            "youtubeId": "C2JiL_Em1ww",
            "url": "https://youtu.be/C2JiL_Em1ww",
            "title": "Free Notebooks & Education Kits Distribution Drive",
            "category": "Service Activities",
            "description": "Educational kit and notebook distribution campaign supporting children in government primary schools.",
            "hashtags": [
                  "#NotebookDistribution",
                  "#StudentSupport",
                  "#EducationForLight",
                  "#LCBBrigade"
            ],
            "date": "2022",
            "location": "Bengaluru"
      },
      {
            "id": "act-17",
            "youtubeId": "1wuM86TaEXI",
            "url": "https://youtu.be/1wuM86TaEXI",
            "title": "20,500 Tree Saplings Distribution Drive @ Kollegala",
            "category": "Service Activities",
            "description": "Massive environmental conservation drive distributing 20,500 tree saplings to rural farmers and school green clubs in Kollegala.",
            "hashtags": [
                  "#20500TreeSaplings",
                  "#Kollegala",
                  "#GreenEarth",
                  "#EnvironmentalCSR",
                  "#Afforestation"
            ],
            "date": "2022",
            "location": "Kollegala, Karnataka"
      },
      {
            "id": "act-18",
            "youtubeId": "k3Jdo7iHqJU",
            "url": "https://youtu.be/k3Jdo7iHqJU",
            "title": "Student Eye Screening Camp @ Morarji Desai School Maralavadi",
            "category": "Service Activities",
            "description": "Comprehensive vision checkup and eye health screening camp for students at Morarji Desai Residential School in Maralavadi.",
            "hashtags": [
                  "#EyeScreening",
                  "#ChildVision",
                  "#MorarjiDesaiSchool",
                  "#Maralavadi",
                  "#LionsHealth"
            ],
            "date": "2023",
            "location": "Maralavadi, Karnataka"
      },
      {
            "id": "act-19",
            "youtubeId": "0qcRye41bQM",
            "url": "https://youtu.be/0qcRye41bQM",
            "title": "Green Environment Tree Plantation Drive by LCB Brigade",
            "category": "Service Activities",
            "description": "Tree sapling plantation and environmental awareness campaign organized by Lions Club of Bangalore Brigade.",
            "hashtags": [
                  "#TreePlantation",
                  "#LCBBrigade",
                  "#GoGreen",
                  "#CleanEnvironment",
                  "#LionsService"
            ],
            "date": "2023",
            "location": "Bengaluru"
      },
      {
            "id": "act-20",
            "youtubeId": "BKlGVJJBaD4",
            "url": "https://youtu.be/BKlGVJJBaD4",
            "title": "4,000 Academic Notebooks Distribution Campaign - LCB Brigade",
            "category": "Service Activities",
            "description": "Mega educational outreach distributing 4,000 notebooks to students across government primary and high schools.",
            "hashtags": [
                  "#4000Notebooks",
                  "#EducationDrive",
                  "#LCBBrigade",
                  "#StudentEmpowerment"
            ],
            "date": "2023",
            "location": "Bengaluru"
      },
      {
            "id": "act-21",
            "youtubeId": "mY31Vygv_Dk",
            "url": "https://youtu.be/mY31Vygv_Dk",
            "title": "Hunger Relief Meal Service @ KC General Hospital",
            "category": "Service Activities",
            "description": "Free hot meal distribution for patient attendants, daily laborers, and visitors outside KC General Hospital, Malleshwaram.",
            "hashtags": [
                  "#HungerRelief",
                  "#KCGeneralHospital",
                  "#LCBBrigade",
                  "#FoodForLife",
                  "#Malleshwaram"
            ],
            "date": "2023",
            "location": "KC General Hospital, Bengaluru"
      },
      {
            "id": "act-22",
            "youtubeId": "y-JO_MgeFrE",
            "url": "https://youtu.be/y-JO_MgeFrE",
            "title": "District 317F Sponsored Notebook Distribution Drive",
            "category": "Service Activities",
            "description": "District 317F supported notebook distribution drive helping students prepare for academic examinations.",
            "hashtags": [
                  "#NotebookDistribution",
                  "#District317F",
                  "#LCBBrigade",
                  "#EducationSupport"
            ],
            "date": "2023",
            "location": "Bengaluru"
      },
      {
            "id": "act-23",
            "youtubeId": "0SAEv5s6Pxk",
            "url": "https://youtu.be/0SAEv5s6Pxk",
            "title": "Doctors Day Special Blood Donation Camp - 1st July",
            "category": "Service Activities",
            "description": "National Doctors Day special voluntary blood donation camp organized by Lions Brigade District 317F.",
            "hashtags": [
                  "#DoctorsDay",
                  "#BloodDonationCamp",
                  "#LionsDistrict317F",
                  "#LCBBrigade",
                  "#1stJuly"
            ],
            "date": "2023",
            "location": "Bengaluru"
      },
      {
            "id": "act-24",
            "youtubeId": "6giu9K-2HJo",
            "url": "https://youtu.be/6giu9K-2HJo",
            "title": "Walkathon for Vision Awareness - Lions District 317F",
            "category": "Service Activities",
            "description": "Public awareness Walkathon promoting eye donation, sight preservation, and vision care across Bengaluru city.",
            "hashtags": [
                  "#WalkathonForVision",
                  "#EyeAwareness",
                  "#District317F",
                  "#LionsWalkathon",
                  "#EyeDonation"
            ],
            "date": "2023",
            "location": "Bengaluru"
      },
      {
            "id": "act-25",
            "youtubeId": "AeDqbQB4P50",
            "url": "https://youtu.be/AeDqbQB4P50",
            "title": "Mental Health Awareness & Notebook Distribution - LCB Brigade",
            "category": "Service Activities",
            "description": "Mental Health Awareness workshop and notebook distribution program organized by LCB Brigade for high school students.",
            "hashtags": [
                  "#MentalHealthAwareness",
                  "#NotebookDistribution",
                  "#LCBBrigade",
                  "#CommunityWellness"
            ],
            "date": "2024",
            "location": "Bengaluru"
      },
      {
            "id": "act-26",
            "youtubeId": "zvCxyuM1iMU",
            "url": "https://youtu.be/zvCxyuM1iMU",
            "title": "International Yoga Day & LCB Brigade Installation Ceremony",
            "category": "Meetings",
            "description": "International Yoga Day session followed by the official Installation Ceremony of incoming club officers of Lions Club of Bangalore Brigade.",
            "hashtags": [
                  "#InstallationCeremony",
                  "#InternationalYogaDay",
                  "#LCBBrigade",
                  "#ClubGovernance",
                  "#LionsLeadership"
            ],
            "date": "2022",
            "location": "Bengaluru"
      },
      {
            "id": "act-27",
            "youtubeId": "Sosy7exzdd8",
            "url": "https://youtu.be/Sosy7exzdd8",
            "title": "District 317F Officers Cabinet Schooling @ RG Royal Hotel",
            "category": "Meetings",
            "description": "Official Lions District 317F Cabinet Officers Schooling and Leadership Orientation conclave held at RG Royal Hotel.",
            "hashtags": [
                  "#District317FSchooling",
                  "#RGRoyal",
                  "#LionsLeadership",
                  "#CabinetOrientation",
                  "#DistrictGovernance"
            ],
            "date": "2022",
            "location": "RG Royal Hotel, Bengaluru"
      },
      {
            "id": "act-28",
            "youtubeId": "_3KeAJe0kIo",
            "url": "https://youtu.be/_3KeAJe0kIo",
            "title": "Joint Meeting - LCB Sheshadripuram & LCB Brigade (22nd July)",
            "category": "Meetings",
            "description": "Joint club governance and service planning meeting between Lions Club of Bangalore Seshadripuram and Lions Club of Bangalore Brigade.",
            "hashtags": [
                  "#JointMeeting",
                  "#LCBSheshadripuram",
                  "#LCBBrigade",
                  "#LionsFellowship",
                  "#InterClubGovernance"
            ],
            "date": "2022",
            "location": "Bengaluru"
      },
      {
            "id": "act-29",
            "youtubeId": "5TbN7bT4j8s",
            "url": "https://youtu.be/5TbN7bT4j8s",
            "title": "October Octaves Annual District Fellowship & Cultural Meet",
            "category": "Meetings",
            "description": "October Octaves annual district fellowship gathering and regional governance meeting held on 15th October 2022.",
            "hashtags": [
                  "#OctoberOctaves",
                  "#LionsDistrict317F",
                  "#FellowshipMeet",
                  "#DistrictConclave"
            ],
            "date": "2022",
            "location": "Bengaluru"
      },
      {
            "id": "act-30",
            "youtubeId": "cxmcvzgNryc",
            "url": "https://youtu.be/cxmcvzgNryc",
            "title": "Lions District 317F Region & Zone Officers Governance Review",
            "category": "Meetings",
            "description": "Official District 317F Region & Zone Officers Governance and Club Performance Review Meeting held on 18th August 2023.",
            "hashtags": [
                  "#DistrictMeeting",
                  "#District317F",
                  "#LionsGovernance",
                  "#RegionChairperson"
            ],
            "date": "2023",
            "location": "Bengaluru"
      },
      {
            "id": "act-31",
            "youtubeId": "6YHCTtMRj6o",
            "url": "https://youtu.be/6YHCTtMRj6o",
            "title": "District 317F Cabinet Executive Review & Planning Meeting",
            "category": "Meetings",
            "description": "District 317F Cabinet Committee Progress and Project Allocation Review Meeting held on 19th September 2023.",
            "hashtags": [
                  "#CabinetMeeting",
                  "#District317F",
                  "#LionsLeadership",
                  "#ProjectReview"
            ],
            "date": "2023",
            "location": "Bengaluru"
      },
      {
            "id": "act-32",
            "youtubeId": "16xdFdUQk50",
            "url": "https://youtu.be/16xdFdUQk50",
            "title": "District 317F Cabinet Schooling @ Kings Meadows (June 2024)",
            "category": "Meetings",
            "description": "Two-day intensive Cabinet Schooling and governance workshop for District 317F Cabinet Officers at Kings Meadows.",
            "hashtags": [
                  "#CabinetSchooling",
                  "#KingsMeadows",
                  "#District317F",
                  "#LeadershipGovernance"
            ],
            "date": "2024",
            "location": "Kings Meadows, Bengaluru"
      },
      {
            "id": "act-33",
            "youtubeId": "FES2ZzNoPK0",
            "url": "https://youtu.be/FES2ZzNoPK0",
            "title": "Lions Club Leadership & Advisory Board Governance Review",
            "category": "Meetings",
            "description": "Lions Club Leadership and Advisory Board Review Meeting addressing district club growth and member retention.",
            "hashtags": [
                  "#AdvisoryMeeting",
                  "#LionsDistrict317F",
                  "#Governance",
                  "#ClubLeadership"
            ],
            "date": "2024",
            "location": "Bengaluru"
      },
      {
            "id": "act-34",
            "youtubeId": "qRGOS_ZuUA8",
            "url": "https://youtu.be/qRGOS_ZuUA8",
            "title": "Regional Leadership Greet & Meet @ Ferns International",
            "category": "Meetings",
            "description": "Regional Leadership Greet & Meet organized by Region Chairperson Ln. A.V. Nagaraj at Ferns International.",
            "hashtags": [
                  "#GreetAndMeet",
                  "#RegionChairperson",
                  "#FernsInternational",
                  "#LionsDistrict317F"
            ],
            "date": "2024",
            "location": "Ferns International, Bengaluru"
      },
      {
            "id": "act-35",
            "youtubeId": "6pLOPDAW01A",
            "url": "https://youtu.be/6pLOPDAW01A",
            "title": "SkyDive Dubai - International Adventure Travel Experience",
            "category": "Travel Activities",
            "description": "International adventure travel experience – Tandem Skydiving over Palm Jumeirah in Dubai.",
            "hashtags": [
                  "#SkyDiveDubai",
                  "#DubaiTravel",
                  "#AdventureTravel",
                  "#InternationalExperience"
            ],
            "date": "2023",
            "location": "Dubai, UAE"
      },
      {
            "id": "act-36",
            "youtubeId": "rh_VJrX7nMQ",
            "url": "https://youtu.be/rh_VJrX7nMQ",
            "title": "Kannada Cinema & Cultural Event Travel - Jog 101",
            "category": "Travel Activities",
            "description": "Cultural travel engagement and movie review coverage for Kannada suspense thriller Jog 101.",
            "hashtags": [
                  "#Jog101",
                  "#KannadaCinema",
                  "#CulturalTravel",
                  "#MediaReview"
            ],
            "date": "2024",
            "location": "Bengaluru"
      },
      {
            "id": "act-37",
            "youtubeId": "IRN6S2BwPoQ",
            "url": "https://youtu.be/IRN6S2BwPoQ",
            "title": "Regional Lions Leadership Institute (RLLI) @ Goa 2024",
            "category": "Travel Activities",
            "description": "Traveling to Goa for the Regional Lions Leadership Institute (RLLI) 2024 training conclave representing District 317.",
            "hashtags": [
                  "#RLLI2024",
                  "#GoaTravel",
                  "#LionsInstitute",
                  "#LeadershipTraining",
                  "#District317"
            ],
            "date": "2024",
            "location": "Goa, India"
      },
      {
            "id": "act-38",
            "youtubeId": "ZCSE2uJqgVg",
            "url": "https://youtu.be/ZCSE2uJqgVg",
            "title": "RLLI 2024 Leadership Delegation & Travel Workshop",
            "category": "Travel Activities",
            "description": "Travel & participation in Regional Lions Leadership Institute (RLLI) 2024 executive training modules.",
            "hashtags": [
                  "#RLLIGoa",
                  "#LionsLeadership",
                  "#TravelConclave",
                  "#District317F"
            ],
            "date": "2024",
            "location": "Goa, India"
      },
      {
            "id": "act-39",
            "youtubeId": "nzC4vdw6R8M",
            "url": "https://youtu.be/nzC4vdw6R8M",
            "title": "Regional Lions Leadership Institute Official Delegation 2024",
            "category": "Travel Activities",
            "description": "Official delegation travel for the Regional Lions Leadership Institute (RLLI) 2024 conclave sessions.",
            "hashtags": [
                  "#RegionalInstitute",
                  "#LionsDelegation",
                  "#Goa2024",
                  "#District317"
            ],
            "date": "2024",
            "location": "Goa, India"
      },
      {
            "id": "act-40",
            "youtubeId": "3XjILeBVdzc",
            "url": "https://youtu.be/3XjILeBVdzc",
            "title": "RLLI 2024 Executive Delegation @ Goa",
            "category": "Travel Activities",
            "description": "Executive travel delegation highlights at Regional Lions Leadership Institute 2024 in Goa.",
            "hashtags": [
                  "#GoaDelegation",
                  "#RLLIGoa2024",
                  "#LionsInstitute",
                  "#GlobalLeadership"
            ],
            "date": "2024",
            "location": "Goa, India"
      },
      {
            "id": "act-41",
            "youtubeId": "IZvruxv-hC0",
            "url": "https://youtu.be/IZvruxv-hC0",
            "title": "Karnataka Rajyotsava Cultural Celebration - District 317F",
            "category": "Travel Activities",
            "description": "Regional travel & stage celebration for Karnataka Rajyotsava organized by Lions International District 317F.",
            "hashtags": [
                  "#KarnatakaRajyotsava",
                  "#District317F",
                  "#CulturalCelebration",
                  "#StatePride"
            ],
            "date": "2023",
            "location": "Bengaluru"
      }
]
  }
};
