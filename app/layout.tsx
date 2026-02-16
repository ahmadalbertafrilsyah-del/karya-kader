import type { Metadata } from 'next';
import { Merriweather, Plus_Jakarta_Sans } from 'next/font/google'; // Import Font
import './globals.css'; // Panggil CSS yang tadi kita perbaiki
import Navbar from './components/Navbar'; // Sesuaikan path jika pakai ../
import Footer from './components/Footer';

// 1. Setting Font Poynter (Alternatif: Merriweather)
const poynter = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-poynter', // Nama variabel
  display: 'swap',
});

// 2. Setting Font Biasa (Opsional)
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portal Berita Karya Kader',
  description: 'Wadah informasi kader.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      {/* 3. Pasang Variabel Font di Body */}
      <body className={`${poynter.variable} ${jakarta.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        {children}
      </body>
    </html>
  );
}