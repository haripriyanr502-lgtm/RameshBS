'use client';

import React, { useState } from 'react';
import { TeamMemberItem, ContentStatus } from '../../../lib/cms/types';
import { DataTable, Column } from '../DataTable';
import { ImageUploader } from '../ImageUploader';
import { ConfirmDialog } from '../ConfirmDialog';
import { useToast } from '../Toast';
import { X, User, Mail, Phone } from 'lucide-react';

interface TeamTabProps {
  team: TeamMemberItem[];
  onChange: (updated: TeamMemberItem[]) => void;
  onSave: () => void;
}

export const TeamTab: React.FC<TeamTabProps> = ({
  team,
  onChange,
  onSave,
}) => {
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMemberItem | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<TeamMemberItem | null>(null);

  const [formData, setFormData] = useState<Partial<TeamMemberItem>>({
    fullName: '',
    position: '',
    profileImage: '',
    biography: '',
    organization: 'Lions Club of Bangalore Brigade',
    email: '',
    phone: '',
    displayOrder: team.length + 1,
    status: 'published',
  });

  const openAddModal = () => {
    setEditingMember(null);
    setFormData({
      fullName: '',
      position: '',
      profileImage: '',
      biography: '',
      organization: 'Lions Club of Bangalore Brigade',
      email: '',
      phone: '',
      displayOrder: team.length + 1,
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (member: TeamMemberItem) => {
    setEditingMember(member);
    setFormData({ ...member });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName?.trim() || !formData.position?.trim()) {
      showToast('Full name and position are required', 'error');
      return;
    }

    if (editingMember) {
      const updatedList = team.map((m) =>
        m.id === editingMember.id
          ? ({
              ...m,
              ...formData,
              updatedAt: new Date().toISOString(),
            } as TeamMemberItem)
          : m
      );
      onChange(updatedList);
      showToast('Team member updated successfully', 'success');
    } else {
      const newMember: TeamMemberItem = {
        id: `team-${Date.now()}`,
        fullName: formData.fullName || 'New Member',
        position: formData.position || '',
        profileImage: formData.profileImage || '',
        biography: formData.biography || '',
        organization: formData.organization || 'Lions Club of Bangalore Brigade',
        email: formData.email,
        phone: formData.phone,
        displayOrder: Number(formData.displayOrder) || team.length + 1,
        status: (formData.status as ContentStatus) || 'published',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      onChange([...team, newMember]);
      showToast('New team member added successfully', 'success');
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!memberToDelete) return;
    const updated = team.filter((m) => m.id !== memberToDelete.id);
    onChange(updated);
    showToast('Team member removed successfully', 'success');
    setMemberToDelete(null);
  };

  const handleToggleStatus = (member: TeamMemberItem) => {
    const nextStatus: ContentStatus = member.status === 'published' ? 'draft' : 'published';
    const updated = team.map((m) =>
      m.id === member.id ? { ...m, status: nextStatus, updatedAt: new Date().toISOString() } : m
    );
    onChange(updated);
    showToast(
      `Member ${nextStatus === 'published' ? 'published on website' : 'saved as draft'}`,
      'info'
    );
  };

  const columns: Column<TeamMemberItem>[] = [
    {
      header: 'Name & Role',
      accessor: (m) => (
        <div>
          <div className="font-bold text-white tracking-tight">{m.fullName}</div>
          <div className="text-amber-400 text-xs font-medium mt-0.5">{m.position}</div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">{m.organization}</div>
        </div>
      ),
    },
    {
      header: 'Biography',
      accessor: (m) => (
        <p className="text-slate-300 text-xs line-clamp-2 max-w-sm leading-relaxed">
          {m.biography}
        </p>
      ),
    },
    {
      header: 'Order',
      accessor: (m) => (
        <span className="font-mono text-slate-400 text-xs">#{m.displayOrder}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Team & Leadership Roster"
        subtitle="Manage Lions Club Bangalore Brigade leadership, district advisors, and corporate executive profiles."
        items={team}
        columns={columns}
        addButtonLabel="+ Add Team Member"
        onAdd={openAddModal}
        onEdit={openEditModal}
        onDelete={(m) => setMemberToDelete(m)}
        onToggleStatus={handleToggleStatus}
        filterCategories={Array.from(new Set(team.map((m) => m.organization).filter(Boolean)))}
        getCategory={(m) => m.organization}
        renderThumbnail={(m) => (
          <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center shrink-0">
            {m.profileImage ? (
              <img src={m.profileImage} alt={m.fullName} className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-slate-600" />
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
                {editingMember ? 'Edit Team Member' : '+ Add Team Member'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ln. Bangalore Siddegowda Ramesh"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Position / Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Charter Secretary & Region Chair"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Organization / Entity
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lions Club of Bangalore Brigade"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  />
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
                    Publication Status
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="officer@lcbbrigade.com"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="+91 98450 00000"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Biography / Leadership Profile
                </label>
                <textarea
                  rows={3}
                  placeholder="Overview of this officer or team member's role and contributions..."
                  value={formData.biography}
                  onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white leading-relaxed focus:outline-none"
                />
              </div>

              {/* Profile Image with Change Image functionality */}
              <ImageUploader
                label="Profile Photo / Portrait"
                imageUrl={formData.profileImage}
                defaultCategory="Team"
                aspectRatio="portrait"
                helperText="Upload or choose photo for this team member. No code editing required."
                onChange={(url) => setFormData({ ...formData, profileImage: url })}
              />

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
                  {editingMember ? 'Update Member' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!memberToDelete}
        title="Remove Team Member"
        message={`Are you sure you want to remove "${memberToDelete?.fullName}"?`}
        confirmLabel="Remove Member"
        onConfirm={handleConfirmDelete}
        onClose={() => setMemberToDelete(null)}
      />
    </div>
  );
};
