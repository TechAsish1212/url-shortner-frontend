import type { NextConfig } from "next";

const API_URL=process.env.API_URL;

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites(){
    return [
      {
        source:"/api/auth/login",
        destination:`${API_URL}auth/signin`
      },
      {
        source:"/api/auth/me",
        destination:`${API_URL}auth/me`
      },
      {
        source:"/api/auth/profile",
        destination:`${API_URL}auth/profile`
      }
    ]
  }
};

export default nextConfig;
