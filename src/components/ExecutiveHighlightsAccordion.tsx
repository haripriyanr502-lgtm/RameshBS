'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Award,
  Building2,
  Users,
  HeartHandshake,
  FileText,
  Calendar,
  TrendingUp,
  Compass,
  Globe,
  Target,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Sparkles,
  Droplets,
  Activity,
  Rocket,
  Layout,
  Layers
} from 'lucide-react';
import { RegionChairDropdown } from './RegionChairDropdown';

/* ==========================================================================
   INTEGRATED LOGO BADGES (Placed inside headers/overview cards)
   ========================================================================== */

// 1. Lions Clubs International Logo Badge
const LionsLogoSVG: React.FC = () => (
  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#002B49]/90 border border-[#D4AF37]/40 shadow-md">
    <div className="w-7 h-7 rounded-full bg-[#003366] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-bold font-serif text-xs shrink-0">
      L
    </div>
    <div className="flex flex-col">
      <span className="text-[11px] font-bold text-white tracking-wide uppercase leading-none">Lions Clubs</span>
      <span className="text-[9px] font-semibold text-[#D4AF37] leading-none mt-0.5">Dist. 317F</span>
    </div>
  </div>
);

// 2. Leo Club Logo Badge
const LeoLogoSVG: React.FC = () => (
  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#1E1B4B]/90 border border-indigo-500/40 shadow-md">
    <div className="w-7 h-7 rounded-full bg-[#312E81] border border-amber-400 flex items-center justify-center text-amber-300 font-bold font-serif text-xs shrink-0">
      LEO
    </div>
    <div className="flex flex-col">
      <span className="text-[11px] font-bold text-white tracking-wide uppercase leading-none">Leo Club</span>
      <span className="text-[9px] font-semibold text-indigo-300 leading-none mt-0.5">Youth Leadership</span>
    </div>
  </div>
);

// 3. LCB Brigade Logo Badge
const LCBBrigadeLogoSVG: React.FC = () => (
  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-emerald-500/40 shadow-md">
    <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center text-emerald-400 font-bold font-serif text-[10px] leading-tight shrink-0">
      LCB
    </div>
    <div className="flex flex-col">
      <span className="text-[11px] font-bold text-white tracking-wide uppercase leading-none">LCB Brigade</span>
      <span className="text-[9px] font-semibold text-emerald-400 leading-none mt-0.5">Charter Flagship</span>
    </div>
  </div>
);

// 4. Rotary International Logo Badge
const RotaryLogoSVG: React.FC = () => (
  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#001D4A]/90 border border-[#F7A81B]/40 shadow-md">
    <div className="w-7 h-7 rounded-full bg-[#00246C] border border-[#F7A81B] flex items-center justify-center text-[#F7A81B] text-xs shrink-0">
      ⚙️
    </div>
    <div className="flex flex-col">
      <span className="text-[11px] font-bold text-white tracking-wide uppercase leading-none">Rotary Intl</span>
      <span className="text-[9px] font-semibold text-[#F7A81B] leading-none mt-0.5">Dist. 3190</span>
    </div>
  </div>
);

// 5. Service Above Self Motto Badge
const ServiceAboveSelfBadge: React.FC = () => (
  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-amber-950/50 border border-[#D4AF37]/50 shadow-md">
    <HeartHandshake className="w-4 h-4 text-[#D4AF37] shrink-0" />
    <span className="text-[11px] font-bold text-[#D4AF37] tracking-wider uppercase">Service Above Self</span>
  </div>
);

/* ==========================================================================
   MAIN ACCORDION COMPONENT WITH HOVER AUTOMATIC DROPDOWN
   ========================================================================== */

export const ExecutiveHighlightsAccordion: React.FC = () => {
  // Open dropdown index (0, 1, or 2). Defaults to null so it expands on hover and collapses on mouse leave.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setOpenIndex(index);
  };

  const handleMouseLeave = () => {
    setOpenIndex(null);
  };

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mt-12 space-y-6">
      
      {/* Section Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37]">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
              Executive & Leadership Highlights
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Move cursor over any header to inspect details • Automatically closes on mouse leave
            </p>
          </div>
        </div>

        <RegionChairDropdown buttonText="Region Chair & 12 Leo Clubs" variant="badge" />
      </div>

      {/* Accordion Container with Auto-Close on Mouse Leave */}
      <div className="space-y-5" onMouseLeave={handleMouseLeave}>
        
        {/* ==================================================================
            DROPDOWN 1: Charter Secretary & President – LCB Brigade
            ================================================================== */}
        <div 
          onMouseEnter={() => handleMouseEnter(0)}
          className={`rounded-2xl glass-card border transition-all duration-300 overflow-hidden shadow-xl ${
            openIndex === 0 ? 'border-[#D4AF37]/60 bg-slate-900/90 shadow-[#D4AF37]/5' : 'border-slate-800 hover:border-[#D4AF37]/40'
          }`}
        >
          {/* Accordion Header */}
          <button
            onClick={() => handleClick(0)}
            className="w-full p-6 text-left flex items-center justify-between gap-4 bg-gradient-to-r from-slate-900/90 via-[#0A1128]/80 to-slate-900/90 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
              <span className={`w-10 h-10 rounded-xl border flex items-center justify-center font-serif text-base font-bold transition-all ${
                openIndex === 0 ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]' : 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/40 group-hover:scale-105'
              }`}>
                01
              </span>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                    Charter Secretary & President – LCB Brigade
                  </h4>
                  {/* Integrated Logos in Header */}
                  <div className="flex items-center gap-2">
                    <LionsLogoSVG />
                    <LCBBrigadeLogoSVG />
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Lions Club of Bangalore Brigade • Lions International District 317F
                </p>
              </div>
            </div>
            <div className={`p-2 rounded-xl bg-slate-800 border border-slate-700 text-[#D4AF37] transition-transform duration-300 ${openIndex === 0 ? 'rotate-180 bg-[#D4AF37]/20 border-[#D4AF37]/40' : ''}`}>
              <ChevronDown className="w-5 h-5" />
            </div>
          </button>

          {/* Accordion Body */}
          <AnimatePresence initial={false}>
            {openIndex === 0 && (
              <motion.div
                key="dropdown-1"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="p-6 sm:p-8 space-y-8 border-t border-slate-800/80 bg-[#050814]/90 text-slate-300">
                  
                  {/* Overview & Role Explanations with integrated badges */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Overview Box */}
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-[#D4AF37]">
                          <Building2 className="w-5 h-5" />
                          <h5 className="text-xs font-bold uppercase tracking-wider text-white">What is LCB Brigade?</h5>
                        </div>
                        <LeoLogoSVG />
                      </div>
                      <p className="text-xs leading-relaxed text-slate-300">
                        Lions Club of Bangalore Brigade (LCB Brigade) is a premier charter club under Lions International District 317F. Dedicated to community empowerment, humanitarian relief, and youth engagement, LCB Brigade acts as a beacon of high-impact local service.
                      </p>
                    </div>

                    {/* Charter Secretary Box */}
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center gap-2 mb-3 text-[#D4AF37]">
                        <FileText className="w-5 h-5" />
                        <h5 className="text-xs font-bold uppercase tracking-wider text-white">Role of Charter Secretary</h5>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-300">
                        The Charter Secretary is the foundational administrative backbone of a newly established club. Responsible for legal chartering, administrative governance, membership documentation, meeting proceedings, and maintaining compliance with Lions International.
                      </p>
                    </div>

                    {/* Charter President Box */}
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center gap-2 mb-3 text-[#D4AF37]">
                        <Compass className="w-5 h-5" />
                        <h5 className="text-xs font-bold uppercase tracking-wider text-white">Role of Charter President</h5>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-300">
                        The Charter President provides executive vision and strategic direction during the pivotal founding year. Responsible for building the leadership board, establishing organizational culture, inspiring service initiatives, and driving membership growth.
                      </p>
                    </div>
                  </div>

                  {/* Key Responsibilities Grid */}
                  <div>
                    <h5 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Key Responsibilities</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { title: 'Establishing the Club', desc: 'Framing charter guidelines and club constitution', icon: Building2 },
                        { title: 'Building Leadership Team', desc: 'Recruiting and mentoring founding committee heads', icon: Users },
                        { title: 'Organizing Service Projects', desc: 'Designing high-impact CSR water and health initiatives', icon: HeartHandshake },
                        { title: 'Managing Documentation', desc: 'Maintaining official records and international reports', icon: FileText },
                        { title: 'Conducting Meetings', desc: 'Facilitating regular board and club general assemblies', icon: Calendar },
                        { title: 'Membership Growth', desc: 'Expanding active member base and volunteer network', icon: TrendingUp },
                        { title: 'Community Leadership', desc: 'Engaging local Panchayats and corporate partners', icon: Compass },
                        { title: 'Coordinating with Lions Intl', desc: 'Aligning local drives with District 317F goals', icon: Globe },
                      ].map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                          <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3 hover:border-[#D4AF37]/30 transition-colors">
                            <div className="p-2 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] shrink-0 mt-0.5">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div>
                              <h6 className="text-xs font-bold text-white">{item.title}</h6>
                              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Leadership Impact */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0A1128] to-slate-900 border border-[#D4AF37]/30 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
                        <Droplets className="w-6 h-6" />
                      </div>
                      <div>
                        <h5 className="text-base font-serif font-bold text-white">Leadership Impact & Flagship CSR Clean Water</h5>
                        <p className="text-xs text-[#D4AF37] font-medium">₹31+ Lakhs CSR Funding • 3 Rural RO Water Plants Handed Over</p>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Within 12 to 24 months of inception, successfully raised over <strong className="text-white">₹31+ Lakhs in Corporate CSR capital</strong> to construct, install, and hand over three commercial-grade Reverse Osmosis (RO) clean water purification plants in water-scarce regions of Karnataka (Lingarajpuram, Karnataka-Tamil Nadu Border, and Thralu). Provided safe, disease-free drinking water to thousands of rural villagers.
                    </p>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>


        {/* ==================================================================
            DROPDOWN 2: Rotary Club President & Transformation Leader
            ================================================================== */}
        <div 
          onMouseEnter={() => handleMouseEnter(1)}
          className={`rounded-2xl glass-card border transition-all duration-300 overflow-hidden shadow-xl ${
            openIndex === 1 ? 'border-[#D4AF37]/60 bg-slate-900/90 shadow-[#D4AF37]/5' : 'border-slate-800 hover:border-[#D4AF37]/40'
          }`}
        >
          {/* Accordion Header */}
          <button
            onClick={() => handleClick(1)}
            className="w-full p-6 text-left flex items-center justify-between gap-4 bg-gradient-to-r from-slate-900/90 via-[#0A1128]/80 to-slate-900/90 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
              <span className={`w-10 h-10 rounded-xl border flex items-center justify-center font-serif text-base font-bold transition-all ${
                openIndex === 1 ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]' : 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/40 group-hover:scale-105'
              }`}>
                02
              </span>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                    Rotary Club President & Transformation Leader
                  </h4>
                  {/* Integrated Logos in Header */}
                  <div className="flex items-center gap-2">
                    <RotaryLogoSVG />
                    <ServiceAboveSelfBadge />
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Rotary International • Rotary Bangalore Banashankari (RBB 2013-14)
                </p>
              </div>
            </div>
            <div className={`p-2 rounded-xl bg-slate-800 border border-slate-700 text-[#D4AF37] transition-transform duration-300 ${openIndex === 1 ? 'rotate-180 bg-[#D4AF37]/20 border-[#D4AF37]/40' : ''}`}>
              <ChevronDown className="w-5 h-5" />
            </div>
          </button>

          {/* Accordion Body */}
          <AnimatePresence initial={false}>
            {openIndex === 1 && (
              <motion.div
                key="dropdown-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="p-6 sm:p-8 space-y-8 border-t border-slate-800/80 bg-[#050814]/90 text-slate-300">
                  
                  {/* Rotary & President Overviews */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center gap-2 mb-3 text-[#F7A81B]">
                        <Globe className="w-5 h-5" />
                        <h5 className="text-xs font-bold uppercase tracking-wider text-white">What is Rotary International?</h5>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-300">
                        Rotary International is a global network of 1.4 million business and professional leaders who unite to provide humanitarian service, encourage high ethical standards in all vocations, and advance peace and goodwill worldwide under the motto <em>"Service Above Self."</em>
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center gap-2 mb-3 text-[#F7A81B]">
                        <ShieldCheck className="w-5 h-5" />
                        <h5 className="text-xs font-bold uppercase tracking-wider text-white">Role of Rotary Club President</h5>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-300">
                        The Rotary Club President serves as chief executive officer of the club, responsible for driving annual strategic goals, leading member engagement, orchestrating community development projects, and upholding corporate and social governance across the district.
                      </p>
                    </div>
                  </div>

                  {/* 5 Core Pillars Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Mission */}
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                      <div className="flex items-center gap-2 mb-2 text-[#D4AF37]">
                        <Target className="w-5 h-5" />
                        <h6 className="text-xs font-bold uppercase text-white">Mission</h6>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        To champion sustainable community development, healthcare access, and youth empowerment while inspiring members to lead with integrity.
                      </p>
                    </div>

                    {/* Community Development */}
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                      <div className="flex items-center gap-2 mb-2 text-[#D4AF37]">
                        <Users className="w-5 h-5" />
                        <h6 className="text-xs font-bold uppercase text-white">Community Development</h6>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Orchestrated community health checkups, blood donation drives, and local civic welfare projects for underserved urban areas.
                      </p>
                    </div>

                    {/* Transformation Initiatives */}
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                      <div className="flex items-center gap-2 mb-2 text-[#D4AF37]">
                        <Sparkles className="w-5 h-5" />
                        <h6 className="text-xs font-bold uppercase text-white">Transformation Initiatives</h6>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Spearheaded district-wide Pulse Polio eradication campaigns and revitalized club fellowship & administrative transparency.
                      </p>
                    </div>
                  </div>

                  {/* Leadership Responsibilities Section with Elegant Icons */}
                  <div>
                    <h5 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>Leadership Responsibilities</span>
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {[
                        { label: 'Leading Club Activities', icon: Compass },
                        { label: 'Community Development', icon: HeartHandshake },
                        { label: 'Membership Engagement', icon: Users },
                        { label: 'Project Planning', icon: Calendar },
                        { label: 'Public Relations', icon: Globe },
                        { label: 'Youth Empowerment', icon: Sparkles },
                        { label: 'Strategic Decision Making', icon: Target },
                        { label: 'Governance & Integrity', icon: ShieldCheck },
                      ].map((resp, idx) => {
                        const IconComponent = resp.icon;
                        return (
                          <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                            <div className="p-1.5 rounded-lg bg-[#F7A81B]/15 text-[#F7A81B]">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-semibold text-slate-200">{resp.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Impact Created */}
                  <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30">
                    <h5 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#F7A81B]" />
                      <span>Impact Created – President of Rotary Bangalore Banashankari (RBB 2013-14)</span>
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      As President of Rotary Bangalore Banashankari (2013-14), Ramesh led from the front, serving as a transformation leader. He revitalized club attendance, expanded humanitarian drives, organized widespread Pulse Polio vaccination campaigns, and established regular voluntary blood donation camps across Bangalore District 3190.
                    </p>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>


        {/* ==================================================================
            DROPDOWN 3: Founder of Bangalorean.com & WIN5M.com
            ================================================================== */}
        <div 
          onMouseEnter={() => handleMouseEnter(2)}
          className={`rounded-2xl glass-card border transition-all duration-300 overflow-hidden shadow-xl ${
            openIndex === 2 ? 'border-[#D4AF37]/60 bg-slate-900/90 shadow-[#D4AF37]/5' : 'border-slate-800 hover:border-[#D4AF37]/40'
          }`}
        >
          {/* Accordion Header */}
          <button
            onClick={() => handleClick(2)}
            className="w-full p-6 text-left flex items-center justify-between gap-4 bg-gradient-to-r from-slate-900/90 via-[#0A1128]/80 to-slate-900/90 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
              <span className={`w-10 h-10 rounded-xl border flex items-center justify-center font-serif text-base font-bold transition-all ${
                openIndex === 2 ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]' : 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/40 group-hover:scale-105'
              }`}>
                03
              </span>
              <div>
                <h4 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  Founder of Bangalorean.com & WIN5M.com
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Entrepreneurial Digital Platforms • Civic Engagement & Youth Sports Wellness
                </p>
              </div>
            </div>
            <div className={`p-2 rounded-xl bg-slate-800 border border-slate-700 text-[#D4AF37] transition-transform duration-300 ${openIndex === 2 ? 'rotate-180 bg-[#D4AF37]/20 border-[#D4AF37]/40' : ''}`}>
              <ChevronDown className="w-5 h-5" />
            </div>
          </button>

          {/* Accordion Body */}
          <AnimatePresence initial={false}>
            {openIndex === 2 && (
              <motion.div
                key="dropdown-3"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="p-6 sm:p-8 space-y-8 border-t border-slate-800/80 bg-[#050814]/90 text-slate-300">
                  
                  {/* SUBSECTION A: Bangalorean.com */}
                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                          <Globe className="w-6 h-6" />
                        </div>
                        <div>
                          <h5 className="text-lg font-serif font-bold text-white">A. Bangalorean.com</h5>
                          <p className="text-xs text-cyan-400 font-semibold">Global Community & Civic Digital Platform</p>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs font-semibold text-cyan-300">
                        <Globe className="w-3.5 h-3.5" />
                        <span>Bangalorean.com Badge</span>
                      </div>
                    </div>

                    {/* Key Information Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                        <h6 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Vision</h6>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          To be the global digital bridge connecting Bangaloreans worldwide while advocating for local civic and humanitarian causes.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                        <h6 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Purpose</h6>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Upgrading traditional yellow page listings into a value-driven social network focused on community empowerment and city pride.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                        <h6 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Mission</h6>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Connecting citizens, entrepreneurs, and global ex-pats with Bengaluru's vibrant cultural, enterprise, and social ecosystem.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                        <h6 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Target Audience</h6>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Bengaluru residents, global NRI diaspora, local business owners, startup founders, and non-profit change-makers.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 lg:col-span-2">
                        <h6 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">Community Impact & Digital Initiatives</h6>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Facilitating local humanitarian outreach, business networking, NGO support hubs, civic news portals, and social cause advocacy across metros.
                        </p>
                      </div>
                    </div>
                  </div>


                  {/* SUBSECTION B: WIN5M.com */}
                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-orange-500/30 space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/30">
                          <Activity className="w-6 h-6" />
                        </div>
                        <div>
                          <h5 className="text-lg font-serif font-bold text-white">B. WIN5M.com</h5>
                          <p className="text-xs text-orange-400 font-semibold">Youth Sports Talent & Family Calorie Balance Platform</p>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-orange-950/60 border border-orange-500/40 text-xs font-semibold text-orange-300">
                        <Rocket className="w-3.5 h-3.5" />
                        <span>WIN5M Startup Badge</span>
                      </div>
                    </div>

                    {/* Key Information Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                        <h6 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">Vision</h6>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          To cultivate a healthier, active nation by encouraging youth sports participation and physical wellness across Indian families.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                        <h6 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">Objectives</h6>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Help families achieve "Calories In, Calories Out" balance, manage daily stress levels, and discover young sports talent.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                        <h6 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">Innovation</h6>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Combining digital tracking tools, sports activity incentives, and grassroots event partnerships to make fitness daily.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                        <h6 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">Entrepreneurship</h6>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Conceived and spearheaded as an innovative community partnership unit under BSR IT Solutions Private Limited.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 lg:col-span-2">
                        <h6 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">Future Goals & Platform Overview</h6>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Expanding community partnerships nationwide to reach 5 Million participating kids and active families through digital fitness toolkits and sports event management.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
