/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      '@prisma/client',
      '@bcrypt',
      'autoprefixer',
      'eslint',
      'postcss',
      'tailwindcss',
      'prisma',
      'typescript'
    ],
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
    ]
  }
}

module.exports = nextConfig
