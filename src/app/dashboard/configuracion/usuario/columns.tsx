"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ListarProveedoresDTO } from "@/app/api/proveedor/application/dto/listarProveedore.DTO";
import { DropDownMenuProveedor } from "./dropDownMenu";
import { EditarProveedorDTO } from "@/app/api/proveedor/application/dto/editarProveedorDTO";
import { ListarUsuriosDTO } from "@/app/api/usuarios/use-cases/dto/listarUsuarios.DTO";

export const columns: ColumnDef<ListarUsuriosDTO>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "correo",
    header: "Correo",
  },
  {
    accessorKey: "rol",
    header: "Rol",
  },
  {
    accessorKey: "cargo",
    header: "Cargo",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // const proveedorDto: EditarProveedorDTO = {
      //   id: row.original.id,
      //   nombre: row.original.nombre,
      //   tipoIdetificacion: row.original.tipoIdentificacion,
      //   numeroIdentificacion: row.original.numeroIdentificacion,
      //   direccion: row.original.direccion,
      //   telefono: row.original.telefono,
      //   email: row.original.email,
      // };
      // return <DropDownMenuProveedor proveedorDto={proveedorDto} />;
    },
  },
];
