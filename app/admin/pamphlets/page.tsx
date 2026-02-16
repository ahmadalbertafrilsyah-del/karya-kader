"use client";

import { useState, useEffect } from 'react';
import { UploadButton } from "../../utils/uploadthing"; 

export default function AdminPamphlets() {
  const [pamphlets, setPamphlets] = useState<any[]>([]);
  
  useEffect(() => {
    fetchPamphlets();
  }, []);

  const fetchPamphlets = async () => {
    const res = await fetch('/api/pamphlets');
    const data = await res.json();
    setPamphlets(data);
  };

  const saveToDatabase = async (imageUrl: string) => {
    try {
      const res = await fetch('/api/pamphlets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: imageUrl }),
      });
      if (res.ok) {
        alert("Sukses! Poster berhasil dipasang.");
        fetchPamphlets();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if(confirm("Hapus poster ini?")) {
      await fetch(`/api/pamphlets/${id}`, { method: 'DELETE' });
      fetchPamphlets();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">🖼️ Kelola Poster</h1>

      {/* AREA UPLOAD */}
      <div className="bg-white p-6 rounded shadow mb-8 text-center border">
        <h2 className="font-bold mb-4">Upload Poster Baru</h2>
        <div className="flex justify-center">
          
          {/* TOMBOL UPLOAD */}
          <UploadButton
            endpoint="imageUploader" // <--- WAJIB SAMA dengan di core.ts
            onClientUploadComplete={(res) => {
              if (res && res[0]) {
                console.log("File URL:", res[0].url);
                saveToDatabase(res[0].url);
              }
            }}
            onUploadError={(error: Error) => {
              // Menampilkan error asli dari server
              alert(`Gagal Upload: ${error.message}`);
              console.log(error);
            }}
            appearance={{
              button: "bg-blue-900 text-white px-4 py-2 rounded font-bold hover:bg-yellow-500 hover:text-blue-900"
            }}
          />

        </div>
      </div>

      {/* LIST POSTER */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pamphlets.map((item) => (
          <div key={item.id} className="relative group">
            <img src={item.url} className="w-full rounded shadow" />
            <button 
              onClick={() => handleDelete(item.id)}
              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}