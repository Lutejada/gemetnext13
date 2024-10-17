"use client";
import { columns } from "./columns";
//import SearchForm from "@/components/serch-form";
import { useEffect, useState } from "react";
//import Paginador from "@/components/paginador";
import { DataTable } from "@/components/data-table";
import { obtenerProgramacionPatrones } from "../../../hooks/usePatron";
export default function ProgramacionPatrones() {
  const { obtenerPatrones, patrones } = obtenerProgramacionPatrones();
  useEffect(() => {
    obtenerPatrones();
  }, []);

  return (
    <>
      <DataTable columns={columns} data={patrones} />
      {/* <Paginador
        obtenervalores={obtenerEquipos}
        existeSiguientePagina={existeSiguientePagina}
      /> */}
    </>
  );
}
