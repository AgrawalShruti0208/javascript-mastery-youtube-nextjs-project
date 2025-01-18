import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    //dangerouslyAllowSVG: true, // Keep this only if you're working with SVG images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '', // Empty port is fine for https
        pathname: '/**', // This allows any path under this domain
      },
    ],
  },
};

export default nextConfig;


