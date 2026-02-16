// app/components/DateDisplay.tsx
"use client"; // Wajib pakai ini agar bisa baca jam browser

import { useEffect, useState } from "react";

export default function DateDisplay() {
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    // Logika format tanggal Indonesia: "Minggu, 25 Januari 2026"
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    setDateStr(now.toLocaleDateString('id-ID', options));
  }, []);

  // Tampilkan loading sebentar sebelum tanggal muncul
  if (!dateStr) return <span>Memuat tanggal...</span>;

  return <span>📅 {dateStr}</span>;
}