'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from './ui/SectionTitle';
import { AboutSectionData } from '../types/portfolio';
import { Eye, Target, Compass, Award, CheckCircle2, Globe, MapPin, Mic, HeartHandshake } from 'lucide-react';

import { ExecutiveHighlightsAccordion } from './ExecutiveHighlightsAccordion';

interface AboutProps {
  aboutData: AboutSectionData;
}

const getIconComponent = (iconName?: string) => {
  switch (iconName) {
    case 'Globe': return Globe;
    case 'MapPin': return MapPin;
    case 'Mic': return Mic;
    case 'HeartHandshake': return HeartHandshake;
    default: return Award;
  }
};

export const About: React.FC<AboutProps> = ({ aboutData }) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'vision' | 'values'>('bio');

  return (
    <section id="about" className="py-24 bg-[#0A1128] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionTitle
          badgeText="Executive Profile"
          title={aboutData.heading}
          subtitle={aboutData.subheading}
        />

        {/* Top Grid: Image Beside Biography & Vision/Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Executive Image Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/30 shadow-2xl group min-h-[520px] flex items-center justify-center bg-[#050814]">
              {aboutData.image ? (
                <img
                  src={aboutData.image}
                  alt="Executive Portrait"
                  className="w-full h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-[520px] bg-gradient-to-b from-[#0A1128] via-[#050814] to-[#0F172A] flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-28 h-28 rounded-full border-2 border-[#D4AF37]/40 bg-[#0A1128] flex items-center justify-center text-[#D4AF37] mb-6 shadow-lg">
                    <Compass className="w-12 h-12" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-white tracking-tight">
                    Bangalore Siddegowda Ramesh
                  </h4>
                  <p className="text-xs uppercase tracking-widest text-[#D4AF37] mt-2 font-semibold">
                    Profile Photo Frame (Blank)
                  </p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            {/* Vision & Mission Highlight Badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:block p-5 rounded-2xl glass-card border border-[#D4AF37]/40 max-w-xs shadow-2xl">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">Global Vision</span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                "{aboutData.vision}"
              </p>
            </div>
          </motion.div>

          {/* Right Text Content with Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Interactive Tab Headers */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-slate-800 w-fit">
              <button
                onClick={() => setActiveTab('bio')}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all ${
                  activeTab === 'bio'
                    ? 'bg-[#D4AF37] text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Biography
              </button>

              <button
                onClick={() => setActiveTab('vision')}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all ${
                  activeTab === 'vision'
                    ? 'bg-[#D4AF37] text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Vision & Mission
              </button>

              <button
                onClick={() => setActiveTab('values')}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all ${
                  activeTab === 'values'
                    ? 'bg-[#D4AF37] text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Core Values
              </button>
            </div>

            {/* Tab 1: Biography */}
            {activeTab === 'bio' && (
              <div className="space-y-4 text-slate-300 leading-relaxed text-base">
                {aboutData.biography.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            )}

            {/* Tab 2: Vision & Mission */}
            {activeTab === 'vision' && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl glass-card border border-[#D4AF37]/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37]">
                      <Eye className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-serif font-bold text-white">Our Vision</h4>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    {aboutData.vision}
                  </p>
                </div>

                <div className="p-6 rounded-2xl glass-card border border-[#D4AF37]/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37]">
                      <Compass className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-serif font-bold text-white">Our Mission</h4>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    {aboutData.mission}
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Core Values */}
            {activeTab === 'values' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aboutData.coreValues.map((val, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl glass-card border border-slate-800 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-200">{val}</span>
                  </div>
                ))}
              </div>
            )}

          </motion.div>
        </div>

        {/* Stat Cards Grid: Achievements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {aboutData.achievements.map((ach, idx) => {
            const IconComp = getIconComponent(ach.iconName);
            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl glass-card border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold font-serif text-gold-gradient mb-1">
                  {ach.value}
                </div>
                <div className="text-sm font-bold text-white mb-2">{ach.title}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{ach.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Executive & Leadership Highlights Accordion Interface */}
        <ExecutiveHighlightsAccordion />

      </div>
    </section>
  );
};
