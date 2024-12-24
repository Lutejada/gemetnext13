"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ListarProveedoresDTO } from "@/app/api/proveedor/application/dto/listarProveedore.DTO";
import { DropDownMenuProveedor } from "./dropDownMenu";
import { EditarProveedorDTO } from "@/app/api/proveedor/application/dto/editarProveedorDTO";

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
    cell: ({ row }) => {
      console.log(row.original);
      const proveedorDto: EditarProveedorDTO = {
        id: row.original.id,
        nombre: row.original.nombre,
        tipoIdetificacion: row.original.tipoIdentificacion,
        numeroIdentificacion: row.original.numeroIdentificacion,
        direccion: row.original.direccion,
        telefono: row.original.telefono,
        email: row.original.email,
      };
      return <DropDownMenuProveedor proveedorDto={proveedorDto} />;
    },
  },
];
