'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FullCmsDatabase } from '../../../lib/cms/types';
import { ToastProvider, useToast } from '../../../components/admin/Toast';
import { AdminSidebar, AdminTab } from '../../../components/admin/AdminSidebar';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { OverviewTab } from '../../../components/admin/tabs/OverviewTab';
import { HomeTab } from '../../../components/admin/tabs/HomeTab';
import { MeetingsTab } from '../../../components/admin/tabs/MeetingsTab';
import { ServicesTab } from '../../../components/admin/tabs/ServicesTab';
import { CharterTab } from '../../../components/admin/tabs/CharterTab';
import { TeamTab } from '../../../components/admin/tabs/TeamTab';
import { AchievementsTab } from '../../../components/admin/tabs/AchievementsTab';
import { MediaTab } from '../../../components/admin/tabs/MediaTab';
import { SettingsTab } from '../../../components/admin/tabs/SettingsTab';

function DashboardContent() {
  const router = useRouter();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [cmsData, setCmsData] = useState<FullCmsDatabase | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Verify authentication and load initial CMS data
  useEffect(() => {
    const checkAuthAndLoad = async () => {
      try {
        const authRes = await fetch('/api/auth/me');
        if (!authRes.ok) {
          router.replace('/admin/login');
          return;
        }

        const contentRes = await fetch('/api/admin/content');
        if (contentRes.ok) {
          const data = (await contentRes.json()) as FullCmsDatabase;
          setCmsData(data);
        } else {
          showToast('Failed to load website content', 'error');
        }
      } catch (err) {
        console.error('Initialization error:', err);
        router.replace('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndLoad();
  }, [router, showToast]);

  // Save & publish all changes
  const handleSaveAll = useCallback(async () => {
    if (!cmsData) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cmsData),
      });

      const result = await res.json();
      if (!res.ok) {
        showToast(result.error || 'Failed to publish changes', 'error');
        return;
      }

      showToast('Changes published to live website successfully!', 'success');
      setHasUnsavedChanges(false);
      setCmsData((prev) =>
        prev
          ? {
              ...prev,
              lastPublishedAt: result.lastPublishedAt || new Date().toISOString(),
              version: result.version || prev.version + 1,
            }
          : prev
      );
    } catch {
      showToast('Network error while saving changes', 'error');
    } finally {
      setIsSaving(false);
    }
  }, [cmsData, showToast]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch {
      router.push('/admin/login');
    }
  };

  // Updaters for specific content domains
  const handleUpdateHome = (home: FullCmsDatabase['home']) => {
    if (!cmsData) return;
    setCmsData({ ...cmsData, home });
    setHasUnsavedChanges(true);
  };

  const handleUpdateMeetings = (meetings: FullCmsDatabase['meetings']) => {
    if (!cmsData) return;
    setCmsData({ ...cmsData, meetings });
    setHasUnsavedChanges(true);
  };

  const handleUpdateServices = (services: FullCmsDatabase['services']) => {
    if (!cmsData) return;
    setCmsData({ ...cmsData, services });
    setHasUnsavedChanges(true);
  };

  const handleUpdateCharter = (charter: FullCmsDatabase['charter']) => {
    if (!cmsData) return;
    setCmsData({ ...cmsData, charter });
    setHasUnsavedChanges(true);
  };

  const handleUpdateTeam = (team: FullCmsDatabase['team']) => {
    if (!cmsData) return;
    setCmsData({ ...cmsData, team });
    setHasUnsavedChanges(true);
  };

  const handleUpdateAchievements = (achievements: FullCmsDatabase['achievements']) => {
    if (!cmsData) return;
    setCmsData({ ...cmsData, achievements });
    setHasUnsavedChanges(true);
  };

  const handleUpdateSettings = (settings: FullCmsDatabase['settings']) => {
    if (!cmsData) return;
    setCmsData({ ...cmsData, settings });
    setHasUnsavedChanges(true);
  };

  const refreshCmsData = async () => {
    try {
      const res = await fetch('/api/admin/content');
      if (res.ok) {
        const data = await res.json();
        setCmsData(data);
      }
    } catch {}
  };

  if (isLoading || !cmsData) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <div className="w-12 h-12 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest font-bold text-slate-300">
          Loading Owner Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row selection:bg-amber-400 selection:text-slate-950">
      {/* Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        cmsData={cmsData}
        onLogout={handleLogout}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950 min-h-screen">
        <AdminHeader
          activeTab={activeTab}
          isSaving={isSaving}
          hasUnsavedChanges={hasUnsavedChanges}
          onSave={handleSaveAll}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          lastPublishedAt={cmsData.lastPublishedAt}
          version={cmsData.version}
        />

        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
          {activeTab === 'overview' && (
            <OverviewTab
              cmsData={cmsData}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSave={handleSaveAll}
            />
          )}

          {activeTab === 'home' && (
            <HomeTab
              homeData={cmsData.home}
              onChange={handleUpdateHome}
              onSave={handleSaveAll}
              isSaving={isSaving}
            />
          )}

          {activeTab === 'meetings' && (
            <MeetingsTab
              meetings={cmsData.meetings}
              onChange={handleUpdateMeetings}
              onSave={handleSaveAll}
            />
          )}

          {activeTab === 'services' && (
            <ServicesTab
              services={cmsData.services}
              onChange={handleUpdateServices}
              onSave={handleSaveAll}
            />
          )}

          {activeTab === 'charter' && (
            <CharterTab
              charterSections={cmsData.charter}
              onChange={handleUpdateCharter}
              onSave={handleSaveAll}
            />
          )}

          {activeTab === 'team' && (
            <TeamTab
              team={cmsData.team}
              onChange={handleUpdateTeam}
              onSave={handleSaveAll}
            />
          )}

          {activeTab === 'achievements' && (
            <AchievementsTab
              achievements={cmsData.achievements}
              onChange={handleUpdateAchievements}
              onSave={handleSaveAll}
            />
          )}

          {activeTab === 'media' && <MediaTab onRefreshCmsData={refreshCmsData} />}

          {activeTab === 'settings' && (
            <SettingsTab
              settings={cmsData.settings}
              onChange={handleUpdateSettings}
              onSave={handleSaveAll}
              isSaving={isSaving}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ToastProvider>
      <DashboardContent />
    </ToastProvider>
  );
}
