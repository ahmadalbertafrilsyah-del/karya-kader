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

  return (
    // FIX: Padding atas dikurangi di HP (pt-10) biar gak terlalu tinggi, Laptop tetap (md:pt-16)
    <footer className="bg-[#091c3e] text-white pt-10 pb-6 md:pt-16 md:pb-8 border-t-4 border-[#f5a623]">
      <div className="container mx-auto px-4">
        
        {/* FIX: Gap antar kolom dirapatkan di HP (gap-6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          
          {/* === KOLOM 1: IDENTITAS & ALAMAT === */}
          <div>
            <div className="flex flex-row items-center gap-3 md:gap-4 mb-4">
              {config?.logoFooter && (
                <img 
                  src={config.logoFooter} 
                  alt="Logo" 
                  // FIX: Logo agak dikecilkan dikit di HP
                  className="h-10 w-auto md:h-14 object-contain bg-white/10 p-1 rounded" 
                />
              )}
              <div className="flex flex-col">
                 {/* FIX: Judul lebih kecil di HP (text-base) */}
                 <h3 className="text-[#f5a623] font-bold text-base md:text-lg uppercase tracking-wider leading-tight">
                  {config?.namaWeb || "PR. PMII KAWAH"}
                </h3>
                <span className="text-[10px] text-gray-400 tracking-widest uppercase">Website Resmi</span>
              </div>
            </div>

            {/* FIX: Deskripsi font kecil di HP (text-xs) */}
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 italic border-b border-gray-700 pb-4">
              "{config?.deskripsiFooter || "Wadah kreativitas dan informasi kader PMII."}"
            </p>
            
            <div className="space-y-2 border-l-2 border-[#f5a623] pl-4">
              <h4 className="font-bold text-white text-xs uppercase text-[#f5a623]">Sekretariat:</h4>
              {/* FIX: Alamat font kecil (text-xs) */}
              <p className="text-gray-300 text-xs leading-relaxed">
                {config?.alamat || "Alamat belum diatur."}
              </p>
              <div className="pt-2 space-y-1">
                <p className="text-gray-400 text-xs flex items-center gap-2">
                  📧 {config?.email || "-"}
                </p>
                <p className="text-gray-400 text-xs flex items-center gap-2">
                  📞 {config?.whatsapp || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* === KOLOM 2: SOSMED === */}
          <div>
            {/* FIX: Judul Section responsif (text-lg di HP, text-xl di Laptop) */}
            <h3 className="text-[#f5a623] font-bold text-lg md:text-xl mb-4 md:mb-6 uppercase tracking-wider">
              Ikuti Kami
            </h3>
            
            <div className="flex flex-col gap-2 md:gap-3 mb-6">
              {config?.instagram && (
                <a href={config.instagram} target="_blank" className="flex items-center gap-3 text-gray-300 hover:text-[#f5a623] transition group">
                   <span className="bg-white/10 p-1.5 md:p-2 rounded-full group-hover:bg-[#f5a623] group-hover:text-[#091c3e] transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                   </span> 
                   {/* FIX: Font Link Sosmed kecil di HP */}
                   <span className="text-xs md:text-sm font-medium">Instagram</span>
                </a>
              )}

              {config?.youtube && (
                <a href={config.youtube} target="_blank" className="flex items-center gap-3 text-gray-300 hover:text-[#f5a623] transition group">
                    <span className="bg-white/10 p-1.5 md:p-2 rounded-full group-hover:bg-[#f5a623] group-hover:text-[#091c3e] transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                    </span>
                    <span className="text-xs md:text-sm font-medium">YouTube</span>
                </a>
              )}

              {config?.tiktok && (
                <a href={config.tiktok} target="_blank" className="flex items-center gap-3 text-gray-300 hover:text-[#f5a623] transition group">
                    <span className="bg-white/10 p-1.5 md:p-2 rounded-full group-hover:bg-[#f5a623] group-hover:text-[#091c3e] transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                    </span>
                    <span className="text-xs md:text-sm font-medium">TikTok</span>
                </a>
              )}

              {config?.linkedin && (
                <a href={config.linkedin} target="_blank" className="flex items-center gap-3 text-gray-300 hover:text-[#f5a623] transition group">
                    <span className="bg-white/10 p-1.5 md:p-2 rounded-full group-hover:bg-[#f5a623] group-hover:text-[#091c3e] transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </span>
                    <span className="text-xs md:text-sm font-medium">LinkedIn</span>
                </a>
              )}
            </div>
          </div>

          {/* === KOLOM 3: KANAL === */}
          <div>
            <h3 className="text-[#f5a623] font-bold text-lg md:text-xl mb-4 md:mb-6 uppercase tracking-wider">
              Kanal
            </h3>
            {/* FIX: List Menu font kecil di HP (text-xs) */}
            <ul className="space-y-2 text-xs md:text-sm">
              <li><Link href="/" className="text-gray-300 hover:text-[#f5a623] flex items-center gap-2 transition"><span>🏠</span> Beranda</Link></li>
              <li><Link href="/tentang-kami" className="text-gray-300 hover:text-[#f5a623] flex items-center gap-2 transition"><span>👥</span> Tentang Kami</Link></li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`} className="text-gray-300 hover:text-[#f5a623] flex items-center gap-2 transition">
                    <span>📂</span> {cat.nama}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* === KOLOM 4: REDAKSI === */}
          <div>
            <h3 className="text-[#f5a623] font-bold text-lg md:text-xl mb-4 md:mb-6 uppercase tracking-wider">
              Redaksi
            </h3>
            <div className="bg-blue-900/50 p-4 md:p-6 rounded-xl border border-blue-800 hover:border-[#f5a623] transition group">
              <h4 className="font-bold text-white text-sm md:text-base mb-2 group-hover:text-[#f5a623] transition">Ingin Berkontribusi?</h4>
              <p className="text-gray-300 text-xs mb-4 leading-relaxed">
                Kirimkan tulisan, opini, atau liputan kegiatanmu ke redaksi kami.
              </p>
              
              <Link 
                href={config?.whatsapp ? `https://wa.me/${config.whatsapp}` : '#'} 
                target="_blank"
                className="inline-flex items-center gap-2 bg-[#f5a623] hover:bg-white hover:text-[#091c3e] text-[#091c3e] font-bold py-2 px-4 rounded transition-all w-full justify-center text-xs md:text-sm shadow-lg"
              >
                <span>Hubungi Redaksi</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </Link>
            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-800 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-center md:text-left">
          {/* FIX: Copyright sangat kecil di HP biar muat 1 baris */}
          <p className="text-gray-500 text-[10px] md:text-xs">
            © {new Date().getFullYear()} <span className="text-[#f5a623]">LSO Jurnalistik Penelitian dan Pengembangan</span>. All rights reserved.
          </p>
          <p className="text-gray-600 text-[9px] md:text-[10px] uppercase tracking-widest">
            PR. PMII "Kawah" Chondrodimuko
          </p>
        </div>
      </div>
    </footer>
  );
}