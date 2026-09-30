'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
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
  ChevronRight,
  ShieldCheck,
  Zap,
  Mail,
  Maximize2
} from 'lucide-react';
import { zoneChairpersonReportData, ZoneEventItem, ZoneClubReview } from '../data/zoneChairpersonReportData';

interface ZoneChairReportSectionProps {
  onOpenModal?: (tab?: 'overview' | 'events' | 'clubs' | 'dgams' | 'gallery' | 'reflections') => void;
}

export const ZoneChairReportSection: React.FC<ZoneChairReportSectionProps> = ({ onOpenModal }) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'events' | 'clubs' | 'dgams' | 'gallery' | 'reflections'>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    <div className="w-full space-y-8">
      {/* Executive Report Header Card */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-10 border-2 border-amber-400/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 bottom-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  Official District Report • {data.tenure}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-slate-200">
                  {data.region} • {data.zone}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs text-blue-200">
                  {data.chairperson.district}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                {data.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {data.subtitle} • Conferred to District Governor Ln. Narayanaswamy
              </p>
            </div>

            {onOpenModal && (
              <button
                onClick={() => onOpenModal('overview')}
                className="btn-gold px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 self-start md:self-center shadow-lg cursor-pointer shrink-0"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Fullscreen Report Mode</span>
              </button>
            )}
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-white/10">
            {data.summaryStats.map((stat, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-lg sm:text-xl font-bold text-amber-300 font-serif">{stat.value}</p>
                <p className="text-xs font-semibold text-white mt-1 leading-tight">{stat.label}</p>
                <p className="text-[10px] text-slate-400 truncate">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Internal Sub-Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {[
          { id: 'overview', label: 'Executive Summary', icon: Sparkles },
          { id: 'events', label: `Chronological Events (${data.eventsTimeline.length})`, icon: Calendar },
          { id: 'clubs', label: `Zone 1 Clubs Review (${data.clubsReview.length})`, icon: Building2 },
          { id: 'dgams', label: `DGAMs & Zone Socials (${data.dgams.length + 1})`, icon: Award },
          { id: 'gallery', label: `Photo Archives (${data.galleryImages.length})`, icon: ImageIcon },
          { id: 'reflections', label: 'ZC Reflections & Gratitude', icon: BookOpen }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as 'overview' | 'events' | 'clubs' | 'dgams' | 'gallery' | 'reflections')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-amber-300 shadow-md scale-105'
                  : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-amber-400 shadow-sm'
              }`}
            >
              <IconComp className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* =====================================================================
          SUB-TAB 1: OVERVIEW
          ===================================================================== */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* International VP Highlight */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-50 to-white border-2 border-amber-300 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 text-amber-500/10 pointer-events-none">
              <Globe className="w-48 h-48" />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
                <Crown className="w-4 h-4 text-amber-600" />
                <span>International Leadership Interaction</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Diplomatic Engagement with 2nd International Vice President Ln. Mark Lyon
              </h4>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-3xl">
                {data.internationalDignitaryInteraction.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-sm flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500">Distinguished Leader</p>
                    <p className="text-xs font-bold text-slate-900">{data.internationalDignitaryInteraction.leader}</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-amber-200 shadow-sm flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-100 text-blue-800">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500">Humanitarian Healthcare Impact</p>
                    <p className="text-xs font-bold text-slate-900">10 Dialysis Machines @ Sathya Sri Hospital / Shirdi Sai Hospital</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 w-fit">
                <Building2 className="w-5 h-5" />
              </div>
              <h5 className="font-serif font-bold text-sm text-slate-900">4 Zone 1 Clubs</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct leadership of LCB Brigade, LCB Cosmos, LCB Zen, and LCB Suraksha with 100% reporting compliance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 w-fit">
                <Droplets className="w-5 h-5" />
              </div>
              <h5 className="font-serif font-bold text-sm text-slate-900">₹31+ Lakhs CSR Plants</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Executed 3 RO water purification plants supplying pure drinking water to rural Bengaluru Panchayats.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 w-fit">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h5 className="font-serif font-bold text-sm text-slate-900">₹3.0+ Lakhs Direct Aid</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                2,500 kg quality rice distribution, ₹1.5L cancer water fuel kits, and 5,000+ school notebooks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="p-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 w-fit">
                <Trophy className="w-5 h-5" />
              </div>
              <h5 className="font-serif font-bold text-sm text-slate-900">Multiple District Sports</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Champions Trophy winner representing Zone 1 in the Multiple District 317 Cricket Tournament.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 2: EVENTS TIMELINE
          ===================================================================== */}
      {activeSubTab === 'events' && (
        <div className="space-y-6">
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search events, dates, venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition-all shadow-sm space-y-3 group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
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

                {evt.dignitaries && evt.dignitaries.length > 0 && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Dignitaries Present: </span>
                    <span className="text-slate-700 font-medium">{evt.dignitaries.join(' • ')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 3: CLUBS REVIEW
          ===================================================================== */}
      {activeSubTab === 'clubs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.clubsReview.map((club) => (
            <div
              key={club.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 transition-all shadow-md flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-amber-300 text-xs font-bold">
                    {club.type}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                    {club.statusBadge}
                  </span>
                </div>

                <h4 className="text-lg font-serif font-bold text-slate-900">{club.clubName}</h4>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  {club.leadership.president && (
                    <p><strong>President:</strong> {club.leadership.president}</p>
                  )}
                  {club.leadership.secretary && (
                    <p><strong>Secretary:</strong> {club.leadership.secretary}</p>
                  )}
                  {club.leadership.treasurer && (
                    <p><strong>Treasurer:</strong> {club.leadership.treasurer}</p>
                  )}
                  {club.leadership.keyLeaders && (
                    <p className="text-slate-600"><strong>Key Leaders:</strong> {club.leadership.keyLeaders.join(', ')}</p>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {club.overview}
                </p>

                <div className="space-y-1.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-900">Key Strengths & Impact:</p>
                  <ul className="space-y-1">
                    {club.strengths.map((st, sIdx) => (
                      <li key={sIdx} className="text-xs text-slate-600 flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                <p className="font-bold text-amber-900 uppercase tracking-wider text-[10px]">
                  Zone Chairperson Recommendation:
                </p>
                <p className="text-slate-700 italic">
                  &ldquo;{club.recommendations}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 4: DGAMS & ZONE SOCIALS
          ===================================================================== */}
      {activeSubTab === 'dgams' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.dgams.map((dgam, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 flex flex-col justify-between"
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

                  <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900">{dgam.title}</h4>

                  <div className="text-xs text-slate-600 space-y-0.5">
                    <p><strong>Venue:</strong> {dgam.venue} {dgam.time && `(${dgam.time})`}</p>
                    <p><strong>Host Club:</strong> {dgam.hostClub}</p>
                    <p className="text-amber-800"><strong>Leaders:</strong> {dgam.chiefGuestOrLeaders.join(' • ')}</p>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {dgam.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 space-y-1">
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

          {/* Zone Socials */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Zone 1 Culminating Fellowship</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-serif font-bold">{data.zoneSocials.title}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/10">
                <p className="text-amber-300 font-bold">Date & Time</p>
                <p>{data.zoneSocials.date} • {data.zoneSocials.time}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10">
                <p className="text-amber-300 font-bold">Keynote Speaker</p>
                <p>{data.zoneSocials.speaker}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10">
                <p className="text-amber-300 font-bold">Topic</p>
                <p className="text-amber-200">{data.zoneSocials.speakerTopic}</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {data.zoneSocials.description}
            </p>
          </div>
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 5: GALLERY
          ===================================================================== */}
      {activeSubTab === 'gallery' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.galleryImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img.src)}
              className="rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-amber-400 transition-all group cursor-pointer shadow-sm flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 text-[10px] font-bold text-amber-300">
                  {img.category}
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-slate-700 leading-snug line-clamp-2">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =====================================================================
          SUB-TAB 6: REFLECTIONS
          ===================================================================== */}
      {activeSubTab === 'reflections' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              Official Zone Chairperson Declaration
            </span>
            <h4 className="text-xl font-serif font-bold text-slate-900 mt-1">
              Concluding Reflections & District Gratitude
            </h4>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-900">Acknowledgements:</p>
            {data.concludingRemarks.acknowledgements.map((ack, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{ack}</span>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-slate-800 italic leading-relaxed">
            &ldquo;{data.concludingRemarks.personalReflection}&rdquo;
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 text-white text-xs leading-relaxed">
            <span className="text-amber-400 font-bold uppercase block mb-1">Ongoing District Commitment</span>
            &ldquo;{data.concludingRemarks.availabilityStatement}&rdquo;
          </div>
        </div>
      )}

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4"
        >
          <img src={selectedImage} alt="Expanded Archival Photo" className="max-w-full max-h-[85vh] object-contain rounded-xl" />
        </div>
      )}
    </div>
  );
};
