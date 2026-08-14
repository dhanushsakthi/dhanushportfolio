'use client';

import React, { useEffect, useState } from 'react';
import { Briefcase, Plus, Edit, Trash2, X } from 'lucide-react';
import { Experience } from '@/lib/types';

export default function ExperienceAdmin() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  const [formData, setFormData] = useState<Omit<Experience, 'id'>>({
    role: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    type: 'Full-time',
    highlights: [],
    technologies: []
  });
  const [highlightsInput, setHighlightsInput] = useState('');
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = () => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setExperience(data.experience || []);
        setLoading(false);
      });
  };

  const handleOpenAdd = () => {
    setEditingExp(null);
    setFormData({
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: 'Present',
      isCurrent: true,
      type: 'Full-time',
      highlights: [],
      technologies: []
    });
    setHighlightsInput('');
    setTechInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp: Experience) => {
    setEditingExp(exp);
    setFormData({
      role: exp.role,
      company: exp.company,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate,
      isCurrent: exp.isCurrent,
      type: exp.type,
      highlights: exp.highlights,
      technologies: exp.technologies
    });
    setHighlightsInput(exp.highlights.join('\n'));
    setTechInput(exp.technologies.join(', '));
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const highlightsArray = highlightsInput.split('\n').map(h => h.trim()).filter(Boolean);
    const techArray = techInput.split(',').map(t => t.trim()).filter(Boolean);

    const payload = {
      ...formData,
      highlights: highlightsArray,
      technologies: techArray
    };

    try {
      if (editingExp) {
        await fetch('/api/experience', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, id: editingExp.id })
        });
      } else {
        await fetch('/api/experience', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      setIsModalOpen(false);
      fetchExperience();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience entry?')) return;
    try {
      await fetch(`/api/experience?id=${id}`, { method: 'DELETE' });
      fetchExperience();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-400 text-xs animate-pulse">Loading Experience CMS...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-cyan-400" />
            <span>Experience Management</span>
          </h1>
          <p className="text-xs text-slate-400">
            Manage full-time, freelance, and internship timeline history
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-4">
        {experience.map((e) => (
          <div key={e.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">{e.type}</span>
                <h3 className="text-lg font-bold text-white">{e.role}</h3>
                <p className="text-xs text-slate-300 font-medium">{e.company} • {e.startDate} – {e.endDate}</p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => handleOpenEdit(e)} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(e.id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
              {e.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white">{editingExp ? 'Edit Experience' : 'Add Experience'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Job Title / Role *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Type</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Start Date *</label>
                  <input
                    type="text"
                    required
                    value={formData.startDate}
                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">End Date *</label>
                  <input
                    type="text"
                    required
                    value={formData.endDate}
                    onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Key Bullet Highlights (One per line)</label>
                <textarea
                  rows={4}
                  value={highlightsInput}
                  onChange={e => setHighlightsInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Technologies (Comma Separated)</label>
                <input
                  type="text"
                  value={techInput}
                  onChange={e => setTechInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold">
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
