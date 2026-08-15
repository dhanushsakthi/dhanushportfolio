'use client';

import React, { useEffect, useState } from 'react';
import { Film, Plus, Edit2, Trash2, Video, Image as ImageIcon, Eye, EyeOff, Sparkles, AlertTriangle, CheckCircle2, Upload, X, ArrowUp, ArrowDown } from 'lucide-react';
import { YouTubeIcon } from '@/components/BrandIcons';
import { Project, ProjectRole, ProjectType, VideoSourceType } from '@/lib/types';
import VideoPlayer from '@/components/VideoPlayer';

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  // Form State
  const [form, setForm] = useState<Partial<Project>>({
    title: '',
    slug: '',
    shortDescription: '',
    detailedDescription: '',
    logline: '',
    role: 'Director',
    projectType: 'Directed Film',
    year: '2026',
    genre: 'Thriller',
    duration: '',
    director: 'Dhanush S',
    credits: '',
    cast: '',
    crew: '',
    poster: '',
    coverImage: '',
    videoSourceType: 'youtube',
    youtubeUrl: '',
    cloudinaryUrl: '',
    screenshots: [],
    isFeatured: true,
    published: true,
    order: 1
  });

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setForm({
      title: '',
      slug: '',
      shortDescription: '',
      detailedDescription: '',
      logline: '',
      role: 'Director',
      projectType: 'Directed Film',
      year: new Date().getFullYear().toString(),
      genre: 'Drama',
      duration: '',
      director: 'Dhanush S',
      credits: '',
      cast: '',
      crew: '',
      poster: '',
      coverImage: '',
      videoSourceType: 'youtube',
      youtubeUrl: '',
      cloudinaryUrl: '',
      screenshots: [],
      isFeatured: true,
      published: true,
      order: projects.length + 1
    });
    setIsModalOpen(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingProject(proj);
    setForm({
      ...proj,
      poster: proj.poster || proj.imageUrl || '',
      videoSourceType: proj.videoSourceType || 'youtube',
      screenshots: proj.screenshots || []
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: 'poster' | 'coverImage' | 'cloudinaryVideo' | 'gallery') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingMedia(true);
    setUploadProgress(25);

    try {
      if (targetField === 'gallery') {
        const uploadedUrls: string[] = [...(form.screenshots || [])];
        for (let i = 0; i < files.length; i++) {
          const formData = new FormData();
          formData.append('file', files[i]);
          formData.append('folderType', 'gallery');

          setUploadProgress(Math.round(((i + 1) / files.length) * 100));

          const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          });
          const data = await res.json();
          if (data.success && data.url) {
            uploadedUrls.push(data.url);
          }
        }
        setForm(prev => ({ ...prev, screenshots: uploadedUrls }));
      } else {
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folderType', targetField === 'cloudinaryVideo' ? 'videos' : 'posters');

        setUploadProgress(65);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const data = await res.json();

        setUploadProgress(100);

        if (data.success && data.url) {
          if (targetField === 'poster') {
            setForm(prev => ({ ...prev, poster: data.url, imageUrl: data.url }));
          } else if (targetField === 'coverImage') {
            setForm(prev => ({ ...prev, coverImage: data.url }));
          } else if (targetField === 'cloudinaryVideo') {
            setForm(prev => ({
              ...prev,
              cloudinaryUrl: data.url,
              cloudinaryPublicId: data.publicId,
              videoSourceType: 'cloudinary'
            }));
          }
        } else {
          alert(data.message || 'Cloudinary upload failed');
        }
      }
    } catch (err: any) {
      alert('Upload error: ' + (err?.message || 'Server error'));
    } finally {
      setUploadingMedia(false);
      setUploadProgress(0);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      alert('Title is required');
      return;
    }

    try {
      const payload = {
        ...form,
        imageUrl: form.poster || form.imageUrl || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
        screenshots: form.screenshots || []
      };

      const method = editingProject ? 'PUT' : 'POST';
      const res = await fetch('/api/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject ? { ...payload, id: editingProject.id } : payload)
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        fetchProjects();
      } else {
        alert(data.message || 'Operation failed');
      }
    } catch (err) {
      alert('Error saving project');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setDeleteConfirmId(null);
        fetchProjects();
      } else {
        alert(data.message || 'Failed to delete');
      }
    } catch (err) {
      alert('Delete error');
    }
  };

  const filteredProjects = projects.filter(p => {
    if (filterCategory === 'DIRECTED') return p.projectType === 'Directed Film' || p.role === 'Director';
    if (filterCategory === 'AD_WORK') return p.projectType === 'Assistant Director Work' || p.role === 'Assistant Director';
    if (filterCategory === 'SHORT_FILMS') return p.projectType === 'Short Film';
    return true;
  });

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-black text-white uppercase tracking-wider">Filmography CMS</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage Directed Films, Assistant Director Projects, Short Films, Videos & Stills
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Film / Project</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'ALL', label: 'All Projects' },
          { id: 'DIRECTED', label: 'Directed By Dhanush' },
          { id: 'AD_WORK', label: 'Assistant Director Work' },
          { id: 'SHORT_FILMS', label: 'Short Films' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterCategory === tab.id
                ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label} ({
              tab.id === 'ALL' ? projects.length :
              tab.id === 'DIRECTED' ? projects.filter(p => p.projectType === 'Directed Film' || p.role === 'Director').length :
              tab.id === 'AD_WORK' ? projects.filter(p => p.projectType === 'Assistant Director Work' || p.role === 'Assistant Director').length :
              projects.filter(p => p.projectType === 'Short Film').length
            })
          </button>
        ))}
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-xs animate-pulse">Loading filmography...</div>
      ) : filteredProjects.length === 0 ? (
        <div className="py-16 text-center bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 space-y-3">
          <Film className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-slate-300">No films found in this category</h3>
          <p className="text-xs text-slate-500">Click "Add New Film" to add a new project to your CMS.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(proj => (
            <div key={proj.id} className="bg-slate-900/80 border border-slate-800/80 rounded-3xl overflow-hidden hover:border-slate-700 transition-all flex flex-col group">
              
              {/* Media Preview Header */}
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                {proj.poster || proj.imageUrl ? (
                  <img
                    src={proj.poster || proj.imageUrl}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-950 text-slate-700">
                    <Film className="w-10 h-10" />
                  </div>
                )}

                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                    {proj.projectType || 'Film'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 text-amber-300 border border-amber-500/30">
                    {proj.role || 'Director'}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1">
                  {proj.published ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Published
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                      <EyeOff className="w-3 h-3" /> Draft
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>{proj.year || '2026'} • {proj.genre || 'Film'}</span>
                    {proj.duration && <span className="font-semibold text-cyan-400">{proj.duration}</span>}
                  </div>
                  <h3 className="text-lg font-black text-white line-clamp-1">{proj.title}</h3>
                  {proj.logline && <p className="text-xs text-cyan-300 italic line-clamp-2 mt-1">"{proj.logline}"</p>}
                  <p className="text-xs text-slate-400 line-clamp-2 mt-2">{proj.shortDescription}</p>
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="text-[10px] text-slate-500 font-mono">Order: #{proj.order}</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(proj)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700 transition-colors"
                      title="Edit Film Project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(proj.id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors"
                      title="Delete Film"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-extrabold text-white">Delete Film Project?</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Are you sure you want to delete this film project from your CMS? This action cannot be easily undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Film Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full my-8 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-black text-white">
                  {editingProject ? 'Edit Film Project' : 'Add New Film Project'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              
              {/* Basic Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-cyan-400">1. Film Title & Category</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Film Title *</label>
                    <input
                      type="text"
                      required
                      value={form.title || ''}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g. LOCK-IN"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Project Type *</label>
                    <select
                      value={form.projectType || 'Directed Film'}
                      onChange={e => setForm({ ...form, projectType: e.target.value as ProjectType })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 outline-none"
                    >
                      <option value="Directed Film">Directed Film</option>
                      <option value="Assistant Director Work">Assistant Director Work</option>
                      <option value="Short Film">Short Film</option>
                      <option value="Feature Film">Feature Film</option>
                      <option value="Music Video">Music Video</option>
                      <option value="Advertisement">Advertisement</option>
                      <option value="Experimental Film">Experimental Film</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">My Primary Role *</label>
                    <select
                      value={form.role || 'Director'}
                      onChange={e => setForm({ ...form, role: e.target.value as ProjectRole })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 outline-none"
                    >
                      <option value="Director">Director</option>
                      <option value="Assistant Director">Assistant Director</option>
                      <option value="Writer">Writer</option>
                      <option value="Screenwriter">Screenwriter</option>
                      <option value="Cinematographer">Cinematographer</option>
                      <option value="Editor">Editor</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Release Year</label>
                    <input
                      type="text"
                      value={form.year || ''}
                      onChange={e => setForm({ ...form, year: e.target.value })}
                      placeholder="2026"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Genre</label>
                    <input
                      type="text"
                      value={form.genre || ''}
                      onChange={e => setForm({ ...form, genre: e.target.value })}
                      placeholder="Thriller / Drama"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Logline (One line Hook)</label>
                  <input
                    type="text"
                    value={form.logline || ''}
                    onChange={e => setForm({ ...form, logline: e.target.value })}
                    placeholder="An ambitious engineer gets trapped inside an abandoned lab overnight..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Short Synopsis</label>
                  <textarea
                    rows={2}
                    value={form.shortDescription || ''}
                    onChange={e => setForm({ ...form, shortDescription: e.target.value })}
                    placeholder="Brief summary for portfolio cards..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Detailed Description / Production Notes</label>
                  <textarea
                    rows={4}
                    value={form.detailedDescription || ''}
                    onChange={e => setForm({ ...form, detailedDescription: e.target.value })}
                    placeholder="Full story description, behind-the-scenes breakdown, festival details..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>

              {/* Video System */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-black uppercase tracking-wider text-cyan-400">2. Video Source (YouTube or Cloudinary)</h4>
                
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-white">
                    <input
                      type="radio"
                      name="videoSourceType"
                      value="youtube"
                      checked={form.videoSourceType === 'youtube'}
                      onChange={() => setForm({ ...form, videoSourceType: 'youtube' })}
                      className="accent-cyan-500"
                    />
                    <YouTubeIcon className="w-4 h-4 text-red-500" />
                    <span>YouTube URL</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-white">
                    <input
                      type="radio"
                      name="videoSourceType"
                      value="cloudinary"
                      checked={form.videoSourceType === 'cloudinary'}
                      onChange={() => setForm({ ...form, videoSourceType: 'cloudinary' })}
                      className="accent-cyan-500"
                    />
                    <Video className="w-4 h-4 text-cyan-400" />
                    <span>Cloudinary Upload</span>
                  </label>
                </div>

                {form.videoSourceType === 'youtube' ? (
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">YouTube Video Link</label>
                    <input
                      type="text"
                      value={form.youtubeUrl || ''}
                      onChange={e => setForm({ ...form, youtubeUrl: e.target.value })}
                      placeholder="https://www.youtube.com/watch?v=XXXXXXXX"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-cyan-500 outline-none"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="block text-slate-400 font-semibold mb-1">Upload Video File to Cloudinary</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={e => handleFileUpload(e, 'cloudinaryVideo')}
                      className="block w-full text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30"
                    />
                    {form.cloudinaryUrl && (
                      <p className="text-[11px] text-emerald-400 font-mono line-clamp-1">✓ Cloudinary Video: {form.cloudinaryUrl}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Media Uploads */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-black uppercase tracking-wider text-cyan-400">3. Posters & Gallery Stills</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Film Poster (Cloudinary)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleFileUpload(e, 'poster')}
                      className="block w-full text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-slate-200"
                    />
                    {form.poster && (
                      <img src={form.poster} alt="Poster preview" className="w-24 h-36 object-cover rounded-xl border border-slate-800 mt-2" />
                    )}
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Multiple Gallery Stills (BTS / Stills)</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={e => handleFileUpload(e, 'gallery')}
                      className="block w-full text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-slate-200"
                    />
                    {form.screenshots && form.screenshots.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {form.screenshots.map((url, idx) => (
                          <div key={idx} className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-800 group">
                            <img src={url} alt={`Still ${idx}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setForm(prev => ({ ...prev, screenshots: prev.screenshots?.filter((_, i) => i !== idx) }))}
                              className="absolute top-0.5 right-0.5 bg-red-600 text-white rounded-full p-0.5"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {uploadingMedia && (
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold text-cyan-300">
                      <span>Uploading to Cloudinary...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Status & Display Toggles */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-black uppercase tracking-wider text-cyan-400">4. Status & Display Order</h4>
                
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-white">
                    <input
                      type="checkbox"
                      checked={form.published ?? true}
                      onChange={e => setForm({ ...form, published: e.target.checked })}
                      className="w-4 h-4 accent-cyan-500 rounded"
                    />
                    <span>Published On Portfolio</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-white">
                    <input
                      type="checkbox"
                      checked={form.isFeatured ?? true}
                      onChange={e => setForm({ ...form, isFeatured: e.target.checked })}
                      className="w-4 h-4 accent-cyan-500 rounded"
                    />
                    <span>Featured Project</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <label className="text-slate-400 font-semibold">Display Order:</label>
                    <input
                      type="number"
                      value={form.order || 1}
                      onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 1 })}
                      className="w-16 px-2 py-1 bg-slate-950 border border-slate-800 rounded-lg text-white font-bold text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingMedia}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold shadow-lg shadow-cyan-500/25 disabled:opacity-50"
                >
                  Save Film Project
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
