// app/admin/agenda/page.tsx
"use client";

import { useState, useEffect } from 'react';

interface AgendaItem {
  id: number;
  judul: string;
  tanggal: string;
  lokasi: string;
}

export default function AgendaPage() {
  const [agendas, setAgendas] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [judul, setJudul] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [lokasi, setLokasi] = useState('');

  // 1. Ambil Data Agenda
  const fetchAgendas = async () => {
    try {
      const res = await fetch('/api/agenda');
      const data = await res.json();
      setAgendas(data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchAgendas(); }, []);

  // 2. Tambah Agenda
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !tanggal) return alert("Judul dan Tanggal wajib diisi!");
    setSubmitting(true);

    try {
      await fetch('/api/agenda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ judul, tanggal, lokasi })
      });
      
      // Reset Form
      setJudul(''); setTanggal(''); setLokasi('');
      fetchAgendas();
      alert("Agenda berhasil dicatat!");
    } catch (err) { alert("Gagal menyimpan."); }
    setSubmitting(false);
  };

  // 3. Hapus Agenda
  const handleDelete = async (id: number) => {
    if(!confirm("Hapus agenda ini?")) return;
    await fetch(`/api/agenda/${id}`, { method: 'DELETE' });
    fetchAgendas();
  };

  // Fungsi Format Tanggal untuk Tampilan
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#091c3e] mb-8">KELOLA AGENDA RAYON</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FORM INPUT (KIRI) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded shadow border-t-4 border-[#091c3e]">
            <h3 className="font-bold mb-4 text-gray-700">Tambah Agenda Baru</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Nama Kegiatan</label>
                <input type="text" className="w-full border p-2 rounded" placeholder="Contoh: RTAR, Makrab, Diskusi"
                  value={judul} onChange={(e) => setJudul(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Tanggal Pelaksanaan</label>
                <input type="date" className="w-full border p-2 rounded"
                  value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Lokasi (Opsional)</label>
                <input type="text" className="w-full border p-2 rounded" placeholder="Contoh: Basecamp Rayon"
                  value={lokasi} onChange={(e) => setLokasi(e.target.value)} />
              </div>
              <button type="submit" disabled={submitting} 
                className="w-full bg-[#091c3e] text-white py-2 rounded font-bold hover:bg-[#f5a623] hover:text-[#091c3e] transition">
                + SIMPAN JADWAL
              </button>
            </form>
          </div>
        </div>

        {/* LIST AGENDA (KANAN) */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-bold mb-4 text-gray-700">Daftar Agenda Mendatang</h3>
            
            {loading ? <p>Memuat...</p> : (
              <div className="space-y-3">
                {agendas.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded hover:bg-blue-50 transition border-l-4 border-l-[#f5a623]">
                    <div className="mb-2 md:mb-0">
                      <div className="flex items-center gap-2 mb-1">
                         <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                           {formatDate(item.tanggal)}
                         </span>
                         {item.lokasi && (
                           <span className="text-xs text-gray-500">📍 {item.lokasi}</span>
                         )}
                      </div>
                      <h4 className="font-bold text-[#091c3e] text-lg">{item.judul}</h4>
                    </div>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 text-sm font-bold hover:underline self-start md:self-center">
                      Hapus 🗑️
                    </button>
                  </div>
                ))}

                {agendas.length === 0 && (
                  <div className="text-center py-8 text-gray-400 italic bg-gray-50 rounded">
                    Belum ada agenda yang dicatat.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}