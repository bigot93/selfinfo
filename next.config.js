/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/selfinfo',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  webpack: (config, { isServer }) => {
    // Windows 시스템 파일 감시 제외
    if (!isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/.next/**',
          '**/pagefile.sys',
          '**/swapfile.sys',
          '**/hiberfil.sys',
        ],
      }
    }
    return config
  },
}

module.exports = nextConfig

