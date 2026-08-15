'use client';

import React, { useEffect, useState } from 'react';
import { Trophy, Plus, Edit2, Trash2, Upload, Eye, EyeOff, AlertTriangle, X, Award as AwardIcon } from 'lucide-react';
import { Award } from '@/lib/types';

export default function AdminAwards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAward, setEditingAward] = useState<Award | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [form, setForm] = useState<Partial<Award>>({
    awardName: '',
    organization: '',
    filmProject: '',
    category: '',
    year: '2026',
    description: '',
    certificateUrl: '',
    position: 'Winner',
    featured: true,
    published: true,
    order: 1
  });

  const fetchAwards = async () => {
    try {
      const res = await fetch('/api/awards');
      const data = await res.json();
      if (data.success) {
        setAwards(data.awards || []);
      }
    } catch (err) {
      console.error('Error fetching awards:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  const openCreateModal = () => {
    setEditingAward(null);
    setForm({
      awardName: '',
      organization: '',
      filmProject: '',
      category: 'Directing',
      year: new Date().getFullYear().toString(),
      description: '',
      certificateUrl: '',
      position: 'Winner',
      featured: true,
      published: true,
      order: awards.length + 1
    });
    setIsModalOpen(true);
  };

  const openEditModal = (aw: Award) => {
    setEditingAward(aw);
    setForm({ ...aw });
    setIsModalOpen(true);
  };

  const handleCertificateUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('folderType', 'awards');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        setForm(prev => ({ ...prev, certificateUrl: data.url }));
      } else {
        alert(data.message || 'Upload failed');
      }
    } catch (err) {
      alert('Error uploading certificate image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.awardName || !form.organization) {
      alert('Award Name and Organization are required');
      return;
    }

    try {
      const method = editingAward ? 'PUT' : 'POST';
      const res = await fetch('/api/awards', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingAward ? { ...form, id: editingAward.id } : form)
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        fetchAwards();
      } else {
        alert(data.message || 'Save failed');
      }
    } catch (err) {
      alert('Error saving award');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/awards?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setDeleteConfirmId(null);
        fetchAwards();
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (err) {
      alert('Error deleting award');
    }
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-black text-white uppercase tracking-wider">Awards & Honors CMS</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage Film Festival Accolades, Best Director Laurels & Industry Honors
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Film Award</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-xs animate-pulse">Loading film awards...</div>
      ) : awards.length === 0 ? (
        <div className="py-16 text-center bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 space-y-3">
          <Trophy className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-slate-300">No awards added yet</h3>
          <p className="text-xs text-slate-500">Click "Add Film Award" to add laurels and certificates to your portfolio.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map(aw => (
            <div key={aw.id} className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {aw.position || 'Winner'} • {aw.year}
                  </span>
                  {aw.published ? (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1"><Eye className="w-3 h-3" /> Published</span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1"><EyeOff className="w-3 h-3" /> Draft</span>
                  )}
                </div>

                {aw.certificateUrl && (
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                    <img src={aw.certificateUrl} alt={aw.awardName} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                )}

                <div>
                  <h3 className="text-base font-black text-white">{aw.awardName}</h3>
                  <p className="text-xs text-amber-300/90 font-semibold">{aw.organization}</p>
                  {aw.filmProject && <p className="text-xs text-slate-400 italic mt-0.5">Film: {aw.filmProject}</p>}
                  {aw.description && <p className="text-xs text-slate-400 line-clamp-2 mt-2">{aw.description}</p>}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">Order: #{aw.order}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(aw)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(aw.id)}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-extrabold text-white">Delete Award Entry?</h3>
            </div>
            <p className="text-xs text-slate-400">This action will remove the award entry from your public portfolio.</p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirmId)} className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold shadow-lg shadow-red-600/30">Delete Permanently</button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col">
            
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-black text-white">{editingAward ? 'Edit Award' : 'Add Award'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs overflow-y-auto max-h-[80vh]">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Award Title *</label>
                <input
                  type="text"
                  required
                  value={form.awardName || ''}
                  onChange={e => setForm({ ...form, awardName: e.target.value })}
                  placeholder="e.g. Best Short Film Director"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Organization / Film Festival *</label>
                <input
                  type="text"
                  required
                  value={form.organization || ''}
                  onChange={e => setForm({ ...form, organization: e.target.value })}
                  placeholder="e.g. Chennai Indie Film Festival"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Associated Film</label>
                  <input
                    type="text"
                    value={form.filmProject || ''}
                    onChange={e => setForm({ ...form, filmProject: e.target.value })}
                    placeholder="LOCK-IN"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Year</label>
                  <input
                    type="text"
                    value={form.year || '2026'}
                    onChange={e => setForm({ ...form, year: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Upload Certificate / Laurel (Cloudinary)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCertificateUpload}
                  className="block w-full text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500/20 file:text-amber-300"
                />
                {uploadingImage && <p className="text-[11px] text-amber-400 mt-1">Uploading certificate...</p>}
                {form.certificateUrl && (
                  <img src={form.certificateUrl} alt="Certificate preview" className="w-24 h-16 object-cover rounded-lg border border-slate-800 mt-2" />
                )}
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Description / Details</label>
                <textarea
                  rows={2}
                  value={form.description || ''}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Award context or citation text..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-500 outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-white font-bold">
                  <input
                    type="checkbox"
                    checked={form.published ?? true}
                    onChange={e => setForm({ ...form, published: e.target.checked })}
                    className="accent-amber-500"
                  />
                  <span>Published</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-white font-bold">
                  <input
                    type="checkbox"
                    checked={form.featured ?? true}
                    onChange={e => setForm({ ...form, featured: e.target.checked })}
                    className="accent-amber-500"
                  />
                  <span>Featured</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold">Cancel</button>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/25">Save Award</button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
