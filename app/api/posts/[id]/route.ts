import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1. DELETE: Hapus Berita
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ message: "Berita dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal hapus" }, { status: 500 });
  }
}

// 2. PUT: Update Berita
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    
    // Ambil data (Nama Form Indonesia)
    const { judul, konten, gambar, categoryId, status, kota, editor, penulis, sumber } = body;

    // Simpan ke DB (Nama Schema Inggris)
    const post = await prisma.post.update({
      where: { id: Number(params.id) },
      data: {
        title: judul,       // Mapping: judul -> title
        content: konten,    // Mapping: konten -> content
        image: gambar,      // Mapping: gambar -> image
        status: status,
        lokasi: kota || null,
        editor: editor || null,
        penulis: penulis || null,
        sumber: sumber || null,
        category: categoryId ? { connect: { id: Number(categoryId) } } : undefined,
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Gagal update" }, { status: 500 });
  }
}