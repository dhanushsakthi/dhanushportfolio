'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, Code, Layers, Globe, Cpu } from 'lucide-react';
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

  const ecommerceProjects = publishedProjects.filter(p => p.category === 'E-Commerce' || p.projectType === 'E-Commerce');
  const cmsProjects = publishedProjects.filter(p => p.category === 'CMS' || p.projectType === 'CMS');
  const aiProjects = publishedProjects.filter(p => p.category === 'AI / ML' || p.projectType === 'AI / ML');
  const clientProjects = publishedProjects.filter(p => p.category === 'Client Work' || p.projectType === 'Client Work');

  const filteredProjects = activeTab === 'ALL'
    ? publishedProjects
    : publishedProjects.filter(p => p.category === activeTab || p.projectType === activeTab);

  return (
    <section id="projects" className="py-16 sm:py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider mb-3">
            <Code className="w-3.5 h-3.5" />
            <span>Featured Portfolio Works</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Software Solutions & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400">Client Projects</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            Explore production e-commerce applications, custom CMS engines, AI/ML models, and freelance client platforms delivered for 12+ real-world clients.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 'ALL', label: `All Projects (${publishedProjects.length})` },
            { id: 'E-Commerce', label: `E-Commerce (${ecommerceProjects.length})` },
            { id: 'CMS', label: `CMS Platforms (${cmsProjects.length})` },
            { id: 'AI / ML', label: `AI & Machine Learning (${aiProjects.length})` },
            { id: 'Client Work', label: `Client Solutions (${clientProjects.length})` }
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
              
              {/* Image Frame */}
              <div
                className="relative w-full aspect-video bg-slate-950 overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.imageUrl || project.poster || '/certificates/FULL-STACK (LINKED-IN).jpg'}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-slate-950/90 backdrop-blur-md border border-cyan-500/30 text-cyan-400">
                    {project.category || project.projectType || 'Web App'}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 flex items-center gap-1 shadow-lg">
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Project Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[11px] text-cyan-400 font-bold tracking-wide">
                    {project.clientContext || project.role || 'Full-Stack Project'}
                  </div>

                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-lg sm:text-xl font-black text-white group-hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Technologies Pills */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-[10px] text-slate-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-[10px] text-cyan-400 font-medium">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                )}

                {/* Footer Controls */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  {project.liveDemoUrl ? (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-bold transition-colors flex items-center gap-1"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-500 font-mono">Client Application</span>
                  )}

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

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
