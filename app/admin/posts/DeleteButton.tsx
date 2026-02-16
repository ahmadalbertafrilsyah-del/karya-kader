// app/admin/posts/DeleteButton.tsx
"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    // Konfirmasi dulu biar nggak salah pencet
    const yakin = confirm("Apakah Anda yakin ingin menghapus berita ini?");
    if (!yakin) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert("Berita berhasil dihapus.");
        router.refresh(); // Refresh otomatis tanpa reload
      } else {
        alert("Gagal menghapus.");
      }
    } catch (error) {
      alert("Terjadi kesalahan.");
    }
    setLoading(false);
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading}
      className="text-red-500 hover:text-red-700 font-bold text-sm border border-red-200 hover:bg-red-50 px-3 py-1 rounded transition"
    >
      {loading ? "..." : "Hapus 🗑️"}
    </button>
  );
}