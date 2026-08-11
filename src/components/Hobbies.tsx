'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from './ui/SectionTitle';
import { HobbiesSectionData } from '../types/portfolio';
import { Trophy, Palette, Watch, Compass, Heart, Sparkles } from 'lucide-react';

interface HobbiesProps {
  hobbiesData: HobbiesSectionData;
}

const getHobbyIcon = (iconName: string) => {
  switch (iconName) {
    case 'Trophy': return Trophy;
    case 'Palette': return Palette;
    case 'Watch': return Watch;
    case 'Compass': return Compass;
    default: return Heart;
  }
};

export const Hobbies: React.FC<HobbiesProps> = ({ hobbiesData }) => {
  return (
    <section id="hobbies" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-100/50 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionTitle
          badgeText="Personal Pursuits"
          title={hobbiesData.heading}
          subtitle={hobbiesData.subheading}
        />

        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-16 text-base leading-relaxed">
          {hobbiesData.description}
        </p>

        {/* Hobbies Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {hobbiesData.hobbies.map((hobby, idx) => {
            const IconComp = getHobbyIcon(hobby.iconName);

            return (
              <motion.div
                key={hobby.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Hobby Header Banner */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 via-white to-amber-50/50 flex items-center justify-center border-b border-slate-200">
                  {hobby.image ? (
                    <img
                      src={hobby.image}
                      alt={hobby.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4">
                      <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-center text-amber-700 mb-2 group-hover:scale-110 transition-transform shadow-sm">
                        <IconComp className="w-7 h-7" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-amber-300 text-[10px] uppercase font-bold tracking-wider text-amber-800 shadow-sm">
                    {hobby.category}
                  </span>

                  {/* Floating Icon Badge */}
                  <div className="absolute bottom-3 right-4 w-10 h-10 rounded-xl btn-gold text-white flex items-center justify-center shadow-md">
                    <IconComp className="w-5 h-5" />
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
                      {hobby.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed mb-4">
                      {hobby.description}
                    </p>
                  </div>

                  {/* Highlights List */}
                  {hobby.highlights && hobby.highlights.length > 0 && (
                    <div className="pt-3 border-t border-slate-200 space-y-1.5">
                      {hobby.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-1.5 text-[11px] text-amber-800 font-medium">
                          <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
