'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from './ui/SectionTitle';
import { LionisticSectionData, LionisticMilestone } from '../types/portfolio';
import { Crown, Calendar, MapPin, Award, Image as ImageIcon, X, ChevronRight } from 'lucide-react';

interface LionisticJourneyProps {
  journeyData: LionisticSectionData;
}

export const LionisticJourney: React.FC<LionisticJourneyProps> = ({ journeyData }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null);

  const categories = ['ALL', 'International', 'Council', 'District', 'Club'];

  const filteredMilestones = journeyData.milestones.filter((item) => {
    if (selectedCategory === 'ALL') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="lionistic-journey" className="py-24 bg-[#050814] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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
          className="mb-12 p-6 rounded-2xl glass-card border border-[#D4AF37]/30 text-center max-w-4xl mx-auto"
        >
          <p className="text-slate-200 text-base md:text-lg italic font-serif leading-relaxed">
            "{journeyData.overview}"
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? 'btn-gold shadow-lg'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'ALL' ? 'All Milestones' : `${cat} Level`}
            </button>
          ))}
        </div>

        {/* Vertical Animated Timeline */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Vertical Gold Connecting Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#D4AF37] via-[#E5C158] to-slate-800 pointer-events-none" />

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
                  
                  {/* Glowing Node in Center */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-20 w-8 h-8 rounded-full border-2 border-[#D4AF37] bg-[#0A1128] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.6)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
                  </div>

                  {/* Timeline Card */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="p-6 md:p-8 rounded-3xl glass-card border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 transition-all duration-300 group shadow-xl">
                      
                      {/* Top Header: Year Badge & Category */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full gold-badge text-xs font-bold tracking-wider">
                          <Calendar className="w-3.5 h-3.5" />
                          {milestone.year}
                        </span>

                        {milestone.category && (
                          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md">
                            {milestone.category} Tier
                          </span>
                        )}
                      </div>

                      {/* Position Title */}
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-1 group-hover:text-gold-gradient transition-colors">
                        {milestone.position}
                      </h3>

                      {/* Organization & Location */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#D4AF37] font-semibold mb-4">
                        <span className="flex items-center gap-1">
                          <Crown className="w-3.5 h-3.5" />
                          {milestone.organization}
                        </span>
                        {milestone.location && (
                          <span className="flex items-center gap-1 text-slate-400">
                            <MapPin className="w-3.5 h-3.5" />
                            {milestone.location}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 text-sm leading-relaxed mb-4">
                        {milestone.description}
                      </p>

                      {/* Key Milestone Achievements List */}
                      {milestone.achievements && milestone.achievements.length > 0 && (
                        <div className="space-y-2 pt-2 border-t border-slate-800 mb-4">
                          <p className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                            Key Service Impact:
                          </p>
                          <ul className="space-y-1.5">
                            {milestone.achievements.map((ach, aIdx) => (
                              <li key={aIdx} className="text-xs text-slate-300 flex items-start gap-2">
                                <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Event Photo Gallery Support */}
                      {milestone.gallery && milestone.gallery.length > 0 && (
                        <div className="pt-3 border-t border-slate-800">
                          <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                            Milestone Media Gallery:
                          </p>
                          <div className="flex gap-3 overflow-x-auto pb-1">
                            {milestone.gallery.map((imgUrl, gIdx) => (
                              <img
                                key={gIdx}
                                src={imgUrl}
                                alt="Lionistic Event"
                                onClick={() => setActiveGalleryImage(imgUrl)}
                                className="w-20 h-16 object-cover rounded-xl border border-slate-700 hover:border-[#D4AF37] cursor-pointer transition-transform hover:scale-105 shrink-0"
                              />
                            ))}
                          </div>
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

      {/* High-Res Gallery Image Lightbox Modal */}
      <AnimatePresence>
        {activeGalleryImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveGalleryImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative max-w-4xl w-full">
              <button
                onClick={() => setActiveGalleryImage(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-[#D4AF37] text-sm flex items-center gap-1 font-semibold"
              >
                <X className="w-6 h-6" />
                <span>Close</span>
              </button>
              <img
                src={activeGalleryImage}
                alt="Enlarged Lionistic Gallery Event"
                className="w-full max-h-[80vh] object-contain rounded-2xl border-2 border-[#D4AF37]/50 shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
