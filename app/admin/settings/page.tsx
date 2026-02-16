"use client";

import { useState, useEffect } from 'react';
import { UploadButton } from "../../utils/uploadthing"; 

export default function AdminSettings() {
  // State lengkap termasuk TikTok
  const [form, setForm] = useState({
    namaWeb: "",
    deskripsiFooter: "",
    alamat: "",
    logoFooter: "",
    email: "",
    telepon: "",
    instagram: "",
    youtube: "",
    linkedin: "",
    whatsapp: "",
    tiktok: "" // ✅ Sudah ada di state
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchConfig(); }, []);

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data) setForm(data);
    } catch (error) {
      console.error("Gagal ambil data", error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) alert("✅ Pengaturan Berhasil Disimpan!");
      else alert("❌ Gagal menyimpan.");
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#091c3e]">⚙️ Pengaturan Web</h1>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* === BAGIAN 1: LOGO FOOTER (UploadThing) === */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-lg mb-4 text-gray-700">Logo Footer</h3>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 bg-gray-900 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden relative">
              {form.logoFooter ? (
                <img src={form.logoFooter} alt="Logo" className="w-full h-full object-contain p-2" />
              ) : (
                <span className="text-gray-400 text-xs text-center">No Logo</span>
              )}
            </div>
            <div className="flex-1">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) setForm({ ...form, logoFooter: res[0].url });
                  alert("Logo berhasil diupload!");
                }}
                onUploadError={(error: Error) => alert(`Error: ${error.message}`)}
              />
              <p className="text-xs text-gray-400 mt-2">Format: PNG/JPG (Transparan lebih baik).</p>
            </div>
          </div>
        </div>

        {/* === BAGIAN 2: SOSIAL MEDIA & KONTAK === */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-lg mb-4 text-gray-700">Sosial Media & Kontak</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-bold text-gray-600 mb-1">Nomor WhatsApp (Wajib)</label>
              <input 
                type="text" 
                placeholder="Contoh: 62812345678"
                className="w-full border p-2 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                value={form.whatsapp || ""}
                onChange={(e) => setForm({...form, whatsapp: e.target.value})}
              />
              <p className="text-[10px] text-gray-400 mt-1">*Gunakan kode negara (62) di depan. Jangan pakai 08.</p>
            </div>

            {/* Input Instagram */}
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Link Instagram</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" 
                value={form.instagram || ""} 
                onChange={(e) => setForm({...form, instagram: e.target.value})} 
              />
            </div>

            {/* ✅ Input TikTok (YANG DITAMBAHKAN) */}
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Link TikTok</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" 
                value={form.tiktok || ""} 
                onChange={(e) => setForm({...form, tiktok: e.target.value})} 
              />
            </div>

            {/* Input YouTube */}
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Link YouTube</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" 
                value={form.youtube || ""} 
                onChange={(e) => setForm({...form, youtube: e.target.value})} 
              />
            </div>

            {/* Input LinkedIn/Lainnya */}
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Link LinkedIn / Lainnya</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" 
                value={form.linkedin || ""} 
                onChange={(e) => setForm({...form, linkedin: e.target.value})} 
              />
            </div>

            {/* Input Email */}
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Email Redaksi</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" 
                value={form.email || ""} 
                onChange={(e) => setForm({...form, email: e.target.value})} 
              />
            </div>

          </div>
        </div>

        {/* === BAGIAN 3: INFORMASI TEKS === */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-lg mb-4 text-gray-700">Informasi Dasar</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Nama Website</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" 
                value={form.namaWeb} 
                onChange={(e) => setForm({...form, namaWeb: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Selayang Pandang (Footer)</label>
              <textarea 
                rows={3} 
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" 
                value={form.deskripsiFooter || ""} 
                onChange={(e) => setForm({...form, deskripsiFooter: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Alamat Sekretariat</label>
              <textarea 
                rows={2} 
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500" 
                value={form.alamat || ""} 
                onChange={(e) => setForm({...form, alamat: e.target.value})} 
              />
            </div>
          </div>
        </div>

        {/* TOMBOL SIMPAN */}
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-[#091c3e] text-white font-bold py-4 rounded-xl hover:bg-[#f5a623] hover:text-[#091c3e] transition shadow-lg disabled:opacity-50"
        >
          {loading ? "Menyimpan Perubahan..." : "SIMPAN PENGATURAN"}
        </button>
      </form>
    </div>
  );
}