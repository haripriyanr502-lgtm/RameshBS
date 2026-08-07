'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from './ui/SectionTitle';
import { CareerSectionData } from '../types/portfolio';
import { Briefcase, Calendar, MapPin, Download, Award, ShieldCheck, CheckCircle2, ChevronRight, FileText } from 'lucide-react';

interface CareerProps {
  careerData: CareerSectionData;
  personalInfoName: string;
}

export const Career: React.FC<CareerProps> = ({ careerData, personalInfoName }) => {
  const [activeTab, setActiveTab] = useState<'experience' | 'awards'>('experience');

  const handleDownloadResume = () => {
    const resumeText = `EXECUTIVE PROFILE & CURRICULUM VITAE
==================================================
Name: ${personalInfoName}
Title: Senior Executive Chairman | CEO | International Board Director

CAREER TRAJECTORY:
${careerData.experiences
  .map(
    (exp) => `
- ${exp.designation} at ${exp.organization} (${exp.duration})
  Location: ${exp.location}
  Responsibilities:
  ${exp.responsibilities.map((r) => `  * ${r}`).join('\n')}
  Key Accomplishments:
  ${exp.keyAchievements.map((a) => `  * ${a}`).join('\n')}
`
  )
  .join('\n')}

CERTIFICATIONS & HONORS:
${careerData.certificatesAndAwards
  .map((c) => `- [${c.type}] ${c.title} (${c.year}) - ${c.issuer}`)
  .join('\n')}
`;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${personalInfoName.replace(/\s+/g, '_')}_Executive_Bio.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="career" className="py-24 bg-[#070C1E] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionTitle
          badgeText="Executive Experience"
          title={careerData.heading}
          subtitle={careerData.subheading}
        />

        {/* Top Controls: Tabs & Download Resume Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
          
          {/* Tab Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
            <button
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'experience'
                  ? 'btn-gold text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Corporate Timeline</span>
            </button>

            <button
              onClick={() => setActiveTab('awards')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'awards'
                  ? 'btn-gold text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Certificates & Awards ({careerData.certificatesAndAwards.length})</span>
            </button>
          </div>

          {/* Download Resume Button */}
          <button
            onClick={handleDownloadResume}
            className="btn-gold flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Executive Resume</span>
          </button>
        </div>

        {/* Tab Content 1: Corporate Experience Timeline */}
        {activeTab === 'experience' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            {careerData.experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 rounded-3xl glass-card border border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl relative"
              >
                {/* Header Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
                  <div>
                    <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
                      {exp.organization}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white mt-1">
                      {exp.designation}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-300">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>{exp.duration}</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="mb-6 space-y-2">
                  <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    Key Executive Responsibilities:
                  </h4>
                  <ul className="space-y-2 pl-2">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="text-sm text-slate-300 flex items-start gap-2.5">
                        <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Accomplishments */}
                {exp.keyAchievements && exp.keyAchievements.length > 0 && (
                  <div className="pt-4 border-t border-slate-800">
                    <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-2 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      Strategic Accomplishments:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {exp.keyAchievements.map((ach, aIdx) => (
                        <div
                          key={aIdx}
                          className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </motion.div>
            ))}
          </div>
        )}

        {/* Tab Content 2: Certificates & Awards Grid */}
        {activeTab === 'awards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {careerData.certificatesAndAwards.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-3xl glass-card border border-slate-800 hover:border-amber-500/50 transition-all shadow-xl flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>

                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/30">
                      {item.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">{item.year}</span>
                  </div>

                  <h4 className="text-lg font-serif font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-amber-400 font-semibold mb-2">{item.issuer}</p>

                  {item.description && (
                    <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
