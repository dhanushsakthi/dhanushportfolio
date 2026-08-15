'use client';

import React from 'react';
import { UserCheck, Code, Cpu, Database, CheckCircle2, Layers } from 'lucide-react';
import { Profile } from '@/lib/types';

interface AboutProps {
  profile: Profile;
}

export default function About({ profile }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Full-Stack Development & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400">AI Engineering</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl text-base sm:text-lg">
            Dedicated to software excellence, clean web architecture, machine learning models, and real-world client delivery.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Bio Overview Card */}
          <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative group hover:border-slate-700/80 transition-all duration-300">
            <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2.5">
              <Code className="w-5 h-5 text-cyan-400" />
              <span>Professional Bio & Core Focus</span>
            </h3>
            
            <p className="text-slate-300 text-base leading-relaxed mb-6">
              {profile.about}
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-300">
                  <strong className="text-white">Full-Stack & CMS Platforms:</strong> Building responsive web portals, custom admin content management systems, and e-commerce platforms for 12+ real-world clients.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-300">
                  <strong className="text-white">AI & Data Science Engineering:</strong> Developing machine learning models (Python, Pandas, Scikit-learn) for fraud prediction and intelligent data analytics.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-300">
                  <strong className="text-white">Database & Cloud Automation:</strong> Relational schema design (SQL, MySQL, Supabase), API integrations, and workflow automation.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics & Pillars Grid */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Pillar 1 */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4 hover:border-cyan-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <Code className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Production Web Apps</h4>
                <p className="text-xs text-slate-400">Deployed live e-commerce, custom CMS, and client web portals.</p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4 hover:border-emerald-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Cpu className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">AI & Machine Learning</h4>
                <p className="text-xs text-slate-400">Banking fraud prediction models, dataset preprocessing, and Python AI solutions.</p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4 hover:border-indigo-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Database className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Database & API Integration</h4>
                <p className="text-xs text-slate-400">SQL database optimization, RESTful APIs, Supabase, and cloud services.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
