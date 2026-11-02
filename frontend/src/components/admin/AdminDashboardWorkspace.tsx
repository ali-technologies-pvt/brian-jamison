import React, { useState, useEffect } from 'react';
import {
  Inbox,
  FileText,
  Users as UsersIcon,
  Globe,
  Settings,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Eye,
  Search,
  Filter,
  ArrowUpDown,
  ExternalLink,
  ChevronRight,
  Shield,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Tag,
  Clock,
  Check,
  AlertCircle,
  Video,
  Layers
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export interface FormSubmissionItem {
  _id?: string;
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  formType: 'valuation' | 'consultation' | 'contact' | 'inquiry';
  service?: string;
  serviceArea?: string;
  details?: Record<string, any>;
  notes?: string;
  isRead: boolean;
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}

export interface BlogPostItem {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  createdAt: string;
}

export interface UserItem {
  _id?: string;
  id?: string;
  username: string;
  email: string;
  name: string;
  role: 'Administrator' | 'Editor' | 'Author' | 'Contributor';
  isActive: boolean;
  createdAt: string;
}

interface AdminDashboardWorkspaceProps {
  onNavigate: (path: string) => void;
  onSignOut: () => void;
}

const SERVICE_AREAS_FILTER = [
  'All Areas',
  'Nichols Hills',
  'Gaillardia',
  'Edmond',
  'Oak Tree',
  'Crown Heights',
  'Heritage Hills',
  'Oklahoma City Metro',
  'Norman',
];

const SERVICES_FILTER = [
  'All Services',
  'Home Selling / 6-Phase Blueprint',
  'Home Buying Advisory',
  'Private Gated Estate Advisory',
  'Out-of-State Relocation Concierge',
  'Custom Build & Spec Project Advisory',
  'Valuation / CMA Dossier',
];

export const AdminDashboardWorkspace: React.FC<AdminDashboardWorkspaceProps> = ({
  onNavigate,
  onSignOut,
}) => {
  const { isEditMode, setIsEditMode, contentMap, updateContent } = useAdmin();
  const [activeTab, setActiveTab] = useState<'submissions' | 'blogs' | 'users' | 'settings' | 'visibility'>('submissions');

  // Feature Visibility State & Handlers
  const isIdxHidden = contentMap['setting_hide_idx_listings'] === 'true';
  const isVideoSlidersHidden = contentMap['setting_hide_video_sliders'] === 'true';
  const isVideosPageHidden = contentMap['setting_hide_videos_page'] === 'true';

  const [isUpdatingSetting, setIsUpdatingSetting] = useState<string | null>(null);
  const [settingNotification, setSettingNotification] = useState<string | null>(null);

  const handleToggleFeature = async (key: string, currentHidden: boolean, featureTitle: string) => {
    setIsUpdatingSetting(key);
    const nextVal = currentHidden ? 'false' : 'true';
    try {
      await updateContent(key, nextVal, `Toggle ${featureTitle}`);
      setSettingNotification(
        `${featureTitle} is now ${currentHidden ? 'LIVE & VISIBLE' : 'HIDDEN'} across the entire website.`
      );
      setTimeout(() => setSettingNotification(null), 4000);
    } catch (err) {
      console.error('Failed to update setting:', err);
    } finally {
      setIsUpdatingSetting(null);
    }
  };

  // Form submissions state
  const [submissions, setSubmissions] = useState<FormSubmissionItem[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmissionItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [selectedService, setSelectedService] = useState('All Services');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false);

  // Blog posts state
  const [blogs, setBlogs] = useState<BlogPostItem[]>([]);
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [blogFormData, setBlogFormData] = useState<Partial<BlogPostItem>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '/media/gallery/modern-estate-pool-lawn.jpeg',
    category: 'Market Intelligence',
    author: 'Brian Jamison',
    tags: ['Nichols Hills', 'Market Report'],
    status: 'published',
    metaTitle: '',
    metaDescription: '',
    canonicalUrl: '',
  });

  // Users management state with offline & reload persistence
  const [users, setUsers] = useState<UserItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('jamison_admin_users_cache');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {}
    }
    return [];
  });
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [newUserData, setNewUserData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    role: 'Editor' as const,
  });
  const [userSuccessMessage, setUserSuccessMessage] = useState<string | null>(null);
  const [userErrorMessage, setUserErrorMessage] = useState<string | null>(null);

  // Fetch Form Submissions with Dual Sync (Server + localStorage)
  const fetchSubmissions = async () => {
    setIsLoadingSubmissions(true);
    try {
      let remoteSubs: FormSubmissionItem[] = [];
      try {
        const res = await fetch('/api/forms');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.submissions)) {
            remoteSubs = data.submissions;
          }
        }
      } catch (networkErr) {
        console.warn('Network issue fetching forms, using local storage cache:', networkErr);
      }

      // Read local storage cache for instant offline & cross-tab sync
      let localSubs: FormSubmissionItem[] = [];
      try {
        const raw = localStorage.getItem('jamison_form_submissions');
        if (raw) {
          localSubs = JSON.parse(raw);
        }
      } catch {}

      // Deduplicate merging by id or _id
      const map = new Map<string, FormSubmissionItem>();
      for (const item of remoteSubs) {
        const id = item.id || item._id;
        if (id) map.set(id, item);
      }
      for (const item of localSubs) {
        const id = item.id || item._id;
        if (id && !map.has(id)) {
          map.set(id, item);
        }
      }

      const combined = Array.from(map.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setSubmissions(combined);
    } catch (e) {
      console.error('Error in fetchSubmissions:', e);
    } finally {
      setIsLoadingSubmissions(false);
    }
  };

  // Fetch Blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.posts) {
          setBlogs(data.posts);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const token = typeof window !== 'undefined'
        ? (localStorage.getItem('admin_token_jwt') || sessionStorage.getItem('admin_token_jwt'))
        : null;
      const headers: Record<string, string> = {};
      if (token && token !== 'client_verified_token') {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch('/api/users', { headers, credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.users)) {
          let delSet = new Set<string>();
          if (typeof window !== 'undefined') {
            try {
              const delList = JSON.parse(localStorage.getItem('jamison_deleted_users_cache') || '[]');
              delSet = new Set(delList.map((x: string) => x.toLowerCase()));
            } catch {}
          }

          const activeUsers = data.users.filter(
            (u: any) =>
              !delSet.has(u.username?.toLowerCase()) &&
              !delSet.has(String(u.id || '').toLowerCase()) &&
              !delSet.has(String(u._id || '').toLowerCase())
          );

          setUsers(activeUsers);
          if (typeof window !== 'undefined') {
            localStorage.setItem('jamison_admin_users_cache', JSON.stringify(activeUsers));
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchSubmissions();
    fetchBlogs();
    fetchUsers();

    // Auto-poll for new submissions every 5 seconds
    const interval = setInterval(() => {
      fetchSubmissions();
    }, 5000);

    // Instant update on custom submission event, storage change, or window focus
    const handleSync = () => {
      fetchSubmissions();
    };

    window.addEventListener('jamison_form_submitted', handleSync);
    window.addEventListener('storage', handleSync);
    window.addEventListener('focus', handleSync);

    return () => {
      clearInterval(interval);
      window.removeEventListener('jamison_form_submitted', handleSync);
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('focus', handleSync);
    };
  }, []);

  // Filter and sort submissions
  const filteredSubmissions = submissions
    .filter((item) => {
      // Search by name, email, phone, or address
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = (item.name || '').toLowerCase().includes(q);
        const matchesEmail = (item.email || '').toLowerCase().includes(q);
        const matchesPhone = (item.phone || '').toLowerCase().includes(q);
        const matchesAddress = (item.details?.address || '').toLowerCase().includes(q);
        const matchesNotes = (item.notes || '').toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesPhone && !matchesAddress && !matchesNotes) return false;
      }
      // Service filter
      if (selectedService !== 'All Services') {
        const itemService = (item.service || '').toLowerCase();
        const selService = selectedService.toLowerCase();
        if (!itemService.includes(selService) && !selService.includes(itemService)) {
          return false;
        }
      }
      // Service Area filter
      if (selectedArea !== 'All Areas') {
        const itemArea = (item.serviceArea || '').toLowerCase();
        const selArea = selectedArea.toLowerCase();
        if (!itemArea.includes(selArea) && !selArea.includes(itemArea)) {
          return false;
        }
      }
      // Unread only toggle
      if (unreadOnly && item.isRead) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const unreadCount = submissions.filter((s) => !s.isRead).length;

  const availableAreas = Array.from(
    new Set([
      'All Areas',
      ...SERVICE_AREAS_FILTER.filter((a) => a !== 'All Areas'),
      ...submissions.map((s) => s.serviceArea).filter(Boolean),
    ])
  );

  const availableServices = Array.from(
    new Set([
      'All Services',
      ...SERVICES_FILTER.filter((s) => s !== 'All Services'),
      ...submissions.map((s) => s.service).filter(Boolean),
    ])
  );

  // Mark submission as read/unread
  const handleToggleRead = async (submission: FormSubmissionItem) => {
    const nextRead = !submission.isRead;
    const id = submission.id || submission._id;
    try {
      await fetch(`/api/forms/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: nextRead }),
      });
    } catch (e) {
      console.error(e);
    }
    setSubmissions((prev) => {
      const updated = prev.map((s) => (s.id === id || s._id === id ? { ...s, isRead: nextRead } : s));
      try {
        localStorage.setItem('jamison_form_submissions', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    if (selectedSubmission && (selectedSubmission.id === id || selectedSubmission._id === id)) {
      setSelectedSubmission({ ...selectedSubmission, isRead: nextRead });
    }
  };

  // Delete submission
  const handleDeleteSubmission = async (id?: string) => {
    if (!id || !confirm('Are you sure you want to delete this submission entry?')) return;
    try {
      await fetch(`/api/forms/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error(e);
    }
    setSubmissions((prev) => {
      const updated = prev.filter((s) => s.id !== id && s._id !== id);
      try {
        localStorage.setItem('jamison_form_submissions', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    if (selectedSubmission && (selectedSubmission.id === id || selectedSubmission._id === id)) {
      setSelectedSubmission(null);
    }
  };

  // Save Blog Post
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/blogs/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogFormData),
      });
      const data = await res.json();
      if (data.success && data.post) {
        await fetchBlogs();
        setIsEditingBlog(false);
      }
    } catch (e) {
      console.error('Failed saving blog post', e);
    }
  };

  // Delete Blog Post
  const handleDeleteBlog = async (id?: string) => {
    if (!id || !confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      await fetchBlogs();
    } catch (e) {
      console.error(e);
    }
  };

  // Create User
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserSuccessMessage(null);
    setUserErrorMessage(null);

    const trimmedUsername = (newUserData.username || '').trim();
    const trimmedEmail = (newUserData.email || '').trim().toLowerCase();
    const rawPassword = newUserData.password || '';

    if (!trimmedUsername || !trimmedEmail || !rawPassword) {
      setUserErrorMessage('Username, email, and password are required');
      return;
    }

    try {
      const token = typeof window !== 'undefined'
        ? (localStorage.getItem('admin_token_jwt') || sessionStorage.getItem('admin_token_jwt'))
        : null;

      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token && token !== 'client_verified_token') {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch('/api/users/create', {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          ...newUserData,
          username: trimmedUsername,
          email: trimmedEmail,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.user) {
        // Un-tombstone newly created user from local cache
        if (typeof window !== 'undefined') {
          try {
            const delList: string[] = JSON.parse(localStorage.getItem('jamison_deleted_users_cache') || '[]');
            const cleanList = delList.filter(
              (x) =>
                x.toLowerCase() !== trimmedUsername.toLowerCase() &&
                x.toLowerCase() !== trimmedEmail.toLowerCase()
            );
            localStorage.setItem('jamison_deleted_users_cache', JSON.stringify(cleanList));
          } catch {}
        }

        // Immediately add to local state and localStorage so the count updates instantly!
        setUsers((prev) => {
          const updated = [
            data.user,
            ...prev.filter(
              (u) =>
                (u.id || u._id || u.username)?.toLowerCase() !==
                (data.user.id || data.user._id || data.user.username)?.toLowerCase()
            ),
          ];
          if (typeof window !== 'undefined') {
            localStorage.setItem('jamison_admin_users_cache', JSON.stringify(updated));
          }
          return updated;
        });

        setUserSuccessMessage(`User "${data.user.username}" created successfully with role ${data.user.role}! Total users: ${users.length + 1}`);
        setNewUserData({ username: '', email: '', password: '', name: '', role: 'Editor' });
        setIsCreatingUser(false);
        await fetchUsers();
      } else {
        setUserErrorMessage(data.error || 'Failed to create user');
      }
    } catch (e: any) {
      setUserErrorMessage(e.message || 'Error communicating with server');
    }
  };

  // Delete User
  const handleDeleteUser = async (u: UserItem) => {
    const identifier = u._id || u.id || u.username;
    if (!identifier || !confirm(`Are you sure you want to remove user "${u.name || u.username}"?`)) return;

    try {
      const res = await fetch(`/api/users/${encodeURIComponent(identifier)}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        // Record deleted username locally so it never resurrects
        if (typeof window !== 'undefined') {
          try {
            const delList: string[] = JSON.parse(localStorage.getItem('jamison_deleted_users_cache') || '[]');
            delList.push(u.username.toLowerCase());
            localStorage.setItem('jamison_deleted_users_cache', JSON.stringify(Array.from(new Set(delList))));
          } catch {}
        }

        setUsers((prev) => {
          const updated = prev.filter(
            (item) =>
              item._id !== u._id &&
              item.id !== u.id &&
              item.username.toLowerCase() !== u.username.toLowerCase()
          );
          if (typeof window !== 'undefined') {
            localStorage.setItem('jamison_admin_users_cache', JSON.stringify(updated));
          }
          return updated;
        });

        setUserSuccessMessage(`User "${u.name || u.username}" was removed successfully.`);
        setTimeout(() => setUserSuccessMessage(null), 3500);
        await fetchUsers();
      } else {
        alert(data.error || 'Could not delete user');
      }
    } catch (e: any) {
      alert(e?.message || 'Error communicating with server');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0A2540] font-sans flex flex-col">
      {/* Top Super Admin Navigation Header */}
      <header className="bg-white border-b border-[#E5E0D8] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#002D61] text-white flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-[#EA580C]" />
            </div>
            <div>
              <div className="font-serif text-base sm:text-lg font-bold text-[#002D61] leading-none">
                JAMISON REAL ESTATE
              </div>
              <span className="text-[10px] text-stone-500 font-sans tracking-wide">
                Custom WordPress-Style Enterprise CMS & Lead Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Inline Edit Mode Toggle Button */}
            <button
              type="button"
              onClick={() => setIsEditMode(!isEditMode)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                isEditMode
                  ? 'bg-[#EA580C] text-white border-[#EA580C] shadow-md shadow-orange-600/30'
                  : 'bg-white border-[#E5E0D8] text-stone-700 hover:border-[#EA580C]'
              }`}
              title="Toggle Live Visual In-Line Editor Mode"
            >
              <span className={`w-2 h-2 rounded-full ${isEditMode ? 'bg-white animate-pulse' : 'bg-stone-300'}`} />
              <span>In-Line Edit Mode: <strong>{isEditMode ? 'ON' : 'OFF'}</strong></span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#E5E0D8]/50 border border-[#E5E0D8] text-xs font-semibold text-[#002D61] transition-colors cursor-pointer"
              title="Open Live Public Website in a new tab"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#EA580C]" />
            </a>

            <button
              type="button"
              onClick={onSignOut}
              className="px-3.5 py-1.5 rounded-full bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-semibold text-red-700 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Workspace Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto border-t border-[#E5E0D8]/60">
          <button
            type="button"
            onClick={() => setActiveTab('submissions')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'submissions'
                ? 'border-[#EA580C] text-[#EA580C] bg-orange-500/5'
                : 'border-transparent text-stone-600 hover:text-[#002D61]'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Form Submissions</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#EA580C] text-white text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('blogs')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'blogs'
                ? 'border-[#EA580C] text-[#EA580C] bg-orange-500/5'
                : 'border-transparent text-stone-600 hover:text-[#002D61]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>WordPress Blog Posts ({blogs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'users'
                ? 'border-[#EA580C] text-[#EA580C] bg-orange-500/5'
                : 'border-transparent text-stone-600 hover:text-[#002D61]'
            }`}
          >
            <UsersIcon className="w-4 h-4" />
            <span>User Management ({users.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('visibility')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'visibility'
                ? 'border-[#EA580C] text-[#EA580C] bg-orange-500/5'
                : 'border-transparent text-stone-600 hover:text-[#002D61]'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Feature Visibility ({[
              isIdxHidden ? 'IDX: Hidden' : null,
              isVideoSlidersHidden ? 'Marquee: Hidden' : null,
              isVideosPageHidden ? 'Videos Page: Hidden' : null,
            ].filter(Boolean).length > 0 ? `${[
              isIdxHidden ? 'IDX' : null,
              isVideoSlidersHidden ? 'Marquee' : null,
              isVideosPageHidden ? 'Videos' : null,
            ].filter(Boolean).length} Hidden` : 'All Visible'})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-[#EA580C] text-[#EA580C] bg-orange-500/5'
                : 'border-transparent text-stone-600 hover:text-[#002D61]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>CMS Overview & SEO</span>
          </button>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1">
        {/* Executive Overview KPI Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {/* Card 1: Users & Accounts */}
          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === 'users'
                ? 'bg-orange-500/10 border-[#EA580C] shadow-xs'
                : 'bg-white border-[#E5E0D8] hover:border-[#EA580C]/40 hover:shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                Team & Users
              </span>
              <div className="w-7 h-7 rounded-lg bg-orange-100 text-[#EA580C] flex items-center justify-center">
                <UsersIcon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-[#002D61]">
                {users.length}
              </span>
              <span className="text-[11px] font-semibold text-emerald-600">Active Accounts</span>
            </div>
            <span className="text-[10px] text-stone-500 mt-1 block truncate">
              {users.filter(u => u.role === 'Administrator').length} Admin · {users.filter(u => u.role === 'Editor').length} Editors · {users.filter(u => u.role === 'Author').length} Authors
            </span>
          </button>

          {/* Card 2: Form Submissions */}
          <button
            type="button"
            onClick={() => setActiveTab('submissions')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === 'submissions'
                ? 'bg-orange-500/10 border-[#EA580C] shadow-xs'
                : 'bg-white border-[#E5E0D8] hover:border-[#EA580C]/40 hover:shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                Client Inquiries
              </span>
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#002D61] flex items-center justify-center">
                <Inbox className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-[#002D61]">
                {submissions.length}
              </span>
              {unreadCount > 0 ? (
                <span className="text-[11px] font-semibold text-[#EA580C]">
                  {unreadCount} Unread
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-stone-400">All Read</span>
              )}
            </div>
            <span className="text-[10px] text-stone-500 mt-1 block truncate">
              Valuations & Private Briefings
            </span>
          </button>

          {/* Card 3: Blog Posts */}
          <button
            type="button"
            onClick={() => setActiveTab('blogs')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === 'blogs'
                ? 'bg-orange-500/10 border-[#EA580C] shadow-xs'
                : 'bg-white border-[#E5E0D8] hover:border-[#EA580C]/40 hover:shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                WordPress Posts
              </span>
              <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-[#002D61]">
                {blogs.length}
              </span>
              <span className="text-[11px] font-semibold text-stone-500">Articles</span>
            </div>
            <span className="text-[10px] text-stone-500 mt-1 block truncate">
              Market Intelligence & Guides
            </span>
          </button>

          {/* Card 4: Site Feature Modules */}
          <button
            type="button"
            onClick={() => setActiveTab('visibility')}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === 'visibility'
                ? 'bg-orange-500/10 border-[#EA580C] shadow-xs'
                : 'bg-white border-[#E5E0D8] hover:border-[#EA580C]/40 hover:shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                Feature Visibility
              </span>
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Eye className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-[#002D61]">
                {3 - [isIdxHidden, isVideoSlidersHidden, isVideosPageHidden].filter(Boolean).length} / 3
              </span>
              <span className="text-[11px] font-semibold text-emerald-600">Active</span>
            </div>
            <span className="text-[10px] text-stone-500 mt-1 block truncate">
              IDX · Marquee · Videos Page
            </span>
          </button>
        </div>
        {/* =========================================================================
            TAB 1: FORM SUBMISSIONS (Inbox with filters, search, unread badge)
        ========================================================================= */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-white border border-[#E5E0D8] rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search by client name, email, phone, or property address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-xs text-[#002D61] placeholder-stone-400 focus:outline-none focus:border-[#EA580C] focus:bg-white"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                {/* Service Area Filter */}
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-[#002D61] focus:outline-none focus:border-[#EA580C]"
                >
                  {availableAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>

                {/* Service Filter */}
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-[#002D61] focus:outline-none focus:border-[#EA580C]"
                >
                  {availableServices.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>

                {/* Sort Order */}
                <button
                  type="button"
                  onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                  className="px-3 py-2 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-[#002D61] hover:bg-stone-100 flex items-center gap-1.5 font-semibold cursor-pointer"
                  title="Toggle Chronological Sorting"
                >
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>{sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}</span>
                </button>

                {/* Unread Only Toggle */}
                <button
                  type="button"
                  onClick={() => setUnreadOnly(!unreadOnly)}
                  className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    unreadOnly
                      ? 'bg-[#EA580C] text-white border-[#EA580C]'
                      : 'bg-[#FAF9F6] text-[#002D61] border-[#E5E0D8] hover:bg-stone-100'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${unreadOnly ? 'bg-white' : 'bg-[#EA580C]'}`} />
                  <span>Unread Only</span>
                </button>
              </div>
            </div>

            {/* Submissions Split Layout: List + Detail Drawer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className={selectedSubmission ? 'lg:col-span-6' : 'lg:col-span-12'}>
                <div className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-xs">
                  <div className="px-5 py-4 border-b border-[#E5E0D8] flex items-center justify-between bg-stone-50/50">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#002D61]">
                      Client Inquiries ({filteredSubmissions.length})
                    </span>
                    <button
                      type="button"
                      onClick={fetchSubmissions}
                      className="text-xs text-[#EA580C] hover:underline font-semibold cursor-pointer"
                    >
                      Refresh
                    </button>
                  </div>

                  {filteredSubmissions.length === 0 ? (
                    <div className="p-12 text-center text-stone-500">
                      <Inbox className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                      <p className="text-sm font-semibold">No submissions found matching criteria</p>
                      <p className="text-xs text-stone-400 mt-1">Try clearing your search query or area filters</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-[#E5E0D8]">
                      {filteredSubmissions.map((sub) => {
                        const id = sub.id || sub._id;
                        const isSelected = selectedSubmission && (selectedSubmission.id === id || selectedSubmission._id === id);

                        return (
                          <div
                            key={id}
                            onClick={() => setSelectedSubmission(sub)}
                            className={`p-4 sm:p-5 transition-colors cursor-pointer flex items-start justify-between gap-4 ${
                              isSelected
                                ? 'bg-orange-50/60 border-l-4 border-l-[#EA580C]'
                                : sub.isRead
                                ? 'hover:bg-stone-50 bg-white'
                                : 'bg-[#FAF8F5] hover:bg-orange-50/30 font-semibold'
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                {!sub.isRead ? (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#EA580C] text-white text-[9px] font-bold uppercase tracking-wider">
                                    NEW UNREAD
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[9px] font-bold uppercase tracking-wider">
                                    READ
                                  </span>
                                )}
                                <span className="text-xs uppercase tracking-wider font-bold text-[#EA580C]">
                                  {sub.formType}
                                </span>
                                <span className="text-stone-300">·</span>
                                <span className="text-[11px] text-stone-400">
                                  {new Date(sub.createdAt).toLocaleDateString()} at{' '}
                                  {new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>

                              <h4 className="font-serif text-base text-[#002D61] truncate font-bold">
                                {sub.name}
                              </h4>

                              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 mt-1.5 font-sans">
                                {sub.phone && (
                                  <span className="flex items-center gap-1">
                                    <Phone className="w-3 h-3 text-[#EA580C]" />
                                    <span>{sub.phone}</span>
                                  </span>
                                )}
                                {sub.email && (
                                  <span className="flex items-center gap-1">
                                    <Mail className="w-3 h-3 text-[#EA580C]" />
                                    <span>{sub.email}</span>
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-[#002D61]" />
                                  <span>{sub.serviceArea}</span>
                                </span>
                              </div>

                              {sub.details?.address && (
                                <p className="text-xs text-stone-500 font-mono mt-1.5 truncate">
                                  📍 {sub.details.address}
                                </p>
                              )}
                            </div>

                            <ChevronRight className="w-4 h-4 text-stone-400 shrink-0 mt-2" />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Detail Inspection Drawer */}
              {selectedSubmission && (
                <div className="lg:col-span-6">
                  <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-md sticky top-24">
                    <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8] mb-5">
                      <div>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-[#EA580C] block">
                          Form Lead Dossier
                        </span>
                        <h3 className="font-serif text-xl font-bold text-[#002D61]">
                          {selectedSubmission.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleRead(selectedSubmission)}
                          className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
                        >
                          Mark as {selectedSubmission.isRead ? 'Unread' : 'Read'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSubmission(selectedSubmission.id || selectedSubmission._id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer"
                          title="Delete submission"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4 text-xs font-sans">
                      <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8]">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-stone-400 block mb-0.5">Phone Number</span>
                          <span className="text-[#002D61] font-semibold">{selectedSubmission.phone || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-stone-400 block mb-0.5">Email Address</span>
                          <span className="text-[#002D61] font-semibold">{selectedSubmission.email || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-stone-400 block mb-0.5">Service Requested</span>
                          <span className="text-[#002D61] font-semibold">{selectedSubmission.service}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-stone-400 block mb-0.5">Target Micro-Market</span>
                          <span className="text-[#002D61] font-semibold">{selectedSubmission.serviceArea}</span>
                        </div>
                      </div>

                      {/* Custom Detailed Fields (CMA / Consultation) */}
                      {selectedSubmission.details && Object.keys(selectedSubmission.details).length > 0 && (
                        <div>
                          <span className="text-[10px] uppercase font-bold text-stone-400 block mb-2">
                            Submitted Property Profile & Metrics
                          </span>
                          <div className="p-4 rounded-xl bg-white border border-[#E5E0D8] space-y-2">
                            {Object.entries(selectedSubmission.details).map(([key, val]) => (
                              <div key={key} className="flex items-center justify-between py-1 border-b border-stone-100 last:border-none">
                                <span className="capitalize text-stone-500">{key.replace(/([A-Z])/g, ' $1')}</span>
                                <span className="font-semibold text-[#002D61]">
                                  {typeof val === 'number' && key.toLowerCase().includes('estimated')
                                    ? `$${val.toLocaleString()}`
                                    : String(val)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Client Notes */}
                      {selectedSubmission.notes && (
                        <div>
                          <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Client Special Instructions</span>
                          <p className="p-3 bg-stone-50 rounded-xl text-stone-700 italic border border-[#E5E0D8]">
                            &quot;{selectedSubmission.notes}&quot;
                          </p>
                        </div>
                      )}

                      {/* Quick Action Contact Button */}
                      <div className="pt-2 flex items-center gap-3">
                        {selectedSubmission.phone && (
                          <a
                            href={`tel:${selectedSubmission.phone}`}
                            className="flex-1 py-2.5 px-4 rounded-xl bg-[#002D61] hover:bg-[#001D40] text-white font-bold text-center transition-colors"
                          >
                            Call Client Now
                          </a>
                        )}
                        {selectedSubmission.email && (
                          <a
                            href={`mailto:${selectedSubmission.email}?subject=Brian Jamison Real Estate Advisory`}
                            className="flex-1 py-2.5 px-4 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-center transition-colors"
                          >
                            Send Email
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: WORDPRESS BLOGS (Create, Edit, Publish, Categories, SEO Meta)
        ========================================================================= */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-xs">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#002D61]">WordPress Blog Manager</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Publish luxury real estate market reports, seller blueprint articles, and SEO content
                </p>
              </div>

              {!isEditingBlog && (
                <button
                  type="button"
                  onClick={() => {
                    setBlogFormData({
                      title: '',
                      slug: '',
                      excerpt: '',
                      content: '',
                      featuredImage: '/media/gallery/modern-estate-pool-lawn.jpeg',
                      category: 'Market Intelligence',
                      author: 'Brian Jamison',
                      tags: ['Nichols Hills', 'Market Report'],
                      status: 'published',
                      metaTitle: '',
                      metaDescription: '',
                      canonicalUrl: '',
                    });
                    setIsEditingBlog(true);
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wide flex items-center gap-2 shadow-md shadow-orange-600/25 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Post (WordPress Style)</span>
                </button>
              )}
            </div>

            {/* WordPress Blog Editor Form */}
            {isEditingBlog ? (
              <form onSubmit={handleSaveBlog} className="bg-white border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D8]">
                  <h4 className="font-serif text-lg font-bold text-[#002D61]">
                    {blogFormData.id ? 'Edit WordPress Post' : 'Create New WordPress Post'}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsEditingBlog(false)}
                    className="text-xs text-stone-500 hover:text-stone-800 font-semibold"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column: Post Title & Content */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                        Post Title
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Nichols Hills Luxury Market Surge Q4"
                        value={blogFormData.title}
                        onChange={(e) => setBlogFormData({ ...blogFormData, title: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-sm text-[#002D61] font-serif font-bold focus:outline-none focus:border-[#EA580C] focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. nichols-hills-luxury-market-surge-q4"
                        value={blogFormData.slug}
                        onChange={(e) => setBlogFormData({ ...blogFormData, slug: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-xs font-mono text-stone-700 focus:outline-none focus:border-[#EA580C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                        Post Excerpt
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Brief summary appearing on blog archives and search snippets..."
                        value={blogFormData.excerpt}
                        onChange={(e) => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                        className="w-full p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-xs text-[#002D61] focus:outline-none focus:border-[#EA580C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
                        Post Body Content (HTML / Rich Text)
                      </label>
                      <textarea
                        rows={12}
                        required
                        placeholder="<h2>Headline</h2><p>Full article body with internal links and insights...</p>"
                        value={blogFormData.content}
                        onChange={(e) => setBlogFormData({ ...blogFormData, content: e.target.value })}
                        className="w-full p-4 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-xs font-mono text-[#002D61] focus:outline-none focus:border-[#EA580C] leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Right Column: WordPress Meta & SEO Box */}
                  <div className="space-y-4">
                    <div className="p-5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] space-y-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#EA580C] block">
                        Publishing Details
                      </span>

                      <div>
                        <label className="block text-xs font-semibold text-stone-600 mb-1">Status</label>
                        <select
                          value={blogFormData.status}
                          onChange={(e) => setBlogFormData({ ...blogFormData, status: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E0D8] text-xs text-[#002D61]"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-600 mb-1">Category</label>
                        <select
                          value={blogFormData.category}
                          onChange={(e) => setBlogFormData({ ...blogFormData, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E0D8] text-xs text-[#002D61]"
                        >
                          <option>Market Intelligence</option>
                          <option>Seller Blueprint</option>
                          <option>Neighborhood Spotlight</option>
                          <option>Luxury Architectural Tours</option>
                          <option>Press & Recognition</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-600 mb-1">Author</label>
                        <input
                          type="text"
                          value={blogFormData.author}
                          onChange={(e) => setBlogFormData({ ...blogFormData, author: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E0D8] text-xs text-[#002D61]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-600 mb-1">Featured Image URL</label>
                        <input
                          type="url"
                          value={blogFormData.featuredImage}
                          onChange={(e) => setBlogFormData({ ...blogFormData, featuredImage: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E0D8] text-xs font-mono text-stone-700"
                        />
                      </div>
                    </div>

                    {/* SEO Settings Panel */}
                    <div className="p-5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] space-y-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#002D61] block">
                        Search Engine Optimization (SEO)
                      </span>

                      <div>
                        <label className="block text-xs font-semibold text-stone-600 mb-1">SEO Meta Title</label>
                        <input
                          type="text"
                          value={blogFormData.metaTitle}
                          onChange={(e) => setBlogFormData({ ...blogFormData, metaTitle: e.target.value })}
                          placeholder={blogFormData.title || 'SEO Title'}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E0D8] text-xs text-[#002D61]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-600 mb-1">SEO Meta Description</label>
                        <textarea
                          rows={2}
                          value={blogFormData.metaDescription}
                          onChange={(e) => setBlogFormData({ ...blogFormData, metaDescription: e.target.value })}
                          placeholder="Search engine ranking description..."
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#E5E0D8] text-xs text-[#002D61]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wide uppercase transition-all shadow-md shadow-orange-600/30 cursor-pointer"
                    >
                      Publish Article
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* Blog Posts Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogs.map((post) => {
                  const id = post.id || post._id;
                  return (
                    <div
                      key={id}
                      className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                            {post.category}
                          </span>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center gap-2 text-xs text-stone-400 mb-2">
                            <span>By {post.author}</span>
                            <span>·</span>
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          </div>

                          <h4 className="font-serif text-lg font-bold text-[#002D61] mb-2 leading-snug">
                            {post.title}
                          </h4>

                          <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed font-sans mb-4">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 py-3 bg-[#FAF8F5] border-t border-[#E5E0D8] flex items-center justify-between text-xs font-semibold">
                        <span className="text-emerald-700 capitalize font-mono text-[11px]">
                          ✓ {post.status}
                        </span>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setBlogFormData(post);
                              setIsEditingBlog(true);
                            }}
                            className="text-[#002D61] hover:text-[#EA580C] flex items-center gap-1 cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBlog(id)}
                            className="text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 3: USER MANAGEMENT (WordPress-style Roles: Administrator, Editor, Author)
        ========================================================================= */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-xs">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#002D61]">WordPress User Roles & Accounts</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Manage administrative access, editors, authors, and contributors
                </p>
              </div>

              {!isCreatingUser && (
                <button
                  type="button"
                  onClick={() => setIsCreatingUser(true)}
                  className="px-5 py-2.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wide flex items-center gap-2 shadow-md shadow-orange-600/25 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New User</span>
                </button>
              )}
            </div>

            {/* User Statistics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#E5E0D8] shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Total CMS Accounts</span>
                <span className="font-serif text-2xl font-bold text-[#002D61] mt-0.5 block">{users.length} Users</span>
                <span className="text-[10px] text-stone-500">Active credentials</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E5E0D8] shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Administrators</span>
                <span className="font-serif text-2xl font-bold text-amber-700 mt-0.5 block">{users.filter(u => u.role === 'Administrator').length} Admin</span>
                <span className="text-[10px] text-stone-500">Full system control</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E5E0D8] shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Content Editors</span>
                <span className="font-serif text-2xl font-bold text-blue-700 mt-0.5 block">{users.filter(u => u.role === 'Editor').length} Editors</span>
                <span className="text-[10px] text-stone-500">Publish & edit access</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E5E0D8] shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Authors & Writers</span>
                <span className="font-serif text-2xl font-bold text-stone-700 mt-0.5 block">{users.filter(u => u.role === 'Author' || u.role === 'Contributor').length} Authors</span>
                <span className="text-[10px] text-stone-500">Draft & content creators</span>
              </div>
            </div>

            {userSuccessMessage && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{userSuccessMessage}</span>
              </div>
            )}

            {userErrorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>{userErrorMessage}</span>
              </div>
            )}

            {/* Create User Form */}
            {isCreatingUser && (
              <form onSubmit={handleCreateUser} className="bg-white border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 shadow-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
                  <h4 className="font-serif text-lg font-bold text-[#002D61]">Add New CMS User</h4>
                  <button
                    type="button"
                    onClick={() => setIsCreatingUser(false)}
                    className="text-xs text-stone-500 hover:text-stone-800 font-semibold"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1">
                      Username (required)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. sarah_editor"
                      value={newUserData.username}
                      onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-xs focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1">
                      Email Address (required)
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@jamisonrealestate.com"
                      value={newUserData.email}
                      onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-xs focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Sarah Montgomery"
                      value={newUserData.name}
                      onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-xs focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1">
                      Password (required)
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Set secure password"
                      value={newUserData.password}
                      onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-xs focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1">
                      WordPress Role
                    </label>
                    <select
                      value={newUserData.role}
                      onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-xs focus:outline-none focus:border-[#EA580C] text-[#002D61]"
                    >
                      <option value="Administrator">Administrator (Full control over settings, users, and content)</option>
                      <option value="Editor">Editor (Can publish and manage all posts and pages)</option>
                      <option value="Author">Author (Can publish and manage their own posts)</option>
                      <option value="Contributor">Contributor (Can write and manage posts but cannot publish)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wide uppercase shadow-md shadow-orange-600/30 cursor-pointer"
                  >
                    Add User
                  </button>
                </div>
              </form>
            )}

            {/* Users Directory Table */}
            <div className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse text-xs font-sans">
                <thead>
                  <tr className="bg-stone-50 border-b border-[#E5E0D8] text-stone-500 font-bold uppercase tracking-wider">
                    <th className="py-3 px-5">User</th>
                    <th className="py-3 px-5">Email</th>
                    <th className="py-3 px-5">Role</th>
                    <th className="py-3 px-5">Created</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E0D8]">
                  {users.map((u) => {
                    const id = u.id || u._id;
                    return (
                      <tr key={id} className="hover:bg-stone-50 transition-colors">
                        <td className="py-3.5 px-5 font-semibold text-[#002D61]">
                          <div>{u.name || u.username}</div>
                          <span className="text-[10px] text-stone-400 font-mono">@{u.username}</span>
                        </td>
                        <td className="py-3.5 px-5 text-stone-600">{u.email}</td>
                        <td className="py-3.5 px-5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              u.role === 'Administrator'
                                ? 'bg-amber-100 text-amber-800'
                                : u.role === 'Editor'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-stone-100 text-stone-700'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-stone-400">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          {u.username !== 'Admin' && (
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(u)}
                              className="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer"
                            >
                              Remove
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: SITE FEATURE VISIBILITY CONTROLS
        ========================================================================= */}
        {activeTab === 'visibility' && (
          <div className="space-y-6">
            {/* Toast Notification */}
            {settingNotification && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{settingNotification}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSettingNotification(null)}
                  className="text-emerald-600 hover:text-emerald-900 text-xs font-bold px-2 py-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Main Visibility Panel */}
            <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E0D8]">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] text-[10px] font-bold tracking-widest uppercase text-[#002D61] mb-2">
                    <Eye className="w-3.5 h-3.5 text-[#EA580C]" />
                    <span>Live Display Architecture</span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-[#002D61]">
                    Website Feature Visibility & Display Controls
                  </h2>
                  <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
                    Instantly toggle major website modules and features on or off. Changes save automatically to MongoDB and take effect immediately across all desktop, mobile, and incognito sessions.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-stone-500">Live Status:</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Database Sync Active
                  </span>
                </div>
              </div>

              {/* 3 Toggle Cards */}
              <div className="grid grid-cols-1 gap-5 mt-6">
                {/* 1. MLSOK / IDX Listings & Search Toggle */}
                <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isIdxHidden
                    ? 'bg-stone-50/80 border-stone-300'
                    : 'bg-white border-[#E5E0D8] hover:border-[#EA580C]/40 shadow-xs'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isIdxHidden ? 'bg-stone-200 text-stone-500' : 'bg-orange-50 text-[#EA580C]'
                      }`}>
                        <Globe className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h3 className="text-base font-bold text-[#002D61]">
                            MLSOK / IDX Property Listings & Search Engine
                          </h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isIdxHidden
                              ? 'bg-rose-100 text-rose-700 border border-rose-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}>
                            {isIdxHidden ? '● Hidden From Public Site' : '✓ Live & Visible On Site'}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
                          Controls all IDX Broker integration points: Homepage Verified Quick Search bar, Featured Client Listings carousel (#176753), Interactive Map Search (/map-search), and header/mobile links.
                        </p>
                        <div className="flex items-center gap-2 mt-3 flex-wrap text-[10px] font-medium text-stone-500">
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200">Homepage Quick Search</span>
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200">Featured Listings Carousel</span>
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200">Interactive Map Search (/map-search)</span>
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200">Navbar 'Featured Closings'</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Toggle Switch */}
                    <button
                      type="button"
                      disabled={isUpdatingSetting === 'setting_hide_idx_listings'}
                      onClick={() => handleToggleFeature('setting_hide_idx_listings', isIdxHidden, 'MLSOK IDX Listings & Search')}
                      className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:ring-offset-2 ${
                        isIdxHidden ? 'bg-stone-300' : 'bg-[#EA580C]'
                      } ${isUpdatingSetting === 'setting_hide_idx_listings' ? 'opacity-50 cursor-wait' : ''}`}
                      aria-label="Toggle MLSOK IDX Listings"
                      title={isIdxHidden ? 'Click to Show IDX Listings' : 'Click to Hide IDX Listings'}
                    >
                      <span
                        className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                          isIdxHidden ? 'translate-x-0' : 'translate-x-8'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* 2. Video Sliders / Marquee Toggle */}
                <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isVideoSlidersHidden
                    ? 'bg-stone-50/80 border-stone-300'
                    : 'bg-white border-[#E5E0D8] hover:border-[#EA580C]/40 shadow-xs'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isVideoSlidersHidden ? 'bg-stone-200 text-stone-500' : 'bg-orange-50 text-[#EA580C]'
                      }`}>
                        <Video className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h3 className="text-base font-bold text-[#002D61]">
                            Property Video Sliders & Infinite Marquee
                          </h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isVideoSlidersHidden
                              ? 'bg-rose-100 text-rose-700 border border-rose-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}>
                            {isVideoSlidersHidden ? '● Hidden From Public Site' : '✓ Live & Visible On Site'}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
                          Controls the continuous auto-scrolling 4K video marquee banner and interactive video player displayed across the bottom of pages on the website.
                        </p>
                        <div className="flex items-center gap-2 mt-3 flex-wrap text-[10px] font-medium text-stone-500">
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200">Bottom Video Marquee</span>
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200">Auto-Scrolling Video Track</span>
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200">Modal Video Player</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Toggle Switch */}
                    <button
                      type="button"
                      disabled={isUpdatingSetting === 'setting_hide_video_sliders'}
                      onClick={() => handleToggleFeature('setting_hide_video_sliders', isVideoSlidersHidden, 'Video Sliders & Marquee')}
                      className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:ring-offset-2 ${
                        isVideoSlidersHidden ? 'bg-stone-300' : 'bg-[#EA580C]'
                      } ${isUpdatingSetting === 'setting_hide_video_sliders' ? 'opacity-50 cursor-wait' : ''}`}
                      aria-label="Toggle Video Sliders"
                      title={isVideoSlidersHidden ? 'Click to Show Video Sliders' : 'Click to Hide Video Sliders'}
                    >
                      <span
                        className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                          isVideoSlidersHidden ? 'translate-x-0' : 'translate-x-8'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* 3. Property Videos Page Toggle */}
                <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isVideosPageHidden
                    ? 'bg-stone-50/80 border-stone-300'
                    : 'bg-white border-[#E5E0D8] hover:border-[#EA580C]/40 shadow-xs'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isVideosPageHidden ? 'bg-stone-200 text-stone-500' : 'bg-orange-50 text-[#EA580C]'
                      }`}>
                        <Layers className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h3 className="text-base font-bold text-[#002D61]">
                            Property Videos Dedicated Showcase Page (/property-videos)
                          </h3>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isVideosPageHidden
                              ? 'bg-rose-100 text-rose-700 border border-rose-200'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}>
                            {isVideosPageHidden ? '● Hidden From Public Site' : '✓ Live & Visible On Site'}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 mt-1 max-w-2xl leading-relaxed">
                          Controls visibility of the dedicated Property Videos page (/property-videos & /videos) and automatically hides or restores the 'Property Videos' link in the top navigation header and mobile menu dock.
                        </p>
                        <div className="flex items-center gap-2 mt-3 flex-wrap text-[10px] font-medium text-stone-500">
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200">/property-videos Route</span>
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200">/videos Alias Route</span>
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200">Top Header 'Property Videos' Pill</span>
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200">Mobile Menu '🎬 Property Videos'</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Toggle Switch */}
                    <button
                      type="button"
                      disabled={isUpdatingSetting === 'setting_hide_videos_page'}
                      onClick={() => handleToggleFeature('setting_hide_videos_page', isVideosPageHidden, 'Property Videos Page')}
                      className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#EA580C] focus:ring-offset-2 ${
                        isVideosPageHidden ? 'bg-stone-300' : 'bg-[#EA580C]'
                      } ${isUpdatingSetting === 'setting_hide_videos_page' ? 'opacity-50 cursor-wait' : ''}`}
                      aria-label="Toggle Property Videos Page"
                      title={isVideosPageHidden ? 'Click to Show Property Videos Page' : 'Click to Hide Property Videos Page'}
                    >
                      <span
                        className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                          isVideosPageHidden ? 'translate-x-0' : 'translate-x-8'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: CMS OVERVIEW & SYSTEM ARCHITECTURE
        ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Quick Feature Visibility Card in Settings */}
            <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-[#EA580C]" />
                  <h3 className="font-serif text-lg font-bold text-[#002D61]">Quick Feature Visibility Controls</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('visibility')}
                  className="text-xs font-bold text-[#EA580C] hover:underline cursor-pointer"
                >
                  Open Full Controls →
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#002D61] block">MLSOK / IDX Listings</span>
                    <span className="text-[10px] text-stone-500">{isIdxHidden ? 'Hidden from site' : 'Visible on site'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleFeature('setting_hide_idx_listings', isIdxHidden, 'MLSOK IDX Listings')}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                      isIdxHidden ? 'bg-stone-200 text-stone-700' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isIdxHidden ? 'Hidden (Turn On)' : 'Active (Turn Off)'}
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#002D61] block">Video Sliders & Marquee</span>
                    <span className="text-[10px] text-stone-500">{isVideoSlidersHidden ? 'Hidden from site' : 'Visible on site'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleFeature('setting_hide_video_sliders', isVideoSlidersHidden, 'Video Sliders')}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                      isVideoSlidersHidden ? 'bg-stone-200 text-stone-700' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isVideoSlidersHidden ? 'Hidden (Turn On)' : 'Active (Turn Off)'}
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#002D61] block">Property Videos Page</span>
                    <span className="text-[10px] text-stone-500">{isVideosPageHidden ? 'Hidden from site' : 'Visible on site'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleFeature('setting_hide_videos_page', isVideosPageHidden, 'Videos Page')}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                      isVideosPageHidden ? 'bg-stone-200 text-stone-700' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isVideosPageHidden ? 'Hidden (Turn On)' : 'Active (Turn Off)'}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] text-[10px] font-bold tracking-widest uppercase text-[#002D61] mb-3">
                <Shield className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>Enterprise Architecture Active</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#002D61]">
                Domain-Agnostic Next-Generation CMS Engine
              </h2>
              <p className="text-xs text-stone-600 mt-2 max-w-2xl leading-relaxed">
                You can now edit every headline, button, paragraph, and number live directly on the page using <strong>In-Line Edit Mode</strong>. Click any image to adjust its SEO alt text and title tags, or select any text to inject internal links and custom colors.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C] block">
                    In-Line Text & Button Editor
                  </span>
                  <p className="text-xs text-stone-600 mt-1">
                    Every letter, word, and CTA is editable in place with auto-save to MongoDB & local fallback.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C] block">
                    Image SEO & Alt Text
                  </span>
                  <p className="text-xs text-stone-600 mt-1">
                    Click any image while in Edit Mode to configure Google image search ranking keywords.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C] block">
                    Lead Forms & Submissions
                  </span>
                  <p className="text-xs text-stone-600 mt-1">
                    Valuation requests and consultation bookings stream directly into your secure admin inbox.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboardWorkspace;
