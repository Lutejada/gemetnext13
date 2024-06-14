"use client";

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button style={{ marginRight: 10  }} onClick={() => signIn()}>
      Sign in
    </button>
  );
};