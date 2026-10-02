import React from 'react';
import type { Metadata } from 'next';
import { initialPortfolioData } from '../data/portfolioData';
import { getPublishedCmsData } from '../lib/cms/storage';
import { mergeCmsIntoPortfolio } from '../lib/cms/transformer';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { LionisticJourney } from '../components/LionisticJourney';
import { Services } from '../components/Services';
import { Activities } from '../components/Activities';
import { Career } from '../components/Career';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const cmsData = await getPublishedCmsData();
  const title = cmsData?.settings?.seoMetaTitle || cmsData?.settings?.siteTitle || "Bangalore Siddegowda Ramesh | Executive Leadership";
  const description = cmsData?.settings?.seoMetaDescription || cmsData?.settings?.shortIntro || "Official leadership and portfolio platform of Bangalore Siddegowda Ramesh (Ramesh B.S)";
  const keywords = cmsData?.settings?.seoKeywords || "BS Ramesh, Lions Club Bangalore Brigade, District 317F, BSR IT Solutions, WIN5M, CSR Clean Water, Region Chairperson, MJF";

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function Home() {
  const cmsData = await getPublishedCmsData();
  const data = mergeCmsIntoPortfolio(initialPortfolioData, cmsData);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 relative selection:bg-amber-400 selection:text-slate-950">
      {/* Sticky Executive Navbar */}
      <Navbar personalInfo={data.personalInfo} />

      {/* Hero Section */}
      <Hero personalInfo={data.personalInfo} />

      {/* Section 1: ABOUT ME */}
      <About aboutData={data.about} team={cmsData?.team} />

      {/* Section 2: MY LIONISTIC JOURNEY */}
      <LionisticJourney journeyData={data.lionisticJourney} />

      {/* Section 3: SERVICES INVOLVED IN */}
      <Services servicesData={data.services} />

      {/* Section 4: MY ACTIVITIES */}
      <Activities activitiesData={data.activities} />

      {/* Section 5: CAREER */}
      <Career
        careerData={data.career}
        personalInfoName={data.personalInfo.name}
      />

      {/* Section 6: CONTACT HERO BANNER */}
      <ContactSection
        personalInfo={data.personalInfo}
        heading={cmsData?.home?.sectionHeadings?.contactTitle}
        subheading={cmsData?.home?.sectionHeadings?.contactSubtitle}
      />

      {/* Corporate Footer */}
      <Footer personalInfo={data.personalInfo} />
    </main>
  );
}
