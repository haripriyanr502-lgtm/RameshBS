'use client';

import React, { useState, useEffect } from 'react';
import { initialPortfolioData } from '../data/portfolioData';
import { PortfolioData } from '../types/portfolio';
import { FullCmsDatabase } from '../lib/cms/types';
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

export default function Home() {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);

  // Synchronize with CMS published data on mount
  useEffect(() => {
    const fetchPublishedContent = async () => {
      try {
        const res = await fetch('/api/content', { cache: 'no-store' });
        if (res.ok) {
          const cmsData = (await res.json()) as FullCmsDatabase;
          const merged = mergeCmsIntoPortfolio(initialPortfolioData, cmsData);
          setData(merged);
        }
      } catch (err) {
        console.error('Content fetch error, using built-in portfolio data:', err);
      }
    };

    fetchPublishedContent();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 relative selection:bg-amber-400 selection:text-slate-950">
      {/* Sticky Executive Navbar */}
      <Navbar
        personalInfo={data.personalInfo}
        onOpenImporter={() => {}}
      />

      {/* Hero Section */}
      <Hero
        personalInfo={data.personalInfo}
        onOpenImporter={() => {}}
      />

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
