import bcrypt from "bcrypt";
import * as crypto from 'crypto';

export const encodePassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const isValidPassword = (currentPassword: string, dbPassword: string) => {
  return bcrypt.compare(currentPassword, dbPassword);
};

export function generateRandomPassword(length:number = 8): string {
  return crypto.randomBytes(length).toString('base64').slice(0, length);
}