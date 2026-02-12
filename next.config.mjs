/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // 🚀 必须添加以下部分，确保兼容 Cloudflare Pages
  experimental: {
    runtime: 'edge',
  },
}

export default nextConfig