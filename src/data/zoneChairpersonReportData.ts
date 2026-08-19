export interface ZoneEventItem {
  id: string;
  date: string;
  title: string;
  category: 'Service' | 'Installation' | 'Governance' | 'Leadership & Training' | 'Youth & Leo' | 'Sports & Fellowship';
  location?: string;
  hostClub?: string;
  dignitaries?: string[];
  description: string;
  highlights?: string[];
  cost?: string;
  impactMetrics?: string;
}

export interface ZoneClubReview {
  id: string;
  clubName: string;
  type: 'Home Club' | 'Pioneer Club' | 'Virtual / Corporate Club' | 'Locality Service Club';
  leadership: {
    president?: string;
    secretary?: string;
    treasurer?: string;
    firstVP?: string;
    keyLeaders?: string[];
  };
  overview: string;
  strengths: string[];
  keyActivities: string[];
  recommendations: string;
  statusBadge: string;
}

export interface DGAMItem {
  number: string;
  title: string;
  date: string;
  time?: string;
  venue: string;
  hostClub: string;
  chiefGuestOrLeaders: string[];
  description: string;
  keyOutcomes: string[];
}

export interface ZoneChairpersonReportData {
  title: string;
  subtitle: string;
  region: string;
  zone: string;
  tenure: string;
  chairperson: {
    name: string;
    designation: string;
    district: string;
    email: string;
    homeClub: string;
    ldsfRole: string;
    profileSummary: string;
  };
  internationalDignitaryInteraction: {
    leader: string;
    role: string;
    event: string;
    hospital: string;
    description: string;
  };
  summaryStats: {
    label: string;
    value: string;
    sublabel: string;
  }[];
  eventsTimeline: ZoneEventItem[];
  clubsReview: ZoneClubReview[];
  dgams: DGAMItem[];
  zoneSocials: {
    title: string;
    date: string;
    time: string;
    venue: string;
    speaker: string;
    speakerTopic: string;
    host: string;
    description: string;
  };
  concludingRemarks: {
    acknowledgements: string[];
    personalReflection: string;
    availabilityStatement: string;
  };
  galleryImages: {
    id: string;
    src: string;
    caption: string;
    category: string;
  }[];
}

export const zoneChairpersonReportData: ZoneChairpersonReportData = {
  title: 'ZONE Chairperson Report',
  subtitle: 'Region VI, Zone I — Official Administration, Club Governance & Service Highlights',
  region: 'Region VI',
  zone: 'Zone I',
  tenure: '2024 – 2025',
  chairperson: {
    name: 'Ln. B.S. Ramesh, MJF',
    designation: 'Zone Chairperson (2024–2025)',
    district: 'Lions International District 317F',
    email: 'ramebs76@gmail.com',
    homeClub: 'Lions Club of Bangalore Brigade (LCB Brigade)',
    ldsfRole: 'LDSF Trustee (2023–2026)',
    profileSummary: 'Past President & Charter Secretary of LCB Brigade, leading Zone 1 governance, club stewardship, and district-wide humanitarian drives across Bangalore.'
  },
  internationalDignitaryInteraction: {
    leader: 'Ln. Mark Lyon (2nd International Vice President, Lions International)',
    role: '2nd International Vice President & Spouse',
    event: 'LDSF 10 Dialysis Machine Inauguration Project',
    hospital: 'Sathya Sri Hospital / Shirdi Sai Hospital',
    description: 'High-level diplomatic and service interaction with 2nd International Vice President Ln. Mark Lyon and his wife during their official India visit, showcasing District 317F and LDSF healthcare dialysis infrastructure.'
  },
  summaryStats: [
    { label: 'Clubs Governed', value: '4', sublabel: 'Zone 1 Active Clubs' },
    { label: 'DGAMs Conducted', value: '4 + 1 ZAM', sublabel: '100% Meeting Quorum' },
    { label: 'CSR Infrastructure', value: '₹31+ Lakhs', sublabel: '3 Rural RO Water Plants' },
    { label: 'Direct Service Aid', value: '₹3.0+ Lakhs', sublabel: 'Rice, Medical Flasks & Diapers' },
    { label: 'Educational Impact', value: '5,000+', sublabel: 'Notebooks Distributed' },
    { label: 'Leadership Milestone', value: 'RLLI Goa', sublabel: 'Multiple Council Graduate' }
  ],
  eventsTimeline: [
    {
      id: 'ze-1',
      date: '22nd June 2024',
      title: 'Pediatric Healthcare Support & Diaper Distribution',
      category: 'Service',
      location: 'Children’s Ward, Jayanagar General Hospital, Bengaluru',
      hostClub: 'LCB Brigade in association with District 317A',
      dignitaries: ['Ln. Venkatnarashimlu', 'Ln. Krishna (District 317A)', 'LCB Brigade PST & Members', 'Hospital Management Team'],
      description: 'Distributed free diapers and pediatric care essentials to underprivileged mothers and infant patients in the Jayanagar General Hospital Children’s Ward.',
      highlights: ['Direct pediatric health relief', 'Inter-district collaboration with District 317A', 'Hospital administration partnership']
    },
    {
      id: 'ze-2',
      date: '23rd June 2024',
      title: 'LCB Cosmos 2024–25 Officers Installation',
      category: 'Installation',
      location: 'Indiranagar Club, Bengaluru',
      hostClub: 'LCB Cosmos',
      dignitaries: ['PDG Ln. Giridhar (Installing Officer)', 'RC Ln. A.V. Nagaraj', 'Ln. Arjun (Installed President) & Team'],
      description: 'PDG Ln. Giridhar installed President Ln. Arjun and his executive board. Present alongside Region Chairperson Ln. A.V. Nagaraj to mentor club service roadmap.',
      highlights: ['Leadership succession', 'Multi-generational Lionism representation']
    },
    {
      id: 'ze-3',
      date: '27th June 2024',
      title: 'LCB Brigade 2024–25 Executive Board Installation',
      category: 'Installation',
      location: 'Bengaluru',
      hostClub: 'LCB Brigade (Home Club)',
      dignitaries: ['PDG Ln. Giridhar (Installing Officer)', 'President Ln. Sumanth M.J.', 'Secretary Ln. Raman Reddy', 'Treasurer Ln. Chandrashekar Gowda'],
      description: 'Installation of President Ln. Sumanth M.J. and his leadership board for 2024–25 by PDG Ln. Giridhar, inaugurating a year of intense CSR and hunger relief drives.',
      highlights: ['Home club charter year continuation', 'Setting ambitious ₹3+ Lakhs direct service targets']
    },
    {
      id: 'ze-4',
      date: '28th June 2024',
      title: 'LCB Zen Officers Installation',
      category: 'Installation',
      location: 'Koramangala Club, Bengaluru',
      hostClub: 'LCB Zen',
      dignitaries: ['1st VDG Ln. Akash Suvarna (Installing Officer)', 'Charter President Ln. Praveen Desai & Team'],
      description: '1st VDG Ln. Akash Suvarna installed Charter President Ln. Praveen Desai and the dynamic corporate/youth executive team of LCB Zen.',
      highlights: ['Virtual/corporate club model', 'Commitment to monthly on-ground service delivery']
    },
    {
      id: 'ze-5',
      date: '1st July 2024',
      title: '5,000 Notebooks Distribution — Signature Project',
      category: 'Service',
      location: 'Kanakapura Government School, Rural Bengaluru',
      hostClub: 'LCB Brigade in joint venture with Akruth Charitable Trust',
      dignitaries: ['Mr. B.V. Kumar (Akruth Charitable Trust)', 'LCB Brigade PST & Members'],
      description: 'Annual signature literacy initiative running for 3 consecutive years. Distributed 5,000 high-quality notebooks and stationery sets to underprivileged rural students.',
      impactMetrics: '5,000 Notebooks distributed to rural government school students',
      highlights: ['3-year sustained joint venture', 'Literacy and student education enablement']
    },
    {
      id: 'ze-6',
      date: 'Early Lionistic Year',
      title: 'Voluntary Blood Donation Camp @ KSSEM College',
      category: 'Service',
      location: 'KSSEM College, Kanakapura Road, Bengaluru',
      hostClub: 'LCB Brigade (Home Club)',
      dignitaries: ['RC Ln. A.V. Nagaraj', 'Ln. Chinnappa Thomas (DC for Blood Donation)', 'College Management & Student Donors'],
      description: 'Organized a mega voluntary blood donation drive to kick off the Lionistic year. Ln. Ramesh BS personally donated blood alongside student volunteers and Lions leaders.',
      highlights: ['Personal blood donation by ZC', 'Hundreds of life-saving units collected', 'Youth college engagement']
    },
    {
      id: 'ze-7',
      date: '13th July 2024',
      title: 'District Club Officers Schooling (PST Training)',
      category: 'Leadership & Training',
      location: 'Hotel RG Royals, Bengaluru',
      dignitaries: ['District Leadership Team', 'Zone 1 Club Presidents, Secretaries & Treasurers'],
      description: 'Participated and guided Zone 1 club officers through comprehensive schooling on reporting protocols, MyLCI/Lion Portal compliance, and annual budget planning.',
      highlights: ['Administrative alignment', 'Strengthening Zone 1 compliance']
    },
    {
      id: 'ze-8',
      date: '4th August 2024',
      title: 'District Cabinet Installation & Major Service Relief Launch',
      category: 'Service',
      location: 'Bengaluru District Headquarters',
      hostClub: 'LCB Brigade in joint collaboration with District 317F',
      dignitaries: ['District Governor Ln. Narayanaswamy', 'District Cabinet Officers'],
      description: 'Flagged off two major humanitarian drives on Cabinet Installation Day: (1) Distributed 100 bags (2,500 kg) of quality rice worth ₹1.5 Lakhs for hunger relief; (2) Distributed ₹1.5 Lakhs worth medical grade flasks/water fuel kits; (3) Launched Trail Networking App/Group for music, sports, and business networking across Multiple District.',
      cost: '₹3.0+ Lakhs (LCB Brigade contribution)',
      impactMetrics: '2,500 kg Quality Rice Bags + Flasks distributed',
      highlights: ['Major hunger relief', 'Digital Trail Networking launch', 'High-visibility District 317F collaboration']
    },
    {
      id: 'ze-9',
      date: '11th August 2024',
      title: 'Meet & Greet of Region VI (12 Clubs Forum)',
      category: 'Governance',
      location: 'Bengaluru',
      dignitaries: ['1st VDG Ln. Akash Suvarna (Chief Guest)', 'RC Ln. A.V. Nagaraj', '12 Club PSTs and Board Members'],
      description: 'Convened all 12 Club Presidents, Secretaries, and Treasurers across Region VI to foster inter-club camaraderie and align on District Governor performance metrics.',
      highlights: ['12 Clubs regional unity', 'Leadership alignment with 1st VDG']
    },
    {
      id: 'ze-10',
      date: '24th August 2024',
      title: 'Inauguration of Dialysis Facility with 2nd IVP Ln. Mark Lyon',
      category: 'Service',
      location: 'Shirdi Sai Hospital, Bengaluru',
      hostClub: 'Lions District Service Foundation (LDSF)',
      dignitaries: ['Ln. Mark Lyon (2nd International Vice President, LCI)', 'Mrs. Lyon', 'LDSF Trustees & District 317F Leaders'],
      description: 'Attended the official inauguration of the 10-dialysis machine healthcare project by LDSF. Interacted with 2nd International Vice President Ln. Mark Lyon and his wife, presenting district healthcare initiatives.',
      highlights: ['International leadership interaction', '10 Dialysis machines operationalized', 'LDSF Trustee representation']
    },
    {
      id: 'ze-11',
      date: '24th August 2024',
      title: 'Multiple District GAT Conclave',
      category: 'Leadership & Training',
      location: 'Multiple District 317',
      dignitaries: ['Global Action Team Leaders', 'District Governors & Zone Chairpersons'],
      description: 'Participated in the Global Action Team (GAT) Conclave focusing on Global Membership Approach (GMA), leadership pipeline building, and service impact scale.',
      highlights: ['GAT strategy implementation', 'Best practice exchange across Multiple 317']
    },
    {
      id: 'ze-12',
      date: '1st September 2024',
      title: 'Zone Chairperson Workshop by PDG Ln. Vaman',
      category: 'Leadership & Training',
      location: 'Bengaluru',
      dignitaries: ['PDG Ln. Vaman (Keynote Trainer)', 'District 317F Zone Chairpersons'],
      description: 'Advanced masterclass on effective zone administration, conflict resolution, club audit mechanisms, and conducting impactful DGAMs.',
      highlights: ['Zone governance protocols', 'Interactive dispute resolution modules']
    },
    {
      id: 'ze-13',
      date: '18th September 2024',
      title: '1st Zone Advisory Meeting (1st ZAM)',
      category: 'Governance',
      location: 'City Institute, Bengaluru',
      hostClub: 'LCB Brigade (Host Club)',
      dignitaries: ['GST District Coordinator (Chief Guest)', 'Zone 1 Club Presidents & Secretaries'],
      description: 'Conducted the 1st formal Zone Advisory Meeting (ZAM) of the year. Reviewed Q1 service reports, membership health, and district dues compliance across all 4 clubs.',
      highlights: ['100% Zone 1 attendance', 'Quarterly goal setting and review']
    },
    {
      id: 'ze-14',
      date: '19th September 2024',
      title: 'LCB Suraksha Officers Installation',
      category: 'Installation',
      location: 'Sri Raghavendra Swamy Mutt, Kavalbyrasandra, Bengaluru',
      hostClub: 'LCB Suraksha',
      dignitaries: ['PDG Ln. Giridhar (Installing Officer)', 'President Ln. Anand Gowda & Team', 'Ln. Manjanna', 'Leo Lions'],
      description: 'Installed President Ln. Anand Gowda and his team at Sri Raghavendra Swamy Mutt. Interacted with members and Leo Lions to encourage deeper district participation.',
      highlights: ['Grassroots community engagement', 'Spiritual center venue partnership']
    },
    {
      id: 'ze-15',
      date: '26th September 2024',
      title: 'Civic Engagement Keynote to BMSCE Engineering Students',
      category: 'Youth & Leo',
      location: 'BMS College of Engineering (BMSCE), Basavanagudi, Bengaluru',
      hostClub: 'In association with LEO Club of Bangalore Satva',
      dignitaries: ['BMSCE Faculty & Management', 'LEO Satva Leadership'],
      description: 'Delivered an inspiring address to hundreds of BMSCE engineering students on the transformative role of social and humanitarian organizations like Lions and Leos in shaping youth careers and community empathy.',
      highlights: ['Inspiring university youth', 'LEO Club partnership and recruitment']
    },
    {
      id: 'ze-16',
      date: '28th September – 1st October 2024',
      title: 'Regional Lions Leadership Institute (RLLI) — Goa Graduate',
      category: 'Leadership & Training',
      location: 'Goa (Multiple District 317)',
      dignitaries: ['Multiple Council Trainers', 'Senior PDGs & Faculty', 'Selected District Leaders'],
      description: 'Completed the rigorous 4-day residential RLLI executive leadership training program organized by Multiple Council 317 in Goa, mastering strategic team dynamics, speechcraft, and humanitarian project design.',
      highlights: ['Prestigious RLLI Certification', 'Advanced leadership and governance credentials']
    },
    {
      id: 'ze-17',
      date: '16th October 2024',
      title: 'Region VI Strategic Planning & Coordination Meet',
      category: 'Governance',
      location: 'Ambient Group Corporate Office, Bengaluru',
      dignitaries: ['RC Ln. A.V. Nagaraj', 'Zone Chairpersons & Region Leaders'],
      description: 'Hosted executive discussion session to structure the agenda, budget, sponsorship model, and dignitary invitations for the upcoming Region VI Conference.',
      highlights: ['Strategic venue hosting', 'Region-wide operational alignment']
    },
    {
      id: 'ze-18',
      date: '19th October 2024',
      title: '“October Octaves” Musical Evening & Major Fundraiser',
      category: 'Service',
      location: 'Prestige Srihari Khoday Centre for Performing Arts, Bengaluru',
      hostClub: 'LCB Brigade',
      dignitaries: ['Prominent Corporate Patrons', 'Lions Dignitaries & Music Enthusiasts'],
      description: 'Spearheaded a premier musical evening fundraiser "October Octaves" to mobilize funds for community RO clean water plants and rural school aid.',
      highlights: ['High-impact cultural fundraiser', 'Mobilized corporate and community sponsorships']
    },
    {
      id: 'ze-19',
      date: '26th October 2024',
      title: 'New Member Induction Ceremony @ JP Nagar Club',
      category: 'Governance',
      location: 'JP Nagar Club, Bengaluru',
      hostClub: 'LCB Brigade',
      dignitaries: ['2nd VDG Ln. Raju Chandrashekar (Induction Officer)', 'New Inductees & Sponsors'],
      description: 'Inducted a distinguished cohort of new members into LCB Brigade. 2nd VDG Ln. Raju Chandrashekar formally welcomed the inductees into Lions International.',
      highlights: ['Membership expansion', 'Induction by 2nd VDG']
    },
    {
      id: 'ze-20',
      date: '29th October 2024',
      title: 'Leo Club of Bangalore Satva Installation',
      category: 'Youth & Leo',
      location: 'Bengaluru',
      hostClub: 'LEO Club of Bangalore Satva',
      dignitaries: ['2nd VDG Ln. Raju Chandrashekar (Installing Officer)', 'Ln. Arvind Shetty', 'Ln. Esther James (District Leo Coordinator)', 'Leo President Aqib Feroz & Team'],
      description: 'Installed Leo President Aqib Feroz and his executive board. Guided young Leo leaders in planning environment and health campaigns.',
      highlights: ['Youth leadership succession', 'District Leo leadership participation']
    },
    {
      id: 'ze-21',
      date: '30th October 2024',
      title: 'LCB Cosmos Board & General Body Meeting (GBM)',
      category: 'Governance',
      location: 'Koramangala Club, Bengaluru',
      hostClub: 'LCB Cosmos',
      dignitaries: ['President Ln. Arjun', 'Board & Club Members'],
      description: 'Attended the official Board and GBM of LCB Cosmos. Congratulated the team on their ongoing service projects and discussed CSR funding opportunities.',
      highlights: ['Official Zone Chairperson visit', 'Direct member consultation']
    },
    {
      id: 'ze-22',
      date: '12th November 2024',
      title: 'LEO Satva Mega Blood Donation Camp @ BMSCE',
      category: 'Youth & Leo',
      location: 'BMS College of Engineering, Bengaluru',
      hostClub: 'LEO Satva in association with BMSCE',
      dignitaries: ['Ln. Nagesh', 'Ln. Chinnappa Thomas (DC Blood Donation)', 'BMSCE Management & ZC Ln. Ramesh BS'],
      description: 'Mentored Leo Club Satva in organizing a large-scale voluntary blood donation drive on the BMSCE campus, collecting vital blood units for city hospitals.',
      highlights: ['Student donor mobilization', 'District DC Blood donation support']
    },
    {
      id: 'ze-23',
      date: '22nd November 2024',
      title: 'LCB Brigade Board & GBM — Membership Development Session',
      category: 'Governance',
      location: 'Bengaluru',
      hostClub: 'LCB Brigade',
      dignitaries: ['President Ln. Sumanth', 'Executive Board & Members'],
      description: 'Addressed the Board and GBM of LCB Brigade, delivering a masterclass on retention strategies, member engagement, and family involvement.',
      highlights: ['Membership development focus', 'Club governance strengthening']
    },
    {
      id: 'ze-24',
      date: '30th November 2024',
      title: 'Rural RO Clean Water Purification Plant Inspection',
      category: 'Service',
      location: 'Rural Bangalore RO Plant Site',
      dignitaries: ['CSR Sponsor Executives', 'Gram Panchayat Leaders', 'ZC Ln. Ramesh BS'],
      description: 'Conducted a technical inspection and audit of the operational ₹31+ Lakhs CSR RO water purification plant alongside corporate sponsor representatives.',
      highlights: ['CSR accountability and sustainability audit', 'Ensuring pure drinking water for thousands']
    },
    {
      id: 'ze-25',
      date: '1st December 2024',
      title: 'District 317F Cricket Team Selection — Selected as All-Rounder',
      category: 'Sports & Fellowship',
      location: 'Bengaluru Sports Grounds',
      dignitaries: ['District Sports Committee', 'Lions Players from District 317F'],
      description: 'Participated in competitive trials for the District 317F cricket team and was selected as an All-Rounder to represent the district.',
      highlights: ['All-rounder selection', 'Promoting sports wellness across Lionism']
    },
    {
      id: 'ze-26',
      date: '5th December 2024',
      title: 'Youth Mentorship Address to LEO Satva @ BMSCE',
      category: 'Youth & Leo',
      location: 'BMS College of Engineering, Bengaluru',
      dignitaries: ['LEO Satva Executive Board & Members'],
      description: 'Mentored Leo officers on project execution discipline, social media storytelling, and career leadership balance.',
      highlights: ['Dedicated youth mentorship', 'Strengthening Leo-Lions bridge']
    },
    {
      id: 'ze-27',
      date: '6th December 2024',
      title: 'Champions Cup Victory — Multiple District Cricket Tournament',
      category: 'Sports & Fellowship',
      location: 'Multiple District Sports Arena',
      dignitaries: ['Multiple District 317 Sports Officials', 'District 317F Cricket Squad'],
      description: 'Represented Zone 1 and District 317F in the Multiple District Cricket Tournament, delivering key performances with bat and ball to lift the Champions Cup!',
      highlights: ['Multiple District Cricket Trophy Champions', 'Zone 1 sporting pride']
    },
    {
      id: 'ze-28',
      date: '8th December 2024',
      title: 'Multiple District Badminton Tournament Participation',
      category: 'Sports & Fellowship',
      location: 'Bengaluru Indoor Sports Complex',
      dignitaries: ['Multiple District Badminton Committee'],
      description: 'Participated in the competitive Multiple District Badminton Tournament, exemplifying personal fitness and sportsmanship.',
      highlights: ['Active sporting participation', 'WIN5M physical wellness advocacy']
    },
    {
      id: 'ze-29',
      date: '12th December 2024',
      title: 'Region VI Pre-Planning Committee Meeting',
      category: 'Governance',
      location: '‘The Ferns’, Yeshwanthpur, Bengaluru',
      dignitaries: ['RC Ln. A.V. Nagaraj', 'Host Chairperson Ln. M.C. Sreenivas', 'Zone Chairpersons'],
      description: 'Participated in the detailed pre-planning committee session to finalize stage protocols, cultural schedules, and award categories for Region VI Meet.',
      highlights: ['Operational readiness', 'Protocol finalization']
    },
    {
      id: 'ze-30',
      date: '14th December 2024',
      title: 'Ministerial Delegation for Jayanagar Hospital Hunger Relief',
      category: 'Service',
      location: 'Bengaluru Ministerial Office',
      dignitaries: ['Hon. Minister Mr. Ramalinga Reddy', 'RC Ln. A.V. Nagaraj', 'President Ln. Sumanth', 'Secretary Ln. Raman Reddy'],
      description: 'Led a high-level Lions delegation to meet Karnataka Cabinet Minister Mr. Ramalinga Reddy, submitting a comprehensive proposal for daily/weekly hunger relief at Jayanagar Hospital.',
      highlights: ['Cabinet Minister engagement', 'Government-Lions social welfare synergy']
    },
    {
      id: 'ze-31',
      date: '14th December 2024',
      title: 'Meeting Lions International President @ Lions Eye Hospital',
      category: 'Leadership & Training',
      location: 'Lions Eye Hospital, Bengaluru',
      dignitaries: ['International President, Lions Clubs International', 'District 317F Leadership'],
      description: 'Honored to meet and interact with the International President of Lions Clubs International during his official visit to India and Lions Eye Hospital.',
      highlights: ['International President audience', 'Global visibility for District 317F']
    },
    {
      id: 'ze-32',
      date: '18th December 2024',
      title: '2nd District Governor Advisory Meeting (2nd DGAM)',
      category: 'Governance',
      location: 'Koramangala Club, Bengaluru',
      hostClub: 'LCB Cosmos (Host Club)',
      dignitaries: ['Ln. Ramana Murthy (GMT Coordinator & Chief Guest)', 'Zone 1 Club Presidents & Secretaries'],
      description: 'Conducted the 2nd DGAM focusing on Mid-Year Membership Review, Lions Portal reporting status, and Q3-Q4 signature service commitments.',
      highlights: ['Mid-year membership audit', 'GMT Coordinator keynote on club retention']
    },
    {
      id: 'ze-33',
      date: '22nd January 2025',
      title: '3rd District Cabinet Meeting',
      category: 'Governance',
      location: 'Hotel Royal Orchid / Royal, Bengaluru',
      dignitaries: ['District Governor Ln. Narayanaswamy', 'District Cabinet Officers'],
      description: 'Presented Zone 1 progress report at the 3rd District Cabinet Meeting, highlighting 100% service activity reporting across all 4 clubs.',
      highlights: ['District Cabinet presentation', 'Exemplary reporting recognition']
    },
    {
      id: 'ze-34',
      date: '1st February 2025',
      title: 'District 317F Region Chairpersons & ZC Review Meet',
      category: 'Governance',
      location: 'Bengaluru',
      dignitaries: ['District Leadership Team', 'Region & Zone Officers'],
      description: 'Participated in strategic alignment meet evaluating district-wide performance benchmarks ahead of the final quarter.',
      highlights: ['Cross-region benchmarking', 'District Governor milestone tracking']
    },
    {
      id: 'ze-35',
      date: 'February 2025',
      title: '2nd Region Conference of Region VI — Exemplary Protocol',
      category: 'Governance',
      location: 'Bengaluru',
      hostClub: 'Region VI Host Committee',
      dignitaries: ['RC Ln. A.V. Nagaraj', 'Host Chair Ln. M.C. Sreenivas', 'Co-ZCs Ln. Ramya & Ln. Raghu Babu'],
      description: 'Successfully organized and executed the 2nd Region Conference of Region VI with complete protocol adherence, full delegate attendance, and corporate sponsorship.',
      highlights: ['Flawless protocol execution', 'Collaborative Zone leadership']
    },
    {
      id: 'ze-36',
      date: '22nd – 23rd February 2025',
      title: 'Lions Fellowship & Leadership Retreat @ Sakleshpur',
      category: 'Sports & Fellowship',
      location: 'Sakleshpur Nature Retreat, Karnataka',
      dignitaries: ['District 317F Lions Leaders & Families'],
      description: 'Organized a rejuvenating 2-day outdoor fellowship retreat to Sakleshpur with like-minded Lions leaders to build deeper friendship and strategic collaboration.',
      highlights: ['Cross-district fellowship', 'Team bonding in nature']
    },
    {
      id: 'ze-37',
      date: '9th March 2025',
      title: '3rd DGAM & District Governor Official Visit to LCB Zen',
      category: 'Governance',
      location: 'Karnataka Badminton Association (KBA), Bengaluru (10:00 AM – 11:30 AM)',
      hostClub: 'LCB Zen (Host Club)',
      dignitaries: [
        'DG Ln. Narayanaswamy',
        '1st VDG Ln. Akash Suvarna',
        '2nd VDG Ln. Raju Chandrashekar',
        'DSC Ln. Prasanna Kumar',
        'DCT Ln. Vijaya',
        'Ln. Vijay Kumar',
        'Ln. Ajith Babu',
        'Ln. Navin (GLT Member)'
      ],
      description: 'Conducted the 3rd DGAM at KBA with full attendance from all 4 Zone clubs (LCB Suraksha, LCB Brigade, LCB Cosmos, LCB Zen). Followed by the District Official Visit to LCB Zen, which was lauded by DG Ln. Narayanaswamy for impeccable table arrangements and flawless protocol.',
      highlights: [
        '100% attendance from all 4 Zone clubs',
        'Direct praise from DG Ln. Narayanaswamy for protocol perfection',
        'GLT Member Ln. Navin address on club excellence'
      ]
    },
    {
      id: 'ze-38',
      date: '13th March 2025',
      title: 'District Governor Official Visit & Zone Reporting',
      category: 'Governance',
      location: 'Bengaluru',
      dignitaries: ['DG Ln. Narayanaswamy', 'Cabinet Advisory Committee', 'Zone Chairpersons'],
      description: 'Formally submitted comprehensive Zone 1 administration, service metrics, and audit dossiers to District Governor Ln. Narayanaswamy during his official review.',
      highlights: ['Complete dossier handover', 'DG appreciation for Zone 1 leadership']
    },
    {
      id: 'ze-39',
      date: '14th March 2025',
      title: 'LEO Day Celebration — “RANG EKTA” @ Bal Bhavan',
      category: 'Youth & Leo',
      location: 'Bal Bhavan Auditorium, Cubbon Park / Kasturba Road, Bengaluru',
      dignitaries: ['District Leo Coordinator', 'Leo Leaders across Multiple 317', 'ZC Ln. Ramesh BS'],
      description: 'Participated in the vibrant LEO Day celebration "RANG EKTA", celebrating youth creativity, cultural unity, and social activism.',
      highlights: ['Celebrated youth energy', 'Multiple Leo club cultural forum']
    },
    {
      id: 'ze-40',
      date: '29th June 2025',
      title: '4th DGAM (6:00 PM) — Annual Culmination',
      category: 'Governance',
      location: 'Ambient Corporate Office, Bengaluru',
      hostClub: 'Zone 1 Committee (Hosted by ZC Ln. Ramesh BS)',
      dignitaries: ['Zone 1 Club Presidents & Secretaries', 'Club Delegates from LCB Zen & LCB Brigade'],
      description: 'Conducted the final 4th DGAM of the Lionistic year at 6:00 PM. LCB Zen and LCB Brigade presented complete annual performance reports, auditing 100% service fulfillment.',
      highlights: ['Full year audit completed', 'Exemplary reporting standards']
    },
    {
      id: 'ze-41',
      date: '29th June 2025',
      title: 'Zone Socials: Keynote on “Balance Work-Life-Lions” & Fellowship',
      category: 'Sports & Fellowship',
      location: 'Ambient Corporate Office, Bengaluru (7:30 PM)',
      hostClub: 'Hosted by ZC Ln. Ramesh BS',
      dignitaries: ['Mrs. Vani Mitta (Distinguished Psychologist)', 'Zone 1 Lions Leaders, Spouses & Guests'],
      description: 'Organized the signature Zone Socials event featuring a powerful keynote on "Balance Work-Life-Lions" by renowned psychologist Mrs. Vani Mitta, followed by high-level fellowship, dinner, and cocktails.',
      highlights: ['Mental wellness and family-Lionism balance keynote', 'Prestigious fellowship dinner & cocktail hosting']
    }
  ],
  clubsReview: [
    {
      id: 'cr-brigade',
      clubName: 'Lions Club of Bangalore Brigade (LCB Brigade)',
      type: 'Home Club',
      leadership: {
        president: 'Ln. Sumanth M.J.',
        secretary: 'Ln. Raman Reddy',
        treasurer: 'Ln. Chandrashekar Gowda',
        firstVP: 'Ln. Desikan',
        keyLeaders: ['RC Ln. A.V. Nagaraj', 'Ln. Richard (Water Fuel Project Lead)', 'Ln. B.S. Ramesh, MJF']
      },
      overview: 'Now in its 4th year of operations, LCB Brigade functions like a disciplined army in humanitarian service. The club has consistently remained at the absolute forefront of District 317F with massive CSR fundraisers and community infrastructure projects.',
      strengths: [
        'Raised ₹31+ Lakhs in Corporate CSR during founding phase for 3 rural RO water plants in Lingarajpuram, TN-Border, and Thralu Panchayats.',
        'Executed 2 signature projects on Cabinet Installation Day: 2,500 kg quality rice distribution (₹1.5L) and Water Fuel to cancer patients (₹1.5L).',
        'Annual distribution of 5,000+ notebooks to rural Kanakapura students for 3 consecutive years.',
        'Extensive district involvement: RLLI Goa participation, 5 LCIF contributions, LDSF trusteeship, and Region Conference hosting.'
      ],
      keyActivities: [
        '₹31+ Lakhs CSR RO Water Purification Plants',
        '2,500 kg Hunger Relief Rice Distribution',
        '₹1.5L Cancer Patient Water Fuel Kits',
        '“October Octaves” Musical Fundraiser @ Prestige Srihari Khoday',
        'Annual 5,000 Notebooks Distribution with Akruth Trust',
        'Hospital Hunger Relief Delegation with Minister Ramalinga Reddy'
      ],
      recommendations: 'District leadership should actively showcase LCB Brigade’s corporate CSR fundraising methodology as a benchmark model for other clubs across Multiple District 317.',
      statusBadge: 'Tier 1 Star Club • ₹31L+ CSR Pioneer'
    },
    {
      id: 'cr-cosmos',
      clubName: 'Lions Club of Bangalore Cosmos (LCB Cosmos)',
      type: 'Pioneer Club',
      leadership: {
        president: 'Ln. Arjun',
        keyLeaders: ['PID / IPDG Ln. Vamsidhar Babu', 'Ln. Rajesh (District Cabinet Officer)', '3 Generations of Family Lions']
      },
      overview: 'A historic and prestigious pillar club with 29+ active members. LCB Cosmos represents three generations of dedicated Lions within single families and is home to Past International Director / IPDG Ln. Vamsidhar Babu.',
      strengths: [
        'Home club of PID Ln. Vamsidhar Babu whose international experience elevates District 317F reputation.',
        '3 Generations of active Lions: President Ln. Arjun introduced by his father, with his mother, wife, and daughter actively serving together.',
        'Substantial corporate CSR funding secured for the Vision Screening and Eye Care project.',
        'High representation of senior IT professionals, corporate executives, and top management.'
      ],
      keyActivities: [
        'Hosted 2nd DGAM at Koramangala Club with GMT Coordinator Ln. Ramana Murthy',
        'Vision Care & Eye Screening CSR project execution',
        'Regular high-decorum Board and General Body Meetings'
      ],
      recommendations: 'Engage LCB Cosmos leaders in district-level CSR, Public Relations, and corporate branding to catalyze the formation of dedicated Corporate Lions Clubs.',
      statusBadge: 'Historic Premier Club • 29+ Members • PID Home Club'
    },
    {
      id: 'cr-zen',
      clubName: 'Lions Club of Bangalore Zen (LCB Zen)',
      type: 'Virtual / Corporate Club',
      leadership: {
        president: 'Ln. Praveen Desai (Charter President)',
        keyLeaders: ['Ln. Sasha (Advisor)', 'Young Corporate Leaders & Innovators']
      },
      overview: 'Initiated during 2023–24 with young corporate professionals, LCB Zen has pioneered an agile virtual meeting model paired with 100% in-person monthly humanitarian execution.',
      strengths: [
        'Flawlessly hosted the 3rd DGAM at Karnataka Badminton Association (KBA), earning unanimous praise from DG Ln. Narayanaswamy and cabinet leaders.',
        '100% monthly service delivery and reporting: Walkathons, hunger drives, tree plantations, and blood donation camps.',
        'Overcame corporate scheduling hurdles to maintain rigorous administrative compliance and district reporting.'
      ],
      keyActivities: [
        'Hosted 3rd DGAM & DG Official Visit at KBA with full protocol adherence',
        'Monthly On-Ground Environmental & Health Drives (Walkathons, Tree Plantation)',
        'Participated with full annual dossiers in 4th DGAM'
      ],
      recommendations: 'Position LCB Zen as the modern blueprint for engaging busy young tech professionals and corporate youth in structured community service.',
      statusBadge: 'Youth & Corporate Excellence • 100% Protocol Praised'
    },
    {
      id: 'cr-suraksha',
      clubName: 'Lions Club of Bangalore Suraksha (LCB Suraksha)',
      type: 'Locality Service Club',
      leadership: {
        president: 'Ln. Anand Gowda',
        keyLeaders: ['Ln. Shobha Sreenivas (District Coordinator Childhood Cancer)', 'Ln. Manjanna', 'Local Leo Lions']
      },
      overview: 'A grassroots, locality-centric club whose members are deeply dedicated to local social care around Kavalbyrasandra and Sri Raghavendra Swamy Mutt.',
      strengths: [
        'Deep grassroots connection and humble, dedicated community service in their immediate locality.',
        'Active leadership of DC Childhood Cancer Ln. Shobha Sreenivas driving district cancer relief initiatives.',
        'Strong warmth and hospitality demonstrated during Zone Chairperson official visits.'
      ],
      keyActivities: [
        'Officers Installation Ceremony at Sri Raghavendra Swamy Mutt',
        'Local Childhood Cancer & Healthcare Relief Drives',
        'Locality Community Welfare Support'
      ],
      recommendations: 'District leaders should actively mentor the club and consider a strategic merger with a sister club to consolidate active members and expand local recruitment.',
      statusBadge: 'Grassroots Locality Service • Childhood Cancer Advocate'
    }
  ],
  dgams: [
    {
      number: '1st ZAM',
      title: '1st Zone Advisory Meeting (ZAM)',
      date: '18th September 2024',
      venue: 'City Institute, Bengaluru',
      hostClub: 'LCB Brigade',
      chiefGuestOrLeaders: ['GST District Coordinator (Chief Guest)', 'Zone 1 Club Presidents & Secretaries'],
      description: 'Inaugural Zone 1 advisory meet setting annual benchmarks for service reporting, membership retention, and district dues fulfillment.',
      keyOutcomes: ['100% Zone 1 club participation', 'Quarterly goal roadmap established']
    },
    {
      number: '2nd DGAM',
      title: '2nd District Governor Advisory Meeting (2nd DGAM)',
      date: '18th December 2024',
      venue: 'Koramangala Club, Bengaluru',
      hostClub: 'LCB Cosmos',
      chiefGuestOrLeaders: ['Ln. Ramana Murthy (GMT District Coordinator)', 'Zone 1 Leadership'],
      description: 'Mid-year administrative audit reviewing membership retention, MyLCI portal updates, and planning Q3-Q4 signature service initiatives.',
      keyOutcomes: ['Mid-term membership health validated', 'Action plan for corporate CSR outreach']
    },
    {
      number: '3rd DGAM',
      title: '3rd DGAM & District Governor Official Visit to LCB Zen',
      date: '9th March 2025',
      time: '10:00 AM – 11:30 AM',
      venue: 'Karnataka Badminton Association (KBA), Bengaluru',
      hostClub: 'LCB Zen',
      chiefGuestOrLeaders: [
        'DG Ln. Narayanaswamy',
        '1st VDG Ln. Akash Suvarna',
        '2nd VDG Ln. Raju Chandrashekar',
        'DSC Ln. Prasanna Kumar',
        'DCT Ln. Vijaya',
        'Ln. Vijay Kumar',
        'Ln. Ajith Babu',
        'Ln. Navin (GLT Member)'
      ],
      description: 'Pivotal official visit and advisory meeting attended by top district leaders. DG Ln. Narayanaswamy commended the host club and Zone 1 for flawless protocol and table arrangements.',
      keyOutcomes: [
        'Lauded by DG Ln. Narayanaswamy for exemplary protocol',
        'Full quorum from all 4 clubs (Suraksha, Brigade, Cosmos, Zen)',
        'Keynote on club vitality by GLT Ln. Navin'
      ]
    },
    {
      number: '4th DGAM',
      title: '4th DGAM — Annual Administrative Review',
      date: '29th June 2025',
      time: '6:00 PM',
      venue: 'Ambient Corporate Office, Bengaluru',
      hostClub: 'Zone 1 Executive Committee',
      chiefGuestOrLeaders: ['ZC Ln. Ramesh BS', 'Presidents & Secretaries of LCB Zen and LCB Brigade'],
      description: 'Final governance meeting of the Lionistic year reviewing complete annual reports and financial compliance dossiers.',
      keyOutcomes: ['100% annual report submission', 'Zone 1 declared fully compliant']
    }
  ],
  zoneSocials: {
    title: 'Zone 1 Annual Socials & Keynote Fellowship',
    date: '29th June 2025',
    time: '7:30 PM onwards',
    venue: 'Ambient Corporate Office, Bengaluru',
    speaker: 'Mrs. Vani Mitta (Renowned Psychologist & Life Coach)',
    speakerTopic: '“Balance Work – Life – Lions”',
    host: 'Hosted by ZC Ln. B.S. Ramesh, MJF',
    description: 'An exclusive fellowship evening bringing together Lions leaders, spouses, and youth to discuss mental wellness, work-life integration, and celebrating a triumphant year of humanitarian stewardship with dinner and cocktails.'
  },
  concludingRemarks: {
    acknowledgements: [
      'District Governor Ln. Narayanaswamy for entrusting the Zone Chairperson stewardship and sponsoring the RLLI Goa leadership opportunity.',
      'Region Chairperson Ln. A.V. Nagaraj for continuous mentorship, strategic guidance, and unwavering support across all Zone 1 initiatives.',
      'Club Presidents Ln. Sumanth M.J. (Brigade), Ln. Arjun (Cosmos), Ln. Praveen Desai (Zen), and Ln. Anand Gowda (Suraksha) for their tireless dedication.',
      'All Board Members, Leo Advisors, and volunteers across Zone 1 and District 317F.'
    ],
    personalReflection: 'I have discharged my duties to the best of my knowledge and capability, gaining invaluable leadership wisdom and forging lifelong Lions friendships throughout this unforgettable journey.',
    availabilityStatement: 'I remain actively available to District 317F, ready to share my expertise in Corporate CSR fundraising, youth Leo mentorship, and club governance with any club in need.'
  },
  galleryImages: [
    {
      id: 'zg-1',
      src: '/images/zone-chairperson/pasted-image-58.png',
      caption: 'ZC Ln. Ramesh BS interacting with 2nd International VP Ln. Mark Lyon at LDSF Dialysis Project',
      category: 'International Dignitary'
    },
    {
      id: 'zg-2',
      src: '/images/zone-chairperson/pasted-image-48.png',
      caption: 'Cabinet Installation Day: 2,500 kg Rice Bags & Flasks Distribution by LCB Brigade',
      category: 'Hunger Relief & CSR'
    },
    {
      id: 'zg-3',
      src: '/images/zone-chairperson/pasted-image-38.png',
      caption: '3rd DGAM & District Governor Official Visit @ KBA with DG Ln. Narayanaswamy & Cabinet Leaders',
      category: 'Governance & DGAM'
    },
    {
      id: 'zg-4',
      src: '/images/zone-chairperson/pasted-image-30.png',
      caption: 'Signature Project: 5,000 Notebooks Distribution @ Kanakapura Rural School with Akruth Trust',
      category: 'Literacy & Youth'
    },
    {
      id: 'zg-5',
      src: '/images/zone-chairperson/pasted-image-28.png',
      caption: 'Champions Trophy Victory — Multiple District Cricket Tournament representing Zone 1',
      category: 'Sports & Fellowship'
    },
    {
      id: 'zg-6',
      src: '/images/zone-chairperson/pasted-image-42.png',
      caption: 'RLLI Goa Executive Leadership Training Graduate — Multiple Council 317',
      category: 'Leadership & RLLI'
    },
    {
      id: 'zg-7',
      src: '/images/zone-chairperson/pasted-image-50.png',
      caption: 'Annual Zone Socials & Keynote on "Balance Work-Life-Lions" by Psychologist Mrs. Vani Mitta',
      category: 'Zone Socials'
    },
    {
      id: 'zg-8',
      src: '/images/zone-chairperson/pasted-image-40.png',
      caption: 'Voluntary Blood Donation Camp @ KSSEM College & Jayanagar Pediatric Diaper Distribution',
      category: 'Community Health'
    }
  ]
};
