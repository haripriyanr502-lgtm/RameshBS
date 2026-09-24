export type ContentStatus = 'draft' | 'published';

export interface SiteSettings {
  siteTitle: string;
  ownerName: string;
  tagline: string;
  shortIntro: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  heroImage: string;
  seoMetaTitle: string;
  seoMetaDescription: string;
  seoKeywords: string;
  lastUpdated: string;
}

export interface SectionHeadings {
  aboutTitle: string;
  aboutSubtitle: string;
  journeyTitle: string;
  journeySubtitle: string;
  servicesTitle: string;
  servicesSubtitle: string;
  activitiesTitle: string;
  activitiesSubtitle: string;
  careerTitle: string;
  careerSubtitle: string;
  contactTitle: string;
  contactSubtitle: string;
}

export interface HomeContent {
  heroTitle: string;
  heroTagline: string;
  heroDescription: string;
  heroImage: string;
  heroCtaPrimaryText: string;
  heroCtaPrimaryLink: string;
  heroCtaSecondaryText: string;
  heroCtaSecondaryLink: string;
  aboutHeading: string;
  aboutSubheading: string;
  aboutBiography: string[];
  aboutVision: string;
  aboutMission: string;
  aboutCoreValues: string[];
  aboutImage: string;
  sectionHeadings: SectionHeadings;
}

export interface MeetingItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
  statusCategory: 'DGAM' | 'Regular Meeting' | 'Board Meeting' | 'Service Meeting' | 'ZAM' | 'Special Event';
  status: ContentStatus;
  displayOrder: number;
  dignitaries?: string[];
  keyOutcomes?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CmsServiceItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  image?: string;
  category: string;
  yearsOfExperience: number;
  features: string[];
  tag?: string;
  displayOrder: number;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMemberItem {
  id: string;
  fullName: string;
  position: string;
  profileImage: string;
  biography: string;
  organization: string;
  email?: string;
  phone?: string;
  displayOrder: number;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  yearDate: string;
  description: string;
  valueMetric: string;
  image?: string;
  iconName?: string;
  category: 'CSR Water Infrastructure' | 'International Honors' | 'Enterprise & IT' | 'Youth & Sports' | 'Community Service';
  impactDetails?: string;
  displayOrder: number;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CharterSectionItem {
  id: string;
  sectionTitle: string;
  sectionContent: string;
  category: 'Preamble' | 'Objectives' | 'Governance & Leadership' | 'CSR & Clean Water Bylaws' | 'Code of Ethics' | 'Membership Guidelines';
  displayOrder: number;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface MediaAsset {
  id: string;
  fileName: string;
  url: string;
  category: 'Logo' | 'Hero' | 'Team' | 'Meetings' | 'Services' | 'Achievements' | 'Posters' | 'General';
  mimeType: string;
  sizeBytes: number;
  uploadedAt: string;
  altText?: string;
}

export interface FullCmsDatabase {
  settings: SiteSettings;
  home: HomeContent;
  meetings: MeetingItem[];
  services: CmsServiceItem[];
  team: TeamMemberItem[];
  achievements: AchievementItem[];
  charter: CharterSectionItem[];
  media: MediaAsset[];
  version: number;
  lastPublishedAt: string;
}
