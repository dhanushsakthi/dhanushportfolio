'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowUp, Lock } from 'lucide-react';
import { LinkedInIcon, GitHubIcon, InstagramIcon, YouTubeIcon } from './BrandIcons';
import { Profile } from '@/lib/types';

interface FooterProps {
  profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
            <span className="text-xl font-black text-white tracking-tight">
              {profile.name || 'DHANUSH S'}
            </span>
            <span className="text-xs text-cyan-400 font-bold">
              {profile.headline || 'Film Director & Assistant Director'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {profile.instagramUrl && (
              <a
                href={profile.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            )}

            {profile.youtubeUrl && (
              <a
                href={profile.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-500/40 transition-colors"
                title="YouTube Channel"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
            )}

            {profile.linkedInUrl && (
              <a
                href={profile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            )}

            <a
              href={`mailto:${profile.email}`}
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <Link
              href="/admin"
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
              title="Admin CMS Studio"
            >
              <Lock className="w-4 h-4" />
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors bg-slate-900/60 px-3.5 py-2 rounded-xl border border-slate-800"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p>Filmmaker CMS Powered by Firebase & Cloudinary</p>
        </div>
      </div>
    </footer>
  );
}
