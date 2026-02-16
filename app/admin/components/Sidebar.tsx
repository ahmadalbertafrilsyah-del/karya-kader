// app/admin/components/Sidebar.tsx
"use client"; // 👈 Wajib ada karena kita pakai logika interaktif

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import alat pendeteksi halaman

export default function Sidebar() {
  const pathname = usePathname(); // Cek URL sekarang

  // 👇 LINK GAMBAR LOGO DARI IMGBB
  const logoUrl = "https://i.ibb.co.com/FL6jYkj8/LOGO-RKCD-FIKS-1.png";

  // Fungsi Pintar: Menentukan style aktif atau tidak
  const getLinkClass = (path: string) => {
    // Style Dasar (Default)
    const baseStyle = "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group";
    
    // Cek apakah URL sekarang sama dengan Link ini?
    const isActive = pathname === path || (path !== '/admin/dashboard' && pathname.startsWith(path));

    if (isActive) {
      // Style kalau AKTIF (Kuning, Teks Gelap, Tebal)
      return `${baseStyle} bg-[#f5a623] text-[#091c3e] font-bold shadow-lg transform scale-105`;
    } else {
      // Style kalau TIDAK AKTIF (Transparan, Teks Abu, Hover Putih)
      return `${baseStyle} text-gray-300 hover:bg-white/10 hover:text-white`;
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#091c3e] text-white">
      
      {/* 1. HEADER SIDEBAR */}
      <div className="p-6 border-b border-gray-700 flex flex-col items-center text-center">
        
        {/* LINGKARAN LOGO (Ukurannya diperbesar sedikit jadi w-24 h-24 biar gambarnya jelas) */}
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg overflow-hidden border-4 border-[#f5a623] p-1">
           {/* 👇 GANTI EMOJI DENGAN GAMBAR */}
           <img 
             src={logoUrl} 
             alt="Logo Admin" 
             className="w-full h-full object-contain rounded-full" 
           />
        </div>

        <h2 className="text-xl font-bold text-[#f5a623] tracking-wide uppercase">ADMIN REDAKTUR</h2>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">KARYA KADER</p>
      </div>

      {/* 2. MENU NAVIGASI */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-hide">
        
        <p className="px-4 text-[10px] font-bold text-gray-500 uppercase mt-2 mb-2">Utama</p>
        
        <Link href="/admin/dashboard" className={getLinkClass('/admin/dashboard')}>
          📊 <span>Dashboard</span>
        </Link>

        <p className="px-4 text-[10px] font-bold text-gray-500 uppercase mt-6 mb-2">Konten Website</p>

        <Link href="/admin/posts" className={getLinkClass('/admin/posts')}>
          📝 <span>Kelola Berita</span>
        </Link>

        <Link href="/admin/categories" className={getLinkClass('/admin/categories')}>
          📂 <span>Kategori / Kanal</span>
        </Link>

        <Link href="/admin/pamphlets" className={getLinkClass('/admin/pamphlets')}>
          🖼️ <span>Kelola Poster</span>
        </Link>

        <Link href="/admin/agenda" className={getLinkClass('/admin/agenda')}>
          📅 <span>Agenda Rayon</span>
        </Link>

        <p className="px-4 text-[10px] font-bold text-gray-500 uppercase mt-6 mb-2">Pengaturan</p>

        <Link href="/admin/team" className={getLinkClass('/admin/team')}>
          👥 <span>Tim Redaksi</span>
        </Link>

        <Link href="/admin/users" className={getLinkClass('/admin/users')}>
          🔐 <span>Pengguna / Akun</span>
        </Link>

        <Link href="/admin/settings" className={getLinkClass('/admin/settings')}>
          ⚙️ <span>Identitas Web</span>
        </Link>

      </nav>

      {/* 3. FOOTER (TOMBOL KELUAR) */}
      <div className="p-4 border-t border-gray-700 bg-[#071630]">
        <Link href="/" className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg text-sm font-bold transition shadow-lg group">
          <span className="group-hover:-translate-x-1 transition">🚪</span> Keluar
        </Link>
        <p className="text-[10px] text-center text-gray-500 mt-3">v1.0.0 &copy; 2026</p>
      </div>
    </div>
  );
}