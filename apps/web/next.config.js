/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  typescript: {
    tsconfigPath: '../../tsconfig.json',
  },

  images: {
    domains: [
      'image.tmdb.org',
      'a.ltrbxd.com',
      'www.themoviedb.org',
      'loremflickr.com',
      'avatars.githubusercontent.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
