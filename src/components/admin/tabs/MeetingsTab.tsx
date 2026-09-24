'use client';

import React, { useState } from 'react';
import { MeetingItem, ContentStatus } from '../../../lib/cms/types';
import { DataTable, Column } from '../DataTable';
import { ImageUploader } from '../ImageUploader';
import { ConfirmDialog } from '../ConfirmDialog';
import { useToast } from '../Toast';
import { X, Calendar, MapPin, Clock, Plus, Trash2 } from 'lucide-react';

interface MeetingsTabProps {
  meetings: MeetingItem[];
  onChange: (updated: MeetingItem[]) => void;
  onSave: () => void;
}

export const MeetingsTab: React.FC<MeetingsTabProps> = ({
  meetings,
  onChange,
  onSave,
}) => {
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<MeetingItem | null>(null);
  const [meetingToDelete, setMeetingToDelete] = useState<MeetingItem | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<MeetingItem>>({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:30 AM',
    location: 'Bengaluru',
    description: '',
    image: '',
    statusCategory: 'DGAM',
    status: 'published',
    displayOrder: meetings.length + 1,
    dignitaries: [],
    keyOutcomes: [],
  });

  const [dignitaryInput, setDignitaryInput] = useState('');
  const [outcomeInput, setOutcomeInput] = useState('');

  const openAddModal = () => {
    setEditingMeeting(null);
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '10:30 AM',
      location: 'Bengaluru',
      description: '',
      image: '',
      statusCategory: 'Regular Meeting',
      status: 'published',
      displayOrder: meetings.length + 1,
      dignitaries: [],
      keyOutcomes: [],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (meeting: MeetingItem) => {
    setEditingMeeting(meeting);
    setFormData({ ...meeting });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      showToast('Meeting title is required', 'error');
      return;
    }

    if (editingMeeting) {
      // Update existing
      const updatedList = meetings.map((m) =>
        m.id === editingMeeting.id
          ? ({
              ...m,
              ...formData,
              updatedAt: new Date().toISOString(),
            } as MeetingItem)
          : m
      );
      onChange(updatedList);
      showToast('Meeting updated successfully', 'success');
    } else {
      // Create new
      const newMeeting: MeetingItem = {
        id: `meet-${Date.now()}`,
        title: formData.title || 'New Meeting',
        date: formData.date || new Date().toISOString().split('T')[0],
        time: formData.time || '',
        location: formData.location || 'Bengaluru',
        description: formData.description || '',
        image: formData.image || '',
        statusCategory: formData.statusCategory || 'Regular Meeting',
        status: (formData.status as ContentStatus) || 'published',
        displayOrder: Number(formData.displayOrder) || meetings.length + 1,
        dignitaries: formData.dignitaries || [],
        keyOutcomes: formData.keyOutcomes || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      onChange([newMeeting, ...meetings]);
      showToast('New meeting added successfully', 'success');
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (!meetingToDelete) return;
    const updated = meetings.filter((m) => m.id !== meetingToDelete.id);
    onChange(updated);
    showToast('Meeting deleted successfully', 'success');
    setMeetingToDelete(null);
  };

  const handleToggleStatus = (meeting: MeetingItem) => {
    const nextStatus: ContentStatus = meeting.status === 'published' ? 'draft' : 'published';
    const updated = meetings.map((m) =>
      m.id === meeting.id ? { ...m, status: nextStatus, updatedAt: new Date().toISOString() } : m
    );
    onChange(updated);
    showToast(
      `Meeting ${nextStatus === 'published' ? 'published to live website' : 'saved as draft'}`,
      'info'
    );
  };

  // Add dignitary tag
  const handleAddDignitary = () => {
    if (!dignitaryInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      dignitaries: [...(prev.dignitaries || []), dignitaryInput.trim()],
    }));
    setDignitaryInput('');
  };

  const handleRemoveDignitary = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      dignitaries: (prev.dignitaries || []).filter((_, i) => i !== idx),
    }));
  };

  // Add outcome tag
  const handleAddOutcome = () => {
    if (!outcomeInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      keyOutcomes: [...(prev.keyOutcomes || []), outcomeInput.trim()],
    }));
    setOutcomeInput('');
  };

  const handleRemoveOutcome = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      keyOutcomes: (prev.keyOutcomes || []).filter((_, i) => i !== idx),
    }));
  };

  // Columns definition for DataTable
  const columns: Column<MeetingItem>[] = [
    {
      header: 'Title & Category',
      accessor: (m) => (
        <div>
          <div className="font-bold text-white tracking-tight">{m.title}</div>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-mono">
              {m.statusCategory}
            </span>
            <span>Order #{m.displayOrder}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Date & Time',
      accessor: (m) => (
        <div className="text-slate-300 space-y-0.5">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{m.date}</span>
          </div>
          {m.time && (
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{m.time}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      header: 'Location',
      accessor: (m) => (
        <div className="flex items-center gap-1.5 text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="truncate max-w-[150px]">{m.location}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        title="Meetings & Official Assemblies"
        subtitle="Manage District Governor Advisory Meetings (DGAMs), Zone socials, and club board meetings."
        items={meetings}
        columns={columns}
        addButtonLabel="+ Add Meeting"
        onAdd={openAddModal}
        onEdit={openEditModal}
        onDelete={(m) => setMeetingToDelete(m)}
        onToggleStatus={handleToggleStatus}
        filterCategories={['DGAM', 'Regular Meeting', 'Board Meeting', 'Service Meeting', 'Special Event']}
        getCategory={(m) => m.statusCategory}
        renderThumbnail={(m) => (
          <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center shrink-0">
            {m.image ? (
              <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
            ) : (
              <Calendar className="w-5 h-5 text-slate-600" />
            )}
          </div>
        )}
      />

      {/* Add / Edit Meeting Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingMeeting ? 'Edit Meeting Details' : '+ Add New Meeting'}
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
                  Meeting Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5th District Governor Advisory Meeting (DGAM-5)"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Time
                  </label>
                  <input
                    type="text"
                    placeholder="10:30 AM"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.statusCategory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        statusCategory: e.target.value as MeetingItem['statusCategory'],
                      })
                    }
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  >
                    <option value="DGAM">DGAM</option>
                    <option value="Regular Meeting">Regular Meeting</option>
                    <option value="Board Meeting">Board Meeting</option>
                    <option value="Service Meeting">Service Meeting</option>
                    <option value="ZAM">Zone Advisory (ZAM)</option>
                    <option value="Special Event">Special Event</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Location / Venue
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. LCB Brigade Club House, Bengaluru"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
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
                      Publication
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value as ContentStatus })
                      }
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                    >
                      <option value="published">Published (Live)</option>
                      <option value="draft">Draft (Hidden)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Description / Agenda
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail the agenda, resolutions, or service outcomes of this meeting..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white leading-relaxed focus:outline-none"
                />
              </div>

              {/* Poster / Meeting Image */}
              <ImageUploader
                label="Meeting Image / Official Poster"
                imageUrl={formData.image}
                defaultCategory="Meetings"
                aspectRatio="video"
                helperText="Upload meeting photo, DGAM banner, or invitation poster."
                onChange={(url) => setFormData({ ...formData, image: url })}
              />

              {/* Dignitaries List */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Key Dignitaries & Attending Leaders
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. District Governor Ln. Narayanaswamy"
                    value={dignitaryInput}
                    onChange={(e) => setDignitaryInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddDignitary();
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddDignitary}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.dignitaries?.map((d, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs border border-slate-700"
                    >
                      <span>{d}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDignitary(idx)}
                        className="text-slate-400 hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Outcomes List */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Key Outcomes & Resolutions
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 100% compliance in club reporting"
                    value={outcomeInput}
                    onChange={(e) => setOutcomeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddOutcome();
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddOutcome}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.keyOutcomes?.map((o, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs border border-slate-700"
                    >
                      <span>{o}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveOutcome(idx)}
                        className="text-slate-400 hover:text-red-400"
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
                  className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
                >
                  {editingMeeting ? 'Update Meeting' : 'Create Meeting'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!meetingToDelete}
        title="Delete Meeting"
        message={`Are you sure you want to delete "${meetingToDelete?.title}"? This action will remove it from both the CMS and the live website.`}
        confirmLabel="Delete Meeting"
        onConfirm={handleConfirmDelete}
        onClose={() => setMeetingToDelete(null)}
      />
    </div>
  );
};
