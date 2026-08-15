'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Film, Trophy, Code, Briefcase, Mail, User, FileText, ExternalLink, PlusCircle, Image as ImageIcon, Clapperboard, Video, CheckCircle2 } from 'lucide-react';
import { PortfolioData, ContactMessage } from '@/lib/types';

export default function AdminDashboard() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/content').then(res => res.json()),
      fetch('/api/contact').then(res => res.json())
    ]).then(([contentData, contactData]) => {
      setData(contentData);
      if (contactData.success) {
        setMessages(contactData.messages);
      }
      setLoading(false);
    }).catch(err => {
      console.error('Error loading CMS metrics:', err);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="py-24 text-center text-slate-400 text-xs animate-pulse flex flex-col items-center justify-center gap-3">
        <Film className="w-8 h-8 text-cyan-400 animate-spin" />
        <span>Loading Director CMS Overview...</span>
      </div>
    );
  }

  const projects = data.projects || [];
  const directedFilms = projects.filter(p => p.projectType === 'Directed Film' || p.role === 'Director');
  const adWorks = projects.filter(p => p.projectType === 'Assistant Director Work' || p.role === 'Assistant Director');
  const shortFilms = projects.filter(p => p.projectType === 'Short Film');
  const awards = data.awards || [];
  const skills = data.skills || [];
  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Executive Director Studio
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-2">
            Welcome, <span className="text-cyan-400">{data.profile.name}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic Filmmaker CMS & Production Portfolio Management System
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-emerald-500/20 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 transition-all shadow-md shadow-cyan-500/10"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Preview Public Portfolio</span>
          </Link>
        </div>
      </div>

      {/* Primary Filmmaker Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <Link href="/admin/projects" className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 p-5 rounded-2xl transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Projects</span>
            <Film className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-white mt-2">{projects.length}</div>
          <div className="text-[11px] text-cyan-400 font-semibold mt-1">Manage All Works →</div>
        </Link>

        <Link href="/admin/projects" className="bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 p-5 rounded-2xl transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Directed Films</span>
            <Clapperboard className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-white mt-2">{directedFilms.length}</div>
          <div className="text-[11px] text-indigo-400 font-semibold mt-1">Director Category →</div>
        </Link>

        <Link href="/admin/projects" className="bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">AD Projects</span>
            <Video className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-white mt-2">{adWorks.length}</div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">Assistant Director →</div>
        </Link>

        <Link href="/admin/awards" className="bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 p-5 rounded-2xl transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Awards & Honors</span>
            <Trophy className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-white mt-2">{awards.length}</div>
          <div className="text-[11px] text-amber-400 font-semibold mt-1">Manage Film Awards →</div>
        </Link>

      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <Link href="/admin/skills" className="bg-slate-950 border border-slate-800 hover:border-cyan-500/30 p-4 rounded-xl transition-all">
          <div className="text-xs text-slate-400 font-medium">Skills & Directing Stack</div>
          <div className="text-xl font-bold text-white mt-1">{skills.length} Items</div>
        </Link>

        <Link href="/admin/media" className="bg-slate-950 border border-slate-800 hover:border-cyan-500/30 p-4 rounded-xl transition-all">
          <div className="text-xs text-slate-400 font-medium">Media Library</div>
          <div className="text-xl font-bold text-white mt-1">Cloudinary Connected</div>
        </Link>

        <Link href="/admin/certifications" className="bg-slate-950 border border-slate-800 hover:border-cyan-500/30 p-4 rounded-xl transition-all">
          <div className="text-xs text-slate-400 font-medium">Certifications</div>
          <div className="text-xl font-bold text-white mt-1">{(data.certifications || []).length} Credentials</div>
        </Link>

        <Link href="/admin/messages" className="bg-slate-950 border border-slate-800 hover:border-cyan-500/30 p-4 rounded-xl transition-all">
          <div className="text-xs text-slate-400 font-medium">Public Inquiries</div>
          <div className="text-xl font-bold text-white mt-1">
            {unreadCount > 0 ? `${unreadCount} Unread` : `${messages.length} Received`}
          </div>
        </Link>

      </div>

      {/* Quick Operations Panel */}
      <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl space-y-4">
        <h2 className="text-base font-black text-white flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-cyan-400" />
          <span>Quick Production Actions</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            href="/admin/projects"
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-cyan-500/40 text-left transition-all group"
          >
            <Clapperboard className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Add Film Project</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Upload poster, stills or YouTube link</div>
          </Link>

          <Link
            href="/admin/profile"
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-cyan-500/40 text-left transition-all group"
          >
            <User className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Edit Director Bio</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Director statement & headshot</div>
          </Link>

          <Link
            href="/admin/media"
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-cyan-500/40 text-left transition-all group"
          >
            <ImageIcon className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Cloudinary Media</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Browse images & film clips</div>
          </Link>

          <Link
            href="/admin/awards"
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-cyan-500/40 text-left transition-all group"
          >
            <Trophy className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-xs font-bold text-white">Add Award / Honor</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Certificate image & laurels</div>
          </Link>
        </div>
      </div>

    </div>
  );
}
