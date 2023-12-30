"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const dashboard = () => {
  const logOut = async () => {
    await signOut();
  };
  return (
    <>
      <div>dashboard</div>
      <Button onClick={logOut}>Cerrar sesion</Button>
    </>
  );
};

export default dashboard;
