import type { NextConfig } from "next";

const isGithubPages =
  process.env.GITHUB_ACTIONS === "true" ||
  process.env.DEPLOY_TARGET === "gh-pages";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPages ? "/spotify-portfolio" : "",
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
