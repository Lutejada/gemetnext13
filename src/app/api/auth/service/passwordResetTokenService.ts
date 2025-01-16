import { randomUUID } from "crypto";
import { PasswordResetTokenRepository } from "../repository";
import { addHours } from "date-fns";

export class PasswordResetTokenService {
  constructor(
    private passwordResetTokenRepository: PasswordResetTokenRepository
  ) {}

  async generateNewToken(email: string) {
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
    });

    return newToken;
  }
}
