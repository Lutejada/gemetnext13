"use client";

import { ColumnDef } from "@tanstack/react-table";

import { EquipoProgramacionDto } from "@/app/api/equipos/dtos/listaProgramacionEquipos.output";


export const columns: ColumnDef<EquipoProgramacionDto>[] = [
  {
    accessorKey: "codigo",
    header: "codigo",
  },
  {
    accessorKey: "descripcion",
    header: "descripcion",
  },
  {
    accessorKey: "fechaProgramacion",
    header: "Fecha programacion",
  },
  {
    accessorKey: "actividad",
    header: "Actividad",
  },
  {
    accessorKey: "frecuencia",
    header: "Frecuencia",
  },
];
