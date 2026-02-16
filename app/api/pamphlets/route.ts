// app/api/pamphlets/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

// GET: Ambil Semua Pamflet
export async function GET() {
  const data = await prisma.pamphlet.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(data);
}

// POST: Simpan Pamflet Baru
export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get('admin_session');
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    
    const newPamphlet = await prisma.pamphlet.create({
      data: {
        url: body.url
      }
    });

    return NextResponse.json({ success: true, data: newPamphlet });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menyimpan" }, { status: 500 });
  }
}