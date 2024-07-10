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
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";

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
      
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Dialog>
                <DropdownMenuItem>Eliminar</DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    Editar
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Editar Marca</DialogTitle>
                    <DialogDescription>
                      Ingresa la informacion solicitada
                    </DialogDescription>
                  </DialogHeader>
                  <MarcaForm isEditing marca={row.original} />
                </DialogContent>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
