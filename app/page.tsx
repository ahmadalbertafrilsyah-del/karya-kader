// app/page.tsx
import { prisma } from '@/lib/prisma';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. AMBIL DATA DARI DATABASE
  const rawPosts = await prisma.post.findMany({
    where: { status: 'published' }, 
    orderBy: { createdAt: 'desc' }, // Lebih baik urutkan berdasarkan tanggal terbaru
    take: 7, 
    include: { category: true, author: true }
  });

  // 2. MAPPING DATA
  const posts = rawPosts.map((post) => {
    const cleanDeskripsi = post.content.replace(/<[^>]+>/g, '').substring(0, 150) + "...";
    return {
      id: post.id,
      slug: post.slug, // 👈 TAMBAHAN PENTING: SLUG HARUS DIAMBIL
      judul: post.title,       
      gambar: post.image, // Sesuai schema database kita (image)
      deskripsi: cleanDeskripsi,
      createdAt: post.createdAt,
      author: { nama: post.penulis || post.author?.username || "Redaksi" }, // Prioritaskan nama penulis manual
      category: { 
        nama: post.category?.nama || "Umum",
        slug: post.category?.slug || "#" 
      }
    };
  });

  const headline = posts[0]; 
  const otherPosts = posts.slice(1); 

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 flex flex-col">
      <Navbar />

      {/* PADDING: Di HP (py-6) lebih kecil daripada Laptop (md:py-8) */}
      <main className="container mx-auto px-4 py-6 md:py-8 flex-grow">
        
        {/* GRID UTAMA: Gap di HP (gap-6) lebih rapat daripada Laptop (gap-10) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          
          {/* === KOLOM KIRI: BERITA === */}
          <div className="lg:col-span-8">
            
            {/* --- HEADLINE (BERITA UTAMA) --- */}
            {headline ? (
              <div className="mb-8 md:mb-12 group">
                {/* 👇 LINK DIGANTI JADI SLUG */}
                <Link href={`/news/${headline.slug}`}>
                  {/* ASPECT RATIO: Menjaga proporsi gambar tetap bagus */}
                  <div className="rounded-xl overflow-hidden shadow-sm relative aspect-video border border-gray-200">
                    <img 
                      src={headline.gambar || "https://placehold.co/800x400?text=No+Image"} 
                      alt={headline.judul} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* GRADIENT LEBIH GELAP DI HP AGAR TEKS TERBACA */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent md:from-black/80 md:via-transparent"></div>
                    
                    {/* TEXT CONTAINER: Padding lebih kecil di HP (p-4) */}
                    <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white w-full">
                      <span className="bg-[#f5a623] text-[#091c3e] text-[10px] md:text-xs font-bold px-2 py-1 rounded mb-2 md:mb-3 inline-block uppercase shadow-md">
                        {headline.category.nama}
                      </span>
                      
                      {/* FONT JUDUL: HP (text-xl/20px) vs Laptop (text-4xl/36px) */}
                      <h2 className="text-xl md:text-3xl lg:text-4xl font-bold leading-tight group-hover:text-[#f5a623] transition-colors line-clamp-3 md:line-clamp-none">
                        {headline.judul}
                      </h2>
                      
                      <div className="flex items-center gap-3 md:gap-4 mt-2 md:mt-4 text-[10px] md:text-xs text-gray-300">
                        <span>📅 {new Date(headline.createdAt).toLocaleDateString('id-ID')}</span>
                        <span>✍️ {headline.author.nama}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="text-center py-10 md:py-20 bg-white rounded border border-dashed border-gray-300 mb-8">
                <h3 className="text-lg md:text-xl font-bold text-gray-400">Belum ada berita.</h3>
              </div>
            )}

            {/* --- BERITA LAINNYA --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {otherPosts.map((post) => (
                // 👇 LINK DIGANTI JADI SLUG
                <Link key={post.id} href={`/news/${post.slug}`} className="group bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition flex flex-col h-full">
                  
                  {/* GAMBAR: HP (h-40/160px) biar gak terlalu tinggi, Laptop (h-48/192px) */}
                  <div className="h-40 md:h-48 overflow-hidden relative">
                    {post.gambar ? (
                      <img src={post.gambar} alt={post.judul} className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No Image</div>
                    )}
                    <span className="absolute top-2 left-2 bg-[#091c3e]/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-sm shadow-sm">
                      {post.category.nama}
                    </span>
                  </div>
                  
                  <div className="p-3 md:p-4 flex flex-col flex-grow">
                      <div className="text-[10px] text-gray-400 mb-2 flex items-center gap-1">
                        <span>📅</span> {new Date(post.createdAt).toLocaleDateString('id-ID')}
                      </div>
                    
                    {/* FONT JUDUL ITEM: HP (text-base/16px) vs Laptop (text-lg/18px) */}
                    <h4 className="font-bold text-base md:text-lg leading-snug group-hover:text-blue-900 transition mb-2 line-clamp-2">
                      {post.judul}
                    </h4>
                    
                    <span className="text-[10px] md:text-xs font-bold text-blue-900 mt-auto flex items-center gap-1">
                      Baca Selengkapnya <span>→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* === KOLOM KANAN: SIDEBAR === */}
          <div className="lg:col-span-4 mt-4 lg:mt-0">
             <div className="sticky top-24">
                <Sidebar />
             </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}