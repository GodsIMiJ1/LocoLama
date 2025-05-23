/** @type {import('next').NextConfig} */
const nextConfig = {
  // Change the port to 3030
  devServer: {
    port: 3030,
  },
  // Other Next.js config options
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
