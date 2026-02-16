import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

// --- IMPORT KOMPONEN ---
// Gunakan ../../ untuk mundur 2 langkah mencari folder components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar'; // <-- KITA PANGGIL SIDEBAR

export const dynamic = 'force-dynamic';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q;

  // 1. Logika Pencarian (Aman untuk SQLite)
  const posts = query ? await prisma.post.findMany({
    where: {
      status: 'published',
      OR: [
        { title: { contains: query } },   
        { content: { contains: query } },
      ],
    },
    orderBy: { createdAt: 'desc' },
    include: { category: true, author: true }, // Include author biar lengkap
  }) : [];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-10">
        {/* CONTAINER UTAMA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* JUDUL HALAMAN */}
          <div className="mb-8 border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Hasil Pencarian: <span className="text-blue-600">"{query}"</span>
            </h1>
            <p className="text-gray-500 mt-1">
              Ditemukan {posts.length} berita terkait.
            </p>
          </div>

          {/* --- LAYOUT 2 KOLOM (GRID) --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* KOLOM KIRI: HASIL PENCARIAN (Makan 2 Bagian) */}
            <div className="lg:col-span-2 space-y-6">
              
              {posts.length === 0 ? (
                // Tampilan Jika Kosong
                <div className="bg-white p-10 rounded-xl shadow-sm border text-center">
                  <p className="text-lg text-gray-500 mb-4">
                    Tidak ditemukan berita dengan kata kunci <strong>"{query}"</strong>.
                  </p>
                  <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Kembali ke Beranda
                  </Link>
                </div>
              ) : (
                // Tampilan Daftar Berita (List Mode biar rapi)
                posts.map((post) => (
                  <Link href={`/berita/${post.slug}`} key={post.id} className="group block">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col sm:flex-row h-full sm:h-48">
                      
                      {/* Gambar (Sebelah Kiri) */}
                      <div className="relative w-full sm:w-1/3 h-48 sm:h-full bg-gray-200 shrink-0">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-300"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400 bg-gray-100">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Teks (Sebelah Kanan) */}
                      <div className="p-5 flex flex-col justify-center w-full">
                        <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                          <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">
                            {post.category?.nama || 'Berita'}
                          </span>
                          <span>•</span>
                          <span>{new Date(post.createdAt).toLocaleDateString('id-ID')}</span>
                        </div>

                        <h2 className="font-bold text-lg text-gray-800 mb-2 leading-tight group-hover:text-blue-600 line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-gray-600 text-sm line-clamp-2">
                          {post.content.replace(/<[^>]*>/g, '')}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* KOLOM KANAN: SIDEBAR (Makan 1 Bagian) */}
            <div className="lg:col-span-1">
              <div className="sticky top-24"> 
                {/* sticky: biar sidebar ikut turun pas discroll */}
                <Sidebar />
              </div>
            </div>

          </div>
          {/* AKHIR GRID */}

        </div>
      </main>

      <Footer />
    </>
  );
}