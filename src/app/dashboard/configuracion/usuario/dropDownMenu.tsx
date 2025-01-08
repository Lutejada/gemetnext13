import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogWrapper } from "@/components/dialogWrapper";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ProveedorForm } from "./form";
import { useEditarProveedor } from "../../hooks/useProveedor";
import { EditarProveedorDTO } from "@/app/api/proveedor_temp/application/dto/editarProveedorDTO";

interface Props {
  proveedorDto: EditarProveedorDTO;
}

export const DropDownMenuProveedor = ({ proveedorDto }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isClickOpenModal, setIsClickOpenModal] = useState(false);
  const clickOpenModal = () => {
    setIsClickOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const onOpenChange = (value: boolean) => {
    if (isClickOpenModal && value === false) {
      setIsOpenModal(true);
    }
  };

  return (
    <>
      <DropdownMenu onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Eliminar</DropdownMenuItem>
          <DropdownMenuItem onClick={clickOpenModal}>Editar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogWrapper
        isOpen={isOpenModal}
        onOpenChange={setIsOpenModal}
        title="Crear Proveedor"
        description="Ingresa la informacion solicitada"
      >
        <ProveedorForm
          closeModal={closeModal}
          isEditing
          proveedorDto={proveedorDto}
        />
      </DialogWrapper>
    </>
  );
};
