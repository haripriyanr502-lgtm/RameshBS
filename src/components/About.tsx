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
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-400/10 rounded-full blur-[150px] pointer-events-none" />

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
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.06)] group min-h-[520px] flex items-center justify-center bg-slate-50">
              {aboutData.image ? (
                <img
                  src={aboutData.image}
                  alt="Executive Portrait"
                  className="w-full h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95"
                />
              ) : (
                <div className="w-full h-[520px] bg-gradient-to-b from-slate-50 via-white to-slate-100 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-28 h-28 rounded-full border-2 border-amber-500/40 bg-amber-50 flex items-center justify-center text-amber-600 mb-6 shadow-md">
                    <Compass className="w-12 h-12" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-slate-900 tracking-tight">
                    Bangalore Siddegowda Ramesh
                  </h4>
                  <p className="text-xs uppercase tracking-widest text-amber-700 mt-2 font-semibold">
                    Executive Profile Frame
                  </p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            {/* Vision & Mission Highlight Badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:block p-5 rounded-2xl bg-white/95 border border-slate-200 max-w-xs backdrop-blur-xl shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-amber-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Global Vision</span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                &ldquo;{aboutData.vision}&rdquo;
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
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-100 border border-slate-200 w-fit">
              <button
                onClick={() => setActiveTab('bio')}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === 'bio'
                    ? 'btn-gold shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Biography
              </button>

              <button
                onClick={() => setActiveTab('vision')}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === 'vision'
                    ? 'btn-gold shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Vision & Mission
              </button>

              <button
                onClick={() => setActiveTab('values')}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === 'values'
                    ? 'btn-gold shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Core Values
              </button>
            </div>

            {/* Tab 1: Biography */}
            {activeTab === 'bio' && (
              <div className="space-y-4 text-slate-700 leading-relaxed text-base">
                {aboutData.biography.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            )}

            {/* Tab 2: Vision & Mission */}
            {activeTab === 'vision' && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl glass-card border border-amber-300/40 bg-amber-50/40">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
                      <Eye className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-serif font-bold text-slate-900">Our Vision</h4>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-sm">
                    {aboutData.vision}
                  </p>
                </div>

                <div className="p-6 rounded-2xl glass-card border border-blue-300/40 bg-blue-50/40">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
                      <Compass className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-serif font-bold text-slate-900">Our Mission</h4>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-sm">
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
                    className="p-4 rounded-xl glass-card border border-slate-200 bg-white flex items-start gap-3 shadow-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-800">{val}</span>
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
                className="p-6 rounded-2xl glass-card border border-slate-200 hover:border-amber-400 bg-white shadow-md hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold font-serif text-amber-gradient mb-1">
                  {ach.value}
                </div>
                <div className="text-sm font-bold text-slate-900 mb-2">{ach.title}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{ach.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Executive & Leadership Highlights Accordion Interface */}
        <ExecutiveHighlightsAccordion highlights={aboutData.highlights} />

      </div>
    </section>
  );
};
