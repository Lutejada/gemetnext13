import { getSession } from "next-auth/react";
import { authOptions } from "./auth";
import { NoAutorizado } from "./errors";
import { getServerSession } from "next-auth";
export const auth = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new NoAutorizado();
  }
  return session;
};

