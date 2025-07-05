import type { NextConfig } from "next";

// Enable importing SVG files as React components using @svgr/webpack
const withSvg: NextConfig["webpack"] = (config) => {
  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
        },
      },
    ],
  });
  return config;
};

const nextConfig: NextConfig = {
  /* config options here */
  webpack: withSvg,
};

export default nextConfig;
