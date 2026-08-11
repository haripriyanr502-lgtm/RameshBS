'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from './ui/SectionTitle';
import { LionisticSectionData, LionisticBlogPost } from '../types/portfolio';
import {
  Crown,
  Calendar,
  MapPin,
  Award,
  X,
  ChevronRight,
  Globe,
  BookOpen,
  Sparkles,
  ChevronLeft,
  ArrowRight,
  Droplets,
  CheckCircle2
} from 'lucide-react';
import { RegionChairDropdown } from './RegionChairDropdown';

interface LionisticJourneyProps {
  journeyData: LionisticSectionData;
}

export const LionisticJourney: React.FC<LionisticJourneyProps> = ({ journeyData }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'timeline' | 'international' | 'blog'>('timeline');
  const [activeBlogPost, setActiveBlogPost] = useState<LionisticBlogPost | null>(null);

  // Gallery Hero Banner Slide State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const categories = ['ALL', 'International', 'Council', 'District', 'Club'];

  const filteredMilestones = journeyData.milestones.filter((item) => {
    if (selectedCategory === 'ALL') return true;
    return item.category === selectedCategory;
  });

  const gallerySlides = [
    {
      title: 'Melvin Jones Fellow (MJF 2025–2026) LCIF Honor',
      subtitle: 'Conferred LCIF’s Highest Honor for Exemplary Humanitarian Stewardship & Water CSR Infrastructure',
      category: 'LCIF International Honor',
      badge: 'MJF 2025–2026',
      icon: Award
    },
    {
      title: 'Nepal International Goodwill Delegation (Districts 325 B1 & B2)',
      subtitle: 'Engaged with Nepalese Lions Leaders Ln. Puja Shrestha Rajbanshi & Ln. Bishwo Raj Paudel',
      category: 'Cross-Border Exchange',
      badge: 'Nepal Delegation',
      icon: Globe
    },
    {
      title: 'Singapore Lions Leadership Forum (District 309)',
      subtitle: 'Exchanging WIN5M Youth Sports Talent & Modern Digital Governance Frameworks',
      category: 'International Forum',
      badge: 'Singapore Visit',
      icon: Crown
    },
    {
      title: 'Region Chairperson Leadership & 12 Advisory Leo Clubs',
      subtitle: 'Directing Humanitarian Drives & Mentoring Next-Gen Youth Leaders across District 317F',
      category: 'District Governance',
      badge: 'Region Chair 317F',
      icon: Crown
    },
    {
      title: '₹31+ Lakhs Corporate CSR Clean Water Plants',
      subtitle: 'Architected 3 RO Water Plants in Lingarajpuram, TN-Border & Thralu Panchayats',
      category: 'Humanitarian CSR',
      badge: 'Clean Water Impact',
      icon: Droplets
    }
  ];

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % gallerySlides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + gallerySlides.length) % gallerySlides.length);
  };

  return (
    <section id="lionistic-journey" className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        <SectionTitle
          badgeText="Lions Clubs International"
          title={journeyData.heading}
          subtitle={journeyData.subheading}
        />

        {/* Overview Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 rounded-3xl glass-card border border-slate-200 bg-white text-center max-w-4xl mx-auto relative overflow-hidden shadow-md"
        >
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <p className="text-slate-800 text-base md:text-lg italic font-serif leading-relaxed">
            "{journeyData.overview}"
          </p>
        </motion.div>

        {/* ==================================================================
            1. GALLERY HERO BANNER (Top Interactive Showcase)
            ================================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-100 via-white to-amber-50/60 shadow-lg text-slate-900"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.15)_0%,transparent_60%)] pointer-events-none" />

          <div className="p-8 sm:p-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Slide Info & Controls */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
                  {gallerySlides[currentSlideIndex].category}
                </span>

                <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
                  {gallerySlides[currentSlideIndex].badge}
                </span>

                <RegionChairDropdown buttonText="Region Chair & 12 Leo Clubs" variant="badge" />
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                {gallerySlides[currentSlideIndex].title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                {gallerySlides[currentSlideIndex].subtitle}
              </p>

              {/* Slider Controls */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-slate-800 border border-slate-700 hover:border-amber-400 hover:text-amber-300 text-white transition-all hover:scale-105 cursor-pointer"
                  title="Previous Banner Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-bold text-amber-400 font-mono">
                  0{currentSlideIndex + 1} / 0{gallerySlides.length}
                </span>
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-slate-800 border border-slate-700 hover:border-amber-400 hover:text-amber-300 text-white transition-all hover:scale-105 cursor-pointer"
                  title="Next Banner Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Stats Badges Container */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/40 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-amber-400">LCIF International Honor</p>
                    <p className="text-sm font-bold text-white">MJF (2025 - 2026)</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-blue-500/40 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-blue-400">International Exposure</p>
                    <p className="text-sm font-bold text-white">Nepal & Singapore</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/40 backdrop-blur-md col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-amber-400">Governance & Youth</p>
                    <p className="text-sm font-bold text-white">Region Chair & 12 Leo Clubs</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ==================================================================
            2. MELVIN JONES FELLOW (MJF) 2025-2026 SPOTLIGHT CARD
            ================================================================== */}
        {journeyData.mjfHonor && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-50 via-amber-100/70 to-amber-50 border-2 border-amber-300 shadow-lg relative overflow-hidden"
          >
            <div className="absolute right-4 top-4 text-amber-500/15 pointer-events-none">
              <Award className="w-48 h-48" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3.5 py-1.5 rounded-full gold-badge font-bold text-xs uppercase tracking-widest shadow-sm">
                    2025 – 2026 LCIF HONOR
                  </span>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                    Lions Clubs International Foundation
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                  Melvin Jones Fellow (MJF) Recognition
                </h3>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {journeyData.mjfHonor.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {journeyData.mjfHonor.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-amber-300 text-center space-y-3 shadow-md">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 border-2 border-white flex items-center justify-center text-white shadow-md">
                  <Award className="w-10 h-10" />
                </div>
                <h4 className="font-serif font-bold text-lg text-slate-900">Ln. B.S. Ramesh, MJF</h4>
                <p className="text-xs text-amber-700 font-bold">Melvin Jones Fellow • 2025–2026</p>
                <p className="text-[11px] text-slate-600">Lions Clubs International District 317F</p>
              </div>

            </div>
          </motion.div>
        )}

        {/* ==================================================================
            NAVIGATION SWITCHER (Timeline vs International Exposure vs Blog)
            ================================================================== */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { id: 'timeline', label: 'Lionistic Milestones Timeline', icon: Calendar },
            { id: 'international', label: 'International Lions Exposure', icon: Globe },
            { id: 'blog', label: 'International Visits & Service Blog', icon: BookOpen }
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'btn-gold shadow-md scale-105'
                    : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-amber-400 shadow-sm'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ==================================================================
            TAB CONTENT 1: LIONISTIC MILESTONES TIMELINE
            ================================================================== */}
        {activeTab === 'timeline' && (
          <div className="space-y-12">
            
            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? 'gold-badge shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat === 'ALL' ? 'All Milestones' : `${cat} Level`}
                </button>
              ))}
            </div>

            {/* Vertical Timeline */}
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-amber-400 to-amber-500 pointer-events-none" />

              <div className="space-y-12 md:space-y-16">
                {filteredMilestones.map((milestone, idx) => {
                  const isEven = idx % 2 === 0;

                  return (
                    <motion.div
                      key={milestone.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className={`relative flex flex-col md:flex-row items-start ${
                        isEven ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-20 w-8 h-8 rounded-full border-2 border-amber-400 bg-white flex items-center justify-center shadow-md">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                      </div>

                      <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                        <div className="p-6 md:p-8 rounded-3xl glass-card border border-slate-200 hover:border-amber-400 bg-white transition-all duration-300 group shadow-md space-y-4">
                          
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full gold-badge text-xs font-bold tracking-wider">
                              <Calendar className="w-3.5 h-3.5 text-amber-600" />
                              {milestone.year}
                            </span>

                            {milestone.category && (
                              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                                {milestone.category} Tier
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                              {milestone.position}
                            </h3>
                            {milestone.position.toLowerCase().includes('region chairperson') && (
                              <RegionChairDropdown buttonText="More Info" variant="badge" />
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-amber-700 font-semibold">
                            <span className="flex items-center gap-1">
                              <Crown className="w-3.5 h-3.5 text-amber-600" />
                              {milestone.organization}
                            </span>
                            {milestone.location && (
                              <span className="flex items-center gap-1 text-slate-500">
                                <MapPin className="w-3.5 h-3.5" />
                                {milestone.location}
                              </span>
                            )}
                          </div>

                          <p className="text-slate-600 text-sm leading-relaxed">
                            {milestone.description}
                          </p>

                          {milestone.achievements && milestone.achievements.length > 0 && (
                            <div className="space-y-2 pt-2 border-t border-slate-200">
                              <p className="text-xs uppercase tracking-wider text-amber-700 font-bold flex items-center gap-1.5">
                                <Award className="w-3.5 h-3.5 text-amber-600" />
                                Key Service Impact:
                              </p>
                              <ul className="space-y-1.5">
                                {milestone.achievements.map((ach, aIdx) => (
                                  <li key={aIdx} className="text-xs text-slate-700 flex items-start gap-2">
                                    <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                    <span>{ach}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ==================================================================
            TAB CONTENT 2: INTERNATIONAL LIONS EXPOSURE GRID
            ================================================================== */}
        {activeTab === 'international' && journeyData.internationalExposures && (
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                International Lions Exposure & Cross-Border Goodwill
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Representing Lions International District 317F across Nepal, Singapore, and global LCIF networks to foster humanitarian partnership.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {journeyData.internationalExposures.map((exp) => (
                <div
                  key={exp.id}
                  className="p-6 rounded-3xl glass-card border border-slate-200 hover:border-amber-400 bg-white transition-all duration-300 flex flex-col justify-between space-y-4 group shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-3 py-1 rounded-full gold-badge font-bold">
                        {exp.year}
                      </span>
                      <span className="text-slate-600 font-semibold flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 text-amber-600" />
                        {exp.country}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-lg text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                      {exp.title}
                    </h4>

                    <p className="text-xs text-amber-700 font-semibold">
                      District: {exp.district}
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                      Key Outcomes:
                    </p>
                    <ul className="space-y-1">
                      {exp.keyOutcomes.map((oc, oIdx) => (
                        <li key={oIdx} className="text-[11px] text-slate-700 flex items-start gap-1.5">
                          <ChevronRight className="w-3 h-3 text-amber-600 shrink-0 mt-0.5" />
                          <span>{oc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB CONTENT 3: INTERNATIONAL VISITS & SERVICE BLOG
            ================================================================== */}
        {activeTab === 'blog' && journeyData.blogPosts && (
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                International Visits & Service Blog
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Read firsthand accounts of Ln. B.S. Ramesh’s international Lions delegations, LCIF MJF recognition, and clean water CSR infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {journeyData.blogPosts.map((blog) => (
                <div
                  key={blog.id}
                  className="p-6 md:p-8 rounded-3xl glass-card border border-slate-200 hover:border-amber-400 bg-white transition-all duration-300 flex flex-col justify-between space-y-4 group shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-700 font-bold">
                        {blog.date}
                      </span>
                      <span>{blog.readTime}</span>
                    </div>

                    <h4 className="font-serif font-bold text-xl text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                      {blog.title}
                    </h4>

                    <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                      <span className="text-amber-700">{blog.author}</span>
                      <span>•</span>
                      <span>{blog.location}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {blog.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {blog.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveBlogPost(blog)}
                    className="btn-outline-gold w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* BLOG POST READER MODAL */}
      <AnimatePresence>
        {activeBlogPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveBlogPost(null)}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full max-h-[85vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 text-slate-800 shadow-2xl relative custom-scrollbar"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    Lions International Blog Article
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    {activeBlogPost.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    By {activeBlogPost.author} • {activeBlogPost.date} • {activeBlogPost.location}
                  </p>
                </div>
                <button
                  onClick={() => setActiveBlogPost(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="prose max-w-none text-xs sm:text-sm leading-relaxed space-y-4 text-slate-700 whitespace-pre-line">
                {activeBlogPost.content}
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setActiveBlogPost(null)}
                  className="btn-gold px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
