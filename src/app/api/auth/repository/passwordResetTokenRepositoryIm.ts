import { prisma } from "@/lib/prisma";
import { PasswordResetTokenRepository } from ".";
import { PasswordResetToken } from "../entity";
import { Cliente } from "../../cliente/dominio/entity";

export class PasswordResetTokenRepositoryImp
  implements PasswordResetTokenRepository
{
  async deleteToken(id: string): Promise<void> {
    await prisma.passwordResetToken.delete({
      where: {
        id,
      },
    });
  }
  async createToken(
    token: Omit<PasswordResetToken, "id">
  ): Promise<PasswordResetToken> {
    const res = await prisma.passwordResetToken.create({
      data: {
        token: token.token,
        email: token.email,
        expires: token.expires,
        clienteId: token.cliente.id,
      },
    });
    return {
      id: res.id,
      token: res.token,
      email: res.email,
      expires: res.expires,
      cliente: { id: res.clienteId, nombre: res.clienteId },
    };
  }
  async getByToken(token: string): Promise<PasswordResetToken | null> {
    const res = await prisma.passwordResetToken.findFirst({
      where: {
        token: token,
      },
    });
    if (!res) return null;
    return {
      id: res.id,
      email: res.email,
      expires: res.expires,
      token: res.token,
      cliente: new Cliente(),
    };
  }

  async getByEmail(email: string) {
    const res = await prisma.passwordResetToken.findFirst({
      where: {
        email: email,
      },
    });
    if (!res) return null;
    return {
      id: res.id,
      email: res.email,
      expires: res.expires,
      token: res.token,
      cliente: new Cliente(),
    };
  }
}
