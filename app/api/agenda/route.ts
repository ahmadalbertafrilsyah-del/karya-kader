// app/api/agenda/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

// GET: Ambil Agenda (Diurutkan dari tanggal terdekat)
export async function GET() {
  const data = await prisma.agenda.findMany({
    orderBy: { tanggal: 'asc' } // Tanggal terdekat muncul duluan
  });
  return NextResponse.json(data);
}

// POST: Tambah Agenda Baru
export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get('admin_session');
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    
    // Simpan ke DB
    const newAgenda = await prisma.agenda.create({
      data: {
        judul: body.judul,
        // Konversi string tanggal dari HTML ke format Date database
        tanggal: new Date(body.tanggal), 
        lokasi: body.lokasi
      }
    });

    return NextResponse.json({ success: true, data: newAgenda });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menyimpan agenda" }, { status: 500 });
  }
}