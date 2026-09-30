import fs from 'fs';
import path from 'path';
import os from 'os';
import {
  FullCmsDatabase,
  SiteSettings,
  HomeContent,
  MeetingItem,
  CmsServiceItem,
  TeamMemberItem,
  AchievementItem,
  CharterSectionItem,
  MediaAsset,
  CmsProjectItem,
  CmsCareerData,
  CmsLionisticData,
  CmsAboutExtras,
} from './types';
import { initialPortfolioData } from '../../data/portfolioData';

const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'cms');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const MEDIA_FILE = path.join(DATA_DIR, 'media.json');

const TMP_DIR = path.join(os.tmpdir(), 'ramesh_bs_cms');
const TMP_CONTENT_FILE = path.join(TMP_DIR, 'content.json');
const TMP_MEDIA_FILE = path.join(TMP_DIR, 'media.json');

declare global {
  var __RAMESH_CMS_DB__: FullCmsDatabase | undefined;
  var __RAMESH_CMS_MEDIA__: MediaAsset[] | undefined;
}

// Default initial state populated from portfolio & LCB Brigade records
function createInitialCmsDatabase(): FullCmsDatabase {
  const p = initialPortfolioData;

  const settings: SiteSettings = {
    siteTitle: 'Bangalore Siddegowda Ramesh | Executive Leadership & LCB Brigade',
    ownerName: p.personalInfo.name,
    tagline: p.personalInfo.tagline,
    shortIntro: p.personalInfo.shortIntro,
    email: p.personalInfo.email,
    phone: p.personalInfo.phone || '+91 98450 00000',
    location: p.personalInfo.location,
    linkedin: p.personalInfo.linkedin,
    website: p.personalInfo.website,
    heroImage: p.personalInfo.heroImage,
    seoMetaTitle: 'B.S. Ramesh | Executive Portfolio & Lions Club Bangalore Brigade',
    seoMetaDescription:
      'Official leadership and portfolio platform of Bangalore Siddegowda Ramesh (Ramesh B.S) — CEO of BSR IT Solutions, Charter Secretary LCB Brigade, Region Chairperson District 317F, Melvin Jones Fellow (MJF).',
    seoKeywords:
      'BS Ramesh, Lions Club Bangalore Brigade, District 317F, BSR IT Solutions, WIN5M, CSR Clean Water, Region Chairperson, MJF',
    lastUpdated: new Date().toISOString(),
  };

  const home: HomeContent = {
    heroTitle: p.personalInfo.name,
    heroTagline: p.personalInfo.title,
    heroDescription: p.personalInfo.shortIntro,
    heroImage: p.personalInfo.heroImage,
    heroCtaPrimaryText: 'Explore Lionistic Journey',
    heroCtaPrimaryLink: '#lionistic-journey',
    heroCtaSecondaryText: 'Executive Profile',
    heroCtaSecondaryLink: '#career',
    aboutHeading: p.about.heading,
    aboutSubheading: p.about.subheading,
    aboutBiography: p.about.biography,
    aboutVision: p.about.vision,
    aboutMission: p.about.mission,
    aboutCoreValues: p.about.coreValues,
    aboutImage: p.about.image,
    sectionHeadings: {
      aboutTitle: p.about.heading,
      aboutSubtitle: p.about.subheading,
      journeyTitle: p.lionisticJourney.heading,
      journeySubtitle: p.lionisticJourney.subheading,
      servicesTitle: p.services.heading,
      servicesSubtitle: p.services.subheading,
      activitiesTitle: p.activities.heading,
      activitiesSubtitle: p.activities.subheading,
      careerTitle: p.career.heading,
      careerSubtitle: p.career.subheading,
      contactTitle: 'GET IN TOUCH',
      contactSubtitle: 'Dual Affiliated Service Leader, CSR Collaborations & Enterprise Advisory',
    },
  };

  const meetings: MeetingItem[] = [
    {
      id: 'meet-1',
      title: '1st District Governor Advisory Meeting (DGAM-1)',
      date: '2024-08-18',
      time: '10:30 AM',
      location: 'Bengaluru Region VI Venue',
      description:
        'First formal District Governor Advisory Meeting covering membership retention, Leo club advisory strategies, and kickoff for regional community clean water drives.',
      image: '/images/zone-chairperson/dgam1.jpg',
      statusCategory: 'DGAM',
      status: 'published',
      displayOrder: 1,
      dignitaries: ['District Governor Ln. Narayanaswamy', 'Region Chair Ln. A.V. Nagaraj'],
      keyOutcomes: [
        '100% compliance achieved across all 4 Zone 1 Clubs',
        'Finalized roadmap for 12 Leo youth advisory clubs',
      ],
      createdAt: '2024-08-18T10:30:00Z',
      updatedAt: '2024-08-18T10:30:00Z',
    },
    {
      id: 'meet-2',
      title: '2nd District Governor Advisory Meeting (DGAM-2)',
      date: '2024-11-24',
      time: '11:00 AM',
      location: 'LCB Brigade Club House, Bengaluru',
      description:
        'Mid-term review of service project expenditure, LCIF donations, and review of ₹31+ Lakhs CSR Reverse Osmosis clean drinking water plant progress.',
      image: '/images/zone-chairperson/dgam2.jpg',
      statusCategory: 'DGAM',
      status: 'published',
      displayOrder: 2,
      dignitaries: ['District Cabinet Officers', 'LCB Brigade Board of Directors'],
      keyOutcomes: [
        'Approval of CSR water project handover schedule in Lingarajpuram',
        'Review of sports talent outreach initiatives',
      ],
      createdAt: '2024-11-24T11:00:00Z',
      updatedAt: '2024-11-24T11:00:00Z',
    },
    {
      id: 'meet-3',
      title: '3rd District Governor Advisory Meeting (DGAM-3)',
      date: '2025-02-15',
      time: '10:30 AM',
      location: 'Bengaluru District Headquarters',
      description:
        'Comprehensive zone governance audit, Leo Youth Leadership awards presentation, and membership growth metrics evaluation.',
      image: '/images/zone-chairperson/dgam3.jpg',
      statusCategory: 'DGAM',
      status: 'published',
      displayOrder: 3,
      dignitaries: ['District Governor Ln. Narayanaswamy', 'Zone Chairperson Ln. B.S. Ramesh'],
      keyOutcomes: ['Recognition of highest Leo Club participation in District 317F'],
      createdAt: '2025-02-15T10:30:00Z',
      updatedAt: '2025-02-15T10:30:00Z',
    },
    {
      id: 'meet-4',
      title: 'LCB Brigade Charter Day & Water Plant Dedication Assembly',
      date: '2025-05-10',
      time: '05:30 PM',
      location: 'Brigade Convention Hall, Bengaluru',
      description:
        'Annual Charter celebration of Lions Club of Bangalore Brigade honoring founding charter members, CSR sponsors, and community water beneficiaries.',
      image: '/images/bs_ramesh_full.jpg',
      statusCategory: 'Special Event',
      status: 'published',
      displayOrder: 4,
      dignitaries: ['District Governor', 'CSR Corporate Donors', 'Charter Board'],
      keyOutcomes: [
        'Dedication of third rural clean RO water plant',
        'Felicitation of Melvin Jones Fellow honoree',
      ],
      createdAt: '2025-05-10T17:30:00Z',
      updatedAt: '2025-05-10T17:30:00Z',
    },
  ];

  const services: CmsServiceItem[] = p.services.services.map((s, idx) => ({
    id: s.id,
    name: s.title,
    description: s.description,
    iconName: s.iconName,
    image: undefined,
    category: s.tag || 'Executive Service',
    yearsOfExperience: s.yearsOfExperience,
    features: s.features,
    tag: s.tag,
    displayOrder: idx + 1,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  const team: TeamMemberItem[] = [
    {
      id: 'team-1',
      fullName: 'Bangalore Siddegowda Ramesh',
      position: 'Charter Secretary & Region Chairperson',
      profileImage: '/images/bs_ramesh_profile.jpg',
      biography:
        'Charter Secretary of Lions Club Bangalore Brigade, CEO of BSR IT Solutions, and Region Chairperson overseeing multiple clubs and 12 youth Leo clubs.',
      organization: 'Lions Club of Bangalore Brigade',
      email: 'bsr@bsrits.com',
      phone: '+91 98450 00000',
      displayOrder: 1,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'team-2',
      fullName: 'Ln. A.V. Nagaraj',
      position: 'Senior Region Mentor & District Advisor',
      profileImage: '/images/zone-chairperson/rc_mentor.jpg',
      biography:
        'Distinguished Lions leader guiding governance, charter compliance, and inter-club fellowship across District 317F.',
      organization: 'Lions International District 317F',
      displayOrder: 2,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'team-3',
      fullName: 'Ln. Narayanaswamy',
      position: 'District Governor (District 317F)',
      profileImage: '/images/zone-chairperson/dg_portrait.jpg',
      biography:
        'Presiding District Governor spearheading humanitarian missions, LCIF campaign stewardship, and youth empowerment initiatives.',
      organization: 'Lions International District 317F',
      displayOrder: 3,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'team-4',
      fullName: 'BSR IT Enterprise Core Team',
      position: 'Technology Architecture & Talent Recruitment Unit',
      profileImage: '/images/bangalorean_platform.png',
      biography:
        'Professional team delivering full-stack web solutions, IT staffing, and corporate cloud platforms across Bengaluru and pan-India.',
      organization: 'BSR IT Solutions Private Limited',
      displayOrder: 4,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const achievements: AchievementItem[] = [
    {
      id: 'ach-1',
      title: 'Melvin Jones Fellow (MJF) Honor',
      yearDate: '2025 - 2026',
      description:
        'Conferred the highest humanitarian honor by Lions Clubs International Foundation (LCIF) for dedicated service, CSR clean water execution, and youth leadership.',
      valueMetric: 'MJF Honoree',
      image: '/images/zone-chairperson/mjf_honor.jpg',
      iconName: 'Crown',
      category: 'International Honors',
      impactDetails: 'Recognized globally across LCIF for exemplary philanthropic impact.',
      displayOrder: 1,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'ach-2',
      title: '₹31+ Lakhs CSR Clean Water Plants',
      yearDate: '2024 - 2025',
      description:
        'Raised corporate CSR capital to architect and construct 3 full Reverse Osmosis (RO) water purification plants in rural Karnataka.',
      valueMetric: '₹31+ Lakhs',
      image: '/images/bs_ramesh_full.jpg',
      iconName: 'Droplets',
      category: 'CSR Water Infrastructure',
      impactDetails: 'Providing clean safe drinking water daily to 5,000+ rural villagers.',
      displayOrder: 2,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'ach-3',
      title: '22+ Years Enterprise & Staffing Leadership',
      yearDate: '2004 - Present',
      description:
        'Leading BSR IT Solutions Private Limited in web applications, enterprise staffing, and specialized technology delivery.',
      valueMetric: '22+ Years',
      iconName: 'Globe',
      category: 'Enterprise & IT',
      impactDetails: 'Placed 500+ skilled IT engineers and executed 100+ digital applications.',
      displayOrder: 3,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'ach-4',
      title: 'WIN5M Nationwide Youth Wellness Movement',
      yearDate: '2023 - Present',
      description:
        'Founded WIN5M.com to promote youth sports talent, calorie balance, and holistic stress management for active families.',
      valueMetric: 'WIN5M',
      image: '/images/win5m_sports.png',
      iconName: 'Award',
      category: 'Youth & Sports',
      impactDetails: 'Engaging schools, youth clubs, and families in healthy daily physical activity.',
      displayOrder: 4,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'ach-5',
      title: 'Rotary Club President & Polio Leadership',
      yearDate: '2013 - 2014',
      description:
        'Served as President of Rotary Bangalore Banashankari, driving Pulse Polio immunization and blood donation drives.',
      valueMetric: 'President',
      iconName: 'HeartHandshake',
      category: 'Community Service',
      impactDetails: 'Mobilized thousands of vaccinations and set new club service records.',
      displayOrder: 5,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const charter: CharterSectionItem[] = [
    {
      id: 'charter-1',
      sectionTitle: 'Preamble & Founding Purpose of Lions Club of Bangalore Brigade',
      sectionContent:
        'Lions Club of Bangalore Brigade was chartered under Lions Clubs International District 317F to unite civic-minded professionals, entrepreneurs, and humanitarian leaders in Bengaluru. The Club commits to direct action, corporate CSR infrastructure, and youth mentorship.',
      category: 'Preamble',
      displayOrder: 1,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'charter-2',
      sectionTitle: 'Charter Secretary Governance & Administrative Mandate',
      sectionContent:
        'The Charter Secretary maintains official records, oversees district compliance with District Governor Advisory Meetings (DGAMs), monitors membership health, and ensures transparent reporting of all club activities to Lions International portal.',
      category: 'Governance & Leadership',
      displayOrder: 2,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'charter-3',
      sectionTitle: 'Corporate CSR & Rural Clean Drinking Water Bylaws',
      sectionContent:
        'All corporate CSR allocations for community infrastructure (including Reverse Osmosis water plants, village health camps, and educational aid) are maintained in ring-fenced project accounts with audited third-party utilization certificates and community panchayat MOUs.',
      category: 'CSR & Clean Water Bylaws',
      displayOrder: 3,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'charter-4',
      sectionTitle: 'Youth Leo Club Sponsorship & Mentorship Accord',
      sectionContent:
        'LCB Brigade commits to mentor young students and young professionals across 12 advisory Leo clubs. The Club provides leadership training, event organization support, and fellowship opportunities to build tomorrow’s civic leaders.',
      category: 'Objectives',
      displayOrder: 4,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'charter-5',
      sectionTitle: 'Lions Code of Ethics & Fellowship Standards',
      sectionContent:
        'Members shall conduct themselves with integrity, empathy, and dignity. Fellowship shall be fostered through regular assemblies, cross-border goodwill delegations (e.g. Nepal & Singapore), and mutual respect.',
      category: 'Code of Ethics',
      displayOrder: 5,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const media: MediaAsset[] = [
    {
      id: 'med-1',
      fileName: 'bs_ramesh_profile.jpg',
      url: '/images/bs_ramesh_profile.jpg',
      category: 'Hero',
      mimeType: 'image/jpeg',
      sizeBytes: 38437,
      uploadedAt: new Date().toISOString(),
      altText: 'B.S. Ramesh Portrait',
    },
    {
      id: 'med-2',
      fileName: 'bs_ramesh_full.jpg',
      url: '/images/bs_ramesh_full.jpg',
      category: 'Hero',
      mimeType: 'image/jpeg',
      sizeBytes: 78881,
      uploadedAt: new Date().toISOString(),
      altText: 'B.S. Ramesh Executive Full Photo',
    },
    {
      id: 'med-3',
      fileName: 'bangalorean_platform.png',
      url: '/images/bangalorean_platform.png',
      category: 'Services',
      mimeType: 'image/png',
      sizeBytes: 902919,
      uploadedAt: new Date().toISOString(),
      altText: 'Bangalorean Platform Banner',
    },
    {
      id: 'med-4',
      fileName: 'win5m_sports.png',
      url: '/images/win5m_sports.png',
      category: 'Achievements',
      mimeType: 'image/png',
      sizeBytes: 876191,
      uploadedAt: new Date().toISOString(),
      altText: 'WIN5M Youth Sports Talent Banner',
    },
  ];

  const projects: CmsProjectItem[] = (p.activities?.activities || []).map((a, idx) => ({
    id: a.id,
    title: a.title,
    category: a.category,
    description: a.description,
    hashtags: a.hashtags || [],
    date: a.date,
    location: a.location,
    image: a.url || (a.youtubeId ? `https://img.youtube.com/vi/${a.youtubeId}/hqdefault.jpg` : ''),
    url: a.url,
    youtubeId: a.youtubeId,
    status: 'published',
    displayOrder: idx + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  const career: CmsCareerData = {
    heading: p.career?.heading || 'CAREER TRAJECTORY & EXPERIENCE',
    subheading: p.career?.subheading || 'Over 22 Years of Entrepreneurial Leadership',
    resumeUrl: p.career?.resumeUrl || '#download-resume',
    experiences: p.career?.experiences || [],
    certificatesAndAwards: p.career?.certificatesAndAwards || [],
  };

  const lionisticJourney: CmsLionisticData = {
    heading: p.lionisticJourney?.heading || 'MY LIONISTIC JOURNEY',
    subheading: p.lionisticJourney?.subheading || 'Dedicated Service, District Leadership & MJF Honor',
    overview: p.lionisticJourney?.overview || '',
    mjfHonor: p.lionisticJourney?.mjfHonor || {
      year: '2025 - 2026',
      title: 'Melvin Jones Fellow (MJF)',
      organization: 'Lions Clubs International Foundation (LCIF)',
      description: 'Conferred the prestigious Melvin Jones Fellow (MJF) recognition in 2025-2026.',
      highlights: [],
    },
    milestones: p.lionisticJourney?.milestones || [],
    internationalExposures: p.lionisticJourney?.internationalExposures || [],
    blogPosts: p.lionisticJourney?.blogPosts || [],
  };

  const aboutExtras: CmsAboutExtras = {
    highlights: p.about?.highlights || [],
    vision: p.about?.vision || '',
    mission: p.about?.mission || '',
    coreValues: p.about?.coreValues || [],
  };

  return {
    settings,
    home,
    aboutExtras,
    projects,
    services,
    career,
    lionisticJourney,
    meetings,
    team,
    achievements,
    charter,
    media,
    version: 1,
    lastPublishedAt: new Date().toISOString(),
  };
}

// Helper: read content from best available storage tier
function loadContentRaw(): FullCmsDatabase | null {
  // 1. In-memory hot cache
  if (globalThis.__RAMESH_CMS_DB__) {
    return globalThis.__RAMESH_CMS_DB__;
  }

  // 2. Serverless writable fallback (/tmp)
  try {
    if (fs.existsSync(TMP_CONTENT_FILE)) {
      const raw = fs.readFileSync(TMP_CONTENT_FILE, 'utf-8');
      const parsed = JSON.parse(raw) as FullCmsDatabase;
      if (parsed && parsed.settings && parsed.home) {
        globalThis.__RAMESH_CMS_DB__ = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Notice: Error reading from tmp content file:', err);
  }

  // 3. Bundled static content file
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const raw = fs.readFileSync(CONTENT_FILE, 'utf-8');
      const parsed = JSON.parse(raw) as FullCmsDatabase;
      if (parsed && parsed.settings && parsed.home) {
        globalThis.__RAMESH_CMS_DB__ = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Notice: Error reading from static content file:', err);
  }

  return null;
}

// Ensure data folder and content file exist
export function ensureCmsDatabase(): FullCmsDatabase {
  try {
    const existing = loadContentRaw();
    if (existing) {
      // Auto-migrate newly supported sections if missing from existing JSON
      let modified = false;
      const initialSeed = createInitialCmsDatabase();

      if (!existing.projects || existing.projects.length === 0) {
        existing.projects = initialSeed.projects;
        modified = true;
      }
      if (!existing.career) {
        existing.career = initialSeed.career;
        modified = true;
      }
      if (!existing.lionisticJourney) {
        existing.lionisticJourney = initialSeed.lionisticJourney;
        modified = true;
      }
      if (!existing.aboutExtras) {
        existing.aboutExtras = initialSeed.aboutExtras;
        modified = true;
      }

      if (modified) {
        saveCmsDatabase(existing);
      }

      globalThis.__RAMESH_CMS_DB__ = existing;
      return existing;
    }

    const initial = createInitialCmsDatabase();
    saveCmsDatabase(initial);
    globalThis.__RAMESH_CMS_DB__ = initial;
    return initial;
  } catch (err) {
    console.error('Error reading CMS database, resetting to seed data:', err);
    const initial = createInitialCmsDatabase();
    globalThis.__RAMESH_CMS_DB__ = initial;
    return initial;
  }
}

// Save complete CMS database with resilient multi-tier persistence
export function saveCmsDatabase(data: FullCmsDatabase): void {
  data.lastPublishedAt = new Date().toISOString();
  data.version = (data.version || 1) + 1;

  // 1. Immediately update in-memory hot cache so subsequent requests in this process see updates
  globalThis.__RAMESH_CMS_DB__ = data;

  let persisted = false;

  // 2. Persist to serverless writable storage (/tmp)
  try {
    if (!fs.existsSync(TMP_DIR)) {
      fs.mkdirSync(TMP_DIR, { recursive: true });
    }
    fs.writeFileSync(TMP_CONTENT_FILE, JSON.stringify(data, null, 2), 'utf-8');
    persisted = true;
  } catch (tmpErr) {
    console.warn('Notice: Could not write to serverless tmp directory:', tmpErr);
  }

  // 3. Persist to project data directory (works in local dev and non-serverless environments)
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2), 'utf-8');
    persisted = true;
  } catch {
    // Expected on read-only serverless filesystems (e.g. Vercel)
  }

  if (!persisted) {
    console.error('Warning: CMS data could not be saved to disk, retained in memory cache.');
  }
}

// Get only published content for public website consumption
export function getPublishedCmsData(): FullCmsDatabase {
  const data = ensureCmsDatabase();
  return {
    ...data,
    projects: (data.projects || []).filter((p) => p.status === 'published'),
    meetings: (data.meetings || []).filter((m) => m.status === 'published'),
    services: (data.services || []).filter((s) => s.status === 'published'),
    team: (data.team || []).filter((t) => t.status === 'published'),
    achievements: (data.achievements || []).filter((a) => a.status === 'published'),
    charter: (data.charter || []).filter((c) => c.status === 'published'),
  };
}

// Media Assets manager
export function getMediaAssets(): MediaAsset[] {
  // 1. In-memory hot cache
  if (globalThis.__RAMESH_CMS_MEDIA__) {
    return globalThis.__RAMESH_CMS_MEDIA__;
  }

  // 2. Serverless writable fallback (/tmp)
  try {
    if (fs.existsSync(TMP_MEDIA_FILE)) {
      const raw = fs.readFileSync(TMP_MEDIA_FILE, 'utf-8');
      const parsed = JSON.parse(raw) as MediaAsset[];
      if (Array.isArray(parsed)) {
        globalThis.__RAMESH_CMS_MEDIA__ = parsed;
        return parsed;
      }
    }
  } catch {}

  // 3. Bundled static media file
  try {
    if (fs.existsSync(MEDIA_FILE)) {
      const raw = fs.readFileSync(MEDIA_FILE, 'utf-8');
      const parsed = JSON.parse(raw) as MediaAsset[];
      if (Array.isArray(parsed)) {
        globalThis.__RAMESH_CMS_MEDIA__ = parsed;
        return parsed;
      }
    }
  } catch {}

  // 4. Default from database
  try {
    const db = ensureCmsDatabase();
    const initialMedia = db.media || [];
    globalThis.__RAMESH_CMS_MEDIA__ = initialMedia;
    return initialMedia;
  } catch {
    return [];
  }
}

export function saveMediaAsset(asset: MediaAsset): void {
  const assets = getMediaAssets();
  const existingIdx = assets.findIndex((a) => a.id === asset.id || a.url === asset.url);
  if (existingIdx >= 0) {
    assets[existingIdx] = asset;
  } else {
    assets.unshift(asset);
  }

  globalThis.__RAMESH_CMS_MEDIA__ = assets;

  // Write to /tmp
  try {
    if (!fs.existsSync(TMP_DIR)) {
      fs.mkdirSync(TMP_DIR, { recursive: true });
    }
    fs.writeFileSync(TMP_MEDIA_FILE, JSON.stringify(assets, null, 2), 'utf-8');
  } catch {}

  // Write to project disk if writable
  try {
    fs.writeFileSync(MEDIA_FILE, JSON.stringify(assets, null, 2), 'utf-8');
  } catch {}

  // Also sync with database
  try {
    const db = ensureCmsDatabase();
    db.media = assets;
    saveCmsDatabase(db);
  } catch {}
}

export function deleteMediaAsset(id: string): boolean {
  let assets = getMediaAssets();
  const initialLen = assets.length;
  assets = assets.filter((a) => a.id !== id);
  if (assets.length === initialLen) return false;

  globalThis.__RAMESH_CMS_MEDIA__ = assets;

  // Write to /tmp
  try {
    if (!fs.existsSync(TMP_DIR)) {
      fs.mkdirSync(TMP_DIR, { recursive: true });
    }
    fs.writeFileSync(TMP_MEDIA_FILE, JSON.stringify(assets, null, 2), 'utf-8');
  } catch {}

  // Write to project disk if writable
  try {
    fs.writeFileSync(MEDIA_FILE, JSON.stringify(assets, null, 2), 'utf-8');
  } catch {}

  try {
    const db = ensureCmsDatabase();
    db.media = assets;
    saveCmsDatabase(db);
  } catch {}
  return true;
}

