import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { PageSeoModal } from './admin/PageSeoModal';
import { StyleInspectorModal } from './admin/StyleInspectorModal';
import {
  Edit3,
  Eye,
  LogOut,
  LayoutDashboard,
  Shield,
  ChevronDown,
  ChevronUp,
  Globe,
  Palette,
  Sparkles,
  Check,
  RotateCcw,
  CloudUpload,
  Loader2
} from 'lucide-react';

interface AdminToolbarProps {
  onNavigate?: (path: string) => void;
  currentPath?: string;
}

export const AdminToolbar: React.FC<AdminToolbarProps> = ({ onNavigate, currentPath = '/' }) => {
  const { isAdmin, isEditMode, setIsEditMode, logout, canUndo, undoHistory, undoLastChange, syncAllContentToServer } = useAdmin();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [pageSeoOpen, setPageSeoOpen] = useState(false);
  const [styleInspectorOpen, setStyleInspectorOpen] = useState(false);
  const [undoToast, setUndoToast] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncClick = async () => {
    setIsSyncing(true);
    try {
      const res = await syncAllContentToServer();
      if (res.success) {
        setUndoToast(`Published to Live! All changes are now live for Incognito & all devices.`);
      } else {
        setUndoToast(`Sync notice: ${res.error || 'Server cache updated'}`);
      }
    } finally {
      setIsSyncing(false);
      setTimeout(() => setUndoToast(null), 3500);
    }
  };

  // Hidden completely for normal visitors
  if (!isAdmin) {
    return null;
  }

  const handleUndoClick = async () => {
    if (!canUndo) return;
    const res = await undoLastChange();
    if (res.success) {
      setUndoToast(res.label ? `Reversed: ${res.label}` : 'Reversed last change!');
      setTimeout(() => setUndoToast(null), 2500);
    }
  };

  const handleDashboardClick = () => {
    if (onNavigate) {
      onNavigate('/admin');
    } else {
      window.location.href = '/admin';
    }
  };

  const handleLogoutClick = async () => {
    await logout();
    if (onNavigate) {
      onNavigate('/');
    } else {
      window.location.href = '/';
    }
  };

  return (
    <>
      <aside
        data-admin-ui="true"
        data-admin-toolbar="true"
        aria-label="Admin Content Management Toolbar"
        className="fixed bottom-5 right-5 z-[90] font-sans select-none flex flex-col items-end gap-2"
      >
        {/* Undo Toast Notification */}
        {undoToast && (
          <div className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs shadow-2xl border border-amber-300 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <RotateCcw className="w-3.5 h-3.5 text-stone-950 animate-spin-once" />
            <span>{undoToast}</span>
          </div>
        )}

        <div className="relative rounded-2xl bg-[#001D40]/95 text-white backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50 p-3 sm:p-3.5 flex items-center gap-3 transition-all duration-300">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FB923C]/50 to-transparent pointer-events-none" />

          {/* Collapsed Pill Button */}
          {isCollapsed ? (
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              className="flex items-center gap-2 px-2 py-1 text-xs font-bold text-white hover:text-[#FB923C] cursor-pointer"
              title="Expand Admin Toolbar"
            >
              <Shield className="w-4 h-4 text-[#EA580C]" />
              <span>Admin Active</span>
              <ChevronUp className="w-3.5 h-3.5 text-stone-300" />
            </button>
          ) : (
            <>
              {/* Status Badge */}
              <div className="flex items-center gap-2 pr-2 border-r border-white/15">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <div className="hidden sm:block leading-none">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#FB923C] block">
                    Admin Active
                  </span>
                  <span className="text-[11px] font-semibold text-white">
                    Live CMS Mode
                  </span>
                </div>
              </div>

              {/* Toggle Switch: Edit Mode ON / OFF */}
              <div className="flex items-center gap-2 px-1">
                <span className="text-xs font-medium text-stone-200">
                  Edit Mode:
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isEditMode}
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isEditMode ? 'bg-[#EA580C]' : 'bg-white/20'
                  }`}
                  title={isEditMode ? 'Disable inline text editing' : 'Enable inline text editing'}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      isEditMode ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    isEditMode ? 'text-[#FB923C]' : 'text-stone-400'
                  }`}
                >
                  {isEditMode ? 'ON' : 'OFF'}
                </span>
              </div>

              {/* Undo / Reverse Button */}
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleUndoClick}
                  disabled={!canUndo}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    canUndo
                      ? 'bg-amber-500/25 hover:bg-amber-500/40 text-amber-200 hover:text-white border border-amber-400/40 shadow-sm hover:scale-105'
                      : 'bg-white/5 text-stone-500 cursor-not-allowed opacity-40 border border-transparent'
                  }`}
                  title={canUndo ? `Reverse / Undo Last Edit (${undoHistory.length} edits recorded)` : 'No recent edits to reverse'}
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${canUndo ? 'text-amber-400 animate-spin-once' : 'text-stone-500'}`} />
                  <span>Reverse{canUndo ? ` (${undoHistory.length})` : ''}</span>
                </button>
              )}

              <div className="h-5 w-px bg-white/15" />

              {/* Publish / Sync to Live Button */}
              <button
                type="button"
                onClick={handleSyncClick}
                disabled={isSyncing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer hover:scale-105"
                title="Publish and sync all CMS edits directly to the live server for all machines and Incognito visitors"
              >
                {isSyncing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                ) : (
                  <CloudUpload className="w-3.5 h-3.5 text-white" />
                )}
                <span>{isSyncing ? 'Publishing...' : 'Publish to Live'}</span>
              </button>

              <div className="h-5 w-px bg-white/15" />
              {/* Style & Colors Inspector Button */}
              <button
                type="button"
                onClick={() => setStyleInspectorOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                title="Customize Page/Section Colors, Backgrounds, and Overlays"
              >
                <Palette className="w-3.5 h-3.5 text-[#FB923C]" />
                <span className="hidden sm:inline">Style & Colors</span>
              </button>

              {/* Page SEO Meta Tags Editor Button */}
              <button
                type="button"
                onClick={() => setPageSeoOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                title="Edit Current Page SEO Meta Tags"
              >
                <Globe className="w-3.5 h-3.5 text-[#FB923C]" />
                <span className="hidden sm:inline">Page SEO</span>
              </button>

              {/* Dashboard Link */}
              <button
                type="button"
                onClick={handleDashboardClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                title="Go to Admin Management Portal"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#FB923C]" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleLogoutClick}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                title="Logout from Admin Mode"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>

              {/* Minimize Toggle */}
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                className="p-1 rounded-lg text-stone-400 hover:text-white transition-colors cursor-pointer"
                title="Minimize Toolbar"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </aside>

      {/* Page SEO Modal */}
      <PageSeoModal
        isOpen={pageSeoOpen}
        pagePath={currentPath}
        onClose={() => setPageSeoOpen(false)}
      />

      {/* Style & Colors Inspector Modal */}
      {styleInspectorOpen && (
        <StyleInspectorModal
          isOpen={styleInspectorOpen}
          elementKey={`page_theme_${currentPath.replace(/[^a-zA-Z0-9]/g, '_') || 'home'}`}
          elementLabel={`Current Page Style (${currentPath})`}
          onClose={() => setStyleInspectorOpen(false)}
        />
      )}
    </>
  );
};

export default AdminToolbar;
