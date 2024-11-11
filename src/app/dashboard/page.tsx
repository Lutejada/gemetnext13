import React from "react";
import ProgramacionEquipos from "./equipos/programacion/(vencer)/table";

const dashboard = () => {
  return (
    <>
      <h2 className="text-center mb-4 font-semibold">
        Equipos proximos a vencer
      </h2>
      <ProgramacionEquipos />
    </>
  );
};

export default dashboard;
