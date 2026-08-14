'use client';

import React from 'react';
import { UserCheck, Code, Cpu, ShieldCheck, CheckCircle2, GraduationCap, Building2, Briefcase } from 'lucide-react';
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>About Dhanush</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Driven Developer with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Real-World Experience</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl text-base sm:text-lg">
            Combining formal Artificial Intelligence & Data Science education with practical full-stack web development and client-facing engineering.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Bio Overview Card */}
          <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative group hover:border-slate-700/80 transition-all duration-300">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
              <Code className="w-5 h-5 text-cyan-400" />
              <span>Professional Overview</span>
            </h3>
            
            <p className="text-slate-300 text-base leading-relaxed mb-6">
              {profile.about ||
                'Initiative-driven developer with hands-on experience developing CMS platforms, e-commerce platforms, full-stack web applications, intelligent software solutions, and business automation systems for 12+ real-world clients. Strong foundation in Python, Java, SQL, API integration, database management, and machine learning with practical development experience.'}
            </p>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-300">
                  <strong className="text-white">Web & CMS Development:</strong> Engineered e-commerce websites like KMD Food Products and CMS solutions like Aaraa Gifts with customer browsing, cart workflows, and responsive UI.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-300">
                  <strong className="text-white">AI & Data Science Foundation:</strong> Pursuing B.Tech AI & Data Science, with hands-on ML team experience building banking fraud prediction models using Python, Pandas, and Scikit-learn.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-300">
                  <strong className="text-white">Direct Client Engineering:</strong> Handled client requirements directly through technical communication, feature updates, bug fixes, deployment, and post-delivery maintenance.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics & Pillars Grid */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Pillar 1 */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4 hover:border-cyan-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Full-Stack & Client Work</h4>
                <p className="text-xs text-slate-400">12+ real-world web development projects delivered across E-Commerce, CMS, and business applications.</p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4 hover:border-indigo-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <Cpu className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">AI & Machine Learning</h4>
                <p className="text-xs text-slate-400">Experience in data preprocessing, feature engineering, model evaluation, and predictive ML models.</p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4 hover:border-purple-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">B.Tech AI & DS (CGPA 8.5)</h4>
                <p className="text-xs text-slate-400">AVS Engineering College student with strong academic performance and hands-on project portfolio.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
