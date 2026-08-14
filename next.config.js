import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      {
        hostname: 'uninquisitive-eliseo-unflinchingly.ngrok-free.dev',
        protocol: 'https',
      },
      {
        hostname: 'strivetechpartners.karbh.com',
        protocol: 'https',
      },
      {
        hostname: 'www.strivetechpartners.karbh.com',
        protocol: 'https',
      },
      {
        hostname: 'strivetechpartners.com',
        protocol: 'https',
      },
      {
        hostname: 'www.strivetechpartners.com',
        protocol: 'https',
      },
      {
        hostname: 'strivetechpartners.vercel.app',
        protocol: 'https',
      },
      {
        hostname: 'www.strivetechpartners.vercel.app',
        protocol: 'https',
      },
    ],
  },
  reactStrictMode: true,
  redirects,
  eslint: {
    // Ensure ESLint runs during production builds and fails on errors.
    // Removing `ignoreDuringBuilds: true` prevents ESLint from being skipped.
    ignoreDuringBuilds: false,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = false;
    }
    config.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return config;
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
