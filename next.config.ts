import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow the Base44 preview origin (changes whenever the env is recreated).
  allowedDevOrigins: process.env.BASE44_PUBLIC_HOST_SUFFIX
    ? [`3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`]
    : [],
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
    // Bind mounts in Docker often miss inotify events; poll so edits hot-reload.
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
