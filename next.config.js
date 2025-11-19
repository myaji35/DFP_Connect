/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // For Docker deployment
  experimental: {
    turbo: {
      enabled: false
    }
  }
}

module.exports = nextConfig
