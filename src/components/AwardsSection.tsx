'use client';

import React from 'react';
import { Trophy, Award as AwardIcon } from 'lucide-react';
import { Award } from '@/lib/types';

interface AwardsSectionProps {
  awards: Award[];
}

export default function AwardsSection({ awards }: AwardsSectionProps) {
  const publishedAwards = (awards || []).filter(a => a.published !== false);

  if (publishedAwards.length === 0) return null;

  return (
    <section id="awards" className="py-16 sm:py-24 bg-slate-950/90 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Honors & Accolades</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Film Festival <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Awards & Laurels</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl text-sm sm:text-base">
            Recognitions for independent short film direction, screenwriting, visual style, and suspense storytelling.
          </p>
        </div>

        {/* Awards Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedAwards.map((aw) => (
            <div
              key={aw.id}
              className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-950/20 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {aw.position || 'Winner'} • {aw.year}
                  </span>
                  <AwardIcon className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>

                {aw.certificateUrl && (
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                    <img src={aw.certificateUrl} alt={aw.awardName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                    {aw.awardName}
                  </h3>
                  <p className="text-xs font-bold text-amber-400/90 mt-0.5">{aw.organization}</p>
                  {aw.filmProject && (
                    <p className="text-xs text-slate-400 italic mt-1">Associated Film: <span className="text-slate-200 font-semibold">{aw.filmProject}</span></p>
                  )}
                  {aw.description && (
                    <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">{aw.description}</p>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
                Category: {aw.category || 'Directing'}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
