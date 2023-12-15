"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Equipo } from "@/src/app/api/equipos/dominio";
import Link from "next/link";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Equipo>[] = [
  {
    accessorKey: "codigo",
    header: "codigo",
  },
  { 
    accessorKey: "descripcion",
    header: "descripcion",
  },
  {
    accessorKey: "marca",
    header: "marca",
  },
  {
    accessorKey: "responsable",
    header: "Responsable",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link
              href={`/dashboard/equipos/programar/${row.getValue("codigo")}`}
            >
              <DropdownMenuItem>Programar</DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/equipos/consultar/${row.getValue("codigo")}`}>
              <DropdownMenuItem>Ver Equipo</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
