// app/admin/posts/edit/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Editor from '../../../../components/Editor';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    judul: '',
    kategoriId: '1',
    gambar: '',
    deskripsi: '',
    konten: '',
    // FIELD BARU
    lokasi: '',
    editor: '',
    reporter: '',
    sumber: '',
    fotografer: ''
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${params.id}`);
        const data = await res.json();
        
        if (res.ok) {
          setFormData({
            judul: data.judul,
            kategoriId: data.categoryId.toString(),
            gambar: data.gambar || '',
            deskripsi: data.deskripsi || '',
            konten: data.konten || '',
            // LOAD DATA BARU
            lokasi: data.lokasi || 'Malang',
            editor: data.editor || '',
            reporter: data.reporter || '',
            sumber: data.sumber || '',
            fotografer: data.fotografer || ''
          });
        } else {
          router.push('/admin/posts');
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchPost();
  }, [params.id, router]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: data });
      const result = await res.json();
      if (result.success) setFormData({ ...formData, gambar: result.url });
    } catch (err) {
      alert("Error upload.");
    }
    setUploading(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/posts/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Berita Berhasil Diupdate! 🔄");
      router.push('/admin/posts');
      router.refresh();
    } else {
      alert("Gagal update.");
    }
    setLoading(false);
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#f5a623] p-6 text-[#091c3e] flex justify-between items-center">
          <h1 className="text-xl font-bold">EDIT BERITA</h1>
          <Link href="/admin/posts" className="text-sm font-bold hover:underline">✕ Batal</Link>
        </div>

        <form onSubmit={handleUpdate} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Judul Berita</label>
            <input type="text" required className="w-full border border-gray-300 p-3 rounded"
              value={formData.judul} onChange={(e) => setFormData({...formData, judul: e.target.value})} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
              <select className="w-full border border-gray-300 p-3 rounded"
                value={formData.kategoriId} onChange={(e) => setFormData({...formData, kategoriId: e.target.value})}>
                <option value="1">Kabar Dari Kawah</option>
                <option value="2">Bararasa</option>
                <option value="3">Mutiara Chondro</option>
                <option value="4">Nalar Tempaan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Gambar Sampul</label>
              <input type="file" accept="image/*" onChange={handleFileChange}
                className="w-full border border-gray-300 p-2 rounded text-sm" />
              {formData.gambar && <img src={formData.gambar} className="mt-2 h-20 border rounded" alt="preview" />}
            </div>
          </div>

          {/* KREDIT REDAKSI (EDIT) */}
          <div className="bg-yellow-50 p-5 rounded border border-yellow-200">
            <h3 className="font-bold text-[#091c3e] mb-4 text-sm uppercase tracking-wide">Detail Redaksi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Lokasi</label>
                <input type="text" className="w-full border p-2 rounded text-sm"
                  value={formData.lokasi} onChange={(e) => setFormData({...formData, lokasi: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Reporter</label>
                <input type="text" className="w-full border p-2 rounded text-sm"
                  value={formData.reporter} onChange={(e) => setFormData({...formData, reporter: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Editor</label>
                <input type="text" className="w-full border p-2 rounded text-sm"
                  value={formData.editor} onChange={(e) => setFormData({...formData, editor: e.target.value})} />
              </div>
               <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Fotografer</label>
                <input type="text" className="w-full border p-2 rounded text-sm"
                  value={formData.fotografer} onChange={(e) => setFormData({...formData, fotografer: e.target.value})} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">Sumber</label>
                <input type="text" className="w-full border p-2 rounded text-sm"
                  value={formData.sumber} onChange={(e) => setFormData({...formData, sumber: e.target.value})} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi</label>
            <textarea required rows={2} className="w-full border border-gray-300 p-3 rounded"
              value={formData.deskripsi} onChange={(e) => setFormData({...formData, deskripsi: e.target.value})} />
          </div>

          <div>
             <label className="block text-sm font-bold text-gray-700 mb-2">Isi Berita</label>
             <Editor value={formData.konten} onChange={(value) => setFormData({...formData, konten: value})} />
          </div>

          <div className="pt-4 border-t flex justify-end">
            <button type="submit" disabled={loading || uploading}
              className="bg-[#091c3e] text-white px-8 py-3 rounded font-bold hover:bg-[#f5a623] hover:text-[#091c3e] transition-colors">
              {loading ? "MENYIMPAN..." : "SIMPAN PERUBAHAN 💾"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}