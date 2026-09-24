'use client';

import React, { useState } from 'react';
import { CmsServiceItem, ContentStatus } from '../../../lib/cms/types';
import { DataTable, Column } from '../DataTable';
import { ImageUploader } from '../ImageUploader';
import { ConfirmDialog } from '../ConfirmDialog';
import { useToast } from '../Toast';
import { X, Briefcase, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface ServicesTabProps {
  services: CmsServiceItem[];
  onChange: (updated: CmsServiceItem[]) => void;
  onSave: () => void;
}

export const ServicesTab: React.FC<ServicesTabProps> = ({
  services,
  onChange,
  onSave,
}) => {
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<CmsServiceItem | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<CmsServiceItem | null>(null);

  const [formData, setFormData] = useState<Partial<CmsServiceItem>>({
    name: '',
    description: '',
    iconName: 'Globe',
    image: '',
    category: 'Enterprise IT Solutions',
    yearsOfExperience: 10,
    features: [],
    tag: '',
    displayOrder: services.length + 1,
    status: 'published',
  });

  const [featureInput, setFeatureInput] = useState('');

  const openAddModal = () => {
    setEditingService(null);
    setFormData({
      name: '',
      description: '',
      iconName: 'Globe',
      image: '',
      category: 'Enterprise IT Solutions',
      yearsOfExperience: 10,
      features: [],
      tag: 'Technology',
      displayOrder: services.length + 1,
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service: CmsServiceItem) => {
    setEditingService(service);
    setFormData({ ...service });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      showToast('Service name is required', 'error');
      return;
    }

    if (editingService) {
      const updatedList = services.map((s) =>
        s.id === editingService.id
          ? ({
              ...s,
              ...formData,
              updatedAt: new Date().toISOString(),
            } as CmsServiceItem)
          : s
      );
      onChange(updatedList);
      showToast('Service updated successfully', 'success');
    } else {
      const newService: CmsServiceItem = {
        id: `srv-${Date.now()}`,
        name: formData.name || 'New Service',
        description: formData.description || '',
        iconName: formData.iconName || 'Globe',
        image: formData.image,
        category: formData.category || 'Executive Service',
        yearsOfExperience: Number(formData.yearsOfExperience) || 0,
        features: formData.features || [],
        tag: formData.tag || formData.category,
        displayOrder: Number(formData.displayOrder) || services.length + 1,
        status: (formData.status as ContentStatus) || 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      onChange([newService, ...services]);
      showToast('New service added successfully', 'success');
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!serviceToDelete) return;
    const updated = services.filter((s) => s.id !== serviceToDelete.id);
    onChange(updated);
    showToast('Service removed successfully', 'success');
    setServiceToDelete(null);
  };

  const handleToggleStatus = (service: CmsServiceItem) => {
    const nextStatus: ContentStatus = service.status === 'published' ? 'draft' : 'published';
    const updated = services.map((s) =>
      s.id === service.id ? { ...s, status: nextStatus, updatedAt: new Date().toISOString() } : s
    );
    onChange(updated);
    showToast(
      `Service ${nextStatus === 'published' ? 'published to live site' : 'saved as draft'}`,
      'info'
    );
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), featureInput.trim()],
    }));
    setFeatureInput('');
  };

  const handleRemoveFeature = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== idx),
    }));
  };

  const columns: Column<CmsServiceItem>[] = [
    {
      header: 'Service Name & Category',
      accessor: (s) => (
        <div>
          <div className="font-bold text-white tracking-tight">{s.name}</div>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-mono">
              {s.category}
            </span>
            <span>{s.yearsOfExperience} Yrs Experience</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Key Features',
      accessor: (s) => (
        <div className="text-slate-300 text-xs">
          {s.features && s.features.length > 0 ? (
            <span className="truncate block max-w-xs">{s.features.join(' • ')}</span>
          ) : (
            <span className="text-slate-500 italic">None specified</span>
          )}
        </div>
      ),
    },
    {
      header: 'Order',
      accessor: (s) => (
        <span className="font-mono text-slate-400 text-xs">#{s.displayOrder}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Services Involved In"
        subtitle="Manage BSR IT Solutions platforms, talent staffing, clean water CSR, and youth wellness initiatives."
        items={services}
        columns={columns}
        addButtonLabel="+ Add Service"
        onAdd={openAddModal}
        onEdit={openEditModal}
        onDelete={(s) => setServiceToDelete(s)}
        onToggleStatus={handleToggleStatus}
        filterCategories={Array.from(new Set(services.map((s) => s.category).filter(Boolean)))}
        getCategory={(s) => s.category}
        renderThumbnail={(s) => (
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
        )}
      />

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingService ? 'Edit Service Details' : '+ Add New Service'}
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
                  Service Name / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise Web Applications & Cloud Solutions"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Enterprise IT"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    value={formData.yearsOfExperience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        yearsOfExperience: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Icon Name
                  </label>
                  <select
                    value={formData.iconName}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="Globe">Globe (Web & Tech)</option>
                    <option value="Users">Users (Staffing & Team)</option>
                    <option value="Droplets">Droplets (Clean Water CSR)</option>
                    <option value="Trophy">Trophy (Sports & WIN5M)</option>
                    <option value="HeartHandshake">HeartHandshake (Community)</option>
                    <option value="Shield">Shield (Governance)</option>
                    <option value="Sparkles">Sparkles (Consulting)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Comprehensive Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain the scope and societal or business impact of this service..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white leading-relaxed focus:outline-none"
                />
              </div>

              {/* Service Image / Poster */}
              <ImageUploader
                label="Service Illustration / Showcase Image"
                imageUrl={formData.image}
                defaultCategory="Services"
                aspectRatio="video"
                helperText="Optional image or platform graphic representing this service."
                onChange={(url) => setFormData({ ...formData, image: url })}
              />

              {/* Key Features List */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Key Features & Deliverables
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Reverse Osmosis 1000 LPH filtration units"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.features?.map((f, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs border border-slate-700"
                    >
                      <CheckCircle2 className="w-3 h-3 text-amber-400" />
                      <span>{f}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-slate-400 hover:text-red-400 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
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
                  {editingService ? 'Update Service' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!serviceToDelete}
        title="Delete Service"
        message={`Are you sure you want to delete "${serviceToDelete?.name}"? It will no longer appear on your live website.`}
        confirmLabel="Delete Service"
        onConfirm={handleConfirmDelete}
        onClose={() => setServiceToDelete(null)}
      />
    </div>
  );
};
