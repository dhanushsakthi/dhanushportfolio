'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Certifications from '@/components/Certifications';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ResumeViewerModal from '@/components/ResumeViewerModal';
import { PortfolioData } from '@/lib/types';

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load portfolio data:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-cyan-400 animate-spin"></div>
        <div className="text-sm font-semibold text-cyan-400 tracking-wider uppercase animate-pulse">
          Loading Portfolio...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      <Navbar profile={data.profile} onOpenResume={() => setIsResumeOpen(true)} />
      
      <main>
        <Hero profile={data.profile} onOpenResume={() => setIsResumeOpen(true)} />
        <About profile={data.profile} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Experience experience={data.experience} />
        <Certifications certifications={data.certifications} />
        <Education education={data.education} />
        <Contact profile={data.profile} />
      </main>

      <Footer profile={data.profile} />

      <ResumeViewerModal
        profile={data.profile}
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
