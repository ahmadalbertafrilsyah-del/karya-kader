// app/admin/layout.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Tutup sidebar otomatis saat ganti halaman (di HP)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      
      {/* ==============================
          1. SIDEBAR (MENU)
         ============================== */}
      
      {/* Layar Gelap (Overlay) saat menu terbuka di HP */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Asli */}
      <aside 
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#091c3e] z-50 shadow-2xl transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} /* HP: Geser Masuk/Keluar */
          md:translate-x-0 /* Laptop: Selalu Muncul */
        `}
      >
        <Sidebar />
        
        {/* Tombol Close (X) Khusus di dalam Sidebar (Hanya muncul di HP) */}
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 text-white md:hidden p-2 bg-white/10 rounded-full hover:bg-white/20"
        >
          ✕
        </button>
      </aside>


      {/* ==============================
          2. KONTEN UTAMA
         ============================== */}
      
      {/* md:ml-64 artinya: Di Laptop konten geser kanan 64 (karena ada sidebar). Di HP margin 0 (penuh) */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 transition-all duration-300 min-h-screen">
        
        {/* TOMBOL HAMBURGER (GARIS 3) - Hanya Muncul di HP */}
        <div className="md:hidden mb-6 flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-white text-[#091c3e] rounded shadow-sm border border-gray-200 hover:bg-gray-100 active:scale-95 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <span className="font-bold text-[#091c3e] text-lg">Menu Admin</span>
        </div>

        {/* Konten Halaman (Dashboard/Berita/dll) */}
        {children}

      </main>

    </div>
  );
}