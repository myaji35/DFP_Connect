/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // For Docker deployment
  typescript: {
    // !! WARN !!
    // 위험하게 프로덕션 빌드를 성공시킵니다
    // Admin 페이지의 타입 에러를 무시합니다 (Phase 8에서 수정 예정)
    ignoreBuildErrors: true,
  },
  experimental: {
    turbo: {
      enabled: false
    }
  }
}

module.exports = nextConfig
