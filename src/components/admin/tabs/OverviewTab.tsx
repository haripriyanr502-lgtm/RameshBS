'use client';

import React from 'react';
import {
  Calendar,
  Briefcase,
  Scroll,
  Users,
  Award,
  Image as ImageIcon,
  ExternalLink,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  FolderKanban,
  History,
  Crown,
} from 'lucide-react';
import { FullCmsDatabase } from '../../../lib/cms/types';
import { AdminTab } from '../AdminSidebar';

interface OverviewTabProps {
  cmsData: FullCmsDatabase;
  onNavigateTab: (tab: AdminTab) => void;
  onSave: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  cmsData,
  onNavigateTab,
  onSave,
}) => {
  const totalProjects = cmsData.projects?.length || 0;
  const publishedProjects = (cmsData.projects || []).filter((p) => p.status === 'published').length;
  const totalServices = cmsData.services?.length || 0;
  const publishedServices = (cmsData.services || []).filter((s) => s.status === 'published').length;
  const totalCareer =
    (cmsData.career?.experiences?.length || 0) +
    (cmsData.career?.certificatesAndAwards?.length || 0);
  const totalMilestones = cmsData.lionisticJourney?.milestones?.length || 0;
  const totalAchievements = cmsData.achievements?.length || 0;
  const totalMedia = cmsData.media?.length || 0;

  const statCards = [
    {
      title: 'Projects & Activities',
      count: totalProjects,
      published: publishedProjects,
      icon: FolderKanban,
      tab: 'projects' as AdminTab,
      color: 'from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/30',
    },
    {
      title: 'Services Involved',
      count: totalServices,
      published: publishedServices,
      icon: Briefcase,
      tab: 'services' as AdminTab,
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30',
    },
    {
      title: 'Career & Experience',
      count: totalCareer,
      published: totalCareer,
      icon: History,
      tab: 'career' as AdminTab,
      color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30',
    },
    {
      title: 'Lionistic Journey',
      count: totalMilestones,
      published: totalMilestones,
      icon: Crown,
      tab: 'lionistic' as AdminTab,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      title: 'Achievements & Honors',
      count: totalAchievements,
      published: (cmsData.achievements || []).filter((a) => a.status === 'published').length,
      icon: Award,
      tab: 'achievements' as AdminTab,
      color: 'from-orange-500/20 to-amber-500/20 text-orange-400 border-orange-500/30',
    },
    {
      title: 'Media Library Assets',
      count: totalMedia,
      published: totalMedia,
      icon: ImageIcon,
      tab: 'media' as AdminTab,
      color: 'from-cyan-500/20 to-sky-500/20 text-cyan-400 border-cyan-500/30',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LCB Brigade Website CMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Welcome back, {cmsData.settings.ownerName}
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Your website content management system is live and synchronized. Use the quick
              shortcuts below or browse the sidebar to edit text, replace photos, and add new
              activities without touching code.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-amber-400" />
              <span>View Live Website</span>
            </a>

            <button
              onClick={onSave}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish All Changes</span>
            </button>
          </div>
        </div>

        {/* Status bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" />
            <span>
              Last Published:{' '}
              <strong className="text-slate-200">
                {new Date(cmsData.lastPublishedAt).toLocaleDateString()} at{' '}
                {new Date(cmsData.lastPublishedAt).toLocaleTimeString()}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              Security:{' '}
              <strong className="text-emerald-300">
                Owner Session Authenticated (Role: Owner)
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => onNavigateTab(card.tab)}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 rounded-3xl transition-all cursor-pointer group shadow-xl hover:shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                    {card.title}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white tracking-tight">
                      {card.count}
                    </span>
                    <span className="text-xs text-slate-500">
                      ({card.published} Live)
                    </span>
                  </div>
                </div>

                <div
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center bg-gradient-to-br ${card.color} group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 group-hover:text-amber-400 transition-colors">
                <span>Manage entries</span>
                <span className="font-bold">→</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4">
          Quick Action Shortcuts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => onNavigateTab('projects')}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-400/60 hover:bg-slate-850 text-center transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <FolderKanban className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-200 block">Projects</span>
            <span className="text-[10px] text-slate-500">Activities & Missions</span>
          </button>

          <button
            onClick={() => onNavigateTab('services')}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-400/60 hover:bg-slate-850 text-center transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-200 block">Services</span>
            <span className="text-[10px] text-slate-500">CSR & IT Offerings</span>
          </button>

          <button
            onClick={() => onNavigateTab('about')}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-400/60 hover:bg-slate-850 text-center transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-200 block">About Me</span>
            <span className="text-[10px] text-slate-500">Bio & Values</span>
          </button>

          <button
            onClick={() => onNavigateTab('career')}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-400/60 hover:bg-slate-850 text-center transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <History className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-200 block">Career</span>
            <span className="text-[10px] text-slate-500">Timeline & Awards</span>
          </button>

          <button
            onClick={() => onNavigateTab('lionistic')}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-400/60 hover:bg-slate-850 text-center transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <Crown className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-200 block">Lionistic</span>
            <span className="text-[10px] text-slate-500">MJF & Milestones</span>
          </button>

          <button
            onClick={() => onNavigateTab('media')}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-400/60 hover:bg-slate-850 text-center transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-200 block">Upload Media</span>
            <span className="text-[10px] text-slate-500">Photos & Assets</span>
          </button>
        </div>
      </div>
    </div>
  );
};
