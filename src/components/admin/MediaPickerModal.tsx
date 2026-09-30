'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Upload,
  Image as ImageIcon,
  Check,
  Search,
  Filter,
  Link as LinkIcon,
  CheckCircle2,
} from 'lucide-react';
import { MediaAsset } from '../../lib/cms/types';
import { useToast } from './Toast';

interface MediaPickerModalProps {
  isOpen: boolean;
  currentImageUrl?: string;
  defaultCategory?: MediaAsset['category'];
  onSelectImage: (url: string) => void;
  onClose: () => void;
}

export const MediaPickerModal: React.FC<MediaPickerModalProps> = ({
  isOpen,
  currentImageUrl,
  defaultCategory = 'General',
  onSelectImage,
  onClose,
}) => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'library' | 'upload' | 'url'>('library');
  const [mediaList, setMediaList] = useState<MediaAsset[]>([]);
  const [selectedUrl, setSelectedUrl] = useState<string>(currentImageUrl || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Upload tab state
  const [uploadCategory, setUploadCategory] = useState<MediaAsset['category']>(defaultCategory);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setSelectedUrl(currentImageUrl || '');
    }
  }

  const fetchMedia = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/media');
      if (res.ok) {
        const data = await res.json();
        setMediaList(data);
      }
    } catch {
      showToast('Failed to load media assets', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  // Fetch media items on open
  useEffect(() => {
    if (!isOpen) return;
    let ignore = false;
    const load = async () => {
      try {
        const res = await fetch('/api/admin/media');
        if (!ignore && res.ok) {
          const data = await res.json();
          setMediaList(data);
        } else if (!ignore) {
          showToast('Failed to load media assets', 'error');
        }
      } catch {
        if (!ignore) showToast('Failed to load media assets', 'error');
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [isOpen, showToast]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', uploadCategory);

    try {
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Upload failed', 'error');
        setIsUploading(false);
        return;
      }

      showToast('Image uploaded successfully', 'success');
      setSelectedUrl(data.asset.url);
      setMediaList((prev) => [data.asset, ...prev]);
      setActiveTab('library');
    } catch {
      showToast('Network error during upload', 'error');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleConfirm = () => {
    if (!selectedUrl) {
      showToast('Please select or upload an image', 'info');
      return;
    }
    onSelectImage(selectedUrl);
    onClose();
  };

  if (!isOpen) return null;

  const categories = ['ALL', 'Hero', 'Team', 'Meetings', 'Services', 'Achievements', 'Posters', 'General', 'Logo'];

  const filteredMedia = mediaList.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.altText && item.altText.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-slate-100 z-10 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Media Manager & Image Selector</h3>
                <p className="text-xs text-slate-400">
                  Select from existing media, upload a replacement, or provide an image link
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-slate-900/50">
            <button
              onClick={() => setActiveTab('library')}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeTab === 'library'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Media Library ({mediaList.length})
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'upload'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload New Image</span>
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'url'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Direct URL</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1">
            {activeTab === 'library' && (
              <div className="space-y-4">
                {/* Search & Category Filter */}
                <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search image name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  {/* Categories Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                    <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0 mr-1" />
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                          selectedCategory === cat
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid */}
                {isLoading ? (
                  <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                    <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-3" />
                    <span className="text-xs">Loading media assets...</span>
                  </div>
                ) : filteredMedia.length === 0 ? (
                  <div className="py-16 text-center border-2 border-dashed border-slate-800 rounded-2xl">
                    <ImageIcon className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-300">No media assets found</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Upload an image or change your filter category
                    </p>
                    <button
                      onClick={() => setActiveTab('upload')}
                      className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Image Now</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {filteredMedia.map((asset) => {
                      const isSelected = selectedUrl === asset.url;
                      return (
                        <div
                          key={asset.id}
                          onClick={() => setSelectedUrl(asset.url)}
                          className={`group relative rounded-2xl overflow-hidden border transition-all cursor-pointer bg-slate-950 aspect-video flex items-center justify-center ${
                            isSelected
                              ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-400/10'
                              : 'border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <img
                            src={asset.url}
                            alt={asset.altText || asset.fileName}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                            <span className="text-[11px] font-semibold text-white truncate">
                              {asset.fileName}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider text-amber-400 font-bold">
                              {asset.category}
                            </span>
                          </div>

                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'upload' && (
              <div className="space-y-6 max-w-xl mx-auto py-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Media Category
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as MediaAsset['category'])}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Hero">Hero (Portrait / Banner)</option>
                    <option value="Team">Team / Leadership</option>
                    <option value="Meetings">Meetings / DGAMs</option>
                    <option value="Services">Services</option>
                    <option value="Achievements">Achievements & Honors</option>
                    <option value="Posters">Posters & Flyers</option>
                    <option value="Logo">Logos & Badges</option>
                    <option value="General">General Media</option>
                  </select>
                </div>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-amber-400 rounded-3xl p-8 sm:p-12 text-center bg-slate-950/50 hover:bg-slate-950 transition-all cursor-pointer group"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                    className="hidden"
                  />
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {isUploading ? (
                      <div className="w-7 h-7 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Upload className="w-7 h-7" />
                    )}
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">
                    {isUploading ? 'Uploading Image...' : 'Click or Drag Image Here to Upload'}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Supported formats: PNG, JPG, JPEG, WEBP, GIF, SVG (Max file size: 10MB)
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'url' && (
              <div className="space-y-6 max-w-xl mx-auto py-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Direct Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg or /images/..."
                      value={customUrlInput}
                      onChange={(e) => setCustomUrlInput(e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (customUrlInput) {
                          setSelectedUrl(customUrlInput);
                          showToast('Image URL selected', 'info');
                        }
                      }}
                      className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {customUrlInput && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400 block mb-2 font-medium">URL Preview:</span>
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 max-h-48 flex items-center justify-center bg-slate-900">
                      <img
                        src={customUrlInput}
                        alt="URL Preview"
                        className="w-full h-full object-contain"
                        onError={() => showToast('Could not load image preview from this URL', 'error')}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer with Selected Image Preview & Action Buttons */}
          <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Selected:
              </span>
              {selectedUrl ? (
                <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 max-w-xs sm:max-w-md">
                  <img
                    src={selectedUrl}
                    alt="Preview"
                    className="w-6 h-6 rounded-lg object-cover border border-slate-700 shrink-0"
                  />
                  <span className="text-xs text-slate-200 truncate font-mono">{selectedUrl}</span>
                </div>
              ) : (
                <span className="text-xs text-slate-500 italic">No image selected</span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!selectedUrl}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Selection</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
