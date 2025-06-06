/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
