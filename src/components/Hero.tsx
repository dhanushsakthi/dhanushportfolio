'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, MapPin, ArrowRight, Download, Sparkles, Code2, Database, Bot } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from './BrandIcons';
import { Profile } from '@/lib/types';

interface HeroProps {
  profile: Profile;
  onOpenResume: () => void;
}

export default function Hero({ profile, onOpenResume }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-tr from-cyan-600/20 via-indigo-600/20 to-purple-600/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>
      <div className="absolute top-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-500/10 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-5 sm:space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] sm:text-xs font-semibold text-slate-300 shadow-xl backdrop-blur-md max-w-full">
              <span className="flex h-2.5 w-2.5 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-cyan-400 font-bold uppercase tracking-wider">Available for Opportunities</span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="text-slate-400 hidden sm:inline">Freelance & Full-Time</span>
            </div>

            {/* Main Name & Title */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight break-words">
                Hi, I&apos;m{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400">
                  {profile.name || 'Dhanush S'}
                </span>
              </h1>
              <p className="text-lg sm:text-2xl font-semibold text-slate-300 tracking-wide leading-snug">
                {profile.headline || 'Full-Stack Web Developer & AI/Data Science Specialist'}
              </p>
            </div>

            {/* Tagline / Summary */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-2xl leading-relaxed">
              {profile.tagline || 'Building high-performance e-commerce platforms, custom CMS solutions, and intelligent AI software applications with real-world client experience.'}
            </p>

            {/* Tech Highlights Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3 pt-1">
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] sm:text-xs font-medium text-slate-300">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>CMS & E-Commerce</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] sm:text-xs font-medium text-slate-300">
                <Bot className="w-3.5 h-3.5 text-indigo-400" />
                <span>AI & Machine Learning</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] sm:text-xs font-medium text-slate-300">
                <Database className="w-3.5 h-3.5 text-purple-400" />
                <span>12+ Client Projects</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="w-full flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 pt-3">
              <a
                href="#projects"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-[0.98] transition-all duration-200"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white active:scale-[0.98] transition-all duration-200"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </button>

              <a
                href="#contact"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social / Professional Links */}
            <div className="w-full pt-5 flex flex-wrap items-center gap-2.5 sm:gap-4 border-t border-slate-800/80">
              <a
                href={profile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              >
                <LinkedInIcon className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>LinkedIn</span>
              </a>

              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              >
                <GitHubIcon className="w-4 h-4 text-slate-300 shrink-0" />
                <span>GitHub</span>
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all truncate max-w-xs"
              >
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{profile.email}</span>
              </a>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 w-full sm:w-auto sm:ml-auto pt-1 sm:pt-0">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>{profile.location || 'Nagapattinam, Tamil Nadu'}</span>
              </div>
            </div>

          </div>

          {/* Profile Photo & Visual Card Column */}
          <div className="lg:col-span-5 flex justify-center items-center relative mt-6 lg:mt-0">
            <div className="relative w-64 h-72 xs:w-72 xs:h-80 sm:w-80 sm:h-96 max-w-full group">
              
              {/* Outer Glowing Rings */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 opacity-60 blur-xl group-hover:opacity-80 transition duration-500"></div>
              
              {/* Image Frame Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-700/80 shadow-2xl">
                {profile.photoUrl ? (
                  <Image
                    src={profile.photoUrl}
                    alt={profile.name || 'Dhanush S'}
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 340px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-500">
                    <Sparkles className="w-16 h-16 mb-2 text-cyan-400 animate-pulse" />
                    <span>Developer Photo</span>
                  </div>
                )}

                {/* Floating Achievement Badge */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 sm:p-3 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 shadow-xl flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-md shrink-0">
                    12+
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-100 truncate">Client Projects Delivered</div>
                    <div className="text-[10px] text-cyan-400 font-medium truncate">Full-Stack & E-Commerce</div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
