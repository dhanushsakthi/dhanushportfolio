'use client';

import React, { useEffect, useState } from 'react';
import { GraduationCap, Plus, Edit, Trash2, X } from 'lucide-react';
import { Education } from '@/lib/types';

export default function EducationAdmin() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);

  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    degree: '',
    institution: '',
    location: '',
    score: '',
    startDate: '',
    endDate: '',
    details: ''
  });

  useEffect(() => {
    fetchEdu();
  }, []);

  const fetchEdu = () => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setEducation(data.education || []);
        setLoading(false);
      });
  };

  const handleOpenAdd = () => {
    setEditingEdu(null);
    setFormData({
      degree: '',
      institution: '',
      location: '',
      score: '',
      startDate: '',
      endDate: '',
      details: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (edu: Education) => {
    setEditingEdu(edu);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      score: edu.score,
      startDate: edu.startDate,
      endDate: edu.endDate,
      details: edu.details || ''
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEdu) {
        await fetch('/api/education', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: editingEdu.id })
        });
      } else {
        await fetch('/api/education', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      setIsModalOpen(false);
      fetchEdu();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return;
    try {
      await fetch(`/api/education?id=${id}`, { method: 'DELETE' });
      fetchEdu();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-400 text-xs animate-pulse">Loading Education CMS...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-purple-400" />
            <span>Education Management</span>
          </h1>
          <p className="text-xs text-slate-400">
            Manage academic degrees, school history, and CGPA scores
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {education.map((e) => (
          <div key={e.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase">{e.score}</span>
                <h3 className="text-base font-bold text-white">{e.degree}</h3>
                <p className="text-xs text-slate-300 font-medium">{e.institution}</p>
                <p className="text-[11px] text-slate-400">{e.startDate} – {e.endDate} • {e.location}</p>
              </div>

              <div className="flex items-center gap-1">
                <button onClick={() => handleOpenEdit(e)} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(e.id)} className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white">{editingEdu ? 'Edit Education' : 'Add Education'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Degree / Certificate *</label>
                <input
                  type="text"
                  required
                  value={formData.degree}
                  onChange={e => setFormData({ ...formData, degree: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Institution Name *</label>
                <input
                  type="text"
                  required
                  value={formData.institution}
                  onChange={e => setFormData({ ...formData, institution: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">CGPA / Marks Score</label>
                  <input
                    type="text"
                    placeholder="e.g. CGPA: 8.5"
                    value={formData.score}
                    onChange={e => setFormData({ ...formData, score: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Start Year *</label>
                  <input
                    type="text"
                    required
                    value={formData.startDate}
                    onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">End Year *</label>
                  <input
                    type="text"
                    required
                    value={formData.endDate}
                    onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold">
                  Save Education
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
