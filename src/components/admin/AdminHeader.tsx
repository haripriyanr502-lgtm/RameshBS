'use client';

import React from 'react';
import { Menu, Save, CheckCircle2, Globe, Sparkles } from 'lucide-react';
import { AdminTab } from './AdminSidebar';

interface AdminHeaderProps {
  activeTab: AdminTab;
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  onSave: () => void;
  onOpenMobileMenu: () => void;
  lastPublishedAt?: string;
  version?: number;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  isSaving,
  hasUnsavedChanges,
  onSave,
  onOpenMobileMenu,
  lastPublishedAt,
  version,
}) => {
  const getTabInfo = () => {
    switch (activeTab) {
      case 'overview':
        return {
          title: 'CMS Dashboard Overview',
          subtitle: 'Welcome to your executive portfolio management and content hub.',
        };
      case 'projects':
        return {
          title: 'Projects & Field Activities',
          subtitle: 'Add, edit, or delete service missions, meetings, videos, and field initiatives.',
        };
      case 'services':
        return {
          title: 'Services Involved In',
          subtitle: 'Manage enterprise platforms, CSR water projects, and talent staffing offerings.',
        };
      case 'about':
        return {
          title: 'About Me Management',
          subtitle: 'Manage biography narrative, vision, mission, core values, and executive highlights.',
        };
      case 'career':
        return {
          title: 'Career & Experience',
          subtitle: 'Manage corporate trajectory, executive positions, and academic/service honors.',
        };
      case 'lionistic':
        return {
          title: 'Lionistic Journey & Governance',
          subtitle: 'Manage Melvin Jones Fellow (MJF) honor, district milestones, and delegation articles.',
        };
      case 'achievements':
        return {
          title: 'Achievements & Honors',
          subtitle: 'Showcase MJF honor, CSR clean water funding, and career leadership accolades.',
        };
      case 'media':
        return {
          title: 'Media Asset Manager',
          subtitle: 'Upload, replace, and organize banners, posters, profile photos, and documents.',
        };
      case 'settings':
        return {
          title: 'Website Settings & SEO',
          subtitle: 'Configure contact details, SEO meta tags, and change account passwords.',
        };
      case 'users':
        return {
          title: 'Admin User Management',
          subtitle: 'Create administrator accounts, manage access permissions, and reset credentials.',
        };
      default:
        return {
          title: 'Executive CMS Dashboard',
          subtitle: 'Manage your portfolio website content.',
        };
    }
  };

  const { title, subtitle } = getTabInfo();

  return (
    <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>{title}</span>
            {version && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                v{version}
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-400 hidden sm:block truncate max-w-lg">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Unsaved changes indicator */}
        {hasUnsavedChanges ? (
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unsaved Changes</span>
          </div>
        ) : (
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>All Published</span>
          </div>
        )}

        {/* View Public Website */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-semibold uppercase tracking-wider transition-all"
        >
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          <span>Live Site</span>
        </a>

        {/* Global Save / Publish Button */}
        <button
          onClick={onSave}
          disabled={isSaving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save & Publish</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
