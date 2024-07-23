"use client";
import { Button } from "@/components/ui/button";

import { obtenerMarcas } from "../../hooks/useMarca";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MarcaForm } from "./form";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";

export default function Marca() {
  const { marcas } = obtenerMarcas();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const closeModal = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <Dialog
        open={isOpenModal}
        onOpenChange={(value) => setIsOpenModal(value)}
      >
        <h2 className="text-center my-4 font-semibold">Consultar Marcas</h2>
        <div className="flex justify-end mb-3">
          <Button onClick={() => setIsOpenModal(true)}>Crear Marca</Button>
        </div>
        <DataTable columns={columns} data={marcas} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Marca</DialogTitle>
            <DialogDescription>
              Ingresa la informacion solicitada
            </DialogDescription>
          </DialogHeader>
          <MarcaForm closeModal={closeModal} />
        </DialogContent>
      </Dialog>
    </>
  );
}
