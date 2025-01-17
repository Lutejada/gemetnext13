import { PasswordResetToken } from "../entity";

export interface PasswordResetTokenRepository {
  getByToken(token: string): Promise<PasswordResetToken | null>;
  getByEmail(email: string): Promise<PasswordResetToken | null>;
  deleteToken(id: string): Promise<void>;
  createToken(
    token: Omit<PasswordResetToken, "id">
  ): Promise<PasswordResetToken>;
}
