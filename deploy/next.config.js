/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.pikiran-rakyat.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'newera.id', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        // Menggunakan wildcard (*) agar semua subdomain img.susercontent.com diizinkan
        hostname: '**.img.susercontent.com', 
        pathname: '/**',
      },
      {
        protocol: 'https',
        // Pakai wildcard biar semua subdomain gstatic (seperti tbn0, tbn1, dll) aman
        hostname: '**.gstatic.com', 
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig