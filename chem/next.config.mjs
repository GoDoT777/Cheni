/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://vddqfecxdyxrgwgcbwty.supabase.co", // Adjust the destination URL according to your backend server
      },
    ];
  },
};

export default nextConfig;
