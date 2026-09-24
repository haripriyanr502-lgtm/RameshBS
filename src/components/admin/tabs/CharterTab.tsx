'use client';

import React, { useState } from 'react';
import { CharterSectionItem, ContentStatus } from '../../../lib/cms/types';
import { DataTable, Column } from '../DataTable';
import { ConfirmDialog } from '../ConfirmDialog';
import { useToast } from '../Toast';
import { X, Scroll, ArrowUp, ArrowDown } from 'lucide-react';

interface CharterTabProps {
  charterSections: CharterSectionItem[];
  onChange: (updated: CharterSectionItem[]) => void;
  onSave: () => void;
}

export const CharterTab: React.FC<CharterTabProps> = ({
  charterSections,
  onChange,
  onSave,
}) => {
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<CharterSectionItem | null>(null);
  const [sectionToDelete, setSectionToDelete] = useState<CharterSectionItem | null>(null);

  const [formData, setFormData] = useState<Partial<CharterSectionItem>>({
    sectionTitle: '',
    sectionContent: '',
    category: 'Governance & Leadership',
    displayOrder: charterSections.length + 1,
    status: 'published',
  });

  const openAddModal = () => {
    setEditingSection(null);
    setFormData({
      sectionTitle: '',
      sectionContent: '',
      category: 'Governance & Leadership',
      displayOrder: charterSections.length + 1,
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (section: CharterSectionItem) => {
    setEditingSection(section);
    setFormData({ ...section });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sectionTitle?.trim()) {
      showToast('Section title is required', 'error');
      return;
    }

    if (editingSection) {
      const updatedList = charterSections.map((s) =>
        s.id === editingSection.id
          ? ({
              ...s,
              ...formData,
              updatedAt: new Date().toISOString(),
            } as CharterSectionItem)
          : s
      );
      onChange(updatedList);
      showToast('Charter section updated successfully', 'success');
    } else {
      const newSection: CharterSectionItem = {
        id: `charter-${Date.now()}`,
        sectionTitle: formData.sectionTitle || 'New Charter Section',
        sectionContent: formData.sectionContent || '',
        category: formData.category || 'Governance & Leadership',
        displayOrder: Number(formData.displayOrder) || charterSections.length + 1,
        status: (formData.status as ContentStatus) || 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      onChange([...charterSections, newSection]);
      showToast('New charter section added successfully', 'success');
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!sectionToDelete) return;
    const updated = charterSections.filter((s) => s.id !== sectionToDelete.id);
    onChange(updated);
    showToast('Charter section deleted successfully', 'success');
    setSectionToDelete(null);
  };

  const handleToggleStatus = (section: CharterSectionItem) => {
    const nextStatus: ContentStatus = section.status === 'published' ? 'draft' : 'published';
    const updated = charterSections.map((s) =>
      s.id === section.id
        ? { ...s, status: nextStatus, updatedAt: new Date().toISOString() }
        : s
    );
    onChange(updated);
    showToast(
      `Section ${nextStatus === 'published' ? 'published' : 'saved as draft'}`,
      'info'
    );
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= charterSections.length) return;

    const copy = [...charterSections];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;

    // Recalculate displayOrder
    copy.forEach((item, idx) => {
      item.displayOrder = idx + 1;
    });

    onChange(copy);
    showToast('Section order re-arranged', 'info');
  };

  const columns: Column<CharterSectionItem>[] = [
    {
      header: 'Section Title & Category',
      accessor: (s) => (
        <div>
          <div className="font-bold text-white tracking-tight">{s.sectionTitle}</div>
          <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-mono">
            {s.category}
          </span>
        </div>
      ),
    },
    {
      header: 'Content Summary',
      accessor: (s) => (
        <p className="text-slate-300 text-xs line-clamp-2 max-w-md leading-relaxed">
          {s.sectionContent}
        </p>
      ),
    },
    {
      header: 'Order & Position',
      accessor: (s) => {
        const idx = charterSections.findIndex((item) => item.id === s.id);
        return (
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-slate-400 text-xs mr-1">#{s.displayOrder}</span>
            <button
              type="button"
              disabled={idx === 0}
              onClick={() => handleMoveOrder(idx, 'up')}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Move Up"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              disabled={idx === charterSections.length - 1}
              onClick={() => handleMoveOrder(idx, 'down')}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Move Down"
            >
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Lions Club of Bangalore Brigade Charter Editor"
        subtitle="Manage constitutional bylaws, clean water CSR governance protocols, and executive board accords."
        items={charterSections}
        columns={columns}
        addButtonLabel="+ Add Section"
        onAdd={openAddModal}
        onEdit={openEditModal}
        onDelete={(s) => setSectionToDelete(s)}
        onToggleStatus={handleToggleStatus}
        filterCategories={[
          'Preamble',
          'Objectives',
          'Governance & Leadership',
          'CSR & Clean Water Bylaws',
          'Code of Ethics',
          'Membership Guidelines',
        ]}
        getCategory={(s) => s.category}
        renderThumbnail={() => (
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Scroll className="w-5 h-5" />
          </div>
        )}
      />

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingSection ? 'Edit Charter Section' : '+ Add Charter Section'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="mt-6 space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Section Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Village Water Purification Plant Protocols & Audit Mandates"
                  value={formData.sectionTitle}
                  onChange={(e) => setFormData({ ...formData, sectionTitle: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as CharterSectionItem['category'],
                      })
                    }
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="Preamble">Preamble</option>
                    <option value="Governance & Leadership">Governance & Leadership</option>
                    <option value="CSR & Clean Water Bylaws">CSR & Clean Water Bylaws</option>
                    <option value="Objectives">Objectives</option>
                    <option value="Code of Ethics">Code of Ethics</option>
                    <option value="Membership Guidelines">Membership Guidelines</option>
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

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as ContentStatus })
                    }
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Section Content & Bylaw Narrative *
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Detail the constitutional clauses, governance duties, or bylaws for this section..."
                  value={formData.sectionContent}
                  onChange={(e) => setFormData({ ...formData, sectionContent: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
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
                  {editingSection ? 'Update Section' : 'Create Section'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!sectionToDelete}
        title="Delete Charter Section"
        message={`Are you sure you want to delete "${sectionToDelete?.sectionTitle}"?`}
        confirmLabel="Delete Section"
        onConfirm={handleConfirmDelete}
        onClose={() => setSectionToDelete(null)}
      />
    </div>
  );
};
