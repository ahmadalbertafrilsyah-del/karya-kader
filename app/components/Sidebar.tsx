// app/components/Sidebar.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function Sidebar() {
  // 1. AMBIL AGENDA
  const agendas = await prisma.agenda.findMany({
    where: { tanggal: { gte: new Date() } },
    take: 3,
    orderBy: { tanggal: 'asc' }
  });

  // 2. AMBIL PAMFLET
  const pamphlets = await prisma.pamphlet.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4 
  });

  // 3. AMBIL BERITA POPULER
  const rawPosts = await prisma.post.findMany({
    take: 5,
    orderBy: { views: 'desc' },
    where: { status: 'published' },
    select: { 
      id: true, 
      title: true, 
      image: true,
      slug: true // 👈 KITA AMBIL SLUG BIAR LINKNYA BENAR
    }
  });

  const popularPosts = rawPosts.map(post => ({
    id: post.id,
    judul: post.title,
    gambar: post.image,
    slug: post.slug // Simpan slug
  }));

  return (
    <div className="space-y-8">
      
      {/* === WIDGET 1: AGENDA === */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-bold text-[#091c3e] border-b-2 border-[#f5a623] pb-2 mb-4 uppercase text-sm tracking-wider">
          Agenda Rayon
        </h3>
        <div className="space-y-4">
           {agendas.length > 0 ? (
             agendas.map(agenda => (
               <div key={agenda.id} className="flex gap-3 items-start border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                 <div className="bg-[#091c3e] text-white p-2 rounded text-center min-w-[50px] shrink-0">
                   <span className="block text-[10px] uppercase font-bold opacity-80">
                     {new Date(agenda.tanggal).toLocaleString('id-ID', { month: 'short' })}
                   </span>
                   <span className="block text-xl font-bold leading-none">
                     {new Date(agenda.tanggal).getDate()}
                   </span>
                 </div>
                 <div>
                   <h4 className="font-bold text-sm text-gray-800 leading-snug hover:text-[#f5a623] transition cursor-pointer">
                     {agenda.judul}
                   </h4>
                   <p className="text-[10px] text-gray-500 mt-1">📍 {agenda.lokasi || 'Sekretariat'}</p>
                 </div>
               </div>
             ))
           ) : <p className="text-gray-400 italic text-xs">Belum ada agenda.</p>}
        </div>
      </div>

      {/* === WIDGET 2: POSTER === */}
      {pamphlets.length > 0 && (
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-bold text-[#091c3e] border-b-2 border-[#f5a623] pb-2 mb-4 uppercase text-sm tracking-wider">
            Info / Poster
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
            {pamphlets.map((pamflet) => (
              <div key={pamflet.id} className="group rounded-lg overflow-hidden border border-gray-100 shadow-sm relative aspect-[3/4] cursor-pointer">
                <img src={pamflet.url} alt="Poster" className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === WIDGET 3: PALING DIBACA === */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-bold text-[#091c3e] border-b-2 border-[#f5a623] pb-2 mb-4 uppercase text-sm tracking-wider">
          Paling Dibaca
        </h3>
        <ul className="space-y-4">
          {popularPosts.map((post, index) => (
            <li key={post.id}>
              {/* 👇 PERBAIKAN: Link pakai slug, bukan ID */}
              <Link href={`/news/${post.slug}`} className="flex gap-3 items-center group">
                
                <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-md overflow-hidden relative border border-gray-100">
                  {post.gambar ? (
                    <img src={post.gambar} alt={post.judul} className="w-full h-full object-cover group-hover:scale-110 transition duration-300"/>
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">#PMII</div>
                  )}
                  <div className="absolute top-0 left-0 bg-[#f5a623] text-[#091c3e] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-br-md z-10">
                    {index + 1}
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className="text-xs md:text-sm font-bold text-gray-700 group-hover:text-[#f5a623] transition line-clamp-2 leading-snug">
                    {post.judul}
                  </h4>
                  <span className="text-[10px] text-gray-400 mt-1 block">Baca Selengkapnya →</span>
                </div>

              </Link>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}