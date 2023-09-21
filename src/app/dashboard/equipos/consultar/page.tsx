'use client'
import { useEffect } from "react";
import { obtenerEquipos } from "../../hooks/useEquipo";
import { columns } from "./columns";
import { DataTable } from "./data-table";


export default function DemoPage() {

  const { equipos } = obtenerEquipos()
  

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={equipos} />
    </div>
  );
}
