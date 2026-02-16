// app/api/seed/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Buat Kategori (Pakai upsert biar tidak error kalau sudah ada)
    await prisma.category.createMany({
      data: [
        { nama: 'Kabar Dari Kawah', slug: 'kabar' },
        { nama: 'Bararasa', slug: 'bararasa' },
        { nama: 'Mutiara Chondro', slug: 'mutiara' },
        { nama: 'Nalar Tempaan', slug: 'nalar' },
      ],
      skipDuplicates: true,
    });

    // 2. Buat User Admin
    const admin = await prisma.user.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        username: 'admin',
        password: 'admin123',
        nama: 'Super Admin',
        role: 'admin'
      },
    });

    // 3. Buat Berita Contoh
    await prisma.post.create({
      data: {
        judul: "Selamat Datang di Website Baru PMII",
        slug: "selamat-datang-website-baru-" + Date.now(), // Tambah waktu biar unik terus
        konten: "<p>Ini adalah berita pertama yang dibuat otomatis oleh sistem.</p>",
        deskripsi: "Percobaan koneksi database sukses.",
        categoryId: 1, // <--- SUDAH DIPERBAIKI (Tadi kategoriId)
        userId: admin.id,
        status: "published",
        gambar: "https://placehold.co/600x400/091c3e/f5a623/png?text=Hello+World"
      }
    });

    return NextResponse.json({ message: "Database Berhasil Diisi! 🎉" });
  } catch (error: any) {
    return NextResponse.json({ 
      error: "Gagal mengisi database", 
      detail: error.message 
    }, { status: 500 });
  }
}