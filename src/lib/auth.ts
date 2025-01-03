import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UsuarioNoExiste } from "@/app/api/usuarios/dominio/errors";
import { isValidPassword } from "./password-hash";
import { obtenerClientePorNombre } from "@/app/api/cliente/servicios/obtenerClientePorNombre";
import { UsuarioReadRepositoryImp } from "../app/api/usuarios/infrastructure/read/usuarioReadRepositoryImp";
import { UserAuth } from "@/app/api/auth/service";
import { AuthService } from "../app/api/auth/service/index";
import { ClienteService } from "../app/api/cliente/dominio/service/index";
import { UsuarioService } from "@/app/api/usuarios/dominio/service";
import { UsuarioWriteRepositoryImp } from "../app/api/usuarios/infrastructure/write/usuarioWriteRepositoryImp";
import { ClienteReadRepositoryImp } from "../app/api/cliente/infrastructure/read/clienteReadRepositoryImp";
const usuarioReadRepositoryImp = new UsuarioReadRepositoryImp();
const usuarioWriteRepositoryImp = new UsuarioWriteRepositoryImp();
const clienteReadRepositoryImp = new ClienteReadRepositoryImp();
const usuarioService = new UsuarioService(
  usuarioReadRepositoryImp,
  usuarioWriteRepositoryImp
);
const clienteService = new ClienteService(clienteReadRepositoryImp);
const authService = new AuthService(usuarioService, clienteService);
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
        const authUser = await authService.autenticar({
          correo: credentials.correo,
          password: credentials.password,
          cliente: credentials.cliente,
        });
        return authUser;
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
      const user = token.user as UserAuth;
      session.user = user;
      return session;
    },
  },
};
