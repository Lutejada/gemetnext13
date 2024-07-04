import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { obtenerUsuarioCorreo } from "../app/api/usuarios/servicios/obtenerUsuarioCorreo";
import { errorHandler } from "../app/api/common/errors/error.handler";
import { UsuarioNoExiste } from "@/app/api/usuarios/errors";
import { isValidPassword } from "./password-hash";
import { obtenerClientePorNombre } from "@/app/api/cliente/servicios/obtenerClientePorNombre";
import { User } from "@/types/next-auth";

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
          const cliente = await obtenerClientePorNombre(credentials.cliente);
          const usuario = await obtenerUsuarioCorreo(
            credentials.correo,
            cliente.id
          );
          if (!usuario) {
            throw new UsuarioNoExiste();
          }
          const valido = await isValidPassword(
            credentials.contraseña,
            usuario.password
          );
          if (!valido) {
            throw new Error("no autorizado");
          }
          const { password, ...rest } = usuario;

          return { ...rest, cliente };
        } catch (error: any) {
          console.error(error.message, error.stack);
          throw new Error("no autorizado");
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
    session(params) {
      console.log({ params });
      const { session, token } = params;
      session.user = token.user as User
      return session;
    },
  },
};
