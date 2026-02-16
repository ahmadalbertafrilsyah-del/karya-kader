// app/components/CommentSection.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CommentSection({ postId, comments }: { postId: number, comments: any[] }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', content: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, postId }),
      });
      
      setForm({ name: '', email: '', content: '' }); 
      router.refresh(); 
    } catch (error) {
      console.error("Gagal kirim komentar", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-100">
      <h3 className="text-xl font-bold text-[#091c3e] mb-6">💬 Komentar ({comments ? comments.length : 0})</h3>

      <div className="space-y-6 mb-10">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-[#091c3e]">{comment.name}</span>
                <span className="text-xs text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString('id-ID')}
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic text-sm">Belum ada komentar.</p>
        )}
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
        <h4 className="font-bold text-md text-[#091c3e] mb-4">Tinggalkan Balasan</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" placeholder="Nama *" required
              className="w-full border border-gray-300 rounded p-3 text-sm focus:border-[#f5a623] outline-none"
              value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
            />
            <input 
              type="email" placeholder="Email *" required
              className="w-full border border-gray-300 rounded p-3 text-sm focus:border-[#f5a623] outline-none"
              value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
            />
          </div>
          <textarea 
            rows={4} placeholder="Tulis komentar..." required
            className="w-full border border-gray-300 rounded p-3 text-sm focus:border-[#f5a623] outline-none"
            value={form.content} onChange={(e) => setForm({...form, content: e.target.value})}
          ></textarea>
          <button type="submit" disabled={loading} className="bg-[#f5a623] text-[#091c3e] px-6 py-2 rounded font-bold hover:bg-[#091c3e] hover:text-white transition shadow-sm">
            {loading ? 'Mengirim...' : 'Kirim Komentar'}
          </button>
        </form>
      </div>
    </div>
  );
}