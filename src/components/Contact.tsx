'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from './BrandIcons';
import { Profile } from '@/lib/types';

interface ContactProps {
  profile: Profile;
}

export default function Contact({ profile }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.message || 'Failed to send message.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let&apos;s Connect & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">Build Together</span>
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl text-sm sm:text-base">
            Open for software development roles, full-stack client projects, CMS solutions, and technical collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <a
              href={`mailto:${profile.email}`}
              className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-5 sm:p-6 flex items-center gap-4 hover:border-emerald-500/40 hover:bg-slate-900 transition-all duration-300 group shadow-lg min-w-0"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider">Email Direct</div>
                <div className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                  {profile.email}
                </div>
              </div>
            </a>

            {/* Phone Card */}
            <a
              href={`tel:${profile.phone}`}
              className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-5 sm:p-6 flex items-center gap-4 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 group shadow-lg min-w-0"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider">Phone / Call</div>
                <div className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                  {profile.phone}
                </div>
              </div>
            </a>

            {/* Location Card */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl p-5 sm:p-6 flex items-center gap-4 shadow-lg min-w-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[11px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider">Location</div>
                <div className="text-sm sm:text-base font-bold text-white truncate">
                  {profile.location}
                </div>
              </div>
            </div>

            {/* Professional Social Buttons */}
            <div className="pt-2 grid grid-cols-2 gap-3">
              <a
                href={profile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 sm:p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-semibold text-slate-200 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              >
                <LinkedInIcon className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>LinkedIn</span>
              </a>

              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 sm:p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-semibold text-slate-200 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              >
                <GitHubIcon className="w-4 h-4 text-slate-200 shrink-0" />
                <span>GitHub</span>
              </a>
            </div>

          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">Send a Message</h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Fill out the form below to reach Dhanush directly.
            </p>

            {status && (
              <div
                className={`p-3.5 sm:p-4 rounded-xl mb-6 text-xs sm:text-sm flex items-center gap-3 ${
                  status.type === 'success'
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                    : 'bg-red-500/10 border border-red-500/30 text-red-300'
                }`}
              >
                {status.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-base sm:text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-base sm:text-sm transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Full-Stack Web Development Inquiry"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-base sm:text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about your project, role, or collaboration..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 text-base sm:text-sm transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white shadow-xl shadow-cyan-500/20 disabled:opacity-50 transition-all active:scale-[0.98]"
              >
                {loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
