"use client";
import { listarEquipos } from "../../hooks/useEquipo";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import SearchForm from "@/components/serch-form";
import { useEffect } from "react";
import Paginador from "../../../../components/paginador";
import { useObtenerPatrones } from "../../hooks/usePatron";
export default function ConsultarPatrones() {
  const { obtenerPatrones, patrones, existeSiguientePagina, isLoading } =
    useObtenerPatrones();
  useEffect(() => {
    obtenerPatrones();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-center mb-4 font-semibold">Consultar Patrones</h2>
      {/* <SearchForm buscarPorTermino={obtenerPatrones} /> */}
      <DataTable columns={columns} data={patrones} isLoading={isLoading} />
      <Paginador
        obtenervalores={obtenerPatrones}
        existeSiguientePagina={existeSiguientePagina}
      />
    </div>
  );
}
