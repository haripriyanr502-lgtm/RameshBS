'use client';

import React, { useState } from 'react';
import { CmsProjectItem, ContentStatus } from '../../../lib/cms/types';
import { ImageUploader } from '../ImageUploader';
import { ConfirmDialog } from '../ConfirmDialog';
import { MediaPickerModal } from '../MediaPickerModal';
import { useToast } from '../Toast';
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  Camera,
  Calendar,
  MapPin,
  Video,
  Tag,
  Eye,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';

interface ProjectsTabProps {
  projects: CmsProjectItem[];
  onChange: (updated: CmsProjectItem[]) => void;
  onSave: () => void;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({
  projects = [],
  onChange,
  onSave,
}) => {
  const { showToast } = useToast();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<CmsProjectItem | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<CmsProjectItem | null>(null);

  // Quick image changer modal state
  const [quickImageProject, setQuickImageProject] = useState<CmsProjectItem | null>(null);

  const [formData, setFormData] = useState<Partial<CmsProjectItem>>({
    title: '',
    category: 'Service Activities',
    description: '',
    hashtags: [],
    date: '',
    location: '',
    image: '',
    youtubeId: '',
    url: '',
    status: 'published',
  });

  const [hashtagInput, setHashtagInput] = useState('');

  const categories = ['All', 'Service Activities', 'Meetings', 'Travel Activities'];

  // Filter projects
  const filteredProjects = projects.filter((proj) => {
    const matchesCategory =
      activeCategory === 'All' || proj.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (proj.location && proj.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (proj.hashtags && proj.hashtags.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: activeCategory !== 'All' ? activeCategory : 'Service Activities',
      description: '',
      hashtags: ['#CommunityImpact', '#LCBBrigade'],
      date: new Date().getFullYear().toString(),
      location: 'Bengaluru, Karnataka',
      image: '',
      youtubeId: '',
      url: '',
      status: 'published',
      displayOrder: projects.length + 1,
    });
    setHashtagInput('');
    setIsModalOpen(true);
  };

  const openEditModal = (project: CmsProjectItem) => {
    setEditingProject(project);
    setFormData({ ...project });
    setHashtagInput('');
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      showToast('Project title is required', 'error');
      return;
    }

    if (editingProject) {
      const updated = projects.map((p) =>
        p.id === editingProject.id
          ? ({
              ...p,
              ...formData,
              updatedAt: new Date().toISOString(),
            } as CmsProjectItem)
          : p
      );
      onChange(updated);
      showToast('Project updated successfully', 'success');
    } else {
      const newProject: CmsProjectItem = {
        id: `act-${Date.now()}`,
        title: formData.title || 'New Project',
        category: formData.category || 'Service Activities',
        description: formData.description || '',
        hashtags: formData.hashtags || [],
        date: formData.date || '',
        location: formData.location || '',
        image: formData.image || '',
        youtubeId: formData.youtubeId || '',
        url: formData.url || (formData.youtubeId ? `https://youtu.be/${formData.youtubeId}` : ''),
        status: (formData.status as ContentStatus) || 'published',
        displayOrder: Number(formData.displayOrder) || projects.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      onChange([newProject, ...projects]);
      showToast('Project added successfully', 'success');
    }

    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!projectToDelete) return;
    const updated = projects.filter((p) => p.id !== projectToDelete.id);
    onChange(updated);
    showToast('Project deleted successfully', 'success');
    setProjectToDelete(null);
  };

  const handleQuickImageSelect = (newImageUrl: string) => {
    if (!quickImageProject) return;
    const updated = projects.map((p) =>
      p.id === quickImageProject.id
        ? {
            ...p,
            image: newImageUrl,
            url: newImageUrl,
            updatedAt: new Date().toISOString(),
          }
        : p
    );
    onChange(updated);
    showToast('Project image updated successfully', 'success');
    setQuickImageProject(null);
  };

  const handleAddHashtag = () => {
    if (!hashtagInput.trim()) return;
    let tag = hashtagInput.trim();
    if (!tag.startsWith('#')) tag = `#${tag}`;
    const current = formData.hashtags || [];
    if (!current.includes(tag)) {
      setFormData({ ...formData, hashtags: [...current, tag] });
    }
    setHashtagInput('');
  };

  const handleRemoveHashtag = (tagToRemove: string) => {
    const current = formData.hashtags || [];
    setFormData({
      ...formData,
      hashtags: current.filter((t) => t !== tagToRemove),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Projects & Field Activities
              </h2>
              <p className="text-xs text-slate-400">
                Manage service missions, governance meetings, travel initiatives & project media
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const count =
              cat === 'All'
                ? projects.length
                : projects.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-slate-950/20 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects, tags, location..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/60 rounded-3xl border border-slate-800 text-slate-400">
          <FolderKanban className="w-12 h-12 mx-auto mb-3 text-slate-600" />
          <p className="text-sm font-semibold">No projects match the current filter</p>
          <p className="text-xs text-slate-500 mt-1">Try selecting another category or clear the search query</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const thumbnail =
              project.image ||
              (project.youtubeId
                ? `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`
                : project.url && project.url.includes('images')
                ? project.url
                : '');

            return (
              <div
                key={project.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl group"
              >
                <div>
                  {/* Thumbnail / Header */}
                  <div className="relative aspect-video bg-slate-950 overflow-hidden flex items-center justify-center">
                    {thumbnail ? (
                      <img
                        src={thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-600 p-4">
                        <FolderKanban className="w-10 h-10 mb-2 text-slate-700" />
                        <span className="text-[11px] font-semibold">No Image Preview</span>
                      </div>
                    )}

                    {/* Category pill */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-amber-400 border border-slate-800 shadow">
                        {project.category}
                      </span>
                    </div>

                    {/* YouTube indicator if available */}
                    {project.youtubeId && (
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow">
                        <Video className="w-4 h-4" />
                      </div>
                    )}

                    {/* Overlay action: Change Image button */}
                    <button
                      onClick={() => setQuickImageProject(project)}
                      className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/90 hover:bg-amber-500 text-slate-200 hover:text-slate-950 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border border-slate-700 transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Change Image</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-400">
                      {project.date && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-500" />
                          <span>{project.date}</span>
                        </div>
                      )}
                      {project.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-amber-500" />
                          <span className="truncate max-w-[140px]">{project.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Hashtags */}
                    {project.hashtags && project.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {project.hashtags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.hashtags.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-500">
                            +{project.hashtags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Controls: Edit & Delete */}
                <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      project.status === 'published'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {project.status || 'published'}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(project)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => setProjectToDelete(project)}
                      className="p-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/40 transition-colors cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit / Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <FolderKanban className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {editingProject ? 'Edit Project / Activity' : 'Add New Project / Activity'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Fields will update public activities and portfolio displays
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveModal} className="space-y-5 pt-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Saplings Plantation @ Bangalore University"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category || 'Service Activities'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Service Activities">Service Activities</option>
                    <option value="Meetings">Meetings</option>
                    <option value="Travel Activities">Travel Activities</option>
                    <option value="CSR Initiatives">CSR Initiatives</option>
                    <option value="Youth & Sports">Youth & Sports</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status || 'published'}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as ContentStatus })
                    }
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="published">Published (Visible on site)</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of the service project or event..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Date / Year
                  </label>
                  <input
                    type="text"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. 2024 or Oct 2024"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Bengaluru, Karnataka"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Media: Image & YouTube ID */}
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <ImageUploader
                  label="Project Thumbnail / Image"
                  imageUrl={formData.image || ''}
                  defaultCategory="General"
                  aspectRatio="video"
                  helperText="Upload a new photo or select from media library. For video cards, an image preview is automatically used if no custom image is selected."
                  onChange={(url) => setFormData({ ...formData, image: url })}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      YouTube Video ID (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.youtubeId || ''}
                      onChange={(e) => setFormData({ ...formData, youtubeId: e.target.value })}
                      placeholder="e.g. 7bql4N4bHP0"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      The video ID from youtube.com/watch?v=<b>ID</b> or youtu.be/<b>ID</b>
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      External Link / URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.url || ''}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://youtu.be/..."
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Hashtags */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Hashtags & Tags
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={hashtagInput}
                    onChange={(e) => setHashtagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddHashtag();
                      }
                    }}
                    placeholder="e.g. #CleanWater"
                    className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddHashtag}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs uppercase"
                  >
                    Add Tag
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {(formData.hashtags || []).map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHashtag(tag)}
                        className="text-slate-500 hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Image Changer Modal */}
      {quickImageProject && (
        <MediaPickerModal
          isOpen={true}
          currentImageUrl={quickImageProject.image || ''}
          defaultCategory="General"
          onSelectImage={handleQuickImageSelect}
          onClose={() => setQuickImageProject(null)}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!projectToDelete}
        title="Delete Project?"
        message={`Are you sure you want to permanently delete "${projectToDelete?.title}"? This will remove it from the public portfolio website activities list.`}
        confirmLabel="Yes, Delete Project"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
        onClose={() => setProjectToDelete(null)}
      />
    </div>
  );
};
