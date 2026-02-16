// app/api/users/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const data = await prisma.user.findMany(); // Pastikan tabel User ada di schema.prisma
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password, // Ingat: Untuk production password harus di-hash!
        role: 'admin'
      }
    });
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: "Gagal membuat user" }, { status: 500 });
  }
}