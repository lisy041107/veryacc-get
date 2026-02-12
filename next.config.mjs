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
  // ⚡️ Cloudflare Pages 已经由 @cloudflare/next-on-pages 处理
  // 不再需要在全局配置中指定 experimental.runtime
}

export default nextConfig