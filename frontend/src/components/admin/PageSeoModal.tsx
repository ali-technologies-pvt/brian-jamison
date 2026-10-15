import React, { useState } from 'react';
import { Globe, Check, X, Shield, Search } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

interface PageSeoModalProps {
  isOpen: boolean;
  pagePath: string;
  defaultTitle?: string;
  defaultDesc?: string;
  onClose: () => void;
}

export const PageSeoModal: React.FC<PageSeoModalProps> = ({
  isOpen,
  pagePath,
  defaultTitle = 'Brian Jamison | OKC Luxury Real Estate & 6-Phase Seller Blueprint',
  defaultDesc = 'Top 2% Producer in Oklahoma City with Jamison Real Estate. Discover the 6-Phase Blueprint, verified $70M+ volume, and zero-risk listing agreements.',
  onClose,
}) => {
  const { getPageSeo, updatePageSeo } = useAdmin();
  const existing = getPageSeo(pagePath);

  const [metaTitle, setMetaTitle] = useState(existing.metaTitle ?? defaultTitle);
  const [metaDescription, setMetaDescription] = useState(existing.metaDescription ?? defaultDesc);
  const [canonicalUrl, setCanonicalUrl] = useState(
    existing.canonicalUrl ?? `https://brianjamisonrealtor.com${pagePath === '/' ? '' : pagePath}`
  );
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePageSeo(pagePath, { metaTitle, metaDescription, canonicalUrl });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#E5E0D8] p-6 sm:p-8 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#002D61] via-[#EA580C] to-[#002D61]" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-center text-[#002D61]">
            <Globe className="w-5 h-5 text-[#EA580C]" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#002D61]">
              Page SEO & Meta Tags Manager
            </h3>
            <span className="text-xs text-stone-500 font-sans">
              Active Path: <code className="bg-stone-100 px-1 py-0.5 rounded text-[#002D61] font-mono">{pagePath}</code>
            </span>
          </div>
        </div>

        {/* Google SERP Live Snippet Preview */}
        <div className="mb-6 p-4 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8]">
          <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 block mb-2">
            Google Search Result Preview
          </span>
          <div className="text-xs text-emerald-700 font-mono truncate mb-1">
            {canonicalUrl || 'https://brianjamisonrealtor.com'}
          </div>
          <h4 className="text-sm font-semibold text-[#1a0dab] hover:underline cursor-pointer truncate mb-1">
            {metaTitle || 'Default Page Title'}
          </h4>
          <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
            {metaDescription || 'Meta description will appear here in search engine rankings.'}
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61]">
                Meta Title Tag
              </label>
              <span className={`text-[10px] ${metaTitle.length > 60 ? 'text-amber-600 font-bold' : 'text-stone-400'}`}>
                {metaTitle.length}/60 chars (recommended)
              </span>
            </div>
            <input
              type="text"
              required
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-xs text-[#1B1D21] focus:outline-none focus:border-[#EA580C] focus:bg-white transition-all font-sans"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61]">
                Meta Description Tag
              </label>
              <span className={`text-[10px] ${metaDescription.length > 160 ? 'text-amber-600 font-bold' : 'text-stone-400'}`}>
                {metaDescription.length}/160 chars (recommended)
              </span>
            </div>
            <textarea
              rows={3}
              required
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-xs text-[#1B1D21] focus:outline-none focus:border-[#EA580C] focus:bg-white transition-all font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#002D61] mb-1.5">
              Canonical URL
            </label>
            <input
              type="url"
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8] text-xs text-[#1B1D21] focus:outline-none focus:border-[#EA580C] focus:bg-white transition-all font-sans"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold tracking-wide transition-all shadow-md shadow-orange-600/30 flex items-center gap-2 cursor-pointer"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved Successfully!</span>
                </>
              ) : (
                <span>Save Page SEO</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
