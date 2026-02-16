// app/components/Editor.tsx
"use client";

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import style bawaan Quill

// Kita load ReactQuill secara dinamis agar tidak error di server Next.js
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <p className="p-4 text-gray-500">Memuat editor...</p>
});

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  
  // Pengaturan Toolbar (Tombol apa saja yang muncul)
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }], // Judul H1, H2, H3
      ['bold', 'italic', 'underline', 'strike'], // Bold, Miring, Garis Bawah
      [{ 'list': 'ordered'}, { 'list': 'bullet' }], // List Angka & Titik
      [{ 'align': [] }], // Rata Kiri, Tengah, Kanan (PENTING BUAT CAPTION)
      ['link', 'image'], // Link & Upload Gambar
      ['clean'] // Hapus format
    ],
  };

  return (
    <div className="bg-white">
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={onChange} 
        modules={modules}
        className="h-64 mb-12" // Tinggi editor
      />
    </div>
  );
}