import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Allow images from ANY remote host (e.g. raw.githubusercontent.com,
  // your own GitHub repo, or any other direct image URL).
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // any HTTPS host
      },
      {
        protocol: 'http',
        hostname: '**', // any HTTP host
      },
    ],
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
