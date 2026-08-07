'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from './ui/SectionTitle';
import { PersonalInfo } from '../types/portfolio';
import {
  Mail,
  Send,
  CheckCircle2,
  Lock,
  Briefcase,
  Users,
  Heart,
  Copy,
  Check,
  ShieldCheck,
  MessageSquare,
  User,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

interface ContactSectionProps {
  personalInfo: PersonalInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ personalInfo }) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [contactCategory, setContactCategory] = useState<'Professional' | 'Community' | 'Friend'>('Professional');
  const [justification, setJustification] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !justification || !senderName) return;

    // Trigger Mailto pre-filled email client
    const subject = encodeURIComponent(`[Portfolio Inquiry - ${contactCategory}] from ${senderName}`);
    const body = encodeURIComponent(
      `Hello Ln. Ramesh B.S,\n\nCategory: ${contactCategory}\nName: ${senderName}\nEmail: ${senderEmail}\n\nWhy I want to contact you:\n${justification}\n\nBest regards,\n${senderName}`
    );

    window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`, '_blank');
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#070C1E] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        <SectionTitle
          badgeText="Direct Communication"
          title="CONTACT RAMESH B.S"
          subtitle="Email is the Exclusive Official Point of Contact. Direct phone contact numbers are kept private for executive confidentiality."
        />

        {/* ==================================================================
            CONTACT HERO BANNER
            ================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden border border-amber-500/40 bg-gradient-to-br from-[#0F172A] via-[#0A1128] to-[#040714] shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="p-8 sm:p-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Privacy Notice & Official Email Badge */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full gold-badge text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Privacy Protected Contact Policy</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
                Connect Directly via Email
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether you are seeking enterprise IT solutions, contract staffing delivery, Lions/Leo community governance collaboration, or personal fellowship, please submit your inquiry below.
              </p>

              {/* Exclusive Email Card */}
              <div className="p-5 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-white space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-amber-400" />
                    Official Primary Contact Email
                  </span>

                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-amber-300 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                    title="Copy Email to Clipboard"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
                  </button>
                </div>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-lg sm:text-xl font-bold font-mono text-amber-300 hover:text-white block transition-colors break-all"
                >
                  {personalInfo.email}
                </a>

                <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Phone numbers are not disclosed to prevent spam & protect privacy.</span>
                </div>
              </div>

              {/* 3 Categories Summary Badges */}
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Inquiry Channels Accepted:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-semibold">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Professional</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Community</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>As a Friend</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Form & Justification Dropdown */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <form
                    onSubmit={handleSubmit}
                    className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <h4 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-amber-400" />
                        <span>Interactive Inquiry Form</span>
                      </h4>
                      <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-950 px-2.5 py-1 rounded-md border border-amber-500/30">
                        Email Only
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Field */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-amber-400" />
                          <span>Your Full Name *</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ln. Rajesh Kumar / Mr. David"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
                        />
                      </div>

                      {/* Sender Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-amber-400" />
                          <span>Your Email Address *</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@organization.com"
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Category Dropdown Selection */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>Nature of Contact (Select Category) *</span>
                      </label>
                      
                      <div className="relative">
                        <select
                          value={contactCategory}
                          onChange={(e) => setContactCategory(e.target.value as any)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400 appearance-none cursor-pointer pr-10 font-semibold shadow-inner"
                        >
                          <option value="Professional">💼 Professional / Enterprise IT & Staffing</option>
                          <option value="Community">🤝 Community Based / Lions, Leo & CSR Projects</option>
                          <option value="Friend">🤝 Personal / As a Friend & Global Fellowship</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-amber-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Justification Textarea */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                        <span>Justification / Why You Want to Contact Ramesh B.S *</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Please describe your proposal, project scope, collaboration idea, or reason for reaching out..."
                        value={justification}
                        onChange={(e) => setJustification(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors leading-relaxed custom-scrollbar shadow-inner"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn-gold w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg group cursor-pointer"
                    >
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
                      <span className="text-white">Submit Inquiry & Prepare Email</span>
                    </button>

                    <p className="text-[11px] text-center text-slate-400">
                      Submitting will launch your default email client with your pre-filled inquiry addressed to <strong className="text-amber-300">{personalInfo.email}</strong>.
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-3xl bg-slate-900 border-2 border-emerald-500/80 text-center space-y-5 shadow-2xl"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <h4 className="font-serif text-2xl font-bold text-white">
                      Inquiry Prepared Successfully!
                    </h4>

                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-white">{senderName}</strong>. Your mail client has been opened to dispatch your <strong className="text-amber-300">{contactCategory}</strong> inquiry to <strong className="text-white">{personalInfo.email}</strong>.
                    </p>

                    <div className="pt-2 flex justify-center gap-3">
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold uppercase tracking-wider text-white cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
