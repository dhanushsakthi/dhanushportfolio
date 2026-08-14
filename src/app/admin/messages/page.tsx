'use client';

import React, { useEffect, useState } from 'react';
import { Mail, Clock, CheckCircle2, User, MailCheck } from 'lucide-react';
import { ContactMessage } from '@/lib/types';

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMessages(data.messages || []);
        }
        setLoading(false);
      });
  };

  const handleMarkRead = async (id: string) => {
    try {
      await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-400 text-xs animate-pulse">Loading Messages...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Mail className="w-6 h-6 text-emerald-400" />
          <span>Contact Messages & Inquiries</span>
        </h1>
        <p className="text-xs text-slate-400">
          Review messages sent by recruiters, clients, and visitors through the website contact form
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-sm">
          No messages received yet.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              onClick={() => !m.isRead && handleMarkRead(m.id)}
              className={`bg-slate-900/60 border rounded-2xl p-5 space-y-3 cursor-pointer transition-all ${
                m.isRead ? 'border-slate-800 opacity-80' : 'border-emerald-500/40 bg-slate-900'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-sm">
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{m.name}</h3>
                      {!m.isRead && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                          NEW
                        </span>
                      )}
                    </div>
                    <a href={`mailto:${m.email}`} className="text-xs text-cyan-400 hover:underline">{m.email}</a>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(m.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="text-xs font-semibold text-slate-200 mb-1">Subject: {m.subject}</div>
                <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">{m.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
