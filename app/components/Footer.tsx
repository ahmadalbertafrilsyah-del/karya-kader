// app/components/Footer.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; 

export default async function Footer() {
  const config = await prisma.webConfig.findFirst();
  
  const categories = await prisma.category.findMany({
    take: 5,
    orderBy: { nama: 'asc' }
  });

  // (LOGIKA PETA DIHAPUS DARI SINI)

  return (
    <footer className="bg-[#091c3e] text-white pt-16 pb-8 border-t-4 border-[#f5a623]">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* === KOLOM 1: IDENTITAS & ALAMAT === */}
          <div>
            {/* LOGO & NAMA */}
            <div className="flex flex-row items-center gap-4 mb-4">
              {config?.logoFooter && (
                <img 
                  src={config.logoFooter} 
                  alt="Logo" 
                  className="h-14 w-auto object-contain bg-white/10 p-1 rounded" 
                />
              )}
              <div className="flex flex-col">
                 <h3 className="text-[#f5a623] font-bold text-lg uppercase tracking-wider leading-tight">
                  {config?.namaWeb || "PR. PMII KAWAH"}
                </h3>
                <span className="text-[10px] text-gray-400 tracking-widest uppercase">Website Resmi</span>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed mb-6 italic border-b border-gray-700 pb-4">
              "{config?.deskripsiFooter || "Wadah kreativitas dan informasi kader PMII."}"
            </p>
            
            <div className="space-y-2 border-l-2 border-[#f5a623] pl-4">
              <h4 className="font-bold text-white text-xs uppercase text-[#f5a623]">Sekretariat:</h4>
              <p className="text-gray-300 text-xs leading-relaxed">
                {config?.alamat || "Alamat belum diatur."}
              </p>
              <div className="pt-2">
                <p className="text-gray-400 text-xs flex items-center gap-2">
                  📧 {config?.email || "-"}
                </p>
                <p className="text-gray-400 text-xs flex items-center gap-2">
                  📞 {config?.whatsapp || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* === KOLOM 2: SOSMED (PETA SUDAH DIHAPUS) === */}
          <div>
            <h3 className="text-[#f5a623] font-bold text-xl mb-6 uppercase tracking-wider">
              Ikuti Kami
            </h3>
            
            <div className="flex flex-col gap-3 mb-6">
              {config?.instagram && (
                <a href={config.instagram} target="_blank" className="flex items-center gap-3 text-gray-300 hover:text-[#f5a623] transition group">
                   <span className="bg-white/10 p-2 rounded-full group-hover:bg-[#f5a623] group-hover:text-[#091c3e] transition">📸</span> 
                   <span className="text-sm">Instagram</span>
                </a>
              )}
              {config?.youtube && (
                <a href={config.youtube} target="_blank" className="flex items-center gap-3 text-gray-300 hover:text-[#f5a623] transition group">
                    <span className="bg-white/10 p-2 rounded-full group-hover:bg-[#f5a623] group-hover:text-[#091c3e] transition">▶️</span>
                    <span className="text-sm">YouTube</span>
                </a>
              )}
              {config?.tiktok && (
                <a href={config.tiktok} target="_blank" className="flex items-center gap-3 text-gray-300 hover:text-[#f5a623] transition group">
                    <span className="bg-white/10 p-2 rounded-full group-hover:bg-[#f5a623] group-hover:text-[#091c3e] transition">🎵</span>
                    <span className="text-sm">TikTok</span>
                </a>
              )}
              {config?.linkedin && (
                <a href={config.linkedin} target="_blank" className="flex items-center gap-3 text-gray-300 hover:text-[#f5a623] transition group">
                    <span className="bg-white/10 p-2 rounded-full group-hover:bg-[#f5a623] group-hover:text-[#091c3e] transition">💼</span>
                    <span className="text-sm">LinkedIn</span>
                </a>
              )}
            </div>
          </div>

          {/* === KOLOM 3: KANAL === */}
          <div>
            <h3 className="text-[#f5a623] font-bold text-xl mb-6 uppercase tracking-wider">
              Kanal
            </h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-[#f5a623] text-sm">🏠 Beranda</Link></li>
              <li><Link href="/tentang-kami" className="text-gray-300 hover:text-[#f5a623] text-sm">👥 Tentang Kami</Link></li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`} className="text-gray-300 hover:text-[#f5a623] text-sm">
                    📂 {cat.nama}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* === KOLOM 4: REDAKSI === */}
          <div>
            <h3 className="text-[#f5a623] font-bold text-xl mb-6 uppercase tracking-wider">
              Redaksi
            </h3>
            <div className="bg-blue-900/50 p-6 rounded-xl border border-blue-800 hover:border-[#f5a623] transition">
              <h4 className="font-bold text-white text-md mb-2">Ingin Berkontribusi?</h4>
              <p className="text-gray-300 text-xs mb-4 leading-relaxed">
                Kirimkan tulisanmu ke redaksi kami.
              </p>
              
              <Link 
                href={config?.whatsapp ? `https://wa.me/${config.whatsapp}` : '#'} 
                target="_blank"
                className="inline-flex items-center gap-2 bg-[#f5a623] hover:bg-white hover:text-[#091c3e] text-[#091c3e] font-bold py-2 px-4 rounded transition-all w-full justify-center text-sm"
              >
                <span>Hubungi Redaksi</span>
                <span>📲</span>
              </Link>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} Jurnalistik Penelitian dan Pengembangan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}