"use client";
import { useEquiposStore } from "@/src/app/stores/equiposStore";
import { obtenerEquiposPorTermino, useEquipos } from '../../hooks/useEquipo';
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect } from "react";
export default function DemoPage() {
  const  {equipos} = useEquipos()
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={equipos} />
    </div>
  );
}
