import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") + "-" + Date.now().toString().slice(-4);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("📥 DATA MASUK:", body);

    // Ambil semua data yang mungkin dikirim Form
    const { 
      title, content, // Versi Inggris
      judul, konten,  // Versi Indo
      image, gambar, 
      categoryId, status, 
      kota, penulis, editor, sumber, tags, fotografer 
    } = body;

    // Pilih data yang valid
    const finalTitle = title || judul;
    const finalContent = content || konten;
    const finalImage = image || gambar;

    if (!finalTitle || !finalContent) {
      return NextResponse.json({ error: "Judul/Konten wajib" }, { status: 400 });
    }

    // Cek/Buat Admin Dummy ID 1
    const authorExists = await prisma.user.findFirst();
    if (!authorExists) {
        await prisma.user.create({
            data: {
                email: "admin@karyakader.com",
                username: "admin",
                password: "123",
                nama: "Admin Sistem",
                role: "ADMIN",
                id: 1
            }
        });
    }

    // SIMPAN DATA (Nama Kolom Sesuai Schema.prisma)
    const newPost = await prisma.post.create({
      data: {
        title: finalTitle,
        content: finalContent,
        image: finalImage || null,
        status: status || "published",
        slug: createSlug(finalTitle),
        
        // --- Perbaikan Nama Kolom Disini ---
        kota: kota || null,
        penulis: penulis || null,
        editor: editor || null,       // SEBELUMNYA SALAH (redaktur), HARUSNYA editor
        fotografer: fotografer || null, // Ditambahkan
        tags: tags || null,             // Ditambahkan
        sumber: sumber || null,

        // Relasi
        author: { connect: { id: 1 } },
        category: (categoryId && Number(categoryId) > 0) 
          ? { connect: { id: Number(categoryId) } } 
          : undefined,
      },
    });

    console.log("✅ SUKSES SIMPAN ID:", newPost.id);
    return NextResponse.json(newPost);

  } catch (error: any) {
    console.error("🔥 ERROR DATABASE:", error);
    return NextResponse.json(
      { error: "Gagal: " + error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, author: true },
  });
  return NextResponse.json(posts);
}