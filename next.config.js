/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['image.tmdb.org', 'a.ltrbxd.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
