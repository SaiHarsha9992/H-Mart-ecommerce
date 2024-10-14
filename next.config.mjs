const nextConfig = {
  images: {
    domains: ["cdn.sanity.io"],
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Applies to all routes
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, must-revalidate", // Prevents caching
          },
        ],
      },
    ];
  },
};
