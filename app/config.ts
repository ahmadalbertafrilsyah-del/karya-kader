// app/config.ts
import { FaInstagram, FaYoutube, FaTiktok, FaLinkedin } from "react-icons/fa";

export const siteConfig = {
  // 1. MENU NAVIGASI (Digunakan di Navbar & Footer)
  navMenu: [
    { label: "BERANDA", href: "/" },
    { label: "KABAR DARI KAWAH", href: "/kategori/kabar" },
    { label: "BARARASA", href: "/kategori/bararasa" },
    { label: "MUTIARA CHONDRO", href: "/kategori/mutiara" },
    { label: "NALAR TEMPAAN", href: "/kategori/nalar" },
    { label: "TENTANG KAMI", href: "/tentang-kami" },
  ],

  // 2. PENGATURAN SIDEBAR (Agenda & Poster Slideshow)
  sidebar: {
    // --- Agenda Rayon ---
    agendaTitle: "AGENDA RAYON", 
    agendaEvent: "Rapat Tahunan Anggota Rayon (RTAR) Ke-XXV",
    agendaDate: "28 Februari 2026",
    agendaTime: "08:00 WIB - Selesai", // Kolom Waktu
    agendaLocation: "Aula PCNU Kota Malang", // Kolom Lokasi
    
    // --- Poster/Banner (Slideshow) ---
    // Masukkan link gambar poster di sini. Bisa lebih dari satu.
    banners: [
      "https://placehold.co/300x450/091c3e/f5a623/png?text=OPEN+RECRUITMENT+2026",
      "https://placehold.co/300x450/f5a623/091c3e/png?text=DIRGAHAYU+PMII+KE-66",
      "https://placehold.co/300x450/122b5a/ffffff/png?text=SEMINAR+NASIONAL"
    ], 
  },

  // 3. TIM REDAKSI (Untuk Halaman Tentang Kami)
  redaksi: [
    { 
      nama: "Ahmad Zaini", 
      jabatan: "Pemimpin Redaksi", 
      foto: "https://placehold.co/200x200/091c3e/f5a623/png?text=AZ" 
    },
    { 
      nama: "Siti Aminah", 
      jabatan: "Redaktur Pelaksana", 
      foto: "https://placehold.co/200x200/091c3e/f5a623/png?text=SA" 
    },
    { 
      nama: "Budi Santoso", 
      jabatan: "Reporter", 
      foto: "https://placehold.co/200x200/091c3e/f5a623/png?text=BS" 
    },
    { 
      nama: "Rina Kartika", 
      jabatan: "Layout & Desain", 
      foto: "https://placehold.co/200x200/091c3e/f5a623/png?text=RK" 
    },
  ],

  // 4. SOSIAL MEDIA (Icon Pojok Kanan Atas & Footer)
  socialMedia: [
    { name: "Instagram", url: "https://instagram.com/pmii", icon: FaInstagram },
    { name: "Youtube", url: "https://youtube.com/pmii", icon: FaYoutube },
    { name: "Tiktok", url: "https://tiktok.com/@pmii", icon: FaTiktok },
    { name: "Linkedin", url: "https://linkedin.com/in/pmii", icon: FaLinkedin },
  ],

  // 5. KONTAK & COPYRIGHT (Bagian Footer)
  contact: {
    title: "Hai Wkwk PP", // Judul kecil di atas sosmed footer
    address: "Jl. Joyo Tamansari 1 No.41, Merjosari, Kec. Lowokwaru, Kota Malang, Jawa Timur 65144",
    email: "pmiirkcd@gmail.com",
    phone: "6285748203760",
  },

  copyright: {
    text: "© 2026 Jurnalistik Penelitian dan Pengembangan. All Rights Reserved.",
    tagline: "Dzikir, Fikir, Amal Sholeh"
  }
};