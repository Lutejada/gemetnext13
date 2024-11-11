"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

export default function AuthProvider({ children }: React.PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}
