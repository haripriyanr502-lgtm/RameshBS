'use client';

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FullCmsDatabase } from '../../../lib/cms/types';
import { ToastProvider, useToast } from '../../../components/admin/Toast';
import { AdminSidebar, AdminTab } from '../../../components/admin/AdminSidebar';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { OverviewTab } from '../../../components/admin/tabs/OverviewTab';
import { ProjectsTab } from '../../../components/admin/tabs/ProjectsTab';
import { ServicesTab } from '../../../components/admin/tabs/ServicesTab';
import { AboutTab } from '../../../components/admin/tabs/AboutTab';
import { CareerTab } from '../../../components/admin/tabs/CareerTab';
import { LionisticTab } from '../../../components/admin/tabs/LionisticTab';
import { AchievementsTab } from '../../../components/admin/tabs/AchievementsTab';
import { MediaTab } from '../../../components/admin/tabs/MediaTab';
import { SettingsTab } from '../../../components/admin/tabs/SettingsTab';
import { UsersTab } from '../../../components/admin/tabs/UsersTab';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [currentUser, setCurrentUser] = useState<{ email: string; role: string } | null>(null);
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
        const authData = await authRes.json();
        setCurrentUser(authData.user);

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

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'users') {
      setActiveTab('users');
    }
  }, [searchParams]);

  const cmsDataRef = useRef<FullCmsDatabase | null>(null);
  useEffect(() => {
    cmsDataRef.current = cmsData;
  }, [cmsData]);

  // Save & publish all changes
  const handleSaveAll = useCallback(async () => {
    const payload = cmsDataRef.current || cmsData;
    if (!payload) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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

  // Updaters for specific content domains (functional & atomic)
  const handleUpdateProjects = (projects: FullCmsDatabase['projects']) => {
    setCmsData((prev) => {
      if (!prev) return prev;
      const next = { ...prev, projects };
      cmsDataRef.current = next;
      return next;
    });
    setHasUnsavedChanges(true);
  };

  const handleUpdateAbout = (
    home: FullCmsDatabase['home'],
    aboutExtras: FullCmsDatabase['aboutExtras']
  ) => {
    setCmsData((prev) => {
      if (!prev) return prev;
      const next = { ...prev, home, aboutExtras };
      cmsDataRef.current = next;
      return next;
    });
    setHasUnsavedChanges(true);
  };

  const handleUpdateServices = (services: FullCmsDatabase['services']) => {
    setCmsData((prev) => {
      if (!prev) return prev;
      const next = { ...prev, services };
      cmsDataRef.current = next;
      return next;
    });
    setHasUnsavedChanges(true);
  };

  const handleUpdateCareer = (career: FullCmsDatabase['career']) => {
    setCmsData((prev) => {
      if (!prev) return prev;
      const next = { ...prev, career };
      cmsDataRef.current = next;
      return next;
    });
    setHasUnsavedChanges(true);
  };

  const handleUpdateLionistic = (lionisticJourney: FullCmsDatabase['lionisticJourney']) => {
    setCmsData((prev) => {
      if (!prev) return prev;
      const next = { ...prev, lionisticJourney };
      cmsDataRef.current = next;
      return next;
    });
    setHasUnsavedChanges(true);
  };

  const handleUpdateAchievements = (achievements: FullCmsDatabase['achievements']) => {
    setCmsData((prev) => {
      if (!prev) return prev;
      const next = { ...prev, achievements };
      cmsDataRef.current = next;
      return next;
    });
    setHasUnsavedChanges(true);
  };

  const handleUpdateSettings = (settings: FullCmsDatabase['settings']) => {
    setCmsData((prev) => {
      if (!prev) return prev;
      const next = {
        ...prev,
        settings,
        home: {
          ...prev.home,
          heroImage: settings.heroImage !== undefined ? settings.heroImage : prev.home.heroImage,
        },
      };
      cmsDataRef.current = next;
      return next;
    });
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
        currentUserRole={currentUser?.role}
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

          {activeTab === 'projects' && (
            <ProjectsTab
              projects={cmsData.projects || []}
              onChange={handleUpdateProjects}
              onSave={handleSaveAll}
            />
          )}

          {activeTab === 'services' && (
            <ServicesTab
              services={cmsData.services || []}
              onChange={handleUpdateServices}
              onSave={handleSaveAll}
            />
          )}

          {activeTab === 'about' && (
            <AboutTab
              cmsData={cmsData}
              onUpdateAbout={handleUpdateAbout}
              onSave={handleSaveAll}
              isSaving={isSaving}
            />
          )}

          {activeTab === 'career' && (
            <CareerTab
              careerData={cmsData.career}
              onChange={handleUpdateCareer}
              onSave={handleSaveAll}
            />
          )}

          {activeTab === 'lionistic' && (
            <LionisticTab
              lionisticData={cmsData.lionisticJourney}
              onChange={handleUpdateLionistic}
              onSave={handleSaveAll}
              isSaving={isSaving}
            />
          )}

          {activeTab === 'achievements' && (
            <AchievementsTab
              achievements={cmsData.achievements || []}
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

          {activeTab === 'users' && (
            <UsersTab
              currentUserEmail={currentUser?.email}
              currentUserRole={currentUser?.role}
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
      <Suspense
        fallback={
          <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400">
            <div className="w-12 h-12 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-xs uppercase tracking-widest font-bold text-slate-300">
              Loading Owner Dashboard...
            </p>
          </div>
        }
      >
        <DashboardContent />
      </Suspense>
    </ToastProvider>
  );
}
