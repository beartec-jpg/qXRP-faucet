/** @type {import('next').NextConfig} */
const nextConfig = {
  // xrpl uses Node.js crypto; must not run in the Edge runtime
  serverExternalPackages: ['xrpl'],
}

export default nextConfig
