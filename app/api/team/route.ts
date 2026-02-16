// app/api/team/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// AMBIL DATA
export async function GET() {
  const data = await prisma.teamMember.findMany({
    orderBy: { createdAt: 'asc' } // Urutkan berdasarkan waktu input
  });
  return NextResponse.json(data);
}

// TAMBAH PENGURUS BARU
export async function POST(request: Request) {
  const body = await request.json();
  try {
    const newMember = await prisma.teamMember.create({
      data: {
        nama: body.nama,
        jabatan: body.jabatan,
        foto: body.foto,
      }
    });
    return NextResponse.json(newMember);
  } catch (error) {
    return NextResponse.json({ error: "Gagal menyimpan" }, { status: 500 });
  }
}