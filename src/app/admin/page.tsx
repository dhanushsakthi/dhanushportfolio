'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, Award, Code, Briefcase, Mail, User, FileText, ExternalLink, PlusCircle, CheckCircle2 } from 'lucide-react';
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
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="py-20 text-center text-slate-400 text-xs animate-pulse">
        Loading CMS metrics...
      </div>
    );
  }

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-3xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white">
            Welcome, <span className="text-cyan-400">{data.profile.name}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic CMS Overview & Quick Operations
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Preview Public Site</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <Link href="/admin/projects" className="bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 p-5 rounded-2xl transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Projects</span>
            <Sparkles className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-white mt-2">{data.projects.length}</div>
          <div className="text-[11px] text-cyan-400 mt-1">Manage Portfolio Projects →</div>
        </Link>

        <Link href="/admin/certifications" className="bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 p-5 rounded-2xl transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Certificates</span>
            <Award className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-white mt-2">{data.certifications.length}</div>
          <div className="text-[11px] text-amber-400 mt-1">Manage Credentials →</div>
        </Link>

        <Link href="/admin/skills" className="bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 p-5 rounded-2xl transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Skills</span>
            <Code className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-white mt-2">{data.skills.length}</div>
          <div className="text-[11px] text-indigo-400 mt-1">Manage Tech Stack →</div>
        </Link>

        <Link href="/admin/messages" className="bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Messages</span>
            <Mail className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-extrabold text-white mt-2">{messages.length}</div>
          <div className="text-[11px] text-emerald-400 mt-1">
            {unreadCount > 0 ? `${unreadCount} Unread Messages` : 'View Inquiries →'}
          </div>
        </Link>

      </div>

      {/* Quick Action Operations */}
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <PlusCircle className="w-4 h-4 text-cyan-400" />
          <span>Quick CMS Actions</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            href="/admin/profile"
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-left transition-all"
          >
            <User className="w-5 h-5 text-cyan-400 mb-2" />
            <div className="text-sm font-bold text-white">Edit Profile Bio</div>
            <div className="text-xs text-slate-400">Update photo, phone & socials</div>
          </Link>

          <Link
            href="/admin/projects"
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-left transition-all"
          >
            <Sparkles className="w-5 h-5 text-indigo-400 mb-2" />
            <div className="text-sm font-bold text-white">Add New Project</div>
            <div className="text-xs text-slate-400">Upload live demo & screenshots</div>
          </Link>

          <Link
            href="/admin/certifications"
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-left transition-all"
          >
            <Award className="w-5 h-5 text-amber-400 mb-2" />
            <div className="text-sm font-bold text-white">Upload Certificate</div>
            <div className="text-xs text-slate-400">Add certificate image or PDF</div>
          </Link>

          <Link
            href="/admin/profile"
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-left transition-all"
          >
            <FileText className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-sm font-bold text-white">Update Resume PDF</div>
            <div className="text-xs text-slate-400">Replace current resume file</div>
          </Link>
        </div>
      </div>

    </div>
  );
}
