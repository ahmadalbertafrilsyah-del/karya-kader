// app/admin/posts/new/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/app/utils/uploadthing"; 
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Load ReactQuill di Client Side saja
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function CreatePostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // State Data Lengkap
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: "",
    image: "", 
    status: "published",
    
    // Data Tambahan (Baru)
    kota: "",
    tags: "",
    penulis: "",
    editor: "",
    fotografer: "",
    sumber: ""
  });

  // 👇 PERBAIKAN DI SINI: Ganti url jadi "/api/categories" (pakai 's')
  useEffect(() => {
    fetch("/api/categories") 
      .then((res) => {
        if (!res.ok) throw new Error("Gagal fetch");
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((err) => console.error("Gagal ambil kategori", err));
  }, []);

  // Konfigurasi Toolbar Editor
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan");

      alert("Berita berhasil diterbitkan! 🚀");
      router.push("/admin/posts");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan berita.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 mt-6 mb-20">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <h1 className="text-2xl font-bold text-[#091c3e]">Tulis Berita Baru</h1>
        <button 
          type="button" 
          onClick={() => router.back()}
          className="text-sm text-gray-500 hover:text-red-500 transition"
        >
          ✕ Batal
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* === 1. JUDUL & KATEGORI === */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 space-y-4">
             {/* Judul */}
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Judul Berita</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f5a623] outline-none text-lg font-semibold"
                  placeholder="Masukkan judul berita..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
             </div>
             
             {/* Dateline (Kota) */}
             <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
               <label className="block text-xs font-bold text-[#091c3e] mb-1">📍 Dateline / Lokasi</label>
               <div className="flex items-center gap-2">
                 <input 
                   type="text" 
                   className="w-full md:w-1/2 border border-gray-300 rounded p-2 text-sm"
                   placeholder="Contoh: Malang / Jakarta"
                   value={formData.kota}
                   onChange={(e) => setFormData({...formData, kota: e.target.value})}
                 />
                 <span className="text-gray-500 text-xs">- Muncul tebal di awal paragraf</span>
               </div>
             </div>
          </div>

          <div className="md:col-span-4 space-y-4">
             {/* Kategori */}
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
               <select
                 className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                 value={formData.categoryId}
                 onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
               >
                 <option value="">-- Pilih Kategori --</option>
                 {categories.length > 0 ? (
                   categories.map((cat) => (
                     <option key={cat.id} value={cat.id}>{cat.nama}</option>
                   ))
                 ) : (
                   <option disabled>Memuat kategori...</option>
                 )}
               </select>
             </div>

             {/* Status */}
             <div>
               <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
               <select
                 className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                 value={formData.status}
                 onChange={(e) => setFormData({ ...formData, status: e.target.value })}
               >
                 <option value="published">✅ Langsung Terbit</option>
                 <option value="draft">📁 Simpan Draft</option>
               </select>
             </div>
          </div>
        </div>

        {/* === 2. UPLOAD GAMBAR (UPLOADTHING) === */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Gambar Sampul (Thumbnail)</label>
          <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center bg-gray-50 hover:bg-gray-100 transition">
            {formData.image ? (
              <div className="relative">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded shadow object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: "" })}
                  className="mt-3 bg-red-100 text-red-600 px-4 py-1 rounded text-sm font-bold hover:bg-red-200"
                >
                  Hapus & Ganti Gambar
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setFormData({ ...formData, image: res[0].url });
                      alert("Upload Berhasil!");
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`Gagal Upload: ${error.message}`);
                  }}
                />
                <p className="text-xs text-gray-400 mt-2">Format: JPG, PNG (Max 4MB)</p>
              </div>
            )}
          </div>
        </div>

        {/* === 3. ISI BERITA (REACT QUILL) === */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Isi Berita</label>
          <div className="bg-white">
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value })}
              modules={modules}
              className="h-80 mb-12" 
            />
          </div>
        </div>

        {/* === 4. KREDIT & TAGS === */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 border-t border-gray-100 mt-12">
          
          {/* Kredit Redaksi */}
          <div className="lg:col-span-2 bg-gray-50 p-5 rounded-xl border border-gray-200">
            <h3 className="font-bold text-[#091c3e] mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
              👥 Kredit Redaksi
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                 <label className="text-xs font-bold text-gray-500 mb-1 block">Penulis</label>
                 <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm" 
                   value={formData.penulis} onChange={(e) => setFormData({...formData, penulis: e.target.value})} />
               </div>
               <div>
                 <label className="text-xs font-bold text-gray-500 mb-1 block">Editor</label>
                 <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm" 
                   value={formData.editor} onChange={(e) => setFormData({...formData, editor: e.target.value})} />
               </div>
               <div>
                 <label className="text-xs font-bold text-gray-500 mb-1 block">Fotografer</label>
                 <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm" 
                   value={formData.fotografer} onChange={(e) => setFormData({...formData, fotografer: e.target.value})} />
               </div>
               <div>
                 <label className="text-xs font-bold text-gray-500 mb-1 block">Sumber</label>
                 <input type="text" className="w-full border border-gray-300 rounded p-2 text-sm" 
                   value={formData.sumber} onChange={(e) => setFormData({...formData, sumber: e.target.value})} />
               </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-[#fffbeb] p-5 rounded-xl border border-[#f5a623]/30">
            <h3 className="font-bold text-[#091c3e] mb-2 text-sm uppercase tracking-wider">
              🏷️ Tags / Topik
            </h3>
            <textarea 
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-[#f5a623]"
              placeholder="Contoh: Politik, Kampus, PMII Malang (Pisahkan dengan koma)"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
            ></textarea>
          </div>
        </div>

        {/* === TOMBOL SUBMIT === */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-lg font-bold text-white text-lg transition shadow-lg
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#091c3e] hover:bg-[#f5a623] hover:text-[#091c3e]"}
            `}
          >
            {loading ? "Sedang Menyimpan..." : "🚀 Terbitkan Berita"}
          </button>
        </div>

      </form>
    </div>
  );
}