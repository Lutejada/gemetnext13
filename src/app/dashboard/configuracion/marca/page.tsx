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
  DialogTrigger,
} from "@/components/ui/dialog";
import { MarcaForm } from "./form";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function Marca() {
  const { marcas } = obtenerMarcas();

  return (
    <>
      <Dialog>
        <h2 className="text-center my-4 font-semibold">Consultar Marcas</h2>
        <DialogTrigger asChild>
          <Button>Crear Marca</Button>
        </DialogTrigger>
        <DataTable columns={columns} data={marcas} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Marca</DialogTitle>
            <DialogDescription>
              Ingresa la informacion solicitada
            </DialogDescription>
          </DialogHeader>
          <MarcaForm />
        </DialogContent>
      </Dialog>
    </>
  );
}
