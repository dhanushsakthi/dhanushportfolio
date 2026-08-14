'use client';

import React from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { Profile } from '@/lib/types';

interface ResumeViewerModalProps {
  profile: Profile;
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeViewerModal({ profile, isOpen, onClose }: ResumeViewerModalProps) {
  if (!isOpen) return null;

  const resumeUrl = profile.resumePdfUrl || '/uploads/dhanush_resume.pdf';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fadeIn overflow-hidden">
      <div className="relative w-full max-w-5xl h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Curriculum Vitae / Resume</h3>
              <p className="text-xs text-slate-400">{profile.name} — B.Tech AI & Data Science</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={resumeUrl}
              download="Dhanush_S_Resume.pdf"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in New Tab</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="flex-1 bg-slate-950 relative w-full h-full">
          <iframe
            src={`${resumeUrl}#toolbar=0`}
            className="w-full h-full border-none"
            title="Dhanush S Resume"
          />
        </div>

      </div>
    </div>
  );
}
