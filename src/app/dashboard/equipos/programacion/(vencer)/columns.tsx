"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/badge";
import clsx from "clsx";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormEjecucionEquipo } from "./form";
import { EstadoProgramacion } from "@prisma/client";
import {
  EquipoProgramacionDto,
  Estatus,
} from "@/app/api/programacion-equipos/application/dto/listadoPatronesProgramados.dto";
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
      const [isOpenModal, setIsOpenModal] = useState(false);
      const [isClickOpenModal, setIsClickOpenModal] = useState(false);
      const clickOpenModal = () => {
        setIsClickOpenModal(true);
      };

      const onOpenChange = (value: boolean) => {
        if (isClickOpenModal && value === false) {
          setIsOpenModal(true);
        }
      };

      const closeModal = () => {
        setIsOpenModal(false);
      };

      return (
        <>
          <DropdownMenu onOpenChange={onOpenChange}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={clickOpenModal} disabled={isCompleted}>
                Ejecutar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog
            open={isOpenModal}
            onOpenChange={(value) => setIsOpenModal(value)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ejecucion de la programacion</DialogTitle>
                <DialogDescription>
                  Ingresa la informacion solicitada
                </DialogDescription>
              </DialogHeader>
              <FormEjecucionEquipo
                programacionEquipoId={row.original.id}
                closeModal={closeModal}
              />
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
