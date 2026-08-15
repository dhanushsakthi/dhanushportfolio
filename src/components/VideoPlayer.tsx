'use client';

import React, { useState } from 'react';
import { Play, Film, ExternalLink } from 'lucide-react';

interface VideoPlayerProps {
  videoSourceType?: 'youtube' | 'cloudinary' | 'none';
  youtubeUrl?: string;
  youtubeVideoId?: string;
  cloudinaryUrl?: string;
  posterUrl?: string;
  title?: string;
}

export default function VideoPlayer({
  videoSourceType = 'none',
  youtubeUrl,
  youtubeVideoId,
  cloudinaryUrl,
  posterUrl,
  title
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Helper to extract YouTube video ID if not explicitly passed
  const getYoutubeId = (): string => {
    if (youtubeVideoId) return youtubeVideoId;
    if (!youtubeUrl) return '';
    const match = youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    return match ? match[1] : '';
  };

  const activeYoutubeId = getYoutubeId();

  if (videoSourceType === 'youtube' && activeYoutubeId) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
        {!isPlaying ? (
          <div className="relative w-full h-full">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={title || 'Film Poster'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-75"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-black flex items-center justify-center">
                <Film className="w-16 h-16 text-cyan-500/40" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center gap-4">
              <button
                onClick={() => setIsPlaying(true)}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:scale-110 hover:bg-cyan-400 transition-all group/btn"
                aria-label="Play Film"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-slate-950 ml-1 group-hover/btn:scale-110 transition-transform" />
              </button>
              <div className="text-center px-4">
                <p className="text-xs uppercase tracking-widest text-cyan-400 font-bold">YouTube Stream</p>
                {title && <h4 className="text-base sm:text-lg font-bold text-white mt-1">{title}</h4>}
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${activeYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={title || 'YouTube video player'}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
    );
  }

  if (videoSourceType === 'cloudinary' && cloudinaryUrl) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
        <video
          src={cloudinaryUrl}
          poster={posterUrl}
          controls
          className="w-full h-full object-contain bg-black"
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // Fallback frame when no video URL is supplied
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 flex flex-col items-center justify-center p-6 text-center">
      {posterUrl ? (
        <img
          src={posterUrl}
          alt={title || 'Film Poster'}
          className="w-full h-full object-cover filter brightness-50"
        />
      ) : (
        <div className="space-y-3">
          <Film className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-xs text-slate-400 font-medium">No video player configured for this project</p>
        </div>
      )}
    </div>
  );
}
