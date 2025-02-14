"use client";
import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

import { useState } from "react";

import { DialogWrapper } from "@/components/dialogWrapper";
import { UsuarioForm } from "./form";
import { useListadoUsuarios } from "../../hooks/useUsuario";
import { useSession } from "next-auth/react";
import { Role } from "@/app/api/usuarios/dominio/entity";

export default function Proveedor() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data: session } = useSession();
  const isValidRole = session?.user?.rol === Role.Admin;
  const { usuarios, isLoading } = useListadoUsuarios();
  const closeModal = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <h2 className="text-center my-4 font-semibold">Consultar Usuarios</h2>
      <div className="flex justify-end mb-3">
        <Button disabled={!isValidRole} onClick={() => setIsOpenModal(true)}>
          Crear Usuario
        </Button>
      </div>
      <DataTable columns={columns} data={usuarios} isLoading={isLoading} />
      <DialogWrapper
        isOpen={isOpenModal}
        onOpenChange={setIsOpenModal}
        title="Crear Usuario"
        description="Ingresa la informacion solicitada"
      >
        <UsuarioForm closeModal={closeModal} />
      </DialogWrapper>
    </>
  );
}
