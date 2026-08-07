'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  badgeText: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  lightBackground?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  badgeText,
  title,
  subtitle,
  centered = true
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs uppercase tracking-widest font-bold mb-4 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
      >
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" style={{ animationDuration: '3s' }} />
        {badgeText}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-white"
      >
        {title.split(' ').map((word, idx) => (
          <span key={idx}>
            {idx === title.split(' ').length - 1 ? (
              <span className="bg-gradient-to-r from-white via-amber-200 to-amber-500 bg-clip-text text-transparent"> {word}</span>
            ) : (
              ` ${word}`
            )}
          </span>
        ))}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto text-base md:text-lg leading-relaxed text-slate-300"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative Gold & Blue Accent Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`h-0.5 w-28 bg-gradient-to-r from-blue-500 via-amber-400 to-blue-500 mt-6 ${
          centered ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
};
