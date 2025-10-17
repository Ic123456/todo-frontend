/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",  // what your frontend calls
        destination: "https://todo-backend-s910.onrender.com/:path*", // Django backend
      },
    ];
  },
};

export default nextConfig;
