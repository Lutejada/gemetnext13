"use client";

import { ListarEjecucionDTO } from "@/app/api/ejecucion-patron/application/dto/listarEjecucionPatrones.dto";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ListarEjecucionDTO>[] = [
  {
    accessorKey: "codigo",
    header: "codigo",
  },
  {
    accessorKey: "responsable",
    header: "responsable",
  },
  {
    accessorKey: "observaciones",
    header: "Observaciones",
    size: 200, // Establece un ancho fijo de 200px
    cell: ({ row }) => {
      const observaciones = row.getValue("observaciones") as string;
      return (
        <p
          className="max-w-xs max-h-[300px] overflow-y-auto"
          style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {observaciones}
        </p>
      );
    },
  },
  {
    accessorKey: "fechaEjecucion",
    header: "fecha Ejecucion",
  },
  {
    accessorKey: "patronDescripcion",
    header: "Descripcion del patron",
  },
];
