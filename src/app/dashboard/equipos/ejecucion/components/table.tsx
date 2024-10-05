"use client";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { obtenerEjecucionEquipos } from "@/app/dashboard/hooks/useEjecucionEquipo";
export default function EjecucionEquipos() {
  
  const {ejecuciones} = obtenerEjecucionEquipos()
  return (
    <>
      <DataTable columns={columns} data={ejecuciones} />
    </>
  );
}
