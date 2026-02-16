import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import SearchBar from './SearchBar'; 
import NavMobile from './NavMobile'; 

export default async function Navbar() {
  // 1. AMBIL DATA KONFIGURASI WEB
  const config = await prisma.webConfig.findFirst();

  // 2. AMBIL KATEGORI DARI DATABASE
  const categories = await prisma.category.findMany({
    take: 6,
    orderBy: { nama: 'asc' }
  });

  // 3. FORMAT TANGGAL
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric'
  });

  return (
    <header className="font-sans shadow-md z-50 sticky top-0 bg-white">
      
      {/* === 1. TOP BAR (INFO & SOSMED) === */}
      {/* FIX: Ubah py-2 jadi py-1.5 agar lebih ramping */}
      <div className="bg-[#091c3e] text-white text-[10px] md:text-xs py-1.5 border-b border-white/10">
        
        {/* FIX: Gunakan 'flex-row' (bukan flex-col) agar Tanggal & Sosmed sejajar Kiri-Kanan di HP */}
        <div className="container mx-auto px-4 flex flex-row justify-between items-center">
          
          {/* KIRI: Tanggal */}
          <div className="flex items-center gap-2 opacity-90 truncate max-w-[50%]">
            <span>🗓️ {today}</span>
          </div>

          {/* KANAN: Sosmed */}
          <div className="flex items-center gap-3 md:gap-5">
            <div className="flex gap-3 md:gap-4">
              
              {/* Instagram */}
              <a href={config?.instagram || "#"} target="_blank" className="hover:text-[#f5a623] transition transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>

              {/* Youtube */}
              <a href={config?.youtube || "#"} target="_blank" className="hover:text-[#f5a623] transition transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>

              {/* TikTok */}
              <a href={config?.tiktok || "#"} target="_blank" className="hover:text-[#f5a623] transition transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
              </a>

              {/* LinkedIn */}
              <a href={config?.linkedin || "#"} target="_blank" className="hover:text-[#f5a623] transition transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>

            </div>
          </div>
        </div>
      </div>

      {/* === 2. MAIN HEADER (LOGO & SEARCH) === */}
      {/* FIX: Ubah padding vertical (py) jadi 'py-2' agar jarak bawah tulisan lebih rapat */}
      <div className="bg-white py-2 md:py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-6">
            
            {/* Logo Section */}
            <div className="w-full md:w-auto flex justify-between items-center">
               {/* Logo & Teks */}
               <Link href="/" className="flex items-center gap-3 md:gap-4 group">
                  <div className="w-12 h-12 md:w-16 md:h-16 relative shrink-0 transition-transform group-hover:scale-105">
                    <img 
                      src={config?.logoFooter || "https://i.ibb.co.com/FL6jYkj8/LOGO-RKCD-FIKS-1.png"} 
                      alt="Logo Web" 
                      className="object-contain w-full h-full drop-shadow-sm" 
                    />
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <h1 className="text-xl md:text-3xl font-extrabold text-[#091c3e] tracking-tight leading-none group-hover:text-[#f5a623] transition-colors uppercase">
                      KARYA KADER
                    </h1>
                    {/* Tulisan bawah logo */}
                    <div className="mt-0.5 md:mt-1">
                       <span className="text-[9px] md:text-[11px] font-bold bg-[#091c3e] text-[#f5a623] px-2 md:px-3 py-0.5 md:py-1 rounded-md uppercase tracking-wider shadow-sm">
                         PR. PMII "KAWAH" CHONDRODIMUKO
                       </span>
                    </div>
                  </div>
               </Link>

               {/* Tombol Hamburger (Mobile Only) */}
               <div className="md:hidden">
                  <NavMobile categories={categories} />
               </div>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-auto md:min-w-[300px]">
               <SearchBar />
            </div>

          </div>
        </div>
      </div>

      {/* === 3. NAVIGATION MENU (DESKTOP ONLY) === */}
      <div className="hidden md:block bg-[#091c3e] border-t-4 border-[#f5a623] shadow-lg">
        <div className="container mx-auto px-4">
           <ul className="flex flex-wrap justify-start gap-x-8 text-white text-sm font-bold uppercase py-4 tracking-wider">
             
             {/* Menu Desktop */}
             <li>
               <Link href="/" className="hover:text-[#f5a623] transition relative group py-2">
                 Beranda
                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f5a623] transition-all duration-300 group-hover:w-full"></span>
               </Link>
             </li>

             {categories.map((cat) => (
               <li key={cat.id}>
                 <Link href={`/category/${cat.slug}`} className="hover:text-[#f5a623] transition relative group py-2">
                   {cat.nama}
                   <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f5a623] transition-all duration-300 group-hover:w-full"></span>
                 </Link>
               </li>
             ))}

             <li>
               <Link href="/tentang-kami" className="hover:text-[#f5a623] transition relative group py-2">
                 Tentang Kami
                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f5a623] transition-all duration-300 group-hover:w-full"></span>
               </Link>
             </li>

           </ul>
        </div>
      </div>

    </header>
  );
}