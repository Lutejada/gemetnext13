"use client";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { obtenerEjecucionPatrones } from "@/app/dashboard/hooks/useEjecucionPatron";
export default function EjecucionPatrones() {
  
  const {ejecuciones} = obtenerEjecucionPatrones()
  return (
    <>
      <DataTable columns={columns} data={ejecuciones} />
    </>
  );
}
