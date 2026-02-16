"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Ambil Data Berita saat halaman dibuka
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts'); 
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Gagal mengambil data", error);
    }
    setLoading(false);
  };

  // 2. Fungsi Hapus Berita
  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus berita ini secara permanen?')) {
      await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      fetchPosts(); // Refresh tabel setelah hapus
    }
  };

  return (
    <div className="p-6 md:p-8 font-sans text-[#091c3e]">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">KELOLA BERITA</h1>
        <div className="flex items-center gap-3">
            <Link href="/admin" className="text-gray-500 hover:text-[#091c3e] transition text-sm">
              ← Kembali Dashboard
            </Link>
            <Link 
              href="/admin/posts/new" 
              className="bg-[#f5a623] text-[#091c3e] px-5 py-2 rounded font-bold hover:bg-yellow-500 transition shadow-sm text-sm"
            >
              + Tulis Berita Baru
            </Link>
        </div>
      </div>

      {/* TABEL BERITA */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* JUDUL KOLOM */}
            <thead className="bg-[#091c3e] text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="p-4 w-16 text-center">NO</th>
                <th className="p-4">JUDUL BERITA</th>
                <th className="p-4 text-center">KATEGORI</th>
                <th className="p-4 text-center w-48">AKSI</th>
              </tr>
            </thead>

            {/* ISI DATA */}
            <tbody className="text-gray-700 text-sm divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-400">Memuat data berita...</td>
                </tr>
              ) : posts.map((post, index) => (
                <tr key={post.id} className="hover:bg-gray-50 transition">
                  
                  {/* 1. NOMOR URUT */}
                  <td className="p-4 text-center font-mono text-gray-400">{index + 1}</td>
                  
                  {/* 2. JUDUL BERITA (Sudah pakai post.title) */}
                  <td className="p-4">
                    <span className="font-bold text-gray-800 text-base block mb-1">
                      {post.title}
                    </span>
                    <div className="text-xs text-gray-400 flex items-center gap-3">
                      <span>📅 {new Date(post.createdAt).toLocaleDateString('id-ID')}</span>
                      <span>👀 {post.views || 0} Dibaca</span>
                    </div>
                  </td>

                  {/* 3. KATEGORI */}
                  <td className="p-4 text-center">
                    <span className="bg-blue-100 text-blue-800 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wide border border-blue-200">
                      {post.category?.nama || "Umum"}
                    </span>
                  </td>

                  {/* 4. TOMBOL AKSI */}
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <Link 
                        href={`/admin/posts/edit/${post.id}`} 
                        className="text-blue-600 border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-50 font-bold transition text-xs flex items-center gap-1"
                      >
                        ✏️ Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 border border-red-200 px-3 py-1.5 rounded hover:bg-red-50 font-bold transition text-xs flex items-center gap-1"
                      >
                        🗑️ Hapus
                      </button>
                    </div>
                  </td>

                </tr>
              ))}

              {posts.length === 0 && !loading && (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-gray-400">
                    <p className="text-xl mb-2">📂</p>
                    Belum ada berita yang ditulis.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}