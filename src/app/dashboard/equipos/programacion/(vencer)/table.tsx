"use client";
import { columns } from "./columns";
//import SearchForm from "@/components/serch-form";
import { useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { obtenerProgramacionEquipos } from "../../../hooks/useProgramacionEquipos";
import Paginador from "@/components/paginador";
export default function ProgramacionEquipos() {
  const { obtenerEquipos, equipos, page, existePaginaSiguiente, isLoading } =
    obtenerProgramacionEquipos();
  useEffect(() => {
    obtenerEquipos();
  }, []);

  return (
    <>
      <DataTable columns={columns} data={equipos ?? []} isLoading={isLoading} />
      <Paginador
        obtenervalores={obtenerEquipos}
        currentPage={page}
        existeSiguientePagina={existePaginaSiguiente}
      />
    </>
  );
}
