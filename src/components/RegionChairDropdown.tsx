'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Info,
  Crown,
  HeartHandshake,
  Users,
  Zap,
  Calendar,
  Shield,
  ChevronDown,
  X,
  Search,
  Sparkles,
  Award,
  Globe,
  CheckCircle2,
  Droplets,
  MapPin,
  Building2,
  BookOpen,
  Eye,
  Activity,
  Flame
} from 'lucide-react';

/* ==========================================================================
   DATA STRUCTURES FOR REGION CHAIRPERSON & LEO ADVISORY
   ========================================================================== */

export interface LeoClubItem {
  id: number;
  name: string;
  category: string;
  advisoryRole: string;
  focusArea: string;
  keyInitiatives: string[];
  badgeColor: string;
}

export const LEO_CLUBS_LIST: LeoClubItem[] = [
  {
    id: 1,
    name: 'Leo Club of Bangalore Ashraya',
    category: 'Social Care & Elder Support',
    advisoryRole: 'Senior Leo Advisor',
    focusArea: 'Senior citizen support, health camps, orphanage nutrition drives',
    keyInitiatives: ['Old-age home care visits', 'Free medicine distribution', 'Festival joy drives'],
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40'
  },
  {
    id: 2,
    name: 'Leo Club of Bangalore Satva',
    category: 'Health & Environmental Wellness',
    advisoryRole: 'District Mentor & Advisor',
    focusArea: 'Tree plantation, plastic-free campaigns, public health awareness',
    keyInitiatives: ['Urban afforestation drives', 'Plastic cleanup marathons', 'Eco-brick workshops'],
    badgeColor: 'border-green-500/40 text-green-400 bg-green-950/40'
  },
  {
    id: 3,
    name: 'Leo Club of Bangalore Vishwayuvashakti',
    category: 'Youth Empowerment & Sports',
    advisoryRole: 'District Coordinator & Advisor',
    focusArea: 'WIN5M sports talent, youth marathons, physical activity balance',
    keyInitiatives: ['Junior athletic meets', 'Family calorie balance rallies', 'Youth fitness camps'],
    badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-950/40'
  },
  {
    id: 4,
    name: 'Leo Club of Bangalore Brigade Youth',
    category: 'Community CSR & Clean Water',
    advisoryRole: 'Charter Advisory Patron',
    focusArea: 'Rural RO water awareness, youth CSR volunteering, clean hygiene',
    keyInitiatives: ['RO plant maintenance drives', 'School sanitation kits', 'Clean water rallies'],
    badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-950/40'
  },
  {
    id: 5,
    name: 'Leo Club of Bangalore Sunrise Leadership',
    category: 'Skill Development & Public Speaking',
    advisoryRole: 'Leadership Development Advisor',
    focusArea: 'Public speaking debates, youth leadership workshops, governance',
    keyInitiatives: ['Youth parliament debates', 'Public speaking masterclasses', 'Time management seminars'],
    badgeColor: 'border-purple-500/40 text-purple-400 bg-purple-950/40'
  },
  {
    id: 6,
    name: 'Leo Club of Bangalore Heritage Champions',
    category: 'Cultural Preservation & Arts',
    advisoryRole: 'District Cultural Advisor',
    focusArea: 'Heritage walks, cultural festivals, youth fine arts encouragement',
    keyInitiatives: ['Bangalore heritage tours', 'Traditional art expos', 'Youth cultural nights'],
    badgeColor: 'border-rose-500/40 text-rose-400 bg-rose-950/40'
  },
  {
    id: 7,
    name: 'Leo Club of Bangalore Apex Scholars',
    category: 'Academic Mentorship & Literacy',
    advisoryRole: 'Educational Guidance Mentor',
    focusArea: 'Free notebook distribution, career counseling, exam guidance',
    keyInitiatives: ['Govt school book drives', 'Free tutoring sessions', 'Scholarship assistance'],
    badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40'
  },
  {
    id: 8,
    name: 'Leo Club of Bangalore Coastal Waves',
    category: 'Civic Safety & Emergency Relief',
    advisoryRole: 'Emergency Service Mentor',
    focusArea: 'Disaster relief kits, first-aid training, civic emergency support',
    keyInitiatives: ['First-aid CPR workshops', 'Flood relief distribution', 'Safety awareness drives'],
    badgeColor: 'border-sky-500/40 text-sky-400 bg-sky-950/40'
  },
  {
    id: 9,
    name: 'Leo Club of Bangalore Metro Titans',
    category: 'Urban Cleanliness & Hygiene',
    advisoryRole: 'City Improvement Advisor',
    focusArea: 'Swachh Bharat drives, public park maintenance, waste segregation',
    keyInitiatives: ['Public park beautification', 'Waste segregation awareness', 'Wall painting drives'],
    badgeColor: 'border-teal-500/40 text-teal-400 bg-teal-950/40'
  },
  {
    id: 10,
    name: 'Leo Club of Bangalore Yuva Prerana',
    category: 'Blood Donation & Organ Drive',
    advisoryRole: 'District Health Campaign Mentor',
    focusArea: 'Voluntary blood donor registries, organ pledge drives, donor camps',
    keyInitiatives: ['Emergency blood donor network', 'Organ donation rallies', 'Platelet donation drives'],
    badgeColor: 'border-red-500/40 text-red-400 bg-red-950/40'
  },
  {
    id: 11,
    name: 'Leo Club of Bangalore Pinnacle Leaders',
    category: 'Enterprise Internships & Career Growth',
    advisoryRole: 'Professional Development Mentor',
    focusArea: 'Corporate mock interviews, IT skill workshops, staffing guidance',
    keyInitiatives: ['Resume building bootcamps', 'Mock interview sessions', 'IT career guidance'],
    badgeColor: 'border-indigo-500/40 text-indigo-400 bg-indigo-950/40'
  },
  {
    id: 12,
    name: 'Leo Club of Bangalore Visionary Force',
    category: 'Eye Care & Vision Screening',
    advisoryRole: 'District Eye Care Mentor',
    focusArea: 'School vision screening camps, free spectacle distribution, eye donation',
    keyInitiatives: ['Child vision checkup camps', 'Free spectacle distribution', 'Eye pledge campaigns'],
    badgeColor: 'border-[#D4AF37]/50 text-[#D4AF37] bg-amber-950/40'
  }
];

export const SERVICE_HIGHLIGHTS = [
  {
    title: 'CSR Rural Clean Water Infrastructure',
    description: 'Spearheaded ₹31+ Lakhs corporate CSR capital to set up 3 RO drinking water plants in Lingarajpuram, TN-border, and Thralu.',
    icon: Droplets,
    stats: '3 RO Plants • ₹31L CSR'
  },
  {
    title: 'Mega Health & Vision Camps',
    description: 'Organized free general health checkups, vision screenings, and cataract surgeries across District 317F rural zones.',
    icon: Eye,
    stats: '1,500+ Beneficiaries'
  },
  {
    title: 'Hunger Relief & Food Distribution',
    description: 'Directing food packet distribution drives for underprivileged children and shelter homes during community drives.',
    icon: HeartHandshake,
    stats: 'Annual Food Drives'
  },
  {
    title: 'Diabetes Awareness Rallies',
    description: 'Conducting public blood sugar screening stations and awareness walks across public parks and metro hubs.',
    icon: Activity,
    stats: 'District 317F Initiative'
  }
];

export const FELLOWSHIP_HIGHLIGHTS = [
  {
    title: 'District 317F Leadership Fellowship Dinners',
    description: 'Hosting inter-club fellowship meets uniting Lions Club Presidents, Secretaries, and Zone Chairpersons across the region.',
    icon: Users
  },
  {
    title: 'International Lions Goodwill Delegations',
    description: 'Represented District 317F in Nepal (Districts 325 B1/B2) with Ln. Puja Shrestha Rajbanshi & Ln. Bishwo Raj Paudel, and Singapore (District 309).',
    icon: Globe
  },
  {
    title: 'Senior Lion & Youth Leo Inter-Generational Bonding',
    description: 'Facilitating joint fellowship retreats to foster mentorship between seasoned Lions leaders and enthusiastic Leo youth.',
    icon: Sparkles
  },
  {
    title: 'Inter-Club Talent & Sports Fellowship Evenings',
    description: 'Organizing friendly sports tournaments, cultural galas, and family networking nights across the region.',
    icon: Award
  }
];

export const ACTIVITIES_HIGHLIGHTS = [
  {
    title: 'WIN5M Youth Sports & Calorie Balance Movement',
    description: 'Pioneered nationwide youth athletic promotion, family stress management, and junior talent identification.',
    icon: Zap
  },
  {
    title: 'Voluntary Blood Donation Marathons',
    description: 'Regularly leading mass blood donation camps in collaboration with major Bengaluru hospitals and blood banks.',
    icon: Flame
  },
  {
    title: 'Leo Youth Leadership Institutes',
    description: 'Conducting interactive training workshops for Leos on parliamentary procedures, public speaking, and project planning.',
    icon: BookOpen
  },
  {
    title: 'Tree Planting & Eco Awareness Drives',
    description: 'Driving urban greening initiatives and sapling distribution campaigns across school campuses and parks.',
    icon: Building2
  }
];

export const MEETINGS_HIGHLIGHTS = [
  {
    title: 'Quarterly Region Council Meetings',
    description: 'Chairing 4 official Region Council Assemblies per Lions Year to evaluate club health, administrative compliance, and service targets.',
    icon: Calendar
  },
  {
    title: 'Zone Advisory Meetings (ZAM)',
    description: 'Coordinating with Zone Chairpersons to monitor club administration, membership growth, and District Governor goals.',
    icon: Shield
  },
  {
    title: 'Leo District Advisory Assemblies',
    description: 'Guiding Leo District Officers in quarterly council meetings, leadership elections, and annual youth conventions.',
    icon: Crown
  },
  {
    title: 'Official Club Visits & Charter Installations',
    description: 'Presiding over charter celebrations, officer installation ceremonies, and new member inductions across Region 317F clubs.',
    icon: CheckCircle2
  }
];

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */

interface RegionChairDropdownProps {
  buttonText?: string;
  variant?: 'badge' | 'button' | 'icon-only';
  className?: string;
}

export const RegionChairDropdown: React.FC<RegionChairDropdownProps> = ({
  buttonText = 'More Info',
  variant = 'badge',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'service' | 'fellowship' | 'activities' | 'meetings' | 'clubs'>('clubs');
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredClubs = LEO_CLUBS_LIST.filter(
    (club) =>
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.focusArea.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      
      {/* MORE INFO SYMBOL BUTTON */}
      {variant === 'badge' && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-[#D4AF37]/30 to-amber-600/20 border border-[#D4AF37]/60 text-[#D4AF37] hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:scale-105 group"
          title="Click to view Ramesh's Region Chairperson Governance, Services & 12 Leo Advisory Clubs"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
          </span>
          <Info className="w-3.5 h-3.5 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
          <span>{buttonText}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      )}

      {variant === 'button' && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn-gold px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg group"
        >
          <Info className="w-4 h-4 text-[#D4AF37]" />
          <span>{buttonText}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      )}

      {variant === 'icon-only' && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-[#D4AF37] hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-md"
          title="More Info: Region Chair & 12 Leo Advisory Clubs"
        >
          <Info className="w-4 h-4" />
        </button>
      )}

      {/* DROPDOWN / EXPANDED POP-OVER MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-4 top-20 sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-3 w-full sm:w-[680px] max-w-[92vw] z-50 rounded-3xl bg-[#070C1E]/95 border-2 border-[#D4AF37]/50 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl text-slate-200 overflow-hidden"
          >
            {/* Top Header */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-[#002B49] via-[#0A1128] to-[#1E1B4B] border-b border-[#D4AF37]/30 relative flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#D4AF37]/30 to-amber-600/40 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0 shadow-md">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                      District 317F • Region Chairperson
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white mt-1">
                    Region Chair Governance & 12 Leo Advisory Clubs
                  </h3>
                  <p className="text-xs text-slate-300">
                    Bangalore Siddegowda Ramesh (Ramesh B.S) — District Coordinator & Advisor
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs (5 Tabs) */}
            <div className="flex items-center gap-1 p-2 bg-[#050814] border-b border-slate-800 overflow-x-auto scrollbar-none">
              {[
                { id: 'clubs', label: '12 Leo Clubs', icon: Crown, badge: '12' },
                { id: 'service', label: 'Service', icon: HeartHandshake },
                { id: 'fellowship', label: 'Fellowship', icon: Users },
                { id: 'activities', label: 'Activities', icon: Zap },
                { id: 'meetings', label: 'Meetings', icon: Calendar }
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#D4AF37] to-amber-600 text-black shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${isActive ? 'bg-black text-[#D4AF37]' : 'bg-[#D4AF37]/20 text-[#D4AF37]'}`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENT CONTAINER */}
            <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4 text-xs leading-relaxed custom-scrollbar">
              
              {/* TAB 1: ALL 12 LEO CLUBS */}
              {activeTab === 'clubs' && (
                <div className="space-y-4">
                  {/* Banner & Search bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-950/20 border border-[#D4AF37]/30">
                    <div>
                      <p className="font-bold text-white text-xs">All 12 Leo Clubs under Ramesh's Advisory</p>
                      <p className="text-[11px] text-slate-400">Guiding youth leadership development across District 317F</p>
                    </div>
                    
                    <div className="relative w-full sm:w-48">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search Leo Club..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  {/* 12 Leo Clubs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredClubs.map((club) => (
                      <div
                        key={club.id}
                        className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-[#D4AF37]/40 transition-all space-y-2 group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[10px] font-bold text-[#D4AF37]">
                              {club.id}
                            </span>
                            <h4 className="font-bold text-white text-xs group-hover:text-[#D4AF37] transition-colors leading-snug">
                              {club.name}
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
                          <span className={`px-2 py-0.5 rounded-md border font-semibold ${club.badgeColor}`}>
                            {club.category}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-semibold">
                            {club.advisoryRole}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-300 leading-normal">
                          <span className="font-semibold text-[#D4AF37]">Focus: </span>
                          {club.focusArea}
                        </p>

                        <div className="pt-1.5 border-t border-slate-800/80 flex items-center gap-1 flex-wrap text-[10px] text-slate-400">
                          {club.keyInitiatives.map((init, iIdx) => (
                            <span key={iIdx} className="bg-slate-950 px-2 py-0.5 rounded text-slate-300">
                              • {init}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredClubs.length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      No Leo Clubs found matching "{searchQuery}".
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: SERVICE */}
              {activeTab === 'service' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1 flex items-center gap-2">
                      <HeartHandshake className="w-4 h-4" />
                      <span>Region Chairperson Humanitarian Service Architecture</span>
                    </h4>
                    <p className="text-slate-300 text-xs">
                      As Region Chairperson, Ramesh B.S mobilizes Lions and Leo clubs to deliver high-impact community service projects across District 317F.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICE_HIGHLIGHTS.map((item, sIdx) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={sIdx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-[#D4AF37]/30 transition-all">
                          <div className="flex items-center gap-2 text-[#D4AF37]">
                            <div className="p-2 rounded-xl bg-[#D4AF37]/10">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <h5 className="font-bold text-white text-xs">{item.title}</h5>
                          </div>
                          <p className="text-slate-300 text-[11px]">{item.description}</p>
                          <div className="pt-2 border-t border-slate-800 text-[10px] font-bold text-[#D4AF37]">
                            {item.stats}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: FELLOWSHIP */}
              {activeTab === 'fellowship' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Fellowship, Inter-Club Bonding & International Exchange</span>
                    </h4>
                    <p className="text-slate-300 text-xs">
                      Fellowship is the heartbeat of Lions International. Ramesh builds strong cross-club and international goodwill networks.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FELLOWSHIP_HIGHLIGHTS.map((item, fIdx) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={fIdx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-[#D4AF37]/30 transition-all">
                          <div className="flex items-center gap-2 text-[#D4AF37]">
                            <div className="p-2 rounded-xl bg-[#D4AF37]/10">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <h5 className="font-bold text-white text-xs">{item.title}</h5>
                          </div>
                          <p className="text-slate-300 text-[11px]">{item.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: ACTIVITIES */}
              {activeTab === 'activities' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      <span>Youth Activities, WIN5M & Community Drives</span>
                    </h4>
                    <p className="text-slate-300 text-xs">
                      Empowering youngsters through sports talent identification, wellness rallies, and blood donation drives.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ACTIVITIES_HIGHLIGHTS.map((item, aIdx) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={aIdx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-[#D4AF37]/30 transition-all">
                          <div className="flex items-center gap-2 text-[#D4AF37]">
                            <div className="p-2 rounded-xl bg-[#D4AF37]/10">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <h5 className="font-bold text-white text-xs">{item.title}</h5>
                          </div>
                          <p className="text-slate-300 text-[11px]">{item.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 5: MEETINGS */}
              {activeTab === 'meetings' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Governance Assemblies, Region Councils & Club Visits</span>
                    </h4>
                    <p className="text-slate-300 text-xs">
                      Ensuring seamless administrative governance across multiple Lions zones and 12 Leo youth clubs.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {MEETINGS_HIGHLIGHTS.map((item, mIdx) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={mIdx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-[#D4AF37]/30 transition-all">
                          <div className="flex items-center gap-2 text-[#D4AF37]">
                            <div className="p-2 rounded-xl bg-[#D4AF37]/10">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <h5 className="font-bold text-white text-xs">{item.title}</h5>
                          </div>
                          <p className="text-slate-300 text-[11px]">{item.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Footer */}
            <div className="p-4 bg-[#050814] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Crown className="w-4 h-4" />
                <span className="font-semibold">Region Chairperson • Lions International District 317F</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
              >
                Close View
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
