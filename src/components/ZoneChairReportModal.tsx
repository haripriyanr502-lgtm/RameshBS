'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Award,
  Crown,
  Calendar,
  Building2,
  Users,
  Search,
  CheckCircle2,
  Sparkles,
  HeartHandshake,
  BookOpen,
  Image as ImageIcon,
  MapPin,
  Globe,
  Droplets,
  Trophy,
  Filter,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Mail,
  FileText
} from 'lucide-react';
import { zoneChairpersonReportData, ZoneEventItem, ZoneClubReview } from '../data/zoneChairpersonReportData';

interface ZoneChairReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'overview' | 'events' | 'clubs' | 'dgams' | 'gallery' | 'reflections';
}

export const ZoneChairReportModal: React.FC<ZoneChairReportModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'overview'
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'clubs' | 'dgams' | 'gallery' | 'reflections'>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const data = zoneChairpersonReportData;

  const categories = ['ALL', 'Service', 'Governance', 'Installation', 'Leadership & Training', 'Youth & Leo', 'Sports & Fellowship'];

  const filteredEvents = data.eventsTimeline.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.date.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden text-slate-800 z-10"
        >
          {/* Top Header Banner */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden border-b border-amber-500/30">
            {/* Ambient gold glow */}
            <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                    {data.tenure} Official Report
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-slate-200">
                    {data.region} • {data.zone}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold text-blue-200">
                    {data.chairperson.district}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
                  {data.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  Comprehensive Annual Stewardship Dossier • {data.chairperson.name} ({data.chairperson.designation})
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden sm:flex flex-col items-end text-right text-xs text-slate-300 pr-2 border-r border-white/20">
                  <span className="font-bold text-amber-300">{data.chairperson.name}</span>
                  <span>{data.chairperson.email}</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-all cursor-pointer border border-white/15"
                  title="Close Report"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Quick Stats Strip in Header */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mt-6 pt-4 border-t border-white/10">
              {data.summaryStats.map((stat, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <p className="text-base sm:text-lg font-bold text-amber-300 font-serif leading-none">{stat.value}</p>
                  <p className="text-[11px] font-semibold text-white mt-1 leading-tight">{stat.label}</p>
                  <p className="text-[9px] text-slate-400 truncate">{stat.sublabel}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Navigation Menu */}
          <div className="px-6 py-3 bg-slate-100 border-b border-slate-200 flex items-center gap-2 overflow-x-auto custom-scrollbar shrink-0">
            {[
              { id: 'overview', label: 'Executive Overview', icon: Sparkles },
              { id: 'events', label: `Chronological Events (${data.eventsTimeline.length})`, icon: Calendar },
              { id: 'clubs', label: `Zone 1 Clubs Review (${data.clubsReview.length})`, icon: Building2 },
              { id: 'dgams', label: `DGAMs & Zone Socials (${data.dgams.length + 1})`, icon: Award },
              { id: 'gallery', label: `Photo Archives (${data.galleryImages.length})`, icon: ImageIcon },
              { id: 'reflections', label: 'ZC Reflections & Acknowledgements', icon: BookOpen }
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'overview' | 'events' | 'clubs' | 'dgams' | 'gallery' | 'reflections')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-amber-300 shadow-md scale-[1.02]'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-amber-400'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Modal Body / Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
            
            {/* ================================================================
                TAB 1: EXECUTIVE OVERVIEW
                ================================================================ */}
            {activeTab === 'overview' && (
              <div className="space-y-8 max-w-5xl mx-auto">
                {/* High Profile International Dignitary Interaction Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-50 to-white border-2 border-amber-300 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 text-amber-500/15 pointer-events-none">
                    <Globe className="w-48 h-48" />
                  </div>

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>International Leadership Engagement</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                      Interaction with 2nd International Vice President Ln. Mark Lyon
                    </h3>

                    <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
                      {data.internationalDignitaryInteraction.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-sm flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                          <Crown className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-slate-500">LCI Dignitary</p>
                          <p className="text-xs font-bold text-slate-900">{data.internationalDignitaryInteraction.leader}</p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-sm flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-blue-100 text-blue-800">
                          <Droplets className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-slate-500">Humanitarian Healthcare Impact</p>
                          <p className="text-xs font-bold text-slate-900">10 Dialysis Units @ Sathya Sri / Shirdi Sai Hospital</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Zone Chairperson Profile & Governance Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Profile Box */}
                  <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center font-serif font-bold text-xl shadow-md">
                        <Award className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-lg text-slate-900">{data.chairperson.name}</h4>
                        <p className="text-xs font-bold text-amber-700">{data.chairperson.designation}</p>
                        <p className="text-[11px] text-slate-500">{data.chairperson.district}</p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-200 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-amber-600 shrink-0" />
                        <span><strong>Home Club:</strong> {data.chairperson.homeClub}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                        <span><strong>LDSF Trust:</strong> {data.chairperson.ldsfRole}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                        <span><strong>Official Email:</strong> {data.chairperson.email}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                      {data.chairperson.profileSummary}
                    </p>
                  </div>

                  {/* 4 Core Pillars of Zone 1 Stewardship */}
                  <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition-all shadow-sm space-y-2">
                      <div className="flex items-center gap-2.5 text-amber-700">
                        <div className="p-2 rounded-lg bg-amber-50 border border-amber-200">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <h5 className="font-serif font-bold text-sm text-slate-900">4 Active Clubs Governed</h5>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Direct administrative oversight of LCB Brigade, LCB Cosmos, LCB Zen, and LCB Suraksha, ensuring 100% reporting quorum and full protocol compliance.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition-all shadow-sm space-y-2">
                      <div className="flex items-center gap-2.5 text-blue-700">
                        <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                          <Droplets className="w-5 h-5" />
                        </div>
                        <h5 className="font-serif font-bold text-sm text-slate-900">₹31+ Lakhs CSR Clean Water</h5>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Spearheaded 3 large-scale rural RO water purification plants in Lingarajpuram, Karnataka-TN Border, and Thralu Panchayats.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition-all shadow-sm space-y-2">
                      <div className="flex items-center gap-2.5 text-emerald-700">
                        <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                          <HeartHandshake className="w-5 h-5" />
                        </div>
                        <h5 className="font-serif font-bold text-sm text-slate-900">₹3.0+ Lakhs Direct Service</h5>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Executed 2,500 kg quality rice distribution, ₹1.5L cancer water fuel kits, 5,000 notebooks distribution, and pediatric diaper relief at Jayanagar Hospital.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition-all shadow-sm space-y-2">
                      <div className="flex items-center gap-2.5 text-purple-700">
                        <div className="p-2 rounded-lg bg-purple-50 border border-purple-200">
                          <Trophy className="w-5 h-5" />
                        </div>
                        <h5 className="font-serif font-bold text-sm text-slate-900">Sports & Youth Leadership</h5>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Multiple District Cricket Champions Trophy winner as an all-rounder; active keynote speaker and mentor across BMSCE engineering students and LEO Satva.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================================================================
                TAB 2: CHRONOLOGICAL EVENTS TIMELINE
                ================================================================ */}
            {activeTab === 'events' && (
              <div className="space-y-6 max-w-5xl mx-auto">
                {/* Filter and Search Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  {/* Category Pills */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full md:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search events, venues, dates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Events Count Indicator */}
                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                  <span>Showing {filteredEvents.length} of {data.eventsTimeline.length} events</span>
                  {selectedCategory !== 'ALL' && (
                    <button
                      onClick={() => setSelectedCategory('ALL')}
                      className="text-amber-700 hover:underline font-bold"
                    >
                      Clear Category Filter
                    </button>
                  )}
                </div>

                {/* Timeline Cards List */}
                <div className="space-y-4">
                  {filteredEvents.map((evt, idx) => (
                    <div
                      key={evt.id}
                      className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition-all shadow-sm space-y-3 group"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold">
                            <Calendar className="w-3.5 h-3.5 text-amber-600" />
                            {evt.date}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-700">
                            {evt.category}
                          </span>
                        </div>

                        {evt.cost && (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                            Cost: {evt.cost}
                          </span>
                        )}
                      </div>

                      <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                        {evt.title}
                      </h4>

                      {evt.location && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{evt.location}</span>
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {evt.description}
                      </p>

                      {/* Dignitaries Strip */}
                      {evt.dignitaries && evt.dignitaries.length > 0 && (
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                            Dignitaries & Leaders Present:
                          </p>
                          <p className="text-slate-700 font-medium">{evt.dignitaries.join(' • ')}</p>
                        </div>
                      )}

                      {/* Highlights */}
                      {evt.highlights && evt.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {evt.highlights.map((hl, hIdx) => (
                            <span
                              key={hIdx}
                              className="inline-flex items-center gap-1 text-[11px] text-slate-700 bg-amber-50/50 border border-amber-200/60 px-2 py-0.5 rounded"
                            >
                              <CheckCircle2 className="w-3 h-3 text-amber-600 shrink-0" />
                              <span>{hl}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {filteredEvents.length === 0 && (
                    <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
                      <p className="text-sm">No events match your current search/filter.</p>
                      <button
                        onClick={() => {
                          setSelectedCategory('ALL');
                          setSearchQuery('');
                        }}
                        className="mt-3 text-xs font-bold text-amber-700 hover:underline"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ================================================================
                TAB 3: ZONE 1 CLUBS REVIEW
                ================================================================ */}
            {activeTab === 'clubs' && (
              <div className="space-y-8 max-w-5xl mx-auto">
                <div className="text-center max-w-2xl mx-auto space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    Comprehensive Review of Clubs Under Zone 1
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    In-depth governance evaluations, leadership audit, strengths, and strategic recommendations submitted to District Governor Ln. Narayanaswamy.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.clubsReview.map((club) => (
                    <div
                      key={club.id}
                      className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 transition-all shadow-md flex flex-col justify-between space-y-5"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="px-3 py-1 rounded-full bg-slate-900 text-amber-300 text-[11px] font-bold">
                            {club.type}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                            {club.statusBadge}
                          </span>
                        </div>

                        <h4 className="text-lg sm:text-xl font-serif font-bold text-slate-900 leading-snug">
                          {club.clubName}
                        </h4>

                        {/* Leadership Board */}
                        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                          <p className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">Leadership Board:</p>
                          {club.leadership.president && (
                            <p className="text-slate-800"><strong>President:</strong> {club.leadership.president}</p>
                          )}
                          {club.leadership.firstVP && (
                            <p className="text-slate-800"><strong>1st Vice President:</strong> {club.leadership.firstVP}</p>
                          )}
                          {club.leadership.secretary && (
                            <p className="text-slate-800"><strong>Secretary:</strong> {club.leadership.secretary}</p>
                          )}
                          {club.leadership.treasurer && (
                            <p className="text-slate-800"><strong>Treasurer:</strong> {club.leadership.treasurer}</p>
                          )}
                          {club.leadership.keyLeaders && (
                            <p className="text-slate-600"><strong>Key Leaders:</strong> {club.leadership.keyLeaders.join(', ')}</p>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {club.overview}
                        </p>

                        {/* Strengths */}
                        <div className="space-y-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            Key Strengths & Achievements:
                          </p>
                          <ul className="space-y-1.5">
                            {club.strengths.map((st, sIdx) => (
                              <li key={sIdx} className="text-xs text-slate-600 flex items-start gap-2">
                                <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                <span>{st}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Strategic Recommendations Box */}
                      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                        <p className="font-bold text-amber-900 uppercase tracking-wider text-[10px]">
                          Zone Chairperson Strategic Recommendation:
                        </p>
                        <p className="text-slate-700 leading-relaxed italic">
                          &ldquo;{club.recommendations}&rdquo;
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================================================================
                TAB 4: DGAMS & ZONE SOCIALS
                ================================================================ */}
            {activeTab === 'dgams' && (
              <div className="space-y-8 max-w-5xl mx-auto">
                <div className="text-center max-w-2xl mx-auto space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    District Governor Advisory Meetings & Zone Socials
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    4 Official DGAMs/ZAMs conducted throughout the 2024–25 Lionistic year, culminating in the Annual Zone Socials fellowship.
                  </p>
                </div>

                {/* DGAMs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.dgams.map((dgam, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 transition-all shadow-md space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider">
                            {dgam.number}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-amber-600" />
                            {dgam.date}
                          </span>
                        </div>

                        <h4 className="text-lg font-serif font-bold text-slate-900">{dgam.title}</h4>

                        <div className="text-xs text-slate-600 space-y-1">
                          <p><strong>Venue:</strong> {dgam.venue} {dgam.time && `(${dgam.time})`}</p>
                          <p><strong>Host Club:</strong> {dgam.hostClub}</p>
                          <p className="text-amber-800"><strong>Leaders Present:</strong> {dgam.chiefGuestOrLeaders.join(' • ')}</p>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed">
                          {dgam.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200 space-y-1.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Key Outcomes:</p>
                        {dgam.keyOutcomes.map((oc, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{oc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Zone Socials Spotlight Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>Signature Annual Fellowship Event</span>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-white">
                      {data.zoneSocials.title}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                      <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                        <p className="text-[10px] text-amber-300 uppercase font-bold">Date & Venue</p>
                        <p className="font-semibold text-white mt-0.5">{data.zoneSocials.date} • {data.zoneSocials.time}</p>
                        <p className="text-slate-400">{data.zoneSocials.venue}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                        <p className="text-[10px] text-amber-300 uppercase font-bold">Keynote Speaker</p>
                        <p className="font-semibold text-white mt-0.5">{data.zoneSocials.speaker}</p>
                        <p className="text-slate-400">Psychologist & Life Coach</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                        <p className="text-[10px] text-amber-300 uppercase font-bold">Keynote Topic</p>
                        <p className="font-semibold text-amber-200 mt-0.5">{data.zoneSocials.speakerTopic}</p>
                        <p className="text-slate-400">{data.zoneSocials.host}</p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {data.zoneSocials.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ================================================================
                TAB 5: PHOTO ARCHIVES
                ================================================================ */}
            {activeTab === 'gallery' && (
              <div className="space-y-6 max-w-5xl mx-auto">
                <div className="text-center max-w-2xl mx-auto space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    Zone Chairperson Activity Photo Archives
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Authentic visual documentation extracted directly from the Zone Chairperson Report document.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.galleryImages.map((img) => (
                    <div
                      key={img.id}
                      onClick={() => setSelectedImage(img.src)}
                      className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 hover:border-amber-400 transition-all group cursor-pointer shadow-sm flex flex-col justify-between"
                    >
                      <div className="relative h-44 overflow-hidden bg-slate-200">
                        <img
                          src={img.src}
                          alt={img.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/75 backdrop-blur-sm text-[10px] font-bold text-amber-300">
                          {img.category}
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-slate-700 leading-snug line-clamp-2">
                          {img.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================================================================
                TAB 6: ZC REFLECTIONS & ACKNOWLEDGEMENTS
                ================================================================ */}
            {activeTab === 'reflections' && (
              <div className="space-y-6 max-w-4xl mx-auto">
                {/* Official Concluding Remarks Letter */}
                <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-6 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div>
                      <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                        Official Zone Chairperson Declaration
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-slate-900 mt-1">
                        Concluding Reflections & District Gratitude
                      </h3>
                    </div>
                    <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-700">
                      <Award className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Acknowledgements List */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <HeartHandshake className="w-4 h-4 text-amber-600" />
                      <span>Formal Acknowledgements:</span>
                    </h4>
                    <div className="space-y-2">
                      {data.concludingRemarks.acknowledgements.map((ack, aIdx) => (
                        <div key={aIdx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{ack}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Personal Reflection Quote */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-300 space-y-2">
                    <p className="text-xs uppercase font-bold text-amber-800 tracking-wider">Personal Leadership Reflection:</p>
                    <p className="text-sm font-serif italic text-slate-800 leading-relaxed">
                      &ldquo;{data.concludingRemarks.personalReflection}&rdquo;
                    </p>
                  </div>

                  {/* District Availability Statement */}
                  <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-2">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      <Zap className="w-4 h-4" />
                      <span>Commitment to District 317F</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      &ldquo;{data.concludingRemarks.availabilityStatement}&rdquo;
                    </p>
                  </div>

                  {/* Signature Box */}
                  <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-serif font-bold text-base text-slate-900">Ln. B.S. Ramesh, MJF</p>
                      <p className="text-xs text-amber-700 font-bold">Zone Chairperson (2024–2025) • LDSF Trustee</p>
                      <p className="text-[11px] text-slate-500">Lions International District 317F</p>
                    </div>
                    <button
                      onClick={onClose}
                      className="btn-gold px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
                    >
                      Close Report
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </motion.div>

        {/* IMAGE ZOOM MODAL */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-60 bg-slate-950/90 flex items-center justify-center p-4"
          >
            <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/20">
              <img src={selectedImage} alt="Expanded Archival Photo" className="max-w-full max-h-[85vh] object-contain" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 text-white hover:bg-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};
