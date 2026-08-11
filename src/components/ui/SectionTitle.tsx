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
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-xs uppercase tracking-widest font-bold mb-4 shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" style={{ animationDuration: '3s' }} />
        {badgeText}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-slate-900"
      >
        {title.split(' ').map((word, idx) => (
          <span key={idx}>
            {idx === title.split(' ').length - 1 ? (
              <span className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 bg-clip-text text-transparent"> {word}</span>
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
          className="max-w-3xl mx-auto text-base md:text-lg leading-relaxed text-slate-600"
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
        className={`h-1 w-28 bg-gradient-to-r from-blue-600 via-amber-500 to-amber-600 mt-6 rounded-full shadow-sm ${
          centered ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
};
