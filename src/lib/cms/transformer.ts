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
    name: cms.settings?.ownerName ?? cms.home?.heroTitle ?? initial.personalInfo.name,
    title: cms.home?.heroTagline ?? cms.settings?.tagline ?? initial.personalInfo.title,
    tagline: cms.settings?.tagline ?? initial.personalInfo.tagline,
    shortIntro:
      cms.home?.heroDescription ?? cms.settings?.shortIntro ?? initial.personalInfo.shortIntro,
    email: cms.settings?.email ?? initial.personalInfo.email,
    phone: cms.settings?.phone ?? initial.personalInfo.phone,
    location: cms.settings?.location ?? initial.personalInfo.location,
    linkedin: cms.settings?.linkedin ?? initial.personalInfo.linkedin,
    website: cms.settings?.website ?? initial.personalInfo.website,
    heroImage:
      cms.home?.heroImage !== undefined
        ? cms.home.heroImage
        : cms.settings?.heroImage !== undefined
        ? cms.settings.heroImage
        : initial.personalInfo.heroImage,
  };

  // 2. About Section
  const mappedAchievements: Achievement[] = Array.isArray(cms.achievements)
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
    heading:
      cms.home?.aboutHeading ?? cms.home?.sectionHeadings?.aboutTitle ?? initial.about.heading,
    subheading:
      cms.home?.aboutSubheading ??
      cms.home?.sectionHeadings?.aboutSubtitle ??
      initial.about.subheading,
    biography:
      cms.home?.aboutBiography !== undefined
        ? cms.home.aboutBiography
        : initial.about.biography,
    vision:
      cms.aboutExtras?.vision !== undefined
        ? cms.aboutExtras.vision
        : cms.home?.aboutVision !== undefined
        ? cms.home.aboutVision
        : initial.about.vision,
    mission:
      cms.aboutExtras?.mission !== undefined
        ? cms.aboutExtras.mission
        : cms.home?.aboutMission !== undefined
        ? cms.home.aboutMission
        : initial.about.mission,
    coreValues:
      cms.aboutExtras?.coreValues !== undefined
        ? cms.aboutExtras.coreValues
        : cms.home?.aboutCoreValues !== undefined
        ? cms.home.aboutCoreValues
        : initial.about.coreValues,
    highlights:
      cms.aboutExtras?.highlights !== undefined
        ? cms.aboutExtras.highlights
        : initial.about.highlights,
    image:
      cms.home?.aboutImage !== undefined
        ? cms.home.aboutImage
        : initial.about.image,
    achievements: mappedAchievements,
  };

  // 3. Services Section
  const mappedServices: ServiceItem[] = Array.isArray(cms.services)
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
      cms.home?.sectionHeadings?.servicesTitle ?? initial.services.heading,
    subheading:
      cms.home?.sectionHeadings?.servicesSubtitle ?? initial.services.subheading,
    services: mappedServices,
  };

  // 4. Projects & Activities Section
  const mappedActivities: ActivityItem[] = Array.isArray(cms.projects)
    ? cms.projects.map((p) => ({
        id: p.id,
        youtubeId: p.youtubeId || '',
        url: p.image || p.url || '',
        title: p.title,
        category: (p.category as ActivityItem['category']) || 'Service Activities',
        description: p.description,
        hashtags: p.hashtags || [],
        date: p.date,
        location: p.location,
      }))
    : initial.activities.activities;

  const activities = {
    ...initial.activities,
    heading:
      cms.home?.sectionHeadings?.activitiesTitle ?? initial.activities.heading,
    subheading:
      cms.home?.sectionHeadings?.activitiesSubtitle ?? initial.activities.subheading,
    activities: mappedActivities,
  };

  // 5. Lionistic Journey
  const lionisticJourney = {
    ...initial.lionisticJourney,
    heading:
      cms.lionisticJourney?.heading ??
      cms.home?.sectionHeadings?.journeyTitle ??
      initial.lionisticJourney.heading,
    subheading:
      cms.lionisticJourney?.subheading ??
      cms.home?.sectionHeadings?.journeySubtitle ??
      initial.lionisticJourney.subheading,
    overview: cms.lionisticJourney?.overview ?? initial.lionisticJourney.overview,
    mjfHonor: cms.lionisticJourney?.mjfHonor ?? initial.lionisticJourney.mjfHonor,
    milestones: Array.isArray(cms.lionisticJourney?.milestones)
      ? cms.lionisticJourney.milestones
      : initial.lionisticJourney.milestones,
    internationalExposures: Array.isArray(cms.lionisticJourney?.internationalExposures)
      ? cms.lionisticJourney.internationalExposures
      : initial.lionisticJourney.internationalExposures,
    blogPosts: Array.isArray(cms.lionisticJourney?.blogPosts)
      ? cms.lionisticJourney.blogPosts
      : initial.lionisticJourney.blogPosts,
  };

  // 6. Career Section
  const career = {
    ...initial.career,
    heading:
      cms.career?.heading ??
      cms.home?.sectionHeadings?.careerTitle ??
      initial.career.heading,
    subheading:
      cms.career?.subheading ??
      cms.home?.sectionHeadings?.careerSubtitle ??
      initial.career.subheading,
    resumeUrl: cms.career?.resumeUrl ?? initial.career.resumeUrl,
    experiences: Array.isArray(cms.career?.experiences)
      ? cms.career.experiences
      : initial.career.experiences,
    certificatesAndAwards: Array.isArray(cms.career?.certificatesAndAwards)
      ? cms.career.certificatesAndAwards
      : initial.career.certificatesAndAwards,
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
