import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  async redirects() {
    return [
      {
        source: "/",
        destination: process.env.NEXT_PUBLIC_BASE_PATH as string,
        basePath: false,
        statusCode: 303,
        permanent: undefined,
      },
      {
        source: "/login",
        destination: (process.env.NEXT_PUBLIC_BASE_PATH + "/login") as string,
        basePath: false,
        statusCode: 303,
        permanent: undefined,
      },
    ];
  },
};

export default nextConfig;
