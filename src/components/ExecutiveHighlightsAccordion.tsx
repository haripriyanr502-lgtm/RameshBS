'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  ChevronDown,
  Building2,
  FileText,
  Compass,
  CheckCircle2,
  Users,
  HeartHandshake,
  Calendar,
  TrendingUp,
  Globe,
  Droplets,
  Zap,
  ShieldCheck,
  Target,
  Sparkles,
  Activity,
  Rocket
} from 'lucide-react';
import { RegionChairDropdown } from './RegionChairDropdown';

/* SVG Logos */
const LionsLogoSVG = () => (
  <svg className="w-5 h-5 fill-[#F59E0B]" viewBox="0 0 24 24">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const LCBBrigadeLogoSVG = () => (
  <span className="text-[10px] font-extrabold tracking-wider bg-blue-900 border border-blue-400/50 text-blue-200 px-2 py-0.5 rounded shadow-sm">
    LCB BRIGADE
  </span>
);

const RotaryLogoSVG = () => (
  <svg className="w-5 h-5 fill-[#F59E0B]" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="2" fill="none" />
    <path d="M12 6v12M6 12h12" stroke="#F59E0B" strokeWidth="2" />
  </svg>
);

const ServiceAboveSelfBadge = () => (
  <span className="text-[10px] font-bold tracking-widest bg-amber-950 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded">
    SERVICE ABOVE SELF
  </span>
);

const LeoLogoSVG = () => (
  <span className="text-[10px] font-extrabold tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded shadow-sm">
    LEO CLUB
  </span>
);

export interface HighlightItem {
  id: string;
  title: string;
  description: string;
}

interface ExecutiveHighlightsAccordionProps {
  highlights?: HighlightItem[];
}

export const ExecutiveHighlightsAccordion: React.FC<ExecutiveHighlightsAccordionProps> = ({ highlights }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-700 shadow-sm">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
              Executive & Leadership Highlights
            </h3>
            <p className="text-xs text-slate-500 mt-1">
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
          className={`rounded-2xl bg-white border transition-all duration-300 overflow-hidden shadow-md ${
            openIndex === 0 ? 'border-amber-400 shadow-lg' : 'border-slate-200 hover:border-amber-300'
          }`}
        >
          {/* Accordion Header */}
          <button
            onClick={() => handleClick(0)}
            className="w-full p-6 text-left flex items-center justify-between gap-4 bg-gradient-to-r from-slate-50 via-white to-slate-100 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
              <span className={`w-10 h-10 rounded-xl border flex items-center justify-center font-serif text-base font-bold transition-all ${
                openIndex === 0 ? 'btn-gold text-white border-transparent shadow-sm' : 'bg-white text-amber-700 border-slate-200 shadow-sm group-hover:scale-105'
              }`}>
                01
              </span>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {highlights?.[0]?.title || 'Charter Secretary & President – LCB Brigade'}
                  </h4>
                  {/* Integrated Logos in Header */}
                  <div className="flex items-center gap-2">
                    <LionsLogoSVG />
                    <LCBBrigadeLogoSVG />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Lions Club of Bangalore Brigade • Lions International District 317F
                </p>
              </div>
            </div>
            <div className={`p-2 rounded-xl bg-slate-100 border border-slate-200 text-amber-700 transition-transform duration-300 ${openIndex === 0 ? 'rotate-180 bg-amber-50 border-amber-300' : ''}`}>
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
                <div className="p-6 sm:p-8 space-y-8 border-t border-slate-200 bg-white text-slate-700">
                  
                  {/* Overview & Role Explanations with integrated badges */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Overview Box */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 relative shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-amber-700">
                          <Building2 className="w-5 h-5" />
                          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">What is LCB Brigade?</h5>
                        </div>
                        <LeoLogoSVG />
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600">
                        Lions Club of Bangalore Brigade (LCB Brigade) is a premier charter club under Lions International District 317F. Dedicated to community empowerment, humanitarian relief, and youth engagement, LCB Brigade acts as a beacon of high-impact local service.
                      </p>
                    </div>

                    {/* Charter Secretary Box */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-3 text-amber-700">
                        <FileText className="w-5 h-5" />
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">Role of Charter Secretary</h5>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600">
                        The Charter Secretary is the foundational administrative backbone of a newly established club. Responsible for legal chartering, administrative governance, membership documentation, meeting proceedings, and maintaining compliance with Lions International.
                      </p>
                    </div>

                    {/* Charter President Box */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-3 text-amber-700">
                        <Compass className="w-5 h-5" />
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">Role of Charter President</h5>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600">
                        The Charter President provides executive vision and strategic direction during the pivotal founding year. Responsible for building the leadership board, establishing organizational culture, inspiring service initiatives, and driving membership growth.
                      </p>
                    </div>
                  </div>

                  {/* Key Responsibilities Grid */}
                  <div>
                    <h5 className="text-sm font-bold uppercase tracking-wider text-amber-700 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600" />
                      <span>Key Responsibilities</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { title: 'Establishing the Club', desc: 'Framing charter guidelines and club constitution', icon: Building2 },
                        { title: 'Administrative Compliance', desc: 'Filing international reports and legal documentation', icon: FileText },
                        { title: 'Membership Expansion', desc: 'Recruiting high-caliber professionals and leaders', icon: Users },
                        { title: 'Signature Service Events', desc: 'Executing community health, blood drives, and food relief', icon: HeartHandshake },
                      ].map((resp, idx) => {
                        const IconComponent = resp.icon;
                        return (
                          <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 hover:border-amber-400 transition-colors shadow-sm">
                            <div className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div>
                              <h6 className="text-xs font-bold text-slate-900">{resp.title}</h6>
                              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{resp.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Impact Summary */}
                  <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <h5 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-600" />
                      <span>Impact Created – LCB Brigade Leadership</span>
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {highlights?.[0]?.description ||
                        "As Charter Secretary and later Charter President of LCB Brigade, Ramesh laid the groundwork for one of District 317F's most active clubs. Under his stewardship, the club spearheaded extensive blood donation camps, clean water initiatives, and youth leadership mentorship projects across Bangalore."}
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
          className={`rounded-2xl bg-white border transition-all duration-300 overflow-hidden shadow-md ${
            openIndex === 1 ? 'border-amber-400 shadow-lg' : 'border-slate-200 hover:border-amber-300'
          }`}
        >
          {/* Accordion Header */}
          <button
            onClick={() => handleClick(1)}
            className="w-full p-6 text-left flex items-center justify-between gap-4 bg-gradient-to-r from-slate-50 via-white to-slate-100 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
              <span className={`w-10 h-10 rounded-xl border flex items-center justify-center font-serif text-base font-bold transition-all ${
                openIndex === 1 ? 'btn-gold text-white border-transparent shadow-sm' : 'bg-white text-amber-700 border-slate-200 shadow-sm group-hover:scale-105'
              }`}>
                02
              </span>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {highlights?.[1]?.title || 'Rotary Club President & Transformation Leader'}
                  </h4>
                  {/* Integrated Logos in Header */}
                  <div className="flex items-center gap-2">
                    <RotaryLogoSVG />
                    <ServiceAboveSelfBadge />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Rotary International • Rotary Bangalore Banashankari (RBB 2013-14)
                </p>
              </div>
            </div>
            <div className={`p-2 rounded-xl bg-slate-100 border border-slate-200 text-amber-700 transition-transform duration-300 ${openIndex === 1 ? 'rotate-180 bg-amber-50 border-amber-300' : ''}`}>
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
                <div className="p-6 sm:p-8 space-y-8 border-t border-slate-200 bg-white text-slate-700">
                  
                  {/* Rotary & President Overviews */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-3 text-amber-700">
                        <Globe className="w-5 h-5 text-amber-600" />
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">What is Rotary International?</h5>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600">
                        Rotary International is a global network of 1.4 million business and professional leaders who unite to provide humanitarian service, encourage high ethical standards in all vocations, and advance peace and goodwill worldwide under the motto <em>&quot;Service Above Self.&quot;</em>
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-3 text-amber-700">
                        <ShieldCheck className="w-5 h-5 text-amber-600" />
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">Role of Rotary Club President</h5>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600">
                        The Rotary Club President serves as chief executive officer of the club, responsible for driving annual strategic goals, leading member engagement, orchestrating community development projects, and upholding corporate and social governance across the district.
                      </p>
                    </div>
                  </div>

                  {/* 5 Core Pillars Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Mission */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2 text-amber-700">
                        <Target className="w-5 h-5 text-amber-600" />
                        <h6 className="text-xs font-bold uppercase text-slate-900">Mission</h6>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        To champion sustainable community development, healthcare access, and youth empowerment while inspiring members to lead with integrity.
                      </p>
                    </div>

                    {/* Community Development */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2 text-amber-700">
                        <Users className="w-5 h-5 text-amber-600" />
                        <h6 className="text-xs font-bold uppercase text-slate-900">Community Development</h6>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Orchestrated community health checkups, blood donation drives, and local civic welfare projects for underserved urban areas.
                      </p>
                    </div>

                    {/* Transformation Initiatives */}
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2 text-amber-700">
                        <Sparkles className="w-5 h-5 text-amber-600" />
                        <h6 className="text-xs font-bold uppercase text-slate-900">Transformation Initiatives</h6>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Spearheaded district-wide Pulse Polio eradication campaigns and revitalized club fellowship & administrative transparency.
                      </p>
                    </div>
                  </div>

                  {/* Leadership Responsibilities Section with Elegant Icons */}
                  <div>
                    <h5 className="text-sm font-bold uppercase tracking-wider text-amber-700 mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-600" />
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
                          <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 shadow-sm">
                            <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-semibold text-slate-800">{resp.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Impact Created */}
                  <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <h5 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-600" />
                      <span>Impact Created – President of Rotary Bangalore Banashankari (RBB 2013-14)</span>
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {highlights?.[1]?.description ||
                        'As President of Rotary Bangalore Banashankari (2013-14), Ramesh led from the front, serving as a transformation leader. He revitalized club attendance, expanded humanitarian drives, organized widespread Pulse Polio vaccination campaigns, and established regular voluntary blood donation camps across Bangalore District 3190.'}
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
          className={`rounded-2xl bg-white border transition-all duration-300 overflow-hidden shadow-md ${
            openIndex === 2 ? 'border-amber-400 shadow-lg' : 'border-slate-200 hover:border-amber-300'
          }`}
        >
          {/* Accordion Header */}
          <button
            onClick={() => handleClick(2)}
            className="w-full p-6 text-left flex items-center justify-between gap-4 bg-gradient-to-r from-slate-50 via-white to-slate-100 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
              <span className={`w-10 h-10 rounded-xl border flex items-center justify-center font-serif text-base font-bold transition-all ${
                openIndex === 2 ? 'btn-gold text-white border-transparent shadow-sm' : 'bg-white text-amber-700 border-slate-200 shadow-sm group-hover:scale-105'
              }`}>
                03
              </span>
              <div>
                <h4 className="text-lg sm:text-xl font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  {highlights?.[2]?.title || 'Founder of Bangalorean.com & WIN5M.com'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Entrepreneurial Digital Platforms • Civic Engagement & Youth Sports Wellness
                </p>
              </div>
            </div>
            <div className={`p-2 rounded-xl bg-slate-100 border border-slate-200 text-amber-700 transition-transform duration-300 ${openIndex === 2 ? 'rotate-180 bg-amber-50 border-amber-300' : ''}`}>
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
                <div className="p-6 sm:p-8 space-y-8 border-t border-slate-200 bg-white text-slate-700">
                  
                  {/* SUBSECTION A: Bangalorean.com */}
                  <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 border border-blue-200">
                          <Globe className="w-6 h-6" />
                        </div>
                        <div>
                          <h5 className="text-lg font-serif font-bold text-slate-900">A. Bangalorean.com</h5>
                          <p className="text-xs text-blue-700 font-bold">Global Community & Civic Digital Platform</p>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-blue-100 border border-blue-300 text-xs font-bold text-blue-800">
                        <Globe className="w-3.5 h-3.5" />
                        <span>Bangalorean.com Badge</span>
                      </div>
                    </div>

                    {/* Key Information Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                        <h6 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Vision</h6>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          To be the global digital bridge connecting Bangaloreans worldwide while advocating for local civic and humanitarian causes.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                        <h6 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Purpose</h6>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Upgrading traditional yellow page listings into a value-driven social network focused on community empowerment and city pride.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                        <h6 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Mission</h6>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Connecting citizens, entrepreneurs, and global ex-pats with Bengaluru&apos;s vibrant cultural, enterprise, and social ecosystem.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                        <h6 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Target Audience</h6>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Bengaluru residents, global NRI diaspora, local business owners, startup founders, and non-profit change-makers.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm lg:col-span-2">
                        <h6 className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Community Impact & Digital Initiatives</h6>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Facilitating local humanitarian outreach, business networking, NGO support hubs, civic news portals, and social cause advocacy across metros.
                        </p>
                      </div>
                    </div>
                  </div>


                  {/* SUBSECTION B: WIN5M.com */}
                  <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 border border-amber-200">
                          <Activity className="w-6 h-6" />
                        </div>
                        <div>
                          <h5 className="text-lg font-serif font-bold text-slate-900">B. WIN5M.com</h5>
                          <p className="text-xs text-amber-700 font-bold">Youth Sports Talent & Family Calorie Balance Platform</p>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-100 border border-amber-300 text-xs font-bold text-amber-800">
                        <Rocket className="w-3.5 h-3.5" />
                        <span>WIN5M Startup Badge</span>
                      </div>
                    </div>

                    {/* Key Information Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                        <h6 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Vision</h6>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          To cultivate a healthier, active nation by encouraging youth sports participation and physical wellness across Indian families.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                        <h6 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Objectives</h6>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Help families achieve &quot;Calories In, Calories Out&quot; balance, manage daily stress levels, and discover young sports talent.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                        <h6 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Innovation</h6>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Combining digital tracking tools, sports activity incentives, and grassroots event partnerships to make fitness daily.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                        <h6 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Entrepreneurship</h6>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Conceived and spearheaded as an innovative community partnership unit under BSR IT Solutions Private Limited.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm lg:col-span-2">
                        <h6 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Future Goals & Platform Overview</h6>
                        <p className="text-xs text-slate-600 leading-relaxed">
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
