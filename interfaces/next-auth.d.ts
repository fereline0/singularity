import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: any;
      bans: any;
    } & DefaultSession["user"];
  }
}
