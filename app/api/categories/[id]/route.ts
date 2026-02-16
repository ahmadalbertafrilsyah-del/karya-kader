// app/api/categories/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await prisma.category.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ success: true });
}