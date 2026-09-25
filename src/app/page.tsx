import React from 'react';
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

export default function Home() {
  const cmsData = getPublishedCmsData();
  const data = mergeCmsIntoPortfolio(initialPortfolioData, cmsData);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 relative selection:bg-amber-400 selection:text-slate-950">
      {/* Sticky Executive Navbar */}
      <Navbar personalInfo={data.personalInfo} />

      {/* Hero Section */}
      <Hero personalInfo={data.personalInfo} />

      {/* Section 1: ABOUT ME */}
      <About aboutData={data.about} />

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
      <ContactSection personalInfo={data.personalInfo} />

      {/* Corporate Footer */}
      <Footer personalInfo={data.personalInfo} />
    </main>
  );
}
