'use client';

import React, { useState } from 'react';
import { CmsCareerData } from '../../../lib/cms/types';
import { CareerExperience, CertificateAward } from '../../../types/portfolio';
import { ConfirmDialog } from '../ConfirmDialog';
import { useToast } from '../Toast';
import {
  Briefcase,
  Award,
  Plus,
  Trash2,
  Edit2,
  Calendar,
  MapPin,
  CheckCircle2,
  FileText,
  X,
  Sparkles,
} from 'lucide-react';

interface CareerTabProps {
  careerData: CmsCareerData;
  onChange: (updated: CmsCareerData) => void;
  onSave: () => void;
}

export const CareerTab: React.FC<CareerTabProps> = ({
  careerData,
  onChange,
  onSave,
}) => {
  const { showToast } = useToast();

  const [activeSubTab, setActiveSubTab] = useState<'experiences' | 'awards'>('experiences');

  // Experience Modal
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<CareerExperience | null>(null);
  const [expToDelete, setExpToDelete] = useState<CareerExperience | null>(null);
  const [expForm, setExpForm] = useState<Partial<CareerExperience>>({
    organization: '',
    designation: '',
    duration: '',
    location: '',
    type: 'Corporate',
    responsibilities: [],
    keyAchievements: [],
  });
  const [respInput, setRespInput] = useState('');
  const [achInput, setAchInput] = useState('');

  // Award Modal
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [editingAward, setEditingAward] = useState<CertificateAward | null>(null);
  const [awardToDelete, setAwardToDelete] = useState<CertificateAward | null>(null);
  const [awardForm, setAwardForm] = useState<Partial<CertificateAward>>({
    title: '',
    issuer: '',
    year: '',
    type: 'Award',
    description: '',
  });

  const experiences = careerData?.experiences || [];
  const awards = careerData?.certificatesAndAwards || [];

  // --- Handlers for Experiences ---
  const openAddExp = () => {
    setEditingExp(null);
    setExpForm({
      organization: '',
      designation: '',
      duration: '',
      location: 'Bengaluru, India',
      type: 'Corporate',
      responsibilities: [],
      keyAchievements: [],
    });
    setRespInput('');
    setAchInput('');
    setIsExpModalOpen(true);
  };

  const openEditExp = (exp: CareerExperience) => {
    setEditingExp(exp);
    setExpForm({ ...exp });
    setRespInput('');
    setAchInput('');
    setIsExpModalOpen(true);
  };

  const handleSaveExp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expForm.organization?.trim() || !expForm.designation?.trim()) {
      showToast('Organization and Designation are required', 'error');
      return;
    }

    if (editingExp) {
      const updated = experiences.map((exp) =>
        exp.id === editingExp.id ? ({ ...exp, ...expForm } as CareerExperience) : exp
      );
      onChange({ ...careerData, experiences: updated });
      showToast('Experience updated successfully', 'success');
    } else {
      const newExp: CareerExperience = {
        id: `car-${Date.now()}`,
        organization: expForm.organization || '',
        designation: expForm.designation || '',
        duration: expForm.duration || '',
        location: expForm.location || '',
        type: expForm.type || 'Corporate',
        responsibilities: expForm.responsibilities || [],
        keyAchievements: expForm.keyAchievements || [],
      };
      onChange({ ...careerData, experiences: [...experiences, newExp] });
      showToast('Experience added successfully', 'success');
    }
    setIsExpModalOpen(false);
  };

  const handleDeleteExpConfirm = () => {
    if (!expToDelete) return;
    const updated = experiences.filter((e) => e.id !== expToDelete.id);
    onChange({ ...careerData, experiences: updated });
    showToast('Experience deleted successfully', 'success');
    setExpToDelete(null);
  };

  const handleAddResp = () => {
    if (!respInput.trim()) return;
    const current = expForm.responsibilities || [];
    setExpForm({ ...expForm, responsibilities: [...current, respInput.trim()] });
    setRespInput('');
  };

  const handleRemoveResp = (idx: number) => {
    const current = expForm.responsibilities || [];
    setExpForm({ ...expForm, responsibilities: current.filter((_, i) => i !== idx) });
  };

  const handleAddAch = () => {
    if (!achInput.trim()) return;
    const current = expForm.keyAchievements || [];
    setExpForm({ ...expForm, keyAchievements: [...current, achInput.trim()] });
    setAchInput('');
  };

  const handleRemoveAch = (idx: number) => {
    const current = expForm.keyAchievements || [];
    setExpForm({ ...expForm, keyAchievements: current.filter((_, i) => i !== idx) });
  };

  // --- Handlers for Awards ---
  const openAddAward = () => {
    setEditingAward(null);
    setAwardForm({
      title: '',
      issuer: '',
      year: new Date().getFullYear().toString(),
      type: 'Award',
      description: '',
    });
    setIsAwardModalOpen(true);
  };

  const openEditAward = (award: CertificateAward) => {
    setEditingAward(award);
    setAwardForm({ ...award });
    setIsAwardModalOpen(true);
  };

  const handleSaveAward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!awardForm.title?.trim() || !awardForm.issuer?.trim()) {
      showToast('Title and Issuer are required', 'error');
      return;
    }

    if (editingAward) {
      const updated = awards.map((a) =>
        a.id === editingAward.id ? ({ ...a, ...awardForm } as CertificateAward) : a
      );
      onChange({ ...careerData, certificatesAndAwards: updated });
      showToast('Award/Certificate updated successfully', 'success');
    } else {
      const newAward: CertificateAward = {
        id: `cert-${Date.now()}`,
        title: awardForm.title || '',
        issuer: awardForm.issuer || '',
        year: awardForm.year || '',
        type: awardForm.type || 'Award',
        description: awardForm.description || '',
      };
      onChange({ ...careerData, certificatesAndAwards: [...awards, newAward] });
      showToast('Award/Certificate added successfully', 'success');
    }
    setIsAwardModalOpen(false);
  };

  const handleDeleteAwardConfirm = () => {
    if (!awardToDelete) return;
    const updated = awards.filter((a) => a.id !== awardToDelete.id);
    onChange({ ...careerData, certificatesAndAwards: updated });
    showToast('Award/Certificate deleted successfully', 'success');
    setAwardToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Career & Experience Management
              </h2>
              <p className="text-xs text-slate-400">
                Manage professional leadership timeline, corporate roles, and academic/service honors
              </p>
            </div>
          </div>
        </div>

        {activeSubTab === 'experiences' ? (
          <button
            onClick={openAddExp}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Experience</span>
          </button>
        ) : (
          <button
            onClick={openAddAward}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Award / Honor</span>
          </button>
        )}
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 w-fit">
        <button
          onClick={() => setActiveSubTab('experiences')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeSubTab === 'experiences'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Corporate Timeline ({experiences.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('awards')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            activeSubTab === 'awards'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Certificates & Honors ({awards.length})</span>
        </button>
      </div>

      {/* Experiences List */}
      {activeSubTab === 'experiences' && (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 transition-all shadow-lg flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {exp.type || 'Corporate'}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {exp.duration}
                  </span>
                  {exp.location && (
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {exp.location}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {exp.designation}
                  </h3>
                  <p className="text-sm font-semibold text-amber-400 mt-0.5">
                    {exp.organization}
                  </p>
                </div>

                {/* Responsibilities list */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Core Responsibilities:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {exp.responsibilities.map((r, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Achievements */}
                {exp.keyAchievements && exp.keyAchievements.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                      Key Accomplishments:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {exp.keyAchievements.map((a, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex md:flex-col items-center gap-2 shrink-0">
                <button
                  onClick={() => openEditExp(exp)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer w-full justify-center"
                >
                  <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => setExpToDelete(exp)}
                  className="px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/40 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer w-full justify-center"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Awards & Certificates List */}
      {activeSubTab === 'awards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {awards.map((award) => (
            <div
              key={award.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {award.type}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{award.year}</span>
                </div>

                <h3 className="text-sm font-bold text-white tracking-tight">{award.title}</h3>
                <p className="text-xs text-amber-400 font-semibold">{award.issuer}</p>
                {award.description && (
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    {award.description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800 mt-4">
                <button
                  onClick={() => openEditAward(award)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => setAwardToDelete(award)}
                  className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/40 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience Edit/Add Modal */}
      {isExpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-5 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingExp ? 'Edit Corporate Experience' : 'Add Corporate Experience'}
              </h3>
              <button
                onClick={() => setIsExpModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExp} className="space-y-4 pt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Designation / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={expForm.designation || ''}
                    onChange={(e) => setExpForm({ ...expForm, designation: e.target.value })}
                    placeholder="e.g. Co-Founder & CEO"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={expForm.organization || ''}
                    onChange={(e) => setExpForm({ ...expForm, organization: e.target.value })}
                    placeholder="e.g. BSR IT Solutions Pvt Ltd"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={expForm.duration || ''}
                    onChange={(e) => setExpForm({ ...expForm, duration: e.target.value })}
                    placeholder="e.g. Sep 2003 - Present"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={expForm.location || ''}
                    onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                    placeholder="e.g. Bengaluru, India"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Role Type
                  </label>
                  <select
                    value={expForm.type || 'Corporate'}
                    onChange={(e) =>
                      setExpForm({
                        ...expForm,
                        type: e.target.value as CareerExperience['type'],
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Corporate">Corporate</option>
                    <option value="Board">Board</option>
                    <option value="Advisory">Advisory</option>
                    <option value="Leadership">Leadership</option>
                  </select>
                </div>
              </div>

              {/* Responsibilities Builder */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Responsibilities
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={respInput}
                    onChange={(e) => setRespInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddResp();
                      }
                    }}
                    placeholder="Add a core responsibility..."
                    className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddResp}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs uppercase rounded-xl"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5 pt-1">
                  {(expForm.responsibilities || []).map((resp, rIdx) => (
                    <div
                      key={rIdx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                    >
                      <span>{resp}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveResp(rIdx)}
                        className="text-slate-500 hover:text-red-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Achievements Builder */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Key Accomplishments
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={achInput}
                    onChange={(e) => setAchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddAch();
                      }
                    }}
                    placeholder="Add an achievement..."
                    className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddAch}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs uppercase rounded-xl"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5 pt-1">
                  {(expForm.keyAchievements || []).map((ach, aIdx) => (
                    <div
                      key={aIdx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                    >
                      <span>{ach}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAch(aIdx)}
                        className="text-slate-500 hover:text-red-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsExpModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold uppercase rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase rounded-xl shadow-lg shadow-amber-500/20"
                >
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Award Edit/Add Modal */}
      {isAwardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-5 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingAward ? 'Edit Certificate / Award' : 'Add Certificate / Award'}
              </h3>
              <button
                onClick={() => setIsAwardModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAward} className="space-y-4 pt-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Honor / Title *
                </label>
                <input
                  type="text"
                  required
                  value={awardForm.title || ''}
                  onChange={(e) => setAwardForm({ ...awardForm, title: e.target.value })}
                  placeholder="e.g. Master in Business Administration (MBA)"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Issuer / Organization *
                </label>
                <input
                  type="text"
                  required
                  value={awardForm.issuer || ''}
                  onChange={(e) => setAwardForm({ ...awardForm, issuer: e.target.value })}
                  placeholder="e.g. Postgraduate Degree / Rotary District 3190"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Year / Category
                  </label>
                  <input
                    type="text"
                    value={awardForm.year || ''}
                    onChange={(e) => setAwardForm({ ...awardForm, year: e.target.value })}
                    placeholder="e.g. 2024 or Academic"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Type
                  </label>
                  <select
                    value={awardForm.type || 'Award'}
                    onChange={(e) =>
                      setAwardForm({
                        ...awardForm,
                        type: e.target.value as CertificateAward['type'],
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                  >
                    <option value="Award">Award</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Honor">Honor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={awardForm.description || ''}
                  onChange={(e) => setAwardForm({ ...awardForm, description: e.target.value })}
                  placeholder="Details of the honor, project, or certification..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAwardModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold uppercase rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase rounded-xl shadow-lg shadow-amber-500/20"
                >
                  Save Honor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Experience Confirm */}
      <ConfirmDialog
        isOpen={!!expToDelete}
        title="Delete Experience?"
        message={`Are you sure you want to permanently remove "${expToDelete?.designation}" at "${expToDelete?.organization}"?`}
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleDeleteExpConfirm}
        onClose={() => setExpToDelete(null)}
      />

      {/* Delete Award Confirm */}
      <ConfirmDialog
        isOpen={!!awardToDelete}
        title="Delete Certificate/Award?"
        message={`Are you sure you want to delete "${awardToDelete?.title}"?`}
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleDeleteAwardConfirm}
        onClose={() => setAwardToDelete(null)}
      />
    </div>
  );
};
