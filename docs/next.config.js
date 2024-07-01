const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

module.exports = withNextra({
  eslint: {
    // ESLint behaves weirdly in this monorepo.
    ignoreDuringBuilds: true,
  },
});
