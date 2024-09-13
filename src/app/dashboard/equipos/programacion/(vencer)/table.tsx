"use client";
import { columns } from "./columns";
//import SearchForm from "@/components/serch-form";
import { useEffect, useState } from "react";
//import Paginador from "@/components/paginador";
import { DataTable } from "@/components/data-table";
import { obtenerProgramacionEquipos } from "../../../hooks/useEquipo";
export default function ProgramacionEquipos() {
  const { obtenerEquipos, equipos } = obtenerProgramacionEquipos();
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
