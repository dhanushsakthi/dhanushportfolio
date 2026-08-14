'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Award, ExternalLink, Eye, X, FileText, CheckCircle } from 'lucide-react';
import { Certification } from '@/lib/types';

interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-cyan-400 to-indigo-400">Accomplishments</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl text-base">
            Formal technical certifications across AI, Python (95.5%), Web Development, DCA (92%), SQL, Power BI, and Google Cloud Agentic AI.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-950/20 transition-all duration-300 cursor-pointer flex flex-col group"
            >
              {/* Image Preview Container */}
              <div className="relative w-full h-44 bg-slate-950 overflow-hidden">
                <Image
                  src={cert.imageUrl}
                  alt={cert.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 flex items-center gap-1.5 shadow-xl">
                    <Eye className="w-4 h-4" />
                    <span>Inspect Certificate</span>
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/90 text-amber-400 border border-amber-500/30">
                  {cert.issueDate}
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-semibold text-cyan-400 mt-0.5">
                    {cert.issuer}
                  </p>
                  {cert.description && (
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {cert.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-medium text-[11px]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                  <span className="text-cyan-400 font-medium hover:underline flex items-center gap-1">
                    <span>View Details</span>
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Certificate Viewer Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 sticky top-0 z-10">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  {selectedCert.issuer} • {selectedCert.issueDate}
                </span>
                <h3 className="text-lg font-bold text-white">{selectedCert.title}</h3>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* Full Image Preview */}
              <div className="relative w-full min-h-[300px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
                <Image
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  fill
                  className="object-contain"
                />
              </div>

              {selectedCert.description && (
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  {selectedCert.description}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800">
                <a
                  href={selectedCert.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20"
                >
                  <Eye className="w-4 h-4" />
                  <span>Open Full Resolution Image</span>
                </a>

                {selectedCert.pdfUrl && (
                  <a
                    href={selectedCert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  >
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>Download Certificate PDF</span>
                  </a>
                )}

                {selectedCert.verificationUrl && (
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Verify Credential Online</span>
                  </a>
                )}
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}
