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
import Link from "next/link";
import { SubMenuDocuments } from "../../components/SubMenuDocuments";
import { PatronInformacionBasicaDTO } from "@/app/api/patrones/application/dto/obtenerPatrones";

export const columns: ColumnDef<PatronInformacionBasicaDTO>[] = [
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
      const documentos = row.original?.documentos;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link
              href={`/dashboard/patrones/programar/${row.getValue("codigo")}`}
            >
              <DropdownMenuItem>Programar</DropdownMenuItem>
            </Link>
            <Link
              href={`/dashboard/patrones/consultar/${row.getValue("codigo")}`}
            >
              <DropdownMenuItem>Ver Patron</DropdownMenuItem>
            </Link>
            <SubMenuDocuments documentos={documentos ?? []} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
