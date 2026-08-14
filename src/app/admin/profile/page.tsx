'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Save, Upload, User, Mail, Phone, MapPin, FileText, CheckCircle2, AlertCircle, Key } from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '@/components/BrandIcons';
import { Profile, SiteSettings } from '@/lib/types';

export default function ProfileAdmin() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<string>('');

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setProfile(data.profile);
        setSiteSettings(data.siteSettings);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folderType', 'uploads');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setProfile({ ...profile, photoUrl: data.url });
        setStatus({ type: 'success', message: 'Profile photo uploaded! Don\'t forget to click Save Changes.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to upload photo.' });
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folderType', 'uploads');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setProfile({ ...profile, resumePdfUrl: data.url });
        setStatus({ type: 'success', message: 'Resume PDF uploaded! Don\'t forget to click Save Changes.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Failed to upload resume PDF.' });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    setStatus(null);

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, siteSettings })
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ type: 'success', message: 'Profile and contact information updated successfully!' });
      } else {
        setStatus({ type: 'error', message: data.message || 'Failed to save changes.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'An unexpected error occurred.' });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setPasswordStatus('Password must be at least 6 characters');
      return;
    }

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'change-password', newPassword })
      });
      const data = await res.json();
      if (data.success) {
        setPasswordStatus('Password updated successfully!');
        setNewPassword('');
      } else {
        setPasswordStatus(data.message || 'Failed to update password');
      }
    } catch (err) {
      setPasswordStatus('Failed to update password');
    }
  };

  if (loading || !profile) {
    return <div className="py-20 text-center text-slate-400 text-xs animate-pulse">Loading Profile CMS...</div>;
  }

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <User className="w-6 h-6 text-cyan-400" />
            <span>Profile & Resume Management</span>
          </h1>
          <p className="text-xs text-slate-400">
            Manage your headline, about summary, contact details, profile image, and resume PDF
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
        </button>
      </div>

      {status && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-3 ${
            status.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/10 border border-red-500/30 text-red-300'
          }`}
        >
          {status.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Media Assets Section */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-3">
            Media & File Management
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Photo Uploader */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300">Profile Photo</label>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-slate-950 border border-slate-700">
                  {profile.photoUrl ? (
                    <Image src={profile.photoUrl} alt="Preview" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">No Photo</div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 text-cyan-400" />
                    <span>Upload New Photo</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                  <p className="text-[11px] text-slate-400">JPG, PNG or WEBP (Max 10MB)</p>
                </div>
              </div>
            </div>

            {/* Resume Uploader */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300">Resume PDF File</label>
              <div className="space-y-2">
                {profile.resumePdfUrl && (
                  <a
                    href={profile.resumePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-cyan-400 hover:underline font-semibold bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Current Resume PDF</span>
                  </a>
                )}

                <div>
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Upload & Replace Resume PDF</span>
                    <input type="file" accept="application/pdf" onChange={handleResumeUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Profile Info Section */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-3">
            Personal Information & Headline
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Professional Headline</label>
              <input
                type="text"
                value={profile.headline}
                onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Hero Tagline</label>
            <input
              type="text"
              value={profile.tagline}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">About Bio / Professional Summary</label>
            <textarea
              rows={5}
              value={profile.about}
              onChange={(e) => setProfile({ ...profile, about: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 outline-none resize-none"
            />
          </div>
        </div>

        {/* Contact & Social Links */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-3">
            Contact & Social URLs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">LinkedIn Profile URL</label>
              <input
                type="text"
                value={profile.linkedInUrl}
                onChange={(e) => setProfile({ ...profile, linkedInUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">GitHub Profile URL</label>
              <input
                type="text"
                value={profile.githubUrl}
                onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 outline-none"
              />
            </div>
          </div>
        </div>

      </form>

      {/* Admin Password Change Form */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-3 flex items-center gap-2">
          <Key className="w-4 h-4" />
          <span>Change Admin Password</span>
        </h2>

        {passwordStatus && (
          <div className="text-xs text-cyan-400 font-medium">{passwordStatus}</div>
        )}

        <form onSubmit={handleChangePassword} className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="password"
            placeholder="Enter new password (min 6 chars)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full sm:w-80 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-cyan-500 outline-none"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
          >
            Update Password
          </button>
        </form>
      </div>

    </div>
  );
}
