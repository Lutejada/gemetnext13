"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { ListarProveedoresDTO } from "@/app/api/proveedor/application/dto/listarProveedore.DTO";
import { DropDownMenuProveedor } from "./dropDownMenu";

export const columns: ColumnDef<ListarProveedoresDTO>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre empresa",
  },
  {
    accessorKey: "numeroIdentificacion",
    header: "Numero Identificacion",
  },
  {
    id: "actions",
    cell: ({ row }) => <DropDownMenuProveedor />,
  },
];
