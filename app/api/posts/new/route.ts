// app/api/posts/new/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    // 1. Cek Login (Security)
    // Kita pastikan yang mau upload berita benar-benar admin
    const cookieStore = cookies();
    const userId = cookieStore.get('admin_session')?.value;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Ambil Data dari Formulir
    const body = await request.json();
    const { judul, konten, deskripsi, gambar, kategoriId } = body;

    // 3. Buat Slug (URL) Otomatis
    // Contoh: "Kegiatan PMII" -> "kegiatan-pmii-173892..."
    const slug = judul
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Ganti simbol aneh jadi strip
      .replace(/(^-|-$)+/g, '') + '-' + Date.now();

    // 4. Simpan ke Database
    await prisma.post.create({
      data: {
        title: judul,
        slug,
        content:konten,
        image: gambar,
        categoryId: Number(kategoriId),
        authorId: Number(userId),
        status: 'published' // Langsung tayang
      }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal menyimpan berita" }, { status: 500 });
  }
}