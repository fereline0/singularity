import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import loginUser from "@/requests/login.request";
import { prisma } from "./utils/prisma";
import { compare } from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginUser.parseAsync(credentials);

          const user = await prisma.user.findUniqueOrThrow({
            where: {
              email: email,
            },
          });

          if (!user.password) {
            return null;
          }

          const passwordConfirmation = await compare(password, user.password);

          if (!passwordConfirmation) {
            return null;
          }

          return user;
        } catch {
          return null;
        }
      },
    }),
    Discord,
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
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
