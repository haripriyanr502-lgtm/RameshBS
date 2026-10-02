'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowRight, Download, Globe, Shield, Sparkles, Crown } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';
import { RegionChairDropdown } from './RegionChairDropdown';

interface HeroProps {
  personalInfo: PersonalInfo;
  onOpenImporter?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ personalInfo, onOpenImporter }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-[#F8FAFC]"
    >
      {/* Background Layered Blue & Gold Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[160px] pointer-events-none animate-glow" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-yellow-400/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Radial Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-3 flex-wrap"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gold-badge text-xs uppercase tracking-widest font-bold shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
                <span>International Leadership & Governance</span>
              </div>

              {/* Region Chairperson More Info Symbol & Dropdown */}
              <RegionChairDropdown buttonText="Region Chair & 12 Leo Clubs" variant="badge" />
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl xl:text-7xl font-serif font-bold text-slate-900 tracking-tight leading-[1.1]"
            >
              {personalInfo.name}
            </motion.h1>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-900 via-amber-700 to-amber-600 bg-clip-text text-transparent"
            >
              {personalInfo.title}
            </motion.div>

            {/* Short Introduction */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal"
            >
              {personalInfo.shortIntro}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <a
                href="#lionistic-journey"
                className="btn-gold w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 group cursor-pointer shadow-md"
              >
                <span>Explore Lionistic Journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#career"
                className="btn-outline-gold w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4 text-amber-600" />
                <span>Executive Profile</span>
              </a>
            </motion.div>
          </div>

          {/* Right Portrait Image Column */}
          <div className="lg:col-span-5 flex justify-center relative z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative w-full max-w-md"
            >
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-400/20 via-amber-400/20 to-amber-300/20 blur-xl pointer-events-none animate-glow" />

              {/* Portrait Container with Glass Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white min-h-[480px] sm:min-h-[540px] flex items-center justify-center">
                {personalInfo.heroImage ? (
                  <img
                    src={personalInfo.heroImage}
                    alt={personalInfo.name}
                    className="w-full h-[480px] sm:h-[540px] object-cover object-center hover:scale-105 transition-transform duration-700 opacity-95"
                  />
                ) : (
                  /* Blank Executive Photo Placeholder Frame */
                  <div className="w-full h-[480px] sm:h-[540px] bg-gradient-to-b from-slate-50 via-white to-slate-100 flex flex-col items-center justify-center p-8 relative group">
                    <div className="w-32 h-32 rounded-full border-2 border-amber-500/40 bg-amber-50 flex items-center justify-center text-amber-600 shadow-[0_0_30px_rgba(245,158,11,0.2)] mb-6 group-hover:scale-105 transition-transform">
                      <Crown className="w-14 h-14" />
                    </div>
                    <span className="font-serif text-2xl font-bold text-slate-900 tracking-widest uppercase text-center">
                      B.S. Ramesh
                    </span>
                    <span className="text-xs uppercase tracking-widest text-amber-700 mt-2 font-semibold">
                      Executive Leadership Profile
                    </span>
                  </div>
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Floating Bottom Card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-xl z-20 shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-amber-700 font-bold flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5 text-amber-600" />
                      Lions Clubs International
                    </p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">
                      Region Chairperson - District 317F
                    </p>
                  </div>
                  <RegionChairDropdown buttonText="More Info" variant="badge" direction="up" />
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
