/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  images: {
    unoptimized: true,
  },

  env: {
    API_KEY: process.env.BASE_URL,
    RAZORPAY_ID: process.env.RAZORPAY_ID,
    EMAIL_JS_SERVICE: process.env.EMAIL_JS_SERVICE,
    EMAIL_JS_PUBLIC_KEY: process.env.EMAIL_JS_PUBLIC_KEY,
    TEMPLATE_CODE_1: process.env.TEMPLATE_CODE_1,
    TEMPLATE_CODE_2: process.env.TEMPLATE_CODE_2,
    TOKEN: process.env.TOKEN,
  },
  
  async headers() {
      return [
          {
          // matching all API routes
          source: "/api/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "https://autocion-s436.vercel.app" }, // replace this your actual origin
                { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
          }
        ]
    }
}

module.exports = nextConfig;
