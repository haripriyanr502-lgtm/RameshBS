'use client';

import React, { useState } from 'react';
import { Image as ImageIcon, Camera, Trash2, ExternalLink } from 'lucide-react';
import { MediaPickerModal } from './MediaPickerModal';
import { MediaAsset } from '../../lib/cms/types';

interface ImageUploaderProps {
  label: string;
  imageUrl?: string;
  defaultCategory?: MediaAsset['category'];
  helperText?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
  onChange: (url: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  imageUrl,
  defaultCategory = 'General',
  helperText,
  aspectRatio = 'video',
  onChange,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square max-w-[160px]';
      case 'portrait':
        return 'aspect-[3/4] max-w-[180px]';
      case 'video':
      default:
        return 'aspect-video max-w-sm';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Thumbnail Preview Frame */}
        <div
          onClick={() => setIsPickerOpen(true)}
          className={`relative w-full ${getAspectClass()} rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 group cursor-pointer hover:border-amber-400 transition-all flex items-center justify-center`}
        >
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-white p-2">
                <Camera className="w-5 h-5 text-amber-400" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Change Image</span>
              </div>
            </>
          ) : (
            <div className="p-4 flex flex-col items-center justify-center text-slate-500 group-hover:text-amber-400 transition-colors">
              <ImageIcon className="w-8 h-8 mb-1" />
              <span className="text-[11px] font-semibold text-center">No image selected</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setIsPickerOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>{imageUrl ? 'Change Image' : 'Select / Upload Image'}</span>
            </button>

            {imageUrl && (
              <>
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="View full image in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="p-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-800/40 transition-colors cursor-pointer"
                  title="Remove Image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {helperText && <p className="text-xs text-slate-500">{helperText}</p>}
        </div>
      </div>

      <MediaPickerModal
        isOpen={isPickerOpen}
        currentImageUrl={imageUrl}
        defaultCategory={defaultCategory}
        onSelectImage={(url) => onChange(url)}
        onClose={() => setIsPickerOpen(false)}
      />
    </div>
  );
};
