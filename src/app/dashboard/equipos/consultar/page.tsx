"use client";
import { addTodo, obtenerEquipos, todos } from "../../hooks/useEquipo";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { EquiposContext } from "@/src/app/context/equiposProvider";
export default function DemoPage() {
  const { equipos } = obtenerEquipos();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={equipos} />
    </div>
  );
}
