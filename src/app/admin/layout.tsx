'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Skip auth check for login route
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    fetch('/api/auth')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.authenticated) {
          setAuthenticated(true);
        } else {
          router.push('/admin/login');
        }
        setLoading(false);
      })
      .catch(() => {
        router.push('/admin/login');
        setLoading(false);
      });
  }, [pathname, router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 rounded-full border-4 border-slate-800 border-t-cyan-400 animate-spin"></div>
        <div className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Verifying Admin Session...</div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row pb-16 md:pb-0">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
