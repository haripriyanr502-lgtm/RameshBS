'use client';

import React from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  UserCheck,
  History,
  Crown,
  Award,
  Image as ImageIcon,
  Settings,
  ShieldCheck,
  ExternalLink,
  LogOut,
  X,
} from 'lucide-react';
import { FullCmsDatabase } from '../../lib/cms/types';

export type AdminTab =
  | 'overview'
  | 'projects'
  | 'services'
  | 'about'
  | 'career'
  | 'lionistic'
  | 'achievements'
  | 'media'
  | 'settings'
  | 'users';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  cmsData: FullCmsDatabase | null;
  currentUserRole?: string;
  onLogout: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onTabChange,
  cmsData,
  currentUserRole,
  onLogout,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    {
      id: 'projects',
      label: 'Projects & Activities',
      icon: FolderKanban,
      count: cmsData?.projects?.length,
    },
    {
      id: 'services',
      label: 'Services Involved',
      icon: Briefcase,
      count: cmsData?.services?.length,
    },
    { id: 'about', label: 'About Me', icon: UserCheck },
    {
      id: 'career',
      label: 'Career & Experience',
      icon: History,
      count:
        (cmsData?.career?.experiences?.length || 0) +
        (cmsData?.career?.certificatesAndAwards?.length || 0),
    },
    {
      id: 'lionistic',
      label: 'Lionistic Journey',
      icon: Crown,
      count: cmsData?.lionisticJourney?.milestones?.length,
    },
    {
      id: 'achievements',
      label: 'Achievements',
      icon: Award,
      count: cmsData?.achievements?.length,
    },
    {
      id: 'media',
      label: 'Media Manager',
      icon: ImageIcon,
      count: cmsData?.media?.length,
    },
    { id: 'settings', label: 'Website Settings', icon: Settings },
    ...(currentUserRole !== 'editor'
      ? [{ id: 'users' as AdminTab, label: 'Admin Users', icon: ShieldCheck }]
      : []),
  ];

  const handleSelectTab = (tab: AdminTab) => {
    onTabChange(tab);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 border-r border-slate-800/80">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/30">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight uppercase font-serif">
              LCB Brigade CMS
            </h2>
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
              Website Owner Portal
            </span>
          </div>
        </div>

        <button
          onClick={onCloseMobile}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 pb-2 block">
          Content Navigation
        </span>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id as AdminTab)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {typeof item.count === 'number' && (
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-slate-950/20 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer: Live Website Link & Logout */}
      <div className="p-4 border-t border-slate-800/80 space-y-2 bg-slate-950">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-slate-300 text-xs font-semibold uppercase tracking-wider transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
          <span>View Public Site</span>
        </a>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-950/30 hover:text-red-300 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
