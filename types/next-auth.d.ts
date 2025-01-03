import { UserAuth } from "@/app/api/auth/service";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: UserAuth & DefaultSession["user"];
  }
}
