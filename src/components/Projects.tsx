'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Sparkles, ArrowUpRight } from 'lucide-react';
import { GitHubIcon } from './BrandIcons';
import { Project } from '@/lib/types';
import ProjectModal from './ProjectModal';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'E-Commerce', 'CMS', 'AI / ML', 'Client Work'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Real-World <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Client & Software Projects</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl text-base">
            Explore live production web solutions, CMS gifting platforms, and machine learning systems built for real businesses.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-950/40 transition-all duration-300 flex flex-col group"
            >
              
              {/* Project Image Banner */}
              <div className="relative w-full h-52 bg-slate-950 overflow-hidden cursor-pointer" onClick={() => setSelectedProject(project)}>
                <Image
                  src={project.imageUrl || '/certificates/FULL-STACK (LINKED-IN).jpg'}
                  alt={project.title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950/90 backdrop-blur-md border border-cyan-500/30 text-cyan-400">
                    {project.category}
                  </span>
                  {project.isFeatured && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300">
                      Featured
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-cyan-500 text-slate-950 flex items-center gap-1 shadow-lg">
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Project Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer flex items-center justify-between"
                  >
                    <span>{project.title}</span>
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-md bg-slate-800/90 border border-slate-700/60 text-[11px] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-0.5 text-[10px] text-slate-400 font-medium">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>LIVE DEMO</span>
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all"
                      >
                        <GitHubIcon className="w-3.5 h-3.5" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs text-slate-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    View Details →
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
