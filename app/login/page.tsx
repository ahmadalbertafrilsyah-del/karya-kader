// app/login/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        // Login Sukses
        router.push('/admin/dashboard');
      } else {
        // Login Gagal
        setError('Username atau Password salah!');
      }
    } catch (err) {
      setError('Terjadi kesalahan sistem.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#091c3e] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-[#f5a623] p-4 text-center">
          <h2 className="text-[#091c3e] font-bold text-xl uppercase tracking-widest">
            LOGIN REDAKSI
          </h2>
        </div>
        
        <div className="p-8">
          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded text-sm mb-4 text-center border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#f5a623] transition-colors"
                placeholder="Masukkan username..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-[#f5a623] transition-colors"
                placeholder="Masukkan password..."
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#091c3e] text-white font-bold py-3 rounded hover:bg-blue-900 transition-colors flex justify-center items-center"
            >
              {loading ? "Memproses..." : "MASUK DASHBOARD"}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-400">
            &copy; 2026 PMII Kawah Chondrodimuko
          </div>
        </div>
      </div>
    </div>
  );
}