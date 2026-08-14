'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Sparkles, Plus, Edit, Trash2, Upload, ExternalLink, Check, X, Layers } from 'lucide-react';
import { GitHubIcon } from '@/components/BrandIcons';
import { Project } from '@/lib/types';

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState<Omit<Project, 'id' | 'order'>>({
    title: '',
    shortDescription: '',
    detailedDescription: '',
    category: 'E-Commerce',
    technologies: [],
    role: '',
    clientContext: '',
    imageUrl: '/certificates/FULL-STACK (LINKED-IN).jpg',
    screenshots: [],
    liveDemoUrl: '',
    githubUrl: '',
    isFeatured: true
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || []);
        setLoading(false);
      });
  };

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      shortDescription: '',
      detailedDescription: '',
      category: 'E-Commerce',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      role: 'Full-Stack Developer',
      clientContext: 'Client Project',
      imageUrl: '/certificates/FULL-STACK (LINKED-IN).jpg',
      screenshots: [],
      liveDemoUrl: '',
      githubUrl: '',
      isFeatured: false
    });
    setTechInput('HTML, CSS, JavaScript');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      shortDescription: project.shortDescription,
      detailedDescription: project.detailedDescription,
      category: project.category,
      technologies: project.technologies,
      role: project.role,
      clientContext: project.clientContext,
      imageUrl: project.imageUrl,
      screenshots: project.screenshots,
      liveDemoUrl: project.liveDemoUrl || '',
      githubUrl: project.githubUrl || '',
      isFeatured: project.isFeatured
    });
    setTechInput(project.technologies.join(', '));
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const body = new FormData();
    body.append('file', file);
    body.append('folderType', 'uploads');

    try {
      const res = await fetch('/api/upload', { method: 'POST', body });
      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = techInput.split(',').map(t => t.trim()).filter(Boolean);

    const payload = {
      ...formData,
      technologies: techArray
    };

    try {
      if (editingProject) {
        await fetch('/api/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, id: editingProject.id })
        });
      } else {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-400 text-xs animate-pulse">Loading Projects CMS...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <span>Projects Management</span>
          </h1>
          <p className="text-xs text-slate-400">
            Add, edit, or remove showcase projects, demo URLs, and descriptions
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div
            key={p.id}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                <Image src={p.imageUrl || '/certificates/FULL-STACK (LINKED-IN).jpg'} alt={p.title} fill className="object-cover" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {p.category}
                  </span>
                  {p.isFeatured && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white">{p.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{p.shortDescription}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {p.liveDemoUrl && (
                  <a href={p.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5" /> Demo
                  </a>
                )}
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 flex items-center gap-1">
                    <GitHubIcon className="w-3.5 h-3.5" /> Repo
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Category *</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="CMS">CMS</option>
                    <option value="AI / ML">AI / ML</option>
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="Client Work">Client Work</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Short Summary *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Detailed Description</label>
                <textarea
                  rows={4}
                  value={formData.detailedDescription}
                  onChange={e => setFormData({ ...formData, detailedDescription: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Live Demo URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={formData.liveDemoUrl}
                    onChange={e => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">GitHub Repository URL</label>
                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={formData.githubUrl}
                    onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Client / Company Context</label>
                  <input
                    type="text"
                    value={formData.clientContext}
                    onChange={e => setFormData({ ...formData, clientContext: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Technologies (Comma Separated)</label>
                <input
                  type="text"
                  value={techInput}
                  onChange={e => setTechInput(e.target.value)}
                  placeholder="React, Next.js, Tailwind CSS, PHP"
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="inline-flex items-center gap-2 p-3 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer">
                  <Upload className="w-4 h-4 text-cyan-400" />
                  <span>Upload Image</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>

                <label className="inline-flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded accent-cyan-500"
                  />
                  <span>Featured Project</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
