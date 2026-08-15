'use client';

import React from 'react';
import Image from 'next/image';
import { X, ExternalLink, Tag, Layers, User, Briefcase, Film, Clapperboard, Video } from 'lucide-react';
import { Project } from '@/lib/types';
import VideoPlayer from './VideoPlayer';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const hasVideo = project.videoSourceType === 'youtube' || project.videoSourceType === 'cloudinary' || project.youtubeUrl || project.cloudinaryUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/50 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              {project.projectType || project.category || 'Film'}
            </span>
            <h2 className="text-xl font-extrabold text-white tracking-tight">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* Cinematic Video Player or Banner */}
          {hasVideo ? (
            <VideoPlayer
              videoSourceType={project.videoSourceType || (project.youtubeUrl ? 'youtube' : 'cloudinary')}
              youtubeUrl={project.youtubeUrl}
              youtubeVideoId={project.youtubeVideoId}
              cloudinaryUrl={project.cloudinaryUrl}
              posterUrl={project.poster || project.imageUrl}
              title={project.title}
            />
          ) : (
            <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src={project.poster || project.imageUrl || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80'}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Logline Banner */}
          {project.logline && (
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 italic font-semibold text-center">
              "{project.logline}"
            </div>
          )}

          {/* Production Meta Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
            <div>
              <div className="text-[11px] text-slate-400 font-semibold">My Role</div>
              <div className="text-xs font-black text-amber-300 mt-0.5">{project.role}</div>
            </div>

            <div>
              <div className="text-[11px] text-slate-400 font-semibold">Director</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5">{project.director || 'Dhanush S'}</div>
            </div>

            <div>
              <div className="text-[11px] text-slate-400 font-semibold">Year & Genre</div>
              <div className="text-xs font-bold text-slate-200 mt-0.5">{project.year || '2026'} • {project.genre || 'Film'}</div>
            </div>

            <div>
              <div className="text-[11px] text-slate-400 font-semibold">Duration</div>
              <div className="text-xs font-bold text-cyan-400 mt-0.5">{project.duration || 'N/A'}</div>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Film Overview & Story Synopsis</span>
            </h3>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {project.detailedDescription || project.shortDescription}
            </p>
          </div>

          {/* Credits */}
          {project.credits && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Cast & Crew Credits</div>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">{project.credits}</p>
            </div>
          )}

          {/* Production Gallery Stills */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Film className="w-4 h-4 text-cyan-400" />
                <span>Production Gallery & Behind the Scenes</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.screenshots.map((url, idx) => (
                  <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-950 group">
                    <img src={url} alt={`Gallery Still ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
