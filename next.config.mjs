/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "feature.com",
        // port: "",
        // pathname: "/photos/**",
      },
    ],
    // domains: ["example.com","unsplash.com","images.pexels.com", "another-domain.net","cdn.sanity.io"],
  },
};

export default nextConfig;
