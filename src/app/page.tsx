'use client';

import React, { useState } from 'react';
import { initialPortfolioData } from '../data/portfolioData';
import { PortfolioData } from '../types/portfolio';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { LionisticJourney } from '../components/LionisticJourney';
import { Services } from '../components/Services';
import { Activities } from '../components/Activities';
import { Hobbies } from '../components/Hobbies';
import { Career } from '../components/Career';
import { Footer } from '../components/Footer';
import { DocumentImporterModal } from '../components/DocumentImporterModal';

export default function Home() {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [isImporterOpen, setIsImporterOpen] = useState(false);

  const handleUpdatePortfolio = (updatedData: PortfolioData) => {
    setData(updatedData);
  };

  return (
    <main className="min-h-screen bg-[#050814] text-[#F8FAFC] relative selection:bg-[#D4AF37] selection:text-[#050814]">
      {/* Sticky Executive Navbar */}
      <Navbar
        personalInfo={data.personalInfo}
        onOpenImporter={() => setIsImporterOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        personalInfo={data.personalInfo}
        onOpenImporter={() => setIsImporterOpen(true)}
      />

      {/* Section 1: ABOUT ME */}
      <About aboutData={data.about} />

      {/* Section 2: MY LIONISTIC JOURNEY */}
      <LionisticJourney journeyData={data.lionisticJourney} />

      {/* Section 3: SERVICES INVOLVED IN */}
      <Services servicesData={data.services} />

      {/* Section 4: MY ACTIVITIES */}
      <Activities activitiesData={data.activities} />

      {/* Section 5: HOBBIES */}
      <Hobbies hobbiesData={data.hobbies} />

      {/* Section 5: CAREER */}
      <Career
        careerData={data.career}
        personalInfoName={data.personalInfo.name}
      />

      {/* Corporate Footer */}
      <Footer personalInfo={data.personalInfo} />

      {/* Dynamic DOC/DOCX Content Ingestion Modal */}
      <DocumentImporterModal
        isOpen={isImporterOpen}
        onClose={() => setIsImporterOpen(false)}
        portfolioData={data}
        onUpdatePortfolio={handleUpdatePortfolio}
      />
    </main>
  );
}
