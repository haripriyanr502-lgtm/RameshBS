'use client';

import React, { useState } from 'react';
import { AchievementItem, ContentStatus } from '../../../lib/cms/types';
import { DataTable, Column } from '../DataTable';
import { ImageUploader } from '../ImageUploader';
import { ConfirmDialog } from '../ConfirmDialog';
import { useToast } from '../Toast';
import { X, Award, Calendar } from 'lucide-react';

interface AchievementsTabProps {
  achievements: AchievementItem[];
  onChange: (updated: AchievementItem[]) => void;
  onSave: () => void;
}

export const AchievementsTab: React.FC<AchievementsTabProps> = ({
  achievements,
  onChange,
  onSave,
}) => {
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<AchievementItem | null>(null);
  const [achievementToDelete, setAchievementToDelete] = useState<AchievementItem | null>(null);

  const [formData, setFormData] = useState<Partial<AchievementItem>>({
    title: '',
    yearDate: '2025 - 2026',
    description: '',
    valueMetric: '',
    image: '',
    iconName: 'Crown',
    category: 'CSR Water Infrastructure',
    impactDetails: '',
    displayOrder: achievements.length + 1,
    status: 'published',
  });

  const openAddModal = () => {
    setEditingAchievement(null);
    setFormData({
      title: '',
      yearDate: '2025 - 2026',
      description: '',
      valueMetric: '',
      image: '',
      iconName: 'Crown',
      category: 'CSR Water Infrastructure',
      impactDetails: '',
      displayOrder: achievements.length + 1,
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (ach: AchievementItem) => {
    setEditingAchievement(ach);
    setFormData({ ...ach });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      showToast('Achievement title is required', 'error');
      return;
    }

    if (editingAchievement) {
      const updatedList = achievements.map((a) =>
        a.id === editingAchievement.id
          ? ({
              ...a,
              ...formData,
              updatedAt: new Date().toISOString(),
            } as AchievementItem)
          : a
      );
      onChange(updatedList);
      showToast('Achievement updated successfully', 'success');
    } else {
      const newAchievement: AchievementItem = {
        id: `ach-${Date.now()}`,
        title: formData.title || 'New Achievement',
        yearDate: formData.yearDate || '2026',
        description: formData.description || '',
        valueMetric: formData.valueMetric || '',
        image: formData.image,
        iconName: formData.iconName || 'Award',
        category: (formData.category as AchievementItem['category']) || 'Community Service',
        impactDetails: formData.impactDetails || '',
        displayOrder: Number(formData.displayOrder) || achievements.length + 1,
        status: (formData.status as ContentStatus) || 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      onChange([...achievements, newAchievement]);
      showToast('New achievement added successfully', 'success');
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!achievementToDelete) return;
    const updated = achievements.filter((a) => a.id !== achievementToDelete.id);
    onChange(updated);
    showToast('Achievement removed successfully', 'success');
    setAchievementToDelete(null);
  };

  const handleToggleStatus = (ach: AchievementItem) => {
    const nextStatus: ContentStatus = ach.status === 'published' ? 'draft' : 'published';
    const updated = achievements.map((a) =>
      a.id === ach.id ? { ...a, status: nextStatus, updatedAt: new Date().toISOString() } : a
    );
    onChange(updated);
    showToast(
      `Achievement ${nextStatus === 'published' ? 'published on website' : 'saved as draft'}`,
      'info'
    );
  };

  const columns: Column<AchievementItem>[] = [
    {
      header: 'Title & Metric',
      accessor: (a) => (
        <div>
          <div className="font-bold text-white tracking-tight">{a.title}</div>
          <div className="flex items-center gap-2 mt-1">
            {a.valueMetric && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-[10px] uppercase">
                {a.valueMetric}
              </span>
            )}
            <span className="text-[11px] text-slate-400">{a.category}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Year / Date',
      accessor: (a) => (
        <div className="flex items-center gap-1.5 text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>{a.yearDate}</span>
        </div>
      ),
    },
    {
      header: 'Impact / Details',
      accessor: (a) => (
        <p className="text-slate-300 text-xs line-clamp-2 max-w-sm">
          {a.impactDetails || a.description}
        </p>
      ),
    },
    {
      header: 'Order',
      accessor: (a) => (
        <span className="font-mono text-slate-400 text-xs">#{a.displayOrder}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Achievements & Honors"
        subtitle="Manage Melvin Jones Fellow (MJF) recognitions, CSR clean water funding records, and leadership awards."
        items={achievements}
        columns={columns}
        addButtonLabel="+ Add Achievement"
        onAdd={openAddModal}
        onEdit={openEditModal}
        onDelete={(a) => setAchievementToDelete(a)}
        onToggleStatus={handleToggleStatus}
        filterCategories={[
          'CSR Water Infrastructure',
          'International Honors',
          'Enterprise & IT',
          'Youth & Sports',
          'Community Service',
        ]}
        getCategory={(a) => a.category}
        renderThumbnail={(a) => (
          <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center shrink-0">
            {a.image ? (
              <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
            ) : (
              <Award className="w-6 h-6 text-amber-500" />
            )}
          </div>
        )}
      />

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingAchievement ? 'Edit Achievement' : '+ Add New Achievement'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Achievement Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Melvin Jones Fellow (MJF) Honor"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Key Metric / Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹31+ Lakhs or MJF"
                    value={formData.valueMetric}
                    onChange={(e) => setFormData({ ...formData, valueMetric: e.target.value })}
                    className="w-full px-3 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-amber-400 font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Year / Date Range
                  </label>
                  <input
                    type="text"
                    placeholder="2025 - 2026"
                    value={formData.yearDate}
                    onChange={(e) => setFormData({ ...formData, yearDate: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as AchievementItem['category'],
                      })
                    }
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="CSR Water Infrastructure">CSR Water Infrastructure</option>
                    <option value="International Honors">International Honors</option>
                    <option value="Enterprise & IT">Enterprise & IT</option>
                    <option value="Youth & Sports">Youth & Sports</option>
                    <option value="Community Service">Community Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) =>
                      setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Impact Summary & Details
                </label>
                <input
                  type="text"
                  placeholder="e.g. Benefiting 5,000+ rural residents with sustainable daily clean water."
                  value={formData.impactDetails}
                  onChange={(e) => setFormData({ ...formData, impactDetails: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Narrative of how this milestone was achieved..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white leading-relaxed focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ImageUploader
                  label="Certificate / Commemorative Photo"
                  imageUrl={formData.image}
                  defaultCategory="Achievements"
                  aspectRatio="video"
                  helperText="Upload or choose photo of award, certificate, or dedication event."
                  onChange={(url) => setFormData({ ...formData, image: url })}
                />

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Publication Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as ContentStatus })
                    }
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="published">Published (Live on Website)</option>
                    <option value="draft">Draft (Private)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  {editingAchievement ? 'Update Achievement' : 'Add Achievement'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!achievementToDelete}
        title="Delete Achievement"
        message={`Are you sure you want to delete "${achievementToDelete?.title}"?`}
        confirmLabel="Delete Achievement"
        onConfirm={handleConfirmDelete}
        onClose={() => setAchievementToDelete(null)}
      />
    </div>
  );
};
