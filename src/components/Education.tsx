'use client';

import React from 'react';
import { GraduationCap, Award, MapPin, Calendar, BookOpen } from 'lucide-react';
import { Education as EducationType } from '@/lib/types';

interface EducationProps {
  education: EducationType[];
}

export default function Education({ education }: EducationProps) {
  return (
    <section id="education" className="py-24 bg-slate-950/80 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Qualifications</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl text-base">
            Strong foundational education in Artificial Intelligence, Data Science, and Computer Science.
          </p>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-purple-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold">
                    {edu.score}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {edu.degree}
                  </h3>
                  <p className="text-sm font-semibold text-cyan-400 mt-1">
                    {edu.institution}
                  </p>
                </div>

                {edu.details && (
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80">
                    {edu.details}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{edu.startDate} – {edu.endDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>{edu.location}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
