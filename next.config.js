const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Detect if running in CI/container environment
const isContainerEnv = process.env.CI === 'true' || process.env.EMERGENT_PREVIEW === 'true';

const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    serverComponentsExternalPackages: ['mongodb'],
  },
  webpack(config, { dev }) {
    if (dev && isContainerEnv) {
      // Only use polling in container environments where file watching is unreliable
      config.watchOptions = {
        poll: 2000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules'],
      };
    }
    return config;
  },
  // Dev-friendly onDemandEntries settings
  // Higher values = pages stay in memory longer = faster navigation
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 60 seconds (was 10 seconds)
    pagesBufferLength: 10, // Keep 10 pages in memory (was 2)
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "Content-Security-Policy", value: "frame-ancestors *;" },
          { key: "Access-Control-Allow-Origin", value: process.env.CORS_ORIGINS || "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "*" },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
