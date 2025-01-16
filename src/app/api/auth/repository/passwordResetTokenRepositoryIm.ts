import { prisma } from "@/lib/prisma";
import { PasswordResetTokenRepository } from ".";
import { PasswordResetToken } from "@prisma/client";

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
      },
    });
    return {
      id: res.id,
      token: res.token,
      email: res.email,
      expires: res.expires,
    };
  }
  async getByToken(token: string) {
    const res = await prisma.passwordResetToken.findFirst({
      where: {
        token: token,
      },
    });
    if (!res) return null;
    return res;
  }

  async getByEmail(email: string) {
    const res = await prisma.passwordResetToken.findFirst({
      where: {
        email: email,
      },
    });
    if (!res) return null;
    return res;
  }
}
