import { hash, compare } from "bcryptjs";

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashPassword) {
  const isValid = await compare(password, hashPassword);
  return isValid;
}
