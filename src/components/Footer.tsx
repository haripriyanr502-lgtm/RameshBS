'use client';

import React from 'react';
import { ArrowUp, Crown, Mail, Phone, Globe, MapPin, HeartHandshake } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';

interface FooterProps {
  personalInfo: PersonalInfo;
}

export const Footer: React.FC<FooterProps> = ({ personalInfo }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#050814] text-slate-300 border-t border-[#D4AF37]/20 pt-16 pb-12 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-t from-[#D4AF37]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] bg-[#0A1128] flex items-center justify-center text-[#D4AF37]">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white tracking-tight">
                  {personalInfo.name}
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#D4AF37]">
                  Executive & Social Leader
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {personalInfo.tagline}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-[#D4AF37]">
              <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
              <span>Lions Clubs International Director</span>
            </div>
          </div>

          {/* Quick Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">
              Portfolio Navigation
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider font-semibold">
              <li>
                <a href="#about" className="hover:text-[#D4AF37] transition-colors">
                  1. About Me
                </a>
              </li>
              <li>
                <a href="#lionistic-journey" className="hover:text-[#D4AF37] transition-colors">
                  2. My Lionistic Journey
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors">
                  3. Services Involved In
                </a>
              </li>
              <li>
                <a href="#hobbies" className="hover:text-[#D4AF37] transition-colors">
                  4. Hobbies
                </a>
              </li>
              <li>
                <a href="#career" className="hover:text-[#D4AF37] transition-colors">
                  5. Career
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">
              Direct Contact & Socials
            </h4>

            <div className="space-y-3 text-xs">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 text-slate-300 hover:text-white group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37] transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span>{personalInfo.email}</span>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-3 text-slate-300 hover:text-white group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37] transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{personalInfo.phone}</span>
              </a>

              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-[#D4AF37]">
                  <MapPin className="w-4 h-4" />
                </div>
                <span>{personalInfo.location}</span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>

                <a
                  href={personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
                  aria-label="Personal Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.
          </p>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all font-semibold"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
