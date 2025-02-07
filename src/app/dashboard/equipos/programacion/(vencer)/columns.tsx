"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/badge";
import clsx from "clsx";

import { EstadoProgramacion } from "@prisma/client";
import {
  EquipoProgramacionDto,
  Estatus,
} from "@/app/api/programacion-equipos/application/dto/listadoPatronesProgramados.dto";
import { DropDownMenuEjecucionEquipo } from "./DropDownMenu";

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
    accessorKey: "estado",
    header: "Estado",
  },
  {
    accessorKey: "alertaEstado",
    header: "Tiempo disponible",
    cell: ({ row }) => {
      //TODO: pasar esta logica a variantes
      const estatus = row.getValue<Estatus>("alertaEstado");
      return (
        <Badge
          className={clsx({
            "bg-green-500": estatus.color === "success",
            "bg-orange-500": estatus.color === "warning",
            "bg-red-500": estatus.color === "danger",
            "bg-red-700": estatus.color === "expired",
          })}
        >
          {estatus.descripcion}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const isCompleted =
        row.original.estado === EstadoProgramacion.COMPLETADO ? true : false;
      return (
        <DropDownMenuEjecucionEquipo
          isCompleted={isCompleted}
          programacionEquipoId={row.original.id}
        />
      );
    },
  },
];
