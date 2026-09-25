'use client';

import React, { useState } from 'react';
import { CmsLionisticData } from '../../../lib/cms/types';
import {
  LionisticMilestone,
  InternationalExposureItem,
  LionisticBlogPost,
} from '../../../types/portfolio';
import { ConfirmDialog } from '../ConfirmDialog';
import { useToast } from '../Toast';
import {
  Crown,
  Calendar,
  MapPin,
  Globe,
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Sparkles,
  X,
} from 'lucide-react';

interface LionisticTabProps {
  lionisticData: CmsLionisticData;
  onChange: (updated: CmsLionisticData) => void;
  onSave: () => void;
  isSaving: boolean;
}

export const LionisticTab: React.FC<LionisticTabProps> = ({
  lionisticData,
  onChange,
  onSave,
  isSaving,
}) => {
  const { showToast } = useToast();

  const [activeSubTab, setActiveSubTab] = useState<'mjf' | 'milestones' | 'exposures' | 'blogs'>('mjf');

  // Headings & Overview
  const [heading, setHeading] = useState(lionisticData.heading || 'MY LIONISTIC JOURNEY');
  const [subheading, setSubheading] = useState(
    lionisticData.subheading ||
      'Dedicated Service, District Leadership, International Fellowship & MJF Honor in Lions Clubs International'
  );
  const [overview, setOverview] = useState(lionisticData.overview || '');

  // MJF Honor state
  const mjf = lionisticData.mjfHonor || {
    year: '2025 - 2026',
    title: 'Melvin Jones Fellow (MJF)',
    organization: 'Lions Clubs International Foundation (LCIF)',
    description: '',
    highlights: [],
  };
  const [mjfTitle, setMjfTitle] = useState(mjf.title);
  const [mjfYear, setMjfYear] = useState(mjf.year);
  const [mjfOrg, setMjfOrg] = useState(mjf.organization);
  const [mjfDesc, setMjfDesc] = useState(mjf.description);
  const [mjfHighlights, setMjfHighlights] = useState<string[]>(mjf.highlights || []);
  const [mjfHlInput, setMjfHlInput] = useState('');

  // Milestones
  const milestones = lionisticData.milestones || [];
  const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<LionisticMilestone | null>(null);
  const [milestoneToDelete, setMilestoneToDelete] = useState<LionisticMilestone | null>(null);
  const [msForm, setMsForm] = useState<Partial<LionisticMilestone>>({
    position: '',
    organization: 'Lions International District 317F',
    year: '2024 - 2025',
    location: 'Bengaluru Region',
    description: '',
    category: 'District',
    achievements: [],
  });
  const [msAchInput, setMsAchInput] = useState('');

  // Blog posts
  const blogPosts = lionisticData.blogPosts || [];
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<LionisticBlogPost | null>(null);
  const [blogToDelete, setBlogToDelete] = useState<LionisticBlogPost | null>(null);
  const [blogForm, setBlogForm] = useState<Partial<LionisticBlogPost>>({
    title: '',
    date: '2025',
    author: 'Ln. B.S. Ramesh, MJF',
    location: 'Bengaluru, India',
    readTime: '4 min read',
    summary: '',
    content: '',
    tags: [],
  });

  // Commit heading / overview / MJF updates
  const handleUpdateMjf = () => {
    const updated: CmsLionisticData = {
      ...lionisticData,
      heading,
      subheading,
      overview,
      mjfHonor: {
        title: mjfTitle,
        year: mjfYear,
        organization: mjfOrg,
        description: mjfDesc,
        highlights: mjfHighlights,
      },
    };
    onChange(updated);
    showToast('MJF Honor details updated', 'success');
  };

  const handleAddMjfHighlight = () => {
    if (!mjfHlInput.trim()) return;
    const updated = [...mjfHighlights, mjfHlInput.trim()];
    setMjfHighlights(updated);
    setMjfHlInput('');
    onChange({
      ...lionisticData,
      mjfHonor: { ...mjf, highlights: updated },
    });
  };

  const handleRemoveMjfHighlight = (idx: number) => {
    const updated = mjfHighlights.filter((_, i) => i !== idx);
    setMjfHighlights(updated);
    onChange({
      ...lionisticData,
      mjfHonor: { ...mjf, highlights: updated },
    });
  };

  // Milestone Actions
  const openAddMilestone = () => {
    setEditingMilestone(null);
    setMsForm({
      position: '',
      organization: 'Lions International District 317F',
      year: '2025 - 2026',
      location: 'Bengaluru',
      description: '',
      category: 'District',
      achievements: [],
    });
    setMsAchInput('');
    setIsMilestoneModalOpen(true);
  };

  const openEditMilestone = (ms: LionisticMilestone) => {
    setEditingMilestone(ms);
    setMsForm({ ...ms });
    setMsAchInput('');
    setIsMilestoneModalOpen(true);
  };

  const handleSaveMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msForm.position?.trim()) {
      showToast('Position title is required', 'error');
      return;
    }

    if (editingMilestone) {
      const updated = milestones.map((m) =>
        m.id === editingMilestone.id ? ({ ...m, ...msForm } as LionisticMilestone) : m
      );
      onChange({ ...lionisticData, milestones: updated });
      showToast('Milestone updated successfully', 'success');
    } else {
      const newMs: LionisticMilestone = {
        id: `lion-${Date.now()}`,
        position: msForm.position || '',
        organization: msForm.organization || 'Lions International',
        year: msForm.year || '',
        location: msForm.location || '',
        description: msForm.description || '',
        category: msForm.category || 'District',
        achievements: msForm.achievements || [],
      };
      onChange({ ...lionisticData, milestones: [newMs, ...milestones] });
      showToast('New milestone added', 'success');
    }
    setIsMilestoneModalOpen(false);
  };

  const handleDeleteMilestoneConfirm = () => {
    if (!milestoneToDelete) return;
    const updated = milestones.filter((m) => m.id !== milestoneToDelete.id);
    onChange({ ...lionisticData, milestones: updated });
    showToast('Milestone deleted', 'success');
    setMilestoneToDelete(null);
  };

  const handleAddMsAch = () => {
    if (!msAchInput.trim()) return;
    const current = msForm.achievements || [];
    setMsForm({ ...msForm, achievements: [...current, msAchInput.trim()] });
    setMsAchInput('');
  };

  const handleRemoveMsAch = (idx: number) => {
    const current = msForm.achievements || [];
    setMsForm({ ...msForm, achievements: current.filter((_, i) => i !== idx) });
  };

  // Blog Actions
  const openAddBlog = () => {
    setEditingBlog(null);
    setBlogForm({
      title: '',
      date: new Date().getFullYear().toString(),
      author: 'Ln. B.S. Ramesh, MJF',
      location: 'Bengaluru, India',
      readTime: '4 min read',
      summary: '',
      content: '',
      tags: ['Lions International', 'District 317F'],
    });
    setIsBlogModalOpen(true);
  };

  const openEditBlog = (post: LionisticBlogPost) => {
    setEditingBlog(post);
    setBlogForm({ ...post });
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title?.trim()) {
      showToast('Title is required', 'error');
      return;
    }

    if (editingBlog) {
      const updated = blogPosts.map((b) =>
        b.id === editingBlog.id ? ({ ...b, ...blogForm } as LionisticBlogPost) : b
      );
      onChange({ ...lionisticData, blogPosts: updated });
      showToast('Blog article updated', 'success');
    } else {
      const newPost: LionisticBlogPost = {
        id: `blog-${Date.now()}`,
        title: blogForm.title || '',
        date: blogForm.date || '',
        author: blogForm.author || 'Ln. B.S. Ramesh, MJF',
        location: blogForm.location || '',
        readTime: blogForm.readTime || '4 min read',
        summary: blogForm.summary || '',
        content: blogForm.content || '',
        tags: blogForm.tags || [],
      };
      onChange({ ...lionisticData, blogPosts: [newPost, ...blogPosts] });
      showToast('Blog article added', 'success');
    }
    setIsBlogModalOpen(false);
  };

  const handleDeleteBlogConfirm = () => {
    if (!blogToDelete) return;
    const updated = blogPosts.filter((b) => b.id !== blogToDelete.id);
    onChange({ ...lionisticData, blogPosts: updated });
    showToast('Article deleted', 'success');
    setBlogToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Lionistic Journey & Governance CMS
            </h2>
            <p className="text-xs text-slate-400">
              Manage Melvin Jones Fellow (MJF) recognition, leadership milestones, and international articles
            </p>
          </div>
        </div>

        <button
          onClick={onSave}
          disabled={isSaving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
        >
          {isSaving ? 'Publishing...' : 'Publish Journey'}
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 w-fit">
        <button
          onClick={() => setActiveSubTab('mjf')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeSubTab === 'mjf'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Crown className="w-4 h-4" />
          <span>MJF Honor</span>
        </button>

        <button
          onClick={() => setActiveSubTab('milestones')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeSubTab === 'milestones'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Timeline Milestones ({milestones.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('blogs')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeSubTab === 'blogs'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Delegations & Articles ({blogPosts.length})</span>
        </button>
      </div>

      {/* MJF Honor SubTab */}
      {activeSubTab === 'mjf' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <span>Melvin Jones Fellow (MJF) Recognition Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Honor Title
                </label>
                <input
                  type="text"
                  value={mjfTitle}
                  onChange={(e) => setMjfTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Year Conferred
                </label>
                <input
                  type="text"
                  value={mjfYear}
                  onChange={(e) => setMjfYear(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Awarding Foundation
                </label>
                <input
                  type="text"
                  value={mjfOrg}
                  onChange={(e) => setMjfOrg(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Honor Description
              </label>
              <textarea
                rows={3}
                value={mjfDesc}
                onChange={(e) => setMjfDesc(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
              />
            </div>

            {/* MJF Highlights bullet points */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Key Accomplishments Cited
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={mjfHlInput}
                  onChange={(e) => setMjfHlInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddMjfHighlight();
                    }
                  }}
                  placeholder="e.g. Recognized for raising ₹31+ Lakhs CSR funding..."
                  className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
                <button
                  type="button"
                  onClick={handleAddMjfHighlight}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs uppercase"
                >
                  Add
                </button>
              </div>

              <div className="space-y-2 pt-1">
                {mjfHighlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMjfHighlight(idx)}
                      className="text-slate-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="button"
                onClick={handleUpdateMjf}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow"
              >
                Apply MJF Updates
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Milestones SubTab */}
      {activeSubTab === 'milestones' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={openAddMilestone}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Milestone</span>
            </button>
          </div>

          <div className="space-y-4">
            {milestones.map((ms) => (
              <div
                key={ms.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 transition-all shadow flex flex-col md:flex-row md:items-start justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {ms.category || 'District'}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {ms.year}
                    </span>
                    {ms.location && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {ms.location}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">{ms.position}</h3>
                  <p className="text-xs font-semibold text-amber-400">{ms.organization}</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{ms.description}</p>

                  {ms.achievements && ms.achievements.length > 0 && (
                    <div className="pt-2 space-y-1">
                      {ms.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex md:flex-col items-center gap-2 shrink-0">
                  <button
                    onClick={() => openEditMilestone(ms)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer w-full justify-center"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setMilestoneToDelete(ms)}
                    className="p-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/40 text-xs cursor-pointer w-full justify-center flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blogs / Delegations SubTab */}
      {activeSubTab === 'blogs' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={openAddBlog}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Article / Delegation</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white tracking-tight">{post.title}</h3>
                  <p className="text-xs text-amber-400">{post.location}</p>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {post.summary || post.content}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800 mt-4">
                  <button
                    onClick={() => openEditBlog(post)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setBlogToDelete(post)}
                    className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/40 text-xs cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Milestone Modal */}
      {isMilestoneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingMilestone ? 'Edit Milestone' : 'Add Milestone'}
              </h3>
              <button
                onClick={() => setIsMilestoneModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMilestone} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Position Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={msForm.position || ''}
                    onChange={(e) => setMsForm({ ...msForm, position: e.target.value })}
                    placeholder="e.g. Region Chairperson"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Year / Term
                  </label>
                  <input
                    type="text"
                    value={msForm.year || ''}
                    onChange={(e) => setMsForm({ ...msForm, year: e.target.value })}
                    placeholder="e.g. 2025 - 2026"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    value={msForm.organization || ''}
                    onChange={(e) => setMsForm({ ...msForm, organization: e.target.value })}
                    placeholder="Lions International District 317F"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Category
                  </label>
                  <select
                    value={msForm.category || 'District'}
                    onChange={(e) =>
                      setMsForm({
                        ...msForm,
                        category: e.target.value as LionisticMilestone['category'],
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  >
                    <option value="District">District</option>
                    <option value="Club">Club</option>
                    <option value="Council">Council</option>
                    <option value="International">International</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={msForm.description || ''}
                  onChange={(e) => setMsForm({ ...msForm, description: e.target.value })}
                  placeholder="Summary of responsibilities and achievements..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              {/* Achievements bullet builder */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Key Accomplishments (Bullets)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={msAchInput}
                    onChange={(e) => setMsAchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddMsAch();
                      }
                    }}
                    placeholder="Add an achievement..."
                    className="flex-1 px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddMsAch}
                    className="px-4 py-2 bg-slate-800 text-amber-400 font-bold text-xs rounded-xl"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5 pt-1">
                  {(msForm.achievements || []).map((ach, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300"
                    >
                      <span>{ach}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMsAch(idx)}
                        className="text-slate-500 hover:text-red-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsMilestoneModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold uppercase"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog Post Modal */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingBlog ? 'Edit Delegation Article' : 'Add Delegation Article'}
              </h3>
              <button
                onClick={() => setIsBlogModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={blogForm.title || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="e.g. Borders Without Barriers: My Delegation to Nepal"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    value={blogForm.date || ''}
                    onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                    placeholder="e.g. August 2025"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={blogForm.location || ''}
                    onChange={(e) => setBlogForm({ ...blogForm, location: e.target.value })}
                    placeholder="e.g. Nepal / Singapore"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Summary
                </label>
                <textarea
                  rows={2}
                  value={blogForm.summary || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                  placeholder="Brief summary..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Full Content
                </label>
                <textarea
                  rows={6}
                  value={blogForm.content || ''}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Complete article narrative..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold uppercase"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Milestone Confirm */}
      <ConfirmDialog
        isOpen={!!milestoneToDelete}
        title="Delete Milestone?"
        message={`Are you sure you want to permanently delete "${milestoneToDelete?.position}"?`}
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleDeleteMilestoneConfirm}
        onClose={() => setMilestoneToDelete(null)}
      />

      {/* Delete Blog Confirm */}
      <ConfirmDialog
        isOpen={!!blogToDelete}
        title="Delete Article?"
        message={`Are you sure you want to permanently delete "${blogToDelete?.title}"?`}
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleDeleteBlogConfirm}
        onClose={() => setBlogToDelete(null)}
      />
    </div>
  );
};
