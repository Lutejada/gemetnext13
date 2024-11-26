"use client";
import { columns } from "./columns";
//import SearchForm from "@/components/serch-form";
import { useEffect, useState } from "react";
//import Paginador from "@/components/paginador";
import { DataTable } from "@/components/data-table";
import { obtenerProgramacionPatrones } from "../../../hooks/useProgramacionPatrones";
import Paginador from "@/components/paginador";
export default function ProgramacionPatrones() {
  const { obtenerPatrones, patrones, isLoading, page, existePaginaSiguiente } =
    obtenerProgramacionPatrones();
  useEffect(() => {
    obtenerPatrones();
  }, []);

  return (
    <>
      <DataTable columns={columns} data={patrones} isLoading={isLoading} />
      <Paginador
        currentPage={page}
        obtenervalores={obtenerPatrones}
        existeSiguientePagina={existePaginaSiguiente}
      />
    </>
  );
}
