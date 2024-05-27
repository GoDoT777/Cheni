/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/users/admin@gmail.com", // Adjust the destination URL according to your backend server
      },
    ];
  },
};

export default nextConfig;
