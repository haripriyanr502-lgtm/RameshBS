'use client';

import React, { useState } from 'react';
import { HomeContent } from '../../../lib/cms/types';
import { ImageUploader } from '../ImageUploader';
import { useToast } from '../Toast';
import { Save, Plus, Trash2, Sparkles, Eye, CheckCircle2 } from 'lucide-react';

interface HomeTabProps {
  homeData: HomeContent;
  onChange: (updated: HomeContent) => void;
  onSave: () => void;
  isSaving: boolean;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  homeData,
  onChange,
  onSave,
  isSaving,
}) => {
  const { showToast } = useToast();
  const [activeSection, setActiveSection] = useState<'hero' | 'about' | 'headings'>('hero');
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Field change helpers
  const handleFieldChange = <K extends keyof HomeContent>(field: K, value: HomeContent[K]) => {
    onChange({
      ...homeData,
      [field]: value,
    });
  };

  const handleHeadingChange = (field: keyof HomeContent['sectionHeadings'], value: string) => {
    onChange({
      ...homeData,
      sectionHeadings: {
        ...homeData.sectionHeadings,
        [field]: value,
      },
    });
  };

  // Biography paragraphs
  const handleAddBiographyPara = () => {
    const updated = [...(homeData.aboutBiography || []), ''];
    handleFieldChange('aboutBiography', updated);
  };

  const handleUpdateBiographyPara = (index: number, text: string) => {
    const updated = [...homeData.aboutBiography];
    updated[index] = text;
    handleFieldChange('aboutBiography', updated);
  };

  const handleRemoveBiographyPara = (index: number) => {
    const updated = homeData.aboutBiography.filter((_, idx) => idx !== index);
    handleFieldChange('aboutBiography', updated);
  };

  // Core values
  const handleAddCoreValue = () => {
    const updated = [...(homeData.aboutCoreValues || []), ''];
    handleFieldChange('aboutCoreValues', updated);
  };

  const handleUpdateCoreValue = (index: number, text: string) => {
    const updated = [...homeData.aboutCoreValues];
    updated[index] = text;
    handleFieldChange('aboutCoreValues', updated);
  };

  const handleRemoveCoreValue = (index: number) => {
    const updated = homeData.aboutCoreValues.filter((_, idx) => idx !== index);
    handleFieldChange('aboutCoreValues', updated);
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-3xl">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveSection('hero')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'hero'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            1. Hero Banner
          </button>
          <button
            onClick={() => setActiveSection('about')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'about'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            2. About & Leadership Bio
          </button>
          <button
            onClick={() => setActiveSection('headings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'headings'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white'
            }`}
          >
            3. Section Headings & Subtitles
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Preview</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onSave();
              showToast('Homepage changes saved successfully', 'success');
            }}
            disabled={isSaving}
            className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md shadow-amber-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: HERO */}
      {activeSection === 'hero' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Homepage Hero Banner Configuration</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Customize the prominent top section of your portfolio and executive leadership site.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Hero Owner Name / Title
                </label>
                <input
                  type="text"
                  value={homeData.heroTitle}
                  onChange={(e) => handleFieldChange('heroTitle', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Hero Tagline / Executive Subtitle
                </label>
                <input
                  type="text"
                  value={homeData.heroTagline}
                  onChange={(e) => handleFieldChange('heroTagline', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Short Introduction / Mission Paragraph
                </label>
                <textarea
                  rows={4}
                  value={homeData.heroDescription}
                  onChange={(e) => handleFieldChange('heroDescription', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                />
              </div>

              {/* Call to actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Primary CTA Text
                  </label>
                  <input
                    type="text"
                    value={homeData.heroCtaPrimaryText}
                    onChange={(e) => handleFieldChange('heroCtaPrimaryText', e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    placeholder="Link (e.g. #lionistic-journey)"
                    value={homeData.heroCtaPrimaryLink}
                    onChange={(e) => handleFieldChange('heroCtaPrimaryLink', e.target.value)}
                    className="w-full mt-2 px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-slate-400 font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Secondary CTA Text
                  </label>
                  <input
                    type="text"
                    value={homeData.heroCtaSecondaryText}
                    onChange={(e) => handleFieldChange('heroCtaSecondaryText', e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <input
                    type="text"
                    placeholder="Link (e.g. #career)"
                    value={homeData.heroCtaSecondaryLink}
                    onChange={(e) => handleFieldChange('heroCtaSecondaryLink', e.target.value)}
                    className="w-full mt-2 px-3 py-2 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-slate-400 font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Hero Image Section with obvious Change Image control */}
            <div className="space-y-4">
              <ImageUploader
                label="Executive Hero Portrait / Poster"
                imageUrl={homeData.heroImage}
                defaultCategory="Hero"
                aspectRatio="portrait"
                helperText="Click 'Change Image' to pick an existing image or upload a replacement photo. The public website updates automatically."
                onChange={(url) => handleFieldChange('heroImage', url)}
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: ABOUT & BIO */}
      {activeSection === 'about' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              About Me, Vision, Mission & Core Values
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Edit the complete narrative and organizational vision for Lion Ramesh B.S and LCB Brigade.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {/* Headings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    value={homeData.aboutHeading}
                    onChange={(e) => handleFieldChange('aboutHeading', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Section Subheading
                  </label>
                  <input
                    type="text"
                    value={homeData.aboutSubheading}
                    onChange={(e) => handleFieldChange('aboutSubheading', e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Biography Paragraphs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Biography Paragraphs ({homeData.aboutBiography?.length || 0})
                  </label>
                  <button
                    type="button"
                    onClick={handleAddBiographyPara}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Paragraph</span>
                  </button>
                </div>

                {homeData.aboutBiography?.map((para, idx) => (
                  <div key={idx} className="relative group">
                    <textarea
                      rows={3}
                      value={para}
                      onChange={(e) => handleUpdateBiographyPara(idx, e.target.value)}
                      placeholder={`Paragraph ${idx + 1}...`}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl text-xs text-white leading-relaxed focus:outline-none pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveBiographyPara(idx)}
                      className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-900 hover:bg-red-950 text-slate-500 hover:text-red-400 border border-slate-800 transition-colors cursor-pointer"
                      title="Delete paragraph"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Vision & Mission */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Executive Vision
                  </label>
                  <textarea
                    rows={3}
                    value={homeData.aboutVision}
                    onChange={(e) => handleFieldChange('aboutVision', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white leading-relaxed focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Executive Mission
                  </label>
                  <textarea
                    rows={3}
                    value={homeData.aboutMission}
                    onChange={(e) => handleFieldChange('aboutMission', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white leading-relaxed focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Core Values */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Core Values & Guiding Principles
                  </label>
                  <button
                    type="button"
                    onClick={handleAddCoreValue}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Value</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {homeData.aboutCoreValues?.map((val, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => handleUpdateCoreValue(idx, e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveCoreValue(idx)}
                        className="p-2 rounded-lg bg-slate-950 hover:bg-red-950 text-slate-500 hover:text-red-400 border border-slate-800 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* About Profile Image */}
            <div className="lg:col-span-4 space-y-4">
              <ImageUploader
                label="About Me Portrait Photo"
                imageUrl={homeData.aboutImage}
                defaultCategory="Hero"
                aspectRatio="portrait"
                helperText="Profile photo displayed inside the 'About Me' biographical overview card."
                onChange={(url) => handleFieldChange('aboutImage', url)}
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: SECTION HEADINGS & SUBTITLES */}
      {activeSection === 'headings' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Section Headings & Subtitles Manager
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Easily customize the section titles and descriptive subtitles across each major area of your website.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                About Section
              </span>
              <input
                type="text"
                placeholder="Title"
                value={homeData.sectionHeadings.aboutTitle}
                onChange={(e) => handleHeadingChange('aboutTitle', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              />
              <input
                type="text"
                placeholder="Subtitle"
                value={homeData.sectionHeadings.aboutSubtitle}
                onChange={(e) => handleHeadingChange('aboutSubtitle', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Lionistic Journey Section
              </span>
              <input
                type="text"
                placeholder="Title"
                value={homeData.sectionHeadings.journeyTitle}
                onChange={(e) => handleHeadingChange('journeyTitle', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              />
              <input
                type="text"
                placeholder="Subtitle"
                value={homeData.sectionHeadings.journeySubtitle}
                onChange={(e) => handleHeadingChange('journeySubtitle', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Services Involved Section
              </span>
              <input
                type="text"
                placeholder="Title"
                value={homeData.sectionHeadings.servicesTitle}
                onChange={(e) => handleHeadingChange('servicesTitle', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              />
              <input
                type="text"
                placeholder="Subtitle"
                value={homeData.sectionHeadings.servicesSubtitle}
                onChange={(e) => handleHeadingChange('servicesSubtitle', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Activities Section
              </span>
              <input
                type="text"
                placeholder="Title"
                value={homeData.sectionHeadings.activitiesTitle}
                onChange={(e) => handleHeadingChange('activitiesTitle', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              />
              <input
                type="text"
                placeholder="Subtitle"
                value={homeData.sectionHeadings.activitiesSubtitle}
                onChange={(e) => handleHeadingChange('activitiesSubtitle', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Career Section
              </span>
              <input
                type="text"
                placeholder="Title"
                value={homeData.sectionHeadings.careerTitle}
                onChange={(e) => handleHeadingChange('careerTitle', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              />
              <input
                type="text"
                placeholder="Subtitle"
                value={homeData.sectionHeadings.careerSubtitle}
                onChange={(e) => handleHeadingChange('careerSubtitle', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Contact Section
              </span>
              <input
                type="text"
                placeholder="Title"
                value={homeData.sectionHeadings.contactTitle}
                onChange={(e) => handleHeadingChange('contactTitle', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              />
              <input
                type="text"
                placeholder="Subtitle"
                value={homeData.sectionHeadings.contactSubtitle}
                onChange={(e) => handleHeadingChange('contactSubtitle', e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300"
              />
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h4 className="text-base font-bold text-white">Live Hero Content Preview</h4>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
              >
                Close
              </button>
            </div>

            <div className="py-6 space-y-4">
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  {homeData.heroTagline}
                </span>
                <h2 className="text-2xl font-serif font-bold text-white">{homeData.heroTitle}</h2>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  {homeData.heroDescription}
                </p>
                <div className="flex gap-3 mt-4">
                  <span className="px-4 py-2 bg-amber-500 text-slate-950 font-bold text-xs uppercase rounded-full">
                    {homeData.heroCtaPrimaryText}
                  </span>
                  <span className="px-4 py-2 border border-amber-500 text-amber-400 font-bold text-xs uppercase rounded-full">
                    {homeData.heroCtaSecondaryText}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
