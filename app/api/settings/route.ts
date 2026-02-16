// app/api/settings/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const config = await prisma.webConfig.findFirst();
  return NextResponse.json(config || {});
}

export async function POST(request: Request) {
  const body = await request.json();
  
  const config = await prisma.webConfig.upsert({
    where: { id: 1 },
    update: {
      namaWeb: body.namaWeb,
      deskripsiFooter: body.deskripsiFooter,
      alamat: body.alamat,
      logoFooter: body.logoFooter,
      email: body.email,
      telepon: body.telepon,
      // 👇 Update Sosmed
      instagram: body.instagram,
      youtube: body.youtube,
      linkedin: body.linkedin,
      whatsapp: body.whatsapp,
      tiktok: body.tiktok
    },
    create: {
      namaWeb: body.namaWeb,
      deskripsiFooter: body.deskripsiFooter,
      alamat: body.alamat,
      logoFooter: body.logoFooter,
      email: body.email,
      telepon: body.telepon,
      instagram: body.instagram,
      youtube: body.youtube,
      linkedin: body.linkedin,
      whatsapp: body.whatsapp,
      tiktok: body.tiktok
    }
  });

  return NextResponse.json(config);
}