import { prisma } from '@/lib/prisma';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  // Cari Kategori
  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category) return notFound();

  // Cari Berita sesuai Kategori
  const rawPosts = await prisma.post.findMany({
    where: { 
      categoryId: category.id,
      status: 'published' 
    },
    orderBy: { createdAt: 'desc' },
    include: { author: true, category: true }
  });

  // Mapping Data
  const posts = rawPosts.map((post) => ({
    id: post.id,
    judul: post.title,      
    gambar: post.image,     
    deskripsi: post.content.replace(/<[^>]+>/g, '').substring(0, 150) + "...",
    category: post.category,
    createdAt: post.createdAt
  }));

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8">
            <div className="mb-8 border-b-2 border-[#091c3e] pb-2 flex items-baseline justify-between">
              <h1 className="text-2xl font-bold text-[#091c3e] uppercase">
                KANAL: <span className="text-[#f5a623]">{category.nama}</span>
              </h1>
              <span className="text-sm text-gray-500">{posts.length} berita</span>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {posts.map((post) => (
                <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                  {post.gambar && (
                    <div className="md:w-1/3 flex-shrink-0">
                      <Link href={`/news/${post.id}`}>
                        <img src={post.gambar} alt={post.judul} className="w-full h-48 object-cover rounded-md hover:opacity-90 transition"/>
                      </Link>
                    </div>
                  )}
                  <div className="flex-grow">
                    <div className="text-xs text-gray-400 mb-2">{new Date(post.createdAt).toLocaleDateString('id-ID')}</div>
                    <Link href={`/news/${post.id}`}>
                      <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-[#f5a623] transition">{post.judul}</h2>
                    </Link>
                    <p className="text-sm text-gray-600 line-clamp-2">{post.deskripsi}</p>
                  </div>
                </div>
              ))}
              {posts.length === 0 && <div className="text-center py-10 text-gray-400">Belum ada berita.</div>}
            </div>
          </div>

          <div className="lg:col-span-4">
             <div className="sticky top-24"><Sidebar /></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}