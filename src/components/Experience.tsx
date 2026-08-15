'use client';

import React from 'react';
import { Briefcase, Building2, Calendar, MapPin, CheckCircle2, TrendingUp } from 'lucide-react';
import { Experience as ExperienceType } from '@/lib/types';

interface ExperienceProps {
  experience: ExperienceType[];
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience" className="py-16 sm:py-24 bg-slate-950/90 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Progression</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Experience</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl text-sm sm:text-base">
            Demonstrated growth from internship engineering to production customer maintenance and freelance client delivery.
          </p>
        </div>

        {/* Timeline List */}
        <div className="max-w-4xl mx-auto relative pl-5 sm:pl-8 border-l-2 border-slate-800 space-y-8 sm:space-y-12">
          {experience.map((exp) => (
            <div key={exp.id} className="relative group">
              
              {/* Timeline Node Icon */}
              <div className="absolute -left-[27px] sm:-left-[39px] top-1.5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-950 border-2 border-cyan-500 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* Experience Card */}
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 hover:border-cyan-500/40 transition-all duration-300 shadow-xl space-y-4">
                
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] sm:text-xs font-bold uppercase">
                        {exp.type}
                      </span>
                      {exp.role.includes('Junior') && (
                        <span className="flex items-center gap-1 text-[10px] sm:text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <TrendingUp className="w-3 h-3" />
                          <span>Intern → Junior Web Dev</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-slate-300 font-semibold text-xs sm:text-sm mt-1">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 font-medium bg-slate-800/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg border border-slate-700/60 w-fit">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{exp.startDate} – {exp.endDate}</span>
                    </div>
                    {exp.location && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <MapPin className="w-3 h-3 text-red-400" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Highlights List */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  {exp.highlights.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{bullet}</p>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 sm:py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-[11px] sm:text-xs text-slate-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
