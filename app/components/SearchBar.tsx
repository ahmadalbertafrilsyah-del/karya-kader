"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative hidden md:block">
      <input 
        type="text" 
        placeholder="Cari berita..." 
        className="bg-gray-100 text-gray-700 rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#f5a623] w-48 transition-all focus:w-64"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f5a623]">
        🔍
      </button>
    </form>
  );
}