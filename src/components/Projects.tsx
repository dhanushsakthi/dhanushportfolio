'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, Play, Film, Video, Clapperboard } from 'lucide-react';
import { Project } from '@/lib/types';
import ProjectModal from './ProjectModal';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter only published projects for public display
  const publishedProjects = projects.filter(p => p.published !== false);

  const directedFilms = publishedProjects.filter(p => p.projectType === 'Directed Film' || p.role === 'Director');
  const adWorks = publishedProjects.filter(p => p.projectType === 'Assistant Director Work' || p.role === 'Assistant Director');
  const shortFilms = publishedProjects.filter(p => p.projectType === 'Short Film' || (p.projectType !== 'Directed Film' && p.projectType !== 'Assistant Director Work'));

  const filteredProjects = activeTab === 'ALL'
    ? publishedProjects
    : activeTab === 'DIRECTED'
    ? directedFilms
    : activeTab === 'AD_WORK'
    ? adWorks
    : shortFilms;

  return (
    <section id="projects" className="py-16 sm:py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider mb-3">
            <Film className="w-3.5 h-3.5" />
            <span>Cinematic Filmography</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Directed Films & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400">Production Projects</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            Explore independent short films directed by Dhanush S alongside high-budget assistant director feature film productions.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 'ALL', label: `All Works (${publishedProjects.length})` },
            { id: 'DIRECTED', label: `Directed By Dhanush (${directedFilms.length})` },
            { id: 'AD_WORK', label: `Assistant Director Work (${adWorks.length})` },
            { id: 'SHORT_FILMS', label: `Short Films (${shortFilms.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25 scale-105'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl overflow-hidden hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-950/40 transition-all duration-500 flex flex-col group"
            >
              
              {/* Image / Poster Frame */}
              <div
                className="relative w-full aspect-video bg-slate-950 overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.poster || project.imageUrl || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80'}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Play overlay button if video exists */}
                {(project.youtubeUrl || project.cloudinaryUrl) && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-slate-950/90 backdrop-blur-md border border-cyan-500/30 text-cyan-400">
                    {project.projectType || 'Film'}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300">
                    {project.role || 'Director'}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 flex items-center gap-1 shadow-lg">
                    <span>Watch / Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Project Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>{project.year || '2026'} • {project.genre || 'Film'}</span>
                    {project.duration && <span className="text-cyan-400 font-bold">{project.duration}</span>}
                  </div>

                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-lg sm:text-xl font-black text-white group-hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  {project.logline && (
                    <p className="text-xs text-cyan-300/90 italic line-clamp-2">
                      "{project.logline}"
                    </p>
                  )}

                  <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 font-medium">
                    Director: <span className="text-slate-200 font-bold">{project.director || 'Dhanush S'}</span>
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-bold transition-colors shrink-0 flex items-center gap-1"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Project Detail & Video Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
