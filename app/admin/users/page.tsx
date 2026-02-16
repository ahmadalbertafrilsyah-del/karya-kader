// app/admin/users/page.tsx
"use client";
import { useState, useEffect } from 'react';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [form, setForm] = useState({ username: "", password: "" });

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    const data = await res.json();
    setUsers(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ username: "", password: "" });
    fetchUsers();
  };

  const handleDelete = async (id: number) => {
    if(!confirm("Hapus user ini?")) return;
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-[#091c3e]">👥 Kelola Pengguna / Tim</h1>
      
      {/* FORM INPUT */}
      <div className="bg-white p-6 rounded shadow mb-8 max-w-lg">
        <h3 className="font-bold mb-4">Tambah Admin Baru</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Username" 
            className="border p-2 rounded"
            value={form.username}
            onChange={(e) => setForm({...form, username: e.target.value})}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="border p-2 rounded"
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})}
            required
          />
          <button type="submit" className="bg-[#091c3e] text-white font-bold px-4 py-2 rounded hover:bg-[#f5a623] hover:text-[#091c3e] transition">Simpan User</button>
        </form>
      </div>

      {/* TABEL DATA */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Username</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold">{user.username}</td>
                <td className="p-4"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase">{user.role || 'Admin'}</span></td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700 font-bold text-sm">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}