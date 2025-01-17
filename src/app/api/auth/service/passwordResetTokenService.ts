import { randomUUID } from "crypto";
import { PasswordResetTokenRepository } from "../repository";
import { addHours } from "date-fns";
import { TokenNotExist } from "../errors";

export class PasswordResetTokenService {
  constructor(
    private passwordResetTokenRepository: PasswordResetTokenRepository
  ) {}

  async generateNewToken(clienteId: string, email: string) {
    const token = randomUUID();
    const expires = addHours(new Date(), 24);

    const existingToken = await this.passwordResetTokenRepository.getByEmail(
      email
    );

    if (existingToken) {
      await this.passwordResetTokenRepository.deleteToken(existingToken.id);
    }

    const newToken = await this.passwordResetTokenRepository.createToken({
      email,
      token,
      expires,
      cliente: {
        id: clienteId,
        nombre: clienteId,
      },
    });

    return newToken;
  }

  async getToken(token: string) {
    const tokenFind = await this.passwordResetTokenRepository.getByToken(token);
    if (!tokenFind) {
      throw new TokenNotExist();
    }
    return tokenFind;
  }

  async deleteToken(tokenId: string) {
    await this.passwordResetTokenRepository.deleteToken(tokenId);
  }
}
