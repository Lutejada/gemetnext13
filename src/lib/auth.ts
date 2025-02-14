import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UsuarioReadRepositoryImp } from "../app/api/usuarios/infrastructure/read/usuarioReadRepositoryImp";
import { UserAuth } from "@/app/api/auth/service";
import { AuthService } from "../app/api/auth/service/index";
import { ClienteService } from "../app/api/cliente/dominio/service/index";
import { UsuarioService } from "@/app/api/usuarios/dominio/service";
import { UsuarioWriteRepositoryImp } from "../app/api/usuarios/infrastructure/write/usuarioWriteRepositoryImp";
import { ClienteReadRepositoryImp } from "../app/api/cliente/infrastructure/read/clienteReadRepositoryImp";
import { PasswordResetTokenService } from "../app/api/auth/service/passwordResetTokenService";
import { PasswordResetTokenRepositoryImp } from "../app/api/auth/repository/passwordResetTokenRepositoryIm";
import { EmailService } from "../app/api/common/email/index";
const usuarioReadRepositoryImp = new UsuarioReadRepositoryImp();
const usuarioWriteRepositoryImp = new UsuarioWriteRepositoryImp();
const clienteReadRepositoryImp = new ClienteReadRepositoryImp();
const usuarioService = new UsuarioService(
  usuarioReadRepositoryImp,
  usuarioWriteRepositoryImp
);
const emailService = new EmailService();
const passwordResetTokenRepositoryImp = new PasswordResetTokenRepositoryImp();
const passwordResetTokenService = new PasswordResetTokenService(
  passwordResetTokenRepositoryImp
);
const clienteService = new ClienteService(clienteReadRepositoryImp);
const authService = new AuthService(
  usuarioService,
  clienteService,
  passwordResetTokenService,
  emailService
);
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
