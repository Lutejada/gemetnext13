import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        correo: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (
          credentials.correo !== "andres@correo.com" ||
          credentials.contraseña !== "12345"
        ) {
          throw new Error("error");
        }
        return {
          id: "123",
          holi: "mindu",
          nombre: "andres",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      console.log("callback", session);
      session.user = token.user as {};
      return session;
    },
    
  },
};
