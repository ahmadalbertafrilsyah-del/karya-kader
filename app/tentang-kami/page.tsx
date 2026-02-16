// app/tentang-kami/page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma'; // Panggil Database
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

export const dynamic = 'force-dynamic';

export default async function TentangKami() {
  // 1. AMBIL DATA REDAKSI
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { id: 'asc' },
  });

  // 2. AMBIL CONFIG (UNTUK ALAMAT & PETA) - BARU DITAMBAHKAN
  const config = await prisma.webConfig.findFirst();

  // 3. LOGIKA URL PETA (PINDAHAN DARI FOOTER)
  const alamatQuery = config?.alamat ? encodeURIComponent(config.alamat) : "";
  // Perbaikan format URL Google Maps Embed agar lebih stabil
  const mapUrl = `https://maps.google.com/maps?q=${alamatQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* JUDUL HALAMAN */}
          <div className="text-center mb-10 border-b pb-6">
            <h1 className="text-3xl font-extrabold text-[#091c3e] sm:text-4xl">
              Tentang Kami
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Mengenal lebih dekat Portal Berita Karya Kader.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* --- KOLOM KIRI (KONTEN UTAMA) --- */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* BAGIAN 1: PROFIL & VISI MISI */}
              <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100 p-8 sm:p-10">
                <div className="prose prose-lg text-gray-700 max-w-none">
                  <p className="lead text-lg mb-6">
                    Selamat datang di <strong>Portal Berita Karya Kader</strong>. 
                    Platform ini didirikan sebagai wadah kreativitas dan informasi bagi seluruh kader.
                  </p>
                  
                  {/* Visi Misi Container */}
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                      <h3 className="text-lg font-bold text-blue-900 mb-2">🚀 Visi Kami</h3>
                      <p className="text-sm">Menjadi media digital terdepan yang mencerahkan.</p>
                    </div>
                    <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                      <h3 className="text-lg font-bold text-green-900 mb-2">🎯 Misi Kami</h3>
                      <p className="text-sm">Menyajikan berita berimbang dan mewadahi karya kader.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BAGIAN 2: PETA LOKASI (BARU DITAMBAHKAN) */}
              {config?.alamat && (
                <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100 p-6 sm:p-8">
                   <h2 className="text-2xl font-bold text-[#091c3e] mb-4 border-b pb-2 flex items-center gap-2">
                     📍 Lokasi Sekretariat
                   </h2>
                   <p className="text-gray-600 mb-4 text-sm">
                     {config.alamat}
                   </p>
                   <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden border border-gray-300 shadow-inner">
                     <iframe 
                       width="100%" 
                       height="100%" 
                       src={mapUrl} 
                       style={{ border: 0 }} 
                       allowFullScreen 
                       loading="lazy"
                     ></iframe>
                   </div>
                </div>
              )}

              {/* BAGIAN 3: SUSUNAN REDAKSI */}
              <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
                  Susunan Redaksi
                </h2>

                {teamMembers.length === 0 ? (
                  <p className="text-gray-500 italic text-center py-4">
                    Data redaksi belum ditambahkan.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition bg-gray-50">
                        {/* Foto Profil */}
                        <div className="relative w-16 h-16 shrink-0">
                          {member.foto ? (
                            <img 
                              src={member.foto} 
                              alt={member.nama} 
                              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs text-center border-2 border-white shadow">
                              No Foto
                            </div>
                          )}
                        </div>
                        
                        {/* Nama & Jabatan */}
                        <div>
                          <h3 className="font-bold text-gray-900">{member.nama}</h3>
                          <p className="text-sm text-blue-600 font-medium">{member.jabatan}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
            </div>
            {/* AKHIR KOLOM KIRI */}

            {/* --- KOLOM KANAN (SIDEBAR) --- */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Sidebar />
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}