// app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// AMBIL DATA
export async function GET() {
  const data = await prisma.category.findMany();
  return NextResponse.json(data);
}

// TAMBAH DATA BARU
export async function POST(request: Request) {
  const body = await request.json();
  
  // Bikin Slug otomatis (Contoh: "Kabar Kampus" -> "kabar-kampus")
  const slug = body.nama.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

  try {
    const newCategory = await prisma.category.create({
      data: {
        nama: body.nama,
        slug: slug,
      }
    });
    return NextResponse.json(newCategory);
  } catch (error) {
    return NextResponse.json({ error: "Gagal membuat kategori" }, { status: 500 });
  }
}