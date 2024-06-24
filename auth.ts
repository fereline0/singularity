import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";
import loginRequest from "@/requests/login.request";
import { compare } from "bcryptjs";
import { authConfig } from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./utils/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } =
            await loginRequest.parseAsync(credentials);

          const user = await prisma.user.findUniqueOrThrow({
            where: {
              email: email,
            },
          });

          if (!user.password) {
            return null;
          }

          // const passwordConfirmation = await compare(password, user.password);

          // if (!passwordConfirmation) {
          //   return null;
          // }

          return user;
        } catch {
          return null;
        }
      },
    }),
    Discord,
  ],
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
      const user = await prisma.user.findFirst({
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
