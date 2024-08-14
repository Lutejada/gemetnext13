"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";


import {  EquipoProgramacionVencerDto, Estatus } from "@/app/api/equipos/application/dtos/listaProgramacionEquipos.output";
import { Badge } from "@/components/badge";
import clsx from "clsx";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<EquipoProgramacionVencerDto>[] = [
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
    accessorKey: "estado",
    header: "Estatus",
    cell: ({ row }) => {
      //TODO: pasar esta logica a variantes
      const estatus = row.getValue<Estatus>('estado')
      return <Badge className={clsx({
        "bg-green-500": estatus.color === 'success',
        "bg-orange-500": estatus.color === 'warning',
        "bg-red-500": estatus.color === 'danger',
        "bg-red-700": estatus.color === 'expired',
      })} >{estatus.descripcion}</Badge>;
    },
  },
 
];
