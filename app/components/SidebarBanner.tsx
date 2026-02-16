// app/components/SidebarBanner.tsx
"use client"; // Wajib agar bisa gerak

import { useState, useEffect } from "react";

export default function SidebarBanner({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Logika Ganti Gambar Otomatis tiap 3 Detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Ganti angka 4000 untuk kecepatan (ms)

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="bg-gray-100 rounded overflow-hidden shadow-sm border border-gray-200 group relative">
      {/* Label Info Pojok */}
      <span className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 rounded z-10">
        INFO {currentIndex + 1}/{images.length}
      </span>

      {/* Area Gambar */}
      <div className="relative w-full h-[400px]"> {/* Tinggi Banner diatur di sini */}
        <img 
          src={images[currentIndex]} 
          alt="Banner Kegiatan" 
          className="w-full h-full object-cover transition-all duration-500 ease-in-out"
        />
      </div>

      {/* Tombol Navigasi Titik-Titik (Dots) di Bawah */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 w-2 rounded-full transition-all ${
              idx === currentIndex ? "bg-[#f5a623] w-6" : "bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}