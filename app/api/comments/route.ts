// app/api/comments/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, content, postId } = body;

    const comment = await prisma.comment.create({
      data: {
        name,
        email,
        content,
        post: { connect: { id: Number(postId) } }
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal kirim komentar' }, { status: 500 });
  }
}