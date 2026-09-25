'use client';

import React, { useState } from 'react';
import { FullCmsDatabase } from '../../../lib/cms/types';
import { Highlight } from '../../../types/portfolio';
import { ImageUploader } from '../ImageUploader';
import { useToast } from '../Toast';
import {
  User,
  Compass,
  Target,
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  X,
  FileText,
} from 'lucide-react';

interface AboutTabProps {
  cmsData: FullCmsDatabase;
  onUpdateAbout: (home: FullCmsDatabase['home'], aboutExtras: FullCmsDatabase['aboutExtras']) => void;
  onSave: () => void;
  isSaving: boolean;
}

export const AboutTab: React.FC<AboutTabProps> = ({
  cmsData,
  onUpdateAbout,
  onSave,
  isSaving,
}) => {
  const { showToast } = useToast();

  const home = cmsData.home;
  const aboutExtras = cmsData.aboutExtras || {
    highlights: [],
    vision: home.aboutVision || '',
    mission: home.aboutMission || '',
    coreValues: home.aboutCoreValues || [],
  };

  // Section headings & texts
  const [heading, setHeading] = useState(home.aboutHeading || 'ABOUT ME');
  const [subheading, setSubheading] = useState(
    home.aboutSubheading || 'Academic Foundations, Entrepreneurial Leadership & Social Stewardship'
  );
  const [vision, setVision] = useState(aboutExtras.vision || home.aboutVision || '');
  const [mission, setMission] = useState(aboutExtras.mission || home.aboutMission || '');
  const [image, setImage] = useState(home.aboutImage || '/images/bs_ramesh_profile.jpg');

  // Biography paragraphs
  const [paragraphs, setParagraphs] = useState<string[]>(
    home.aboutBiography && home.aboutBiography.length > 0
      ? home.aboutBiography
      : ['']
  );
  const [editingParagraphIdx, setEditingParagraphIdx] = useState<number | null>(null);
  const [paragraphDraft, setParagraphDraft] = useState('');

  // Core values
  const [coreValues, setCoreValues] = useState<string[]>(
    aboutExtras.coreValues && aboutExtras.coreValues.length > 0
      ? aboutExtras.coreValues
      : home.aboutCoreValues || []
  );
  const [newValueInput, setNewValueInput] = useState('');

  // Highlights
  const [highlights, setHighlights] = useState<Highlight[]>(aboutExtras.highlights || []);
  const [isHighlightModalOpen, setIsHighlightModalOpen] = useState(false);
  const [editingHighlight, setEditingHighlight] = useState<Highlight | null>(null);
  const [hlTitle, setHlTitle] = useState('');
  const [hlDesc, setHlDesc] = useState('');

  // Apply changes to parent atomically
  const handleCommitChanges = (
    newParagraphs?: string[],
    newVision?: string,
    newMission?: string,
    newValues?: string[],
    newHighlights?: Highlight[],
    newImage?: string,
    newHeading?: string,
    newSubheading?: string
  ) => {
    const finalHeading = newHeading !== undefined ? newHeading : heading;
    const finalSubheading = newSubheading !== undefined ? newSubheading : subheading;
    const finalParagraphs = newParagraphs !== undefined ? newParagraphs : paragraphs;
    const finalVision = newVision !== undefined ? newVision : vision;
    const finalMission = newMission !== undefined ? newMission : mission;
    const finalValues = newValues !== undefined ? newValues : coreValues;
    const finalHighlights = newHighlights !== undefined ? newHighlights : highlights;
    const finalImage = newImage !== undefined ? newImage : image;

    const updatedHome: FullCmsDatabase['home'] = {
      ...home,
      aboutHeading: finalHeading,
      aboutSubheading: finalSubheading,
      sectionHeadings: {
        ...home.sectionHeadings,
        aboutTitle: finalHeading,
        aboutSubtitle: finalSubheading,
      },
      aboutBiography: finalParagraphs,
      aboutVision: finalVision,
      aboutMission: finalMission,
      aboutCoreValues: finalValues,
      aboutImage: finalImage,
    };

    const updatedExtras = {
      vision: finalVision,
      mission: finalMission,
      coreValues: finalValues,
      highlights: finalHighlights,
    };

    onUpdateAbout(updatedHome, updatedExtras);
  };

  // Biography actions
  const handleAddParagraph = () => {
    const updated = [...paragraphs, 'New executive biography paragraph...'];
    setParagraphs(updated);
    handleCommitChanges(updated);
    showToast('Paragraph added', 'success');
  };

  const handleSaveParagraph = (idx: number) => {
    const updated = [...paragraphs];
    updated[idx] = paragraphDraft;
    setParagraphs(updated);
    setEditingParagraphIdx(null);
    handleCommitChanges(updated);
    showToast('Paragraph updated', 'success');
  };

  const handleDeleteParagraph = (idx: number) => {
    const updated = paragraphs.filter((_, i) => i !== idx);
    setParagraphs(updated);
    handleCommitChanges(updated);
    showToast('Paragraph removed', 'success');
  };

  // Core values actions
  const handleAddValue = () => {
    if (!newValueInput.trim()) return;
    const updated = [...coreValues, newValueInput.trim()];
    setCoreValues(updated);
    setNewValueInput('');
    handleCommitChanges(undefined, undefined, undefined, updated);
    showToast('Core value added', 'success');
  };

  const handleDeleteValue = (idx: number) => {
    const updated = coreValues.filter((_, i) => i !== idx);
    setCoreValues(updated);
    handleCommitChanges(undefined, undefined, undefined, updated);
  };

  // Highlights actions
  const openAddHighlight = () => {
    setEditingHighlight(null);
    setHlTitle('');
    setHlDesc('');
    setIsHighlightModalOpen(true);
  };

  const openEditHighlight = (hl: Highlight) => {
    setEditingHighlight(hl);
    setHlTitle(hl.title);
    setHlDesc(hl.description);
    setIsHighlightModalOpen(true);
  };

  const handleSaveHighlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hlTitle.trim()) {
      showToast('Title is required', 'error');
      return;
    }

    let updated: Highlight[];
    if (editingHighlight) {
      updated = highlights.map((h) =>
        h.id === editingHighlight.id ? { ...h, title: hlTitle, description: hlDesc } : h
      );
    } else {
      updated = [...highlights, { id: `hl-${Date.now()}`, title: hlTitle, description: hlDesc }];
    }
    setHighlights(updated);
    handleCommitChanges(undefined, undefined, undefined, undefined, updated);
    setIsHighlightModalOpen(false);
    showToast('Executive highlight saved', 'success');
  };

  const handleDeleteHighlight = (id: string) => {
    const updated = highlights.filter((h) => h.id !== id);
    setHighlights(updated);
    handleCommitChanges(undefined, undefined, undefined, undefined, updated);
    showToast('Highlight removed', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">About Me Management</h2>
            <p className="text-xs text-slate-400">
              Manage biography narrative, vision, mission, core values, and executive highlights
            </p>
          </div>
        </div>

        <button
          onClick={onSave}
          disabled={isSaving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
        >
          {isSaving ? 'Publishing...' : 'Publish About'}
        </button>
      </div>

      {/* Headings & Portrait Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Headings & Portrait */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Section Titles</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Section Heading
              </label>
              <input
                type="text"
                value={heading}
                onChange={(e) => {
                  setHeading(e.target.value);
                  handleCommitChanges(undefined, undefined, undefined, undefined, undefined, undefined, e.target.value);
                }}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Section Subtitle
              </label>
              <input
                type="text"
                value={subheading}
                onChange={(e) => {
                  setSubheading(e.target.value);
                  handleCommitChanges(undefined, undefined, undefined, undefined, undefined, undefined, undefined, e.target.value);
                }}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
              />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg">
            <ImageUploader
              label="Executive Portrait Photo"
              imageUrl={image}
              defaultCategory="General"
              aspectRatio="portrait"
              helperText="This portrait is displayed in the About Me section of the homepage."
              onChange={(url) => {
                setImage(url);
                handleCommitChanges(undefined, undefined, undefined, undefined, undefined, url);
              }}
            />
          </div>
        </div>

        {/* Right Column: Biography Editor */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Biography Paragraphs ({paragraphs.length})</span>
              </h3>
              <button
                type="button"
                onClick={handleAddParagraph}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Paragraph</span>
              </button>
            </div>

            <div className="space-y-4 pt-2">
              {paragraphs.map((p, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-amber-400 uppercase tracking-wider">
                      Paragraph #{idx + 1}
                    </span>
                    <div className="flex items-center gap-1">
                      {editingParagraphIdx !== idx && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingParagraphIdx(idx);
                            setParagraphDraft(p);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeleteParagraph(idx)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/40"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {editingParagraphIdx === idx ? (
                    <div className="space-y-2">
                      <textarea
                        rows={5}
                        value={paragraphDraft}
                        onChange={(e) => setParagraphDraft(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingParagraphIdx(null)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveParagraph(idx)}
                          className="px-4 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold"
                        >
                          Save Paragraph
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-300 leading-relaxed">{p}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission Editor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Global Vision</h3>
          </div>
          <textarea
            rows={4}
            value={vision}
            onChange={(e) => {
              setVision(e.target.value);
              handleCommitChanges(undefined, e.target.value);
            }}
            placeholder="Executive vision statement..."
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white leading-relaxed"
          />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Mission Statement</h3>
          </div>
          <textarea
            rows={4}
            value={mission}
            onChange={(e) => {
              setMission(e.target.value);
              handleCommitChanges(undefined, undefined, e.target.value);
            }}
            placeholder="Executive mission statement..."
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white leading-relaxed"
          />
        </div>
      </div>

      {/* Core Values & Executive Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Values */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Core Values ({coreValues.length})</span>
          </h3>

          <div className="flex gap-2">
            <input
              type="text"
              value={newValueInput}
              onChange={(e) => setNewValueInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddValue();
                }
              }}
              placeholder="e.g. Integrity in Governance"
              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
            />
            <button
              type="button"
              onClick={handleAddValue}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold uppercase"
            >
              Add
            </button>
          </div>

          <div className="space-y-2 pt-2">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{val}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteValue(idx)}
                  className="text-slate-500 hover:text-red-400 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Highlights */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Executive Highlights ({highlights.length})</span>
            </h3>
            <button
              type="button"
              onClick={openAddHighlight}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          <div className="space-y-3 pt-2">
            {highlights.map((hl) => (
              <div
                key={hl.id}
                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white">{hl.title}</h4>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openEditHighlight(hl)}
                      className="p-1 rounded text-slate-400 hover:text-white"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteHighlight(hl.id)}
                      className="p-1 rounded text-red-400 hover:bg-red-950/40"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{hl.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Highlight Edit/Add Modal */}
      {isHighlightModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">
                {editingHighlight ? 'Edit Highlight' : 'Add Executive Highlight'}
              </h3>
              <button
                onClick={() => setIsHighlightModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveHighlight} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Highlight Title *
                </label>
                <input
                  type="text"
                  required
                  value={hlTitle}
                  onChange={(e) => setHlTitle(e.target.value)}
                  placeholder="e.g. Charter Secretary & President - LCB Brigade"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={hlDesc}
                  onChange={(e) => setHlDesc(e.target.value)}
                  placeholder="Key accomplishment description..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsHighlightModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold uppercase"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
