export interface Achievement {
  id: string;
  title: string;
  value: string;
  description: string;
  iconName?: string;
}

export interface Highlight {
  id: string;
  title: string;
  description: string;
}

export interface AboutSectionData {
  heading: string;
  subheading: string;
  biography: string[];
  vision: string;
  mission: string;
  coreValues: string[];
  achievements: Achievement[];
  highlights: Highlight[];
  image: string;
}

export interface LionisticMilestone {
  id: string;
  year: string;
  position: string;
  organization: string;
  location?: string;
  description: string;
  achievements: string[];
  gallery?: string[];
  category?: 'District' | 'Council' | 'International' | 'Club';
}

export interface LionisticSectionData {
  heading: string;
  subheading: string;
  overview: string;
  milestones: LionisticMilestone[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  yearsOfExperience: number;
  features: string[];
  tag?: string;
}

export interface ServicesSectionData {
  heading: string;
  subheading: string;
  description: string;
  services: ServiceItem[];
}

export interface HobbyItem {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  image?: string;
  highlights?: string[];
}

export interface HobbiesSectionData {
  heading: string;
  subheading: string;
  description: string;
  hobbies: HobbyItem[];
}

export interface CareerExperience {
  id: string;
  organization: string;
  designation: string;
  duration: string;
  location: string;
  type?: 'Corporate' | 'Board' | 'Advisory' | 'Leadership';
  responsibilities: string[];
  keyAchievements: string[];
}

export interface CertificateAward {
  id: string;
  title: string;
  issuer: string;
  year: string;
  type: 'Certificate' | 'Award' | 'Honor';
  description?: string;
}

export interface CareerSectionData {
  heading: string;
  subheading: string;
  resumeUrl: string;
  experiences: CareerExperience[];
  certificatesAndAwards: CertificateAward[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  shortIntro: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  heroImage: string;
}

export interface ActivityItem {
  id: string;
  youtubeId: string;
  url: string;
  title: string;
  category: 'Service Activities' | 'Meetings' | 'Travel Activities';
  description: string;
  hashtags: string[];
  date?: string;
  location?: string;
}

export interface ActivitiesSectionData {
  heading: string;
  subheading: string;
  description: string;
  activities: ActivityItem[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  about: AboutSectionData;
  lionisticJourney: LionisticSectionData;
  services: ServicesSectionData;
  hobbies: HobbiesSectionData;
  career: CareerSectionData;
  activities: ActivitiesSectionData;
}

export type SectionKey = 'about' | 'lionistic' | 'services' | 'hobbies' | 'career';

export interface CategorizedParagraph {
  text: string;
  suggestedSection: SectionKey;
  confidence: number;
  extractedHeading?: string;
}
