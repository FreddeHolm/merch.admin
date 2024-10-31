/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['cdn.sanity.io'], // Add the domain(s) of your external image sources here
  },
}

module.exports = nextConfig
