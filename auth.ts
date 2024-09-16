import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "./utils/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [Discord],
  events: {
    async signIn({ user, isNewUser }) {
      if (isNewUser) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            role: {
              connect: {
                name: "User",
              },
            },
          },
        });
      }
    },
    async session({ session }) {
      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        select: {
          role: {
            include: {
              abilities: true,
            },
          },
          bans: true,
        },
      });

      session.user.role = user?.role;
      session.user.bans = user?.bans;
    },
  },
});
