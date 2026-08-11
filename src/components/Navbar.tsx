'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Crown } from 'lucide-react';
import { PersonalInfo } from '../types/portfolio';
import { RegionChairDropdown } from './RegionChairDropdown';

interface NavbarProps {
  personalInfo: PersonalInfo;
  onOpenImporter: () => void;
}

const navItems = [
  { label: 'ABOUT ME', href: '#about' },
  { label: 'MY LIONISTIC JOURNEY', href: '#lionistic-journey' },
  { label: 'SERVICES INVOLVED IN', href: '#services' },
  { label: 'MY ACTIVITIES', href: '#activities' },
  { label: 'CAREER', href: '#career' },
  { label: 'CONTACT ME', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ personalInfo, onOpenImporter }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // ScrollSpy logic
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-md'
          : 'py-5 bg-transparent border-b border-slate-200/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Executive Brand Logo & Region Chair Info Button */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="flex items-center gap-3 group focus:outline-none"
              onClick={(e) => handleNavClick(e, '#home')}
            >
              <div className="w-10 h-10 rounded-xl border border-amber-300 bg-amber-50 flex items-center justify-center text-amber-700 group-hover:border-amber-400 group-hover:shadow-md transition-all">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-tight text-slate-900 group-hover:text-amber-700 transition-colors">
                  {personalInfo.name}
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-amber-700">
                  Executive Portfolio
                </span>
              </div>
            </a>

            <div className="hidden sm:block">
              <RegionChairDropdown buttonText="Leo & Region Info" variant="badge" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
            {navItems.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-2.5 xl:px-3.5 py-2 text-[11px] xl:text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors duration-200 ${
                    isActive ? 'text-amber-700 font-bold' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-amber-500 to-amber-600 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:text-amber-700 border border-slate-200 bg-white shadow-sm"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-6 py-6 shadow-xl"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-sm font-semibold tracking-wider uppercase py-2 border-b border-slate-100 flex items-center justify-between ${
                      isActive ? 'text-amber-700 font-bold' : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-amber-600 shadow-sm" />}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
