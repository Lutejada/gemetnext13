"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Equipo = {
  codigo: string;
  descripcion: string;
  marca: string;
  responsable: string;
};

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
];
