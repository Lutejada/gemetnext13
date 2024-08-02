"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";


import { EquipoProgramacionDto } from "@/app/api/equipos/application/dtos/listaProgramacionEquipos.output";
import { Badge } from "@/components/badge";
import clsx from "clsx";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

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
  {
    accessorKey: "vencer",
    header: "Estatus",
    cell: ({ row }) => {
      const vencer = row.getValue("vencer")
      return <Badge className={clsx({
        "bg-green-500": vencer === "success",
        "bg-orange-500": vencer === "warning",
        "bg-red-500": vencer === "danger",
      })} >{row.getValue("vencer")}</Badge>;
    },
  },
 
];
