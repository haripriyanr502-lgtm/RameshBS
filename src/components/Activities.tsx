'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from './ui/SectionTitle';
import { ActivitiesSectionData, ActivityItem } from '../types/portfolio';
import { Play, Tag, Calendar, MapPin, X, Video, ExternalLink, HeartHandshake, Users, Globe } from 'lucide-react';

interface ActivitiesProps {
  activitiesData: ActivitiesSectionData;
}

export const Activities: React.FC<ActivitiesProps> = ({ activitiesData }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedVideo, setSelectedVideo] = useState<ActivityItem | null>(null);

  const categories = ['All', 'Service Activities', 'Meetings', 'Travel Activities'];

  const filteredActivities = activeCategory === 'All'
    ? activitiesData.activities
    : activitiesData.activities.filter(act => act.category === activeCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Service Activities': return HeartHandshake;
      case 'Meetings': return Users;
      case 'Travel Activities': return Globe;
      default: return Video;
    }
  };

  return (
    <section id="activities" className="py-24 bg-[#050814] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionTitle
          badgeText="Media & Field Engagement"
          title={activitiesData.heading}
          subtitle={activitiesData.subheading}
        />

        <p className="text-center text-slate-300 max-w-3xl mx-auto mb-12 text-base leading-relaxed">
          {activitiesData.description}
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const IconComponent = getCategoryIcon(cat);
            const isActive = activeCategory === cat;
            const count = cat === 'All'
              ? activitiesData.activities.length
              : activitiesData.activities.filter(a => a.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#050814] shadow-[0_0_20px_rgba(212,175,55,0.4)] font-bold scale-105'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-[#D4AF37]/40'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{cat}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-[#050814]/20 text-[#050814]' : 'bg-slate-800 text-slate-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Videos Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredActivities.map((activity, idx) => {
              const CategoryIcon = getCategoryIcon(activity.category);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  key={activity.id}
                  className="rounded-2xl glass-card border border-slate-800 hover:border-[#D4AF37]/50 overflow-hidden group hover:shadow-[0_10px_30px_rgba(212,175,55,0.12)] transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Thumbnail / Embed Preview Header */}
                  <div>
                    <div 
                      onClick={() => setSelectedVideo(activity)}
                      className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer group/thumb"
                    >
                      <img
                        src={`https://img.youtube.com/vi/${activity.youtubeId}/hqdefault.jpg`}
                        alt={activity.title}
                        className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500 opacity-85 group-hover/thumb:opacity-100"
                        loading="lazy"
                      />
                      
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-transparent to-black/40" />

                      {/* Category Badge Top Left */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 border border-[#D4AF37]/30 text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm">
                        <CategoryIcon className="w-3 h-3" />
                        <span>{activity.category}</span>
                      </div>

                      {/* Play Button Overlay Center */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-[#D4AF37]/90 text-[#050814] flex items-center justify-center group-hover/thumb:scale-110 group-hover/thumb:bg-[#D4AF37] transition-all shadow-[0_0_25px_rgba(212,175,55,0.5)]">
                          <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                      </div>

                      {/* Date & Location Bottom Bar */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 font-medium">
                        {activity.location && (
                          <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                            <MapPin className="w-3 h-3 text-[#D4AF37]" />
                            {activity.location}
                          </span>
                        )}
                        {activity.date && (
                          <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm ml-auto">
                            <Calendar className="w-3 h-3 text-[#D4AF37]" />
                            {activity.date}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6">
                      <h3 
                        onClick={() => setSelectedVideo(activity)}
                        className="text-lg font-serif font-bold text-white group-hover:text-[#D4AF37] transition-colors cursor-pointer line-clamp-2 mb-2 leading-snug"
                      >
                        {activity.title}
                      </h3>

                      <p className="text-slate-300 text-xs leading-relaxed line-clamp-3 mb-4">
                        {activity.description}
                      </p>
                    </div>
                  </div>

                  {/* Hashtags & External Link Footer */}
                  <div className="px-6 pb-6 pt-0 border-t border-slate-900/80 mt-auto">
                    <div className="flex flex-wrap gap-1.5 pt-4 mb-4">
                      {activity.hashtags.map((tag, tIdx) => (
                        <span 
                          key={tIdx}
                          className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-semibold text-[#D4AF37]/90 hover:text-[#D4AF37]"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => setSelectedVideo(activity)}
                        className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Watch Video
                      </button>

                      <a
                        href={activity.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white text-xs flex items-center gap-1 font-medium transition-colors"
                      >
                        <span>YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* YouTube Video Modal Player */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-[#0A1128] border border-[#D4AF37]/40 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#050814]">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                    {selectedVideo.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Embed Frame */}
              <div className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Modal Details Footer */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-serif font-bold text-white">
                  {selectedVideo.title}
                </h3>
                
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedVideo.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800">
                  <div className="flex flex-wrap gap-2">
                    {selectedVideo.hashtags.map((tag, idx) => (
                      <span key={idx} className="text-xs text-[#D4AF37] font-medium bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={selectedVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Open in YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
