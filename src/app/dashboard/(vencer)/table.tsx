"use client";
import { columns } from "./columns";
//import SearchForm from "@/components/serch-form";
import { useEffect, useState } from "react";
//import Paginador from "@/components/paginador";
import { DataTable } from "@/components/data-table";
import { obtenerProgramacionEquiposVencer } from "../hooks/useEquipo";
export default function ProgramacionEquiposVencer() {
  const { obtenerEquipos, equipos } = obtenerProgramacionEquiposVencer();
  useEffect(() => {
    obtenerEquipos();
  }, []);

  return (
    <>
      <DataTable columns={columns} data={equipos} />
      {/* <Paginador
        obtenervalores={obtenerEquipos}
        existeSiguientePagina={existeSiguientePagina}
      /> */}
    </>
  );
}
