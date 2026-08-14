'use client';

import React from 'react';
import Image from 'next/image';
import { X, ExternalLink, Tag, Layers, User, Briefcase } from 'lucide-react';
import { GitHubIcon } from './BrandIcons';
import { Project } from '@/lib/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/50 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              {project.category}
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Main Screenshot Banner */}
          <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <Image
              src={project.imageUrl || '/certificates/FULL-STACK (LINKED-IN).jpg'}
              alt={project.title}
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Action Links Bar */}
          <div className="flex flex-wrap items-center gap-4 py-2 border-b border-slate-800">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Live Website</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all"
              >
                <GitHubIcon className="w-4 h-4" />
                <span>View GitHub Repository</span>
              </a>
            )}

            {project.caseStudyUrl && (
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/30"
              >
                <span>Read Case Study</span>
              </a>
            )}
          </div>

          {/* Quick Context & Meta Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="text-[11px] text-slate-400">Role & Responsibility</div>
                <div className="text-xs font-semibold text-slate-200">{project.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-indigo-400 shrink-0" />
              <div>
                <div className="text-[11px] text-slate-400">Client / Company Context</div>
                <div className="text-xs font-semibold text-slate-200">{project.clientContext}</div>
              </div>
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Project Overview & Features</span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {project.detailedDescription || project.shortDescription}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              <span>Technologies Used</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
