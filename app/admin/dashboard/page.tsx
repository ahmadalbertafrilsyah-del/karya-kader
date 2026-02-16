// app/admin/dashboard/page.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

// Agar data selalu update saat halaman dibuka
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Hitung jumlah data dari database
  const jumlahBerita = await prisma.post.count();
  const jumlahKategori = await prisma.category.count();
  
  // 👇 PERBAIKAN DI SINI: Pakai 'teamMember' bukan 'team'
  const jumlahTim = await prisma.teamMember.count(); 

  // Ambil tanggal hari ini
  const hariIni = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <div className="flex-1 p-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#091c3e]">Selamat Datang, Sahabat!</h1>
            <p className="text-gray-500 mt-1">Ini adalah pusat kendali website yang dikelola oleh Tim Redaksi LSO. JURLITBANG</p>
          </div>
          <div className="bg-white px-4 py-2 rounded shadow text-sm font-bold text-gray-600 border">
            📅 {hariIni}
          </div>
        </div>

        {/* KARTU STATISTIK */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Kartu Berita */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-600 flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Total Berita</p>
              <h2 className="text-3xl font-bold text-[#091c3e]">{jumlahBerita}</h2>
            </div>
            <span className="text-3xl">📝</span>
          </div>

          {/* Kartu Kategori */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-[#f5a623] flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Kategori</p>
              <h2 className="text-3xl font-bold text-[#091c3e]">{jumlahKategori}</h2>
            </div>
            <span className="text-3xl">📂</span>
          </div>

          {/* Kartu Tim Redaksi */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-400 flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Tim Redaksi</p>
              <h2 className="text-3xl font-bold text-[#091c3e]">{jumlahTim}</h2>
            </div>
            <span className="text-3xl">👥</span>
          </div>

           {/* Kartu Status */}
           <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase">Status Server</p>
              <h2 className="text-xl font-bold text-green-600">Online 🟢</h2>
            </div>
            <span className="text-3xl">🚀</span>
          </div>
        </div>

        {/* SHORTCUT CEPAT */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-dashed border-gray-300 text-center">
          <h3 className="font-bold text-lg text-[#091c3e] mb-2">Siap menyebarkan gagasan?</h3>
          <p className="text-gray-500 text-sm mb-6 italic">"Tangan terkepal dan maju ke muka!"</p>
          
          <Link href="/admin/posts" className="bg-[#091c3e] text-white px-8 py-3 rounded-full font-bold hover:bg-[#f5a623] hover:text-[#091c3e] transition inline-flex items-center gap-2">
            <span>+</span> TULIS BERITA BARU
          </Link>
        </div>

      </div>
    </div>
  );
}