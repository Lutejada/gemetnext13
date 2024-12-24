import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UsuarioNoExiste } from "@/app/api/usuarios/dominio/errors";
import { isValidPassword } from "./password-hash";
import { obtenerClientePorNombre } from "@/app/api/cliente/servicios/obtenerClientePorNombre";
import { User } from "@/types/next-auth";
import { UsuarioReadRepositoryImp } from "../app/api/usuarios/infrastructure/read/usuarioReadRepositoryImp";
import { th } from "date-fns/locale";
const usuarioReadRepositoryImp = new UsuarioReadRepositoryImp();
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

          const usuario = await usuarioReadRepositoryImp.obtenerPorCorreo(
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
      const { session, token } = params;
      const user = token.user as User;
      session.user = user;
      if (!user.cliente.id) {
        throw new Error("no autorizado");
      }
      session.user.cliente_id = user.cliente.id;
      return session;
    },
  },
};
