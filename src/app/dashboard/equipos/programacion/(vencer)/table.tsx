"use client";
import { columns } from "./columns";
//import SearchForm from "@/components/serch-form";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { obtenerProgramacionEquipos } from "../../../hooks/useProgramacionEquipos";
import Paginador from "@/components/paginador";
export default function ProgramacionEquipos() {
  const { obtenerEquipos, equipos } = obtenerProgramacionEquipos();
  useEffect(() => {
    obtenerEquipos();
  }, []);

  return (
    <>
      <DataTable columns={columns} data={equipos?.data ?? []} />
      <Paginador
        obtenervalores={obtenerEquipos}
        existeSiguientePagina={equipos?.existePaginaSiguiente ?? false}
      />
    </>
  );
}
