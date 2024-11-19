"use client";
import { listarEquipos } from "../../hooks/useEquipo";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import SearchForm from "@/components/serch-form";
import { useEffect } from "react";
import Paginador from "../../../../components/paginador";
export default function DemoPage() {
  const { obtenerEquipos, equipos, existeSiguientePagina, isLoading } =
    listarEquipos();
  useEffect(() => {
    obtenerEquipos();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <SearchForm buscarPorTermino={obtenerEquipos} />
      <DataTable columns={columns} data={equipos} isLoading={isLoading} />
      <Paginador
        obtenervalores={obtenerEquipos}
        existeSiguientePagina={existeSiguientePagina}
      />
    </div>
  );
}
