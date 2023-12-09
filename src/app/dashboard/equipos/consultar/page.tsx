"use client";
import { useEquiposStore } from "@/src/app/stores/equiposStore";
import { obtenerEquiposPorTermino, useEquipos } from "../../hooks/useEquipo";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import SearchForm from "@/components/serch-form";
export default function DemoPage() {
  const { equipos, obtenerEquipos } = useEquipos();
  return (
    <div className="container mx-auto py-10">
      <SearchForm buscarPorTermino={obtenerEquipos} />
      <DataTable columns={columns} data={equipos} />
    </div>
  );
}
