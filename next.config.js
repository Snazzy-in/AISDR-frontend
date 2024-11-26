const nextConfig = {
  async rewrites() {
    return [
      { source: '/campaigns/create', destination: '/campaigns/create' },
    ];
  },
};

module.exports = nextConfig;

