// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file yang diupload" }, { status: 400 });
    }

    // 1. Ambil File dan Ubah ke Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 2. Buat Nama File Unik (biar gak bentrok kalau namanya sama)
    // Contoh: "foto-kegiatan.jpg" jadi "17389281-foto-kegiatan.jpg"
    const namaFileUnik = Date.now() + '-' + file.name.replaceAll(" ", "-");
    
    // 3. Tentukan Lokasi Simpan (Folder public/uploads)
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    const filePath = path.join(uploadDir, namaFileUnik);

    // 4. Tulis File ke Folder
    await writeFile(filePath, buffer);

    // 5. Kembalikan URL Gambar agar bisa dibuka di browser
    // URL-nya jadi: /uploads/nama-file-unik.jpg
    const fileUrl = `/uploads/${namaFileUnik}`;

    return NextResponse.json({ success: true, url: fileUrl });

  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Gagal upload file" }, { status: 500 });
  }
}