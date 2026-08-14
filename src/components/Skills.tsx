'use client';

import React, { useState } from 'react';
import { Code, Terminal, Database, Bot, Wrench, Layers } from 'lucide-react';
import { Skill } from '@/lib/types';

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Programming', 'Web Development', 'Database', 'AI / Data', 'Tools & Platforms'];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming': return Terminal;
      case 'Web Development': return Code;
      case 'Database': return Database;
      case 'AI / Data': return Bot;
      case 'Tools & Platforms': return Wrench;
      default: return Layers;
    }
  };

  return (
    <section id="skills" className="py-24 bg-slate-950/80 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Code className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Technologies</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl text-base">
            Verified technical stack across programming, full-stack web systems, database engineering, and AI/ML modeling.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 mb-12">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat);
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => {
            const Icon = getCategoryIcon(skill.category);
            return (
              <div
                key={skill.id}
                className="bg-slate-900/60 backdrop-blur-md border border-slate-800/90 rounded-2xl p-4.5 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-500/40 transition-all">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="font-bold text-slate-100 text-sm group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800/60 pt-2.5 text-[11px]">
                  <span className="text-slate-400 font-medium">{skill.category}</span>
                  {skill.level && (
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-semibold">
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
