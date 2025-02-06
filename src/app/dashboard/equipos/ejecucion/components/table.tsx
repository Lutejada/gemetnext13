"use client";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useObtenerEjecucionEquipos } from "@/app/dashboard/hooks/useEjecucionEquipo";
export default function EjecucionEquipos() {
  const { ejecuciones, isLoading } = useObtenerEjecucionEquipos();
  return (
    <>
      <DataTable columns={columns} data={ejecuciones} isLoading={isLoading} />
    </>
  );
}
