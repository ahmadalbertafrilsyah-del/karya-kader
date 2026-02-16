// app/admin/team/page.tsx
"use client";

// 👇 1. IMPORT CSS INI AGAR TOMBOL TIDAK MENTAHAN (PENTING!)
import "@uploadthing/react/styles.css";

import { useState, useEffect } from 'react';
import { UploadButton } from "../../utils/uploadthing"; 

export default function AdminTeam() {
  const [members, setMembers] = useState<any[]>([]);
  const [form, setForm] = useState({ nama: "", jabatan: "", foto: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchMembers(); }, []);

  const fetchMembers = async () => {
    const res = await fetch('/api/team');
    const data = await res.json();
    setMembers(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.foto) return alert("Wajib upload foto dulu!");

    setLoading(true);
    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ nama: "", jabatan: "", foto: "" }); 
        fetchMembers(); 
        alert("✅ Data berhasil disimpan!");
      } else {
        alert("❌ Gagal menyimpan data.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Terjadi kesalahan sistem.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if(!confirm("Hapus pengurus ini?")) return;
    await fetch(`/api/team/${id}`, { method: 'DELETE' });
    fetchMembers();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#091c3e]">👥 Kelola Tim Redaksi</h1>

      {/* --- FORM INPUT --- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border mb-8 flex flex-col md:flex-row gap-8">
        
        {/* BAGIAN UPLOAD FOTO (YANG SUDAH DIRAPIKAN) */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 min-h-[250px]">
          
          {form.foto ? (
            // Tampilan Jika Foto Sudah Ada
            <div className="flex flex-col items-center text-center w-full">
              <img src={form.foto} alt="Preview" className="w-32 h-32 object-cover rounded-full mb-4 shadow-md border-4 border-white" />
              <button 
                type="button"
                onClick={() => setForm({ ...form, foto: "" })}
                className="text-red-500 text-sm font-bold hover:underline bg-red-50 px-3 py-1 rounded-full"
              >
                🗑️ Ganti Foto
              </button>
            </div>
          ) : (
            // Tampilan Tombol Upload (SIMETRIS & BERSIH)
            <div className="flex flex-col items-center justify-center w-full gap-2">
              <p className="text-gray-500 text-sm font-bold text-center mb-2">Upload Foto Profil</p>
              
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    setForm({ ...form, foto: res[0].url });
                  }
                }}
                onUploadError={(error: Error) => alert(`Error: ${error.message}`)}
                
                // 👇 STYLE KHUSUS AGAR RAPI
                appearance={{
                  // Tombol utama: Biru, Teks Putih, Tengah
                  button: "ut-ready:bg-[#091c3e] ut-uploading:cursor-not-allowed bg-[#091c3e] text-white w-full max-w-[200px] px-4 py-2 rounded-full font-bold transition-all flex justify-center items-center mx-auto",
                  container: "w-full flex flex-col justify-center items-center gap-2",
                  allowedContent: "hidden" // Menyembunyikan teks "Image (4MB)" bawaan
                }}
                
                // 👇 GANTI TEKS TOMBOL JADI "PILIH FOTO"
                content={{
                  button({ ready }) {
                    if (ready) return <div className="flex items-center gap-2">Pilih Foto 📸</div>;
                    return "Menyiapkan...";
                  }
                }}
              />
              <p className="text-[10px] text-gray-400 text-center">Maksimal 4MB (JPG/PNG)</p>
            </div>
          )}
        </div>

        {/* BAGIAN DATA DIRI */}
        <form onSubmit={handleSubmit} className="w-full md:w-2/3 flex flex-col gap-4 justify-center">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
            <input 
              type="text" 
              className="w-full border p-3 rounded-lg focus:outline-none focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623]"
              placeholder="Contoh: Sahabat Fulan"
              value={form.nama}
              onChange={(e) => setForm({...form, nama: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Jabatan</label>
            <input 
              type="text" 
              className="w-full border p-3 rounded-lg focus:outline-none focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623]"
              placeholder="Contoh: Pemimpin Redaksi"
              value={form.jabatan}
              onChange={(e) => setForm({...form, jabatan: e.target.value})}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading || !form.foto}
            className="bg-[#091c3e] text-white font-bold py-3 rounded-xl hover:bg-[#f5a623] hover:text-[#091c3e] transition disabled:opacity-50 shadow-lg mt-2"
          >
            {loading ? "Menyimpan..." : "+ Simpan Anggota Tim"}
          </button>
        </form>
      </div>

      {/* --- DAFTAR TIM --- */}
      <h3 className="font-bold text-gray-700 mb-4 text-lg border-b pb-2">Daftar Pengurus Aktif</h3>
      
      {members.length === 0 ? (
        <p className="text-gray-400 italic text-center py-8">Belum ada data pengurus.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <div key={member.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center relative group hover:-translate-y-1 transition duration-300">
              <button 
                onClick={() => handleDelete(member.id)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 font-bold p-2 bg-red-50 rounded-full w-8 h-8 flex items-center justify-center transition opacity-0 group-hover:opacity-100"
                title="Hapus"
              >
                ✕
              </button>
              <img 
                src={member.foto} 
                alt={member.nama} 
                className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-[#f5a623] shadow-sm"
              />
              <h4 className="font-bold text-[#091c3e] text-lg leading-tight mb-1">{member.nama}</h4>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold bg-gray-100 inline-block px-2 py-1 rounded mt-1">{member.jabatan}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}