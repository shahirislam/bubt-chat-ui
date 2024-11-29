/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false, // Disable the App Router
  },
  output: 'export',
  reactStrictMode: true,
  output: 'standalone',
};

module.exports = {
  images: {
    unoptimized: true,
  },
  nextConfig
} 
