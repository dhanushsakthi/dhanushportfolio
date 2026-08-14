'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Award, Plus, Edit, Trash2, Upload, FileText, ExternalLink, X, CheckCircle } from 'lucide-react';
import { Certification } from '@/lib/types';

export default function CertificationsAdmin() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);

  const [formData, setFormData] = useState<Omit<Certification, 'id' | 'order'>>({
    title: '',
    issuer: '',
    issueDate: '',
    credentialId: '',
    imageUrl: '/certificates/agentic-ai.jpg',
    pdfUrl: '',
    verificationUrl: '',
    description: ''
  });

  useEffect(() => {
    fetchCerts();
  }, []);

  const fetchCerts = () => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setCertifications(data.certifications || []);
        setLoading(false);
      });
  };

  const handleOpenAdd = () => {
    setEditingCert(null);
    setFormData({
      title: '',
      issuer: '',
      issueDate: new Date().getFullYear().toString(),
      credentialId: '',
      imageUrl: '/certificates/agentic-ai.jpg',
      pdfUrl: '',
      verificationUrl: '',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert: Certification) => {
    setEditingCert(cert);
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      issueDate: cert.issueDate,
      credentialId: cert.credentialId || '',
      imageUrl: cert.imageUrl,
      pdfUrl: cert.pdfUrl || '',
      verificationUrl: cert.verificationUrl || '',
      description: cert.description || ''
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const body = new FormData();
    body.append('file', file);
    body.append('folderType', 'certificates');

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

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const body = new FormData();
    body.append('file', file);
    body.append('folderType', 'uploads');

    try {
      const res = await fetch('/api/upload', { method: 'POST', body });
      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, pdfUrl: data.url }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingCert) {
        await fetch('/api/certifications', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: editingCert.id, order: editingCert.order })
        });
      } else {
        await fetch('/api/certifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      setIsModalOpen(false);
      fetchCerts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) return;
    try {
      await fetch(`/api/certifications?id=${id}`, { method: 'DELETE' });
      fetchCerts();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-400 text-xs animate-pulse">Loading Certifications CMS...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            <span>Certifications Management</span>
          </h1>
          <p className="text-xs text-slate-400">
            Upload certificate images, PDF documents, issue dates, and issuers
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-cyan-500 hover:from-amber-400 hover:to-cyan-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certificate</span>
        </button>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {certifications.map((c) => (
          <div
            key={c.id}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-amber-500/40 transition-all"
          >
            <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <Image src={c.imageUrl} alt={c.title} fill className="object-cover" />
            </div>

            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">{c.issuer}</span>
              <h3 className="text-sm font-bold text-white line-clamp-1">{c.title}</h3>
              <p className="text-[11px] text-slate-400">{c.issueDate}</p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(c)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(c.id)}
                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white">
                {editingCert ? 'Edit Certification' : 'Add New Certification'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Certificate Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Issuing Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.issuer}
                    onChange={e => setFormData({ ...formData, issuer: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Issue Date *</label>
                  <input
                    type="text"
                    required
                    value={formData.issueDate}
                    onChange={e => setFormData({ ...formData, issueDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Verification URL</label>
                <input
                  type="text"
                  value={formData.verificationUrl}
                  onChange={e => setFormData({ ...formData, verificationUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className="inline-flex items-center gap-2 p-2.5 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>Upload Image</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>

                <label className="inline-flex items-center gap-2 p-2.5 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Upload PDF</span>
                  <input type="file" accept="application/pdf" onChange={handlePdfUpload} className="hidden" />
                </label>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 font-bold"
                >
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
