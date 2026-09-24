import { PortfolioData, Achievement, ServiceItem, ActivityItem } from '../../types/portfolio';
import { FullCmsDatabase } from './types';

export function mergeCmsIntoPortfolio(
  initial: PortfolioData,
  cms: FullCmsDatabase | null
): PortfolioData {
  if (!cms) return initial;

  // 1. Personal Info
  const personalInfo = {
    ...initial.personalInfo,
    name: cms.settings?.ownerName || cms.home?.heroTitle || initial.personalInfo.name,
    title: cms.home?.heroTagline || cms.settings?.tagline || initial.personalInfo.title,
    tagline: cms.settings?.tagline || initial.personalInfo.tagline,
    shortIntro:
      cms.home?.heroDescription || cms.settings?.shortIntro || initial.personalInfo.shortIntro,
    email: cms.settings?.email ?? initial.personalInfo.email,
    phone: cms.settings?.phone ?? initial.personalInfo.phone,
    location: cms.settings?.location || initial.personalInfo.location,
    linkedin: cms.settings?.linkedin || initial.personalInfo.linkedin,
    website: cms.settings?.website || initial.personalInfo.website,
    heroImage: cms.home?.heroImage || cms.settings?.heroImage || initial.personalInfo.heroImage,
  };

  // 2. About Section
  const mappedAchievements: Achievement[] =
    cms.achievements && cms.achievements.length > 0
      ? cms.achievements.map((a) => ({
          id: a.id,
          title: a.title,
          value: a.valueMetric || a.yearDate,
          description: a.description,
          iconName: a.iconName || 'Award',
        }))
      : initial.about.achievements;

  const about = {
    ...initial.about,
    heading: cms.home?.sectionHeadings?.aboutTitle || cms.home?.aboutHeading || initial.about.heading,
    subheading:
      cms.home?.sectionHeadings?.aboutSubtitle ||
      cms.home?.aboutSubheading ||
      initial.about.subheading,
    biography:
      cms.home?.aboutBiography && cms.home.aboutBiography.length > 0
        ? cms.home.aboutBiography
        : initial.about.biography,
    vision: cms.home?.aboutVision || initial.about.vision,
    mission: cms.home?.aboutMission || initial.about.mission,
    coreValues:
      cms.home?.aboutCoreValues && cms.home.aboutCoreValues.length > 0
        ? cms.home.aboutCoreValues
        : initial.about.coreValues,
    image: cms.home?.aboutImage || initial.about.image,
    achievements: mappedAchievements,
  };

  // 3. Services Section
  const mappedServices: ServiceItem[] =
    cms.services && cms.services.length > 0
      ? cms.services.map((s) => ({
          id: s.id,
          title: s.name,
          description: s.description,
          iconName: s.iconName || 'Globe',
          yearsOfExperience: s.yearsOfExperience || 0,
          features: s.features || [],
          tag: s.tag || s.category,
        }))
      : initial.services.services;

  const services = {
    ...initial.services,
    heading:
      cms.home?.sectionHeadings?.servicesTitle || initial.services.heading,
    subheading:
      cms.home?.sectionHeadings?.servicesSubtitle || initial.services.subheading,
    services: mappedServices,
  };

  // 4. Activities & Meetings Section
  const mappedMeetingsAsActivities: ActivityItem[] = (cms.meetings || []).map((m) => ({
    id: m.id,
    youtubeId: '',
    url: m.image || '',
    title: m.title,
    category: 'Meetings' as const,
    description: m.description,
    hashtags: [m.statusCategory, m.location].filter(Boolean),
    date: m.date,
    location: m.location,
  }));

  // Non-meeting activities from initial portfolio data
  const nonMeetingActivities = (initial.activities.activities || []).filter(
    (a) => a.category !== 'Meetings'
  );

  const activities = {
    ...initial.activities,
    heading:
      cms.home?.sectionHeadings?.activitiesTitle || initial.activities.heading,
    subheading:
      cms.home?.sectionHeadings?.activitiesSubtitle || initial.activities.subheading,
    activities: [...mappedMeetingsAsActivities, ...nonMeetingActivities],
  };

  // 5. Lionistic Journey Headings
  const lionisticJourney = {
    ...initial.lionisticJourney,
    heading:
      cms.home?.sectionHeadings?.journeyTitle || initial.lionisticJourney.heading,
    subheading:
      cms.home?.sectionHeadings?.journeySubtitle || initial.lionisticJourney.subheading,
  };

  // 6. Career Section Headings
  const career = {
    ...initial.career,
    heading:
      cms.home?.sectionHeadings?.careerTitle || initial.career.heading,
    subheading:
      cms.home?.sectionHeadings?.careerSubtitle || initial.career.subheading,
  };

  return {
    ...initial,
    personalInfo,
    about,
    services,
    activities,
    lionisticJourney,
    career,
  };
}
