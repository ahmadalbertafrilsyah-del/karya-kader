"use client"; // Wajib client component untuk interaksi klik

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Definisi tipe data kategori (sesuaikan dengan schema prisma Mas)
type Category = {
  id: number;
  slug: string;
  nama: string;
};

export default function NavMobile({ categories }: { categories: Category[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden"> 
      {/* Tombol Hamburger (Hanya muncul di HP) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white focus:outline-none bg-[#f5a623] rounded-md"
      >
        {isOpen ? (
          // Icon X (Tutup)
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          // Icon Garis 3 (Buka)
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        )}
      </button>

      {/* Menu Dropdown (Muncul saat isOpen = true) */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#091c3e] border-t border-white/10 shadow-xl z-50 animate-in slide-in-from-top-5 duration-300">
          <ul className="flex flex-col p-4 space-y-3 font-bold text-white uppercase text-sm">
            <li>
              <Link 
                href="/" 
                onClick={() => setIsOpen(false)}
                className={`block py-2 hover:text-[#f5a623] ${pathname === '/' ? 'text-[#f5a623]' : ''}`}
              >
                Beranda
              </Link>
            </li>
            
            {/* Loop Kategori */}
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/category/${cat.slug}`}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 hover:text-[#f5a623] ${pathname === `/category/${cat.slug}` ? 'text-[#f5a623]' : ''}`}
                >
                  {cat.nama}
                </Link>
              </li>
            ))}

            <li>
              <Link 
                href="/tentang-kami" 
                onClick={() => setIsOpen(false)}
                className="block py-2 hover:text-[#f5a623]"
              >
                Tentang Kami
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}