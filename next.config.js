/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/api",
        destination:
          "https://awesome-arcade-extensions-website-clicks-api-replit.ckyiu.repl.co/all",
      },
      {
        source: "/api/:path*",
        destination:
          "https://awesome-arcade-extensions-website-clicks-api-replit.ckyiu.repl.co/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
