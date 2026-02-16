// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // 1. Cari User di Database
    const user = await prisma.user.findUnique({
      where: { username }
    });

    // 2. Cek apakah user ada & password cocok
    // (Note: Di project asli, password harus di-hash. Ini versi sederhana dulu)
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 3. Jika cocok, buat "Tiket Masuk" (Cookie)
    // Kita simpan ID user di cookie agar browser ingat dia sudah login
    cookies().set('admin_session', user.id.toString(), {
      httpOnly: true, // Aman, tidak bisa dibaca Javascript hacker
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 // Berlaku 1 Hari
    });

    return NextResponse.json({ success: true, nama: user.nama });

  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}