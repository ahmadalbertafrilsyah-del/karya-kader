// app/news/[slug]/page.tsx
import { prisma } from '@/lib/prisma';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';         
import CommentSection from '../../components/CommentSection'; // Pastikan file ini sudah dibuat di folder components
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function NewsDetail({ params }: { params: { slug: string } }) {
  
  // 1. AMBIL DATA
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: { 
      author: true, 
      category: true,
      comments: { orderBy: { createdAt: 'desc' } } 
    }
  });

  if (!post) return notFound();

  // 2. BACA JUGA
  const relatedPosts = await prisma.post.findMany({
    where: {
      categoryId: post.categoryId, 
      id: { not: post.id },        
      status: 'published'
    },
    take: 2, 
    orderBy: { createdAt: 'desc' }
  });

  // 3. TAGS
  const tagsList = post.tags ? post.tags.split(',').map(tag => tag.trim()) : [];

  // 👇 LOGIKA PERBAIKAN DATELINE (REGEX)
  let finalContent = post.content;
  
  if (post.kota) {
    // Style Dateline: Tebal, Warna Biru Gelap, Spasi dikit
    const datelineHtml = `<span style="font-weight:bold; color:#091c3e; margin-right:4px;">${post.kota} –</span>`;
    
    // Cari tag paragraf pembuka pertama (<p> atau <p class="..."> atau <p style="...">)
    const paragraphRegex = /<p[^>]*>/;
    
    if (paragraphRegex.test(finalContent)) {
      // Kalau ketemu <p>, selipkan dateline TEPAT SETELAHNYA (Di dalam baris yang sama)
      // Contoh hasil: <p><span>Malang -</span> Isi berita...</p>
      finalContent = finalContent.replace(paragraphRegex, (match) => `${match}${datelineHtml} `);
    } else {
      // Fallback: Kalau tidak ada <p> (jarang terjadi), taruh di paling depan
      finalContent = datelineHtml + finalContent;
    }
  }

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      <Navbar />

      <main className="container mx-auto px-4 py-6 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* === KIRI: KONTEN === */}
          <div className="lg:col-span-8">
            
            {/* Breadcrumb */}
            <div className="text-[10px] md:text-xs text-gray-500 mb-4 md:mb-6 uppercase tracking-wider font-bold">
              <Link href="/" className="hover:text-[#f5a623]">Beranda</Link> / 
              <span className="text-[#f5a623] mx-1">{post.category?.nama || "Berita"}</span> / 
              Baca
            </div>

            {/* Judul */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-[#091c3e] mb-4 md:mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 border-b border-gray-100 pb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full overflow-hidden border border-gray-100">
                  <img src={`https://ui-avatars.com/api/?name=${post.penulis || "Admin"}&background=091c3e&color=fff`} alt="Admin" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-bold text-[#091c3e]">
                  {post.penulis || post.author?.username || "Tim Redaksi"}
                </p>
                <div className="flex gap-3 text-[10px] md:text-xs text-gray-500">
                  <span>{new Date(post.createdAt).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span>| 👁️ {post.views} x dibaca</span>
                </div>
              </div>
            </div>

            {/* Gambar */}
            <div className="rounded-xl overflow-hidden mb-8 md:mb-10 shadow-sm border border-gray-100">
              {post.image ? (
                <img src={post.image} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
              ) : (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400 italic">Tidak ada gambar sampul</div>
              )}
              {post.fotografer && (
                 <p className="text-[10px] text-gray-500 mt-2 italic px-2">📸 Foto: {post.fotografer}</p>
              )}
            </div>

            {/* ISI BERITA (Dateline sudah digabung di variable finalContent) */}
            <article className="prose prose-sm md:prose-lg max-w-none text-gray-800 leading-relaxed mb-10">
              <div dangerouslySetInnerHTML={{ __html: finalContent }} className="inline" />
            </article>
            
            {/* Tags */}
            {tagsList.length > 0 && (
               <div className="flex flex-wrap gap-2 mb-8 border-t border-gray-100 pt-6">
                 <span className="text-xs font-bold text-gray-400 uppercase self-center mr-2">Tags:</span>
                 {tagsList.map((tag, idx) => (
                   <span key={idx} className="bg-gray-100 hover:bg-[#091c3e] hover:text-white transition text-gray-600 px-3 py-1 rounded-full text-xs font-bold cursor-pointer">
                     #{tag}
                   </span>
                 ))}
               </div>
            )}

            {/* Kredit Redaksi */}
            {(post.penulis || post.editor || post.sumber) && (
              <div className="p-5 bg-yellow-50 rounded-lg border-l-4 border-[#f5a623] text-sm text-gray-700 mb-12">
                <h4 className="font-bold text-[#091c3e] mb-3 uppercase text-xs tracking-wider border-b border-yellow-200 pb-2">Info Redaksi</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                  {post.penulis && <p>✍️ <span className="font-bold">Penulis:</span> {post.penulis}</p>}
                  {post.editor && <p>📝 <span className="font-bold">Editor:</span> {post.editor}</p>}
                  {post.fotografer && <p>📸 <span className="font-bold">Foto:</span> {post.fotografer}</p>}
                  {post.sumber && <p>🔗 <span className="font-bold">Sumber:</span> {post.sumber}</p>}
                </div>
              </div>
            )}

            {/* Baca Juga */}
            {relatedPosts.length > 0 && (
              <div className="mb-12">
                <h3 className="text-lg font-bold text-[#091c3e] mb-4 border-l-4 border-[#f5a623] pl-3 uppercase">Baca Juga</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPosts.map((rel) => (
                    <Link key={rel.id} href={`/news/${rel.slug}`} className="group flex gap-3 items-start bg-white p-3 rounded-lg border border-gray-100 hover:shadow-md transition">
                      <div className="w-20 h-20 shrink-0 rounded overflow-hidden bg-gray-200 relative">
                        {rel.image ? (
                          <img src={rel.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
                        ) : <div className="w-full h-full bg-gray-200"></div>}
                      </div>
                      <div>
                         <h4 className="text-sm font-bold text-gray-800 group-hover:text-[#f5a623] leading-snug line-clamp-2 transition">{rel.title}</h4>
                         <span className="text-[10px] text-gray-400 mt-1 block">📅 {new Date(rel.createdAt).toLocaleDateString('id-ID')}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Komentar */}
            <CommentSection postId={post.id} comments={post.comments} />
          </div>

          {/* === KANAN: SIDEBAR === */}
          <div className="hidden lg:block lg:col-span-4 pl-4 border-l border-gray-100">
             <div className="sticky top-24 space-y-8">
               <Sidebar />
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}