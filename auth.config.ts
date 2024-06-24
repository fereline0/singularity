import { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 3 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: { ...session.user, ...user, ...token.user! },
      };
    },
  },
} satisfies NextAuthConfig;
