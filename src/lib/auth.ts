import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma"; // your prisma client instance
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite", ...etc
  }),

  // Cache session cookies for 5 minutes to reduce database lookups
  session: {
    cookieCache: {
      enabled: true, // Enable cookie caching
      maxAge: 60 * 5, // Cache duration in seconds (5 minutes)
    },
  },
  //Enables setting cookies in the response headers for Next.js API routes
  plugins: [nextCookies()],

  // Social providers configuration
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
