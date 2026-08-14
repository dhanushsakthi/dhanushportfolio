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
import { INITIAL_DATA } from '@/lib/db';

export default function Home() {
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => {
        if (!res.ok) throw new Error('API request failed');
        return res.json();
      })
      .then((resData) => {
        if (resData && resData.profile) {
          setData(resData);
        }
      })
      .catch((err) => {
        console.warn('Using default portfolio data due to network error:', err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      <Navbar profile={data.profile} onOpenResume={() => setIsResumeOpen(true)} />
      
      <main>
        <Hero profile={data.profile} onOpenResume={() => setIsResumeOpen(true)} />
        <About profile={data.profile} />
        <Skills skills={data.skills || []} />
        <Projects projects={data.projects || []} />
        <Experience experience={data.experience || []} />
        <Certifications certifications={data.certifications || []} />
        <Education education={data.education || []} />
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
