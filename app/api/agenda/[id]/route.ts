// app/api/agenda/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = cookies();
    const session = cookieStore.get('admin_session');
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await prisma.agenda.delete({
      where: { id: Number(params.id) }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Gagal menghapus" }, { status: 500 });
  }
}