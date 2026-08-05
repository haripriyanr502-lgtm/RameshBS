'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from './ui/SectionTitle';
import { ServicesSectionData } from '../types/portfolio';
import { ShieldCheck, Presentation, HeartHandshake, TrendingUp, CheckCircle } from 'lucide-react';

interface ServicesProps {
  servicesData: ServicesSectionData;
}

const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case 'ShieldCheck': return ShieldCheck;
    case 'Presentation': return Presentation;
    case 'HeartHandshake': return HeartHandshake;
    case 'TrendingUp': return TrendingUp;
    default: return ShieldCheck;
  }
};

export const Services: React.FC<ServicesProps> = ({ servicesData }) => {
  return (
    <section id="services" className="py-24 bg-[#0A1128] relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionTitle
          badgeText="Executive Capabilities"
          title={servicesData.heading}
          subtitle={servicesData.subheading}
        />

        <p className="text-center text-slate-300 max-w-3xl mx-auto mb-16 text-base leading-relaxed">
          {servicesData.description}
        </p>

        {/* Services Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.services.map((service, idx) => {
            const IconComp = getServiceIcon(service.iconName);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="p-8 rounded-3xl glass-card border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 hover:shadow-[0_10px_35px_rgba(212,175,55,0.15)] transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon & Experience Pill */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-[#050814] transition-all duration-300">
                      <IconComp className="w-7 h-7" />
                    </div>


                  </div>

                  {/* Service Title */}
                  <h3 className="text-2xl font-serif font-bold text-white mb-3 group-hover:text-gold-gradient transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Key Deliverables / Features */}
                  {service.features && service.features.length > 0 && (
                    <div className="space-y-2.5 pt-4 border-t border-slate-800">
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                        Key Advisory Deliverables:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Tag */}
                {service.tag && (
                  <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
                      {service.tag}
                    </span>
                    <span className="text-xs text-slate-400 group-hover:text-white transition-colors flex items-center gap-1 font-semibold">
                      Inquire Advisory &rarr;
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
