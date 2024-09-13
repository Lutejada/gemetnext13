"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";
import ProgramacionEquipos from "./equipos/programacion/(vencer)/table";

const dashboard = () => {
  const logOut = async () => {
    await signOut();
  };

  return (
    <>
      <h2 className="text-center mb-4 font-semibold">Equipos proximos a vencer</h2>
      <ProgramacionEquipos />
      <Button onClick={logOut}>Cerrar sesion</Button>
    </>
  );
};

export default dashboard;
