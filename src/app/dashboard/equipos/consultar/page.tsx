"use client";
import { useEquiposStore } from "@/src/app/stores/equiposStore";
import { obtenerEquiposPorTermino, useEquipos } from "../../hooks/useEquipo";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect } from "react";
export default function DemoPage() {
  const store = useEquiposStore();
  const { obtenerEquipos } = obtenerEquiposPorTermino();
  useEffect(() => {
    obtenerEquipos({}).then((equipos) => store.addEquipos(equipos));
  }, []);
  console.log("me llame", store.equipos);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={store.equipos} />

      {/* <code>{JSON.stringify(equipos, null)}</code> */}
    </div>
  );
}
