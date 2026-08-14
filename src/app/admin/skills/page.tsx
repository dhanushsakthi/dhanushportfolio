'use client';

import React, { useEffect, useState } from 'react';
import { Code, Plus, Edit, Trash2, X, Terminal, Database, Bot, Wrench } from 'lucide-react';
import { Skill } from '@/lib/types';

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const [formData, setFormData] = useState<Omit<Skill, 'id' | 'order'>>({
    name: '',
    category: 'Programming',
    level: 'Advanced'
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = () => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setSkills(data.skills || []);
        setLoading(false);
      });
  };

  const handleOpenAdd = () => {
    setEditingSkill(null);
    setFormData({ name: '', category: 'Programming', level: 'Advanced' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({ name: skill.name, category: skill.category, level: skill.level || 'Advanced' });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await fetch('/api/skills', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: editingSkill.id, order: editingSkill.order })
        });
      } else {
        await fetch('/api/skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await fetch(`/api/skills?id=${id}`, { method: 'DELETE' });
      fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-400 text-xs animate-pulse">Loading Skills CMS...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Code className="w-6 h-6 text-indigo-400" />
            <span>Skills & Tech Stack Management</span>
          </h1>
          <p className="text-xs text-slate-400">
            Add, update, or reorganize programming languages, tools, and categories
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {skills.map((s) => (
          <div
            key={s.id}
            className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-3 hover:border-indigo-500/40 transition-all"
          >
            <div>
              <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">{s.category}</span>
              <h3 className="text-sm font-bold text-white">{s.name}</h3>
              {s.level && <span className="text-[10px] text-slate-400">{s.level}</span>}
            </div>

            <div className="flex items-center gap-1">
              <button onClick={() => handleOpenEdit(s)} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white">{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Skill Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Category *</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                >
                  <option value="Programming">Programming</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Database">Database</option>
                  <option value="AI / Data">AI / Data</option>
                  <option value="Tools & Platforms">Tools & Platforms</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Proficiency Level</label>
                <select
                  value={formData.level}
                  onChange={e => setFormData({ ...formData, level: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                >
                  <option value="Expert">Expert</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Intermediate">Intermediate</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold">
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
