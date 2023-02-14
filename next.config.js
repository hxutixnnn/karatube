// @ts-check

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  reactStrictMode: true,
  experimental: {
    nextScriptWorkers: true,
  },
});

module.exports = nextConfig;
