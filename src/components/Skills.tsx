'use client';

import React, { useState } from 'react';
import { Code, Terminal, Database, Bot, Wrench, Layers, Film, Clapperboard, Video, Eye, Sparkles } from 'lucide-react';
import { Skill } from '@/lib/types';

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const publishedSkills = skills.filter(s => s.published !== false);

  // Extract unique categories dynamically
  const categoriesMap = new Set<string>(['All']);
  publishedSkills.forEach(s => {
    if (s.category) categoriesMap.add(s.category);
  });
  const categories = Array.from(categoriesMap);

  const filteredSkills = activeCategory === 'All'
    ? publishedSkills
    : publishedSkills.filter(s => s.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Direction': return Clapperboard;
      case 'Screenwriting': return Film;
      case 'Storyboarding': return Layers;
      case 'Cinematography': return Video;
      case 'Editing': return Sparkles;
      case 'AI Filmmaking': return Bot;
      case 'Visual Storytelling': return Eye;
      case 'Programming': return Terminal;
      case 'Web Development': return Code;
      case 'Database': return Database;
      default: return Layers;
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-24 bg-slate-950/80 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-black uppercase tracking-wider mb-3">
            <Clapperboard className="w-3.5 h-3.5" />
            <span>Directorial & Technical Craft</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Filmmaking Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400">Technical Expertise</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl text-sm sm:text-base">
            Capabilities across film direction, screenwriting, cinematography, color grading, and digital media production.
          </p>
        </div>

        {/* Dynamic Category Pills */}
        <div className="flex items-center gap-2 mb-8 sm:mb-12 overflow-x-auto pb-3 sm:pb-0 sm:flex-wrap sm:justify-center no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat);
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold shrink-0 transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredSkills.map((skill) => {
            const Icon = getCategoryIcon(skill.category);
            return (
              <div
                key={skill.id}
                className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-4 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-500/40 transition-all shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-extrabold text-slate-100 text-xs sm:text-sm group-hover:text-cyan-300 transition-colors truncate">
                      {skill.name}
                    </h3>
                  </div>
                </div>

                {skill.description && (
                  <p className="text-[11px] text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                    {skill.description}
                  </p>
                )}

                <div className="flex items-center justify-between border-t border-slate-800/60 pt-2.5 text-[11px]">
                  <span className="text-slate-400 font-medium truncate max-w-[110px]">{skill.category}</span>
                  {skill.level && (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold shrink-0">
                      {skill.level}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
