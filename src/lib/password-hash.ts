import bcrypt from "bcrypt";

export const encodePassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const isValidPassword = (currentPassword: string, dbPassword: string) => {
  return bcrypt.compare(currentPassword, dbPassword);
};
