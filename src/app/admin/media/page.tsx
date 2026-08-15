'use client';

import React, { useEffect, useState } from 'react';
import { Image as ImageIcon, Video, Trash2, Copy, Upload, Search, Check, AlertTriangle, X } from 'lucide-react';
import { MediaItem } from '@/lib/types';

export default function MediaLibrary() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'image' | 'video'>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirmPublicId, setDeleteConfirmPublicId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchMedia = async () => {
    try {
      const res = await fetch('/api/media');
      const data = await res.json();
      if (data.success) {
        setMediaList(data.media || []);
      }
    } catch (err) {
      console.error('Error fetching media:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);
        formData.append('folderType', 'library');

        await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
      }
      fetchMedia();
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (publicId: string) => {
    try {
      const res = await fetch(`/api/media?publicId=${encodeURIComponent(publicId)}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setDeleteConfirmPublicId(null);
        fetchMedia();
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (err) {
      alert('Error deleting media');
    }
  };

  const filteredMedia = mediaList.filter(item => {
    const matchesSearch = item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.publicId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'ALL' || item.resourceType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-black text-white uppercase tracking-wider">Cloudinary Media Library</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Centralized Asset Management for Posters, BTS Photos & Video Files
          </p>
        </div>

        <label className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 cursor-pointer transition-all self-start sm:self-auto">
          <Upload className="w-4 h-4" />
          <span>{uploading ? 'Uploading...' : 'Upload Media Asset'}</span>
          <input type="file" multiple onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search media files..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-cyan-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'ALL'
                ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900/60 border border-slate-800 text-slate-400'
            }`}
          >
            All Assets ({mediaList.length})
          </button>
          <button
            onClick={() => setFilterType('image')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'image'
                ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900/60 border border-slate-800 text-slate-400'
            }`}
          >
            Images ({mediaList.filter(m => m.resourceType === 'image').length})
          </button>
          <button
            onClick={() => setFilterType('video')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterType === 'video'
                ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900/60 border border-slate-800 text-slate-400'
            }`}
          >
            Videos ({mediaList.filter(m => m.resourceType === 'video').length})
          </button>
        </div>

      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-xs animate-pulse">Loading Cloudinary media...</div>
      ) : filteredMedia.length === 0 ? (
        <div className="py-16 text-center bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 space-y-3">
          <ImageIcon className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-slate-300">No media assets found</h3>
          <p className="text-xs text-slate-500">Upload images or videos above to store them in Cloudinary.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map(item => (
            <div key={item.id} className="bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col group relative">
              
              <div className="relative aspect-square bg-slate-950 overflow-hidden flex items-center justify-center">
                {item.resourceType === 'video' ? (
                  <video src={item.url} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={item.url} alt={item.fileName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                )}

                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-slate-950/80 text-cyan-300 border border-cyan-500/30">
                    {item.resourceType}
                  </span>
                </div>
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                <p className="text-[11px] font-medium text-slate-300 truncate" title={item.fileName}>
                  {item.fileName}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                  <button
                    onClick={() => handleCopyUrl(item.url, item.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-[10px]"
                    title="Copy Image URL"
                  >
                    {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => setDeleteConfirmPublicId(item.publicId)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmPublicId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-extrabold text-white">Delete Asset from Cloudinary?</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              This will permanently remove the media asset from your Cloudinary cloud storage.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmPublicId(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmPublicId)}
                className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold shadow-lg shadow-red-600/30"
              >
                Delete Asset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
