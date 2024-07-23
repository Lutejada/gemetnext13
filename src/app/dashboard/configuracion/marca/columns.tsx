"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

import { MarcaForm } from "./form";
import { Marca } from "@/app/api/marca/dominio";
import { DialogDescription } from "@radix-ui/react-dialog";

export const columns: ColumnDef<Marca>[] = [
  {
    accessorKey: "descripcion",
    header: "Descripcion",
  },
  {
    accessorKey: "identificacion",
    header: "Identificacion",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isOpenModal, setIsOpenModal] = useState(false);
      const handleOpenModal = async (value: boolean) => {
        setTimeout(() => {
          setIsOpenModal(value);
        }, 500);
      };

      const closeModal = () => {
        setIsOpenModal(false);
      };

      const onOpenChange = (value: boolean) => {
        console.log({ value });
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
              <DropdownMenuItem>Eliminar</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleOpenModal(true)}>
                Editar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog
            open={isOpenModal}
            onOpenChange={(value) => setIsOpenModal(value)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Marca</DialogTitle>
                <DialogDescription>
                  Ingresa la informacion solicitada
                </DialogDescription>
              </DialogHeader>
              <MarcaForm
                isEditing={true}
                marca={row.original}
                closeModal={closeModal}
              />
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
