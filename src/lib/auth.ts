import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { auth, handlers, signIn } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  session: {
    strategy: "database", // optional, but recommended if you’re gating freemium features
  },

  callbacks: {
    async session({ session, user }) {
      // expose the user.id (and whatever else you need) to the client
      session.user.id = user.id;
      session.user.email = user.email!;
      return session;
    },
  },
});
