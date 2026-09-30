'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MediaAsset } from '../../../lib/cms/types';
import { ConfirmDialog } from '../ConfirmDialog';
import { useToast } from '../Toast';
import {
  Upload,
  Search,
  Copy,
  Trash2,
  RefreshCw,
  ExternalLink,
  Filter,
  Image as ImageIcon,
  Check,
  CheckCircle2,
} from 'lucide-react';

interface MediaTabProps {
  onRefreshCmsData?: () => void;
}

export const MediaTab: React.FC<MediaTabProps> = ({ onRefreshCmsData }) => {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const [mediaList, setMediaList] = useState<MediaAsset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [uploadCategory, setUploadCategory] = useState<MediaAsset['category']>('General');

  const [assetToDelete, setAssetToDelete] = useState<MediaAsset | null>(null);
  const [assetToReplace, setAssetToReplace] = useState<MediaAsset | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  useEffect(() => {
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
  }, [showToast]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setMediaList((prev) => [data.asset, ...prev]);
      if (onRefreshCmsData) onRefreshCmsData();
    } catch {
      showToast('Network error during upload', 'error');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleReplaceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !assetToReplace) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', assetToReplace.category);

    try {
      const res = await fetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Replacement failed', 'error');
        setIsUploading(false);
        return;
      }

      showToast('Image replaced successfully', 'success');
      // Replace item in state
      setMediaList((prev) =>
        prev.map((item) => (item.id === assetToReplace.id ? data.asset : item))
      );
      setAssetToReplace(null);
      if (onRefreshCmsData) onRefreshCmsData();
    } catch {
      showToast('Network error during image replacement', 'error');
    } finally {
      setIsUploading(false);
      if (replaceInputRef.current) {
        replaceInputRef.current.value = '';
      }
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showToast('Image URL copied to clipboard', 'info');
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const handleDeleteConfirm = async () => {
    if (!assetToDelete) return;

    try {
      const res = await fetch('/api/admin/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: assetToDelete.id }),
      });

      if (res.ok) {
        setMediaList((prev) => prev.filter((a) => a.id !== assetToDelete.id));
        showToast('Image deleted successfully', 'success');
        if (onRefreshCmsData) onRefreshCmsData();
      } else {
        showToast('Failed to delete image', 'error');
      }
    } catch {
      showToast('Network error while deleting image', 'error');
    } finally {
      setAssetToDelete(null);
    }
  };

  const categories = [
    'ALL',
    'Logo',
    'Hero',
    'Team',
    'Meetings',
    'Services',
    'Achievements',
    'Posters',
    'General',
  ];

  const filteredMedia = mediaList.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.altText && item.altText.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Upload Zone Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h2 className="text-base font-bold text-white uppercase tracking-wider">
              Upload New Media File
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Files are saved securely to categorized folders on server storage.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Target Category:
            </span>
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value as MediaAsset['category'])}
              className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="General">General</option>
              <option value="Logo">Logo</option>
              <option value="Hero">Hero / Portraits</option>
              <option value="Team">Team Members</option>
              <option value="Meetings">Meetings & DGAMs</option>
              <option value="Services">Services</option>
              <option value="Achievements">Achievements</option>
              <option value="Posters">Posters & Banners</option>
            </select>
          </div>
        </div>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="mt-6 border-2 border-dashed border-slate-700 hover:border-amber-400/80 rounded-2xl p-6 sm:p-8 text-center bg-slate-950/40 hover:bg-slate-950/80 transition-all cursor-pointer group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            className="hidden"
          />
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
            {isUploading ? (
              <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>
          <p className="text-sm font-bold text-white">
            {isUploading ? 'Uploading Image to Server...' : 'Click to Upload Image'}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            JPG, PNG, WEBP, GIF, SVG up to 10MB per image
          </p>
        </div>
      </div>

      {/* Hidden replacement file input */}
      <input
        type="file"
        ref={replaceInputRef}
        onChange={handleReplaceUpload}
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
      />

      {/* Media Library View */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search file name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-3" />
            <span className="text-xs">Loading media assets...</span>
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="py-16 text-center border-2 border-dashed border-slate-800 rounded-2xl">
            <ImageIcon className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No media found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredMedia.map((asset) => (
              <div
                key={asset.id}
                className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden group transition-all flex flex-col shadow-lg"
              >
                {/* Image Frame */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden flex items-center justify-center">
                  <img
                    src={asset.url}
                    alt={asset.altText || asset.fileName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[9px] font-bold uppercase tracking-wider text-amber-400 border border-slate-800">
                    {asset.category}
                  </div>
                </div>

                {/* Info & Actions */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="text-xs font-bold text-white truncate" title={asset.fileName}>
                      {asset.fileName}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
                      {asset.url}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-1.5 pt-2 border-t border-slate-850">
                    {/* Copy URL */}
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(asset.url, asset.id)}
                      className="flex-1 py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Copy URL"
                    >
                      {copiedId === asset.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    {/* Replace Image */}
                    <button
                      type="button"
                      onClick={() => {
                        setAssetToReplace(asset);
                        replaceInputRef.current?.click();
                      }}
                      className="p-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 rounded-lg transition-colors cursor-pointer"
                      title="Replace this image with a new file"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>

                    {/* View external */}
                    <a
                      href={asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                      title="View original image in tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => setAssetToDelete(asset)}
                      className="p-1.5 bg-slate-900 hover:bg-red-950/60 text-slate-400 hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                      title="Delete image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!assetToDelete}
        title="Delete Media Asset"
        message={`Are you sure you want to permanently delete "${assetToDelete?.fileName}"?`}
        confirmLabel="Delete Asset"
        onConfirm={handleDeleteConfirm}
        onClose={() => setAssetToDelete(null)}
      />
    </div>
  );
};
