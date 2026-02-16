// app/data.ts

// 1. DATA HEADLINE (Berita Utama Besar)
export const beritaHeadline = {
  id: 1,
  judul: "Pelantikan Rayon Kawah Chondrodimuko Masa Khidmat 2026-2027 Berjalan Khidmat",
  kategori: "KABAR", // Harus SAMA dengan link menu (/kategori/kabar)
  gambar: "https://placehold.co/800x400/091c3e/f5a623/png?text=PELANTIKAN+RAYON",
  tanggal: "25 Jan 2026",
  deskripsi: "Malang - Prosesi pelantikan pengurus baru Rayon PMII Kawah Chondrodimuko berlangsung dengan penuh semangat pergerakan di Aula...",
  isi: `
    <p><strong>MALANG</strong> - Ratusan kader memadati ruangan aula untuk menyaksikan prosesi sakral pelantikan pengurus baru Rayon Pergerakan Mahasiswa Islam Indonesia (PMII) "Kawah" Chondrodimuko.</p>
    <p>Dalam sambutannya, Ketua Rayon terpilih menyampaikan pentingnya menjaga nalar kritis mahasiswa di tengah tantangan zaman yang semakin kompleks.</p>
    <p>"Kita bukan sekadar kumpulan mahasiswa, tapi kita adalah kawah candradimuka tempat menempa diri menjadi besi yang kuat," ujarnya disambut tepuk tangan meriah.</p>
    <p>Acara ini juga dihadiri oleh Mabincab dan para alumni yang turut memberikan wejangan terkait arah gerak organisasi ke depan.</p>
  `
};

// 2. DATA BERITA TERBARU (List di Bawah Headline)
export const beritaTerbaru = [
  {
    id: 2,
    judul: "Bedah Buku: Membaca Ulang Arah Gerak PMII di Era Digital",
    kategori: "NALAR", // Sesuai menu "NALAR TEMPAAN"
    gambar: "https://placehold.co/400x250/091c3e/f5a623/png?text=BEDAH+BUKU",
    tanggal: "24 Jan 2026",
    isi: "<p>Biro Nalar Tempaan mengadakan diskusi rutin mingguan. Kali ini membedah buku karya senior tentang relevansi gerakan mahasiswa di era AI.</p>"
  },
  {
    id: 3,
    judul: "Puisi: Di Bawah Panji Biru Kuning",
    kategori: "BARARASA", // Sesuai menu "BARARASA"
    gambar: "https://placehold.co/400x250/091c3e/f5a623/png?text=PUISI+KADER",
    tanggal: "23 Jan 2026",
    isi: "<p>Sebuah karya sastra dari kader angkatan 2025 yang menggambarkan kerinduannya pada suasana diskusi larut malam di komisariat.</p>"
  },
  {
    id: 4,
    judul: "Profil Kader Berprestasi: Juara 1 Lomba Esai Nasional",
    kategori: "MUTIARA", // Sesuai menu "MUTIARA CHONDRO"
    gambar: "https://placehold.co/400x250/091c3e/f5a623/png?text=PRESTASI",
    tanggal: "22 Jan 2026",
    isi: "<p>Sahabati Rina kembali mengharumkan nama Rayon dengan menyabet juara pertama dalam kompetisi kepenulisan tingkat nasional.</p>"
  },
  {
    id: 5,
    judul: "Opini: Mahasiswa dan Tanggung Jawab Sosial",
    kategori: "NALAR",
    gambar: "https://placehold.co/400x250/091c3e/f5a623/png?text=OPINI",
    tanggal: "21 Jan 2026",
    isi: "<p>Bagaimana seharusnya mahasiswa memposisikan diri di tengah masyarakat yang sedang mengalami krisis kepercayaan terhadap elit politik?</p>"
  }
];

// 3. DATA POPULER (Sidebar Kanan)
export const beritaPopuler = [
  { id: 1, judul: "Mars PMII dan Maknanya", views: "15rb" },
  { id: 2, judul: "Sejarah Berdirinya Rayon Kawah", views: "12rb" },
  { id: 3, judul: "Jadwal PKD Tahun 2026", views: "8rb" },
  { id: 4, judul: "Daftar Ketua Rayon dari Masa ke Masa", views: "5rb" }
];