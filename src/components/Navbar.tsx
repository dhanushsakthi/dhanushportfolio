'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, FileText, Lock, Sparkles, User, Code, Briefcase, GraduationCap, Award, Mail } from 'lucide-react';
import { Profile } from '@/lib/types';

interface NavbarProps {
  profile: Profile;
  onOpenResume: () => void;
}

export default function Navbar({ profile, onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', icon: User },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Projects', href: '#projects', icon: Sparkles },
    { name: 'Certifications', href: '#certifications', icon: Award },
    { name: 'Education', href: '#education', icon: GraduationCap },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-lg border-b border-slate-800/80 shadow-xl shadow-cyan-950/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 text-lg">
              DS
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-100 tracking-tight text-lg group-hover:text-cyan-400 transition-colors">
              {profile.name || 'Dhanush S'}
            </span>
            <span className="text-xs text-cyan-400 font-medium tracking-wider uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              AI & Web Developer
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-800 shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-800/80 transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop CTA & Admin */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
          <Link
            href="/admin"
            title="Admin CMS Dashboard"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <Lock className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 px-6 py-6 transition-all animate-fadeIn">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  {link.name}
                </a>
              );
            })}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400"
              >
                <Lock className="w-5 h-5" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
