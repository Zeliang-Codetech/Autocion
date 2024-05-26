/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },

  images: {
    unoptimized: true,
  },

  env: {
    // API_KEY: process.env.BASE_URL,
    API_KEY: "https://autocion-arci-git-main-moachubatomatos-projects.vercel.app",
    RAZORPAY_ID: process.env.RAZORPAY_ID,
    EMAIL_JS_SERVICE: process.env.EMAIL_JS_SERVICE,
    EMAIL_JS_PUBLIC_KEY: process.env.EMAIL_JS_PUBLIC_KEY,
    TEMPLATE_CODE_1: process.env.TEMPLATE_CODE_1,
    TEMPLATE_CODE_2: process.env.TEMPLATE_CODE_2,
    TOKEN: process.env.TOKEN,
  },
};

module.exports = nextConfig;
