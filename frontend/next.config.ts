/*import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  *//* config options here *//*
};

export default nextConfig;
*/

/* @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/backend/:path*',
                destination: 'https://localhost:7001/api/:path*' // C# backend
            }
        ];
    },
    env: {
        BACKEND_API_URL: process.env.BACKEND_API_URL || 'https://localhost:7001/api',
    }
}

module.exports = nextConfig