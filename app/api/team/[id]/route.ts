// app/api/team/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  await prisma.teamMember.delete({ where: { id } });
  return NextResponse.json({ success: true });
}