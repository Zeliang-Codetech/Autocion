/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  env: {
    API_KEY: process.env.BASE_URL,
    RAZORPAY_ID: process.env.RAZORPAY_ID,
  },
};

module.exports = nextConfig;
