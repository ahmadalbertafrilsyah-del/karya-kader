// app/admin/categories/page.tsx
"use client";
import { useState, useEffect } from 'react';

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [nama, setNama] = useState("");

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama }),
    });
    setNama("");
    fetchCategories();
  };

  const handleDelete = async (id: number) => {
    if(!confirm("Hapus kategori ini?")) return;
    await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    fetchCategories();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#091c3e]">📂 Kelola Kategori</h1>
      
      {/* FORM INPUT */}
      <div className="bg-white p-6 rounded shadow mb-8 max-w-lg">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input 
            type="text" 
            placeholder="Nama Kategori Baru..." 
            className="flex-1 border p-2 rounded"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
          <button type="submit" className="bg-[#f5a623] text-black font-bold px-4 py-2 rounded">Tambah</button>
        </form>
      </div>

      {/* TABEL DATA */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Nama Kategori</th>
              <th className="p-4">Slug (Link)</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold">{cat.nama}</td>
                <td className="p-4 text-gray-500 text-sm">/category/{cat.slug}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(cat.id)} className="text-red-500 hover:text-red-700 font-bold text-sm">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}