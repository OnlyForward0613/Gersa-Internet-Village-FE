/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "loremflickr.com",
      "m.media-amazon.com",
      "127.0.0.1",
      "images.unsplash.com",
      "api.pricewards.com",
      "picsum.photos",
    ],
  },
};

module.exports = nextConfig;
