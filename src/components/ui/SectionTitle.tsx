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
  centered = true,
  lightBackground = false
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full gold-badge text-xs uppercase tracking-widest font-semibold mb-4"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
        {badgeText}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`text-3xl md:text-5xl font-serif font-bold tracking-tight mb-4 ${
          lightBackground ? 'text-slate-900' : 'text-white'
        }`}
      >
        {title.split(' ').map((word, idx) => (
          <span key={idx}>
            {idx === title.split(' ').length - 1 ? (
              <span className="text-gold-gradient"> {word}</span>
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
          className={`max-w-3xl mx-auto text-base md:text-lg leading-relaxed ${
            lightBackground ? 'text-slate-600' : 'text-slate-400'
          }`}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative Gold Accent Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`h-0.5 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-6 ${
          centered ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
};
