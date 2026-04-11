'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useAuthStore } from '@/store/useAuthStore';

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const isLoginPage = pathname === '/candidate/login';
  // Hide header and footer during exam
  const isExamPage = pathname.startsWith('/candidate/exam/');

  const handleLogout = () => {
    logout();
    router.push('/candidate/login');
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa] font-sans antialiased text-slate-900">
      {!isLoginPage && (
        <Header
          title="Akij Resource"
          user={user?.role === 'candidate' ? user : null}
          onLogout={handleLogout}
        />
      )}
      
      {isLoginPage && (
         <header className="flex h-16 items-center bg-white px-6 shrink-0 relative justify-center shadow-sm">
          <div className="absolute left-6 inset-y-0 flex items-center">
            <div className="flex flex-col items-start leading-none group">
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold tracking-tighter text-[#2a2b7c] uppercase">
                  Akij
                </span>
                <span className="text-xl font-medium tracking-tight text-gray-700">
                  Resource
                </span>
              </div>
              <span className="text-[0.5rem] tracking-widest text-[#2a2b7c]/80 uppercase mt-0.5 opacity-80">
                Towards Excellence
              </span>
            </div>
          </div>
          <h1 className="text-xl font-semibold text-slate-700 absolute left-1/2 -translate-x-1/2">
            Akij Resource
          </h1>
         </header>
      )}

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <Footer />
    </div>
  );
}
