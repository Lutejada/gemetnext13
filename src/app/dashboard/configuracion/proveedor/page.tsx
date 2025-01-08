"use client";
import { Button } from "@/components/ui/button";

import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

import { useState } from "react";
import { useListadoProvedores } from "../../hooks/useProveedor";
import { DialogWrapper } from "@/components/dialogWrapper";
import { ProveedorForm } from "./form";

export default function Proveedor() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { proveedores, isLoading } = useListadoProvedores();
  const closeModal = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <h2 className="text-center my-4 font-semibold">Consultar Proveedores</h2>
      <div className="flex justify-end mb-3">
        <Button onClick={() => setIsOpenModal(true)}>Crear Proveedor</Button>
      </div>
      <DataTable columns={columns} data={proveedores} isLoading={isLoading} />
      <DialogWrapper
        isOpen={isOpenModal}
        onOpenChange={setIsOpenModal}
        title="Crear Proveedor"
        description="Ingresa la informacion solicitada"
      >
        <ProveedorForm closeModal={closeModal} />
      </DialogWrapper>
    </>
  );
}
