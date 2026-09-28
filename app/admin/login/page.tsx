'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import {
  ShieldCheck,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  Building2,
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  const [username, setUsername] = useState('brianjamison');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      // Relative, domain-agnostic signIn via NextAuth
      const res = await signIn('credentials', {
        redirect: false,
        username: username.trim(),
        password,
        callbackUrl,
      });

      if (res?.error) {
        setErrorMessage('Invalid username or password. Please verify your credentials.');
        setIsLoading(false);
        return;
      }

      // Successful authentication: navigate to admin portal using relative URL
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage('An unexpected error occurred during sign-in. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] text-[#0A2540] flex flex-col justify-between selection:bg-[#E07A28]/20 selection:text-[#0A2540]">
      {/* Top Brand Navigation Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A2540]/70 hover:text-[#E07A28] transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Public Website</span>
        </a>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5E0D8] text-[11px] font-semibold tracking-wide text-[#0A2540]/80 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Encrypted Admin Gateway</span>
        </div>
      </header>

      {/* Main Login Canvas */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-[460px]">
          {/* Card Container: Crisp Pure White with Warm Border & Smooth 2xl Radius */}
          <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-2xl shadow-xl shadow-[#0A2540]/5 p-8 sm:p-10 relative overflow-hidden">
            {/* Top Amber Brand Accent Strip */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#0A2540] via-[#E07A28] to-[#0A2540]" />

            {/* Header / Brand Title */}
            <div className="text-center mb-8">
              {/* Circular Emblem Seal */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0A2540] text-white shadow-md shadow-[#0A2540]/20 mb-4">
                <Building2 className="w-7 h-7 text-[#E07A28]" />
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] text-[10px] font-bold tracking-[0.2em] uppercase text-[#0A2540] mb-2">
                JAMISON REAL ESTATE
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0A2540] tracking-tight">
                Management Portal
              </h1>

              <p className="text-xs text-[#6B7280] mt-1.5 font-sans">
                Secure access for MLS syndication, lead routing & content operations
              </p>
            </div>

            {/* Error Notification Alert */}
            {errorMessage && (
              <div
                role="alert"
                className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200/80 flex items-start gap-3 text-red-800 text-xs animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="flex-1 font-medium leading-relaxed">{errorMessage}</div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username / Email Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#0A2540] mb-1.5"
                >
                  Username or Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B7280]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. brianjamison"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] text-sm text-[#0A2540] placeholder-[#9CA3AF] transition-all duration-200 focus:outline-none focus:border-[#E07A28] focus:bg-white focus:ring-3 focus:ring-[#E07A28]/15"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#0A2540]"
                  >
                    Password
                  </label>
                  <span className="text-[11px] text-[#6B7280]">Case-sensitive</span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B7280]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your master password"
                    className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] text-sm text-[#0A2540] placeholder-[#9CA3AF] transition-all duration-200 focus:outline-none focus:border-[#E07A28] focus:bg-white focus:ring-3 focus:ring-[#E07A28]/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6B7280] hover:text-[#0A2540] transition-colors cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Session & Security Badge */}
              <div className="pt-1 flex items-center justify-between text-xs text-[#6B7280]">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-[#E5E0D8] text-[#E07A28] focus:ring-[#E07A28]/20 cursor-pointer"
                  />
                  <span className="text-[#0A2540]/80">Remember for 30 days</span>
                </label>
                <div className="inline-flex items-center gap-1 text-[11px] text-[#0A2540]/70">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E07A28]" />
                  <span>256-bit SSL</span>
                </div>
              </div>

              {/* Submit CTA Button: Fully Rounded Pill, Warm Amber #E07A28 */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-full bg-[#E07A28] hover:bg-[#C86518] text-white font-semibold text-sm tracking-wide transition-all duration-200 shadow-md shadow-[#E07A28]/25 hover:shadow-lg hover:shadow-[#E07A28]/35 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.99]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Enter Management Portal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick-Fill Helper for Development & Demonstration */}
            <div className="mt-8 pt-5 border-t border-[#E5E0D8] text-center">
              <span className="text-[11px] text-[#6B7280] block mb-2">
                Phase 1 Testing Seed Credentials:
              </span>
              <button
                type="button"
                onClick={() => {
                  setUsername('brianjamison');
                  setPassword('Imthepassword@123');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#E5E0D8]/50 border border-[#E5E0D8] text-[11px] font-medium text-[#0A2540] transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3 h-3 text-[#E07A28]" />
                <span>Auto-Fill: <strong>brianjamison</strong></span>
              </button>
            </div>
          </div>

          {/* Footer Subtext */}
          <div className="text-center mt-6 text-xs text-[#6B7280]">
            <p>Brian Jamison Real Estate · Salt Real Estate Corporate Office</p>
            <p className="mt-1 text-[11px]">1508 W. Edmond Rd., Edmond, OK 73003 · License #184931</p>
          </div>
        </div>
      </main>

      {/* Subtle Footer Bar */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6B7280] border-t border-[#E5E0D8]/60">
        <div>Custom Real Estate Content Management System · Phase 1</div>
        <div className="mt-2 sm:mt-0">Domain-Agnostic Next.js App Router Architecture</div>
      </footer>
    </div>
  );
}
