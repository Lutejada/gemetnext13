import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { obtenerUsuarioCorreo } from "../app/api/usuarios/servicios/obtenerUsuarioCorreo";
import { errorHandler } from "../app/api/common/errors/error.handler";

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
        try {
          console.log({credentials});
          const {id,nombre,password} = await obtenerUsuarioCorreo(credentials.correo);
          if(password !== credentials.contraseña){
            return null
          }
          return {id,nombre};
        } catch (error) {
          throw new Error('no autorizado')
        }
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
      session.user = token.user as {};
      return session;
    },
  },
};
