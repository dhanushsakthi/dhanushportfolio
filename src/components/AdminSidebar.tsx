'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, User, Code, Briefcase, Sparkles, Award, GraduationCap, Mail, LogOut, ExternalLink, Menu, X, Image as ImageIcon, Film, Trophy } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Profile & Director Bio', href: '/admin/profile', icon: User },
    { name: 'Filmography & Projects', href: '/admin/projects', icon: Film },
    { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { name: 'Awards & Honors', href: '/admin/awards', icon: Trophy },
    { name: 'Skills & Tech Stack', href: '/admin/skills', icon: Code },
    { name: 'Certifications', href: '/admin/certifications', icon: Award },
    { name: 'Experience & Timeline', href: '/admin/experience', icon: Briefcase },
    { name: 'Messages & Inquiries', href: '/admin/messages', icon: Mail }
  ];

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' })
    });
    router.push('/admin/login');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-slate-800/80 h-screen sticky top-0 shrink-0 z-30">
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-emerald-500 to-indigo-600 flex items-center justify-center font-black text-slate-950 text-xs shadow-md shadow-cyan-500/20">
              CMS
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-white">Director Portal</div>
              <div className="text-[10px] text-cyan-400 font-semibold tracking-wide">Dhanush Portfolio</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 via-indigo-600/20 to-emerald-500/20 border border-cyan-500/40 text-cyan-300 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800/80 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-cyan-300 hover:border-cyan-500/30 transition-all"
          >
            <span>Live Portfolio</span>
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden sticky top-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-slate-950 text-[10px]">
            CMS
          </div>
          <span className="text-xs font-bold text-white">Director Admin</span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[53px] bottom-0 z-50 bg-slate-950/98 backdrop-blur-2xl border-t border-slate-800 p-4 overflow-y-auto flex flex-col justify-between">
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-600/20 border border-cyan-500/40 text-cyan-300'
                      : 'text-slate-300 hover:text-white bg-slate-900/60 border border-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-800 space-y-2 mt-4">
            <Link
              href="/"
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300"
            >
              <span>View Live Portfolio</span>
              <ExternalLink className="w-4 h-4 text-cyan-400" />
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
