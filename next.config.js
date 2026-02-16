/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! PERHATIAN !!
    // Ini membolehkan build sukses meski ada error TypeScript
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ini membolehkan build sukses meski ada peringatan ESLint
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Membolehkan semua gambar dari internet
      },
    ],
  },
};

module.exports = nextConfig;